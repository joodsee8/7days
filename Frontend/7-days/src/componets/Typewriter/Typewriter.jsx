import { useEffect, useState } from "react";
import "./Typewriter.css";

function Typewriter({ script }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      let output = "";

      for (const line of script) {
        for (const char of line.text) {
          if (cancelled) return;

          output += char;
          setText(output);

          await new Promise((resolve) =>
            setTimeout(resolve, line.speed ?? 70)
          );
        }

        output += "\n\n";
        setText(output);

        await new Promise((resolve) =>
          setTimeout(resolve, line.pause ?? 2000)
        );
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [script]);

  return (
    <p className="typewriter">
      {text}
      <span className="cursor">|</span>
    </p>
  );
}

export default Typewriter;