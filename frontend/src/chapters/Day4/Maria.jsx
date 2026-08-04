import React, { useState, useEffect } from 'react';
import './Maria.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer'; // Importamos el reproductor
import coverImg from '../../assets/images/pajarito.jpg'
import audioFile from '../../assets/music/Maria.mp3'
import polaroidImg from '../../assets/images/Polaroid.jpg'
import polaroidImg2 from '../../assets/images/Polaroid2.jpg'

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

const songLrc = `
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
  const [completedParagraphs, setCompletedParagraphs] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  
  // NUEVO ESTADO: Controla si se muestra el reproductor de música
  const [showPlayer, setShowPlayer] = useState(false);

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setShowPolaroid(true);
  };

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
                handleSaveMemory(polaroidImg, 'Polaroid3.jpg')
              }
            />

            <Polaroid
              imageSrc={polaroidImg2}
              message="..."
              friendName="..."
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