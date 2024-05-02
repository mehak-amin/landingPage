import React, { useRef, useState, useEffect } from "react";
import "./LoggedInPage.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Dashboard from "../dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Teamates from "../Teammates/Teammates";
import ManageApps from "../MannageApps/ManageApps";


function LoggedInPage() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sideBarRef = useRef(null);
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
  }, [isSideBarOpen]);
  return (
    <div className="logged-in-page">
      <div className="sidebar-holder" ref={sideBarRef}>
        <Sidebar isSideBarOpen={isSideBarOpen} />
      </div>
      <div className="navbar-home-holder">

        <Navbar toggleSidebar={toggleSidebar} />
        {/* <Dashboard/> */}
        {/* <Teamates/> */}
        <ManageApps/>
        
        
      </div>
    </div>
  );
}

export default LoggedInPage;
