import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pajarito.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import FriendsSpread from '../../components/FriendSpread/FriendSpread';
import mainImg from '../../assets/images/Cap5.jpg';
import coverImg from '../../assets/images/pajarito.jpg';
import audioFile from '../../assets/music/Pajarito.mp3';
import polaroidImg from '../../assets/images/Polaroid3.jpg';
import polaroidImg2 from '../../assets/images/Polaroid4.jpg';

const CHAPTER_INDEX = 5;
const CHAPTER_TOTAL = 7;
const ACCENT = '#887b6a';
const PLAYER_BG = '#000000';
const PLAYER_TEXT = '#E5E5E5';
const LETTER_SEEN_KEY = 'day5_letter_typed';

const pullQuote = "Deseo que nunca olvides el valor que tienes incluso cuando tú misma no puedas verlo.";

const letterParagraphs = [
"Hay canciones que simplemente son bonitas, y hay otras que llegan justo cuando uno necesita escuchar que todo va a estar bien, Pajarito Colibrí es una de esas para mí.",
"Quise dedicártela porque mientras la escuchaba no podía dejar de pensar en ti, no porque crea que tengas miedo de vivir, sino porque todos, en algún momento, olvidamos que nacimos para extender las alas y descubrir todo lo que el mundo tiene preparado para nosotros.",
"Me gusta imaginar que eres ese colibrí del que habla la canción, pequeño frente a un mundo enorme, pero con la capacidad de llegar muy lejos, de encontrar cosas bonitas en el camino y de seguir adelante incluso cuando el viento no sopla a favor.",
"Hay una parte que me gusta mucho porque no intenta convencerte de que la vida siempre será fácil, al contrario, reconoce que habrá días en los que dé miedo avanzar, en los que el pecho pese o en los que alguien nos rompa un poquito el corazón, pero aun así nos recuerda que vale la pena seguir volando.",
"Si algún día sientes que todo se vuelve demasiado grande, o que el miedo te hace dudar de lo que eres capaz de hacer, espero que te acuerdes de esta canción y de lo que dice, porque a veces solo necesitamos que alguien nos recuerde que está bien sentir miedo, mientras no dejemos que sea él quien tome las decisiones.",
"También quería aprovechar esta canción para decirte algo que probablemente no te digo tan seguido, gracias por todos estos años de amistad, por las conversaciones, las risas, los momentos simples y por ser una de esas personas con las que todo se siente muy natural, de esas amistades que uno termina apreciando sin darse cuenta de cuándo empezaron a significar tanto.",
"Espero que nunca pierdas esa forma tan tuya de hacer sentir cómodas a las personas, de reírte tan fuerte, de emocionarte por las cosas pequeñas y de seguir siendo tú, porque creo que eso es justamente lo que hace que quienes te conocemos queramos seguir caminando a tu lado.",
"Y ojalá que, cuando llegue el momento de elegir entre el miedo y la curiosidad, siempre gane la curiosidad, porque estoy seguro de que todavía te esperan muchísimas experiencias, muchísimas personas y muchísimos recuerdos que aún no imaginas.",
"Al final, creo que eso es lo que esta canción intenta decir, que el mundo es muy grande para vivir con miedo, y que todos, incluso cuando dudamos de nosotros mismos, llegamos aquí para ser felices."
];

const songLrc = `[01:34.332] Pajarito colibrí, no tengas miedo de salir
[01:43.406] Hoy el mundo quiere que despiertes para ser feliz
[01:52.521] Pajarito colibrí, no tengas miedo de vivir
[02:01.484] Que la noche oscura y misteriosa baila para ti
[02:10.496] Cuando sientas que infinito el mundo
[02:14.369] Se abre ante tus alas, dentro de tu pecho
[02:18.851] Pierdas el aliento, pídele al cielo
[02:23.308] Que te haga volar
[02:28.522] Y si sientes vértigo en el vuelo
[02:32.214] Que se enciende el fuego dentro de tu pecho
[02:36.728] Pide al universo, en tu ser entero
[02:41.108] Dulce libertad
[02:45.812] Todo va a estar bien, pajarito colibrí
[02:50.725] Ya no tengas miedo de vivir
[02:54.670] Todo va a estar bien, pajarito colibrí
[02:59.740] Tú llegaste al mundo para ser feliz
[03:05.544] ...
[03:21.866] Hoy los valles, bosques y montañas quieren verte ir
[03:30.779] Hoy senderos, mares y las nubes velarán por ti
[03:39.673] Si de amores andas sollozando, sin poder dormir
[03:48.518] Solo canta, quiebra la garganta, es hora de partir
[03:56.599] Cuando sientas que infinito el mundo
[04:01.226] Se abre ante tus alas, dentro de tu pecho
[04:05.746] Pierdas el aliento, pídele al cielo
[04:10.256] Que te haga volar
[04:15.256] Y si sientes vértigo en el vuelo
[04:19.102] Que se enciende el fuego con tu movimiento
[04:23.575] Pide al universo, en tu ser entero
[04:28.066] Dulce libertad
[04:32.507] Todo va a estar bien, pajarito colibrí
[04:37.500] Ya no tengas miedo de vivir
[04:41.522] Todo va a estar bien, pajarito colibrí
[04:46.406] Tú llegaste al mundo para ser feliz
[04:51.494] Bien, pajarito colibrí
[04:55.294] Ya no tengas miedo de vivir
[04:59.263] Todo va a estar bien, pajarito colibrí
[05:04.249] Tú llegaste al mundo para ser feliz`;

