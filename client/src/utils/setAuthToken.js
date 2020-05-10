/*

SetAuthToken.js is the file that contain the code for the authentication token. Token is a unique identifier for every user.  

*/

import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
