import React, { useRef, useState, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ title, artist, cover, audioSrc, lyrics, accentColor = "#ffffff", onClose }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [parsedLyrics, setParsedLyrics] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [showEndMessage, setShowEndMessage] = useState(false);

  // Procesar LRC
  useEffect(() => {
    if (lyrics) {
      const lines = lyrics.split('\n');
      const parsed = lines.map(line => {
        const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
        if (match) {
          const minutes = parseInt(match[1], 10);
          const seconds = parseInt(match[2], 10);
          const ms = parseInt(match[3], 10);
          const text = match[4].trim();
          const time = minutes * 60 + seconds + ms / 1000;
          return { time, text };
        }
        return null;
      }).filter(item => item !== null);
      setParsedLyrics(parsed);
    }
  }, [lyrics]);

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
    const duration = audioRef.current.duration;
    setProgress((current / duration) * 100);

    // Sincronizar letra
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
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  return (
    <div className="music-player-overlay">
      <div className="music-player-container fade-in-soft">
        
        {/* Sección Superior: Letras sincronizadas */}
        <div className="lyrics-container">
          {parsedLyrics.map((line, index) => (
            <p 
              key={index} 
              className={`lyric-line ${index === currentLineIndex ? 'active' : ''}`}
              style={{ color: index === currentLineIndex ? accentColor : '#555' }}
            >
              {line.text}
            </p>
          ))}
        </div>

        {/* Sección Inferior: Controles */}
        <div className="player-controls-section">
          <img src={cover} alt="Cover" className="player-cover" />
          
          <div className="player-info">
            <h3 className="player-title">{title}</h3>
            <p className="player-artist">{artist}</p>
            
            <div className="progress-bar-container" onClick={handleProgressClick}>
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progress}%`, backgroundColor: accentColor }}
              ></div>
            </div>
          </div>

          <button className="play-btn" onClick={togglePlay} aria-label="Play/Pause" style={{ color: accentColor }}>
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>

        {showEndMessage && (
          <div className="end-message-container fade-in-soft">
            <p className="end-message-text">Espero que esta canción ahora también signifique algo para ti.</p>
            <button className="close-chapter-btn" onClick={onClose} style={{ borderColor: accentColor, color: accentColor }}>
              Cerrar capítulo
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
    </div>
  );
};

export default MusicPlayer;