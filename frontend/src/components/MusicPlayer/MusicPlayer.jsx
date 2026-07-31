import React, { useRef, useState, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ 
  title, 
  artist, 
  cover, 
  audioSrc, 
  lyrics, 
  bgColor = "#462d2c", 
  textColor = "#f5e6d9", 
  accentColor = "#8aa8c4", 
  onClose 
}) => {
  const audioRef = useRef(null);
  const lyricsContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [parsedLyrics, setParsedLyrics] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showEndMessage, setShowEndMessage] = useState(false);

  // Procesar LRC
  useEffect(() => {
    if (lyrics) {
      const lines = lyrics.split('\n');
      const parsed = lines.map(line => {
        const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
        if (match) {
          const time = parseInt(match[1]) * 60 + parseInt(match[2]) + parseInt(match[3]) / 1000;
          return { time, text: match[4].trim() };
        }
        return null;
      }).filter(item => item !== null && item.text !== '');
      setParsedLyrics(parsed);
    }
  }, [lyrics]);

  // Hacer scroll automático centrando la frase (incluso si ocupa varias líneas)
  useEffect(() => {
    if (lyricsContainerRef.current && currentLineIndex >= 0) {
      const container = lyricsContainerRef.current;
      const activeElement = container.children[currentLineIndex];
      if (activeElement) {
        const offsetTop = activeElement.offsetTop - (container.clientHeight / 2) + (activeElement.clientHeight / 2);
        container.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  }, [currentLineIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;
    setProgress((current / duration) * 100);

    const activeIndex = parsedLyrics.findIndex((line, index) => {
      const nextLine = parsedLyrics[index + 1];
      return current >= line.time && (!nextLine || current < nextLine.time);
    });
    
    if (activeIndex !== -1 && activeIndex !== currentLineIndex) {
      setCurrentLineIndex(activeIndex);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setShowEndMessage(true);
  };

  const handleProgressClick = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const percentage = (e.clientX - bounds.left) / bounds.width;
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  return (
    <div className="music-player-dark fade-in" style={{ backgroundColor: bgColor, color: textColor }}>
      
      {/* Controles y Portada */}
      <div className="player-header">
        <img src={cover} alt="Cover" className="player-album-art" />
        
        <div className="player-details">
          <h3 className="song-title" style={{ color: textColor }}>{title}</h3>
          <p className="song-artist" style={{ color: textColor, opacity: 0.7 }}>{artist}</p>
          
          <div className="progress-bar-bg" onClick={handleProgressClick}>
            <div 
              className="progress-bar-active" 
              style={{ width: `${progress}%`, backgroundColor: accentColor }}
            ></div>
          </div>
        </div>

        <button 
          className="svg-play-btn" 
          onClick={togglePlay} 
          style={{ color: accentColor }}
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Carrete de Letras (Scroll Dinámico) */}
      <div className="lyrics-reel" ref={lyricsContainerRef}>
        {parsedLyrics.map((line, index) => (
          <div 
            key={index} 
            className={`lyric-line ${index === currentLineIndex ? 'active' : ''}`}
            style={{ 
              color: index === currentLineIndex ? "#ffffff" : textColor, /* Blanco iluminado al activarse */
              opacity: index === currentLineIndex ? 1 : 0.15 /* Resto casi transparente */
            }}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Mensaje Final */}
      {showEndMessage && (
        <div className="end-chapter-section fade-in" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="end-chapter-text">La canción ha terminado.</p>
          <button 
            className="continue-btn" 
            onClick={onClose} 
            style={{ borderBottomColor: accentColor, color: accentColor }}
          >
            Siguiente
          </button>
        </div>
      )}
      
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={handleEnded}
      />
    </div>
  );
};

export default MusicPlayer;