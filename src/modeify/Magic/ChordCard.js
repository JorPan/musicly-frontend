import React from "react";
import ChordPlayers from "./ChordPlayers";

export default function ChordCard(props) {
  console.log(props.handleClick);

  return (
    <div className="chord-card" draggable="true">
      <h1 className="card-title">{props.chord}</h1>
      <p className="card-notes">{props.notes}</p>
      <div className="card-bottom">
        <ChordPlayers mode={props.mode} chord={props.chord} />
        <button onClick={props.handleClick} className="add-chord-button">
          {props.plusOrMinus}
        </button>
      </div>
    </div>
  );
}
