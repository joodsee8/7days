import React, { useState } from 'react';
import Intro from './chapters/Intro/Intro';
import BlueBanisters from './chapters/Chapter1/BlueBanisters'; // Asegúrate de que la ruta sea correcta
import './styles/global.css';

function App() {
  // El estado inicia en la introducción
  const [currentChapter, setCurrentChapter] = useState('intro');
  // Estado para manejar el fundido a negro (el suspiro visual)
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleGoToNext = () => {
    // 1. Inicia el fundido a negro
    setIsTransitioning(true);
    
    // 2. Espera 2 segundos en total silencio/oscuridad
    setTimeout(() => {
      // 3. Cambia el componente al Capítulo 1
      setCurrentChapter('chapter1');
      // 4. Quita el fundido para que el Capítulo 1 emerja
      setIsTransitioning(false);
    }, 2000); 
  };

  return (
    <div className={`app-container ${isTransitioning ? 'fade-to-black' : ''}`}>
      {currentChapter === 'intro' && <Intro onGoToNext={handleGoToNext} />}
      {currentChapter === 'chapter1' && <BlueBanisters />}
    </div>
  );
}

export default App;
