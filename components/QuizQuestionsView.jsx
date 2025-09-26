import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function QuizQuestionsView() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    { id: 1, text: "Sample Question 1", options: ["Option A", "Option B", "Option C", "Option D"], answer: "Option A" }
  ]);

  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    answer: ""
  });

  // Add a new question
  function handleAddQuestion(e) {
    e.preventDefault();
    setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
    setNewQuestion({ text: "", options: ["", "", "", ""], answer: "" });
  }

  // Delete question by id
  function handleDeleteQuestion(id) {
    setQuestions(questions.filter(q => q.id !== id));
  }

  // Update question field or options
  function handleUpdateQuestion(index, field, value) {
    const updatedQuestions = [...questions];
    if (field === "options") {
      updatedQuestions[index].options = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  }

  return (
    <div className="page-bg">
      <div className="card-wide form-card" style={{ margin: "36px auto" }}>
        <h2>Quiz Questions - Quiz ID: {quizId}</h2>
        <ul>
          {questions.map((q, idx) => (
            <li className="question-list" key={q.id}>
              <input
                type="text"
                value={q.text}
                onChange={e => handleUpdateQuestion(idx, "text", e.target.value)}
              />
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  value={opt}
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  onChange={e => {
                    const opts = [...q.options];
                    opts[i] = e.target.value;
                    handleUpdateQuestion(idx, "options", opts);
                  }}
                />
              ))}
              <input
                type="text"
                value={q.answer}
                placeholder="Answer"
                onChange={e => handleUpdateQuestion(idx, "answer", e.target.value)}
              />
              <button className="delete-btn" onClick={() => handleDeleteQuestion(q.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

        <hr />

        <form onSubmit={handleAddQuestion}>
          <label>New Question</label>
          <input
            type="text"
            value={newQuestion.text}
            onChange={e => setNewQuestion({ ...newQuestion, text: e.target.value })}
            required
          />
          <label>Options</label>
          {newQuestion.options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              value={opt}
              placeholder={`Option ${String.fromCharCode(65 + idx)}`}
              onChange={e => {
                const newOpts = [...newQuestion.options];
                newOpts[idx] = e.target.value;
                setNewQuestion({ ...newQuestion, options: newOpts });
              }}
              required
            />
          ))}
          <label>Correct Answer</label>
          <input
            type="text"
            value={newQuestion.answer}
            onChange={e => setNewQuestion({ ...newQuestion, answer: e.target.value })}
            required
          />
          <button type="submit">Add</button>
        </form>

        <button className="quiz-btn" style={{ margin: "25px auto 0 auto", width: "100%" }} onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default QuizQuestionsView;
