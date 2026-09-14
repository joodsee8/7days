import React from 'react';
import './ContributorNote.css';

/**
 * Nota estilo "voces de revista": una cita corta firmada por alguien,
 * con foto opcional, en vez de una Polaroid suelta.
 */
const ContributorNote = ({
  quote,
  name,
  role,
  photo,
  accentColor = '#5A6B7C',
  continueLabel = 'Cerrar capítulo',
  onContinue,
}) => {
  return (
    <div className="contributor-note fade-in-soft">
      <span className="contributor-note-mark" style={{ color: accentColor }} aria-hidden="true">
        &ldquo;
      </span>

      <p className="contributor-note-quote">{quote}</p>

      <div className="contributor-note-byline">
        {photo && (
          <span className="contributor-note-photo" style={{ borderColor: accentColor }}>
            <img src={photo} alt="" />
          </span>
        )}
        <span className="contributor-note-id">
          <span className="contributor-note-name">{name}</span>
          {role && <span className="contributor-note-role">{role}</span>}
        </span>
      </div>

      {onContinue && (
        <div className="sutil-action-container" style={{ marginTop: '2.4rem' }}>
          <span className="sutil-button-dark" onClick={onContinue}>
            {continueLabel}
          </span>
        </div>
      )}
    </div>
  );
};

export default ContributorNote;