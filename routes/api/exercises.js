const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/Users");
const Exercise = require("../../models/Exercise");

//@router POST api/exercises
//@desc Create a post
//@access Private

router.post(
  "/",
  [
    auth,
    [
      check("description", "Description is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newExercise = new Exercise({
        description: req.body.description,
        choices: req.body.choices,
        correct_choice: req.body.correct_choice,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const exercise = await newExercise.save();

      res.json(exercise);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@router GET api/exercises
//@desc Get all exercises
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const exercises = await Exercise.find().sort({ date: -1 });
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@router GET api/exercises/:id
//@desc Get exercise by ID
//@access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({ msg: "Exercise not found" });
    }
    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Exercise not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@router DELETE api/exercises/:id
//@desc Delete an exercise
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      return res.status(404).json({ msg: "Exercise not found" });
    }

    //Check user
    if (exercise.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await exercise.remove();

    res.json({ msg: "Exercise removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Exercise not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
