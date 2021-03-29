import React, { useState, useEffect } from "react";
import { Chord, Key, Scale } from "@tonaljs/tonal";
import Dropdown from "react-dropdown";
import { Button } from "@material-ui/core";
import ChordPlayers from "./ChordPlayers";
import ChordCard from "./ChordCard";
// const Scale = require("sharp11").scale;

export default function Chords(props) {
  let [state, setState] = useState({
    extensions: false,
    scales: false,
    scale: "More Scales...",
    selectedScale: [],
    major: false,
    minor: false,
    builder: [],
    scaleChords: [],
    progression: [],
  });

  let key;
  let tempKey;
  let tempChords;
  let chord;
  let chordOptions;
  let scaleOptions;
  let majorminor;
  let scaleNotes;

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
      scale: "More Scales...",
      scaleChords: [],
    });
  };

  const viewScale = (event) => {
    let currentScale = Scale.get(`${key} ${event.value}`).notes;
    setState({
      ...state,
      scales: true,
      minor: false,
      major: false,
      extensions: false,
      scale: event.value,
      selectedScale: currentScale,
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
      scaleChords: [],
    });
  };

  const majorScale = () => {
    setState({
      ...state,
      major: !state.major,
      minor: false,
      extensions: false,
      scale: "More Scales...",
      scaleChords: [],
    });
  };

  const minorScale = () => {
    setState({
      ...state,
      minor: !state.minor,
      major: false,
      extensions: false,
      scale: "More Scales...",
      scaleChords: [],
    });
  };

  const addToBuilder = (event) => {
    let currentCard = [event.target.parentNode.parentNode];
    let currentCardName = currentCard[0].children[0].innerText;
    // let currentCardNotes = currentCard[0].children[1].innerText;
    let newFavorite = currentCardName;
    setState({ ...state, builder: [...state.builder, newFavorite] });
  };

  const removeFromBuilder = (event) => {
    let currentBuilder = [...state.builder];
    let cardToRemove = [event.target.parentNode.parentNode];
    let chordToRemove = cardToRemove[0].children[0].innerText;

    let filteredProgression = currentBuilder.filter(
      (chordInProgression) => chordInProgression !== chordToRemove
    );
    setState({ ...state, builder: filteredProgression });
  };

  if (state.major === true) {
    scaleNotes = Key.majorKey(`${key}`).scale;
    tempChords = Key.majorKey(`${key}`).chords;
  }

  if (state.minor === true) {
    scaleNotes = Key.minorKey(`${key}`).natural.scale;
    tempChords = Key.minorKey(`${key}`).natural.chords;
  }

  const changeKey = (event) => {
    tempKey = event.target.innerText;
    let majorChords = Key.majorKey(`${tempKey}`).chords;
    let minorChords = Key.minorKey(`${tempKey}`).natural.chords;
    let newChords = majorChords.concat(minorChords);
    setState({ ...state, scaleChords: newChords });
  };

  const saveProgression = (event) => {
    console.log(`Saving ${state.builder}`);
    let currentBuild = state.builder;
    setState({ ...state, progession: currentBuild, builder: [] });
  };

  const clearProgression = (event) => {
    setState({ ...state, builder: [] });
  };

  return (
    <div className="chord-playground">
      {props.mode === "magic" ? (
        <div className="magic-section">
          <p className="title key-title">Key: {key}</p>
          <p className="title key-title">{majorminor}</p>
          <ChordCard
            chord={chord}
            notes={props.notes.join(", ")}
            mode={props.mode}
            handleClick={addToBuilder}
            plusOrMinus="+"
          />
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
                className="scale-dropdown"
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
      <div className="dropzone droppable">
        <div>
          <h1 className="dropzone-title">Progression Builder</h1>
          {state.builder.length > 0 ? (
            <div>
              {/* <button
                onClick={saveProgression}
                className="save-progression-button"
              >
                Save
              </button> */}
              <button
                onClick={clearProgression}
                className="save-progression-button"
              >
                Clear
              </button>
            </div>
          ) : null}
        </div>

        {state.builder.length > 0
          ? state.builder.map((option, i) => {
              let notes = Chord.get(option).notes.join(", ");
              return (
                <ChordCard
                  chord={option}
                  notes={notes}
                  mode={props.mode}
                  handleClick={removeFromBuilder}
                  plusOrMinus="-"
                />
              );
            })
          : null}
      </div>

      {state.scale !== "More Scales..." ? (
        <div className="chord-suggestions">
          <h1 className="title scale-name">{state.scale}</h1>
          <div className="scale-notes">
            {state.selectedScale.map((note, i) => (
              <p key={i} className="selected-scale-note" onClick={changeKey}>
                {note}
              </p>
            ))}
          </div>
        </div>
      ) : null}
      <div className="chord-list">
        {state.extensions === true
          ? chordOptions.map((option, i) => {
              let notes = Chord.get(option).notes.join(", ");
              return (
                <ChordCard
                  chord={option}
                  notes={notes}
                  mode={props.mode}
                  handleClick={addToBuilder}
                  plusOrMinus="+"
                />
              );
            })
          : null}
        {state.major === true ? (
          <div className="m-chord-suggestions">
            <div className="scale-notes">
              <h1 className="title key-name">Major</h1>
              {scaleNotes.map((note, i) => (
                <p key={i} className="scale-note" onClick={changeKey}>
                  {note}
                </p>
              ))}
            </div>
            {tempChords.map((option, i) => {
              let notes = Chord.get(option).notes.join(", ");
              return (
                <ChordCard
                  chord={option}
                  notes={notes}
                  mode={props.mode}
                  handleClick={addToBuilder}
                  plusOrMinus="+"
                />
              );
            })}
          </div>
        ) : null}
        {state.minor === true ? (
          <div className="m-chord-suggestions">
            <div className="scale-notes">
              <h1 className="title key-name">Minor</h1>
              {scaleNotes.map((note, i) => (
                <p key={i} className="scale-note" onClick={changeKey}>
                  {note}
                </p>
              ))}
            </div>
            {tempChords.map((option, i) => {
              let notes = Chord.get(option).notes.join(", ");
              return (
                <ChordCard
                  chord={option}
                  notes={notes}
                  mode={props.mode}
                  handleClick={addToBuilder}
                  plusOrMinus="+"
                />
              );
            })}
          </div>
        ) : null}
        {state.scaleChords.length > 0 ? (
          <div className="chord-suggestions">
            {state.scaleChords.map((option, i) => {
              let notes = Chord.get(option).notes.join(", ");
              return (
                <ChordCard
                  chord={option}
                  notes={notes}
                  mode={props.mode}
                  handleClick={addToBuilder}
                  plusOrMinus="+"
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
