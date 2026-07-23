import React from 'react';
import Typewriter from '../../components/Typewriter/Typewriter';

// 1. Agregamos { onGoToNext } como parámetro para recibir la función de App.jsx
const Intro = ({ onGoToNext }) => {
  const introScript = [
    { text: "Hola, Montse.", speed: 120, pauseAfter: 2500 },
    { text: "Ocho años desde que nos conocimos en la secundaria...", speed: 100, pauseAfter: 3000 },
    { text: "Quiero pedirte siete días.", speed: 110, pauseAfter: 2500 },
    { text: "Siete días, siete canciones, antes de tu cumpleaños.", speed: 95, pauseAfter: 3500 },
    { text: "Sabes que para mí, la música siempre ha sido la forma de decir lo que a veces callo.", speed: 90, pauseAfter: 3500 },
    { text: "Hay cosas que nunca dije... hasta ahora.", speed: 95, pauseAfter: 3000 },
    { text: "El verdadero regalo no son las canciones, sino las historias detrás de ellas.", speed: 90, pauseAfter: 3500 },
    { text: "Nada de esto necesita una respuesta.", speed: 110, pauseAfter: 2500 },
    { text: "Solo es mi manera de decirte: gracias por estar ahí.", speed: 100, pauseAfter: 4000 }
  ];

  const handleIntroComplete = () => {
    // Mantenemos tu console.log porque es útil para saber que todo va bien
    console.log("Terminó la introducción. Transición hacia el Día 1: Blue Banisters.");
    
    // 2. Ejecutamos la función que nos mandó App.jsx para cambiar el estado
    if (onGoToNext) {
      onGoToNext();
    }
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
