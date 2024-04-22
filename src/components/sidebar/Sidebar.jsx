import React from "react";
import "./Sidebar.css";
import logoImg from "../../assets/Vector.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faCog,
  faPeopleGroup,
  faBriefcase,
  faComputer,
  faCalendar,
  faArrowRightFromFile,
  faWifi3,
  faUsers,
  faCamera,
  faSquarePollVertical,
  faFileExport,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons/faFileExcel";

function Sidebar({ isSideBarOpen }) {
  const sections = [
    {
      heading: "Main menu",
      items: [
        { icon: faHome, text: "Dashboard" },
        { icon: faUser, text: "My Screen" },
      ],
      isMiddle: false,
    },
    {
      heading: "Data Administration",
      items: [
        { icon: faUsers, text: "Teammates" },
        { icon: faBriefcase, text: "Work Planners" },
        { icon: faComputer, text: "Ventures" },
        { icon: faCalendar, text: "Absence Calender" },
        { icon: faWifi3, text: "Offline Periods" },
        { icon: faCamera, text: "Screen Captures" },
        { icon: faPeopleGroup, text: "Fellow Workers" },
        { icon: faSquarePollVertical, text: "Reports" },
        { icon: faFileExport, text: "Data Export" },
      ],
      isMiddle: true,
    },
    {
      heading: "Customization",
      items: [
        { icon: faCog, text: "Settings" },
        { icon: faLink, text: "Affiliates" },
      ],
      isMiddle: false,
    },
  ];

  return (
    <div className={`sidebar ${isSideBarOpen ? "open" : ""}`}>
      <div className="brand">
        <div className="brand-logo-holder ">
          <p className="logo-name m-0 p-0">App Tracker</p>
          <span>
            <img src={logoImg} alt="" />
          </span>
        </div>
      </div>
      <div className="section-holder">
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={`section ${section.isMiddle ? "middle-section" : ""}`}
          >
            <p>{section.heading}</p>
            <ul className="menu">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <div className="icon-holder">
                    <FontAwesomeIcon icon={item.icon} className="custom-icon" />
                  </div>

                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
