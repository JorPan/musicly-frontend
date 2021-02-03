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
      <Link to="/">
        <img className="home-logo" src={MainLogo}></img>
      </Link>
      <Link>
        <img className="lyricize-logo" src={Lyricize}></img>
      </Link>
      <Link>
        <img className="modeify-logo" src={Modeify}></img>
      </Link>
      <Link>
        <img className="riffly-logo" src={Riffly}></img>
      </Link>
      <Link>
        <img className="setly-logo" src={Setly}></img>
      </Link>
    </div>
  );
}
