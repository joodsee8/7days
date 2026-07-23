import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ 
  title, 
  artist, 
  cover, 
  audioSrc, 
  accentColor = '#4a5d73', 
  onContinue 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  // Formatear el tiempo en minutos y segundos (ej. 3:45)
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSongEnd = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  const handleProgressClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="music-player-wrapper fade-in-soft">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />

      {!isEnded ? (
        <div className="player-container">
          <div className="player-info">
            <img src={cover} alt={`Portada de ${title}`} className="player-cover" />
            <div className="player-text">
              <h3 className="song-title">{title}</h3>
              <p className="song-artist">{artist}</p>
            </div>
            
            <button 
              className="play-pause-btn" 
              onClick={togglePlay}
              aria-label={isPlaying ? "Pausar canción" : "Reproducir canción"}
            >
              {isPlaying ? (
                // Icono de Pausa Minimalista
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                // Icono de Play Minimalista
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
          </div>

          <div className="progress-section">
            <span className="time-text">{formatTime(currentTime)}</span>
            <div 
              className="progress-bar-container" 
              ref={progressBarRef}
              onClick={handleProgressClick}
              role="slider"
              aria-valuemin="0"
              aria-valuemax={duration}
              aria-valuenow={currentTime}
              tabIndex="0"
            >
              <div className="progress-bar-background">
                <div 
                  className="progress-bar-fill" 
                  style={{ 
                    width: `${(currentTime / duration) * 100}%`,
                    backgroundColor: accentColor 
                  }}
                ></div>
              </div>
            </div>
            <span className="time-text">{formatTime(duration)}</span>
          </div>
        </div>
      ) : (
        <div className="player-outro fade-in-soft">
          <p className="outro-message">Espero que esta canción ahora también signifique algo para ti.</p>
          <button className="continue-chapter-btn" onClick={onContinue}>
            Continuar
          </button>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
