import "./Navbar.css";
import MessageBox from "../messages/MessageBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import BASE_URI from "../../../config";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { GoBell } from "react-icons/go";
import { FiSearch } from "react-icons/fi";

function Navbar({
  toggleSidebar,
  toggleMessageBox,
  showMessageBox,
  toggleProfilePopup,
  isProfilePopupOpen,
  profilePopupRef,
}) {
  const [profilePopup, setProfilePopup] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = (e) => {
    e.preventDefault();

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
        if (response) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          localStorage.removeItem("rememberMe");

          setTimeout(() => {
            navigate("/");
            toast.success("Logout Successful", {
              position: "top-right",
            });
          }, 2000);
        }
      })
      .catch((err) => {
        toast.error("Logout Failed", {
          position: "top-right",
        });
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
          <li className="py-2 px-3 " onClick={logout}>
            Logout
          </li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  const handleProfilePopup = () => {
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
          <FiSearch className="fs-5" />
        </div>
      </div>
      <div className="msgIcon-bellIcon">
        <div className="bellIcon p-2 pt-1 rounded-2 border bg-gray">
          <GoBell className="fs-5 text-white" />
        </div>
        <div
          className="msgIcon p-2 pt-1 rounded-2 border bg-gray"
          onClick={toggleMessageBox}
        >
          <AiOutlineMessage className="fs-5 text-white" />
        </div>
      </div>
      <div className="profile">
        <div className="userName">
          <h6 className="m-0 text-capitalize">
            Hi, {user?.fullname?.split(" ")[0]}
          </h6>

          <p className="m-0 fw-light">{user?.company_name?.split(" ")[0]}</p>
        </div>

        <div ref={profilePopupRef} onClick={toggleProfilePopup}>
          <OverlayTrigger
            trigger={["click", "focus"]}
            placement="bottom"
            overlay={renderPopover()}
            show={isProfilePopupOpen}
          >
            <div className="profilePicture" onClick={handleProfilePopup}>
              {user?.picture === "" || user?.picture === null ? (
                <FaUserCircle className="fs-1 text-secondary" />
              ) : (
                <img
                  src={user?.picture}
                  alt="img"
                  className="rounded-circle border"
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
      </div>
      <MessageBox
        showMessageBox={showMessageBox}
        toggleMessageBox={toggleMessageBox}
      />
    </div>
  );
}

export default Navbar;
