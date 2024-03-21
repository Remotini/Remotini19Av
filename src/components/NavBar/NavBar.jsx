import React, { useState } from "react";
import "./NavBar.css";
import { IoHomeOutline } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { Link } from "react-router-dom";
function NavBar() {
  const [isActiveHamburger, setisActiveHamburger] = useState(false);
  //generate handle function
  const handleHamburger = () => {
    setisActiveHamburger(!isActiveHamburger);
    console.log(isActiveHamburger);
  };
  return (
    <>
      <div
        className={`hamburger ${isActiveHamburger ? "active" : ""}`}
        onClick={handleHamburger}
      >
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>

      <div
        className={`nav-wrapper ${
          isActiveHamburger ? "active" : "nav-wrapper-inactive"
        }`}
      >
        <div className="userdata">
          <div className="img-wrapp">
            {/* el taswira bech tji source mel bara  */}

            <img src="me&dog.jpg" alt="" />
          </div>
          <div className="name-wrapp">
            <span className="name primaryText">
              {/* name et Family name java elements */}
              <span>iyed </span> <span>grassi </span>
            </span>
            <span className="secondaryText">description </span>
          </div>
        </div>

        <div className=" menu-wrapper">
          <div className="flexStart  nav-option">
            <IoHomeOutline />
            <button>
              <Link to="/">Acceuil</Link>
            </button>
          </div>
          <div className="flexStart  nav-option">
            <FaChartLine />
            <button>
              <Link to="/Stat">Statistique</Link>
            </button>
          </div>
          <div className="flexStart  nav-option">
            <IoPersonOutline />
            <button>
              <Link to="/Profile">Profile</Link>
            </button>
          </div>
        </div>
        <div className=" flexStart nav-option2 ">
          <GoSignOut />
          <button>
            <Link to="/Login">Deconnecter</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
