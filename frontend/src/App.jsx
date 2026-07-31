import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Intro from './chapters/Intro/Intro';
import IndexMenu from './components/IndexMenu/IndexMenu';
import BlueBanisters from './chapters/Day1/BlueBanisters';
import Ribs from './chapters/Day2/Ribs';
import Seven from './chapters/Day3/Seven';
import Maria from './chapters/Day4/Maria';
import Pajarito from './chapters/Day5/Pajarito';
import Long from './chapters/Day6/Long';
import Mary from './chapters/Day7/Mary';
import './App.css'; 

// Un componente envoltorio para pasarle la función de navegación a los capítulos
const ChapterWrapper = ({ Component }) => {
  const navigate = useNavigate();
  return <Component onGoToNext={() => navigate('/index')} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* La ruta inicial es la Introducción */}
        <Route path="/" element={<ChapterWrapper Component={Intro} />} />
        
        {/* El Índice Íntimo */}
        <Route path="/index" element={<IndexMenu />} />
        
        {/* Los Capítulos */}
        <Route path="/day1" element={<ChapterWrapper Component={BlueBanisters} />} />
        <Route path="/day2" element={<ChapterWrapper Component={Ribs} />} />
        <Route path="/day3" element={<ChapterWrapper Component={Seven} />} />
        <Route path="/day4" element={<ChapterWrapper Component={Maria} />} />
        <Route path="/day5" element={<ChapterWrapper Component={Pajarito} />} />
        <Route path="/day6" element={<ChapterWrapper Component={Long} />} />
        <Route path="/day7" element={<ChapterWrapper Component={Mary} />} />
      </Routes>
    </Router>
  );
};

export default App;
