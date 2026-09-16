import React from 'react';
import './LockedCard.css';

/**
 * Tarjeta que representa una sección todavía bloqueada
 * (por ejemplo el reproductor, antes de terminar de leer la carta).
 */
const LockedCard = ({ label = 'Bloqueado', hint, accentColor = '#7a766f' }) => {
  return (
    <div className="locked-card" style={{ borderColor: `${accentColor}66` }}>
      <span className="locked-card-icon" style={{ color: accentColor }} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="5" y="11" width="14" height="9" rx="1.5" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      </span>
      <span className="locked-card-text">
        <span className="locked-card-label">{label}</span>
        {hint && <span className="locked-card-hint">{hint}</span>}
      </span>
    </div>
  );
};

export default LockedCard;