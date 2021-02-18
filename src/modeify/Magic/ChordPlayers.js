import React, { useState, useEffect } from "react";
import { s11, note, chord, scale } from "sharp11";
import audio from "sharp11-web-audio";
import { Chord } from "@tonaljs/tonal";
import { Button } from "@material-ui/core";

export default function ChordPlayers(props) {
  const [state, setState] = useState({
    chord: props.chord,
  });

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://www.scales-chords.com/api/scales-chords-api.js";
    script.async = true;
    script.type = "text/javascript";

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const playChord = (event) => {
    audio.init(function (err, fns) {
      let chordify = Chord.get(props.chord);
      chordify.notes.forEach((curNote) => {
        let notey = note.create(curNote, 3);
        fns.play(notey, 0, 3);
      });
    });
  };

  return (
    <div className="render-chords">
      <button className="play-button" onClick={playChord}>
        Preview
      </button>
    </div>
  );
}

// example attempt with scales-chords
{
  /* {props.mode == "magic" ? (
        <div className="render-chords">
         
        </div>
      ) : null} */
}

{
  /* <script
        async
        type="text/javascript"
        src="https://www.scales-chords.com/api/scales-chords-api.js"
      ></script> */
}
