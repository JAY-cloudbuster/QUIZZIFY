const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

router.post("/", async (req, res) => {
  const { title, teacherId, timeLimit, subject } = req.body;

  if (!title || !teacherId || !timeLimit || !subject) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const quiz = new Quiz({ title, teacherId, timeLimit, subject });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Quiz title must be unique per teacher" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/teacher/:teacherId", async (req, res) => {
  const { teacherId } = req.params;
  try {
    const quizzes = await Quiz.find({ teacherId });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
