import React from 'react';
import './FriendSpread.css';

/**
 * Página de revista tipo "Voces": una o varias fotos con lo que
 * significan para cada amigo, en vez de una Polaroid o nota suelta.
 * `entries`: [{ photo, quote, name, role }]
 */
const FriendsSpread = ({
  kicker = 'Voces',
  deck,
  entries = [],
  accentColor = '#5A6B7C',
  continueLabel = 'Cerrar capítulo',
  onContinue,
}) => {
  if (!entries.length) return null;

  return (
    <section className="friends-spread fade-in-soft">
      <header className="friends-spread-header">
        <p className="friends-spread-kicker" style={{ color: accentColor }}>{kicker}</p>
        {deck && <p className="friends-spread-deck">{deck}</p>}
        <span className="friends-spread-rule" style={{ backgroundColor: accentColor }} />
      </header>

      <div className="friends-spread-grid">
        {entries.map((entry, index) => (
          <article className="friends-spread-entry" key={`${entry.name}-${index}`}>
            <div className="friends-spread-photo-wrap">
              <img src={entry.photo} alt="" className="friends-spread-photo" />
              <span className="friends-spread-index" style={{ color: accentColor }}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <p className="friends-spread-quote">&ldquo;{entry.quote}&rdquo;</p>

            <p className="friends-spread-byline">
              <span className="friends-spread-name">{entry.name}</span>
              {entry.role && <span className="friends-spread-role">{entry.role}</span>}
            </p>
          </article>
        ))}
      </div>

      {onContinue && (
        <div className="sutil-action-container" style={{ marginTop: '1rem' }}>
          <span className="sutil-button-dark" onClick={onContinue}>
            {continueLabel}
          </span>
        </div>
      )}
    </section>
  );
};

export default FriendsSpread;