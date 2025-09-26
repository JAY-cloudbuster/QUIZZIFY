const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

router.post("/", async (req, res) => {
  const { quizId, questionText, options, correctAnswer, difficulty } = req.body;

  if (!quizId || !questionText || !options || options.length < 2 || !correctAnswer) {
    return res.status(400).json({ message: "All fields required, min 2 options" });
  }

  if (!options.includes(correctAnswer)) {
    return res.status(400).json({ message: "Correct answer must be an option" });
  }

  try {
    const question = new Question({ quizId, questionText, options, correctAnswer, difficulty });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/quiz/:quizId", async (req, res) => {
  const { quizId } = req.params;
  try {
    const questions = await Question.find({ quizId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
