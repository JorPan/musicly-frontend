import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Button, withStyles } from "@material-ui/core";

export default function Header() {
  const StyledButton1 = withStyles({
    root: {
      background: "linear-gradient(45deg, #931105 20%, #FFFFFF 95%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 40,
      margin: 10,
      boxShadow: "0 10px 10px 2px rgba(255, 105, 135, .3)",
    },
    label: {
      textTransform: "capitalize",
    },
  })(Button);

  const StyledButton2 = withStyles({
    root: {
      background: "linear-gradient(-45deg, #931105 30%, #FFFFFF 95%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 40,
      boxShadow: "0 10px 10px 2px rgba(255, 105, 135, .3)",
    },
    label: {
      textTransform: "capitalize",
    },
  })(Button);

  return (
    <div className="header">
      <Link className="logo" to="/">
        <ul className="logo-list header-logo">
          <li className="logo-letter">M</li>
          <li className="logo-letter">u</li>
          <li className="logo-letter">s</li>
          <li className="logo-letter">i</li>
          <li className="logo-letter">c</li>
          <li className="logo-letter">.</li>
          <li className="logo-letter">L</li>
          <li className="logo-letter">y</li>
        </ul>
      </Link>
      <div className="links">
        <div className="nav"></div>
        <div className="auth">
          <StyledButton1 variant="outlined">
            <Link className="header-link" to="/login">
              login
            </Link>
          </StyledButton1>
          <StyledButton2>
            <Link className="header-link" to="/signup">
              sign up
            </Link>
          </StyledButton2>
        </div>
      </div>
    </div>
  );
}
