import React, { useState } from 'react';
import Intro from './chapters/Intro/Intro';
import BlueBanisters from './chapters/Day1/BlueBanisters'; // Ajusta la ruta si es necesario
import './styles/global.css'; // Asegúrate de importar tus estilos globales

const App = () => {
  // Estados: 'intro' -> 'transitioning' -> 'day1'
  const [stage, setStage] = useState('intro');

  const handleTransitionToDay1 = () => {
    // Iniciamos la transición al negro total
    setStage('transitioning');
    
    // Esperamos 2 segundos en la oscuridad antes de mostrar la carta
    setTimeout(() => {
      setStage('day1');
    }, 2000); 
  };

  return (
    // La clase app-container manejará el color de fondo base
    <div className="app-container">
      {/* Dependiendo del estado, mostramos un componente u otro. 
          Si es 'transitioning', no renderizamos nada, dejando la pantalla negra. */}
      {stage === 'intro' && <Intro onGoToNext={handleTransitionToDay1} />}
      {stage === 'day1' && <BlueBanisters />}
    </div>
  );
};

export default App;
