import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import MainLogo from "./logo512.png";
import Lyricize from "./lyricize.png";
import Modeify from "./modeify.png";
import Riffly from "./riffly.png";
import Setly from "./setly.png";

export default function Header() {
  return (
    <div className="about">
      <div>
        <Link to="/modeify">
          <img
            className="modeify-logo logo-card"
            alt="modeify-logo"
            src={Modeify}
          ></img>
        </Link>
        <Link to="/lyricize">
          <img
            className="lyricize-logo logo-card"
            alt="lyricize-logo"
            src={Lyricize}
          ></img>
        </Link>
      </div>
      <div>
        <Link to="/">
          <img
            className="home-logo logo-card"
            alt="main-logo"
            src={MainLogo}
          ></img>
        </Link>
      </div>
      <div>
        <Link to="/riffly">
          <img
            className="riffly-logo logo-card"
            alt="riffly-logo"
            src={Riffly}
          ></img>
        </Link>
        <Link to="/setly">
          <img
            className="setly-logo logo-card"
            alt="setly-logo"
            src={Setly}
          ></img>
        </Link>
      </div>
    </div>
  );
}
