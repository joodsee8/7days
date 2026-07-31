import React from 'react';
import Typewriter from '../../components/Typewriter/Typewriter';

// 1. Agregamos { onGoToNext } como parámetro para recibir la función de App.jsx
const Intro = ({ onGoToNext }) => {
  const introScript = [
    { text: "Hola Montse", speed: 90, pauseAfter: 500 },
    { text: "Antes de comenzar, quiero decirte que este proyecto es un regalo para ti. Un regalo que no es tangible, pero que espero que sientas con el corazón.", speed: 90, pauseAfter: 500 },
  { text: "Hay personas que pueden describirse con unas cuantas palabras, otras necesitan historias, recuerdos, lugares, fotografías... y, a veces, canciones.", speed: 90, pauseAfter: 500 },
  { text: "Este proyecto nació porque sentí que una sola canción no era suficiente, y que un solo día no era suficiente para celebrar lo que significas para mí.", speed: 90, pauseAfter: 500 },
  { text: "Por eso decidí reunir siete cancionesy convertirlas en siete  capítulos.", speed: 90, pauseAfter: 500 },
  { text: "Cada capítulo representa algo distinto: una parte de ti, un recuerdo que compartimos, una emoción que relaciono contigo o algo que quizá no se como expresar con palabras.", speed: 90, pauseAfter: 500 },
  { text: "No quiero que esto sea solo una playlist de canciones, cada canción tiene un significado especial y quiero que lo descubras a través de estas cartas.", speed: 90, pauseAfter: 500 },
  { text: "Tampoco busco definir quien eres para mi, para eso se necesitan mas de 7 canciones, es solo mi manera de decirte que te quiero y que te deseo lo mejor en tu cumpleaños.", speed: 90, pauseAfter: 500 },
  { text: "Bienvenida a este viaje musical, espero que lo disfrutes tanto como yo disfruté creándolo para ti.", speed: 90, pauseAfter: 500 },
  { text: "Con cariño,", speed: 90, pauseAfter: 2500 },
  { text: "Pancho", speed: 90, pauseAfter: 2500 }
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
