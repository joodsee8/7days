import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mary.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import Polaroid from '../../components/Polaroid/Polaroid';
import coverImg from '../../assets/images/femme.jpg';
import audioFile from '../../assets/music/Mary.mp3';
import polaroidImg from '../../assets/images/Polaroid2.jpg'; // Ajusta la ruta de la imagen

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

const songLrc = const songLrc = `[00:09.517] (Siempre tienes la razón)
[00:14.304]
[00:22.235] (Tu...)
[00:27.223] (No existe como tú quien entienda)
[00:35.184] Qué grande que es tu corazón
[00:40.819] Tu sonrisa es una fiesta
[00:46.116] Amiga, eres mi gran amor
[00:51.183] No existe como tú quién me entienda
[00:58.353] Qué fortuna ha sido coincidir
[01:05.413] Siempre nos vamos a cuidar
[01:10.876] No puedo imaginar esta vida sin ti
[01:17.063] Te mereces ser feliz
[01:22.558] El mundo entero navegar
[01:27.981] Si pudiera, te doy un órgano vital
[01:35.081] Tienes que vivir, mi bella Mary
[01:41.011]
[01:55.514] Qué fortuna ha sido coincidir
[02:02.066] Siempre nos vamos a cuidar
[02:07.749] No quiero imaginar la vida sin ti
[02:14.053] Te mereces ser feliz
[02:19.949] El mundo entero navegar
[02:24.975] Si pudiera, te doy un órgano vital
[02:32.072] Tienes que vivir, mi bella Mary`;
// Pega aquí el resto de la letra sincronizada

const handleSaveMemory = (image, fileName) => {
  const link = document.createElement('a');
  link.href = image;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Mary = () => {
  const navigate = useNavigate();
  const [completedParagraphs, setCompletedParagraphs] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  
  // Controles de visibilidad
  const [showPlayer, setShowPlayer] = useState(false);
  const [showPolaroid, setShowPolaroid] = useState(false);

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setShowPolaroid(true);
  };

  useEffect(() => {
    // Alerta silenciosa a Formspree para este capítulo
    if (!localStorage.getItem('notification_sent_mary')) {
      fetch("https://formspree.io/f/xeeyyoqo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          alerta: "¡Montse acaba de abrir el Capítulo de Mary!",
          hora: new Date().toLocaleString()
        })
      })
      .then(() => {
        localStorage.setItem('notification_sent_mary', 'true');
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

  const handleRevealPlayer = () => {
    setShowButton(false);
    setShowPlayer(true);
  };

  return (
    <div className="chapter-light-container fade-in-chapter">
      
      {/* Encabezado del Capítulo */}
      <header className="chapter-header">
        <div className="chapter-number">Capítulo II</div> {/* Ajusta el número según el orden */}
        <div className="chapter-song-title">Mary</div>
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

        {/* Botón Sutil */}
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
            title="Mary"
            artist="Mon Laferte"
            cover={coverImg}
            audioSrc={audioFile}
            lyrics={songLrc} 
            endText="Si pudiera, te doy un órgano vital..."
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
              message="Qué fortuna ha sido coincidi.Te quiero con el Alma ¡Felices 20 años!"
              friendName="Pancho"
              onSaveMemory={() =>
                handleSaveMemory(polaroidImg, 'Polaroid7.jpg')
              }
            />
          
            {/* Botón de cierre para regresar al índice */}
            <div
              className="sutil-action-container"
              style={{ marginTop: '3rem' }}
            >
              <span
                className="sutil-button-dark"
                onClick={() => navigate('/index')}
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

export default Mary;
