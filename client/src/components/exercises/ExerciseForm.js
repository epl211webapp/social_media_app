/*
4)ExerciseForm.js contains the actual form for creating an exercise. 
The form includes all the necessary fields of an exercises (e.g. description, choices etc). 

*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";

import { addExercise } from "../../actions/exercise";

const ExerciseForm = ({ addExercise, setAlert }) => {
  const [formData, setFormData] = useState({
    description: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    in_class_or_home: "Home",
    chapter: "Regular Languages",
    week: "1",
    correct_choice: "",
    password: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const {
    description,
    choiceA,
    choiceB,
    choiceC,
    choiceD,
    in_class_or_home,
    chapter,
    week,
    correct_choice,
    password,
  } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    if (description == "") {
      setAlert("Fill in description", "danger");
    } else if (choiceA == "" || choiceB == "") {
      setAlert("Fill in red and blue choices", "danger");
    } else if (
      choiceA == choiceB ||
      choiceA == choiceC ||
      choiceA == choiceD ||
      choiceB == choiceC ||
      choiceB == choiceD ||
      (choiceC == choiceD && choiceC !== "" && choiceD !== "")
    ) {
      setAlert("Choices must be different", "danger");
    } else {
      addExercise(formData);
    }
  };
  return (
    <div className="post-form purple">
      <div className="bg-primary p">Create an exercise</div>
      <form
        className="form purple my-1"
        enctype="multipart/formd-data"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Description of exercise"
            value={formData.description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className="form-group ">
          <textarea
            className="exerciseTextareas red"
            name="choiceA"
            cols="30"
            rows="5"
            placeholder="Choice "
            value={formData.choiceA}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className="form-group ">
          <textarea
            className="exerciseTextareas blue"
            name="choiceB"
            cols="30"
            rows="5"
            placeholder="Choice "
            value={formData.choiceB}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className="form-group ">
          <textarea
            className="exerciseTextareas green"
            name="choiceC"
            cols="30"
            rows="5"
            placeholder="Choice "
            value={formData.choiceC}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className="form-group ">
          <textarea
            className="exerciseTextareas orange"
            name="choiceD"
            cols="30"
            rows="5"
            placeholder="Choice "
            value={formData.choiceD}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className="form-group">
          <textarea
            className="exerciseTextareas"
            name="correct_choice"
            cols="30"
            rows="5"
            placeholder="Correct choice (Optional)"
            value={formData.correct_choice}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className="form-group">
          <select
            className="exerciseTextareas"
            name="in_class_or_home"
            cols="30"
            rows="5"
            placeholder="Home"
            value={formData.in_class_or_home}
            onChange={(e) => onChange(e)}
          >
            <option value="Home">Home</option>
            <option value="Class">Class</option>
          </select>
        </div>

        <div className="form-group">
          <select
            className="exerciseTextareas"
            name="chapter"
            cols="30"
            rows="5"
            placeholder="Chapter"
            value={formData.chapter}
            onChange={(e) => onChange(e)}
          >
            <option value="Regular Languages">Regular Languages</option>
            <option value="Context Free Languages">
              Context Free Languages
            </option>
            <option value="The Church Turing Thesis">
              The Church Turing Thesis
            </option>
            <option value="Decidability">Decidability</option>
            <option value="Reducability">Reducability</option>
            <option value="Time Complexity">Time Complexity</option>
          </select>
        </div>

        <div className="form-group">
          <select
            className="exerciseTextareas"
            name="week"
            cols="30"
            rows="5"
            placeholder="Week"
            value={formData.week}
            onChange={(e) => onChange(e)}
          >
            <option value="1" selected="selected">
              Week 1
            </option>
            <option value="2">Week 2</option>
            <option value="3">Week 3</option>
            <option value="4">Week 4</option>
            <option value="5">Week 5</option>
            <option value="6">Week 6</option>
            <option value="7">Week 7</option>
            <option value="8">Week 8</option>
            <option value="9">Week 9</option>
            <option value="10">Week 10</option>
            <option value="11">Week 11</option>
            <option value="12">Week 12</option>
          </select>
        </div>
        {/*<div className="form-group">
          <div className="custom-file">
            <label for="file" class="exerciseTextareas">
              Optional Image
            </label>
            <input
              type="file"
              name="file"
              id="file"
              class="custom-file-input"
            />
  </div>
        </div>*/}
        <div className="form-group">
          <textarea
            className="exerciseTextareas"
            name="password"
            cols="30"
            rows="5"
            placeholder="Password (Optional)"
            value={formData.password}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
        <h3>(Reset input fields by clicking on the "Dismiss" button above)</h3>
      </form>
    </div>
  );
};

ExerciseForm.propTypes = {
  setAlert: PropTypes.func.isRequired,

  addExercise: PropTypes.func.isRequired,
};

export default connect(null, { addExercise, setAlert })(ExerciseForm);
