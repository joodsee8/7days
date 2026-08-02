import React, { useState, useEffect } from 'react';
import './Ribs.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import Polaroid from '../../components/Polaroid/Polaroid';

// Asegúrate de que las rutas a tus imágenes y audio sean correctas
import coverImg from '../../assets/images/ribs-cover.jpg';
import audioFile from '../../assets/music/ribs.mp3';


const letterParagraphs = [
  "Hay algo extraño en crecer.",
  "Pasamos años deseando ser mayores, imaginando todo lo que podremos hacer cuando llegue el momento, pero cuando finalmente empezamos a crecer, descubrimos que también da miedo.",
  "De pronto, las cosas cambian, nosotros cambiamos, las personas toman caminos distintos y los momentos que parecían eternos comienzan a convertirse en recuerdos.",
  "A veces me gustaría poder volver a la forma en la que pensábamos antes, recuperar esa sensación de que teníamos todo el tiempo del mundo, de que la vida todavía estaba lejos y de que nada importante podía terminar.",
  "Creo que eso es parte de lo que Ribs intenta expresar: el miedo de mirar hacia adelante y no saber qué pasará con todo lo que hoy sentimos tan nuestro.",
  "Pero también creo que crecer se vuelve diferente cuando tienes a alguien especial caminando contigo.",
  "Porque quizá no podemos detener el tiempo, no podemos quedarnos para siempre en la misma etapa ni hacer que las cosas permanezcan exactamente como son, pero podemos seguir creando recuerdos mientras avanzamos.",
  "Podemos reírnos de cosas que probablemente nadie más entendería, podemos hablar durante horas, compartir momentos simples y hacer que una etapa complicada se sienta un poco más ligera.",
  "Hay una parte de la canción que dice que esa persona es la única amistad que necesita, no lo interpreto de forma literal, no significa que no existan otras personas importantes ni que una amistad tenga que ocupar todos los espacios.",
  "Para mí significa algo más sencillo:",
  "Si algún día todo cambiara, si las personas se alejaran y terminara sintiéndome solo, saber que todavía te tengo sería suficiente.",
  "Porque después de siete años, eres una de esas personas con las que puedo imaginarme atravesando las etapas que todavía no conocemos.",
  "No sé cómo será nuestra vida dentro de algunos años, no sé cuánto cambiará todo ni qué versiones de nosotros existirán entonces, pero me gusta pensar que, cuando miremos hacia atrás, seguiremos teniendo historias que recordar y motivos para reírnos.",
  "Quizá todos tenemos miedo de crecer, pero si tengo que hacerlo, me alegra que tú hayas estado conmigo durante una parte tan grande del camino."
];


const songLrc = `
[00:00.000] ...
[00:48.779] The drink you spilt all over me
[00:56.576] "Lover's Spit" left on repeat
[01:03.424] My mom and dad let me stay home
[01:11.745] It drives you crazy getting old
[01:18.635] We can talk it so good
[01:22.460] We can make it so divine
[01:26.277] We can talk it good
[01:27.688] How you wish it would be all the time
[01:33.654] The drink you spilt all over me
[01:35.521] "Lover's Spit" left on repeat
[01:37.287] My mom and dad let me stay home
[01:38.974] It drives you crazy getting old
[01:41.175] The drink you spilt all over me
[01:43.008] "Lover's Spit" left on repeat
[01:44.834] My mom and dad let me stay home
[01:46.716] It drives you crazy getting old
[01:49.023] ...
[02:03.958] This dream isn't feeling sweet
[02:10.697] We're reeling through the midnight streets
[02:17.909] And I've never felt more alone
[02:27.033] It feels so scary getting old
[02:33.594] We can talk it so good
[02:37.472] We can make it so divine
[02:41.210] We can talk it good
[02:42.601] How you wish it would be all the time
[02:48.735] This dream isn't feeling sweet, we're reeling through the midnight streets
[02:52.243] And I've never felt more alone, feels so scary getting old
[02:56.195] This dream isn't feeling sweet, we're reeling through the midnight streets
[02:59.510] And I've never felt more alone, feels so scary getting old
[03:04.895] ...
[03:18.041] I want 'em back, I want 'em back
[03:19.890] The minds we had, the minds we had
[03:21.784] How all the thoughts, how all the thoughts
[03:23.684] Moved 'round our heads, moved 'round our heads
[03:25.486] I want 'em back, I want 'em back
[03:27.239] The minds we had, the minds we had
[03:29.310] It's not enough to feel the lack
[03:31.148] I want 'em back, I want 'em back, I want 'em
[03:33.610] You're the only friend I need (you're the only friend I need)
[03:37.375] Sharing beds like little kids (sharing beds like little kids)
[03:41.074] And laughing 'til our ribs get tough (laughing 'til our ribs get tough)
[03:44.704] But that will never be enough (but that will never be enough)
[03:48.527] You're the only friend I need (you're the only friend I need)
[03:52.398] Sharing beds like little kids (sharing beds like little kids)
[03:56.112] And laughing 'til our ribs get tough (laughing 'til our ribs get tough)
[03:59.825] But that will never be enough (but that will never be enough)`;

