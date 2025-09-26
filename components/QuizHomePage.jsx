import React, { useState } from "react";
import QuizCreationForm from "./QuizCreationForm";
import QuestionEntryForm from "./QuestionEntryForm";
import QuizList from "./QuizList";

function QuizHomePage() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Demo logic, replace with real backend calls as needed
  return (
    <div className="page-bg">
      <div className="home-main-row">
        <QuizCreationForm setQuizzes={setQuizzes} quizzes={quizzes} />
        <QuestionEntryForm selectedQuiz={selectedQuiz} />
      </div>
      <QuizList quizzes={quizzes} setQuizzes={setQuizzes} setSelectedQuiz={setSelectedQuiz} />
    </div>
  );
}
export default QuizHomePage;
