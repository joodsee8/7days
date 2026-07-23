import React, { useState } from 'react';
import Typewriter from '../../components/Typewriter/Typewriter';
import './Intro.css';

// Agregamos onGoToNext a las propiedades (props)
const Intro = ({ onGoToNext }) => {
  const [isFinished, setIsFinished] = useState(false);
}
  const introScript = [
    { text: "Hola, Montse.", speed: 120, pauseAfter: 2500 },
    // { text: "Ocho años desde que nos conocimos en la secundaria...", speed: 100, pauseAfter: 3000 },
    //{ text: "Quiero pedirte siete días.", speed: 110, pauseAfter: 2500 },
    //{ text: "Siete días, siete canciones, antes de tu cumpleaños.", speed: 95, pauseAfter: 3500 },
    //{ text: "Sabes que para mí, la música siempre ha sido la forma de decir lo que a veces callo.", speed: 90, pauseAfter: 3500 },
    //{ text: "Hay cosas que nunca dije... hasta ahora.", speed: 95, pauseAfter: 3000 },
    //{ text: "El verdadero regalo no son las canciones, sino las historias detrás de ellas.", speed: 90, pauseAfter: 3500 },
    //{ text: "Nada de esto necesita una respuesta.", speed: 110, pauseAfter: 2500 },
    //{ text: "Solo es mi manera de decirte: gracias por estar ahí.", speed: 100, pauseAfter: 4000 }
  ];

  const handleScriptComplete = () => {
    // Esperamos un momento después de la última palabra antes de mostrar el botón
    setTimeout(() => {
      setIsFinished(true);
    }, 2000);
  };

  return (
    <div className="intro-container">
      <Typewriter script={tuGuion} onComplete={handleScriptComplete} />
      
      {/* El botón sutil que detona la transición en App.jsx */}
      {isFinished && (
        <div className="continue-wrapper fade-in-button">
          <span className="sutil-button" onClick={onGoToNext}>
            Abrir 1 de agosto
          </span>
        </div>
      )}
    </div>
  );
};

export default Intro;



  
