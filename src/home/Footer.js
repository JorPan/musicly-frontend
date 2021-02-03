import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <Link className="footer-link" to="/about">
        About
      </Link>
      <Link className="footer-link" to="/contact">
        Contact
      </Link>
      <Link className="footer-link" to="/resources">
        Resources
      </Link>
    </div>
  );
}
