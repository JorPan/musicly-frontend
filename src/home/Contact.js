import React from "react";
import ProfilePhoto from "./profoto.jpeg";

export default function Contact() {
  return (
    <div className="footer-page">
      <h1 className="title">Contact</h1>
      <img
        className="profile-photo"
        src={ProfilePhoto}
        alt="profile photo"
      ></img>
      <p>Jordan Panasewicz is a full stack software developer with a </p>
      <p>passion for creating solutions and innovating new tech, and a </p>
      <p>focus on music, video-editing, photography, and board sports.</p>
      <a href="https://www.linkedin.com/in/jordan-panasewicz-77a93158/">
        Linked In
      </a>
      <a href="https://github.com/jorPan">Git Hub</a>
      <a href="https://www.youtube.com/channel/UC7kqpbrNDD88o0yyEJ-lDGg">
        YouTube
      </a>
    </div>
  );
}
