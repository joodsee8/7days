import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Maria.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import FriendsSpread from '../../components/FriendSpread/FriendSpread';
import mainImg from '../../assets/images/Cap4.JPG';
import coverImg from '../../assets/images/pajarito.jpg';
import audioFile from '../../assets/music/Maria.mp3';
import polaroidImg from '../../assets/images/Polaroid5.jpg';
import polaroidImg2 from '../../assets/images/Polaroid10.JPG';

const CHAPTER_INDEX = 4;
const CHAPTER_TOTAL = 7;
const ACCENT = '#887b6a';
const PLAYER_BG = '#000000';
const PLAYER_TEXT = '#E5E5E5';
const LETTER_SEEN_KEY = 'day4_letter_typed';

const pullQuote = "Deseo que nunca olvides el valor que tienes incluso cuando tú misma no puedas verlo.";

const letterParagraphs = [
  "No sé si conocías la historia detrás de esta canción, pero antes de decirte por qué la elegí quiero contarte un poco de ella.",
  "‘María la Curandera’ está inspirada en María Sabina, la célebre chamana mazateca de Oaxaca; durante gran parte de su vida dedicó sus conocimientos a sanar a quienes acudían a ella utilizando la medicina tradicional y los llamados niños santos, los hongos sagrados que en su cultura eran un medio para encontrar respuestas, aliviar el dolor y reencontrarse con uno mismo, ya que para ella la verdadera curación no venía únicamente de una planta o de un ritual, sino de aquello que despertaba dentro de cada persona.",
  "Con el paso de los años su historia trascendió las montañas de Oaxaca y llegó al resto del mundo, y aunque eso le trajo reconocimiento también le costó mucho: vio cómo se desvirtuaba el sentido espiritual de aquello que había protegido toda su vida; aun así, su legado permanece como un recordatorio de que la fuerza para sanar siempre ha estado dentro de nosotros.",
  "Por eso elegí esta canción.",
  "Puede que al escucharla por primera vez parezca una canción de abuela, de esas que pondrían mientras preparan café o riegan las plantas un domingo por la mañana, pero si uno realmente le presta atención, descubre que guarda un mensaje increíblemente bonito.",
  "Hay un verso que me encanta:",
  "‘Recuerda siempre que tú eres la medicina’.",
  "Y creo que esa es una de las cosas más importantes que alguien puede escuchar.",
  "Para mí significa que no necesitas a nadie para ser suficiente, que no necesitas que alguien venga a completarte para poder brillar y que la persona capaz de levantarte cuando caes, de recordarte quién eres cuando lo olvidas y de devolverte la paz cuando todo parece un caos… eres tú.",
  "Claro que las personas que queremos pueden acompañarnos, abrazarnos y hacer el camino más ligero, pero la fuerza que realmente cambia las cosas siempre nace desde adentro.",
  "Eso es justamente lo que deseo para ti.",
  "Que nunca olvides el valor que tienes incluso cuando tú misma no puedas verlo, que no entregues tu felicidad a las manos de alguien más esperando que la cuide mejor que tú, y que aprendas a reconocerte como alguien completa, fuerte y suficiente, con o sin la validación de los demás."
];

const songLrc = `[00:00.000]... 
[00:28.294] Cúrate, mijita, el dolor con nuestra luz del sol
[00:33.430] Y los rayos de la luna
[00:40.810] Cúrate, mijita, el dolor con el sonido del río
[00:45.656] La cascada y la espuma
[00:52.506] Con el vaivén del mar que va y viene, deja que te agarre
[00:58.903] Con el vaivén del mar que va y viene, deja que te ame
[01:05.758] Cúrate, mi niña, con las hojas de la menta y la hierbabuena
[01:10.524] Ponle amor al té, en lugar de azúcar, toma y mira las estrellas
[01:17.219] ...
[01:30.106] Cúrate, mijita, el dolor con nuestra luz del sol
[01:35.034] Y los rayos de la luna
[01:42.543] Cúrate, mijita, con los besos que te sopla el viento
[01:47.209] Los abrazos de lluvia
[01:54.329] Con el vaivén del mar que va y viene, deja que te agarre
[02:00.346] Con el vaivén del mar que va y viene, deja que te ame
[02:07.051] Cúrate, mi niña, con amor del más bonito y enciende el fuego
[02:12.025] Entrega tus dolores que se vuelvan polvo y vengan nuevas flores
[02:18.334] Que se vuelvan polvo, que se vuelvan polvo todos los dolores
[02:24.499] Que los queme el fuego, que los queme el fuego y vengan nuevas flores
[02:30.994] Que se vuelvan polvo, que se vuelvan polvo todos los dolores
[02:36.781] Que los queme el fuego, que los queme el fuego y vengan nuevas flores
[02:43.091] ...
[02:56.304] Cúrate, mijita, el dolor con el calor del sol
[03:00.993] Y el frío de la luna
[03:08.168] Endulza la mañana con aroma de lavanda, romero, eucalipto
[03:13.520] Y que venga la calma
[03:20.231] Con el vaivén del mar que va y viene, deja que te agarre
[03:26.334] Con el vaivén del mar que va y viene, deja que te ame
[03:32.931] Cúrate, mijita, con el amor del más bonito, haga caso a la intuición
[03:37.963] Mira el mundo entero con el ojo aquel que lleva uste' en la frente
[03:45.164] Cúrate, mi niña, con amor del más bonito
[03:51.323] Y recuerda siempre que tú eres la medicina
[03:57.489] Cúrate, mi niña, con amor del más bonito
[04:03.605] Y recuerda siempre que tú eres la medicina
[04:08.517] Que se vuelvan polvo, que se vuelvan polvo todos los dolores
[04:14.712] Que los queme el fuego, que los queme el fuego y vengan nuevas flores
[04:20.832] Que se vuelvan polvo, que se vuelvan polvo todos los dolores
[04:27.041] Que los queme el fuego, que los queme el fuego y vengan nuevas flores
[04:30.041] ...`;

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
    <div className="day4-magazine">

      {/* Folio superior */}
      <div className="day4-folio-bar">
        <span>Cap. {CHAPTER_INDEX} / {String(CHAPTER_TOTAL).padStart(2, '0')}</span>
        <span>Maria la Curandera</span>
      </div>

      {/* Hero: foto de portada del capítulo + título superpuesto */}
      <div className="day4-hero">
        <img src={mainImg} alt="" className="day4-hero-photo" />
        <div className="day4-hero-gradient" />
        <div className="day4-hero-text">
          <p className="day4-hero-eyebrow">Capítulo IV</p>
          <h1 className="day4-hero-title">Maria la Curandera</h1>
          <p className="day4-hero-artist">Natalia Lafourcade</p>
        </div>
      </div>

      {/* Pull quote */}
      <div className="day4-pull-quote">
        <span className="day4-quote-mark" aria-hidden="true">&ldquo;</span>
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
          <div className="day4-cta-wrap fade-in-button">
            <button className="day4-cta-ticket" onClick={handleRevealPlayer}>
              <span className="day4-ticket-disc" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="28" height="28">
                  <circle cx="20" cy="20" r="18" fill="none" stroke={ACCENT} strokeWidth="1.2" />
                  <circle cx="20" cy="20" r="11" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.6" />
                  <circle cx="20" cy="20" r="3" fill={ACCENT} />
                </svg>
              </span>
              <span className="day4-ticket-divider" />
              <span className="day4-ticket-text">
                <span className="day4-ticket-title">Maria la Curandera</span>
                <span className="day4-ticket-subtitle">Natalia Lafourcade</span>
              </span>
              <span className="day4-ticket-action">Escuchar</span>
            </button>
          </div>
        )}
      </div>

      {/* Reproductor de Música */}
      {showPlayer && (
        <div className="day4-player-wrap">
          <MusicPlayer
            title="Maria la Curandera"
            artist="Natalia Lafourcade"
            cover={coverImg}
            audioSrc={audioFile}
            lyrics={songLrc}
            endText="Parece canción de abuelita eda jaja"
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
              quote: "Montse es de las amigas mas importantes para mi, es familia, es la mujer con la que puedo ser yo sin ser juzgada, la que está siempre en las buenas y en las malas, y sin duda una de las mujeres más increibles que pueden existir!!💓💓",
              name: "Romi",
            },
            {
              photo: polaroidImg2,
              quote: "Lo primero que pensé cuando conocí a Montse fue 'Que mamona jaja', lo que mas admiro de ella es lo grandiosa que es, que logra todo lo que se le cruza, es muy lista, carismatica, y muy bella, le deseo mucho amor, mucha felicidad y todo lo bonito en esta vida, es la persona que todos deberian tener como amiga",
              name: "Lupita",
            },
          ]}
          accentColor={ACCENT}
          continueLabel="Cerrar capítulo"
          onContinue={() => navigate('/index')}
        />
      )}

      {/* Folio de cierre */}
      <div className="day4-folio-footer">
        <span>{String(CHAPTER_INDEX).padStart(2, '0')}</span>
        <span className="day4-folio-rule" />
        <span>de {String(CHAPTER_TOTAL).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default Maria;



