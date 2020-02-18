import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExercise } from "../../actions/exercise";

const ExerciseForm = ({ addExercise }) => {
  const [formData, setFormData] = useState({
    description: "",
    choices: [],
    correct_choice: ""
  });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div class="post-form">
      <div class="bg-primary p">Create an exercise</div>
      <form class="form my-1">
        <textarea
          name="description"
          cols="30"
          rows="5"
          placeholder="Description of exercise"
          value="description"
          onChange={e => onChange(e)}
        ></textarea>
      </form>
    </div>
  );
};

ExerciseForm.propTypes = {
  addExercise: PropTypes.func.isRequired
};

export default connect(null, { addExercise })(ExerciseForm);
