import React, { useState, useEffect } from "react";
// const Chord = require("sharp11").chord;
import { Chord } from "@tonaljs/tonal";
import Dropdown from "react-dropdown";
import { Button } from "@material-ui/core";
import ChordPlayers from "./ChordPlayers";

export default function Chords(props) {
  let [state, setState] = useState({
    extensions: false,
    scales: false,
    scale: "More Scales...",
  });

  let key;
  let chord;
  let chordOptions;
  let scaleOptions;
  let majorminor;
  if (props.mode === "magic") {
    chord = Chord.detect(props.chord);

    if (props.chord.length > 1) {
      chord = Chord.detect(props.chord)[0];
    }

    scaleOptions = Chord.chordScales(chord);
    chordOptions = Chord.extended(chord);

    if (!chord) {
      chord = "Try Again";
    } else if (chord.toString().split("")[1] !== "#") {
      key = chord.toString().split("")[0];
    } else {
      key = chord.toString().split("")[0].concat(chord.toString().split("")[1]);
    }
  }

  if (chord.includes("M")) {
    majorminor = "major";
  }
  if (chord.includes("m")) {
    majorminor = "minor";
  }

  const chordExtensions = () => {
    setState({ ...state, extensions: !state.extensions });
  };

  const viewScale = (event) => {
    setState({ ...state, scales: true, scale: event.value });
  };

  const clearScale = () => {
    setState({ ...state, scales: false, scale: "More Scales..." });
  };

  const majorScale = () => {};

  const minorScale = () => {};

  return (
    <div className="chord-playground">
      {props.mode === "magic" ? (
        <div className="magic-section">
          <p className="title key-title">Key: {key}</p>
          <p className="title key-title">{majorminor}</p>
          <div className="chord-card" draggable="true">
            <h1 className="card-title">{chord}</h1>
            <p className="card-notes">{props.notes.join(", ")}</p>
            <ChordPlayers mode={props.mode} chord={chord} />
          </div>
          <div className="magic-dropdowns">
            <h1 className="explore">Explore:</h1>
            <div className="button">
              <Button
                onClick={chordExtensions}
                className="generate-chord-button"
                variant="outlined"
              >
                Chord Extensions
              </Button>
            </div>
            <div className="button">
              <Button
                onClick={minorScale}
                className="view-scale-button"
                variant="outlined"
                color="primary"
              >
                Major
              </Button>
            </div>
            <div className="button">
              <Button
                onClick={majorScale}
                className="view-scale-button"
                variant="outlined"
                color="secondary"
              >
                Minor
              </Button>
            </div>
            <div className="button">
              <Dropdown
                className="sound-dropdown"
                options={scaleOptions}
                value={state.scale}
                onChange={viewScale}
                placeholder={"Select an option"}
              />
            </div>
            {state.scales === true ? (
              <div className="button">
                <Button
                  onClick={clearScale}
                  className="view-scale-button"
                  variant="outlined"
                >
                  Clear Scale
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="chord-list">
        {state.extensions === true
          ? chordOptions.map((option, i) => {
              let notes = Chord.get(option).notes.join(", ");
              return (
                <div className="chord-card" draggable="true">
                  <h1 className="card-title">{option}</h1>
                  <p className="card-notes">{notes}</p>
                  <ChordPlayers
                    className="play-button"
                    mode={props.mode}
                    chord={option}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
