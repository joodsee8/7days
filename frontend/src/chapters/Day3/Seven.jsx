import React, { useState, useEffect } from 'react';
import './Seven.css';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer'; // Importamos el reproductor
import Polaroid from '../../components/Polaroid/Polaroid';
import coverImg from '../../assets/images/folklore.jpg';
import audioFile from '../../assets/music/Seven.mp3';
import polaroidImg from '../../assets/images/Polaroid3.jpg';
import polaroidImg2 from '../../assets/images/Polaroid4.jpg';

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
  // "Porque alguien que ha significado tanto para mí merece mucho más que un “feliz cumpleaños” enviado a medianoche. Durante los próximos siete días quiero regalarte siete cartas escondidas dentro de siete canciones. Cada una habla de una parte distinta de nuestra historia, de algo que admiro de ti o de algo que nunca había encontrado la manera de decir.",
  // "Y no podía empezar con otra canción que no fuera esta."
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