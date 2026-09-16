import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Cover from './chapters/Intro/Cover';
import IndexMenu from './components/IndexMenu/IndexMenu';
import BlueBanisters from './chapters/Day1/BlueBanisters';
import Ribs from './chapters/Day2/Ribs';
import Seven from './chapters/Day3/Seven';
import Maria from './chapters/Day4/Maria';
import Pajarito from './chapters/Day5/Pajarito';
import Long from './chapters/Day6/Long';
import Mary from './chapters/Day7/Mary';
import './App.css';
import ScrollToTop from './components/ScrollToTop';

// La portada ya no depende de localStorage: siempre es la página principal,
// como abrir físicamente la revista cada vez.
const CoverScreen = () => {
  const navigate = useNavigate();
  return <Cover onGoToNext={() => navigate('/index')} />;
};


const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<CoverScreen />} />
        <Route path="/index" element={<IndexMenu />} />
        <Route path="/day1" element={<BlueBanisters />} />
        <Route path="/day2" element={<Ribs />} />
        <Route path="/day3" element={<Seven />} />
        <Route path="/day4" element={<Maria />} />
        <Route path="/day5" element={<Pajarito />} />
        <Route path="/day6" element={<Long />} />
        <Route path="/day7" element={<Mary />} />
      </Routes>
    </Router>
  );
};

export default App;