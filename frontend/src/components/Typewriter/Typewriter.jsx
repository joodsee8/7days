import React, { useState, useEffect, useRef } from 'react';
import './Typewriter.css';

const Typewriter = ({ script, onComplete }) => {
  const [completedLines, setCompletedLines] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [scriptIndex, setScriptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  // Usamos un ref para controlar los timeouts y evitar que se crucen en React StrictMode
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (scriptIndex >= script.length) {
      if (onComplete) onComplete();
      return;
    }

    const currentLine = script[scriptIndex];
    let charIndex = 0;
    let isCancelled = false; // Bandera de seguridad para desmontajes

    setIsTyping(true);
    setCurrentText('');

    const typeChar = () => {
      if (isCancelled) return; // Si el componente se desmontó, cancelamos la escritura

      if (charIndex < currentLine.text.length) {
        setCurrentText((prev) => prev + currentLine.text.charAt(charIndex));
        charIndex++;
        
        const humanVariance = Math.random() * 30 - 15;
        // Guardamos el timeout en la referencia
        timeoutRef.current = setTimeout(typeChar, currentLine.speed + humanVariance);
      } else {
        setIsTyping(false);
        // Guardamos el timeout de la pausa
        timeoutRef.current = setTimeout(() => {
          if (isCancelled) return;
          setCompletedLines((prev) => [...prev, currentLine.text]);
          setCurrentText('');
          setScriptIndex((prev) => prev + 1);
        }, currentLine.pauseAfter);
      }
    };

    timeoutRef.current = setTimeout(typeChar, 500);

    // Función de limpieza: si React ejecuta el efecto de nuevo, matamos el timeout anterior
    return () => {
      isCancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [scriptIndex, script, onComplete]);

  return (
    <div className="typewriter-container">
      {completedLines.map((line, index) => (
        <p key={index} className="typewriter-text">{line}</p>
      ))}
      
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
