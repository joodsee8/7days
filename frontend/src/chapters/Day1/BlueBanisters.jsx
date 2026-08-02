import React, { useState, useEffect } from 'react';
import './BlueBanisters.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import Polaroid from '../../components/Polaroid/Polaroid';
import imageSrc from '../../assets/images/Polaroid1.jpg';

// Asegúrate de que las rutas a tus imágenes y audio sean correctas
import coverImg from '../../assets/images/IMG_0105.jpeg';
import audioFile from '../../assets/music/Blue-Banisters.mp3';




const letterParagraphs = [
  "Cuando pensé en la canción que abriría este proyecto, no sabía cuál sería la más adecuada, pero después de escucharla una y otra vez, me di cuenta de que no había otra que pudiera representar mejor lo que quiero decirte.",
  "En Blue Banisters, Lana habla de una promesa que nunca se cumplió, de un amor que no pudo ser, y no lo dice de manera literal, es parte de la historia, pero no se centra en eso, se centra en como sus 'hermanas' la ayudan a salir de ese lugar.",
  "Ella dice que el le prometió volver cada mayo, a pintar sus barandales de azul, y que nunca lo hizo, pero que sus hermanas siempre estuvieron ahí para ayudarla a pintar, a reparar lo que se sentía roto.",
  "Elegí Blue Banisters como la introducción a este camino, porque, al igual que Lana, yo pase por una promesa que no se cumplió, pero no solo eso, mientras luchaba contra eso y comenzaba a descubrir y aceptar mi identidad, tu estuviste ahí, me diste un lugar en el que me sentí seguro, en el que podía ser yo.",
  "Gracias a eso, pude salir de ese lugar, y hoy, puedo centrarme en mis hermanas, en quienes cada día me ayudan a pintar mis barandales, no de azul, pero sí de colores que me hacen sentir vivo, que me recuerdan que no estoy solo, que siempre hay alguien que me acompaña.",
  "Espero esforzarme lo suficiente para que tú también sientas que no estás sola, que siempre habrá alguien que te acompañe, y que siempre habrá alguien que te ayude a pintar tus barandales.",
  "Gracias por ser una de esas personas para mí, y espero poder serlo para ti también.",
  "Te quiere, Pancho."
];

