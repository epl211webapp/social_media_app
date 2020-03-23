import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

//import ExerciseItem from "../exercises/ExerciseItem";

import {
  getExercise,
  addAnswer,
  addCorrectAnswerByUser
} from "../../actions/exercise";

const Exercise = ({
  getExercise,
  addAnswer,
  addCorrectAnswerByUser,
  exercise: {
    _id,
    exercise,
    loading,
    description,
    choiceA,
    choiceB,
    choiceC,
    choiceD,
    correct_choice
  },
  match
}) => {
  useEffect(() => {
    getExercise(match.params.id);
  }, [getExercise]);

  const [answer, setAnswer] = useState("");

  const onSubmit = async e => {
    e.preventDefault();
    const answer_json = {
      answer: answer
    };
    addAnswer(_id, answer_json);
    if (answer === correct_choice) {
      addCorrectAnswerByUser(_id);
    }
  };

  return loading || exercise === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/exercises" className="btn">
        Back to Exercises
      </Link>
      <div className=" bg-white p-1 my-1">
        <h1>{description}</h1>
        <form onSubmit={e => onSubmit(e)}>
          {choiceA !== null ? (
            <label class="container_radio">
              {choiceA}
              <input
                type="radio"
                name="answer"
                value={choiceA}
                onChange={e => setAnswer(e.target.value)}
              />
              <span class="checkmark"></span>
            </label>
          ) : null}
          {choiceB !== "" ? (
            <label class="container_radio">
              {choiceB}
              <input
                type="radio"
                name="answer"
                value={choiceB}
                onChange={e => setAnswer(e.target.value)}
              />
              <span class="checkmark"></span>
            </label>
          ) : null}
          {choiceC !== "" ? (
            <label class="container_radio">
              {choiceC}
              <input
                type="radio"
                name="answer"
                value={choiceC}
                onChange={e => setAnswer(e.target.value)}
              />
              <span class="checkmark"></span>
            </label>
          ) : null}
          {choiceD !== "" ? (
            <label class="container_radio">
              {choiceD}
              <input
                type="radio"
                name="answer"
                value={choiceD}
                onChange={e => setAnswer(e.target.value)}
              />
              <span class="checkmark"></span>
            </label>
          ) : null}
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </Fragment>
  );
};

Exercise.propTypes = {
  getExercise: PropTypes.func.isRequired,
  addAnswer: PropTypes.func.isRequired,
  addCorrectAnswerByUser: PropTypes.func.isRequired,

  exercise: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  exercise: state.exercise
});

export default connect(mapStateToProps, {
  getExercise,
  addAnswer,
  addCorrectAnswerByUser
})(Exercise);
