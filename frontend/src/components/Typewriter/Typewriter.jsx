import React, { useState, useEffect, useRef } from 'react';
import './Typewriter.css';

const Typewriter = ({ script, onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [scriptIndex, setScriptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false); // Nuevo estado para el efecto TTPD
  
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (scriptIndex >= script.length) {
      if (onComplete) onComplete();
      return;
    }

    const currentLine = script[scriptIndex];
    let charIndex = 0;
    let isCancelled = false; 

    setIsTyping(true);
    setCurrentText('');
    setIsFadingOut(false); // Reiniciamos el estado al empezar una nueva línea

    const typeChar = () => {
      if (isCancelled) return; 

      if (charIndex < currentLine.text.length) {
        const charToType = currentLine.text.charAt(charIndex);
        setCurrentText((prev) => prev + charToType);
        charIndex++;
        
        const humanVariance = Math.random() * 30 - 15;
        timeoutRef.current = setTimeout(typeChar, currentLine.speed + humanVariance);
      } else {
        setIsTyping(false);
        
        // 1. Pausa para que Montse lea y asimile la frase
        timeoutRef.current = setTimeout(() => {
          if (isCancelled) return;
          
          // 2. Iniciamos el desvanecimiento gradual
          setIsFadingOut(true);
          
          // 3. Esperamos a que termine la animación CSS (1.2s) para cambiar la línea
          timeoutRef.current = setTimeout(() => {
            if (isCancelled) return;
            setScriptIndex((prev) => prev + 1);
          }, 1200); 

        }, currentLine.pauseAfter);
      }
    };

    timeoutRef.current = setTimeout(typeChar, 500);

    return () => {
      isCancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [scriptIndex, script, onComplete]);

  return (
    <div className="typewriter-container">
      {scriptIndex < script.length && (
        <p className={`typewriter-text ${isFadingOut ? 'fade-out' : ''}`}>
          {currentText}
          <span className={`cursor ${!isTyping ? 'blinking' : ''} ${isFadingOut ? 'fade-out' : ''}`}>|</span>
        </p>
      )}
    </div>
  );
};

export default Typewriter;
