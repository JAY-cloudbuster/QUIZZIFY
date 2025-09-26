import React from "react";

function QuizList({ quizzes, setQuizzes, setSelectedQuiz }) {
  function deleteQuiz(id) {
    setQuizzes(quizzes.filter(q => q.id !== id));
    // Also call backend API to delete
  }

  return (
    <div className="quizzes-section">
      <h2>Your Quizzes</h2>
      <ul>
        {quizzes.map(q => (
          <li key={q.id} className="quiz-list-item">
            <span onClick={() => setSelectedQuiz(q)}>
              <strong>{q.title}</strong> ({q.subject}) - {q.time} mins
            </span>
            <button className="delete-btn" onClick={() => deleteQuiz(q.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default QuizList;
