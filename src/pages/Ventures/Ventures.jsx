import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Ventures.css";
import VentureHeader from "../../components/VentureHeader";
import { useState, useEffect, useRef } from "react";
import { SlNotebook } from "react-icons/sl";
import Footer from "../../components/Footer";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbBookDownload } from "react-icons/tb";
import { Table, Row, Col } from "react-bootstrap";
import { RxDotsHorizontal } from "react-icons/rx";
import ProjectModal from "../../Sections/ProjectModal/ProjectModal";

export default function Ventures() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isTaskTab, setIsTaskTab] = useState(false);
  const [show, setShow] = useState(false);
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

  // const data = "";

  const data = [
    {
      id: 1,
      projectName: "Project A",
      date: "22 Apr, 2024",
      createdBy: "John",
      progress: "Navbar",
    },
    {
      id: 2,
      projectName: "Project B",
      date: "23 Apr, 2024",
      createdBy: "John",
      progress: "Footer",
    },
    {
      id: 3,
      projectName: "Project C",
      date: "24 Apr, 2024",
      createdBy: "John",
      progress: "Sidebar",
    },
    {
      id: 4,
      projectName: "Project D",
      date: "25 Apr, 2024",
      createdBy: "John",
      progress: "Homepage",
    },
  ];

  const taskData = [
    {
      id: 1,
      taskName: "Website Redesign",
      project: "Homepage Wireframes",
      assignee: "John Doe",
      progress: "Navbar",
      urgency: "High",
    },
    {
      id: 2,
      taskName: "Marketing Campaign",
      project: "Social Media Posts",
      assignee: "Jane Smith",
      progress: "Home",
      urgency: "Medium",
    },
    {
      id: 3,
      taskName: "Product Development",
      project: "Prototype Testing",
      assignee: "Mike Johnson",
      progress: "Footer",
      urgency: "Low",
    },
  ];

  return (
    <div className="logged-in-page">
      <div className="sidebar-holder" ref={sideBarRef}>
        <Sidebar isSideBarOpen={isSideBarOpen} />
      </div>

      <div className="navbar-home-holder">
        <Navbar toggleSidebar={toggleSidebar} />
        <VentureHeader
          heading={isTaskTab ? "Task List" : "My Projects"}
          name={isTaskTab ? "New Task" : "New Project"}
          setShow={setShow}
        />
        <div className="bg-body-light">
          <div className="px-5">
            <ul className="d-flex gap-3 shadow list-unstyled rounded px-3 py-1 bg-body-light border border-white">
              <li
                className={`px-2 py-2  fs-5 cursor-pointer ${
                  isTaskTab ? "" : "bg-gray text-white"
                }`}
                onClick={() => setIsTaskTab(false)}
              >
                PROJECTS
              </li>
              <li
                className={`px-2 py-2  fs-5 cursor-pointer ${
                  isTaskTab ? "bg-gray text-white" : ""
                }`}
                onClick={() => setIsTaskTab(true)}
              >
                TASKS
              </li>
            </ul>
          </div>

          {data === "" ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "calc(100vh - 18.9rem)", height: "100%" }}
            >
              <div className="text-center">
                <SlNotebook className="fs-1 mb-4" />
                <h4 className="mb-2 fw-bold">Create your first Venture</h4>
                <p className="mb-0 fs-5">No ventures have been created yet.</p>
                <p className="mb-5 fs-5">
                  To start using this feature, create a new venture.
                </p>
                <div className="d-flex gap-5 justify-content-center">
                  <button className=" px-2 text-center py-2 rounded bg-white border-0 cursor-pointer fs-5">
                    Learn More
                  </button>
                  <button className="border px-2 text-center py-2 rounded bg-gray text-white shadow cursor-pointer fs-5">
                    New Venture
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-5 py-4 pt-0">
              <div className="d-flex gap-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    placeholder="Search Ventures...!"
                    className="px-3 py-2 rounded border pe-5"
                  />
                  <IoIosSearch className="position-absolute custom-top custom-end fs-5 text-gray" />
                </div>
                <div className="d-flex gap-4">
                  <button className="border-0 bg-white px-3 rounded">
                    <IoFilterOutline className="me-3 fs-5" />
                    Filter
                  </button>
                  <button className="border-0 bg-white px-3 rounded">
                    <BiSortAlt2 className="me-3 fs-5" />
                    Sort
                  </button>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between px-4 py-3 bg-customGray text-white mb-1">
                <a href="" className="text-white fs-4">
                  Select all
                </a>
                <div className="d-flex align-items-center gap-4 fs-5">
                  <p className="mb-0">0 projects selected</p>
                  <RiDeleteBin6Line className="fs-4 text-dark" />
                  <TbBookDownload className="fs-4 text-dark" />
                </div>
              </div>

              <div className="text-center">
                <Row>
                  <Col>
                    <Table
                      bordered={false}
                      hover
                      className="w-100"
                      style={{ minWidth: "52rem" }}
                    >
                      <thead>
                        <tr className="fw-bold">
                          <th
                            className="border-0  py-3 text-start ps-4"
                            style={{ width: "25%" }}
                          >
                            {isTaskTab ? <>Task Name</> : <>Project Name</>}
                          </th>
                          <th className="border-0  py-3">
                            {isTaskTab ? <>Project</> : <>Created</>}
                          </th>
                          <th className="border-0  py-3">
                            {isTaskTab ? <>Asignee</> : <>Created By</>}
                          </th>
                          <th className="border-0  py-3">Progress</th>
                          {isTaskTab && (
                            <th className="border-0  py-3">Urgency</th>
                          )}
                          <th className="border-0  py-3">Edit/Delete</th>
                        </tr>
                      </thead>
                      {isTaskTab ? (
                        <tbody>
                          {taskData.map((item) => (
                            <tr key={item.id}>
                              <td className="border-0 py-3 text-start ps-4">
                                <input
                                  type="checkbox"
                                  className="me-3 border-0"
                                  style={{
                                    outline: "#D9D9D9",
                                    width: "1rem",
                                    height: "1rem",
                                  }}
                                />
                                {item.taskName}
                              </td>
                              <td className="border-0">{item.project}</td>
                              <td className="border-0">{item.assignee}</td>
                              <td className="border-0">{item.progress}</td>
                              <td className="border-0">{item.urgency}</td>
                              <td className="border-0">
                                <RxDotsHorizontal className="fs-3" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      ) : (
                        <tbody>
                          {data.map((item) => (
                            <tr key={item.id}>
                              <td className="border-0 py-3 text-start ps-4">
                                <input
                                  type="checkbox"
                                  className="me-3 border-0"
                                  style={{
                                    outline: "#D9D9D9",
                                    width: "1rem",
                                    height: "1rem",
                                  }}
                                />
                                {item.projectName}
                              </td>
                              <td className="border-0">{item.date}</td>
                              <td className="border-0">{item.createdBy}</td>
                              <td className="border-0">{item.progress}</td>
                              <td className="border-0">
                                <RxDotsHorizontal className="fs-3" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </Table>
                  </Col>
                </Row>
              </div>
            </div>
          )}

          <Footer />
        </div>
      </div>
      {show && <ProjectModal show={show} setShow={setShow} />}
    </div>
  );
}
