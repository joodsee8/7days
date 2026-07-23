import React, { useState } from 'react';
import './BlueBanisters.css';

const BlueBanisters = () => {
  const [isSealed, setIsSealed] = useState(true);
  const [showLetter, setShowLetter] = useState(false);

  const handleBreakSeal = () => {
    setIsSealed(false);
    // Esperamos a que el sello se desvanezca para mostrar la carta
    setTimeout(() => {
      setShowLetter(true);
    }, 1000); 
  };

  return (
    <div className="chapter-container">
      {/* El Sello Digital */}
      {!showLetter && (
        <div 
          className={`digital-seal ${!isSealed ? 'fade-out' : ''}`} 
          onClick={handleBreakSeal}
        >
          <span className="seal-letter">M</span>
          <p className="seal-instruction">Toca para abrir</p>
        </div>
      )}

      {/* La Carta */}
      {showLetter && (
        <div className="letter-content fade-in">
          <div className="letra-cursiva">
            <p>Ocho años.</p>
            <p>A veces me cuesta creer que ha pasado tanto tiempo desde que nos conocimos en la secundaria.</p>
            {/* ... resto de tu carta ... */}
          </div>
          
          <div className="espacio-vacio"></div>

          {/* El Botón Sutil */}
          <div className="sutil-action-container">
            <span className="sutil-button">Escuchar canción</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlueBanisters;
