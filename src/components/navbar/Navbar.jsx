import React from "react";
// import {useState} from "react";
import "./Navbar.css";
import MessageBox from "../messages/MessageBox";

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
function Navbar({ toggleSidebar, toggleMessageBox, showMessageBox }) {
  return (
    <div className="navbar px-md-5 px-4">
      <div className="menu-search">
        <div className="menuIcon" id="navButton" onClick={toggleMyNav}>
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
        <div className="msgIcon" onClick={toggleMessageBox}>
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
      <MessageBox
        showMessageBox={showMessageBox}
        toggleMessageBox={toggleMessageBox}
      />
    </div>
  );
}

export default Navbar;
