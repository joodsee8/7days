import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IndexMenu.css';

const IndexMenu = () => {
  const navigate = useNavigate();
  const [lockedMessage, setLockedMessage] = useState("");

  // Función inteligente para checar si ya es la fecha
  const checkUnlocked = (dayNumber) => {
    const today = new Date();
    // Mes 7 = Agosto. Se desbloquea a la medianoche (00:00:00) de ese día.
    const releaseDate = new Date(2026, 7, dayNumber); 
    
    // Si la fecha de hoy es mayor o igual a la de liberación, retorna true
    return today >= releaseDate;
    //return true; // Para pruebas, siempre desbloqueado
  };

  // Tu lista de capítulos automatizada
  const days = [
    { id: 1, chapter: "Capítulo I", title: "Blue Banisters", path: "/day1", unlocked: checkUnlocked(1) },
    { id: 2, chapter: "Capítulo II", title: "Ribs", path: "/day2", unlocked: checkUnlocked(2) },
    { id: 3, chapter: "Capítulo III", title: "Seven", path: "/day3", unlocked: checkUnlocked(3) },
    { id: 4, chapter: "Capítulo IV", title: "María la curandera", path: "/day4", unlocked: checkUnlocked(4) },
    { id: 5, chapter: "Capítulo V", title: "Pajarito colibrí", path: "/day5", unlocked: checkUnlocked(5) },
    { id: 6, chapter: "Capítulo VI", title: "Long Live", path: "/day6", unlocked: checkUnlocked(6) },
    { id: 7, chapter: "Capítulo VII", title: "Mary", path: "/day7", unlocked: checkUnlocked(7) },
  ];

  const handleDayClick = (day) => {
    if (day.unlocked) {
      navigate(day.path);
    } else {
      // Si intenta abrirlo antes, le mostramos un pequeño mensaje sutil
      setLockedMessage(`Aún no es el momento de abrir el ${day.chapter}. Vuelve el ${day.id} de agosto.`);
      setTimeout(() => setLockedMessage(""), 3500); // El mensaje desaparece a los 3 segundos
    }
  };

  return (
    <div className="index-container fade-in">
      <div className="editorial-wrapper">
        <header className="index-header">
          <p className="index-subtitle">Índice</p>
          <h1 className="index-main-title">SIETE CARTAS</h1>
          <div className="index-hairline"></div>
        </header>

        <ul className="index-list">
          {days.map((day) => (
            <li 
              key={day.id} 
              className={`index-item ${day.unlocked ? 'unlocked' : 'locked'}`} 
              onClick={() => handleDayClick(day)}
            >
              <span className="item-chapter">{day.chapter}</span>
              <span className="item-title">
                {day.unlocked ? day.title : "??????????"}
              </span>
            </li>
          ))}
        </ul>
        
        {/* Mensaje sutil si intenta hacer trampa */}
        {lockedMessage && (
          <div style={{
            marginTop: '2rem', 
            textAlign: 'center', 
            color: '#a39f98', 
            fontStyle: 'italic',
            fontSize: '0.85rem',
            animation: 'fadeIn 0.5s ease'
          }}>
            {lockedMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexMenu;