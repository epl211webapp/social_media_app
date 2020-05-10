/*
Exercise.js is the component for the presentation of an individual exercise. 
This is the component page which displays the exercise to be solved ( with the choices ).  

*/

import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

//import ExerciseItem from "../exercises/ExerciseItem";

import {
  getExercise,
  addAnswer,
  addCorrectAnswerByUser,
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
    correct_choice,
    answers,
    chapter,
  },
  match,
}) => {
  useEffect(() => {
    getExercise(match.params.id);
  }, [getExercise]);

  const [answer, setAnswer] = useState("");
  const [displayResults, toggleExercises] = React.useState(false);
  const handleToggle = () => {
    toggleExercises(!displayResults);
  };
  let counter_choiceA = 0,
    counter_choiceB = 0,
    counter_choiceC = 0,
    counter_choiceD = 0;

  let stringify = answers;
  for (let i = 0; i < stringify.length; i++) {
    let choice = stringify[i]["answer"];
    if (choice === choiceA) {
      counter_choiceA++;
    } else if (choice === choiceB) {
      counter_choiceB++;
    } else if (choice === choiceC) {
      counter_choiceC++;
    } else if (choice === choiceD) {
      counter_choiceD++;
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const answer_json = {
      answer: answer,
    };
    addAnswer(_id, answer_json);
    if (answer === correct_choice) {
      addCorrectAnswerByUser(_id);
    }
    handleToggle();
  };

  return loading || exercise === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/exercises" className="btn">
        Back to Exercises
      </Link>
      <div className=" bg-white p-1 my-1">
        <h1>Description: {description}</h1>
        <br />
        <form onSubmit={(e) => onSubmit(e)}>
          {choiceA !== null ? (
            <label className="container_radio red">
              {choiceA}
              <input
                type="radio"
                name="answer"
                value={choiceA}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <span class="checkmark"></span>
            </label>
          ) : null}
          {choiceB !== "" ? (
            <label class="container_radio blue">
              {choiceB}
              <input
                type="radio"
                name="answer"
                value={choiceB}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <span class="checkmark"></span>
            </label>
          ) : null}
          {choiceC !== "" ? (
            <label class="container_radio green">
              {choiceC}
              <input
                type="radio"
                name="answer"
                value={choiceC}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <span class="checkmark"></span>
            </label>
          ) : null}
          {choiceD !== "" ? (
            <label class="container_radio orange">
              {choiceD}
              <input
                type="radio"
                name="answer"
                value={choiceD}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <span class="checkmark"></span>
            </label>
          ) : null}
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
      {displayResults ? (
        <div className=" bg-white p-1 my-1">
          <h2>Number of answers for each option</h2>
          {counter_choiceA > 0 ? <h3>Choice Red :{counter_choiceA} </h3> : null}
          {counter_choiceB > 0 ? (
            <h3>Choice Blue :{counter_choiceB} </h3>
          ) : null}
          {counter_choiceC > 0 ? (
            <h3>Choice Green :{counter_choiceC} </h3>
          ) : null}
          {counter_choiceD > 0 ? (
            <h3>Choice Orange :{counter_choiceD} </h3>
          ) : null}
        </div>
      ) : (
        <h1></h1>
      )}
    </Fragment>
  );
};

Exercise.propTypes = {
  getExercise: PropTypes.func.isRequired,
  addAnswer: PropTypes.func.isRequired,
  addCorrectAnswerByUser: PropTypes.func.isRequired,

  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exercise: state.exercise,
});

export default connect(mapStateToProps, {
  getExercise,
  addAnswer,
  addCorrectAnswerByUser,
})(Exercise);
