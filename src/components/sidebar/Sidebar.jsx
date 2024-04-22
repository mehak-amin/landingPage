import React from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="brand">
        <div className="brand-logo-holder">App Tracker</div>
      </div>
      <div className="main-menu">
        <h6>Main Menu</h6>
        <ul>
          {/* <li className="sidebar-listItem">Dashboard</li>
          <li className="sidebar-listItem">My Screen</li> */}
        </ul>
      </div>
      <div className="data-administration">
        <h6>Data Administration</h6>
        <ul>
          {/* <li className="sidebar-listItem">Teammates</li>
          <li className="sidebar-listItem">Work Planners</li>
          <li className="sidebar-listItem">Ventures</li>
          <li className="sidebar-listItem">Absence Calander</li>
          <li className="sidebar-listItem">Screen Captures</li>
          <li className="sidebar-listItem">Reports</li>
          <li className="sidebar-listItem">Data Export</li>
          <li className="sidebar-listItem">Settings</li> */}
        </ul>
      </div>
      <div className="customization">
        <h6>Customization</h6>
        <ul>
          {/* <li className="sidebar-listItem">Settings</li>
          <li className="sidebar-listItem">Affiliates</li> */}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
