const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  description: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  choiceA: {
    type: String
  },
  choiceB: {
    type: String
  },
  choiceC: {
    type: String
  },
  choiceD: {
    type: String
  },
  correct_choice: {
    type: String
  },
  password: {
    type: String
  },
  answers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      answer: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  correct_users: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ]
});

module.exports = Exercise = mongoose.model("exercise", ExerciseSchema);
