import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const lyricsData = [
  { start: 1, end: 6, en: "There's a picture on the wall of me on a John Deere\nJenny handed me a beer, said, \"How the hell did you get there?\"", es: "Hay una foto en la pared de mí en un John Deere\nJenny me dio una cerveza, dijo, \"¿Cómo diablos llegaste ahí?\"" },
  { start: 18, end: 27, en: "There were flowers that were dry, sittin' on the dresser\nShe asked me where they're from, I said, \"A place I don't remember\"", es: "Había flores secas sobre el tocador\nMe preguntó de dónde eran, dije, \"Un lugar que no recuerdo\"" },
  { start: 36, end: 40, en: "Jenny jumped into the pool, she was swimmin' with Nikki Lane", es: "Jenny saltó a la piscina, nadaba con Nikki Lane" },
  { start: 45, end: 61, en: "She said, \"You can't be a muse and be happy, too\nYou can't blacken the pages with Russian poetry and be happy\"", es: "Dijo, \"No puedes ser una musa y ser feliz también\nNo puedes ennegrecer las páginas con poesía rusa y ser feliz\"" },
  { start: 62, end: 69, en: "And that scared me", es: "Y eso me asustó" },
  { start: 70, end: 72, en: "'Cause I met a man who", es: "Porque conocí a un hombre que" },
  { start: 73, end: 76, en: "Said he'd come back every May", es: "Dijo que volvería cada mayo" },
  { start: 77, end: 84, en: "Just to help me if I'd paint my banisters blue", es: "Solo para ayudarme si pintaba mis barandales de azul" },
  { start: 85, end: 90, en: "Blue banisters, ooh", es: "Barandales azules, ooh" },
  { start: 91, end: 94, en: "Said he'd fix my weathervane", es: "Dijo que arreglaría mi veleta" },
  { start: 95, end: 99, en: "Give me children, take away my pain", es: "Me daría hijos, se llevaría mi dolor" },
  { start: 99, end: 103, en: "And paint my banisters blue", es: "Y pintaría mis barandales de azul" },
  { start: 104, end: 107, en: "My banisters blue", es: "Mis barandales azules" },
  { start: 108, end: 111, en: "There's a hole that's in my heart all my women try and heal", es: "Hay un hueco en mi corazón que mis mujeres intentan sanar" },
  { start: 111, end: 116, en: "They're doin' a good job convincin' me that it's not real", es: "Hacen un buen trabajo convenciéndome de que no es real" },
  { start: 116, end: 124, en: "It's heat lightning Oh, oh", es: "Son relámpagos de calor Oh, oh" },
  { start: 126, end: 131, en: "'Cause there's a man that's in my past, there's a man that's still right here", es: "Porque hay un hombre en mi pasado, hay un hombre que sigue aquí" },
  { start: 131, end: 142, en: "He's real enough to touch and in my darkest nights\nHe's shinin'", es: "Es lo suficientemente real para tocarlo y en mis noches más oscuras\nÉl brilla" },
  { start: 144, end: 149, en: "Jenny was smokin' by the pool, we were writin' with Nikki Lane", es: "Jenny fumaba junto a la piscina, escribíamos con Nikki Lane" },
  { start: 153, end: 170, en: "I said, \"The power of us three can bring absolutely anything\nExcept that one thing, the diamonds, the rust, and the rain\"", es: "Dije, \"El poder de nosotras tres puede traer lo que sea\nExcepto los diamantes, el óxido y la lluvia\"" },
  { start: 171, end: 178, en: "The thing that washes away the pain", es: "Aquello que lava el dolor" },
  { start: 180, end: 182, en: "But that's okay, 'cause", es: "Pero está bien, porque" },
  { start: 182, end: 186, en: "Now when weather turns to May", es: "Ahora cuando el clima cambia a mayo" },
  { start: 186, end: 194, en: "All my sisters come to paint\nMy banisters green", es: "Todas mis hermanas vienen a pintar\nMis barandales de verde" },
  { start: 195, end: 199, en: "My blue banisters grey", es: "Mis barandales azules de gris" },
  { start: 200, end: 204, en: "Tex and Mex are in the Bay", es: "Tex y Mex están en la Bahía" },
  { start: 215, end: 226, en: "And now my blue banisters are green and grey", es: "Y ahora mis barandales azules son verdes y grises" },
  { start: 228, end: 246, en: "Summer comes, winter goes\nSpring, I skip, God knows\nSummer comes, winter goes\nSpring, I sleep, Heaven knows", es: "El verano llega, el invierno se va\nLa primavera, me la salto, Dios sabe\nEl verano llega, el invierno se va\nLa primavera, duermo, el Cielo sabe" },
  { start: 246, end: 250, en: "Every time it turns to May", es: "Cada vez que cambia a mayo" },
  { start: 251, end: 255, en: "All my sisters fly to me", es: "Todas mis hermanas vuelan hacia mí" },
  { start: 256, end: 262, en: "To paint, paint", es: "Para pintar, pintar" }
];

