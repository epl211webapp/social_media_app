/*

3)Navbar.js is component for the navigation bar at the top of the web application 
and mainly contains buttons to the many parts of the application (e.g. exercises, profiles etc). 

*/

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Users</Link>
      </li>
      <li>
        <Link to="/exercise_choice">Exercises</Link>
      </li>
      <li>
        <Link to="/exercise_create">Create Exercises</Link>
      </li>
      <li>
        <Link to="/posts">Discussion</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link
          onClick={() => {
            window.confirm(`
            CS 211 Web Application Privacy Policy
            This privacy policy will explain how we collect the personal data  that we collect from you when you use our website.
            
            What data do we collect?
            The university collects the following data:
            Personal identification information (Username, email address)

            How do we collect your data?
            We collect data and process data when you:
            Register online.
            Voluntarily post on the discussions forums.
            Voluntarily post your own exercises on the exercises section.
            Like and Unlike comments and posts.
            
            How will we use your data?
            We collect your data so that we can:
            Identify which users answer which questions.
            Which types of exercises prefer to complete.
            Which types of topics users like to discuss in the discussion forums.
            How active the users are in the web application.
            How do we store your data?
            Our Company securely stores your data at https://www.mongodb.com/ 
            MongoDB is a cross-platform document-oriented database program. 
            We will keep your personal information for the entire semester. Once this time period has expired, we will delete your data from the database.
            
            What are your data protection rights?
            We would like to make sure you are fully aware of all of your data protection rights. 
            Every user is entitled to the following:
            The right to access – You have the right to request from us copies of your personal data. 
            The right to rectification – You have the right to request that from us to correct any information you believe is inaccurate. You also have the right to request from us to complete the information you believe is incomplete.
            The right to erasure – You have the right to request that we erase your personal data, under certain conditions.
            The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.
            The right to object to processing – You have the right to object to processing of your personal data, under certain conditions.
            The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at our email:
            Call us at: 
            Or write to us: 
            Privacy policies of other websites
            The web application may contain links to other websites. Our privacy policy applies only to our web application, so if you click on a link to another website, you should read their privacy policy.
            Changes to our privacy policy
            Our Company keeps its privacy policy under regular review and places any updates on this web page. This privacy policy was last updated on 25/02/2020.
            How to contact us
            If you have any questions about our privacy policy, the data we hold on you, or you would like to exercise one of your data protection rights, please do not hesitate to contact us.
            Email us at: 
            Call us: 
            Or write to us at: 
            How to contact the appropriate authority
            Should you wish to report a complaint or if you feel that we have not addressed your concern in a satisfactory manner, you may contact the Information Commissioner’s Office in Cyprus.
            Link: http://www.dataprotection.gov.cy/dataprotection/dataprotection.nsf/home_el/home_el?opendocument
            Or complain to the European Data Protection Supervisor 
            
            Link
            https://edps.europa.eu/node/75_en
            
            `);
          }}
        >
          Privacy
        </Link>
      </li>
      <li>
        <Link to="/profiles">Users</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-book"></i> UCY: CS211
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
