/*
1)ExerciseChapterButton.js is the component that is the button that appears when you click on one of the chapters in the Home exercises page.
 There is a mechanism to click on the button and then the exercises for that chapter appear and you can always click it again to dismiss it.  

*/

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ExerciseItem from "./ExerciseItem";

import { getExercises } from "../../actions/exercise";

const ExerciseWeekButton = ({
  getExercises,
  exercise: { exercises },
  week,
  in_class_or_home,
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
        {displayExercise ? <h1>Dismiss Week {week}</h1> : <h1>Week {week}</h1>}
      </button>
      {displayExercise ? (
        <div className="exercises">
          {exercises
            .filter(
              (exercise) =>
                exercise.week === week &&
                exercise.in_class_or_home === in_class_or_home
            )
            .map((exercise, index) => (
              <ExerciseItem
                key={exercise._id}
                exercise={exercise}
                index={index}
              />
            ))}
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

ExerciseWeekButton.propTypes = {
  getExercises: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exercise: state.exercise,
});

export default connect(mapStateToProps, { getExercises })(ExerciseWeekButton);
