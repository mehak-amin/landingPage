import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState, useEffect, useRef } from "react";
import ButtonActive from "../../../components/Button/ButtonActive";
import ButtonInactive from "../../../components/Button/ButtonInactive";
import { IoAddCircleOutline } from "react-icons/io5";
import { PiArrowBendUpRight, PiArrowBendUpLeft } from "react-icons/pi";
import { MdFormatBold } from "react-icons/md";
import { GoItalic } from "react-icons/go";
import { BsTextLeft, BsTextCenter, BsTextRight } from "react-icons/bs";
import { RxClipboardCopy } from "react-icons/rx";
import Footer from "../../../components/Footer";
import "./NewTask.css";
export default function NewTask() {
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
        <div className="container mt-1 p-0">
          <div className="row px-5 py-4">
            <div className="col-md-8 mb-4 mb-md-0">
              <h4 className="mb-0 shadow d-inline px-2 py-2 rounded">
                New Task
              </h4>
            </div>
            <div className="col-md-4">
              <div className="d-flex gap-4">
                <ButtonActive heading="Create task" />

                <ButtonInactive heading="Cancel" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-body-light">
          <div className="px-5">
            <div className="d-flex py-4 gap-4">
              <div
                className="container m-0 bg-white p-4"
                style={{ width: "65%" }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="taskName" className="form-label">
                        Task Name
                      </label>
                      <input
                        type="text"
                        className="form-control py-2"
                        id="taskName"
                        placeholder="Enter Task Name..."
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="project" className="form-label">
                        Project
                      </label>
                      <input
                        type="text"
                        className="form-control py-2"
                        id="project"
                        placeholder="Select Project"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="assignee" className="form-label">
                        Assignee
                      </label>
                      <select
                        id="assignee"
                        className="custom-select p-2 w-100 border rounded text-lightGray"
                      >
                        <option value="" disabled>
                          --Select Assignee--
                        </option>
                        <option value="">Jonas</option>
                        <option value="">Devin</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="progress" className="form-label">
                        Progress
                      </label>
                      <select
                        id="progress"
                        className="custom-select p-2 w-100 border rounded"
                      >
                        <option value="" disabled>
                          --Select Progress--
                        </option>
                        <option value="">In Progress</option>
                        <option value="">To-Do</option>
                        <option value="">Done</option>
                      </select>
                      {/* <input
                        type="text"
                        className="form-control py-2"
                        id="progress"
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="dueDate" className="form-label">
                        Due Date
                      </label>
                      <input
                        type="date"
                        className="form-control py-2"
                        id="dueDate"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="">Description</label>
                  <div className="d-flex align-items-center justify-content-between px-3 py-2 border fs-5">
                    <div className="d-flex gap-6">
                      <div className="d-flex gap-3 align-items-center">
                        <PiArrowBendUpRight />
                        <PiArrowBendUpLeft />
                      </div>

                      <div className="d-flex gap-3 align-items-center">
                        <MdFormatBold />
                        <GoItalic />
                      </div>

                      <div className="d-flex gap-3 align-items-center">
                        <BsTextLeft />
                        <BsTextRight />
                        <BsTextCenter />
                      </div>
                    </div>
                    <RxClipboardCopy />
                  </div>
                  <textarea
                    name=""
                    id=""
                    rows="8"
                    className="w-100 border p-3"
                    placeholder="Add description..."
                  ></textarea>
                </div>
              </div>

              <div className="bg-white" style={{ width: "35%" }}>
                <h4 className="fw-light p-3 bg-lightGray">
                  Additional Settings
                </h4>
                <div className="p-3">
                  <h5>Created by</h5>
                  <div className="d-flex gap-3 align-items-center mb-3">
                    <img
                      src="..\src\assets\images.png"
                      alt="img"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        objectFit: "cover",
                      }}
                    />
                    <h6 className="mb-0 fw-normal">John</h6>
                  </div>
                  <h5>Created On</h5>
                  <h6 className="mb-4 fw-normal">26 Apr, 2024</h6>

                  <label htmlFor="" className="d-block">
                    Urgency
                  </label>
                  <select
                    name=""
                    id=""
                    className="w-100 px-3 py-2 rounded mb-4 border"
                  >
                    <option value="" disabled>
                      --Select Urgency--
                    </option>
                    <option value="">Low</option>
                    <option value="">Medium</option>
                    <option value="">High</option>
                  </select>

                  <label htmlFor="">Estimated Time</label>
                  <div className="input-group mb-5">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Hours"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary w-100 px-3 rounded-0 rounded-end bg-lightGray border-0 text-dark"
                        type="button"
                      >
                        H
                      </button>
                    </div>
                  </div>

                  <select
                    name=""
                    id=""
                    className="w-100 px-3 py-2 rounded mb-5 border"
                  >
                    <option value="" disabled>
                      --Select Members--
                    </option>
                    <option value="">Members</option>
                    <option value="">Without Members</option>
                  </select>

                  <button className="w-100 fs-5 py-2  border-0 text-white bg-darkGray">
                    <IoAddCircleOutline className="fs-3 me-2" /> Assign New
                    Employee
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
