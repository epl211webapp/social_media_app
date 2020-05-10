/*
The index.js in reducers is the reducer's combine file


*/

import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import exercise from "./exercise";

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  exercise,
});
