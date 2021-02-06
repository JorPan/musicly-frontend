import React, { Component } from "react";
import "./Modeify.css";
import { s11, note, chord, scale } from "sharp11";
import audio from "sharp11-web-audio";

let C2 = note.create("C2");
let Db2 = note.create("Db2");
let D2 = note.create("D2");
let Eb2 = note.create("Eb2");
let E2 = note.create("E2");
let F2 = note.create("F2");
let Gb2 = note.create("Gb2");
let A2 = note.create("A2");
let Bb2 = note.create("Bb2");
let B2 = note.create("B2");
let C3 = note.create("C3");
let Db3 = note.create("Db3");
let D3 = note.create("D3");
let Eb3 = note.create("Eb3");
let E3 = note.create("E3");
let F3 = note.create("F3");
let Gb3 = note.create("Gb3");
let A3 = note.create("A3");
let Bb3 = note.create("Bb3");
let B3 = note.create("B3");
let C4 = note.create("C4");
let Db4 = note.create("Db4");
let D4 = note.create("D4");
let Eb4 = note.create("Eb4");
let E4 = note.create("E4");
let F4 = note.create("F4");
let Gb4 = note.create("Gb4");
let A4 = note.create("A4");
let Bb4 = note.create("Bb4");
let B4 = note.create("B4");
let C5 = note.create("C5");
let Db5 = note.create("Db5");
let D5 = note.create("D5");
let Eb5 = note.create("Eb5");
let E5 = note.create("E5");
let F5 = note.create("F5");
let Gb5 = note.create("Gb5");
let A5 = note.create("A5");
let Bb5 = note.create("Bb5");
let B5 = note.create("B5");
let C6 = note.create("C6");
let Db6 = note.create("Db6");
let D6 = note.create("D6");
let Eb6 = note.create("Eb6");
let E6 = note.create("E6");
let F6 = note.create("F6");
let Gb6 = note.create("Gb6");
let A6 = note.create("A6");
let Bb6 = note.create("Bb6");
let B6 = note.create("B6");
let Cm9 = chord.create("Cm9", 3);

export default class Piano extends Component {
  playNote = (event) =>
    audio.init(function (err, fns) {
      let note = event.target.id;
      fns.play(note, 0, 3);
    });

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    let keyPressed = event.key.toUpperCase();
    let mappedKeys = Object.keys(this.props.keyboardMap);
    let mappedValues = Object.values(this.props.keyboardMap);
    let index = mappedKeys.indexOf(keyPressed);
    if (index !== -1) {
      let note = mappedValues[index];
      audio.init(function (err, fns) {
        fns.play(note, 0, 3);
      });
    } else {
      return;
    }
  };

  handleKeyUp = (event) => {
    // console.log("keyup", event.target);
  };

  render() {
    return (
      <div
        // onKeyDown={this.props.playKeys}
        onClick={this.playNote}
        className="piano"
      >
        <div className="black-key-row">
          <div id="Db3" className="black-key">
            2
          </div>
          <div id="Eb3" className="black-key">
            3
          </div>
          <div className="black-key-blank"></div>
          <div id="Gb3" className="black-key">
            5
          </div>
          <div id="Ab3" className="black-key">
            6
          </div>
          <div id="Bb3" className="black-key">
            7
          </div>
          <div className="black-key-blank"></div>
          <div id="Db4" className="black-key">
            9
          </div>
          <div id="Eb4" className="black-key">
            0
          </div>
          <div className="black-key-blank"></div>
          <div id="Gb4" className="black-key">
            S
          </div>
          <div id="Ab4" className="black-key">
            D
          </div>
          <div id="Bb4" className="black-key">
            F
          </div>
          <div className="black-key-blank"></div>
          <div id="Db5" className="black-key">
            H
          </div>
          <div id="Eb5" className="black-key">
            J
          </div>
          <div className="black-key-blank"></div>
          <div id="Gb5" className="black-key">
            L
          </div>
          <div id="Ab5" className="black-key">
            ;
          </div>
          <div id="Bb5" className="black-key">
            '
          </div>
        </div>
        <div className="white-key-row">
          <div id="C3" className="white-key">
            Q
          </div>
          <div id="D3" className="white-key">
            W
          </div>
          <div id="E3" className="white-key">
            E
          </div>
          <div id="F3" className="white-key">
            R
          </div>
          <div id="G3" className="white-key">
            T
          </div>
          <div id="A3" className="white-key">
            Y
          </div>
          <div id="B3" className="white-key">
            U
          </div>
          <div id="C4" className="white-key">
            I
          </div>
          <div id="D4" className="white-key">
            O
          </div>
          <div id="E4" className="white-key">
            P
          </div>
          <div id="F4" className="white-key">
            Z
          </div>
          <div id="G4" className="white-key">
            X
          </div>
          <div id="A4" className="white-key">
            C
          </div>
          <div id="B4" className="white-key">
            V
          </div>
          <div id="C5" className="white-key">
            B
          </div>
          <div id="D5" className="white-key">
            N
          </div>
          <div id="E5" className="white-key">
            M
          </div>
          <div id="F5" className="white-key">
            ,
          </div>
          <div id="G5" className="white-key">
            .
          </div>
          <div id="A5" className="white-key">
            /
          </div>
          <div id="B5" className="white-key">
            [
          </div>
          <div id="C6" className="white-key">
            ]
          </div>
        </div>
        {/* <button onClick={this.playNote}>hello</button> */}
      </div>
    );
  }
}
