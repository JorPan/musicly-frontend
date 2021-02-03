import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Logo from "./logo192.png";

export default function Header() {
  return (
    <div className="header">
      <Link className="logo" to="/">
        <img className="logo" src={Logo} alt="logo" />
      </Link>
      <div className="links">
        <div className="nav"></div>
        <div className="auth">
          <Link className="header-link" to="/login">
            login
          </Link>
          <Link className="header-link" to="/signup">
            sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
