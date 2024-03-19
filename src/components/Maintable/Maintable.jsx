import React from "react";
import "./Maintable.css";

function Maintable() {
  return (
    <div className="table">
      <div className="description">Tâches</div>
      <div className="right-m">
        <input
          type="search"
          className="background-color"
          placeholder="Type here..."
        ></input>
        <span className="plus-icon">+</span>
        <span className="dots">
          <img src="" alt="" />
        </span>
        <div className="bar">
          <span>#</span>
          <span>Code React</span>
          <span>Bhyet rass si Moussa</span>
          <span>14 Avril inchallah</span>
        </div>
      </div>
    </div>
  );
}

export default Maintable;
