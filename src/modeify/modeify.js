import React, { useState, useEffect } from "react";
import Modeify from "../home/modeify.png";
import Piano from "./PIANO/Piano";
import "./PIANO/Keyboard.css";
import "./Modeify.css";
import { Button } from "@material-ui/core";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import KeyboardMap from "./PIANO/utils/KeyboardMap";
import options from "./PIANO/utils/Options";
import Chords from "./Magic/Chords";
import { Chord } from "@tonaljs/tonal";

const MainMode = () => {
  const [state, setState] = useState({
    piano: "hooks",
    mode: "ready",
    notesPlaying: [],
    chordBuilder: [],
    chord: "",
    sound: "acoustic_grand_piano",
    newNotes: false,
  });

  // Changes the sound of the piano
  const soundSelect = (event) => {
    setState({ ...state, sound: event.value });
  };

  // Detects piano keys - returns false if control, shift, or enter as those have different functions
  const isRegularKey = (event) => {
    return !event.ctrlKey && !event.metaKey && !event.shiftKey;
  };

  // set event listeners upon render
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [state.notesPlaying, state.sound]);

  // detects what key is pressed on the keyboard
  const getNoteFromKeyboardKey = (keyboardKey) => {
    return KeyboardMap[keyboardKey.toUpperCase()];
  };

  // handles the key down event to play a sound and display the note playing
  const handleKeyDown = (e) => {
    if (isRegularKey(e) && !e.repeat) {
      const note = getNoteFromKeyboardKey(e.key);
      if (note && !state.notesPlaying.includes(note)) {
        setState({
          ...state,
          mode: "playing",
          newNotes: true,
          notesPlaying: [...state.notesPlaying, note],
        });
      }
    } else if (e.key === "Enter") {
      pauseChord();
      makeMagic(e);
    } else if (e.key === "Shift") {
      pauseChord();
    } else if (state.notesPlaying.length === 5) {
      pauseChord();
      makeMagic();
    }
  };

  // handles key up event to remove prior note from notesPlaying state
  const handleKeyUp = (e) => {
    if (isRegularKey(e) && !e.repeat) {
      const note = getNoteFromKeyboardKey(e.key);
      if (note) {
        setState({
          ...state,
          newNotes: false,
          notesPlaying: state.notesPlaying.filter(
            (notePlaying) => notePlaying !== note
          ),
        });
      }
    }
  };

  // clears the current chord
  const clearChord = () => {
    setState({ ...state, chordBuilder: [], notesPlaying: [], mode: "ready" });
  };

  // pauses the current chord
  const pauseChord = (event) => {
    window.removeEventListener("keyup", handleKeyUp);
    let chordName = Chord.detect(state.notesPlaying);
    if (chordName.length > 1) {
      chordName = Chord.detect(state.notesPlaying)[0];
    }
    const chord = [...state.notesPlaying];
    setState({
      ...state,
      chordBuilder: chord,
      chord: chordName,
      mode: "paused",
    });
  };

  // set up to save chord to back end
  const saveChord = (event) => {};

  // starts magic mode and displays magic mode features
  const makeMagic = (event) => {
    window.removeEventListener("keydown", handleKeyDown);
    let chordName = Chord.detect(state.notesPlaying);
    if (chordName.length > 1) {
      chordName = Chord.detect(state.notesPlaying)[0];
    }
    const chord = [...state.notesPlaying];
    setState({
      ...state,
      chordBuilder: chord,
      chord: chordName,
      mode: "magic",
    });
  };

  return (
    <div className="modeify-main">
      <div className="above-keys">
        <img
          className="modeify-page-logo"
          alt="modeify-logo"
          src={Modeify}
        ></img>

        <div className="sound-dropdown-div">
          <Dropdown
            className="sound-dropdown"
            options={options}
            onChange={soundSelect}
            placeholder="Sound Selector"
          />
        </div>

        <div className="current-chord-div">
          {state.notesPlaying.length > 0 && state.chordBuilder.length === 0 ? (
            <div className="current-chord">
              <Button
                onClick={pauseChord}
                className="pause-chord-button"
                variant="outlined"
              >
                Pause Notes
              </Button>
            </div>
          ) : null}

          <div className="current-chord">
            {state.notesPlaying.length > 0 ? (
              <p className="instructions3">
                <u>Current Notes:</u>
              </p>
            ) : null}
            {state.notesPlaying.length > 0
              ? state.notesPlaying.map((note, i) => {
                  return (
                    <p className="current-note" key={i}>
                      {note}
                    </p>
                  );
                })
              : null}
            <p className="title chord-name">
              {Chord.detect(state.notesPlaying)[0]}
            </p>
          </div>

          {state.chordBuilder.length > 0 ? (
            <div className="clear-save-buttons">
              <Button
                onClick={clearChord}
                className="current-chord-button"
                variant="outlined"
              >
                Clear Chord
              </Button>
              {/* <Button
                onClick={saveChord}
                className="current-chord-button"
                variant="outlined"
              >
                Save Chord
              </Button> */}
              {state.mode == "magic" ? null : (
                <Button
                  onClick={makeMagic}
                  className="current-chord-button"
                  variant="outlined"
                >
                  Magic Mode
                </Button>
              )}
            </div>
          ) : null}
          <div></div>
        </div>
        <div className="directions">
          <p> - Play keys to play notes</p>
          <p> - Shift key to pause current notes</p>
          <p> - Enter key to enter magic mode</p>
        </div>
      </div>

      <div className="piano">
        <Piano
          newNotes={state.newNotes}
          notesPlaying={state.notesPlaying}
          className="piano"
          sound={state.sound}
        />
      </div>
      {state.mode === "magic" ? (
        <Chords
          chord={state.chordBuilder}
          mode={state.mode}
          notes={state.notesPlaying}
        />
      ) : null}
    </div>
  );
};

export default MainMode;
