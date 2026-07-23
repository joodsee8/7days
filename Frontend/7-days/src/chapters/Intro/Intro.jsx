import "./Intro.css";
import Typewriter from "../../components/Typewriter/Typewriter";

function Intro() {
  const script = [
    {
      text: "Hola, Montse.",
      speed: 75,
      pause: 2500,
    },
    {
      text: "Quiero pedirte siete días.",
      speed: 75,
      pause: 3500,
    },
    {
      text: "Nada de esto necesita una respuesta.",
      speed: 70,
      pause: 2500,
    },
  ];

  return (
    <main className="intro">
      <Typewriter script={script} />
    </main>
  );
}

export default Intro;