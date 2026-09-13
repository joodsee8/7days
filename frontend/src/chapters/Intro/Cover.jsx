import React, { useState } from 'react';
import './Cover.css';
import coverPhoto from '../../assets/images/Portadam.png';

const Cover = ({ onGoToNext }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleEnter = () => {
    if (isLeaving) return;
    setIsLeaving(true);
    // Le damos tiempo al fundido antes de navegar al índice
    setTimeout(() => {
      if (onGoToNext) onGoToNext();
    }, 900);
  };

  return (
    <div className={`cover-screen ${isLeaving ? 'cover-leaving' : ''}`}>
      <div className="cover-photo-wrap">
        <img src={coverPhoto} alt="" className="cover-photo" />
        <div className="cover-gradient" />
      </div>

      <header className="cover-masthead">
        <p className="cover-kicker">Edición de cumpleaños</p>
        <h1 className="cover-logo">E U N O I A</h1>
        <div className="cover-hairline" />
      </header>

      <div className="cover-coverline cover-coverline-left">
        <p>Sillage<br />Aquello que permanece despues de ti</p>
      </div>

      <div className="cover-star">
        <p className="cover-star-eyebrow">En portada</p>
        <h2 className="cover-star-name">MONTSE</h2>
        <p className="cover-star-caption">veinte años de ser exactamente tú</p>
      </div>

      <button className="cover-enter" onClick={handleEnter}>
        Abrir revista
      </button>

      <div className="cover-footer">
        <span>Agosto · MMXXVI</span>
        <span>No. 1</span>
      </div>
    </div>
  );
};

export default Cover;
