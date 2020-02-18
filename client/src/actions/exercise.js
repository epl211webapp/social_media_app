import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_EXERCISES,
  EXERCISE_ERROR,
  DELETE_EXERCISE,
  ADD_EXERCISE
} from "./types";

//Get exercises
export const getExercises = () => async dispatch => {
  try {
    const res = await axios.get("/api/exercises");

    dispatch({
      type: GET_EXERCISES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete exercise

export const deleteExercise = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/exercises/${id}`);

    dispatch({
      type: DELETE_EXERCISE,
      payload: id
    });

    dispatch(setAlert("Exercise Removed", "success"));
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add exercise
export const addExercise = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`/api/exercises/`, formData, config);

    dispatch({
      type: ADD_EXERCISE,
      payload: res.data
    });

    dispatch(setAlert("Exercise Created", "success"));
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
