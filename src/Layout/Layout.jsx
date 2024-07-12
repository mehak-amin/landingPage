import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
export default function Layout({ role, user }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const sideBarRef = useRef(null);
  const profilePopupRef = useRef(null);

  const toggleMessageBox = () => {
    setShowMessageBox(!showMessageBox);
  };
  const toggleSidebar = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };
  const toggleProfilePopup = () => {
    setIsProfilePopupOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setIsSideBarOpen(false);
      }
      if (
        profilePopupRef.current &&
        !profilePopupRef.current.contains(event.target)
      ) {
        setIsProfilePopupOpen(false);
      }
    };

    if (isSideBarOpen || isProfilePopupOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSideBarOpen, isProfilePopupOpen, sideBarRef, profilePopupRef]);

  return (
    <div className="logged-in-page">
      {isSideBarOpen || (
        <div className="sidebar-holder" ref={sideBarRef}>
          <Sidebar isSideBarOpen={isSideBarOpen} />
        </div>
      )}
      <div className="navbar-home-holder">
        <div className="mb-6">
          <Navbar
            toggleSidebar={toggleSidebar}
            toggleMessageBox={toggleMessageBox}
            showMessageBox={showMessageBox}
            isProfilePopupOpen={isProfilePopupOpen}
            profilePopupRef={profilePopupRef}
            toggleProfilePopup={toggleProfilePopup}
          />
        </div>

        <Outlet />

        {/* <Footer /> */}
      </div>
    </div>
  );
}
