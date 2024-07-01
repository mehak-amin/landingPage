import React, { useState } from "react";
import "./Sidebar.css";
import logoImg from "../../assets/Vector.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  faUser,
  faHome,
  faCog,
  faPeopleGroup,
  faBriefcase,
  faComputer,
  faCalendar,
  // faArrowRightFromFile,
  faWifi3,
  faUsers,
  faCamera,
  faSquarePollVertical,
  faFileExport,
  faLink,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { DropdownItem } from "reactstrap";
// import { faFileExcel } from "@fortawesome/free-solid-svg-icons/faFileExcel";

function Sidebar({ isSideBarOpen, role }) {
  // const [openDropdowns, setOpenDropdowns] = useState({});

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
    setDropdownOpen(false); // Close the dropdown when settings are toggled
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  console.log(role);

  const adminOptions = [
    {
      heading: "Main menu",
      items: [{ icon: faHome, text: "Dashboard", link: "admin/dashboard" }],
      isMiddle: false,
    },
    {
      heading: "Data Administration",
      items: [
        { icon: faUsers, text: "Teammates", link: "admin/teammates" },
        { icon: faBriefcase, text: "Work Planners", link: "admin/workplanner" },
        // { icon: faComputer, text: "Ventures", link: "users/ventures" },
        {
          icon: faCalendar,
          text: "Absence Calender",
          link: "/absencecalender",
        },
        {
          icon: faCamera,
          text: "Screen Captures",
          link: "admin/screenCaptures",
        },
        { icon: faPeopleGroup, text: "Fellow Workers", link: "/fellowworkers" },
        { icon: faSquarePollVertical, text: "Reports", link: "/reports" },
        { icon: faFileExport, text: "Data Export", link: "/dataexport" },
        { icon: faWifi3, text: "Offline Times", link: "/offlinetimes" },
      ],
      isMiddle: true,
    },
    {
      heading: "Customization",
      items: [
        {
          icon: faCog,
          text: "Settings",
          isDropdown: true,
          dropdownItems: [
            {
              icon: faPeopleGroup,
              text: "Departments",
              link: "admin/settings/departments",
            },
            {
              icon: faPeopleGroup,
              text: "Manage Apps",
              link: "admin/settings/manageApps",
            },
            // {
            //   text: "Manage Categories",
            //   link: "admin/settings/managecategories",
            // },

            {
              icon: faPeopleGroup,
              text: "Manage Rolls",
              link: "admin/settings/manageroles",
            },
          ],
        },
        { icon: faLink, text: "Affiliates", link: "/affiliates" },
      ],
      isMiddle: false,
    },
  ];

  const managerOptions = [
    {
      heading: "Main menu",
      items: [
        { icon: faHome, text: "Dashboard", link: "/dashboard" },
        { icon: faUser, text: "My Screen", link: "/myscreen" },
      ],
      isMiddle: false,
    },
    {
      heading: "Data Administration",
      items: [
        { icon: faUsers, text: "Teammates", link: "/teammates" },
        { icon: faBriefcase, text: "Work Planners", link: "/workplanner" },
        { icon: faComputer, text: "Ventures", link: "/ventures" },
        {
          icon: faCalendar,
          text: "Absence Calender",
          link: "/absencecalender",
        },
        { icon: faCamera, text: "Screen Captures", link: "/screencaptures" },
        { icon: faPeopleGroup, text: "Fellow Workers", link: "/fellowworkers" },
        { icon: faSquarePollVertical, text: "Reports", link: "/reports" },
        { icon: faFileExport, text: "Data Export", link: "/dataexport" },
        { icon: faWifi3, text: "Offline Times", link: "/offlinetimes" },
      ],
      isMiddle: true,
    },
    {
      heading: "Customization",
      items: [
        {
          icon: faCog,
          text: "Settings",
          isDropdown: true,
          dropdownItems: [
            {
              icon: faPeopleGroup,
              text: "Departments",
              link: "admin/settings/departments",
            },
            {
              icon: faPeopleGroup,
              text: "Manage Apps",
              link: "admin/settings/manageapps",
            },
            // {
            //   text: "Manage Categories",
            //   link: "admin/settings/managecategories",
            // },

            {
              icon: faPeopleGroup,
              text: "Manage Rolls",
              link: "admin/settings/manageroles",
            },
          ],
        },
        { icon: faLink, text: "Affiliates", link: "/affiliates" },
      ],
      isMiddle: false,
    },
  ];

  const userOptions = [
    {
      heading: "Main menu",
      items: [{ icon: faUser, text: "My Screen", link: "/dashboard" }],
      isMiddle: false,
    },
    {
      heading: "Data Administration",
      items: [
        { icon: faUsers, text: "Teammates", link: "/teammates" },
        { icon: faBriefcase, text: "Work Planners", link: "/workplanners" },
        { icon: faComputer, text: "Ventures", link: "/ventures" },
        {
          icon: faCalendar,
          text: "Absence Calender",
          link: "/absencecalender",
        },
        { icon: faPeopleGroup, text: "Fellow Workers", link: "/fellowworkers" },
        { icon: faSquarePollVertical, text: "Reports", link: "/reports" },
        { icon: faFileExport, text: "Data Export", link: "/dataexport" },
      ],
      isMiddle: true,
    },
    {
      heading: "Customization",
      items: [
        {
          icon: faCog,
          text: "Settings",
          isDropdown: true,
          dropdownItems: [
            {
              icon: faPeopleGroup,
              text: "Departments",
              link: "admin/settings/departments",
            },
            {
              icon: faPeopleGroup,
              text: "Manage Apps",
              link: "admin/settings/manageapps",
            },
            // {
            //   text: "Manage Categories",
            //   link: "admin/settings/managecategories",
            // },

            {
              icon: faPeopleGroup,
              text: "Manage Rolls",
              link: "admin/settings/manageroles",
            },
          ],
        },
        { icon: faLink, text: "Affiliates", link: "/affiliates" },
      ],
      isMiddle: false,
    },
  ];
  let sidebarOptions;
  if (role === "admin") {
    sidebarOptions = adminOptions;
  } else if (role === "manager") {
    sidebarOptions = managerOptions;
  } else {
    sidebarOptions = userOptions;
  }

  return (
    <div className="sidebar">
      <div className="brand">
        <div className="brand-logo-holder ">
          <p className="logo-name m-0 p-0">App Tracker</p>
          <span>
            <img src={logoImg} alt="" />
          </span>
        </div>
      </div>
      <div className="section-holder">
        {sidebarOptions.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={`section ${section.isMiddle ? "middle-section" : ""}`}
          >
            <p>{section.heading}</p>
            <div className="menu">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className=" ">
                  {item.text === "Settings" ? (
                    <div
                      className={`nav-link menu-items ${
                        location.pathname === item.link ? "active" : ""
                      }`}
                      onClick={() => {
                        toggleSettings();
                        toggleDropdown();
                      }}
                    >
                      <span className="icon-holder">
                        <FontAwesomeIcon
                          icon={item.icon}
                          style={{
                            display: "inline-flex",
                            justifyContent: "flex-start",
                            width: "55px",
                          }}
                        />
                      </span>
                      <span>{item.text} </span>

                      <span className="ml-2">
                        <FontAwesomeIcon icon={faAngleDown} />
                      </span>
                    </div>
                  ) : (
                    <Link
                      to={item.link}
                      className={`nav-link menu-items d-flex align-items-center justify-content-start ${
                        location.pathname === item.link ? "active" : ""
                      }`}
                    >
                      <span className="icon-holder">
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="custom-icon  "
                        />
                      </span>

                      <span className=" ">{item.text}</span>
                    </Link>
                  )}

                  {item.dropdownItems &&
                    item.text === "Settings" &&
                    settingsOpen && (
                      <div className="pl-7">
                        {item.dropdownItems.map((dropdownItem, subIdx) => (
                          <div key={subIdx}>
                            <Link
                              to={dropdownItem.link}
                              className={`nav-link menu-items ${
                                location.pathname === dropdownItem.link
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <span className="icon-holder">
                                <FontAwesomeIcon
                                  icon={dropdownItem.icon}
                                  className="custom-icon"
                                />
                              </span>

                              {dropdownItem.text}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
