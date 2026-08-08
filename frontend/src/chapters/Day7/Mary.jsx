import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mary.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import Polaroid from '../../components/Polaroid/Polaroid';
import coverImg from '../../assets/images/femme.jpg';
import audioFile from '../../assets/music/Mary.mp3';
import polaroidImg from '../../assets/images/Polaroid8.jpg';

const letterParagraphs = [
  "Esta canción no necesita tarjeta de presentación, te quiero mucho Montse, Feliz Vida, Ojala la vida te devuelva toda la felicidad que me has dado 💖.",
];

const songLrc = `[00:09.517] (Siempre tienes la razón)
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

  const [showPlayer, setShowPlayer] = useState(false);
  const [showPolaroid, setShowPolaroid] = useState(false);

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setShowPolaroid(true);
  };

  useEffect(() => {
    if (!localStorage.getItem('notification_sent_mary')) {
      fetch('https://formspree.io/f/xeeyyoqo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alerta: '¡Montse acaba de abrir el Capítulo de Mary!',
          hora: new Date().toLocaleString(),
        }),
      })
        .then(() => {
          localStorage.setItem('notification_sent_mary', 'true');
        })
        .catch((error) => {
          console.log('Error silencioso:', error);
        });
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
          setCompletedParagraphs((prev) => [...prev, fullText]);
          setCurrentTypingText('');
          setParagraphIndex((prev) => prev + 1);
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

  const handleRevealPlayer = () => {
    setShowButton(false);
    setShowPlayer(true);
  };

  return (
    <div className="chapter-light-container fade-in-chapter">

      <header className="chapter-header">
        <div className="chapter-number">Capítulo VII</div>
        <div className="chapter-song-title">Mary</div>
      </header>

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

        {showPolaroid && (
          <div className="polaroids-section fade-in-chapter">

            <Polaroid
              imageSrc={polaroidImg}
              message="Qué fortuna ha sido coincidir. Te quiero con el alma, ¡felices 20 años!"
              friendName="Pancho"
              onSaveMemory={() =>
                handleSaveMemory(polaroidImg, 'Polaroid8.jpg')
              }
            />

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