import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExercise } from "../../actions/exercise";
const ExerciseItem = ({
  auth,
  exercise: { _id, description, name, user, date },
  deleteExercise
}) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <h4>{name}</h4>
      </div>

      <div>
        <p class="my-1">{description}</p>
        <p class="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <Link to={`/exercise/${_id}`} class="btn btn-primary">
          Solve
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={e => deleteExercise(_id)}
            type="button"
            class="btn btn-danger"
          >
            <i class="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

ExerciseItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteExercise: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteExercise })(ExerciseItem);
