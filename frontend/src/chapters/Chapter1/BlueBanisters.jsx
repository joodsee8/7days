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
  const [completedParagraphs, setCompletedParagraphs] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // Lógica del Typewriter acumulativo para la carta
  useEffect(() => {
    if (paragraphIndex < letterParagraphs.length) {
      const fullText = letterParagraphs[paragraphIndex];
      
      if (currentTypingText.length < fullText.length) {
        // Escribe letra por letra (muy rápido para no desesperar al lector)
        const timeout = setTimeout(() => {
          setCurrentTypingText(fullText.slice(0, currentTypingText.length + 1));
        }, 100); // 20ms por letra
        
        return () => clearTimeout(timeout);
      } else {
        // Cuando termina un párrafo, lo guarda, hace una pausa y pasa al siguiente
        const timeout = setTimeout(() => {
          setCompletedParagraphs(prev => [...prev, fullText]);
          setCurrentTypingText('');
          setParagraphIndex(prev => prev + 1);
        }, 600); // Pausa de 600ms entre párrafos
        
        return () => clearTimeout(timeout);
      }
    } else {
      // Cuando termina toda la carta, muestra el botón
      setTimeout(() => setShowButton(true), 1500);
    }
  }, [currentTypingText, paragraphIndex]);

  return (
    <div className="chapter-light-container fade-in-chapter">
      <div className="letter-content-mobile">
        
        <div className="letra-cursiva-oscura">
          {/* Párrafos ya completados */}
          {completedParagraphs.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
          
          {/* Párrafo que se está escribiendo actualmente */}
          {paragraphIndex < letterParagraphs.length && (
            <p className="typing-paragraph">
              {currentTypingText}
              <span className="blinking-cursor">|</span>
            </p>
          )}
        </div>
        
        <div className="espacio-vacio"></div>

        {/* El Botón Sutil */}
        {showButton && (
          <div className="sutil-action-container fade-in-button">
            <span className="sutil-button-dark">Escuchar canción</span>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlueBanisters;
