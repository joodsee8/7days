import React, { useState, useEffect, useRef } from 'react';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import './Seven.css';

// Importa tus recursos. Ajusta los nombres exactos que uses.
import sevenCover from '../../assets/images/seven-cover.jpg'; 
import sevenAudio from '../../assets/music/seven.mp3'; 

const Seven = ({ onGoToNext }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  
  const fullText = `Ayer hablábamos de lo aterrador que puede ser crecer. Pero hoy, a cuatro días de tus 20 años, quiero hablar de la otra cara de la moneda: las cosas que permanecen.

Conocernos hace ocho años significa que compartimos una versión de nosotros que todavía era muy niña. Hay una pureza en esa etapa, una forma de querer a las personas que es directa, sencilla y muy real.

Taylor Swift tiene una canción llamada Seven. Para mí, captura exactamente esto. Habla de los recuerdos de la infancia y de cómo el cariño de esa época se queda guardado para siempre, intacto, sobreviviendo al paso de los años. "Love you to the moon and to Saturn", dice.

Y creo que eso es lo que pasa con nosotros. Podemos crecer, podemos cambiar, podemos estar a punto de empezar tu segunda década de vida... pero hay una parte de nuestra historia que siempre va a conservar esa calidez de cuando éramos más jóvenes. Eres, y siempre serás, una parte fundamental de mi historia.`;

  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const typeLetter = () => {
      if (indexRef.current < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(indexRef.current));
        indexRef.current++;
        
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
    <div className="day3-container fade-in-soft">
      <div className="day3-content">
        <h2 className="day3-title">3 de Agosto — Día 3: A la luna y a Saturno</h2>
        
        <div className="day3-letter">
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
              title="Seven"
              artist="Taylor Swift"
              cover={sevenCover}
              audioSrc={sevenAudio}
              accentColor="#a89f91" 
              onComplete={onGoToNext} 
            />
            <div className="day3-reflection fade-in-soft">
              <p>Gracias por ser un lugar seguro en mis recuerdos.</p>
              <p>Nos vemos mañana para el día cuatro. Descansa, Montse.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seven;
