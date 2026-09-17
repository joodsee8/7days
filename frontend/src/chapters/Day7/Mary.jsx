import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mary.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import FriendsSpread from '../../components/FriendSpread/FriendSpread';
import mainImg from '../../assets/images/Cap7.jpg';
import coverImg from '../../assets/images/femme.jpg';
import audioFile from '../../assets/music/Mary.mp3';
import polaroidImg from '../../assets/images/Polaroid8.jpg';
import polaroidImg2 from '../../assets/images/Polaroid4.jpg';
import LockedCard from '../../components/LockedCard/LockedCard';

const CHAPTER_INDEX = 7;
const CHAPTER_TOTAL = 7;
const ACCENT = '#887b6a';
const PLAYER_BG = '#000000';
const PLAYER_TEXT = '#E5E5E5';
const LETTER_SEEN_KEY = 'day7_letter_typed';
const NEXT_CHAPTER_PATH = '/index';
const pullQuote = "No quiero imaginar una vida sin ti.";

const letterParagraphs = [
  "Esta canción no necesita tarjeta de presentación, desde la primera vez que la escuché supe que tu eras mi Mary",
  "Te quiero mucho Montse, Feliz Vida, Ojala la vida te devuelva toda la felicidad que me has dado 💖."
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

const Mary = () => {
  const navigate = useNavigate();

  const [hasSeenLetter] = useState(() => localStorage.getItem(LETTER_SEEN_KEY) === 'true');

  const [completedParagraphs, setCompletedParagraphs] = useState(() =>
    hasSeenLetter ? letterParagraphs : []
  );
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [paragraphIndex, setParagraphIndex] = useState(() =>
    hasSeenLetter ? letterParagraphs.length : 0
  );
  const [showButton, setShowButton] = useState(() => hasSeenLetter);

  const [playerRevealed, setPlayerRevealed] = useState(() => hasSeenLetter);
  const [showFriends, setShowFriends] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('notification_sent_day3')) {
      fetch("https://formspree.io/f/xeeyyoqo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alerta: "¡Montse acaba de abrir el Capítulo VII: Mary!",
          hora: new Date().toLocaleString()
        })
      })
        .then(() => {
          localStorage.setItem('notification_sent_day3', 'true');
        })
        .catch((error) => console.log("Error silencioso:", error));
    }
  }, []);

  // Lógica del Typewriter — solo corre si no se ha visto antes
  useEffect(() => {
    if (hasSeenLetter) return;

    if (paragraphIndex < letterParagraphs.length) {
      const fullText = letterParagraphs[paragraphIndex];
      if (currentTypingText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setCurrentTypingText(fullText.slice(0, currentTypingText.length + 1));
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
        localStorage.setItem(LETTER_SEEN_KEY, 'true');
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [currentTypingText, paragraphIndex, hasSeenLetter]);

  const handleRevealPlayer = () => {
    setPlayerRevealed(true);
  };

  const handleClosePlayer = () => {
    setShowFriends(true);
  };

  const goToNextChapter = () => navigate(NEXT_CHAPTER_PATH);
  const goToIndex = () => navigate('/index');

  return (
    <div className="day7-magazine">

      {/* Folio superior */}
      <div className="day7-folio-bar">
        <span>Cap. {CHAPTER_INDEX} / {String(CHAPTER_TOTAL).padStart(2, '0')}</span>
        <span>Mary</span>
      </div>

      {/* Hero: foto de portada del capítulo + título superpuesto */}
      <div className="day7-hero">
        <img src={mainImg} alt="" className="day7-hero-photo" />
        <div className="day7-hero-gradient" />
        <div className="day7-hero-text">
          <p className="day7-hero-eyebrow">Capítulo VII</p>
          <h1 className="day7-hero-title">Mary</h1>
          <p className="day7-hero-artist">Mon Laferte</p>
        </div>
      </div>

      {/* Pull quote */}
      <div className="day7-pull-quote">
        <span className="day7-quote-mark" aria-hidden="true">&ldquo;</span>
        <p>{pullQuote}</p>
      </div>

      {/* Contenido de la Carta */}
      <div className="letter-content-mobile">
        {completedParagraphs.map((text, index) => (
          <p key={index} className="letra-cursiva-oscura">
            {text}
          </p>
        ))}

        {!hasSeenLetter && paragraphIndex < letterParagraphs.length && (
          <p className="letra-cursiva-oscura">
            {currentTypingText}
            <span className="blinking-cursor">|</span>
          </p>
        )}
      </div>

     {/* Reproductor de Música: SIEMPRE está montado. Mientras no se
          desbloquee, se cubre con una capa (ticket o candado) encima. */}
      <div className="day7-player-wrap">
        <div className={`day7-player-shell ${!playerRevealed ? 'is-locked' : ''}`}>
          <MusicPlayer
            title="Mary"
            artist="Mon Laferte"
            cover={coverImg}
            audioSrc={audioFile}
            lyrics={songLrc}
            endText="Y pues ya, fue todo w, dale pa arriba ya te la you know"
            bgColor={PLAYER_BG}
            textColor={PLAYER_TEXT}
            accentColor={ACCENT}
            onClose={handleClosePlayer}
          />
 
          {!playerRevealed && (
            <div className="day7-player-overlay">
              {showButton ? (
                <button className="day7-cta-ticket" onClick={handleRevealPlayer}>
                  <span className="day7-ticket-disc" aria-hidden="true">
                    <svg viewBox="0 0 40 40" width="28" height="28">
                      <circle cx="20" cy="20" r="18" fill="none" stroke={ACCENT} strokeWidth="1.2" />
                      <circle cx="20" cy="20" r="11" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.6" />
                      <circle cx="20" cy="20" r="3" fill={ACCENT} />
                    </svg>
                  </span>
                  <span className="day7-ticket-divider" />
                  <span className="day7-ticket-text">
                    <span className="day7-ticket-title">Mary</span>
                    <span className="day7-ticket-subtitle">Mon Laferte</span>
                  </span>
                  <span className="day7-ticket-action">Escuchar</span>
                </button>
              ) : (
                <LockedCard
                  label="Mary — Mon Laferte"
                  hint="Se desbloquea al terminar la carta"
                  accentColor={ACCENT}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Página de "Voces" */}
      {showFriends && (
        <FriendsSpread
          kicker="Voces"
          deck="Lo que este capítulo significa para quienes te quieren."
          entries={[
            {
              photo: polaroidImg,
              quote: "Habrá cosas que hoy parecen enormes y que mañana apenas recordarász, personas que alguna vez ocuparon tus pensamientos y que terminarán siendo parte del paisaje, no necesitas vencer cada batalla; algunas simplemente desaparecen cuando decides seguir adelante.\nY tú tienes demasiada vida por delante para quedarte mirando hacia atrás.",
              name: "Pancho",
            },
          ]}
          accentColor={ACCENT}
          continueLabel="Cerrar capítulo"
          onContinue={goToIndex}
          nextLabel="Índice"
          onNext={goToIndex}
        />
      )}

      {/* Folio de cierre */}
      <div className="day7-folio-footer">
        <span>{String(CHAPTER_INDEX).padStart(2, '0')}</span>
        <span className="day7-folio-rule" />
        <span>de {String(CHAPTER_TOTAL).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default Mary;



