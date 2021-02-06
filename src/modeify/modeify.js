import React, { Component } from "react";
import Modeify from "../home/modeify.png";
import Piano from "./PIANO/Piano";
import Keyboard from "./Keyboard";
import "./PIANO/Keyboard.css";
import { Button } from "@material-ui/core";

export default class MainMode extends Component {
  state = {
    mode: "",
    notesPlaying: [],
    chordBuilder: [],
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(e) {
    console.log(e.key);
  }

  render() {
    return (
      <div className="modeify-main">
        <div className="piano">
          <Piano className="piano" />
          <Keyboard />
        </div>
        <div className="under-keys">
          <div>
            {/* <Button className="mode-button" variant="outlined">
              {" "}
              Change Mode{" "}
            </Button> */}
          </div>
        </div>

        <img
          className="modeify-page-logo"
          alt="modeify-logo"
          src={Modeify}
        ></img>
      </div>
    );
  }
}
