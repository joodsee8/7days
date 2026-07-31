import React, { useState, useEffect } from 'react';
import './Long.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer'; // Importamos el reproductor
import coverImg from '../../assets/images/long.jpg'
import audioFile from '../../assets/music/Long.mp3'

const letterParagraphs = [
  "Veinte años.",
  //"Llegar a tu segunda década de vida no es cualquier cosa, Montse. Es un hito enorme: el final de una etapa y el comienzo de otra completamente distinta. Y mientras pensaba en la magnitud de lo que vas a celebrar este 7 de agosto, me di cuenta de algo: un solo día simplemente no era suficiente.",
  //"De esos veinte años que hoy cumples, he tenido el inmenso privilegio de acompañarte en ocho. Desde la secundaria me has visto crecer, cambiar y atravesar un montón de versiones de mí mismo.",
  //"Seguro recuerdas que hubo una época en la que las cosas simplemente no salieron como yo esperaba. No fue el fin del mundo, pero sí una etapa en la que sentí que todo empezó a perder color. Y cuando eso pasó, tú decidiste quedarte cerca para asegurarte de que yo no me perdiera por completo.",
  //"Hay una canción de Lana Del Rey llamada Blue Banisters. En ella, Lana cuenta cómo cada mes de mayo sus “hermanas” vuelan hacia ella para ayudarle a pintar sus barandales. Nunca he sabido exactamente qué significan esos colores para ella. Pero cuando escucho esa parte, para mí el mes cambia. Para mí ya no es mayo.",
  //"Para mí es abril.",
  //"Porque cada abril, cuando llegaba mi cumpleaños, tú aparecías para sacarme de ese espacio mental en el que a veces me encerraba. Sin darte cuenta, llegabas con pintura fresca para ayudarme a reparar lo que se sentía roto, a devolverle color a esos barandales que yo veía completamente azules, hasta que poco a poco ese lugar volvía a sentirse como un hogar.",
  //"Y fue entonces cuando entendí algo.",
  //"Hay personas que llegan a tu vida y la cambian sin hacer ruido. No porque resuelvan tus problemas, sino porque hacen que enfrentarlos deje de sentirse tan solitario. Tú has sido una de esas personas para mí.",
  //"Por eso este proyecto existe.",
  // "Porque alguien que ha significado tanto para mí merece mucho más que un “feliz cumpleaños” enviado a medianoche. Durante los próximos siete días quiero regalarte siete cartas escondidas dentro de siete canciones. Cada una habla de una parte distinta de nuestra historia, de algo que admiro de ti o de algo que nunca había encontrado la manera de decir.",
  // "Y no podía empezar con otra canción que no fuera esta."
];

