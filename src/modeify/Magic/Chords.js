import React, { useState, useEffect } from "react";
// const Chord = require("sharp11").chord;
import { Chord } from "@tonaljs/tonal";
import Dropdown from "react-dropdown";
import { Button } from "@material-ui/core";

export default function Chords(props) {
  let key;
  let chord;
  let chordOptions;
  let scaleOptions;
  if (props.mode === "magic") {
    chord = Chord.detect(props.chord);
    scaleOptions = Chord.chordScales(chord);
    chordOptions = Chord.extended(chord[0]);
    if (chord.toString().split("")[1] !== "#") {
      key = chord.toString().split("")[0];
    } else {
      key = chord.toString().split("")[0].concat(chord.toString().split("")[1]);
    }
  }

  const generateChord = () => {
    console.log(chord);
  };

  const viewScale = () => {
    console.log("hi");
  };

  return (
    <div className="chord-playground">
      {props.mode === "magic" ? (
        <div className="magic-section">
          <p className="title key-title">Key: {key}</p>
          <div className="title">
            <p className="chord-name">Chord: {chord}</p>
          </div>
          <div className="magic-dropdowns">
            <Dropdown
              className="sound-dropdown"
              options={chordOptions}
              // onChange={}
              value="chord extensions"
              placeholder="Select an option"
            />
            <Button
              onClick={generateChord}
              className="generate-chord-button"
              variant="outlined"
            >
              Generate Chord
            </Button>
            <Dropdown
              className="sound-dropdown"
              options={scaleOptions}
              // onChange={}
              value="scale options"
              placeholder="Select an option"
            />
            <Button
              onClick={viewScale}
              className="view-scale-button"
              variant="outlined"
            >
              Explore Scale
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// EXAMPLE CODE

{
  /* <div className="render-chords">
  <ins
    className="scales_chords_api"
    chord="Cm9"
    instrument="piano"
    nolink="true"
  ></ins>
  <ins
    className="scales_chords_api"
    chord="Cm9"
    instrument="piano"
    output="sound"
  ></ins>
</div>; */
}
