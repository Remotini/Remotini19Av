import React, { useState, useEffect } from "react";
import "./Header.css";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [mode, setMode] = useState("inactive");
  const handleClick = () => {
    setMode(mode === "active" ? "inactive" : "active");
    console.log(mode);
  };
  return (
    <div className=" flexCenter h-wrapper">
      <span className="logo">
        <img src="" alt="" />
        <span className=" Logo">emotini</span>
      </span>
      <div className=" icon-container">
        <IoIosNotificationsOutline
          // on the onclick make a function that will open the notification page
          onClick={() => {
            handleClick();
          }}
        />
        <IoSettingsOutline />
        <div className="notification-box">
          {isVisible && (
            <div className={`notification ${mode}`}>
              <p>put the notification here aazeazehatrrtrtzuieauieg</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
