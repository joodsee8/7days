import "./Intro.css";
import Typewriter from "../../components/Typewriter/Typewriter";

function Intro() {

    const script = [

        {
            text: "Hola, Montse.",
            pause: 2500
        },

        {
            text: "Quiero pedirte siete días.",
            pause: 3000
        },

        {
            text: "Nada de esto necesita una respuesta.",
            pause: 2500
        }

    ];

    return (

        <main className="intro">

            <Typewriter script={script}/>

        </main>

    );

}

export default Intro;