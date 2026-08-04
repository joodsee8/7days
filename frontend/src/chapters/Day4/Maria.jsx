import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Maria.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer'; // Importamos el reproductor
import Polaroid from '../../components/Polaroid/Polaroid';
import coverImg from '../../assets/images/pajarito.jpg';
import audioFile from '../../assets/music/Maria.mp3';
import polaroidImg from '../../assets/images/Polaroid1.jpg';
import polaroidImg2 from '../../assets/images/Polaroid2.jpg';

const letterParagraphs = [
  "No sé si conocías la historia detrás de esta canción, pero antes de decirte por qué la elegí quiero contarte un poco de ella.",
  "‘María la Curandera’ está inspirada en María Sabina, la célebre chamana mazateca de Oaxaca; durante gran parte de su vida dedicó sus conocimientos a sanar a quienes acudían a ella utilizando la medicina tradicional y los llamados niños santos, los hongos sagrados que en su cultura eran un medio para encontrar respuestas, aliviar el dolor y reencontrarse con uno mismo, ya que para ella la verdadera curación no venía únicamente de una planta o de un ritual, sino de aquello que despertaba dentro de cada persona.",
  "Con el paso de los años su historia trascendió las montañas de Oaxaca y llegó al resto del mundo, y aunque eso le trajo reconocimiento también le costó mucho: vio cómo se desvirtuaba el sentido espiritual de aquello que había protegido toda su vida; aun así, su legado permanece como un recordatorio de que la fuerza para sanar siempre ha estado dentro de nosotros."
  "Por eso elegí esta canción.",
  "Puede que al escucharla por primera vez parezca una canción de abuela, de esas que pondrían mientras preparan café o riegan las plantas un domingo por la mañana, pero si uno realmente le presta atención, descubre que guarda un mensaje increíblemente bonito.",
  "Hay un verso que me encanta:",
  "‘Recuerda siempre que tú eres la medicina’.",
  "Y creo que esa es una de las cosas más importantes que alguien puede escuchar.",
  "Para mí significa que no necesitas a nadie para ser suficiente, que no necesitas que alguien venga a completarte para poder brillar y que la persona capaz de levantarte cuando caes, de recordarte quién eres cuando lo olvidas y de devolverte la paz cuando todo parece un caos… eres tú.",
  "Claro que las personas que queremos pueden acompañarnos, abrazarnos y hacer el camino más ligero, pero la fuerza que realmente cambia las cosas siempre nace desde adentro.",
  "Eso es justamente lo que deseo para ti.",
  "Que nunca olvides el valor que tienes incluso cuando tú misma no puedas verlo, que no entregues tu felicidad a las manos de alguien más esperando que la cuide mejor que tú, y que aprendas a reconocerte como alguien completa, fuerte y suficiente, con o sin la validación de los demás.",

];

const songLrc = `[00:28.294] Cúrate, mijita, el dolor con nuestra luz del sol
[00:33.430] Y los rayos de la luna
[00:40.810] Cúrate, mijita, el dolor con el sonido del río
[00:45.656] La cascada y la espuma`;

const handleSaveMemory = (image, fileName) => {
  const link = document.createElement('a');
  link.href = image;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Maria = () => {
  const [completedParagraphs, setCompletedParagraphs] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // Controla si se muestra el reproductor de música
  const [showPlayer, setShowPlayer] = useState(false);

  // Controla si se muestran las polaroids
  const [showPolaroid, setShowPolaroid] = useState(false);

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setShowPolaroid(true);
  };

  useEffect(() => {
    // Validamos que no se envíe el correo cada vez que ella recargue la página
    if (!localStorage.getItem('notification_sent_day1')) {
      
      // Hacemos el ping silencioso a Formspree
      fetch("https://formspree.io/f/xeeyyoqo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          alerta: "¡Montse acaba de abrir el Capítulo I: María la Curandera!",
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
    <div className="chapter-light-container">
      
      {/* Encabezado del Capítulo */}
      <header className="chapter-header">
        <div className="chapter-number">Capítulo I</div>
        <div className="chapter-song-title">María la Curandera</div>
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
            title="Maria la Curandera"
            artist="Natalia Lafourcade"
            cover={coverImg}
            audioSrc={audioFile}
            lyrics={songLrc}
            endText="No se que tanto te guste Natalia, pero este álbum me gusta mucho"
            accentColor="#887b6a"
            bgColor="#000000"
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
                handleSaveMemory(polaroidImg, 'Polaroid1.jpg')
              }
            />

            <Polaroid
              imageSrc={polaroidImg2}
              message="..."
              friendName="..."
              onSaveMemory={() =>
                handleSaveMemory(polaroidImg2, 'Polaroid2.jpg')
              }
            />
          
            {/* Botón de cierre para regresar al índice */}
            <div
              className="sutil-action-container"
              style={{ marginTop: '3rem' }}
            >
              <span
                className="sutil-button-dark"
                onClick={() => window.location.href = '/index'}
              >
                Cerrar Capítulo
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maria;
