import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

// Usaremos los mismos datos pero con una lógica de renderizado distinta
const lyricsData = [
  { start: 1, end: 6, en: "There's a picture on the wall of me on a John Deere Jenny handed me a beer, said, \"How the hell did you get there?\"", es: "Hay una foto en la pared de mí en un John Deere Jenny me dio una cerveza, dijo, \"¿Cómo diablos llegaste ahí?\"" },
  { start: 18, end: 27, en: "There were flowers that were dry, sittin' on the dresser She asked me where they're from, I said, \"A place I don't remember\"", es: "Había flores secas sobre el tocador Me preguntó de dónde eran, dije, \"Un lugar que no recuerdo\"" },
  { start: 36, end: 40, en: "Jenny jumped into the pool, she was swimmin' with Nikki Lane", es: "Jenny saltó a la piscina, nadaba con Nikki Lane" },
  { start: 45, end: 61, en: "She said, \"You can't be a muse and be happy, too You can't blacken the pages with Russian poetry and be happy\"", es: "Dijo, \"No puedes ser una musa y ser feliz también No puedes ennegrecer las páginas con poesía rusa y ser feliz\"" },
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
  { start: 131, end: 142, en: "He's real enough to touch and in my darkest nights He's shinin'", es: "Es lo suficientemente real para tocarlo y en mis noches más oscuras Él brilla" },
  { start: 144, end: 149, en: "Jenny was smokin' by the pool, we were writin' with Nikki Lane", es: "Jenny fumaba junto a la piscina, escribíamos con Nikki Lane" },
  { start: 153, end: 170, en: "I said, \"The power of us three can bring absolutely anything Except that one thing, the diamonds, the rust, and the rain\"", es: "Dije, \"El poder de nosotras tres puede traer lo que sea Excepto los diamantes, el óxido y la lluvia\"" },
  { start: 171, end: 178, en: "The thing that washes away the pain", es: "Aquello que lava el dolor" },
  { start: 180, end: 182, en: "But that's okay, 'cause", es: "Pero está bien, porque" },
  { start: 182, end: 186, en: "Now when weather turns to May", es: "Ahora cuando el clima cambia a mayo" },
  { start: 186, end: 194, en: "All my sisters come to paint My banisters green", es: "Todas mis hermanas vienen a pintar Mis barandales de verde" },
  { start: 195, end: 199, en: "My blue banisters grey", es: "Mis barandales azules de gris" },
  { start: 200, end: 204, en: "Tex and Mex are in the Bay", es: "Tex y Mex están en la Bahía" },
  { start: 215, end: 226, en: "And now my blue banisters are green and grey", es: "Y ahora mis barandales azules son verdes y grises" },
  { start: 228, end: 246, en: "Summer comes, winter goes Spring, I skip, God knows Summer comes, winter goes Spring, I sleep, Heaven knows", es: "El verano llega, el invierno se va La primavera, me la salto, Dios sabe El verano llega, el invierno se va La primavera, duermo, el Cielo sabe" },
  { start: 246, end: 250, en: "Every time it turns to May", es: "Cada vez que cambia a mayo" },
  { start: 251, end: 255, en: "All my sisters fly to me", es: "Todas mis hermanas vuelan hacia mí" },
  { start: 256, end: 262, en: "To paint, paint", es: "Para pintar, pintar" }
];

const MusicPlayer = ({ title, artist, cover, audioSrc, accentColor, onContinue }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const audioRef = useRef(null);
  const scrollRef = useRef(null);

  const togglePlay = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const time = audioRef.current.currentTime;
    setCurrentTime(time);
    const index = lyricsData.findIndex(l => time >= l.start && time <= l.end);
    if (index !== -1 && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  // Autoscroll: Mantiene la letra activa al centro
  useEffect(() => {
    if (activeIndex !== -1 && scrollRef.current) {
      const activeElement = scrollRef.current.children[activeIndex];
      activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeIndex]);

  // Función para renderizar palabras con opacidad dinámica
  const renderWords = (text, startTime, endTime) => {
    const words = text.split(" ");
    const totalDuration = endTime - startTime;
    const timePerWord = totalDuration / words.length;

    return words.map((word, i) => {
      const wordStartTime = startTime + (i * timePerWord);
      const isWordActive = currentTime >= wordStartTime;
      return (
        <span 
          key={i} 
          className={`lyric-word ${isWordActive ? 'active' : 'dimmed'}`}
        >
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <div className="music-player-wrapper">
      <audio ref={audioRef} src={audioSrc} onTimeUpdate={handleTimeUpdate} 
             onLoadedMetadata={() => setDuration(audioRef.current.duration)}
             onEnded={() => { setIsPlaying(false); setIsEnded(true); }} />

      {!isEnded ? (
        <div className="player-layout">
          {/* Card del reproductor fija arriba */}
          <div className="compact-player-card">
            <img src={cover} alt="Cover" className="mini-cover" />
            <div className="mini-info">
              <h4>{title}</h4>
              <p>{artist}</p>
            </div>
            <button className="mini-play-btn" onClick={togglePlay}>
              {isPlaying ? "Ⅱ" : "▶"}
            </button>
            <div className="mini-progress-bar">
               <div className="mini-progress-fill" style={{ width: `${(currentTime/duration)*100}%`, backgroundColor: accentColor }} />
            </div>
          </div>

          {/* Área de letras tipo Apple Music */}
          <div className="lyrics-scroll-container" ref={scrollRef}>
            {lyricsData.map((line, index) => (
              <div 
                key={index} 
                className={`lyric-line-block ${index === activeIndex ? 'is-focused' : 'is-idle'}`}
              >
                <div className="lyric-en-script">
                  {renderWords(line.en, line.start, line.end)}
                </div>
                <p className="lyric-es-translation">{line.es}</p>
              </div>
            ))}
          </div>
        </div>
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
