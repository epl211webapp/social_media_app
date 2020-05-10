/*
1)CreateProfile.js is the component that contains the form for creating a profile 
and includes all the required fields (e.g. status, thoughts etc.) 

*/

import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    status: "",
    skills: "",
    bio: "",
  });

  const { company, status, bio } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <select name="status" value={status} onChange={(e) => onChange(e)}>
              <option value="0">* Select Status</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="University"
              name="company"
              value={company}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          {/*<div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={e => onChange(e)}
            /> -->
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              onChange={e => onChange(e)}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
  </div> */}
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={(e) => onChange(e)}
            ></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <input type="submit" className="btn btn-primary my-1" />
          <a className="btn btn-light my-1" href="dashboard.html">
            Go Back
          </a>
        </form>
      </section>
    </Fragment>
  );
};

CreateProfile.propTypes = {};

const mapStateToProps = (state) => ({
  createProfile: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
