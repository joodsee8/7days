import React, { useState, useEffect } from 'react';
import './BlueBanisters.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import Polaroid from '../../components/Polaroid/Polaroid';
import imageSrc from '../../assets/images/Polaroid1.jpg';

// Asegúrate de que las rutas a tus imágenes y audio sean correctas
import coverImg from '../../assets/images/IMG_0105.jpeg';
import audioFile from '../../assets/music/Blue-Banisters.mp3';

const letterParagraphs = [
  "Veinte años. Llegar a tu segunda década de vida no es cualquier cosa, Montse.",
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
        <div className="chapter-number">Capítulo I</div>
        <div className="chapter-song-title">Blue Banisters</div>
      </header>

      {/* Contenido de la Carta */}
      <div className="letter-content-mobile">
        {completedParagraphs.map((text, index) => (
          <p key={index} className="letra-cursiva-oscura fade-in-chapter">
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
          title="Blue Banisters"
          artist="Lana Del Rey"
          cover={coverImg}
          audioSrc={audioFile}
          lyrics={songLrc}
          accentColor="#5A6B7C" /* Color frío asignado a este día */
          onClose={handleClosePlayer}
        />
      )}

      {/* Polaroids Finales */}
      {showPolaroid && (
        <div className="polaroids-section fade-in-chapter">
          <Polaroid 
            imageSrc={imageSrc} 
            message="¡Felices 20, Montse! Gracias por siempre venir a ayudarme a pintar mis barandales." 
            friendName="Pancho" 
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

export default BlueBanisters;