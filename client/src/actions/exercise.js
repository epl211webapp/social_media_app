import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_EXERCISES,
  EXERCISE_ERROR,
  DELETE_EXERCISE,
  ADD_EXERCISE,
  GET_EXERCISE,
  EXERCISE_ACCESS,
  EXERCISE_ACCESS_ERROR,
  UPDATE_ANSWERS,
  CORRECT_CHOICE_USER
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

export const addAnswer = (id, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/exercises/answer/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_ANSWERS,
      payload: res.data
    });

    dispatch(setAlert("Answer Added", "success"));
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addCorrectAnswerByUser = id => async dispatch => {
  try {
    const res = await axios.put(`/api/exercises/correct_users/${id}`);

    dispatch({
      type: CORRECT_CHOICE_USER,
      payload: { id, correct_users: res.data }
    });
  } catch (err) {
    dispatch(
      {
        type: EXERCISE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      },
      setAlert("You have already answered this question", "danger")
    );
  }
};

//Enter exercise
export const getExercise = id => async dispatch => {
  try {
    const res = await axios.get(`/api/exercises/${id}`);

    dispatch({
      type: GET_EXERCISE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Authorize exercise
export const authorize_exercise = (id, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ password });

  try {
    const res = await axios.post(`/api/exercises/${id}`, body, config);

    dispatch({
      type: EXERCISE_ACCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: EXERCISE_ACCESS_ERROR
    });
  }
};
