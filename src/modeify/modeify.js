import React, { useState, useEffect } from "react";
import Modeify from "../home/modeify.png";
import Piano from "./PIANO/Piano";
// import Keyboard from "./Keyboard";
import "./PIANO/Keyboard.css";
import "./Modeify.css";
import { Button } from "@material-ui/core";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import KeyboardMap from "./PIANO/utils/KeyboardMap";
import options from "./PIANO/utils/Options";

const MainMode = () => {
  const [state, setState] = useState({
    piano: "hooks",
    mode: "play",
    notesPlaying: [],
    chordBuilder: [],
    sound: "acoustic_grand_piano",
    newNotes: false,
  });

  const isRegularKey = (event) => {
    return !event.ctrlKey && !event.metaKey && !event.shiftKey;
  };

  // const isShiftKey = (event) => {
  //   if (event.shiftKey) {
  //     console.log("shift");
  //     const chord = [...state.notesPlaying];
  //     setState({ ...state, chordBuilder: chord });
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // const changePiano = () => {
  //   if (state.piano === "hooks") {
  //     setState({ ...state, piano: "react" });
  //   } else {
  //     setState({ ...state, piano: "hooks" });
  //   }
  // };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [state.notesPlaying]);

  const getNoteFromKeyboardKey = (keyboardKey) => {
    return KeyboardMap[keyboardKey.toUpperCase()];
  };

  const handleKeyDown = (e) => {
    if (isRegularKey(e) && !e.repeat) {
      const note = getNoteFromKeyboardKey(e.key);
      if (note && !state.notesPlaying.includes(note)) {
        setState({
          ...state,
          newNotes: true,
          notesPlaying: [...state.notesPlaying, note],
        });
      }
    }
    // else if (isShiftKey(e) && !e.repeat) {
    //   let chord = [...state.notesPlaying];
    //   setState({ ...state, chordBuilder: chord });
    // }
  };

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

  let defaultOption = options[0];

  const onSelect = (event) => {
    setState({ ...state, sound: event.value });
  };

  return (
    <div className="modeify-main">
      <div className="piano">
        <Piano
          newNotes={state.newNotes}
          notesPlaying={state.notesPlaying}
          className="piano"
          sound={state.sound}
        />
      </div>

      <div>
        <Dropdown
          className="sound-dropdown"
          options={options}
          onChange={onSelect}
          value={defaultOption}
          placeholder="Select an option"
        />
      </div>

      <div className="under-keys">
        <img
          className="modeify-page-logo"
          alt="modeify-logo"
          src={Modeify}
        ></img>
        <div className="mode-button-div">
          <div className="space"></div>

          <div>
            {/* <Button
              onClick={changePiano}
              className="mode-button"
              variant="outlined"
            >
              Change Piano Mode
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMode;
