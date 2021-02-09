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
// import options from "./PIANO/utils/Options";

const options = [
  "acoustic_grand_piano",
  "accordion",
  "acoustic_bass",
  "acoustic_guitar_nylon",
  "acoustic_guitar_steel",
  "agogo",
  "alto_sax",
  "applause",
  "bagpipe",
  "banjo",
  "baritone_sax",
  "bassoon",
  "bird_tweet",
  "blown_bottle",
  "brass_section",
  "breath_noise",
  "bright_acoustic_piano",
  "celesta",
  "cello",
  "choir_aahs",
  "church_organ",
  "clarinet",
  "clavinet",
  "contrabass",
  "distortion_guitar",
  "drawbar_organ",
  "dulcimer",
  "electric_bass_finger",
  "electric_bass_pick",
  "electric_grand_piano",
  "electric_guitar_clean",
  "electric_guitar_jazz",
  "electric_guitar_muted",
  "electric_piano_1",
  "electric_piano_2",
  "english_horn",
  "fiddle",
  "flute",
  "french_horn",
  "fretless_bass",
  "fx_1_rain",
  "fx_2_soundtrack",
  "fx_3_crystal",
  "fx_4_atmosphere",
  "fx_5_brightness",
  "fx_6_goblins",
  "fx_7_echoes",
  "fx_8_scifi",
  "glockenspiel",
  "guitar_fret_noise",
  "guitar_harmonics",
  "gunshot",
  "harmonica",
  "harpsichord",
  "helicopter",
  "honkytonk_piano",
  "kalimba",
  "koto",
  "lead_1_square",
  "lead_2_sawtooth",
  "lead_3_calliope",
  "lead_4_chiff",
  "lead_5_charang",
  "lead_6_voice",
  "lead_7_fifths",
  "lead_8_bass__lead",
  "marimba",
  "melodic_tom",
  "music_box",
  "muted_trumpet",
  "oboe",
  "ocarina",
  "orchestra_hit",
  "orchestral_harp",
  "overdriven_guitar",
  "pad_1_new_age",
  "pad_2_warm",
  "pad_3_polysynth",
  "pad_4_choir",
  "pad_5_bowed",
  "pad_6_metallic",
  "pad_7_halo",
  "pad_8_sweep",
  "pan_flute",
  "percussive_organ",
  "percussion",
  "piccolo",
  "pizzicato_strings",
  "recorder",
  "reed_organ",
  "reverse_cymbal",
  "rock_organ",
  "seashore",
  "shakuhachi",
  "shamisen",
  "shanai",
  "sitar",
  "slap_bass_1",
  "slap_bass_2",
  "soprano_sax",
  "steel_drums",
  "string_ensemble_1",
  "string_ensemble_2",
  "synth_bass_1",
  "synth_bass_2",
  "synth_brass_1",
  "synth_brass_2",
  "synth_choir",
  "synth_drum",
  "synth_strings_1",
  "synth_strings_2",
  "taiko_drum",
  "tango_accordion",
  "telephone_ring",
  "tenor_sax",
  "timpani",
  "tinkle_bell",
  "tremolo_strings",
  "trombone",
  "trumpet",
  "tuba",
  "tubular_bells",
  "vibraphone",
  "viola",
  "violin",
  "voice_oohs",
  "whistle",
  "woodblock",
  "xylophone",
];

const MainMode = () => {
  const [state, setState] = useState({
    piano: "hooks",
    mode: "ready",
    notesPlaying: [],
    chordBuilder: [],
    sound: "acoustic_grand_piano",
    newNotes: false,
  });

  const isRegularKey = (event) => {
    return !event.ctrlKey && !event.metaKey && !event.shiftKey;
  };

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
          mode: "playing",
          newNotes: true,
          notesPlaying: [...state.notesPlaying, note],
        });
      }
    } else if (e.key === "Enter") {
      pauseChord();
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

  const clearChord = (event) => {
    event.preventDefault();
    setState({ ...state, chordBuilder: [], notesPlaying: [], mode: "ready" });
  };

  const pauseChord = (event) => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
    let chord = [...state.notesPlaying];
    setState({ ...state, chordBuilder: chord });
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

      <div className="above-keys">
        <img
          className="modeify-page-logo"
          alt="modeify-logo"
          src={Modeify}
        ></img>
        <div className="space"></div>
        <div className="current-chord-div">
          {state.notesPlaying.length > 0 && state.chordBuilder.length === 0 ? (
            <div className="current-chord">
              <Button
                onClick={pauseChord}
                className="pause-chord-button"
                variant="outlined"
              >
                Pause Chord
              </Button>
              <p className="instructions2">Press enter to Pause Chord</p>
            </div>
          ) : state.mode === "ready" ? (
            <p className="instructions1">Play some Keys!</p>
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
              <Button
                onClick={clearChord}
                className="current-chord-button"
                variant="outlined"
              >
                Save Chord
              </Button>
            </div>
          ) : null}

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MainMode;
