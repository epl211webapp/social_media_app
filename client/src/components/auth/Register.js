/*
 Register.js contains the page for the Register page. If the user is already logged in and authenticated 
instead of the Register page, he/she will be redirected to the dashboard page. 
The main features of the file is the Register form, where the user is prompted to input a name, 
email and also to type in twice his/her password, and they are checked through a function if they match. 

*/

import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    gdpr_agreement: "",
  });

  const { name, email, password, password2, gdpr_agreement } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (gdpr_agreement !== "I AGREE") {
      setAlert(
        "You must agree with GDPR agreement or can't register, type in 'I AGREE' in the appropriate input box if you consent",
        "danger"
      );
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label for="gdpr_agreement"> Agree with GDPR?</label>
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
            Click to Read GDPR
          </Link>
          <input
            type="text"
            placeholder="Type 'I AGREE'"
            name="gdpr_agreement"
            value={gdpr_agreement}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
