import React, { Fragment, useState, useEffect } from "react";
import isAccidentalNote from "./utils/isAccidentalNote";
import { getKeyboardShortcutsForNote } from "./utils/getKeyboardShortcutsForNote";
import InstrumentAudio from "./Keyboard/InstrumentAudio";
import getNotesBetween from "./utils/getNotesBetween";

const isRegularKey = (event) => {
  return !event.ctrlKey && !event.metaKey && !event.shiftKey;
};
const Instrument = ({
  instrumentName,
  startNote,
  endNote,
  renderPianoKey,
  keyboardMap,
}) => {
  const notes = getNotesBetween(startNote, endNote);

  const [state, setState] = useState({
    notesPlaying: [],
    newNotes: false,
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [state.notesPlaying]);

  const getNoteFromKeyboardKey = (keyboardKey) => {
    return keyboardMap[keyboardKey.toUpperCase()];
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

  // const onPlayNoteStart = (note) => {
  //   setState({ ...state, notesPlaying: [...state.notesPlaying, note] });
  // };

  // const onPlayNoteEnd = (note) => {
  //   setState({
  //     ...state,
  //     notesPlaying: state.notesPlaying.filter(
  //       (notePlaying) => notePlaying !== note
  //     ),
  //   });
  // };

  return (
    <Fragment>
      {notes.map((note) => {
        return (
          <Fragment key={note}>
            {renderPianoKey({
              note,
              isAccidentalNote: isAccidentalNote(note),
              isNotePlaying: state.notesPlaying.includes(note),
              // startPlayingNote: () => onPlayNoteStart(note),
              // stopPlayingNote: () => onPlayNoteEnd(note),
              keyboardShortcut: getKeyboardShortcutsForNote(keyboardMap, note),
            })}
          </Fragment>
        );
      })}

      <InstrumentAudio
        instrumentName={instrumentName}
        notes={state.notesPlaying}
        newNotes={state.newNotes}
      />
    </Fragment>
  );
};

export default Instrument;
