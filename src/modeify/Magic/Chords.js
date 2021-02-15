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
    major: false,
    minor: false,
    // build: false,
    builder: [],
  });

  let key;
  let chord;
  let chordOptions;
  let scaleOptions;
  let majorminor;
  // let scaleNotes;
  // let scaleChords;

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

  if (chord) {
    majorminor = "major";
  }
  if (chord.includes("m") || chord.includes("min")) {
    majorminor = "minor";
  }
  if (chord.includes("M") || chord.includes("maj")) {
    majorminor = "major";
  }

  const chordExtensions = () => {
    setState({
      ...state,
      extensions: !state.extensions,
      minor: false,
      major: false,
      // build: true,
      scale: "More Scales...",
    });
  };

  const viewScale = (event) => {
    setState({
      ...state,
      scales: true,
      minor: false,
      major: false,
      // build: false,
      extensions: false,
      scale: event.value,
    });
  };

  const clearScale = () => {
    setState({
      ...state,
      scales: false,
      minor: false,
      major: false,
      build: true,
      scale: "More Scales...",
    });
  };

  const majorScale = () => {
    setState({
      ...state,
      major: !state.major,
      minor: false,
      extensions: false,
      // build: true,
      scale: "More Scales...",
    });
  };

  const minorScale = () => {
    setState({
      ...state,
      minor: !state.minor,
      major: false,
      extensions: false,
      // build: true,
      scale: "More Scales...",
    });
  };

  const removeFromBuilder = (event) => {
    let filteredProgression = state.builder.filter(
      (chordInProgression) => event.target !== chordInProgression
    );
    setState({ ...state, builder: filteredProgression });
  };

  const addToBuilder = (event) => {
    let currentCard = [event.target.parentNode.parentNode];
    let currentCardName = currentCard[0].children[0].innerText;
    let currentCardNotes = currentCard[0].children[1].innerText;
    let currentCardPlayer = <ChordPlayers chord={currentCardName} />;
    console.log(
      currentCard,
      currentCardName,
      currentCardNotes,
      currentCardPlayer
    );

    let newFavorite = (
      <div className="chord-card" draggable="true">
        <h1 className="card-title">{currentCardName}</h1>
        <p className="card-notes">{currentCardNotes}</p>
        <div className="card-bottom">
          <ChordPlayers chord={currentCardName} />
          <button onClick={removeFromBuilder} className="add-chord-button">
            -
          </button>
        </div>
      </div>
    );
    setState({ ...state, builder: [...state.builder, newFavorite] });
  };

  return (
    <div className="chord-playground">
      {props.mode === "magic" ? (
        <div className="magic-section">
          <p className="title key-title">Key: {key}</p>
          <p className="title key-title">{majorminor}</p>
          <div className="chord-card" draggable="true">
            <h1 className="card-title">{chord}</h1>
            <p className="card-notes">{props.notes.join(", ")}</p>
            <div className="card-bottom">
              <ChordPlayers mode={props.mode} chord={chord} />
              <button onClick={addToBuilder} className="add-chord-button">
                +
              </button>
            </div>
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
                onClick={majorScale}
                className="view-scale-button"
                variant="outlined"
                color="primary"
              >
                Major
              </Button>
            </div>
            <div className="button">
              <Button
                onClick={minorScale}
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
                  <div className="card-bottom">
                    <ChordPlayers
                      className="play-button"
                      mode={props.mode}
                      chord={option}
                    />
                    <button onClick={addToBuilder} className="add-chord-button">
                      +
                    </button>
                  </div>
                </div>
              );
            })
          : null}
        {state.major === true ? <h1>major</h1> : null}
        {state.minor === true ? <h1>minor</h1> : null}
        {state.scale !== "More Scales..." ? <h1>{state.scale}</h1> : null}
        {/* {state.build === true ? ( */}
        <div className="dropzone droppable">
          <h1 className="dropzone-title">Progression Builder</h1>
          {state.builder.length > 0
            ? state.builder.map((option, i) => {
                let notes = Chord.get(option).notes.join(", ");
                return (
                  <div key={i} className="chord-card" draggable="true">
                    <h1 className="card-title">{option}</h1>
                    {/* <p className="card-notes">{notes}</p>
                    <div className="card-bottom">
                      <ChordPlayers
                        className="play-button"
                        mode={props.mode}
                        chord={option}
                      /> */}
                    {/* <button
                        onClick={addToBuilder}
                        className="add-chord-button"
                      >
                        +
                      </button> */}
                    {/* </div> */}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
