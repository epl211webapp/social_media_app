import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExercise } from "../../actions/exercise";
import { authorize_exercise } from "../../actions/exercise";

const ExerciseItem = ({
  auth,
  isAuthenticated_exercise,
  authorize_exercise,
  exercise: { _id, description, name, user, date, answers, correct_users },
  deleteExercise,
  showActions
}) => {
  const [formData, setFormData] = useState({
    password: ""
  });

  const { password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    authorize_exercise(_id, password);
  };

  if (isAuthenticated_exercise) {
    return <Redirect to={`/exercises/${_id}`} />;
  }

  return (
    <Fragment>
      <div class="post bg-white p-1 my-1">
        <div>
          <h4>{name}</h4>
        </div>

        <div>
          <p class="my-1">{description}</p>
          <p class="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>

          {showActions && (
            <Fragment>
              <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="">
                  {answers.length > 0 && (
                    <span>
                      {correct_users.length} out of {answers.length} answered
                      correctly
                    </span>
                  )}
                </div>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Solve"
                />
              </form>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={e => deleteExercise(_id)}
                  type="button"
                  class="btn btn-danger"
                >
                  <i class="fas fa-times" />
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

ExerciseItem.defaultProps = {
  showActions: true
};

ExerciseItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  authorize_exercise: PropTypes.func.isRequired,
  isAuthenticated_exercise: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  deleteExercise: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated_exercise: state.exercise.isAuthenticated_exercise
});

export default connect(mapStateToProps, { deleteExercise, authorize_exercise })(
  ExerciseItem
);
