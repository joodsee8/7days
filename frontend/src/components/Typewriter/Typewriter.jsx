import React, { useState, useEffect } from 'react';
import './Typewriter.css';

const Typewriter = ({ script, onComplete }) => {
  const [completedLines, setCompletedLines] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [scriptIndex, setScriptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Si ya terminamos el guion, avisamos al componente padre
    if (scriptIndex >= script.length) {
      if (onComplete) onComplete();
      return;
    }

    const currentLine = script[scriptIndex];
    let charIndex = 0;
    setIsTyping(true);

    // Función para escribir carácter por carácter
    const typeChar = () => {
      if (charIndex < currentLine.text.length) {
        setCurrentText((prev) => prev + currentLine.text.charAt(charIndex));
        charIndex++;
        // Variación de velocidad para que se sienta más humano
        const humanVariance = Math.random() * 30 - 15; 
        setTimeout(typeChar, currentLine.speed + humanVariance);
      } else {
        // Terminó de escribir la línea, inicia la pausa de pensamiento
        setIsTyping(false);
        setTimeout(() => {
          setCompletedLines((prev) => [...prev, currentLine.text]);
          setCurrentText('');
          setScriptIndex((prev) => prev + 1);
        }, currentLine.pauseAfter);
      }
    };

    // Pequeño retraso inicial antes de empezar a escribir cada línea
    const initialDelay = setTimeout(typeChar, 500);

    return () => clearTimeout(initialDelay);
  }, [scriptIndex, script, onComplete]);

  return (
    <div className="typewriter-container">
      {completedLines.map((line, index) => (
        <p key={index} className="typewriter-text">{line}</p>
      ))}
      
      {/* Línea actual en proceso de escritura */}
      {(currentText || isTyping || scriptIndex === 0) && (
        <p className="typewriter-text">
          {currentText}
          <span className={`cursor ${!isTyping ? 'blinking' : ''}`}>|</span>
        </p>
      )}
    </div>
  );
};

export default Typewriter;
