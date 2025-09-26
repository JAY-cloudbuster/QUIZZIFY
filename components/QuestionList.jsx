import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const QuestionList = ({ quizId }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!quizId) return;
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${API_URL}/questions/quiz/${quizId}`);
        setQuestions(res.data);
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };
    fetchQuestions();
  }, [quizId]);

  return (
    <div>
      <h3>Questions</h3>
      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q._id}>
              <b>{q.questionText}</b><br />
              Options: {q.options.join(", ")}<br />
              Correct Answer: {q.correctAnswer} | Difficulty: {q.difficulty}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;
