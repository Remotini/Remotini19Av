import React, { useContext, useState, useEffect } from "react";
import "./NavBar.css";
import { IoHomeOutline } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../../hooks/useLogOut";

import { useAuthContext } from "../../hooks/useAuthContext";
function NavBar() {
  const location = useLocation();
  const [activePage, setActivePage] = useState("");
  const [isActiveHamburger, setisActiveHamburger] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  //generate handle function
  const handleHamburger = () => {
    setisActiveHamburger(!isActiveHamburger);
    console.log(isActiveHamburger);
  };
  const handleClick = () => {
    logout();
  };
  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);
  
  
  
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

      <div className={`nav-wrapper ${isActiveHamburger ? "active" : ""}`}>
        <div className="userdata">
          <div className="img-wrapp">
            {/* el taswira bech tji source mel bara  */}

            <img src="me&dog.jpg" alt="" />
          </div>
          <div className="name-wrapp">
            <span className="name primaryText">
              {/* name et Family name java elements */}
              {/* <span>iyed </span> <span>grassi </span> */}
              <span>
                {storedUser.firstName} {storedUser.lastName}{" "}
              </span>
            </span>
            <span className="secondaryText desc">{user.email} </span>
          </div>
        </div>

        <div className=" menu-wrapper">
          <div className="flexStart  nav-option">
            <span className="material-symbols-outlined">home</span>
            <button className={activePage === "/" ? "activeBtn" : ""}>
              <Link to="/">
                <div className="link_inside">
                  Acceuil
                  <div className="arrow">
                    <span className="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                  </div>
                </div>
              </Link>
            </button>
          </div>
          {user.role != "Admin" && <div className="flexStart  nav-option">
            <span className="material-symbols-outlined">show_chart</span>
            <button className={activePage === "/Stat" ? "activeBtn" : ""}>
              <Link to="/Stat">
                <div className="link_inside">
                  Statistique
                  <div className="arrow">
                    <span className="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                  </div>
                </div>
              </Link>
            </button>
          </div>}

          <div className="flexStart  nav-option">
            <span className="material-symbols-outlined">person</span>
            <button
              className={`btnFlex ${
                activePage === "/Profile" ? "activeBtn" : ""
              }`}
            >
              <Link to="/Profile">
                <div className="link_inside">
                  Profile
                  <div className="arrow">
                    <span className="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                  </div>
                </div>
              </Link>
            </button>
          </div>
        </div>

        <hr className="hr2" />
        <div className=" flexStart nav-option2 ">
          <GoSignOut />
          <button onClick={handleClick}>
            <Link to="/Login">Deconnecter</Link>
          </button>
        </div>
        <hr className="hr1" />
      </div>
    </>
  );
}

export default NavBar;
