import React from 'react';
import './Polaroid.css';

const Polaroid = ({ imageSrc, message, friendName, onSaveMemory }) => {
  return (
    <div className="polaroid-wrapper fade-in-soft">
      <div className="polaroid-frame">
        <div className="polaroid-image-container">
          <img src={imageSrc} alt="Recuerdo especial" className="polaroid-photo" />
          <div className="polaroid-filter-overlay"></div>
        </div>
        <div className="polaroid-text-area">
          <p className="polaroid-message">"{message}"</p>
          <p className="polaroid-signature">— {friendName}</p>
        </div>
      </div>
      
      <div className="polaroid-action">
        <button className="save-memory-btn" onClick={onSaveMemory}>
          Guardar recuerdo
        </button>
      </div>
    </div>
  );
};

export default Polaroid;