/*
6)Exercises.js contains all the buttons for individual chapters (ExerciseChapterButton.js) 

*/
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ExerciseChapterButton from "./ExerciseChapterButton";

import { getExercises } from "../../actions/exercise";

const Exercises = ({ getExercises, exercise: { exercises, loading } }) => {
  useEffect(() => {
    getExercises();
  }, [getExercises]);

  //const [displayExerciseInputs, toggleExerciseInputs] = React.useState(false);

  const chapters = [
    "Regular Languages",
    "Context Free Languages",
    "The Church Turing Thesis",
    "Decidability",
    "Reducability",
    "Time Complexity",
  ];
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Exercises</h1>
      <p className="lead">
        <i className="fas fa-user">Select exercise to solve</i>
      </p>
      <div class="my-2">
        {chapters.map((chapter, index) => {
          return (
            <ExerciseChapterButton
              index={index}
              chapter={chapter}
              in_class_or_home={"Home"}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

Exercises.propTypes = {
  getExercises: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exercise: state.exercise,
});

export default connect(mapStateToProps, { getExercises })(Exercises);
