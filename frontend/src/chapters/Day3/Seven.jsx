import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Seven.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import FriendsSpread from '../../components/FriendsSpread/FriendsSpread';
import mainImg from '../../assets/images/Cap3.jpg';
import coverImg from '../../assets/images/folklore.jpg';
import audioFile from '../../assets/music/Seven.mp3';
import polaroidImg from '../../assets/images/Polaroid3.jpg';
import polaroidImg2 from '../../assets/images/Polaroid4.jpg';

const CHAPTER_INDEX = 3;
const CHAPTER_TOTAL = 7;
const ACCENT = '#C7C1BC';
const PLAYER_BG = '#616161';
const PLAYER_TEXT = '#E5E5E5';
const LETTER_SEEN_KEY = 'day3_letter_typed';

const pullQuote = "El amor que sentimos por ellas permanece, como una canción antigua que sigue pasando de persona en persona, incluso cuando nadie recuerda cuándo comenzó.";

const letterParagraphs = [
  "Hemos llegado al dia 3, hoy es el turno de seven, esta es la septima canción del álbum folklore de Taylor Swift",
  "Honestamente el día de hoy no se que decir...",
  "Quizá porque seven no se siente como una canción que necesite demasiadas explicaciones, se siente mas como un recuerdo",
  "Habla de la infancia, de la libertad de ser niños y de esa manera tan inocente en la que intentamos cuidar a quienes queremos, cuando somos pequeños no entendemos del todo los problemas de los demás, pero creemos que podemos solucionarlos con ideas sencillas.",
  "Eso es lo más bonito de la canción, porque el cariño necesita comprenderlo todo para ser sincero, habla de como el tiempo transforma los recuerdos, hay personas cuyos rostros, palabras o momentos empiezan a desvanecerse, pero el amor que sentimos por ellas permanece, como una cancion antigua que sigue pasando de persona en persona, incluso cuando nadie recuerda cuando comenzó.",
];

const songLrc = `[00:01.634] Please picture me | Imagíname
[00:06.321] In the trees | Entre los árboles
[00:08.371] I hit my peak at seven feet | Alcanzando mi punto más alto, a siete pies del suelo
[00:13.993] In the swing | Sobre un columpio
[00:16.354] Over the creek | Suspendida sobre el arroyo
[00:18.387] I was too scared to jump in | Aunque me daba demasiado miedo saltar
[00:21.587] But I, I was high in the sky | Pero yo, yo estaba tan alto en el cielo
[00:28.431] With Pennsylvania under me | Con Pensilvania extendiéndose debajo de mí
[00:36.225] Are there still beautiful things? | ¿Todavía existen cosas hermosas?
[00:42.811] Sweet tea in the summer | Té dulce en las tardes de verano
[00:44.683] Cross your heart, won’t tell no other | Júralo por tu corazón, este secreto será solo nuestro
[00:47.563] And though I can’t recall your face | Y aunque ya no logro recordar tu rostro
[00:50.013] I still got love for you | Todavía guardo cariño por ti
[00:53.193] Your braids like a pattern | Tus trenzas, dibujando formas en mi memoria
[00:54.777] Love you to the moon and to Saturn | Te quiero hasta la Luna y mucho más allá, hasta Saturno
[00:57.707] Passed down like folk songs | Un cariño que se transmite como las canciones antiguas
[01:00.174] The love lasts so long | Porque hay amores que duran toda una vida
[01:06.373] …
[01:23.379] And I’ve been meaning to tell you | Hace tiempo que quería decirte algo
[01:26.293] I think your house is haunted | Creo que tu casa está embrujada
[01:28.893] Your dad is always mad and that must be why | Tu papá siempre está enojado, quizá por eso
[01:33.773] And I think you should come live with | Creo que deberías venir a vivir
[01:36.787] Me and we can be pirates | Conmigo, y podríamos convertirnos en piratas
[01:38.959] Then you won’t have to cry | Así ya no tendrías que llorar
[01:41.846] Or hide in the closet | Ni esconderte dentro del clóset
[01:44.192] And just like a folk song | Y como esas canciones que sobreviven al tiempo
[01:46.679] Our love will be passed on | Nuestro cariño seguirá viviendo y pasando de generación en generación
[01:52.869] Please picture me | Imagíname
[01:57.237] In the weeds | Entre la hierba crecida
[01:59.512] Before I learned civility | Antes de aprender a comportarme como esperaban de mí
[02:04.592] I used to scream ferociously | Solía gritar con toda mi fuerza
[02:09.920] Any time I wanted | Cada vez que sentía ganas de hacerlo
[02:13.555] I, I | Yo, yo
[02:23.906] Sweet tea in the summer | Té dulce en las tardes de verano
[02:25.700] Cross my heart, won’t tell no other | Lo juro por mi corazón, nunca se lo diré a nadie
[02:28.606] And though I can’t recall your face | Y aunque ya no pueda recordar tu rostro
[02:31.041] I still got love for you | Todavía conservo cariño por ti
[02:33.958] Pack your dolls and a sweater | Empaca tus muñecas y un suéter
[02:36.171] We’ll move to India forever | Nos iremos a la India y viviremos ahí para siempre
[02:38.618] Passed down like folk songs | Como una canción antigua que alguien se niega a olvidar
[02:41.345] Our love lasts so long | Nuestro cariño permanece, incluso después de que pasa el tiempo`;

