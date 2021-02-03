import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <Link className="footer-link">About</Link>
      <Link className="footer-link">Contact</Link>
      <Link className="footer-link">Resources</Link>
    </div>
  );
}
