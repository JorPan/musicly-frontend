import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Header() {
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
