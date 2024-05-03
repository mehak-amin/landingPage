import { useRef, useState, useEffect } from "react";
import "./LoggedInPage.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
// import Dashboard from "../dashboard/Dashboard";
import ManageApps from "../MannageApps/ManageApps";
import MessageBox from "../../components/messages/MessageBox";
import Teamates from "../Teammates/Teammates";
import Departments from "../Departments/Departments";

function LoggedInPage() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const sideBarRef = useRef(null);

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
    // <div className="logged-in-page">
    //   {isSideBarOpen || (
    //     <div className="sidebar-holder" ref={sideBarRef}>
    //       <Sidebar isSideBarOpen={isSideBarOpen} />
    //     </div>
    //   )}
    //   <div className="navbar-home-holder">
    //     <div>
    //       <Navbar
    //         toggleSidebar={toggleSidebar}
    //         toggleMessageBox={toggleMessageBox}
    //         showMessageBox={showMessageBox}
    //       />
    //       {/* <Teamates/> */}
          
    //     </div>
        
    //   </div>
      
    // </div>
    <Departments/>
    // <ManageApps/>
  );
}

export default LoggedInPage;
