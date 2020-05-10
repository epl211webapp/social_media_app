/*
2)ExerciseChoose.js contains the page for the two-button choice of whether
 you would like to do home exercises or in-class exercises. 
*/
import React from "react";
import { Link } from "react-router-dom";

export const ExerciseChoose = () => {
  return (
    <div className="landing-inner">
      <div className="container">
        <button type="button" class="btn btn-light ">
          <Link className="large" to="/exercises">
            Exercises for home
          </Link>
        </button>
      </div>
      <div className="container">
        <button type="button" class="btn btn-light">
          <Link className="large" to="/exercises_class">
            Exercises for class
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ExerciseChoose;
