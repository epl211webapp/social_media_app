import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ExerciseItem from "./ExerciseItem";

import { getExercises } from "../../actions/exercise";

const ExerciseChapterButton = ({
  getExercises,
  exercise: { exercises, loading },
  chapter,
  index,
}) => {
  useEffect(() => {
    getExercises();
  }, [getExercises]);

  const [displayExercise, toggleExercises] = React.useState(false);
  const handleToggle = () => {
    toggleExercises(!displayExercise);
  };
  return (
    <div class="my-2">
      <button
        key={index}
        onClick={handleToggle}
        type="button"
        class="btn btn-light"
      >
        {displayExercise ? <h1>Dismiss {chapter}</h1> : <h1>{chapter}</h1>}
      </button>
      {displayExercise ? (
        <div className="exercises">
          {exercises
            .filter((exercise) => exercise.chapter === chapter)
            .map((exercise) => (
              <ExerciseItem key={exercise._id} exercise={exercise} />
            ))}
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

ExerciseChapterButton.propTypes = {
  getExercises: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exercise: state.exercise,
});

export default connect(mapStateToProps, { getExercises })(
  ExerciseChapterButton
);
