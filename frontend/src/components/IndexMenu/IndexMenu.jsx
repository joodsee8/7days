import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IndexMenu.css';

import thumbDay1 from '../../assets/images/IMG_0105.jpeg';
import thumbDay2 from '../../assets/images/ribs-cover.jpg';
import thumbDay3 from '../../assets/images/folklore.jpg';
import thumbDay4 from '../../assets/images/pajarito.jpg';
import thumbDay5 from '../../assets/images/pajarito.jpg';
import thumbDay6 from '../../assets/images/femme.jpg';
import thumbDay7 from '../../assets/images/femme.jpg';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

const IndexMenu = () => {
  const navigate = useNavigate();
  const [lockedMessage, setLockedMessage] = useState('');

  // Función inteligente para checar si ya es la fecha (sin cambios)
  const checkUnlocked = (dayNumber) => {
    const today = new Date();
    const releaseDate = new Date(2026, 8, dayNumber);
    return today >= releaseDate;
    // return true; // Para pruebas, siempre desbloqueado
  };

  // Tu lista de capítulos, con la miniatura y el día de liberación real de cada uno
  const days = [
    { id: 1, chapter: 'Capítulo I', title: 'Blue Banisters', artist: 'Lana Del Rey', path: '/day1', thumb: thumbDay1, releaseDay: 1, unlocked: checkUnlocked(1) },
    { id: 2, chapter: 'Capítulo II', title: 'Ribs', artist: 'Lorde', path: '/day2', thumb: thumbDay2, releaseDay: 2, unlocked: checkUnlocked(2) },
    { id: 3, chapter: 'Capítulo III', title: 'Seven', artist: 'Taylor Swift', path: '/day3', thumb: thumbDay3, releaseDay: 3, unlocked: checkUnlocked(3) },
    { id: 4, chapter: 'Capítulo IV', title: 'María la curandera', artist: 'Natalia Lafourcade', path: '/day4', thumb: thumbDay4, releaseDay: 4, unlocked: checkUnlocked(4) },
    { id: 5, chapter: 'Capítulo V', title: 'Pajarito colibrí', artist: 'Natalia Lafourcade', path: '/day5', thumb: thumbDay5, releaseDay: 6, unlocked: checkUnlocked(6) },
    { id: 6, chapter: 'Capítulo VI', title: 'Long Live', artist: 'Taylor Swift', path: '/day6', thumb: thumbDay6, releaseDay: 30, unlocked: checkUnlocked(30) },
    { id: 7, chapter: 'Capítulo VII', title: 'Mary', artist: 'Mon Laferte', path: '/day7', thumb: thumbDay7, releaseDay: 30, unlocked: checkUnlocked(30) },
  ];

  const handleDayClick = (day) => {
    if (day.unlocked) {
      navigate(day.path);
    } else {
      setLockedMessage(`Aún no es el momento de abrir el ${day.chapter}. Vuelve el ${day.releaseDay} de agosto.`);
      setTimeout(() => setLockedMessage(''), 3500);
    }
  };

  return (
    <div className="toc-container fade-in">
      <div className="toc-wrapper">

        {/* Masthead pequeño, igual firma que la portada */}
        <div className="toc-running-head">
          <span>Septenario</span>
          <span>No. 1</span>
        </div>

        <header className="toc-header">
          <p className="toc-kicker">En este número</p>
          <h1 className="toc-title">Índice</h1>
          <div className="toc-hairline" />
        </header>

        <ul className="toc-list">
          {days.map((day, index) => (
            <li
              key={day.id}
              className={`toc-row ${day.unlocked ? 'unlocked' : 'locked'}`}
              onClick={() => handleDayClick(day)}
            >
              <span className="toc-numeral">{ROMAN[index]}</span>

              <span className="toc-thumb-wrap">
                {day.unlocked ? (
                  <img src={day.thumb} alt="" className="toc-thumb" />
                ) : (
                  <span className="toc-thumb-placeholder" aria-hidden="true" />
                )}
              </span>

              <span className="toc-copy">
                {day.unlocked ? (
                  <>
                    <span className="toc-item-title">{day.title}</span>
                    <span className="toc-item-deck">{day.artist}</span>
                  </>
                ) : (
                  <>
                    <span className="toc-item-title redacted">— — — —</span>
                    <span className="toc-item-deck">Disponible el {day.releaseDay} de agosto</span>
                  </>
                )}
              </span>

              <span className="toc-chevron" aria-hidden="true">
                {day.unlocked ? '›' : '·'}
              </span>
            </li>
          ))}
        </ul>

        {lockedMessage && (
          <div className="toc-locked-note">{lockedMessage}</div>
        )}

        <div className="toc-footer">
          <span>Agosto · MMXXVI</span>
          <span>Edición especial</span>
        </div>
      </div>
    </div>
  );
};

export default IndexMenu;