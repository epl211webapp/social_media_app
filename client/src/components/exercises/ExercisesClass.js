/*
1)Alert.js contains the box of alerts that show up on the top of the page, \
when a user does an action (e.g. creating an exercise),
 or a user makes a mistake (e.g. an alert for wrong password). 

*/

import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import ExerciseWeekButton from "./ExerciseWeekButton";

import { getExercises } from "../../actions/exercise";

const ExercisesClass = ({ getExercises, exercise: { exercises, loading } }) => {
  useEffect(() => {
    getExercises();
  }, [getExercises]);

  //const [displayExerciseInputs, toggleExerciseInputs] = React.useState(false);

  const weeks = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
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
        {weeks.map((week, index) => {
          return (
            <ExerciseWeekButton
              index={index}
              week={week}
              in_class_or_home={"Class"}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

ExercisesClass.propTypes = {
  getExercises: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exercise: state.exercise,
});

export default connect(mapStateToProps, { getExercises })(ExercisesClass);
