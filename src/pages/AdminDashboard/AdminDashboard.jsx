import "../LoggedInPage/LoggedInPage.css";
import "./AdminDashboard.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AdminCard from "../../components/Card/AdminCard";
import { LuFilter } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { CgSandClock } from "react-icons/cg";
import { BsExclamationSquare } from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { FaUserCheck } from "react-icons/fa";
import { RxEyeNone } from "react-icons/rx";
import { useState, useEffect, useRef } from "react";
import EmployeeList from "../../components/EmployeeList";
export default function AdminDashboard() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sideBarRef = useRef(null);

  const generateData = () => {
    const data = [];
    const total = 1;
    for (let hour = 10; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeSlot = `${(hour % 12).toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;

        const productive = Math.random() * total;
        const unproductive = Math.random() * (total - productive);
        const neutral = total - (productive + unproductive);

        data.push({ timeSlot, productive, unproductive, neutral });
      }
    }

    return data;
  };

  const data = generateData();
  // console.log(data);

  const formatXAxis = (tickItem) => {
    console.log(tickItem);
    if (
      tickItem === "10:00 AM" ||
      tickItem === "01:00 PM" ||
      tickItem === "04:00 PM"
    ) {
      console.log(tickItem);
      return tickItem;
    } else {
      return "";
    }
  };

  const productivityData = [
    { month: "Jan", productivity: 80 },
    { month: "Feb", productivity: 85 },
    { month: "Mar", productivity: 90 },
    { month: "Apr", productivity: 88 },
    { month: "May", productivity: 92 },
    { month: "Jun", productivity: 89 },
    { month: "Jul", productivity: 95 },
    { month: "Aug", productivity: 93 },
    { month: "Sep", productivity: 87 },
    { month: "Oct", productivity: 84 },
    { month: "Nov", productivity: 88 },
    { month: "Dec", productivity: 91 },
  ];

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
        <div className="container mt-1 p-0">
          <div className="row px-5 py-4">
            <div className="col-md-9 mb-4 mb-md-0">
              <h4 className="mb-0 shadow d-inline px-2 py-2 rounded">
                My Screen
              </h4>
            </div>

            <div className="col-md-3 ">
              <div className="row align-items-center">
                <div className="col-8 col-sm-8 mb-sm-0 d-flex align-items-center justify-content-between">
                  <h2>
                    <CiCalendar />
                  </h2>
                  <h5 className="mb-0">April 23, 2024</h5>
                </div>

                <div className="col-auto">
                  <h3 className="text-center">
                    <LuFilter className="text-success" />
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" px-5 py-1 border-lightgreen shadow">
          <ul className="list-unstyled d-flex gap-4 mb-0">
            <li className="py-2 px-1 bg-darkGray rounded text-white">
              Team Members
            </li>
            <li className="py-2 px-1">Without Team</li>
            <li className="py-2 px-1">Accounting</li>
            <li className="py-2 px-1">Management</li>
            <li className="py-2 px-1">Product Oversight</li>
          </ul>
        </div>
        <div className="p-5 d-flex justify-content-between">
          <div>
            <AdminCard
              icon={<CgSandClock />}
              title="Productivity"
              data="77.5%"
              percent="0.5%"
            />
            <AdminCard
              icon={<BsExclamationSquare />}
              title="Late"
              data="28"
              percent="3%"
            />
          </div>
          <div className="d-flex  flex-column justify-content-between">
            <div className="d-flex gap-5 py-4 justify-content-center">
              <p>Productivity Bar</p>
              <ul className="d-flex list-unstyled gap-4">
                <li className="text-green">Productive</li>
                <li className="text-red">Unproductive</li>
                <li className="text-blue">Neutral</li>
              </ul>
            </div>
            <div className="text-center barChart">
              <BarChart
                width={data.length * 34}
                height={350}
                data={data}
                barSize={20}
                barGap={0}
                barCategoryGap={15}
                margin={{ top: 30, right: 40, bottom: 30, left: 40 }}
              >
                <XAxis
                  dataKey="timeSlot"
                  interval={0}
                  height={70}
                  tickFormatter={formatXAxis}
                />

                <Bar dataKey="productive" fill="#36c449" stackId="a" />
                <Bar dataKey="unproductive" fill="#ff662f" stackId="a" />
                <Bar dataKey="neutral" fill="#D3D3D3" stackId="a" />
              </BarChart>
            </div>
          </div>
          <div>
            <AdminCard
              icon={<FaUserCheck />}
              title="Arrived"
              data="77"
              percent="0.5%"
            />
            <AdminCard
              icon={<RxEyeNone />}
              title="Absent"
              data="5"
              percent="0.5%"
            />
          </div>
        </div>

        <div className="d-flex gap-5 px-5 mb-5">
          <div className="container border rounded shadow px-0">
            <h3 className="p-4">Productive</h3>
            <div style={{ width: "100%", height: 230 }}>
              <ResponsiveContainer>
                <AreaChart data={productivityData}>
                  <Area
                    type="monotone"
                    dataKey="productivity"
                    stroke="#36c449"
                    fill="#36c449"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="container border rounded shadow px-0">
            <h3 className="p-4">Slacking</h3>
            <div style={{ width: "100%", height: 230 }}>
              <ResponsiveContainer>
                <AreaChart data={productivityData}>
                  <Area
                    type="monotone"
                    dataKey="productivity"
                    stroke="#ff662f"
                    fill="#ff662f"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="px-5 mb-5">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-6 pe-4 ps-0">
                <EmployeeList heading="Most Productive" />
              </div>
              <div className="col-md-6 pe-0 ps-4">
                <EmployeeList heading="Most Effective" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 pe-4 ps-0">
                <EmployeeList heading="Most Unproductive" />
              </div>
              <div className="col-md-6 pe-0 ps-4">
                <EmployeeList heading="Most Offline" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
