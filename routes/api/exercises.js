const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/Users");
const Exercise = require("../../models/Exercise");

//@router POST api/exercises
//@desc Create a post
//@access Private

router.post(
  "/",
  [auth, [check("description", "Description is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newExercise = new Exercise({
        description: req.body.description,
        choiceA: req.body.choiceA,
        choiceB: req.body.choiceB,
        choiceC: req.body.choiceC,
        choiceD: req.body.choiceD,
        correct_choice: req.body.correct_choice,
        chapter: req.body.chapter,
        password: req.body.password,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const salt = await bcrypt.genSalt(10);

      newExercise.password = await bcrypt.hash(req.body.password, salt);

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

//@router POST api/exercises/:id
//@desc Get exercise by ID
//@access Private
router.post(
  "/:id",
  [auth, [check("password", "Password is required").exists()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {
      const exercise = await Exercise.findById(req.params.id);

      if (!exercise) {
        return res.status(404).json({ msg: "Exercise not found" });
      }

      const isMatch = await bcrypt.compare(password, exercise.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Wrong Password for the exercise" }] });
      }
      res.json(exercise);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Exercise not found" });
      }
      res.status(500).send("Server Error");
    }
  }
);

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

// @route  PUT api/exercises/answer/:id
// @desc   asnwer an exercise
// @access Private
router.post("/answer/:id", auth, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    //Check if the exercise has already been answered
    if (
      exercise.answers.filter(
        (answer) => answer.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: "Exercise already asnwered" });
    }
    const newAnswer = {
      user: req.user.id,
      answer: req.body.answer,
    };
    exercise.answers.unshift(newAnswer);

    await exercise.save();

    res.json(exercise.answers);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route  PUT api/exercises/correct_users/:id
// @desc   like a post
// @access Private
router.put("/correct_users/:id", auth, async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    //Check if the post has already been liked
    if (
      exercise.correct_users.filter(
        (correct_user) => correct_users.user.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "Exercise already answered correctly" });
    }

    exercise.correct_users.unshift({ user: req.user.id });

    await exercise.save();

    res.json(exercise.correct_users);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});
module.exports = router;
