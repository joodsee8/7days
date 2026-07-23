import { useEffect, useState } from "react";
import "./Typewriter.css";

function Typewriter({ script = [] }) {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {

        if (script.length === 0) return;

        let line = 0;
        let char = 0;

        function write() {

            const current = script[line];

            if (!current) return;

            if (char < current.text.length) {

                setDisplayText(prev => prev + current.text[char]);

                char++;

                setTimeout(write, 65 + Math.random() * 50);

            } else {

                setTimeout(() => {

                    line++;

                    char = 0;

                    if (line < script.length) {

                        setDisplayText(prev => prev + "\n\n");

                        write();

                    }

                }, current.pause);

            }

        }

        write();

    }, [script]);

    return (
        <p className="typewriter">
            {displayText}
            <span className="cursor">|</span>
        </p>
    );
}

export default Typewriter;