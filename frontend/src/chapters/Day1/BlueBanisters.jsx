import React, { useState, useEffect } from 'react';
import './BlueBanisters.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer'; // Importamos el reproductor
import coverImg from '../../assets/images/IMG_0105.jpeg'
import audioFile from '../../assets/music/Blue-Banisters.mp3'

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

const songLrc = `[00:00.000] There's a picture on the wall of me on a John Deere
[00:04.638] Jenny handed me a beer, said, "How the hell did you get there?"
[00:09.440] Oklahoma
[00:13.992] Mm, mm
[00:18.586] There were flowers that were dry, sittin' on the dresser
[00:23.123] She asked me where they're from, I said, "A place I don't remember"
[00:28.074] Oklahoma (oh)
[00:37.084] Jenny jumped into the pool, she was swimmin' with Nikki Lane
[00:40.937] She said, "Most men don't want a woman with a legacy, it's of age"
[00:45.762] She said, "You can't be a muse and be happy, too
[00:50.077] You can't blacken the pages with Russian poetry and be happy"
[01:02.825] And that scared me
[01:11.160] 'Cause I met a man who
[01:13.114] Said he'd come back every May
[01:17.698] Just to help me if I'd paint
[01:21.413] My banisters blue
[01:25.461] Blue banisters, ooh
[01:30.619] Said he'd fix my weathervane
[01:35.531] Give me children, take away my pain
[01:39.314] And paint my banisters blue
[01:43.895] My banisters blue
[01:48.171] There's a hole that's in my heart all my women try and heal
[01:52.345] They're doin' a good job convincin' me that it's not real
[01:57.385] It's heat lightning
[02:01.657] Oh, oh
[02:05.465] 'Cause there's a man that's in my past, there's a man that's still right here
[02:11.274] He's real enough to touch and in my darkest nights
[02:14.699] He's shinin'
[02:20.102] Ooh
[02:24.618] Jenny was smokin' by the pool, we were writin' with Nikki Lane
[02:29.344] I said, "I'm scared of the Santa Clarita Fires, I wish that it would rain"
[02:34.501] I said, "The power of us three can bring absolutely anything
[02:39.016] Except that one thing, the diamonds, the rust, and the rain
[02:51.773] The thing that washes away the pain"
[03:00.125] But that's okay, 'cause
[03:02.646] Now when weather turns to May
[03:07.258] All my sisters come to paint
[03:10.918] My banisters green
[03:15.064] My blue banisters grey
[03:20.500] Tex and Mex are in the Bay
[03:25.648] Chucky's makin' birthday cake
[03:29.718] Chickens runnin' barefeet, there's a baby on the way
[03:34.844] And now my blue banisters are green and grey
[03:43.063] Ah-ah
[03:47.740] Summer comes, winter goes
[03:52.445] Spring, I skip, God knows
[03:57.107] Summer comes, winter goes
[04:01.668] Spring, I sleep, Heaven knows
[04:07.395] Every time it turns to May
[04:11.959] All my sisters fly to me
[04:15.480] To paint, paint`;

const BlueBanisters = () => {
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
      title="blue banisters"
      artist="Lana Del Rey"
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

export default BlueBanisters;
