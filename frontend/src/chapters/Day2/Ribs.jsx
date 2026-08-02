import React, { useState, useEffect } from 'react';
import './Ribs.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import Polaroid from '../../components/Polaroid/Polaroid';

// Asegúrate de que las rutas a tus imágenes y audio sean correctas
import coverImg from '../../assets/images/ribs-cover.jpg';
import audioFile from '../../assets/music/ribs.mp3';


const letterParagraphs = [
  "Hay algo extraño en crecer."
];


const songLrc = `
[00:00.000] ...
[00:48.779] The drink you spilt all over me | La bebida que derramaste sobre mí
[00:56.576] "Lover's Spit" left on repeat | "Lover's Spit" sonando una y otra vez
[01:03.424] My mom and dad let me stay home | Mis padres me dejaron quedarme en casa
[01:11.745] It drives you crazy getting old | Te vuelve loco darte cuenta de que crecemos
[01:18.635] We can talk it so good | Podemos arreglarlo todo hablando
[01:22.460] We can make it so divine | Podemos hacer que parezca perfecto
[01:26.277] We can talk it good | Podemos calmarnos con nuestras palabras
[01:27.688] How you wish it would be all the time | Justo como desearías que fuera siempre
[01:33.654] The drink you spilt all over me | La bebida que derramaste sobre mí
[01:35.521] "Lover's Spit" left on repeat | "Lover's Spit" sonando una y otra vez
[01:37.287] My mom and dad let me stay home | Mis padres me dejaron quedarme en casa
[01:38.974] It drives you crazy getting old | Te vuelve loco darte cuenta de que crecemos
[01:41.175] The drink you spilt all over me | La bebida que derramaste sobre mí
[01:43.008] "Lover's Spit" left on repeat | "Lover's Spit" sonando una y otra vez
[01:44.834] My mom and dad let me stay home | Mis padres me dejaron quedarme en casa
[01:46.716] It drives you crazy getting old | Te vuelve loco darte cuenta de que crecemos
[01:49.023] ...
[02:03.958] This dream isn't feeling sweet | Este sueño está perdiendo su dulzura
[02:10.697] We're reeling through the midnight streets | Deambulamos sin rumbo por las calles a medianoche
[02:17.909] And I've never felt more alone | Y nunca me había sentido tan solo
[02:27.033] It feels so scary getting old | Da tanto miedo hacerse mayor
[02:33.594] We can talk it so good | Podemos arreglarlo todo hablando
[02:37.472] We can make it so divine | Podemos hacer que parezca perfecto
[02:41.210] We can talk it good | Podemos calmarnos con nuestras palabras
[02:42.601] How you wish it would be all the time | Justo como desearías que fuera siempre
[02:48.735] This dream isn't feeling sweet, we're reeling through the midnight streets | Este sueño está perdiendo su dulzura, deambulamos por las calles a medianoche
[02:52.243] And I've never felt more alone, feels so scary getting old | Y nunca me había sentido tan solo, da tanto miedo hacerse mayor
[02:56.195] This dream isn't feeling sweet, we're reeling through the midnight streets | Este sueño está perdiendo su dulzura, deambulamos por las calles a medianoche
[02:59.510] And I've never felt more alone, feels so scary getting old | Y nunca me había sentido tan solo, da tanto miedo hacerse mayor
[03:04.895] ...
[03:18.041] I want 'em back, I want 'em back | Lo quiero de vuelta, lo quiero de vuelta
[03:19.890] The minds we had, the minds we had | La inocencia que teníamos, la forma en que pensábamos
[03:21.784] How all the thoughts, how all the thoughts | Cómo todos esos pensamientos, cómo las ideas
[03:23.684] Moved 'round our heads, moved 'round our heads | Daban vueltas en nuestra cabeza, daban vueltas
[03:25.486] I want 'em back, I want 'em back | Lo quiero de vuelta, lo quiero de vuelta
[03:27.239] The minds we had, the minds we had | La inocencia que teníamos, la forma en que pensábamos
[03:29.310] It's not enough to feel the lack | No es suficiente con sentir que nos falta algo
[03:31.148] I want 'em back, I want 'em back, I want 'em | Lo quiero de vuelta, lo quiero de vuelta, lo quiero
[03:33.610] You're the only friend I need (you're the only friend I need) | Eres la única amiga que necesito (eres la única amiga que necesito)
[03:37.375] Sharing beds like little kids (sharing beds like little kids) | Compartiendo la cama como niños chiquitos (compartiendo la cama como niños chiquitos)
[03:41.074] And laughing 'til our ribs get tough (laughing 'til our ribs get tough) | Y riendo hasta que nos duelan las costillas (riendo hasta que nos duelan las costillas)
[03:44.704] But that will never be enough (but that will never be enough) | Pero eso nunca será suficiente (pero eso nunca será suficiente)
[03:48.527] You're the only friend I need (you're the only friend I need) | Eres la única amiga que necesito (eres la única amiga que necesito)
[03:52.398] Sharing beds like little kids (sharing beds like little kids) | Compartiendo la cama como niños chiquitos (compartiendo la cama como niños chiquitos)
[03:56.112] And laughing 'til our ribs get tough (laughing 'til our ribs get tough) | Y riendo hasta que nos duelan las costillas (riendo hasta que nos duelan las costillas)
[03:59.825] But that will never be enough (but that will never be enough) | Pero eso nunca será suficiente (pero eso nunca será suficiente)`;

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