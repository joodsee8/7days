import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IndexMenu.css';

const IndexMenu = () => {
  const navigate = useNavigate();

  // Configuración de los 7 días. Solo los que están 'unlocked: true' se pueden abrir.
  const days = [
    { id: 1, date: "1 de Agosto", title: "Blue Banisters", path: "/day1", unlocked: true },
    { id: 2, date: "2 de Agosto", title: "Ribs", path: "/day2", unlocked: true },
    { id: 3, date: "3 de Agosto", title: "Seven", path: "/day3", unlocked: false },
    { id: 4, date: "4 de Agosto", title: "María la curandera", path: "/day4", unlocked: false },
    { id: 5, date: "5 de Agosto", title: "Pajarito colibrí", path: "/day5", unlocked: false },
    { id: 6, date: "6 de Agosto", title: "Long Live", path: "/day6", unlocked: false },
    { id: 7, date: "7 de Agosto", title: "Mary", path: "/day7", unlocked: false },
  ];

  return (
    <div className="index-container fade-in-soft">
      <div className="index-content">
        <ul className="index-list">
          {days.map((day) => (
            <li 
              key={day.id} 
              className={`index-item ${day.unlocked ? 'unlocked' : 'locked'}`}
              onClick={() => day.unlocked && navigate(day.path)}
            >
              <span className="index-date">{day.date}</span>
              <span className="index-separator">—</span>
              <span className="index-song">{day.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndexMenu;
