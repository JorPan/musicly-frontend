import React, { Component } from "react";
import Modeify from "../home/modeify.png";
import Piano from "./PIANO/Piano";
import "./PIANO/Keyboard.css";
import { Button } from "@material-ui/core";

export default class MainMode extends Component {
  state = {
    mode: "",
    notesPlaying: [],
    chordBuilder: [],
    playing: false,
  };

  render() {
    return (
      <div className="modeify-main">
        <div className="piano">
          <Piano className="piano" />
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
