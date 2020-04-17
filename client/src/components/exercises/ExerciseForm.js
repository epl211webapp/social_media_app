import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExercise } from "../../actions/exercise";

const ExerciseForm = ({ addExercise }) => {
  const [formData, setFormData] = useState({
    description: "",
    choiceA: "",
    choiceB: "",
    choiceC: "",
    choiceD: "",
    chapter: "Regular Languages",

    correct_choice: "",
    password: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addExercise(formData);
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
        <div className="form-group">
          <textarea
            className="exerciseTextareas"
            name="choiceA"
            cols="30"
            rows="5"
            placeholder="Choice A"
            value={formData.choiceA}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className="form-group">
          <textarea
            className="exerciseTextareas"
            name="choiceB"
            cols="30"
            rows="5"
            placeholder="Choice B"
            value={formData.choiceB}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className="form-group">
          <textarea
            className="exerciseTextareas"
            name="choiceC"
            cols="30"
            rows="5"
            placeholder="Choice C"
            value={formData.choiceC}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className="form-group">
          <textarea
            className="exerciseTextareas"
            name="choiceD"
            cols="30"
            rows="5"
            placeholder="Choice D"
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
            placeholder="Correct choice"
            value={formData.correct_choice}
            onChange={(e) => onChange(e)}
          ></textarea>
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
            placeholder="Password"
            value={formData.password}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

ExerciseForm.propTypes = {
  addExercise: PropTypes.func.isRequired,
};

export default connect(null, { addExercise })(ExerciseForm);
