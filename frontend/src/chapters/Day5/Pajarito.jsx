import React, { useState, useEffect } from 'react';
import './Pajarito.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer'; // Importamos el reproductor
import coverImg from '../../assets/images/pajarito.jpg'
import audioFile from '../../assets/music/Pajarito.mp3'

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

const songLrc = `[01:34.332] Pajarito colibrí, no tengas miedo de salir
[01:43.406] Hoy el mundo quiere que despiertes para ser feliz
[01:52.521] Pajarito colibrí, no tengas miedo de vivir
[02:01.484] Que la noche oscura y misteriosa baila para ti
[02:10.496] Cuando sientas que infinito el mundo
[02:14.369] Se abre ante tus alas, dentro de tu pecho
[02:18.851] Pierdas el aliento, pídele al cielo
[02:23.308] Que te haga volar
[02:28.522] Y si sientes vértigo en el vuelo
[02:32.214] Que se enciende el fuego dentro de tu pecho
[02:36.728] Pide al universo, en tu ser entero
[02:41.108] Dulce libertad
[02:45.812] Todo va a estar bien, pajarito colibrí
[02:50.725] Ya no tengas miedo de vivir
[02:54.670] Todo va a estar bien, pajarito colibrí
[02:59.740] Tú llegaste al mundo para ser feliz
[03:05.544] ...
[03:21.866] Hoy los valles, bosques y montañas quieren verte ir
[03:30.779] Hoy senderos, mares y las nubes velarán por ti
[03:39.673] Si de amores andas sollozando, sin poder dormir
[03:48.518] Solo canta, quiebra la garganta, es hora de partir
[03:56.599] Cuando sientas que infinito el mundo
[04:01.226] Se abre ante tus alas, dentro de tu pecho
[04:05.746] Pierdas el aliento, pídele al cielo
[04:10.256] Que te haga volar
[04:15.256] Y si sientes vértigo en el vuelo
[04:19.102] Que se enciende el fuego con tu movimiento
[04:23.575] Pide al universo, en tu ser entero
[04:28.066] Dulce libertad
[04:32.507] Todo va a estar bien, pajarito colibrí
[04:37.500] Ya no tengas miedo de vivir
[04:41.522] Todo va a estar bien, pajarito colibrí
[04:46.406] Tú llegaste al mundo para ser feliz
[04:51.494] Bien, pajarito colibrí
[04:55.294] Ya no tengas miedo de vivir
[04:59.263] Todo va a estar bien, pajarito colibrí
[05:04.249] Tú llegaste al mundo para ser feliz`;

const Pajarito = () => {
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
      title="pajarito colibri"
      artist="Natalia Lafourcade"
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

export default Pajarito;
