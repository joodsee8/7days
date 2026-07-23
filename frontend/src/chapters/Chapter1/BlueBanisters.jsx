import React from 'react';
import './BlueBanisters.css';

const BlueBanisters = () => {
  return (
    <div className="chapter-container">
      
      {/* CARTA */}
      <section className="chapter-section letter-section fade-in">
        <p className="date">1 de Agosto — Día 1: Los barandales azules</p>
        <p>Ocho años.</p>
        <p>A veces me cuesta creer que ha pasado tanto tiempo desde que nos conocimos en la secundaria. Hemos cambiado, hemos crecido, y en todo este tiempo me has visto en un montón de facetas distintas.</p>
        <p>Hoy, en el primer día de este recorrido, quiero volver a una de las versiones mías que mejor conoces, y que quizá más necesitó de un abrazo aunque no supiera cómo pedirlo.</p>
      </section>

      {/* HISTORIA */}
      <section className="chapter-section story-section fade-in">
        <p>Seguro recuerdas aquella época. Hubo una persona que conocí y, para resumirlo, las cosas simplemente no salieron como esperaba.</p>
        <p>No fue el fin del mundo, ni fue algo que destruyera mi vida, pero no te voy a mentir: sí dejó una etapa bastante complicada y un desgaste emocional que me costó sacudirme.</p>
        <p>Cuando pasas por algo así, tu mundo se vuelve un poco gris. Pero durante todo ese proceso, hubo personas que decidieron quedarse cerca para asegurarse de que yo no me hundiera.</p>
        <p>Tú fuiste una de esas personas.</p>
      </section>

      {/* POR QUÉ ESTA CANCIÓN */}
      <section className="chapter-section connection-section fade-in">
        <p>Hay una canción de Lana Del Rey llamada <em>Blue Banisters</em>.</p>
        <p>En la letra, Lana cuenta cómo cada mes de mayo, sus "hermanas" vuelan hacia ella para ayudarle a pintar sus barandales de gris y verde.</p>
        <p>Yo no sé qué signifiquen esos colores para ella, pero cuando escucho esa parte, para mí el mes cambia.</p>
        <p>Para mí es abril.</p>
        <p>Cada abril, en mi cumpleaños, venían por mí para sacarme de ese espacio mental y recordarme que no estaba solo. Y siempre, incondicionalmente, siempre estabas tú, Montse.</p>
        <p>La canción no cuenta nuestra historia completa, pero la acompaña a la perfección. Porque eso fue exactamente lo que hiciste por mí en mis momentos más bajos: llegaste con pintura fresca para ayudarme a reparar lo que se sentía roto, a darle color a mis propios barandales azules hasta que todo volviera a sentirse como un hogar.</p>
      </section>

      {/* CANCIÓN */}
      <section className="chapter-section song-section fade-in">
        <div className="song-placeholder">
          <p className="song-title">Blue Banisters - Lana Del Rey</p>
          <p className="song-note">(Aquí integraremos tu reproductor personalizado)</p>
        </div>
      </section>

      {/* REFLEXIÓN Y DESPEDIDA */}
      <section className="chapter-section reflection-section fade-in">
        <p>Dicen que conoces a tus verdaderos amigos en los momentos difíciles, pero yo creo que los conoces por los abriles en los que regresan, sin falta, para asegurarse de que vuelvas a sonreír.</p>
        <p>Gracias por no soltarme.</p>
        <p className="farewell">Nos vemos mañana para el día dos. Descansa, Montse.</p>
      </section>

    </div>
  );
};

export default BlueBanisters;
