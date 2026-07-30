import React, { useState, useEffect, useRef } from 'react';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
// import Polaroid from '../../components/Polaroid/Polaroid';
import './Ribs.css'; 

// Importa tus recursos directamente
import ribsCover from '../../assets/images/ribs-cover.jpg'; 
import ribsAudio from '../../assets/music/ribs.mp3'; 
// import friendsPhoto from '../../assets/images/polaroid-dia2.jpg'; // Reemplaza con tu foto

const Ribs = ({ onGoToNext }) => {
  // Estados para la escritura párrafo por párrafo (Estructura Blue Banisters)
  const [completedParagraphs, setCompletedParagraphs] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [paragraphIndex, setParagraphIndex] = useState(0);
  
  // Estados de la interfaz
  const [showButton, setShowButton] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showPolaroid, setShowPolaroid] = useState(false);
  
  const paragraphs = [
    "Ayer hablamos de los momentos difíciles y de cómo me ayudaste a repararlos. Hoy quiero hablar de algo distinto: el tiempo. Faltan solo cinco días para que cumplas 20 años. Dejar los \"diez y algo\" atrás siempre da un poco de vértigo.",
    "Nos estamos haciendo mayores, sí. Pero lo estamos haciendo juntos."
  ];

  const songLyrics = [
    "The drink you spilt all over me",
    "Lover's Spit left on repeat",
    "My mom and dad let me stay home",
    "It drives you crazy getting old",
    "We can talk it so good",
    "We can make it so divine",
    "We can talk it good",
    "How you wish it would be all the time",
    "This dream isn't feeling sweet",
    "We're reeling through the midnight streets",
    "And I've never felt more alone",
    "It feels so scary getting old"
  ];

  const charIndexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Si ya escribimos todos los párrafos, mostramos el botón tras una pausa
    if (paragraphIndex >= paragraphs.length) {
      timeoutRef.current = setTimeout(() => setShowButton(true), 1500);
      return;
    }

    const typeChar = () => {
      const currentParagraph = paragraphs[paragraphIndex];

      if (charIndexRef.current < currentParagraph.length) {
        setCurrentText((prev) => prev + currentParagraph.charAt(charIndexRef.current));
        charIndexRef.current++;
        
        const char = currentParagraph.charAt(charIndexRef.current - 1);
        let delay = 25; 
        if (char === '.' || char === ',') delay = 300; 

        // Variación humana para que no se sienta robótico
        const humanVariance = Math.floor(Math.random() * 30) - 15;
        timeoutRef.current = setTimeout(typeChar, delay + humanVariance);
      } else {
        // Párrafo completado: lo guardamos y avanzamos al siguiente
        setCompletedParagraphs((prev) => [...prev, currentParagraph]);
        setCurrentText('');
        setParagraphIndex((prev) => prev + 1);
        charIndexRef.current = 0;
      }
    };

    // Pequeña pausa antes de iniciar cada párrafo para que la carta "respire"
    timeoutRef.current = setTimeout(typeChar, 400);

    return () => clearTimeout(timeoutRef.current);
  }, [paragraphIndex]);

  const handleRevealPlayer = () => {
    setShowButton(false);
    setShowPlayer(true);
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setShowPolaroid(true);
  };

  return (
    <div className="day2-container fade-in-soft">
      <div className="day2-content">
        <h2 className="day2-title">2 de Agosto — Capítulo II: El miedo a crecer</h2>
        
        <div className="day2-letter">
          {/* Renderizamos los párrafos terminados */}
          {completedParagraphs.map((text, idx) => (
            <p key={idx} className="day2-paragraph fade-in-soft">{text}</p>
          ))}
          {/* Renderizamos el párrafo que se está escribiendo en vivo */}
          {paragraphIndex < paragraphs.length && (
            <p className="day2-paragraph">
              {currentText}
              <span className="cursor-blink">|</span>
            </p>
          )}
        </div>

        {showButton && (
          <div className="subtle-button-container fade-in-soft">
            <button className="subtle-text-button" onClick={handleRevealPlayer}>
              Escuchar canción
            </button>
          </div>
        )}

        {/* Reproductor Oscuro con Letras */}
        {showPlayer && (
          <MusicPlayer 
            title="Ribs"
            artist="Lorde"
            cover={ribsCover}
            audioSrc={ribsAudio}
            lyrics={songLyrics}
            onComplete={handleClosePlayer} 
          />
        )}

        {/* Sorpresa Polaroid al cerrar la canción */}
        {showPolaroid && (
          <Polaroid 
            imageSrc={friendsPhoto}
            message="Crecer a tu lado ha sido mi parte favorita. ¡Casi 20!"
            friendName="Un amigo incondicional"
            onSaveMemory={onGoToNext} 
          />
        )}
      </div>
    </div>
  );
};

export default Ribs;