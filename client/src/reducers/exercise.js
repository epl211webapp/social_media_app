import {
  GET_EXERCISES,
  EXERCISE_ERROR,
  DELETE_EXERCISE,
  ADD_EXERCISE
} from "../actions/types";

const initialState = {
  exercises: [],
  exercise: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXERCISES:
      return {
        ...state,
        exercises: payload,
        loading: false
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, payload],
        loading: false
      };
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(exercise => exercise._id !== payload),
        loading: false
      };
    case EXERCISE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
