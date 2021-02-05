import React, { Component } from "react";
import Modeify from "../home/modeify.png";

export default class MainMode extends Component {
  render() {
    return (
      <div>
        <img
          className="modeify-page-logo"
          alt="modeify-logo"
          src={Modeify}
        ></img>
      </div>
    );
  }
}
