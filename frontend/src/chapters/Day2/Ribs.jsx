import React, { useState, useEffect, useRef } from 'react';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import './Ribs.css';

// Importa tus recursos directamente para que Vite los procese
import ribsCover from '../../assets/images/ribs-cover.jpg'; // Ajusta el nombre
import ribsAudio from '../../assets/music/ribs.mp3'; // Ajusta el nombre

const Ribs = ({ onGoToNext }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  
  const fullText = `Ayer hablamos de los momentos difíciles y de cómo me ayudaste a repararlos. Hoy quiero hablar de algo distinto: el tiempo. Faltan solo cinco días para que cumplas 20 años. Dejar los "diez y algo" atrás siempre da un poco de vértigo.

A veces me pongo a pensar en nosotros hace ocho años, cuando nos conocimos en la secundaria. Éramos otras personas. Todo parecía más simple, más ruidoso, más urgente. Crecer tiene esta trampa extraña: ganas un montón de cosas maravillosas, pero a cambio, a veces sientes que estás perdiendo esa etapa donde nada importaba demasiado.

Hay una canción de Lorde llamada Ribs. Para mí, captura exactamente ese sentimiento. Habla de esa nostalgia intensa, del miedo absoluto que da darse cuenta de que nos estamos haciendo mayores y de que las cosas están cambiando. "It feels so scary getting old", dice la letra.

Y es verdad, asusta un poco. Pero luego me doy cuenta de algo importante: crecer no da tanto miedo si tienes a las personas correctas a tu lado. Conocer versiones antiguas de nosotros mismos, habernos visto madurar y seguir eligiéndonos hoy, es uno de los regalos más grandes que me ha dado la vida.

Nos estamos haciendo mayores, sí. Pero lo estamos haciendo juntos.`;

  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const typeLetter = () => {
      if (indexRef.current < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(indexRef.current));
        indexRef.current++;
        
        // Velocidad rápida para lectura cómoda, pausas ligeras en los puntos
        const char = fullText.charAt(indexRef.current - 1);
        let delay = 25;
        if (char === '.' || char === ',') delay = 300;
        if (char === '\n') delay = 600;

        timeoutRef.current = setTimeout(typeLetter, delay);
      } else {
        setTimeout(() => setShowButton(true), 1500);
      }
    };

    typeLetter();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleRevealPlayer = () => {
    setShowButton(false);
    setShowPlayer(true);
  };

  return (
    <div className="day2-container fade-in-soft">
      <div className="day2-content">
        <h2 className="day2-title">2 de Agosto — Día 2: El miedo a crecer</h2>
        
        <div className="day2-letter">
          {displayedText}
          {!showButton && !showPlayer && <span className="cursor-blink">|</span>}
        </div>

        {showButton && (
          <div className="subtle-button-container fade-in-soft">
            <button className="subtle-text-button" onClick={handleRevealPlayer}>
              Escuchar canción
            </button>
          </div>
        )}

        {showPlayer && (
          <div className="player-wrapper fade-in-soft">
            <MusicPlayer 
              title="Ribs"
              artist="Lorde"
              cover={ribsCover}
              audioSrc={ribsAudio}
              accentColor="#8c7a6b"
              onComplete={onGoToNext} 
            />
            <div className="day2-reflection fade-in-soft">
              <p>Gracias por crecer conmigo. Nos vemos mañana para el día tres.</p>
              <p>Descansa, Montse.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ribs;
