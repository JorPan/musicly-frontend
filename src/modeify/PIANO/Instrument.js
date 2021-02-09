import React, { Fragment } from "react";
import isAccidentalNote from "./utils/isAccidentalNote";
import { getKeyboardShortcutsForNote } from "./utils/getKeyboardShortcutsForNote";
import InstrumentAudio from "./Keyboard/InstrumentAudio";
import getNotesBetween from "./utils/getNotesBetween";

const Instrument = ({
  instrumentName,
  startNote,
  endNote,
  renderPianoKey,
  keyboardMap,
  notesPlaying,
  newNotes,
}) => {
  const notes = getNotesBetween(startNote, endNote);

  return (
    <Fragment>
      {notes.map((note) => {
        return (
          <Fragment key={note}>
            {renderPianoKey({
              note,
              isAccidentalNote: isAccidentalNote(note),
              isNotePlaying: notesPlaying.includes(note),
              keyboardShortcut: getKeyboardShortcutsForNote(keyboardMap, note),
            })}
          </Fragment>
        );
      })}

      <InstrumentAudio
        instrumentName={instrumentName}
        notes={notesPlaying}
        newNotes={newNotes}
      />
    </Fragment>
  );
};

export default Instrument;