const MusicPlayer = ({ title, artist, cover, audioSrc, accentColor, onContinue }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [activeLyric, setActiveLyric] = useState(null);
  const [displayedEn, setDisplayedEn] = useState("");
  const [displayedEs, setDisplayedEs] = useState("");

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const togglePlay = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const time = audioRef.current.currentTime;
    setCurrentTime(time);
    
    const currentLine = lyricsData.find(l => time >= l.start && time <= l.end);
    if (currentLine !== activeLyric) {
      setActiveLyric(currentLine || null);
    }
  };

  // Efecto Typewriter Dual
  useEffect(() => {
    if (!activeLyric) {
      setDisplayedEn(""); setDisplayedEs(""); return;
    }

    let iEn = 0; let iEs = 0;
    const dur = (activeLyric.end - activeLyric.start) * 1000;
    const speedEn = dur / activeLyric.en.length;
    const speedEs = dur / activeLyric.es.length;

    const timerEn = setInterval(() => {
      setDisplayedEn(activeLyric.en.slice(0, iEn + 1));
      iEn++; if (iEn >= activeLyric.en.length) clearInterval(timerEn);
    }, speedEn);

    const timerEs = setInterval(() => {
      setDisplayedEs(activeLyric.es.slice(0, iEs + 1));
      iEs++; if (iEs >= activeLyric.es.length) clearInterval(timerEs);
    }, speedEs);

    return () => { clearInterval(timerEn); clearInterval(timerEs); };
  }, [activeLyric]);

  return (
    <div className="music-player-wrapper fade-in-soft">
      <audio ref={audioRef} src={audioSrc} onTimeUpdate={handleTimeUpdate} 
             onLoadedMetadata={() => setDuration(audioRef.current.duration)}
             onEnded={() => { setIsPlaying(false); setIsEnded(true); }} />

      {!isEnded ? (
        <>
          <div className="player-main-card">
            <div className="player-info">
              <img src={cover} alt="Cover" className="player-cover" />
              <div className="player-text">
                <h3 className="song-title">{title}</h3>
                <p className="song-artist">{artist}</p>
              </div>
              <button className="play-pause-btn" onClick={togglePlay}>
                {isPlaying ? 
                  <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> :
                  <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                }
              </button>
            </div>

            <div className="progress-section">
              <span className="time-text">{formatTime(currentTime)}</span>
              <div className="progress-bar-container" ref={progressBarRef} onClick={(e) => {
                const rect = progressBarRef.current.getBoundingClientRect();
                const newTime = ((e.clientX - rect.left) / rect.width) * duration;
                audioRef.current.currentTime = newTime;
              }}>
                <div className="progress-bar-background">
                  <div className="progress-bar-fill" style={{ width: `${(currentTime/duration)*100}%`, backgroundColor: accentColor }} />
                </div>
              </div>
              <span className="time-text">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Sección de Letras Sincronizadas */}
          <div className="lyrics-display-area">
            <p className="lyrics-en">{displayedEn}</p>
            <p className="lyrics-es">{displayedEs}</p>
          </div>
        </>
      ) : (
        <div className="player-outro fade-in-soft">
          <p className="outro-message">Espero que esta canción ahora también signifique algo para ti.</p>
          <button className="continue-chapter-btn" onClick={onContinue}>Continuar</button>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
