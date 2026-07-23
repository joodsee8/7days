import React, { useState, useEffect } from 'react';
import './BlueBanisters.css';

const letterParagraphs = [
  "Veinte años.",
  "Llegar a tu segunda década de vida no es cualquier cosa, Montse. Es un hito enorme: el final de una etapa y el comienzo de otra completamente distinta. Y mientras pensaba en la magnitud de lo que vas a celebrar este 7 de agosto, me di cuenta de algo: un solo día simplemente no era suficiente.",
  "De esos veinte años que hoy cumples, he tenido el inmenso privilegio de acompañarte en ocho. Desde la secundaria me has visto crecer, cambiar y atravesar un montón de versiones de mí mismo.",
  "Seguro recuerdas que hubo una época en la que las cosas simplemente no salieron como yo esperaba. No fue el fin del mundo, pero sí una etapa en la que sentí que todo empezó a perder color. Y cuando eso pasó, tú decidiste quedarte cerca para asegurarte de que yo no me perdiera por completo.",
  "Hay una canción de Lana Del Rey llamada Blue Banisters. En ella, Lana cuenta cómo cada mes de mayo sus “hermanas” vuelan hacia ella para ayudarle a pintar sus barandales. Nunca he sabido exactamente qué significan esos colores para ella. Pero cuando escucho esa parte, para mí el mes cambia. Para mí ya no es mayo.",
  "Para mí es abril.",
  "Porque cada abril, cuando llegaba mi cumpleaños, tú aparecías para sacarme de ese espacio mental en el que a veces me encerraba. Sin darte cuenta, llegabas con pintura fresca para ayudarme a reparar lo que se sentía roto, a devolverle color a esos barandales que yo veía completamente azules, hasta que poco a poco ese lugar volvía a sentirse como un hogar.",
  "Y fue entonces cuando entendí algo.",
  "Hay personas que llegan a tu vida y la cambian sin hacer ruido. No porque resuelvan tus problemas, sino porque hacen que enfrentarlos deje de sentirse tan solitario. Tú has sido una de esas personas para mí.",
  "Por eso este proyecto existe.",
  "Porque alguien que ha significado tanto para mí merece mucho más que un “feliz cumpleaños” enviado a medianoche. Durante los próximos siete días quiero regalarte siete cartas escondidas dentro de siete canciones. Cada una habla de una parte distinta de nuestra historia, de algo que admiro de ti o de algo que nunca había encontrado la manera de decir.",
  "Y no podía empezar con otra canción que no fuera esta."
];

const BlueBanisters = () => {
  const [isSealed, setIsSealed] = useState(true);
  const [showLetter, setShowLetter] = useState(false);
  const [visibleParagraphs, setVisibleParagraphs] = useState([]);
  const [showButton, setShowButton] = useState(false);

  // Maneja la ruptura del sello
  const handleBreakSeal = () => {
    setIsSealed(false);
    setTimeout(() => {
      setShowLetter(true);
    }, 1000); // Espera a que el sello se desvanezca
  };

  // Lógica para revelar la carta párrafo por párrafo
  useEffect(() => {
    if (showLetter && visibleParagraphs.length < letterParagraphs.length) {
      const timer = setTimeout(() => {
        setVisibleParagraphs(prev => [...prev, letterParagraphs[prev.length]]);
      }, 2500); // Tiempo de lectura/escritura entre cada párrafo
      
      return () => clearTimeout(timer);
    } else if (showLetter && visibleParagraphs.length === letterParagraphs.length) {
      // Cuando termina la carta, muestra el botón
      setTimeout(() => setShowButton(true), 1500);
    }
  }, [showLetter, visibleParagraphs]);

  return (
    <div className="chapter-container">
      {/* El Sello Digital */}
      {!showLetter && (
        <div 
          className={`digital-seal ${!isSealed ? 'fade-out' : ''}`} 
          onClick={handleBreakSeal}
        >
          <span className="seal-letter">M</span>
          <p className="seal-instruction">Toca para abrir</p>
        </div>
      )}

      {/* La Carta */}
      {showLetter && (
        <div className="letter-content fade-in">
          <div className="letra-cursiva">
            {visibleParagraphs.map((text, index) => (
              <p key={index} className="fade-in-paragraph">{text}</p>
            ))}
          </div>
          
          <div className="espacio-vacio"></div>

          {/* El Botón Sutil para reproducir la canción */}
          {showButton && (
            <div className="sutil-action-container fade-in">
              <span className="sutil-button">Escuchar canción</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlueBanisters;
