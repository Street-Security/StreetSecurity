import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rota para a página inicial */}
        <Route path="/" element={<HomePage />} />
        
        {/* Rota para a página onde o usuário pode reportar o problema */}
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Router>
  );
};

export default App;
