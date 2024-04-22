import React from "react";
import "./LoggedInPage.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Dashboard from "../dashboard/Dashboard";

function LoggedInPage() {
  return (
    <div className="logged-in-page">
      <div className="sidebar-holder">
        <Sidebar />
      </div>
      <div className="navbar-home-holder">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
}

export default LoggedInPage;
