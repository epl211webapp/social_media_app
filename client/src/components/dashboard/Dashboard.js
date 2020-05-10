/*
1) Dashboard.js contains the page for the dashboard of a user. If the user has no profile 
then there is a link for a page to create a profile. If he/she has a profile already
 then the dashboard includes information about the user and also a button that allows
  him/her to delete his/her account. 

*/

import React from "react";
import { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { getExercises } from "../../actions/exercise";

const Dashboard = ({
  getExercises,
  exercise: { exercises },
  getCurrentProfile,
  deleteAccount,
  auth: { user },

  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getExercises();
  }, [getCurrentProfile, getExercises]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        {" "}
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <div className="my-2">
            <a href="https://www.cs.ucy.ac.cy/~annap/epl211/">
              Official CS 211 website
            </a>
          </div>

          <div className="my-10">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
          {/* <div className="exercises">
            <h1>Exercises this user has completed</h1>
            {exercises.map((exercise) => {
              //console.log(exercise.answers);
              return exercise.answers.map((answer) => {
                if (answer.user === user._id) {
                  return (
                    <Fragment>
                      <h5>{exercise.description}</h5>
                      <br />
                    </Fragment>
                  );
                }
              });
            })}
          </div> */}
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getExercises: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  exercise: state.exercise,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getExercises,
})(Dashboard);
