import React, { Component } from "react";
import Modeify from "../home/modeify.png";
import Piano from "./PIANO/Piano";
import Keyboard from "./Keyboard";
import "./PIANO/Keyboard.css";
import "./Modeify.css";
import { Button } from "@material-ui/core";

export default class MainMode extends Component {
  state = {
    piano: "hooks",
    mode: "play",
    notesPlaying: [],
    chordBuilder: [],
  };

  // componentDidMount() {
  //   document.addEventListener("keydown", this.handleKeyDown);
  // }

  // handleKeyDown(e) {
  //   console.log(e.key);
  // }

  changePiano = () => {
    console.log(this.state);
    if (this.state.piano === "hooks") {
      this.setState({ piano: "react" });
    } else {
      this.setState({ piano: "hooks" });
    }
  };

  render() {
    return (
      <div className="modeify-main">
        <div className="piano">
          {this.state.piano === "hooks" ? (
            <Piano className="piano" />
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
                Change Piano Mode wtf
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
