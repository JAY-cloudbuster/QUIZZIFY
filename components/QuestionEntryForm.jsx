import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const QuestionEntryForm = ({ quizId }) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const removeOption = (index) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
    if (correctAnswer === options[index]) setCorrectAnswer("");
  };

  const validate = () => {
    const errs = {};
    if (!questionText.trim()) errs.questionText = "Question text required.";
    if (options.some((opt) => !opt.trim())) errs.options = "All options must be filled.";
    if (options.length < 2) errs.options = "Minimum 2 options required.";
    if (!correctAnswer) errs.correctAnswer = "Select correct answer.";
    else if (!options.includes(correctAnswer)) errs.correctAnswer = "Correct answer must be from options.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setMessage("");
      return;
    }
    try {
      await axios.post(`${API_URL}/questions`, {
        quizId,
        questionText,
        options,
        correctAnswer,
        difficulty,
      });
      setMessage("Question added successfully!");
      setQuestionText("");
      setOptions(["", ""]);
      setCorrectAnswer("");
      setDifficulty("Medium");
      setErrors({});
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding question.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Question</h2>
      {message && <p style={{ color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question Text:</label>
          <textarea value={questionText} onChange={e => setQuestionText(e.target.value)} rows={3} />
          {errors.questionText && <span className="error">{errors.questionText}</span>}
        </div>
        <div>
          <label>Options:</label>
          {options.map((opt, idx) => (
            <div key={idx}>
              <input type="text" value={opt} onChange={e => handleOptionChange(idx, e.target.value)} style={{ width: "70%" }} />
              <button type="button" onClick={() => removeOption(idx)} disabled={options.length <= 2}>Remove</button>
            </div>
          ))}
          {errors.options && <span className="error">{errors.options}</span>}
          <button type="button" onClick={addOption}>Add Option</button>
        </div>
        <div>
          <label>Correct Answer:</label>
          <select value={correctAnswer} onChange={e => setCorrectAnswer(e.target.value)}>
            <option value="">--Select Correct Answer--</option>
            {options.filter(opt => opt.trim()).map((opt, idx) => (<option key={idx} value={opt}>{opt}</option>))}
          </select>
          {errors.correctAnswer && <span className="error">{errors.correctAnswer}</span>}
        </div>
        <div>
          <label>Difficulty:</label>
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default QuestionEntryForm;
