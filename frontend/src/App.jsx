import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Intro from './chapters/Intro/Intro';
<<<<<<< HEAD
import BlueBanisters from './chapters/Chapter1/BlueBanisters'; // Ajusta la ruta si es necesario
import './styles/global.css'; // Asegúrate de importar tus estilos globales

const App = () => {
  // Estados: 'intro' -> 'transitioning' -> 'day1'
  const [stage, setStage] = useState('intro');

  const handleTransitionToDay1 = () => {
    // Iniciamos la transición al negro total
    setStage('transitioning');
    
    // Esperamos 2 segundos en la oscuridad antes de mostrar la carta
    setTimeout(() => {
      setStage('chapter1');
    }, 2000); 
  };

  return (
    // La clase app-container manejará el color de fondo base
    <div className="app-container">
      {/* Dependiendo del estado, mostramos un componente u otro. 
          Si es 'transitioning', no renderizamos nada, dejando la pantalla negra. */}
      {stage === 'intro' && <Intro onGoToNext={handleTransitionToDay1} />}
      {stage === 'chapter1' && <BlueBanisters />}
    </div>
=======
import IndexMenu from './components/IndexMenu/IndexMenu';
import BlueBanisters from './chapters/Day1/BlueBanisters';
import Ribs from './chapters/Day2/Ribs';
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
      </Routes>
    </Router>
>>>>>>> 14a438a4d516f20713e2de88305f439b22be7896
  );
};

export default App;