const songLrc = `[00:00.000] There's a picture on the wall of me on a John Deere | Hay una foto mía en la pared, subido en un tractor.
[00:04.638] Jenny handed me a beer, said, "How the hell did you get there?" | Jenny me pasó una cerveza y me dijo: "¿Cómo diablos llegaste hasta ahí?"
[00:09.440] Oklahoma
[00:13.992] Mm, mm
[00:18.586] There were flowers that were dry, sittin' on the dresser | Había unas flores secas sobre el tocador. 
[00:23.123] She asked me where they're from, I said, "A place I don't remember" | Me preguntó de dónde eran, y le respondí: "De un lugar que ya no recuerdo".
[00:28.074] Oklahoma (oh)
[00:37.084] Jenny jumped into the pool, she was swimmin' with Nikki Lane | Jenny saltó a la piscina, nadaba con Nikki Lane.
[00:40.937] She said, "Most men don't want a woman with a legacy, it's of age" | Me dijo: "La mayoría de los hombres no quieren a una mujer con tanta historia, con tanto peso".
[00:45.762] She said, "You can't be a muse and be happy, too | Me dijo: "No puedes ser la musa de alguien y ser feliz al mismo tiempo,
[00:50.077] You can't blacken the pages with Russian poetry and be happy" | no puedes manchar las páginas con poesía rusa y esperar ser feliz".
[01:02.825] And that scared me | Y eso me dio miedo...
[01:11.160] 'Cause I met a man who | Porque conocí a un hombre que
[01:13.114] Said he'd come back every May | Prometió volver cada mayo
[01:17.698] Just to help me if I'd paint | Solo para ayudarme a pintar
[01:21.413] My banisters blue | Mis barandales de azul. 
[01:25.461] Blue banisters, ooh | Barandales azules...
[01:30.619] Said he'd fix my weathervane | Prometió arreglar mi veleta,
[01:35.531] Give me children, take away my pain | Darme hijos, llevarse todo mi dolor,
[01:39.314] And paint my banisters blue | Y pintar mis barandales de azul.
[01:43.895] My banisters blue | Mis barandales azules.
[01:48.171] There's a hole that's in my heart all my women try and heal | Tengo un vacío en el corazón que todas mis mujeres intentan sanar.
[01:52.345] They're doin' a good job convincin' me that it's not real | Hacen un buen trabajo convenciéndome de que ese vacío no es real,
[01:57.385] It's heat lightning | Que es solo un espejismo por el calor.
[02:01.657] Oh, oh
[02:05.465] 'Cause there's a man that's in my past, there's a man that's still right here | Porque hay un hombre en mi pasado, pero también hay un hombre que sigue aquí presente;
[02:11.274] He's real enough to touch and in my darkest nights | Es tan real que puedo tocarlo, y en mis noches más oscuras,
[02:14.699] He's shinin' | Él sigue brillando.
[02:20.102] Ooh
[02:24.618] Jenny was smokin' by the pool, we were writin' with Nikki Lane | Jenny fumaba junto a la piscina, escribíamos con Nikki Lane.
[02:29.344] I said, "I'm scared of the Santa Clarita Fires, I wish that it would rain" | Le dije: "Le tengo miedo a los incendios, ojalá lloviera".
[02:34.501] I said, "The power of us three can bring absolutely anything | Le dije: "El poder de nosotros tres puede lograr absolutamente cualquier cosa...
[02:39.016] Except that one thing, the diamonds, the rust, and the rain | Excepto esa única cosa: los diamantes, el óxido y la lluvia.
[02:51.773] The thing that washes away the pain" | Esa única cosa que logra limpiar el dolor".
[03:00.125] But that's okay, 'cause | Pero no importa, porque...
[03:02.646] Now when weather turns to May | Ahora, cuando el clima anuncia que llegó mayo,
[03:07.258] All my sisters come to paint | Todas mis hermanas vienen a pintar
[03:10.918] My banisters green | Mis barandales de verde,
[03:15.064] My blue banisters grey | Mis barandales azules de gris.
[03:20.500] Tex and Mex are in the Bay | Nuestros amigos están en la bahía,
[03:25.648] Chucky's makin' birthday cake | Chucky está haciendo un pastel de cumpleaños,
[03:29.718] Chickens runnin' barefeet, there's a baby on the way | Las gallinas corren libres, hay un bebé en camino,
[03:34.844] And now my blue banisters are green and grey | Y ahora mis barandales azules son verdes y grises.
[03:43.063] Ah-ah
[03:47.740] Summer comes, winter goes | Llega el verano, se va el invierno,
[03:52.445] Spring, I skip, God knows | La primavera, me la salto, Dios lo sabe.
[03:57.107] Summer comes, winter goes | Llega el verano, se va el invierno,
[04:01.668] Spring, I sleep, Heaven knows | En primavera prefiero dormir, Dios lo sabe.
[04:07.395] Every time it turns to May | Pero cada vez que llega mayo,
[04:11.959] All my sisters fly to me | Todas mis hermanas vuelan hacia mí
[04:15.480] To paint, paint | Para pintar`;

const BlueBanisters = () => {
  const [completedParagraphs, setCompletedParagraphs] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showPolaroid, setShowPolaroid] = useState(false);

  useEffect(() => {
    // Validamos que no se envíe el correo cada vez que ella recargue la página
    if (!localStorage.getItem('notification_sent_day1')) {
      
      // Hacemos el ping silencioso a Formspree
      fetch("https://formspree.io/f/xeeyyoqo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          alerta: "¡Montse acaba de abrir el Capítulo I: Blue Banisters!",
          hora: new Date().toLocaleString()
        })
      })
      .then(() => {
        // Marcamos en SU celular que ya te avisó para no saturar tu correo
        localStorage.setItem('notification_sent_day1', 'true');
      })
      .catch((error) => console.log("Error silencioso:", error));
    }
  }, []);

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
          title="Blue Banisters"
          artist="Lana Del Rey"
          cover={coverImg}
          audioSrc={audioFile}
          lyrics={songLrc}
          endText="Espero que te haya gustado, gracias por estar siempre para mí."
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
              Cerrar Capítulo
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlueBanisters;