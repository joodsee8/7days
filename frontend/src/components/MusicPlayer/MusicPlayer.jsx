import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css'; 

// Esta es la función mágica que traduce tu texto LRC
const parseLRC = (lrcText) => {
  if (!lrcText) return [];
  const lines = lrcText.split('\n');
  const parsed = [];
  const timeRegex = /\[(\d{2}):(\d{2}(?:\.\d{1,3})?)\]/; 

  lines.forEach(line => {
    const match = line.match(timeRegex);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseFloat(match[2]);
      const time = minutes * 60 + seconds;
      const text = line.replace(timeRegex, '').trim();
      if (text) parsed.push({ time, text });
    }
  });
  return parsed;
};

const MusicPlayer = ({ title, artist, cover, audioSrc, rawLrc = "", onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // Nuevos estados para las letras
  const [parsedLyrics, setParsedLyrics] = useState([]);
  const [activeLyricIndex, setActiveLyricIndex] = useState(-1);

  const audioRef = useRef(null);
  const lyricsContainerRef = useRef(null);

  // Al abrir el reproductor, procesamos el LRC
  useEffect(() => {
    setParsedLyrics(parseLRC(rawLrc));
  }, [rawLrc]);

  // Cada vez que cambia la letra activa, la centramos con un scroll suave
  useEffect(() => {
    if (activeLyricIndex !== -1) {
      const activeEl = document.getElementById(`lyric-${activeLyricIndex}`);
      if (activeEl && lyricsContainerRef.current) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeLyricIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 1;
      setProgress((current / total) * 100);

      // Buscamos cuál es la frase exacta en la que estamos
      const index = parsedLyrics.findIndex((lyric, i) => {
        const nextLyric = parsedLyrics[i + 1];
        return current >= lyric.time && (!nextLyric || current < nextLyric.time);
      });

      if (index !== activeLyricIndex) {
        setActiveLyricIndex(index);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsFinished(true);
  };

  return (
    <div className="dark-player-overlay slide-up-soft">
      <div className="dark-player-container">
        
        <div className="dark-player-header">
          <p className="dark-player-subtitle">AHORA ESCUCHANDO</p>
          <div className="dark-hairline"></div>
        </div>

        {/* Sección de Letras Sincronizadas */}
        {parsedLyrics.length > 0 && (
          <div className="dark-lyrics-container" ref={lyricsContainerRef}>
            <div className="dark-lyrics-content">
              {parsedLyrics.map((lyric, index) => (
                <p 
                  key={index} 
                  id={`lyric-${index}`}
                  className={`dark-lyric-line ${index === activeLyricIndex ? 'active' : ''}`}
                >
                  {lyric.text}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="dark-player-content">
          <img src={cover} alt="cover" className="dark-player-cover" />
          
          <div className="dark-player-info">
            <h3 className="dark-player-title">{title}</h3>
            <p className="dark-player-artist">{artist}</p>
            
            <div className="dark-progress-container">
              <div className="dark-progress-bg">
                <div className="dark-progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>

          <button className="dark-play-btn" onClick={togglePlay}>
            {isPlaying ? (
              <svg className="dark-icon" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg className="dark-icon play-adjust" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21"></polygon>
              </svg>
            )}
          </button>
        </div>

        <audio 
          ref={audioRef} 
          src={audioSrc} 
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />

        {isFinished && (
          <div className="dark-completion-message fade-in-soft">
            <p className="dark-completion-text">Espero que esta canción ahora también signifique algo para ti.</p>
            <button className="dark-continue-btn" onClick={onComplete}>Cerrar capítulo</button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default MusicPlayer;