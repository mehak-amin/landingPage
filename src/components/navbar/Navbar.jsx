import "./Navbar.css";
import MessageBox from "../messages/MessageBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faMessage,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import BASE_URI from "../../../config";
import { useNavigate, Link } from "react-router-dom";

function Navbar({ toggleSidebar, toggleMessageBox, showMessageBox, user }) {
  const [profilePopup, setProfilePopup] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = (e) => {
    e.preventDefault();
    console.log("logout");
    console.log(token);
    axios
      .post(
        `${BASE_URI}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          // setToken("");
          // setUser("");
          // setRole("");

          alert("Logged out successfully");

          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };
  const renderPopover = () => (
    <Popover id="popover-basic">
      <Popover.Body className="p-0">
        <ul className="list-unstyled cursor-pointer fs-5 mb-0">
          <li className="py-2 px-3 border-bottom">
            <Link
              to="admin/profile"
              className="text-decoration-none text-black"
            >
              Profile
            </Link>
          </li>
          <li className="py-2 px-3 border-bottom">Report a Bug</li>
          <li className="py-1 px-3 " onClick={logout}>
            Logout
          </li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  const handleProfilePopup = () => {
    console.log("profile");
    setProfilePopup(!profilePopup);
  };

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
          <h6 className="m-0 text-capitalize">
            Hi, {user?.fullname?.split(" ")[0]}
          </h6>

          <p className="m-0 fw-light">Raybit Tech</p>
        </div>
        <OverlayTrigger
          trigger={["click", "focus"]}
          placement="bottom"
          overlay={renderPopover()}
        >
          <div className="profilePicture" onClick={handleProfilePopup}>
            {user?.picture === "" ? (
              <FontAwesomeIcon
                icon={faUser}
                size="sm"
                className="navbar-icons"
              />
            ) : (
              <img
                src={user?.picture}
                alt="img"
                className="rounded-circle"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </OverlayTrigger>
      </div>
      <MessageBox
        showMessageBox={showMessageBox}
        toggleMessageBox={toggleMessageBox}
      />
    </div>
  );
}

export default Navbar;
