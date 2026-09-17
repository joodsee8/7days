import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Long.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import FriendsSpread from '../../components/FriendSpread/FriendSpread';
import mainImg from '../../assets/images/Cap6.jpg';
import coverImg from '../../assets/images/long.jpg';
import audioFile from '../../assets/music/Long.mp3';
import polaroidImg from '../../assets/images/Polaroid11.JPG';
import polaroidImg2 from '../../assets/images/Polaroid12.JPG';
import LockedCard from '../../components/LockedCard/LockedCard';


const CHAPTER_INDEX = 6;
const CHAPTER_TOTAL = 7;
const ACCENT = '#C7C1BC';
const PLAYER_BG = '#000000';
const PLAYER_TEXT = '#E5E5E5';
const LETTER_SEEN_KEY = 'day6_letter_typed';
const NEXT_CHAPTER_PATH = '/day7';

const pullQuote = "Larga vida a todo lo que hemos sido juntos, y a todo lo que nos falta por vivir.";

const letterParagraphs = [
  "Llegamos al día 6, la penúltima parada de este camino, y no podía ser con otra canción que no fuera Long Live.",
  "Taylor la escribió pensando en su fandom, en los años que pasaron juntos, en todo lo que vivieron en escenarios y giras, y en cómo, un día, todo eso se volvería solo un recuerdo, habla de atesorar los momentos que en su momento parecían enormes, de prometer que esos recuerdos seguirán vivos pase lo que pase después.",
  "Y pensé en ti, obviamente, porque llevamos 7 años acumulando exactamente ese tipo de momentos.",
  "No somos de los que andan diciéndose cosas cursis todo el tiempo, lo nuestro siempre ha sido más burlarnos sin piedad del otro, pelearnos cada que nos topamos, criticarnos por llegar tarde, y aun así, cuando de verdad se necesita, ahí estamos el uno para el otro, esa siempre ha sido nuestra forma de querernos.",
  "Que bueno que seguimos siendo amiguitos, aunque no hayas querido ser mi mejor amiga el 21 de Junio del 2020, y no cambiaría ni un solo día de toda la carrilla que hemos compartido.",
  "Elegí esta canción porque siento que representa perfecto lo que quiero decirte: que espero que vivan todos los años que nos faltan, las anécdotas absurdas que seguiremos acumulando, y esta amistad que, aunque no la digamos en voz alta todos los días, es de las cosas más reales que tengo.",
  "Esta es otra forma de decirte que te quiere, y espero que sepas que siempre vas a tener un lugar seguro conmigo, así como yo lo he tenido contigo todos estos años.",
  "Larga vida a todo lo que hemos sido juntos, y a todo lo que nos falta por vivir."
];


const songLrc = `[00:16.967] I said remember this moment | Dije recuerda este momento
[00:21.814] In the back of my mind | En el fondo de mi mente
[00:26.314] The time we stood with our shaking hands | La vez que estuvimos de pie con nuestras manos temblorosas
[00:29.533] The crowds in stands went wild | Las multitudes en las gradas se volvieron locas
[00:35.752] We were the kings and the queens | Éramos los reyes y las reinas
[00:40.523] And they read off our names | Y leyeron nuestros nombres
[00:45.217] The night you danced like you knew our lives | La noche que bailaste como si supieras que nuestras vidas
[00:48.857] Would never be the same | Nunca volverían a ser las mismas
[00:54.718] You held your head like a hero | Sostuviste tu cabeza como un héroe
[00:59.671] On a history book page | En la página de un libro de historia
[01:04.094] It was the end of a decade | Era el fin de una década
[01:08.968] But the start of an age | Pero el comienzo de una era
[01:14.833] Long live the walls we crashed through | Larga vida a las paredes que derribamos
[01:18.366] How the kingdom lights shined just for me and you | Cómo brillaban las luces del reino solo para ti y para mí
[01:23.176] I was screaming, "Long live all the magic we made" | Yo estaba gritando, "Larga vida a toda la magia que hicimos"
[01:27.705] And bring on all the pretenders | Y que vengan todos los pretendientes
[01:31.202] One day we will be remembered | Un día seremos recordados
[01:37.157] I said remember this feeling | Dije recuerda este sentimiento
[01:41.767] I passed the pictures around | Pasé las fotos a los demás
[01:46.298] Of all the years that we stood there on the sidelines | De todos los años que estuvimos allí al margen
[01:52.015] Wishing for right now | Deseando este preciso momento
[01:55.921] We are the kings and the queens | Somos los reyes y las reinas
[01:59.718] You traded your baseball cap for a crown | Cambiaste tu gorra de béisbol por una corona
[02:05.569] When they gave us our trophies | Cuando nos dieron nuestros trofeos
[02:08.837] And we held them up for our town | Y los levantamos en alto para nuestro pueblo
[02:15.053] And the cynics were outraged | Y los cínicos estaban indignados
[02:19.265] Screaming, "This is absurd" | Gritando, "Esto es absurdo"
[02:24.127] 'Cause for a moment, a band of thieves | Porque por un momento, una banda de ladrones
[02:27.702] In ripped up jeans got to rule the world | En jeans rotos logró gobernar el mundo
[02:34.892] Long live the walls we crashed through | Larga vida a las paredes que derribamos
[02:38.515] How the kingdom lights shined just for me and you | Cómo brillaban las luces del reino solo para ti y para mí
[02:43.250] I was screaming, "Long live all the magic we made" | Yo estaba gritando, "Larga vida a toda la magia que hicimos"
[02:47.667] And bring on all the pretenders, I'm not afraid | Y que vengan todos los pretendientes, no tengo miedo
[02:53.216] Long live all the mountains we moved | Larga vida a todas las montañas que movimos
[02:56.998] I had the time of my life fighting dragons with you | Pasé el mejor momento de mi vida luchando contra dragones contigo
[03:02.124] I was screaming, "Long live that look on your face" | Yo estaba gritando, "Larga vida a esa mirada en tu rostro"
[03:06.478] And bring on all the pretenders | Y que vengan todos los pretendientes
[03:10.042] One day we will be remembered | Un día seremos recordados
[03:17.873] Hold on to spinning around | Aférrate a ese girar en círculos
[03:22.031] Confetti falls to the ground | El confeti cae al suelo
[03:26.418] May these memories break our fall | Que estos recuerdos amortigüen nuestra caída
[03:35.303] Will you take a moment? | ¿Te tomarás un momento?
[03:40.268] Promise me this | Prométeme esto
[03:44.191] That you'll stand by me forever | Que estarás a mi lado para siempre
[03:47.839] But if, God forbid, fate should step in | Pero si, Dios no lo quiera, el destino interviene
[03:53.442] And force us into a goodbye | Y nos obliga a decir adiós
[03:58.163] If you have children someday | Si tienes hijos algún día
[04:03.096] When they point to the pictures | Cuando señalen las fotos
[04:07.730] Please tell them my name | Por favor diles mi nombre
[04:13.193] Tell them how the crowds went wild | Diles cómo la multitud se volvió loca
[04:17.611] Tell them how I hope they shine | Diles cuánto espero que ellos brillen
[04:23.178] Long live the walls we crashed through | Larga vida a las paredes que derribamos
[04:26.431] I had the time of my life with you | Pasé el mejor momento de mi vida contigo
[04:31.962] Long, long live the walls we crashed through | Larga, larga vida a las paredes que derribamos
[04:35.869] How the kingdom lights shined just for me and you | Cómo brillaban las luces del reino solo para ti y para mí
[04:40.516] And I was screaming, "Long live all the magic we made" | Y yo estaba gritando, "Larga vida a toda la magia que hicimos"
[04:45.229] And bring on all the pretenders, I'm not afraid | Y que vengan todos los pretendientes, no tengo miedo
[04:50.976] Singing long live all the mountains we moved | Cantando larga vida a todas las montañas que movimos
[04:54.656] I had the time of my life fighting dragons with you | Pasé el mejor momento de mi vida luchando contra dragones contigo
[04:59.936] And long, long live the look on your face | Y larga, larga vida a la mirada en tu rostro
[05:04.149] And bring on all the pretenders | Y que vengan todos los pretendientes
[05:07.641] One day, we will be remembered | Un día, seremos recordados`;

const Long = () => {
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
          alerta: "¡Montse acaba de abrir el Capítulo VI: Long Live!",
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
    <div className="day6-magazine">

      {/* Folio superior */}
      <div className="day6-folio-bar">
        <span>Cap. {CHAPTER_INDEX} / {String(CHAPTER_TOTAL).padStart(2, '0')}</span>
        <span>Long Live</span>
      </div>

      {/* Hero: foto de portada del capítulo + título superpuesto */}
      <div className="day6-hero">
        <img src={mainImg} alt="" className="day6-hero-photo" />
        <div className="day6-hero-gradient" />
        <div className="day6-hero-text">
          <p className="day6-hero-eyebrow">Capítulo VI</p>
          <h1 className="day6-hero-title">Long Live</h1>
          <p className="day6-hero-artist">Taylor Swift</p>
        </div>
      </div>

      {/* Pull quote */}
      <div className="day6-pull-quote">
        <span className="day6-quote-mark" aria-hidden="true">&ldquo;</span>
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
      <div className="day6-player-wrap">
        <div className={`day6-player-shell ${!playerRevealed ? 'is-locked' : ''}`}>
          <MusicPlayer
            title="Long Live"
            artist="Taylor Swift"
            cover={coverImg}
            audioSrc={audioFile}
            lyrics={songLrc}
            endText="No puedo Martha, ya me cansé de escribir"
            bgColor={PLAYER_BG}
            textColor={PLAYER_TEXT}
            accentColor={ACCENT}
            onClose={handleClosePlayer}
          />
 
          {!playerRevealed && (
            <div className="day6-player-overlay">
              {showButton ? (
                <button className="day6-cta-ticket" onClick={handleRevealPlayer}>
                  <span className="day6-ticket-disc" aria-hidden="true">
                    <svg viewBox="0 0 40 40" width="28" height="28">
                      <circle cx="20" cy="20" r="18" fill="none" stroke={ACCENT} strokeWidth="1.2" />
                      <circle cx="20" cy="20" r="11" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.6" />
                      <circle cx="20" cy="20" r="3" fill={ACCENT} />
                    </svg>
                  </span>
                  <span className="day6-ticket-divider" />
                  <span className="day6-ticket-text">
                    <span className="day6-ticket-title">Long Live</span>
                    <span className="day6-ticket-subtitle">Taylor Swift</span>
                  </span>
                  <span className="day6-ticket-action">Escuchar</span>
                </button>
              ) : (
                <LockedCard
                  label="Long Live — Taylor Swift"
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
              photo: polaroidImg2,
              quote: "Conocí a esta Diva en la poderosisima 'Francisco Quintanilla 125 Middle School Plantel Agaves City' cuando la polemica Kenia Os y Jukilop estaban en su peak, todo gracias a mi Dulce bella, tiene una cabellera de alto impacto en su momento la más larga de todo el condado de Tlajomulco, siempre luciendo sus hermosos rizos, siempre he admirado como en cualquier situación encuentra la manera de tener la razón, aunque debo admitir que cometió un error al darme 2 votos y 3 a Pancho en el cumpleaños de Fer aquel 2024, pero eso se compensa con la vez que cuido mis papitas en el camión para que no se me quebraran, deseo que sus proximos años esten llenos de aprendizajes, salud y sobre todo muchas aventuras, que disfrute mucho la vida y que se haga millonaria, Te quiero mucho Montse",
              name: "Meme",
            },
            {
              photo: polaroidImg,
              quote: "Lo siento, pobrecita y que Dios te bendiga mija y muchos besitos 💋 y la que soporte 💅.",
              name: "Lupita TikTok",        
            },
          ]}
          accentColor={ACCENT}
          continueLabel="Cerrar capítulo"
          onContinue={goToIndex}
          nextLabel="Siguiente capítulo"
          onNext={goToNextChapter}
        />
      )}

      {/* Folio de cierre */}
      <div className="day6-folio-footer">
        <span>{String(CHAPTER_INDEX).padStart(2, '0')}</span>
        <span className="day6-folio-rule" />
        <span>de {String(CHAPTER_TOTAL).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default Long;