import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Navbar } from "react-bootstrap";
import {
  faBars,
  faBell,
  faMessage,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// navbar-expand navbar-light bg-light
function Navbar() {
  return (
    <div className="navbar ">
      <div className="menu-search">
        <div className="menuIcon">
          <FontAwesomeIcon icon={faBars} size="sm" className="navbar-icons" />
        </div>
        <div className="searchInput">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search user,docs,data..."
          />
        </div>
        <div className="searchIcon">
          <FontAwesomeIcon icon={faSearch} size="sm" className="navbar-icons" />
        </div>
      </div>
      <div className="msgIcon-bellIcon">
        <div className="bellIcon">
          <FontAwesomeIcon icon={faBell} size="sm" className="navbar-icons" />
        </div>
        <div className="msgIcon">
          <FontAwesomeIcon
            icon={faMessage}
            size="sm"
            className="navbar-icons"
          />
        </div>
      </div>
      <div className="profile">
        <div className="userName">
          <h6 className="m-0">Hi, Basit</h6>
          <p className="m-0">Raybit Tech</p>
        </div>
        <div className="profilePicture">
          <FontAwesomeIcon icon={faUser} size="sm" className="navbar-icons" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
