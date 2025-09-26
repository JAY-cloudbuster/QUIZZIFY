import React, { useState } from "react";

function QuizCreationForm({ setQuizzes, quizzes }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const newQuiz = { id: Date.now(), title, subject, time, questions: [] };
    setQuizzes([...quizzes, newQuiz]);
    setTitle(''); setSubject(''); setTime('');
  }

  return (
    <div className="card-wide form-card">
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit}>
        <label>Quiz Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />

        <label>Time Limit (minutes)</label>
        <input type="number" value={time} onChange={e => setTime(e.target.value)} min="1" required />

        <label>Subject</label>
        <select value={subject} onChange={e => setSubject(e.target.value)} required>
          <option value="">--Select--</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
        </select>
        <button>Create Quiz</button>
      </form>
    </div>
  );
}
export default QuizCreationForm;
