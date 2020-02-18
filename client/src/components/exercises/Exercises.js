import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ExerciseItem from "./ExerciseItem";

import { getExercises } from "../../actions/exercise";

const Exercises = ({ getExercises, exercise: { exercises, loading } }) => {
  useEffect(() => {
    getExercises();
  }, [getExercises]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Exercises</h1>
      <p className="lead">
        <i className="fas fa-user">Select exercise to solve</i>
      </p>

      {/* ExerciseForm */}
      <div className="exercises">
        {exercises.map(exercise => (
          <ExerciseItem key={exercise._id} exercise={exercise} />
        ))}
      </div>
    </Fragment>
  );
};

Exercises.propTypes = {
  getExercises: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  exercise: state.exercise
});

export default connect(mapStateToProps, { getExercises })(Exercises);
