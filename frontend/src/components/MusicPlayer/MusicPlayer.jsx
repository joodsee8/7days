import React, { useRef, useState, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ title, artist, cover, audioSrc, lyrics, accentColor = "#5A6B7C", onClose }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [parsedLyrics, setParsedLyrics] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [showEndMessage, setShowEndMessage] = useState(false);

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
    <div className="music-player-clean fade-in">
      
      {/* Controles y Portada */}
      <div className="player-header">
        <img src={cover} alt="Cover" className="player-album-art" />
        
        <div className="player-details">
          <h3 className="song-title">{title}</h3>
          <p className="song-artist">{artist}</p>
          
          <div className="progress-bar-bg" onClick={handleProgressClick}>
            <div 
              className="progress-bar-active" 
              style={{ width: `${progress}%`, backgroundColor: accentColor }}
            ></div>
          </div>
        </div>

        <button 
          className="clean-play-btn" 
          onClick={togglePlay} 
          style={{ color: accentColor }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      {/* Letras Sincronizadas */}
      <div className="lyrics-display">
        {parsedLyrics.map((line, index) => (
          <p 
            key={index} 
            className={`lyric-text ${index === currentLineIndex ? 'active' : ''}`}
            style={{ color: index === currentLineIndex ? accentColor : '#999' }}
          >
            {line.text}
          </p>
        ))}
      </div>

      {/* Mensaje Final */}
      {showEndMessage && (
        <div className="end-chapter-section fade-in">
          <p className="end-chapter-text">El capítulo termina aquí.</p>
          <button 
            className="continue-btn" 
            onClick={onClose} 
            style={{ borderBottomColor: accentColor, color: accentColor }}
          >
            Ver recuerdos
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