import React, { useState, useEffect } from 'react';
import './Seven.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer'; // Importamos el reproductor
import Polaroid from '../../components/Polaroid/Polaroid';
import coverImg from '../../assets/images/folklore.jpg';
import audioFile from '../../assets/music/Seven.mp3';
import polaroidImg from '../../assets/images/Polaroid3.jpg';
import polaroidImg2 from '../../assets/images/Polaroid4.jpg';

const letterParagraphs = [
  "Hemos llegado al dia 3, hoy es el turno de seven, esta es la septima canción del álbum folklore de Taylor Swift",
  "Honestamente el día de hoy no se que decir...",
  "Quizá porque seven no se siente como una canción que necesite demasiadas explicaciones, se siente mas como un recuerdo",
  "Habla de la infancia, de la libertad de ser niños y de esa manera tan inocente en la que intentamos cuidar a quienes queremos, cuando somos pequeños no entendemos del todo los problemas de los demás, pero creemos que podemos solucionarlos con ideas sencillas.",
  "Eso es lo más bonito de la canción, porque el cariño necesita comprenderlo todo para ser sincero, habla de como el tiempo transforma los recuerdos, hay personas cuyos rostros, palabras o momentos empiezan a desvanecerse, pero el amor que sentimos por ellas permanece, como una cancion antigua que sigue pasando de persona en persona, incluso cuando nadie recuerda cuando comenzó.",
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

const handleSaveMemory = (image, fileName) => {
  const link = document.createElement('a');
  link.href = image;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Seven = () => {
  const [completedParagraphs, setCompletedParagraphs] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // NUEVO ESTADO: Controla si se muestra el reproductor de música
  const [showPlayer, setShowPlayer] = useState(false);

  // Controla si se muestran las polaroids
  const [showPolaroid, setShowPolaroid] = useState(false);

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setShowPolaroid(true);
  };

    useEffect(() => {
      // Validamos que no se envíe el correo cada vez que ella recargue la página
      if (!localStorage.getItem('notification_sent_day3')) {
        
        // Hacemos el ping silencioso a Formspree
        fetch("https://formspree.io/f/xeeyyoqo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            alerta: "¡Montse acaba de abrir el Capítulo III: Seven!",
            hora: new Date().toLocaleString()
          })
        })
        .then(() => {
          // Marcamos en SU celular que ya te avisó para no saturar tu correo
          localStorage.setItem('notification_sent_day3', 'true');
        })
        .catch((error) => console.log("Error silencioso:", error));
      }
    }, []);
  
  useEffect(() => {
    if (paragraphIndex < letterParagraphs.length) {
      const fullText = letterParagraphs[paragraphIndex];

      if (currentTypingText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setCurrentTypingText(
            fullText.slice(0, currentTypingText.length + 1)
          );
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
      const timeout = setTimeout(() => {
        setShowButton(true);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [currentTypingText, paragraphIndex]);

  // Función que se ejecuta al tocar "Escuchar canción"
  const handleRevealPlayer = () => {
    setShowButton(false); // Ocultamos el botón
    setShowPlayer(true); // Mostramos el reproductor
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
            <span
              className="sutil-button-dark"
              onClick={handleRevealPlayer}
            >
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
            accentColor="#C7C1BC"
            bgColor="#616161"
            textColor="#E5E5E5"
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
              onSaveMemory={() =>
                handleSaveMemory(polaroidImg, 'Polaroid3.jpg')
              }
            />

            <Polaroid
              imageSrc={polaroidImg2}
              message="..."
              friendName="Pendiente"
              onSaveMemory={() =>
                handleSaveMemory(polaroidImg2, 'Polaroid4.jpg')
              }
            />

            {/* Botón de cierre para regresar al índice */}
            <div
              className="sutil-action-container"
              style={{ marginTop: '3rem' }}
            >
              <span
                className="sutil-button-dark"
                onClick={() => window.history.back()}
              >
                Guardar recuerdo
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seven;