import React, { Component } from "react";
import Modeify from "../home/modeify.png";
import Piano from "./PIANO/Piano";
import Keyboard from "./Keyboard";
import "./PIANO/Keyboard.css";
import "./Modeify.css";
import { Button } from "@material-ui/core";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default class MainMode extends Component {
  state = {
    piano: "hooks",
    mode: "play",
    notesPlaying: [],
    chordBuilder: [],
    sound: "acoustic_grand_piano",
  };

  changePiano = () => {
    console.log(this.state);
    if (this.state.piano === "hooks") {
      this.setState({ piano: "react" });
    } else {
      this.setState({ piano: "hooks" });
    }
  };

  options = [
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

  defaultOption = this.options[0];

  onSelect = (event) => {
    this.setState({ sound: event.value });
  };

  render() {
    return (
      <div className="modeify-main">
        <div className="piano">
          {this.state.piano === "hooks" ? (
            <Piano className="piano" sound={this.state.sound} />
          ) : (
            <Keyboard
              keyboardMap={{
                Q: "C3",
                2: "C#3",
                W: "D3",
                3: "D#3",
                E: "E3",
                R: "F3",
                5: "F#3",
                T: "G3",
                6: "G#3",
                Y: "A3",
                7: "A#3",
                U: "B3",
                I: "C4",
                9: "C#4",
                O: "D4",
                0: "D#4",
                P: "E4",
                Z: "F4",
                S: "F#4",
                X: "G4",
                D: "G#4",
                C: "A4",
                F: "A#4",
                V: "B4",
                B: "C5",
                H: "C#5",
                N: "D5",
                J: "D#5",
                M: "E5",
                ",": "F5",
                L: "F#5",
                ".": "G5",
                ";": "G#5",
                "/": "A5",
                "'": "A#5",
                "[": "B5",
                "]": "C6",
              }}
            />
          )}
        </div>
        {this.state.piano === "hooks" ? (
          <div>
            <Dropdown
              className="sound-dropdown"
              options={this.options}
              onChange={this.onSelect}
              value={this.defaultOption}
              placeholder="Select an option"
            />
          </div>
        ) : null}

        <div className="under-keys">
          <img
            className="modeify-page-logo"
            alt="modeify-logo"
            src={Modeify}
          ></img>
          <div className="mode-button-div">
            <div className="space"></div>
            <div className="space"></div>
            <div>
              <Button
                onClick={this.changePiano}
                className="mode-button"
                variant="outlined"
              >
                Change Piano Mode
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
