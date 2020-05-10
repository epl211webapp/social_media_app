/*
4)Spinner.js is the component for the spinner effect when a page is loading data from the database. 

*/

import React, { Fragment } from "react";
import spinner from "./spinner.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: "200px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);