const Maria = () => {
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

  const [showPlayer, setShowPlayer] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('notification_sent_day3')) {
      fetch("https://formspree.io/f/xeeyyoqo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alerta: "¡Montse acaba de abrir el Capítulo IV: Maria!",
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
    setShowButton(false);
    setShowPlayer(true);
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setShowFriends(true);
  };

  return (
    <div className="day5-magazine">

      {/* Folio superior */}
      <div className="day5-folio-bar">
        <span>Cap. {CHAPTER_INDEX} / {String(CHAPTER_TOTAL).padStart(2, '0')}</span>
        <span>Pajarito Colibrí</span>
      </div>

      {/* Hero: foto de portada del capítulo + título superpuesto */}
      <div className="day5-hero">
        <img src={mainImg} alt="" className="day4-hero-photo" />
        <div className="day5-hero-gradient" />
        <div className="day5-hero-text">
          <p className="day5-hero-eyebrow">Capítulo V</p>
          <h1 className="day5-hero-title">Pajarito Colibrí</h1>
          <p className="day5-hero-artist">Natalia Lafourcade</p>
        </div>
      </div>

      {/* Pull quote */}
      <div className="day5-pull-quote">
        <span className="day5-quote-mark" aria-hidden="true">&ldquo;</span>
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

        {showButton && !showPlayer && (
          <div className="day5-cta-wrap fade-in-button">
            <button className="day5-cta-ticket" onClick={handleRevealPlayer}>
              <span className="day5-ticket-disc" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="28" height="28">
                  <circle cx="20" cy="20" r="18" fill="none" stroke={ACCENT} strokeWidth="1.2" />
                  <circle cx="20" cy="20" r="11" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.6" />
                  <circle cx="20" cy="20" r="3" fill={ACCENT} />
                </svg>
              </span>
              <span className="day5-ticket-divider" />
              <span className="day5-ticket-text">
                <span className="day5-ticket-title">Pajarito Colibrí</span>
                <span className="day5-ticket-subtitle">Natalia Lafourcade</span>
              </span>
              <span className="day5-ticket-action">Escuchar</span>
            </button>
          </div>
        )}
      </div>

      {/* Reproductor de Música */}
      {showPlayer && (
        <div className="day5-player-wrap">
          <MusicPlayer
            title="Pajarito Colibrí"
            artist="Natalia Lafourcade"
            cover={coverImg}
            audioSrc={audioFile}
            lyrics={songLrc}
            endText="No podia faltar Natalia Lafourcade jaja, nos vemos mañana <3"
            bgColor={PLAYER_BG}
            textColor={PLAYER_TEXT}
            accentColor={ACCENT}
            onClose={handleClosePlayer}
          />
        </div>
      )}

      {/* Página de "Voces" */}
      {showFriends && (
        <FriendsSpread
          kicker="Voces"
          deck="Lo que este capítulo significa para quienes te quieren."
          entries={[
            {
              photo: polaroidImg,
              quote: "Montse siempre esta ahi para nosotros, incluso cuando no podemos verla, hace mas bonita la experiencia en la U",
              name: "Azael & Pao",
            },
            {
              photo: polaroidImg2,
              quote: "Soy un zangano y se me olvido pedirle un mensajito a tu familia jeje, pero se que ellos tambien te quieren mucho.",
              name: "Pancho",
            },
          ]}
          accentColor={ACCENT}
          continueLabel="Cerrar capítulo"
          onContinue={() => navigate('/index')}
        />
      )}

      {/* Folio de cierre */}
      <div className="day5-folio-footer">
        <span>{String(CHAPTER_INDEX).padStart(2, '0')}</span>
        <span className="day5-folio-rule" />
        <span>de {String(CHAPTER_TOTAL).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default Pajarito;



