import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IndexMenu.css';

const IndexMenu = () => {
  const navigate = useNavigate();

  const days = [
    { id: 1, chapter: "Capítulo I", title: "Blue Banisters", path: "/day1", unlocked: true },
    { id: 2, chapter: "Capítulo II", title: "Ribs", path: "/day2", unlocked: true },
    { id: 3, chapter: "Capítulo III", title: "Seven", path: "/day3", unlocked: false },
    { id: 4, chapter: "Capítulo IV", title: "María la curandera", path: "/day4", unlocked: false },
    { id: 5, chapter: "Capítulo V", title: "Pajarito colibrí", path: "/day5", unlocked: false },
    { id: 6, chapter: "Capítulo VI", title: "Long Live", path: "/day6", unlocked: false },
    { id: 7, chapter: "Capítulo VII", title: "Mary", path: "/day7", unlocked: false },
  ];

  return (
    <div className="index-container fade-in-soft">
      <div className="editorial-wrapper">
        
        {/* Cabecera estilo libro antiguo / contraportada */}
        <div className="index-header">
          <p className="index-subtitle">Agosto 2026</p>
          <h1 className="index-main-title">CONTENIDO</h1>
          <div className="index-hairline"></div>
        </div>

        {/* Lista estructurada */}
        <ul className="index-list">
          {days.map((day) => (
            <li 
              key={day.id} 
              className={`index-item ${day.unlocked ? 'unlocked' : 'locked'}`}
              onClick={() => day.unlocked && navigate(day.path)}
            >
              <span className="item-chapter">{day.chapter}</span>
              <span className="item-title">{day.title}</span>
            </li>
          ))}
        </ul>

        {/* Remate visual en la parte inferior */}
        <div className="index-footer">
          <span>*</span><span>*</span><span>*</span>
        </div>

      </div>
    </div>
  );
};

export default IndexMenu;