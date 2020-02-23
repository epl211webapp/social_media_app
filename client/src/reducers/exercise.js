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
} from "../actions/types";

const initialState = {
  exercises: [],
  exercise: null,
  loading: true,
  isAuthenticated_exercise: null,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXERCISES:
      return {
        ...state,
        exercises: payload,
        loading: false,
        isAuthenticated_exercise: false
      };
    case EXERCISE_ACCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated_exercise: true,
        loading: false
      };
    case UPDATE_ANSWERS:
      return {
        ...state,
        exercises: state.exercises.map(exercise =>
          exercise._id === payload.id
            ? { ...exercise, answers: payload.answers }
            : exercise
        ),
        loading: false
      };
    case CORRECT_CHOICE_USER:
      return {
        ...state,
        exercises: state.exercises.map(exercise =>
          exercise._id === payload.id
            ? { ...exercise, correct_users: payload.correct_users }
            : exercise
        ),
        loading: false
      };
    case GET_EXERCISE:
      return {
        ...state,
        exercise: payload,
        loading: false,
        isAuthenticated_exercise: false
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [payload, ...state.exercises],
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
    case EXERCISE_ACCESS_ERROR:
      return {
        ...state,
        error: payload,
        isAuthenticated_exercise: false
      };
    default:
      return state;
  }
}
