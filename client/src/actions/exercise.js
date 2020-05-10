import axios from "axios";
import { setAlert } from "./alert";

/*
This action file is for the exercises.
It contains the action functions for getting all exercises, deleting, creating etc.
Explanations of the functions above each function.

*/
import {
  GET_EXERCISES,
  EXERCISE_ERROR,
  DELETE_EXERCISE,
  ADD_EXERCISE,
  GET_EXERCISE,
  EXERCISE_ACCESS,
  EXERCISE_ACCESS_ERROR,
  UPDATE_ANSWERS,
  CORRECT_CHOICE_USER,
} from "./types";

//Get exercises, awaiting an answer to the response from axios
export const getExercises = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/exercises");

    dispatch({
      type: GET_EXERCISES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete exercise given an id in the axios request

export const deleteExercise = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/exercises/${id}`);
    console.log(res);
    dispatch({
      type: DELETE_EXERCISE,
      payload: id,
    });

    dispatch(setAlert("Exercise Removed", "success"));
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add a new exercise to the exercises endpoint
export const addExercise = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/api/exercises/`, formData, config);

    dispatch({
      type: ADD_EXERCISE,
      payload: res.data,
    });

    dispatch(setAlert("Exercise Created", "success"));
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add answer to a specific answer by id
export const addAnswer = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `/api/exercises/answer/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_ANSWERS,
      payload: res.data,
    });

    dispatch(setAlert("Answer Added", "success"));
  } catch (err) {
    dispatch(
      {
        type: EXERCISE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      },
      setAlert("Answer already answered", "warning")
    );
  }
};

//Add the correct answers by each user
//not used in the web application
export const addCorrectAnswerByUser = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/exercises/correct_users/${id}`);
    console.log(res);
    dispatch({
      type: CORRECT_CHOICE_USER,
      payload: { id },
    });
  } catch (err) {
    dispatch(
      {
        type: EXERCISE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      },
      setAlert("You have already answered this question", "danger")
    );
  }
};

//Get an exercises give by the id in the API
export const getExercise = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/exercises/${id}`);

    dispatch({
      type: GET_EXERCISE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EXERCISE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Authorize exercise given the password for the certain exercise
//else if the password is wrong then an alert is dispatched
export const authorize_exercise = (id, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ password });

  try {
    const res = await axios.post(`/api/exercises/${id}`, body, config);

    dispatch({
      type: EXERCISE_ACCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: EXERCISE_ACCESS_ERROR,
    });
  }
};
