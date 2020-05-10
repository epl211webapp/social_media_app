/*
ExerciseCreate.js contains the page for the form that contains the form that you can create an exercise.  

*/

import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import ExerciseForm from "./ExerciseForm";
import { getExercises } from "../../actions/exercise";

const Exercises = ({ getExercises, exercise: { exercises, loading } }) => {
  useEffect(() => {
    getExercises();
  }, [getExercises]);

  const [displayExerciseInputs, toggleExerciseInputs] = React.useState(false);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div class="my-2">
        <button
          onClick={() => toggleExerciseInputs(!displayExerciseInputs)}
          type="button"
          class="btn btn-light"
        >
          {displayExerciseInputs ? (
            <h1>
              Click to dismiss "Create exercise" or to reset the input fields{" "}
            </h1>
          ) : (
            <h1>Click here to create your own exercise</h1>
          )}
        </button>
      </div>
      {displayExerciseInputs && (
        <Fragment>
          {" "}
          <ExerciseForm />
        </Fragment>
      )}
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
