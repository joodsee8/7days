import React from 'react';
import Typewriter from '../../components/Typewriter/Typewriter';

// 1. Agregamos { onGoToNext } como parámetro para recibir la función de App.jsx
const Intro = ({ onGoToNext }) => {
  const introScript = [
    { text: "Hola, Montse.", speed: 200, pauseAfter: 100 },
    { text: "Ocho años desde que nos conocimos en la secundaria...", speed: 200, pauseAfter: 0 },
    { text: "Quiero pedirte siete días.", speed: 200, pauseAfter: 0 },
    { text: "Siete días, siete canciones, antes de tu cumpleaños.", speed: 200, pauseAfter: 0 },
    { text: "Sabes que para mí, la música siempre ha sido la forma de decir lo que a veces callo.", speed: 90, pauseAfter: 0 },
    { text: "Hay cosas que nunca dije... hasta ahora.", speed: 200, pauseAfter: 0 },
    { text: "El verdadero regalo no son las canciones, sino las historias detrás de ellas.", speed: 200, pauseAfter: 0 },
    { text: "Nada de esto necesita una respuesta.", speed: 200, pauseAfter: 0 },
    { text: "Solo es mi manera de decirte: gracias por estar ahí.", speed: 200, pauseAfter: 0 }
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
