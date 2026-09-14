import React, { useRef, useState, useEffect } from 'react';
import './MusicPlayer.css';

const formatTime = (seconds) => {
  if (!seconds || Number.isNaN(seconds) || !Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const MusicPlayer = ({
  title,
  artist,
  cover,
  audioSrc,
  lyrics,
  endText,
  bgColor = "#462d2c",
  textColor = "#f5e6d9",
  accentColor = "#8aa8c4",
  onClose
}) => {
  const audioRef = useRef(null);
  const lyricsContainerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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
          const [originalText, translatedText] = match[4].split('|');
          return {
            time,
            text: originalText.trim(),
            translation: translatedText ? translatedText.trim() : null
          };
        }
        return null;
      }).filter(item => item !== null && item.text !== '');
      setParsedLyrics(parsed);
    }
  }, [lyrics]);

  // Scroll automático de letras
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

  // --- Arreglo del delay: precargamos el audio en cuanto el reproductor aparece ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.preload = 'auto';
    audio.load();
  }, [audioSrc]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch (err) {
      // Reproducción interrumpida o bloqueada por el navegador; lo ignoramos silenciosamente
      console.log('No se pudo reproducir todavía:', err);
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration || 0);
    setIsLoading(false);
  };

  const handleCanPlay = () => setIsLoading(false);
  const handleWaiting = () => setIsLoading(true);
  const handlePlaying = () => setIsLoading(false);

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration || 1;
    setCurrentTime(current);
    setProgress((current / total) * 100);

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
    const bounds = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - bounds.left) / bounds.width;
    if (audioRef.current.duration) {
      audioRef.current.currentTime = percentage * audioRef.current.duration;
    }
  };

  return (
    <div
      className="mp-editorial fade-in"
      style={{ backgroundColor: bgColor, color: textColor, borderTopColor: accentColor }}
    >
      <div className="mp-top-row">

        {/* Vinil */}
        <div className={`mp-vinyl ${isPlaying ? 'is-spinning' : ''}`}>
          <div className="mp-vinyl-disc">
            <div className="mp-vinyl-label" style={{ borderColor: accentColor }}>
              <img src={cover} alt="Cover" className="mp-vinyl-art" />
            </div>
          </div>
        </div>

        {/* Meta + control */}
        <div className="mp-meta">
          <p className="mp-meta-label" style={{ color: accentColor }}>Lado A</p>
          <h3 className="mp-title" style={{ color: textColor }}>{title}</h3>
          <p className="mp-artist" style={{ color: textColor }}>{artist}</p>
        </div>

        <button
          className="mp-play-btn"
          onClick={togglePlay}
          style={{ borderColor: accentColor, color: accentColor }}
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isLoading ? (
            <span className="mp-loading-dots" aria-hidden="true">
              <span style={{ backgroundColor: accentColor }} />
              <span style={{ backgroundColor: accentColor }} />
              <span style={{ backgroundColor: accentColor }} />
            </span>
          ) : isPlaying ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Progreso tipo créditos de pista */}
      <div className="mp-progress-row">
        <span className="mp-time" style={{ color: textColor }}>{formatTime(currentTime)}</span>
        <div className="mp-progress-track" onClick={handleProgressClick} style={{ backgroundColor: `${textColor}26` }}>
          <div className="mp-progress-fill" style={{ width: `${progress}%`, backgroundColor: accentColor }} />
          <div className="mp-progress-diamond" style={{ left: `${progress}%`, backgroundColor: accentColor }} />
        </div>
        <span className="mp-time" style={{ color: textColor }}>{formatTime(duration)}</span>
      </div>

      {/* Carrete de letras */}
      <div className="mp-lyrics-reel" ref={lyricsContainerRef}>
        {parsedLyrics.map((line, index) => (
          <div
            key={index}
            className={`mp-lyric-line ${index === currentLineIndex ? 'active' : ''}`}
            style={{
              color: index === currentLineIndex ? "#ffffff" : textColor,
              opacity: index === currentLineIndex ? 1 : 0.15
            }}
          >
            <div className="mp-lyric-original">{line.text}</div>
            {line.translation && (
              <div className="mp-lyric-translation">{line.translation}</div>
            )}
          </div>
        ))}
      </div>

      {/* Mensaje final */}
      {showEndMessage && (
        <div className="mp-end-section fade-in" style={{ borderColor: `${textColor}1a` }}>
          <span className="mp-end-mark" style={{ color: accentColor }} aria-hidden="true">&rdquo;</span>
          <p className="mp-end-text">{endText}</p>
          <button
            className="mp-continue-btn"
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
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default MusicPlayer;