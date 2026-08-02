import React, { useState, useEffect } from 'react';
import './Seven.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer'; // Importamos el reproductor
import coverImg from '../../assets/images/folklore.jpg'
import audioFile from '../../assets/music/Seven.mp3'
import polaroidImg from '../../assets/images/Polaroid3.jpg'
import polaroidImg2 from '../../assets/images/Polaroid4.jpg'

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

const songLrc = `[00:01.634] Please picture me
[00:06.321] In the trees
[00:08.371] I hit my peak at seven feet
[00:13.993] In the swing
[00:16.354] Over the creek
[00:18.387] I was too scared to jump in
[00:21.587] But I, I was high in the sky
[00:28.431] With Pennsylvania under me
[00:36.225] Are there still beautiful things?
[00:42.811] Sweet tea in the summer
[00:44.683] Cross your heart, won't tell no other
[00:47.563] And though I can't recall your face
[00:50.013] I still got love for you
[00:53.193] Your braids like a pattern
[00:54.777] Love you to the moon and to Saturn
[00:57.707] Passed down like folk songs
[01:00.174] The love lasts so long
[01:06.373] ...
[01:23.379] And I've been meaning to tell you
[01:26.293] I think your house is haunted
[01:28.893] Your dad is always mad and that must be why
[01:33.773] And I think you should come live with
[01:36.787] Me and we can be pirates
[01:38.959] Then you won't have to cry
[01:41.846] Or hide in the closet
[01:44.192] And just like a folk song
[01:46.679] Our love will be passed on
[01:52.869] Please picture me
[01:57.237] In the weeds
[01:59.512] Before I learned civility
[02:04.592] I used to scream ferociously
[02:09.920] Any time I wanted
[02:13.555] I, I
[02:23.906] Sweet tea in the summer
[02:25.700] Cross my heart, won't tell no other
[02:28.606] And though I can't recall your face
[02:31.041] I still got love for you
[02:33.958] Pack your dolls and a sweater
[02:36.171] We'll move to India forever
[02:38.618] Passed down like folk songs
[02:41.345] Our love lasts so long`;

const Seven = () => {
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

        {/* Reproductor de Música */}
      {showPlayer && (
        <MusicPlayer
          title="Ribs"
          artist="Lorde"
          cover={coverImg}
          audioSrc={audioFile}
          lyrics={songLrc}
          endText="Puede que no podamos traducir literalmente una canción y esperar que transmita la misma emoción, creo que fue una idea un poco mala empezar el proyecto con canciones en inglés... pero bueno, nos vemos mañana :D"
          accentColor="#C7C1BC" /* Color frío asignado a este día */
          bgColor = "#616161"
          textColor = "#E5e5e5"
          onClose={handleClosePlayer}
        />
      )}

      {/* Polaroids Finales */}
      {showPolaroid && (
        <div className="polaroids-section fade-in-chapter">
          <Polaroid 
            imageSrc={polaroidImg}
            message="..." 
            friendName="pendiente" 
          />
          <div className="polaroids-section fade-in-chapter">
            <Polaroid
              imageSrc={polaroidImg2}
              message="..."
              friendName="Pendiente"/>
          {/* Botón de cierre para regresar al índice */}
          <div className="sutil-action-container" style={{ marginTop: '3rem' }}>
             <span className="sutil-button-dark" onClick={() => window.history.back()}>
              Guardar recuerdo
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Seven;