const Seven = () => {
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
          alerta: "¡Montse acaba de abrir el Capítulo III: Seven!",
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
    <div className="day3-magazine">

      {/* Folio superior */}
      <div className="day3-folio-bar">
        <span>Cap. {CHAPTER_INDEX} / {String(CHAPTER_TOTAL).padStart(2, '0')}</span>
        <span>Seven</span>
      </div>

      {/* Hero: foto de portada del capítulo + título superpuesto */}
      <div className="day3-hero">
        <img src={mainImg} alt="" className="day3-hero-photo" />
        <div className="day3-hero-gradient" />
        <div className="day3-hero-text">
          <p className="day3-hero-eyebrow">Capítulo III</p>
          <h1 className="day3-hero-title">Seven</h1>
          <p className="day3-hero-artist">Taylor Swift</p>
        </div>
      </div>

      {/* Pull quote */}
      <div className="day3-pull-quote">
        <span className="day3-quote-mark" aria-hidden="true">&ldquo;</span>
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
          <div className="day3-cta-wrap fade-in-button">
            <button className="day3-cta-ticket" onClick={handleRevealPlayer}>
              <span className="day3-ticket-disc" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="28" height="28">
                  <circle cx="20" cy="20" r="18" fill="none" stroke={ACCENT} strokeWidth="1.2" />
                  <circle cx="20" cy="20" r="11" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.6" />
                  <circle cx="20" cy="20" r="3" fill={ACCENT} />
                </svg>
              </span>
              <span className="day3-ticket-divider" />
              <span className="day3-ticket-text">
                <span className="day3-ticket-title">Seven</span>
                <span className="day3-ticket-subtitle">Taylor Swift</span>
              </span>
              <span className="day3-ticket-action">Escuchar</span>
            </button>
          </div>
        )}
      </div>

      {/* Reproductor de Música */}
      {showPlayer && (
        <div className="day3-player-wrap">
          <MusicPlayer
            title="seven"
            artist="Taylor Swift"
            cover={coverImg}
            audioSrc={audioFile}
            lyrics={songLrc}
            endText="No podia faltar Taylor Swift jaja, nos vemos mañana <3"
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
      <div className="day3-folio-footer">
        <span>{String(CHAPTER_INDEX).padStart(2, '0')}</span>
        <span className="day3-folio-rule" />
        <span>de {String(CHAPTER_TOTAL).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default Seven;