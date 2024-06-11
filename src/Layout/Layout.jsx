import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
export default function Layout({ role, user }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const sideBarRef = useRef(null);
  // const roll = "admin";

  const toggleMessageBox = () => {
    console.log("msg box");
    setShowMessageBox(!showMessageBox);
  };
  const toggleSidebar = () => {
    setIsSideBarOpen((prevState) => !prevState);
    console.log("clicked");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        // Clicked outside sidebar, close it
        setIsSideBarOpen(false);
      }
    };
    if (isSideBarOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSideBarOpen, sideBarRef]);
  return (
    <div className="logged-in-page">
      {isSideBarOpen || (
        <div className="sidebar-holder" ref={sideBarRef}>
          <Sidebar isSideBarOpen={isSideBarOpen} role={role} />
        </div>
      )}
      <div className="navbar-home-holder">
        <div className="mb-6">
          <Navbar
            toggleSidebar={toggleSidebar}
            toggleMessageBox={toggleMessageBox}
            showMessageBox={showMessageBox}
            user={user}
          />
        </div>

        <Outlet />

        {/* <Footer /> */}
      </div>
    </div>
  );
}
