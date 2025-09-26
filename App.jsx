import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizHomePage from './components/QuizHomePage';
import QuizQuestionsView from './components/QuizQuestionsView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<QuizHomePage />} />
      <Route path="/quiz/:quizId/questions" element={<QuizQuestionsView />} />
    </Routes>
  );
}

export default App;
