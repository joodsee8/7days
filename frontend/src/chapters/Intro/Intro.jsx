import React from 'react';
import Typewriter from '../../components/Typewriter/Typewriter';

const Intro = () => {
  // El guion controla la narrativa, velocidad de escritura y tiempo de "pensamiento"
  const introScript = [
    { 
      text: "Hola, Montse.", 
      speed: 120, // Velocidad normal-lenta
      pauseAfter: 2000 // (pausa)
    },
    { 
      text: "Quiero pedirte siete días.", 
      speed: 100, 
      pauseAfter: 3000 // (pausa más larga)
    },
    { 
      text: "Nada de esto necesita una respuesta.", 
      speed: 90, 
      pauseAfter: 4000 // Da tiempo a asimilar antes de continuar
    }
  ];

  const handleIntroComplete = () => {
    // Aquí más adelante desencadenaremos la transición a la siguiente parte de la introducción
    console.log("Terminó de escribir la primera parte.");
  };

  return (
    <div className="intro-screen">
      <Typewriter 
        script={introScript} 
        onComplete={handleIntroComplete} 
      />
    </div>
  );
};

export default Intro;
