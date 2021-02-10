import React from "react";
// const Chord = require("sharp11").chord;
import { Chord } from "@tonaljs/tonal";

export default function Chords(props) {
  let chord;
  let chordOptions;
  if (props.mode === "magic") {
    chord = Chord.detect(props.chord);
    chordOptions = Chord.extended(chord[0]);
  }

  return (
    <div className="chord-playground">
      {props.mode === "magic" ? (
        <div>
          <h1 className="title">Chord:</h1>
          <h2 className="title">{chord.length > 1 ? chord[0] : chord}</h2>
          <h2 className="title">{Chord.chordScales(chord)}</h2>
          <h1 className="title">Chord Extensions:</h1>
          <h2 className="title">{chordOptions}</h2>
        </div>
      ) : null}
    </div>
  );
}

// EXAMPLE CODE

//   <ins
//     className="scales_chords_api"
//     chord="Cm9"
//     instrument="piano"
//     nolink="true"
//   ></ins>
//   <ins
//     className="scales_chords_api"
//     chord="Cm9"
//     instrument="piano"
//     output="sound"
//   ></ins>
