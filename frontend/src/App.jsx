import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Intro from './chapters/Intro/Intro';
import IndexMenu from './components/IndexMenu/IndexMenu';
import BlueBanisters from './chapters/Day1/BlueBanisters';
// ... (Tus otras importaciones de capítulos: Ribs, Seven, etc.)
import './App.css';

// 1. Un componente especial para la Intro que checa si ya la vio
const IntroManager = () => {
  const navigate = useNavigate();
  const introSeen = localStorage.getItem('montseIntroSeen');

  // Si ya tiene el "sello", la mandamos directo al índice
  if (introSeen === 'true') {
    return <Navigate to="/index" replace />;
  }

  // Si no, le mostramos la intro y le ponemos el sello cuando avance
  const handleFinishIntro = () => {
    localStorage.setItem('montseIntroSeen', 'true'); // Guardamos el sello
    navigate('/index');
  };

  return <Intro onGoToNext={handleFinishIntro} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* La ruta principal ahora pasa por nuestro administrador de Intro */}
        <Route path="/" element={<IntroManager />} />
        
        {/* El resto de tus rutas se quedan igual */}
        <Route path="/index" element={<IndexMenu />} />
        <Route path="/day1" element={<BlueBanisters />} />
        {/* <Route path="/day2" element={<Ribs />} /> ... */}
      </Routes>
    </Router>
  );
};

export default App;