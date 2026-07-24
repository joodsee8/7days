import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';
// Base de datos de la letra con los tiempos exactos en segundos
const lyricsData = [
  {
    id: 1, start: 1, end: 6,
    en: "There's a picture on the wall of me on a John Deere\nJenny handed me a beer, said, \"How the hell did you get there?\"",
    es: "Hay una foto en la pared de mí en un John Deere\nJenny me pasó una cerveza, dijo, \"¿Cómo diablos llegaste ahí?\""
  },
  {
    id: 2, start: 18, end: 27,
    en: "There were flowers that were dry, sittin' on the dresser\nShe asked me where they're from, I said, \"A place I don't remember\"",
    es: "Había flores secas descansando en el tocador\nMe preguntó de dónde eran, dije, \"Un lugar que no recuerdo\""
  },
  {
    id: 3, start: 36, end: 40,
    en: "Jenny jumped into the pool, she was swimmin' with Nikki Lane",
    es: "Jenny saltó a la piscina, nadaba con Nikki Lane"
  },
  {
    id: 4, start: 45, end: 69, // Engloba hasta "scared me" para un tipeo continuo y pausado
    en: "She said, \"You can't be a muse and be happy, too\nYou can't blacken the pages with Russian poetry and be happy\"\nAnd that scared me",
    es: "Ella dijo, \"No puedes ser una musa y ser feliz también\nNo puedes ennegrecer las páginas con poesía rusa y ser feliz\"\nY eso me asustó"
  },
  { id: 5, start: 70, end: 72, en: "'Cause I met a man who", es: "Porque conocí a un hombre que" },
  { id: 6, start: 73, end: 76, en: "Said he'd come back every May", es: "Dijo que volvería cada mayo" },
  { id: 7, start: 77, end: 84, en: "Just to help me if I'd paint my banisters blue", es: "Solo para ayudarme si pintaba mis barandales de azul" },
  { id: 8, start: 85, end: 90, en: "Blue banisters, ooh", es: "Barandales azules, ooh" },
  { id: 9, start: 91, end: 94, en: "Said he'd fix my weathervane", es: "Dijo que arreglaría mi veleta" },
  { id: 10, start: 95, end: 99, en: "Give me children, take away my pain", es: "Me daría hijos, se llevaría mi dolor" },
  { id: 11, start: 99, end: 103, en: "And paint my banisters blue", es: "Y pintaría mis barandales de azul" },
  { id: 12, start: 104, end: 107, en: "My banisters blue", es: "Mis barandales azules" },
  { id: 13, start: 108, end: 111, en: "There's a hole that's in my heart all my women try and heal", es: "Hay un hueco en mi corazón que todas mis mujeres intentan sanar" },
  { id: 14, start: 111, end: 116, en: "They're doin' a good job convincin' me that it's not real", es: "Hacen un buen trabajo convenciéndome de que no es real" },
  { id: 15, start: 116, end: 124, en: "It's heat lightning Oh, oh", es: "Son relámpagos de calor Oh, oh" },
  { id: 16, start: 126, end: 131, en: "'Cause there's a man that's in my past, there's a man that's still right here", es: "Porque hay un hombre en mi pasado, hay un hombre que sigue justo aquí" },
  { id: 17, start: 131, end: 142, en: "He's real enough to touch and in my darkest nights\nHe's shinin'", es: "Es lo suficientemente real para tocarlo y en mis noches más oscuras\nÉl brilla" },
  { id: 18, start: 144, end: 149, en: "Jenny was smokin' by the pool, we were writin' with Nikki Lane", es: "Jenny fumaba junto a la piscina, escribíamos con Nikki Lane" },
  { id: 19, start: 153, end: 170, en: "I said, \"The power of us three can bring absolutely anything\nExcept that one thing, the diamonds, the rust, and the rain\"", es: "Dije, \"El poder de nosotras tres puede traer absolutamente cualquier cosa\nExcepto esa única cosa, los diamantes, el óxido y la lluvia\"" },
  { id: 20, start: 171, end: 178, en: "The thing that washes away the pain", es: "La cosa que lava el dolor" },
  { id: 21, start: 180, end: 182, en: "But that's okay, 'cause", es: "Pero está bien, porque" },
  { id: 22, start: 182, end: 186, en: "Now when weather turns to May", es: "Ahora cuando el clima cambia a mayo" },
  { id: 23, start: 186, end: 194, en: "All my sisters come to paint\nMy banisters green", es: "Todas mis hermanas vienen a pintar\nMis barandales de verde" },
  { id: 24, start: 195, end: 199, en: "My blue banisters grey", es: "Mis barandales azules de gris" },
  { id: 25, start: 200, end: 204, en: "Tex and Mex are in the Bay", es: "Tex y Mex están en la Bahía" },
  { id: 26, start: 215, end: 226, en: "And now my blue banisters are green and grey", es: "Y ahora mis barandales azules son verdes y grises" },
  { id: 27, start: 228, end: 246, en: "Summer comes, winter goes\nSpring, I skip, God knows\nSummer comes, winter goes\nSpring, I sleep, Heaven knows", es: "El verano llega, el invierno se va\nLa primavera, me la salto, Dios sabe\nEl verano llega, el invierno se va\nLa primavera, duermo, el Cielo sabe" },
  { id: 28, start: 246, end: 250, en: "Every time it turns to May", es: "Cada vez que cambia a mayo" },
  { id: 29, start: 251, end: 255, en: "All my sisters fly to me", es: "Todas mis hermanas vuelan hacia mí" },
  { id: 30, start: 256, end: 262, en: "To paint, paint", es: "Para pintar, pintar" }
];

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLyric, setActiveLyric] = useState(null);
  const [displayedEn, setDisplayedEn] = useState("");
  const [displayedEs, setDisplayedEs] = useState("");

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    
    // Buscar si hay alguna línea activa en este segundo exacto
    const currentLine = lyricsData.find(
      (line) => currentTime >= line.start && currentTime <= line.end
    );

    // Si cambiamos de línea (o entramos a una nueva), actualizamos el estado
    if (currentLine !== activeLyric) {
      setActiveLyric(currentLine || null);
    }
  };

  // Efecto de máquina de escribir dual
  useEffect(() => {
    if (!activeLyric) {
      // Borrar texto si hay silencios
      setDisplayedEn("");
      setDisplayedEs("");
      return;
    }

    let indexEn = 0;
    let indexEs = 0;
    const lenEn = activeLyric.en.length;
    const lenEs = activeLyric.es.length;
    
    // Calcula la velocidad de escritura basándose en la duración de la frase.
    // Esto asegura que las frases más lentas en la canción se escriban más lento en pantalla.
    const durationMs = (activeLyric.end - activeLyric.start) * 1000;
    const intervalTimeEn = durationMs / lenEn;
    const intervalTimeEs = durationMs / lenEs;

    const intervalEn = setInterval(() => {
      setDisplayedEn(activeLyric.en.slice(0, indexEn + 1));
      indexEn++;
      if (indexEn >= lenEn) clearInterval(intervalEn);
    }, intervalTimeEn);

    const intervalEs = setInterval(() => {
      setDisplayedEs(activeLyric.es.slice(0, indexEs + 1));
      indexEs++;
      if (indexEs >= lenEs) clearInterval(intervalEs);
    }, intervalTimeEs);

    return () => {
      clearInterval(intervalEn);
      clearInterval(intervalEs);
    };
  }, [activeLyric]);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto mt-12 mb-20 p-6">
      
      {/* Reproductor minimalista */}
      <button 
        onClick={togglePlay}
        className="px-6 py-2 mb-10 text-sm tracking-widest text-gray-800 uppercase transition-all duration-300 border border-gray-300 hover:bg-gray-100 rounded-sm"
      >
        {isPlaying ? "Pausar Canción" : "Escuchar Canción"}
      </button>

      <audio 
        ref={audioRef} 
        src="../../assets/music/blue-banisters.mp3" 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={() => setIsPlaying(false)}
      />

      {/* Contenedor de las letras sincronizadas */}
      <div className="text-center h-40 flex flex-col justify-center items-center px-4 w-full">
        {/* Letra en Inglés: Cursiva y elegante */}
        <p 
          className="text-2xl md:text-3xl text-gray-900 mb-4 whitespace-pre-line" 
          style={{ fontFamily: "'Shelley Allegro Script', 'Brush Script MT', cursive" }}
        >
          {displayedEn}
        </p>

        {/* Letra en Español: Minimalista, sutil, fuente sans-serif */}
        <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest whitespace-pre-line font-light">
          {displayedEs}
        </p>
      </div>
      
    </div>
  );
}