const songLrc = `[00:16.892] I said, "Remember this moment"
[00:22.082] In the back of my mind
[00:26.555] The time we stood with our shaking hands
[00:29.945] The crowds in stands went wild
[00:35.862] We were the kings and the queens
[00:40.943] And they read off our names
[00:45.463] The night you danced like you knew our lives
[00:49.123] Would never be the same
[00:54.769] You held your head like a hero
[00:59.743] On a history book page
[01:04.516] It was the end of a decade
[01:09.181] But the start of an age
[01:11.349]
[01:14.875] Long live the walls we crashеd through
[01:18.588] How the kingdom lights shined just for me and you
[01:23.291] I was scrеaming, "Long live all the magic we made"
[01:27.701] And bring on all the pretenders
[01:31.138] One day, we will be remembered
[01:35.004]
[01:37.237] I said, "Remember this feeling"
[01:42.032] I pass the pictures around
[01:46.549] Of all the years that we stood there on the sidelines
[01:52.048] Wishin' for right now
[01:56.188] We are the kings and the queens
[01:59.752] You traded your baseball cap for a crown
[02:05.543] When they gave us our trophies
[02:08.605] And we held them up for our town
[02:15.035] And the cynics were outraged
[02:19.306] Screaming, "This is absurd"
[02:24.226] 'Cause for a moment, a band of thieves
[02:28.178] In ripped up jeans got to rule the world
[02:34.758]
[02:34.928] Long live the walls we crashed through
[02:38.529] How the kingdom lights shined just for me and you
[02:43.235] I was screaming, "Long live all the magic we made"
[02:47.673] And bring on all the pretenders, I'm not afraid
[02:53.857] Long live all the mountains we moved
[02:56.915] I had the time of my life fighting dragons with you
[03:02.067] I was screaming, "Long live that look on your face"
[03:06.393] And bring on all the pretenders
[03:09.933] One day, we will be remembered
[03:14.346]
[03:17.910] Hold on to spinning around
[03:22.117] Confetti falls to the ground
[03:26.376] May these memories break our fall
[03:35.330] Will you take a moment? Promise me this
[03:43.946] That you'll stand by me forever
[03:47.787] But if, God forbid, fate should step in
[03:53.579] And force us into a goodbye
[03:58.831] If you have children some day
[04:03.199] When they point to the pictures
[04:07.878] Please, tell 'em my name
[04:13.228] Tell 'em how the crowds went wild
[04:17.737] Tell 'em how I hope they shine
[04:23.058] Long live the walls we crashed through
[04:26.542] I had the time of my life with you
[04:31.976]
[04:32.105] Long, long live the walls we crashed through
[04:36.125] How the kingdom lights shined just for me and you
[04:40.860] And I was screaming, "Long live all the magic we made"
[04:45.175] And bring on all the pretenders, I'm not afraid
[04:50.775] Singing, "Long live all the mountains we moved"
[04:54.618] I had the time of my life fighting dragons with you
[05:00.033] And long, long live that look on your face
[05:04.028] And bring on all the pretenders
[05:07.484] One day, we will be remembered`;

const Long = () => {
  const [completedParagraphs, setCompletedParagraphs] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  
  // NUEVO ESTADO: Controla si se muestra el reproductor de música
  const [showPlayer, setShowPlayer] = useState(false);

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setShowPolaroid(true);
  };

  useEffect(() => {
    if (paragraphIndex < letterParagraphs.length) {
      const fullText = letterParagraphs[paragraphIndex];
      
      if (currentTypingText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setCurrentTypingText(fullText.slice(0, currentTypingText.length + 1));
        }, 20);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCompletedParagraphs(prev => [...prev, fullText]);
          setCurrentTypingText('');
          setParagraphIndex(prev => prev + 1);
        }, 600);
        return () => clearTimeout(timeout);
      }
    } else {
      setTimeout(() => setShowButton(true), 1500);
    }
  }, [currentTypingText, paragraphIndex]);

  // Función que se ejecuta al tocar "Escuchar canción"
  const handleRevealPlayer = () => {
    setShowButton(false); // Ocultamos el botón
    setShowPlayer(true);  // Mostramos el reproductor
  };

  // Función puente (placeholder por ahora) para cuando termine la canción
  const handleContinueToDay2 = () => {
    console.log("Aquí conectaremos con el Día 2");
  };

  return (
    <div className="chapter-light-container fade-in-chapter">
      <div className="letter-content-mobile">
        
        <div className="letra-cursiva-oscura">
          {completedParagraphs.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
          
          {paragraphIndex < letterParagraphs.length && (
            <p className="typing-paragraph">
              {currentTypingText}
              <span className="blinking-cursor">|</span>
            </p>
          )}
        </div>
        
        <div className="espacio-vacio"></div>

        {/* El Botón Sutil - Solo se muestra si el reproductor AÚN NO está visible */}
        {showButton && !showPlayer && (
          <div className="sutil-action-container fade-in-button">
            <span className="sutil-button-dark" onClick={handleRevealPlayer}>
              Escuchar canción
            </span>
          </div>
        )}

        {/* El Reproductor de Música - Aparece cuando se oculta el botón */}
        {showPlayer && (
    <MusicPlayer 
      title="long live"
      artist="Taylor Swift"
      cover={coverImg}
      audioSrc={audioFile}
      rawLrc={songLrc} 
      onComplete={handleClosePlayer} 
    />
  )}

      </div>
    </div>
  );
};

export default Long;