const Ribs = () => {
  const [completedParagraphs, setCompletedParagraphs] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showPolaroid, setShowPolaroid] = useState(false);

  // Lógica del Typewriter
  useEffect(() => {
    if (paragraphIndex < letterParagraphs.length) {
      const fullText = letterParagraphs[paragraphIndex];
      if (currentTypingText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setCurrentTypingText(fullText.slice(0, currentTypingText.length + 1));
        }, 35); // Velocidad de tipeo
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCompletedParagraphs((prev) => [...prev, fullText]);
          setCurrentTypingText('');
          setParagraphIndex((prev) => prev + 1);
        }, 1200); // Pausa entre párrafos
        return () => clearTimeout(timeout);
      }
    } else {
      setShowButton(true);
    }
  }, [currentTypingText, paragraphIndex]);

  const handleRevealPlayer = () => {
    setShowButton(false);
    setShowPlayer(true);
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setShowPolaroid(true);
  };

  return (
    <div className="chapter-light-container">
      
      {/* Encabezado del Capítulo */}
      <header className="chapter-header">
        <div className="chapter-number">Capítulo II</div>
        <div className="chapter-song-title">Ribs</div>
      </header>

      {/* Contenido de la Carta */}
      <div className="letter-content-mobile">
        {completedParagraphs.map((text, index) => (
          <p key={index} className="letra-cursiva-oscura">
            {text}
          </p>
        ))}
        
        {paragraphIndex < letterParagraphs.length && (
          <p className="letra-cursiva-oscura">
            {currentTypingText}
            <span className="blinking-cursor">|</span>
          </p>
        )}
        
        {showButton && (
          <div className="sutil-action-container fade-in-button">
            <span className="sutil-button-dark" onClick={handleRevealPlayer}>
              Escuchar canción
            </span>
          </div>
        )}
      </div>

      {/* Reproductor de Música */}
      {showPlayer && (
        <MusicPlayer
          title="Ribs"
          artist="Lorde"
          cover={coverImg}
          audioSrc={audioFile}
          lyrics={songLrc}
          accentColor="#aaaaaa" /* Color frío asignado a este día */
          bgColor = "#222121"
          textColor = "#f5e6d9"
          onClose={handleClosePlayer}
        />
      )}

      {/* Polaroids Finales */}
      {showPolaroid && (
        <div className="polaroids-section fade-in-chapter">
          <Polaroid 
            imageSrc="/assets/images/Polaroid2.jpg" 
            message="Montse es la persona que pase lo que pase estará para ti, escuchándote, apoyándote y abrazándote, que haría cualquier cosa por ti, su amistad es de las pocas que quedan sin envidias e hipocresías." 
            author="Pao" 
          />
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

export default Ribs;