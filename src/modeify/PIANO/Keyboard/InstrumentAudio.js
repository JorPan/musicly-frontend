import React, { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";

const InstrumentAudio = ({ instrumentName, notes, newNotes }) => {
  const [instrumentPlayer, setInstrumentPlayer] = useState(null);
  useEffect(() => {
    setInstrumentPlayer(AudioPlayer());
  }, []);

  const setInstrument = () => {
    instrumentPlayer.setInstrument(instrumentName);
  };

  useEffect(() => {
    if (instrumentPlayer) {
      setInstrument();
      playNotes();
    }
  }, [instrumentPlayer, setInstrument]);

  useEffect(() => {
    if (notes && notes.length > 0 && newNotes === true) {
      playNotes();
    }
  }, [notes]);

  const playNotes = () => {
    if (newNotes === false) {
      notes = [];
    } else if (instrumentPlayer) {
      instrumentPlayer.playNote(notes[notes.length - 1]);
    }
  };
  return null;
};

export default InstrumentAudio;
