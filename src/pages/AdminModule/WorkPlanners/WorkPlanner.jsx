import React from "react";
// import TableComponent from "../../../TableComponent";
import CalendarDay from "../../../components/calendar/calendarDay/CalendarDay";
// import CalendarWeek from "../../../components/calendar/calendarWeek/CalendarWeek";
// import Practice from "../../../components/practice/Practice";
// import ScheduleTable from "../../../components/practice2/ScheduleTable";
import { CiCalendar, CiFilter, CiUser } from "react-icons/ci";
import "./WorkPlanner.css";

function WorkPlanner() {
  return (
    <div className="work-planner d-flex ">
      <div className="w-100 py-3">
        <div className="row  px-sm-3 px-md-5 py-2">
          <div className="col-lg-4">
            <span className="shadow p-2 rounded fw-600 fs-24">
              Work Planners
            </span>
          </div>
          <div className="col-8 col-sm-6 col-lg-4 ">
            <span className="" id="calandar-holder">
              <CiCalendar id="calandar-icon" />
            </span>
            <span className="calandar-text-size fw-normal px-2">
              April 15,2024-April 21,2024
            </span>
            <span className="" id="filter-holder">
              <CiFilter id="filter-icon" />
            </span>
          </div>
          <div className="col-4 col-sm-6 col-lg-4 d-flex justify-content-end">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
                checked
              />
              <label
                className="calandar-text-size btn btn-outline-primary radio-btn-width"
                for="btnradio1"
              >
                Day
              </label>

              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
              />
              <label
                className="cal-btn calandar-text-size btn btn-outline-primary radio-btn-width"
                for="btnradio2"
              >
                Week
              </label>

              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio3"
                autocomplete="off"
              />
              <label
                className="calandar-text-size btn btn-outline-primary radio-btn-width"
                for="btnradio3"
              >
                Month
              </label>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center  px-5 py-2 ">
          <span>
            <button
              type="button"
              className="add-btn btn btn-outline-secondary fw-600 shadow single-line-btn mx-2"
            >
              Add Schedule
            </button>
          </span>
          <span className="add-btn-holder">
            <button
              type="button"
              className="add-btn btn btn-outline-secondary fw-600 shadow single-line-btn mx-2"
            >
              Add Away Time
            </button>
          </span>
        </div>
        <div className="main-content ">
          <div className="sub-pages shadow px-7">
            <ul className="d-flex justify-content-start align-items-center list-unstyled py-1 gap-md-5 gap-2 fs-15">
              <li className=" px-1 py-2 rounded-sm">
                <a>Team Members</a>
              </li>
              <li className="px-1 py-2 rounded-sm">
                <a>Without Team</a>
              </li>
              <li className="px-1 py-2 rounded-sm">
                <a>Accounting</a>
              </li>
              <li className="px-1 py-2 rounded-sm">
                <a>Managment</a>
              </li>
              <li className="px-1 py-2 rounded-sm">
                <a>Product Oversight</a>
              </li>
              <li className="px-1 py-2 rounded-sm">
                <a>Sales</a>
              </li>
            </ul>
          </div>
          <div className="px-7 py-3">
            {/* <CalendarWeek /> */}
            <CalendarDay />
            {/* <Practice /> */}
            {/* <ScheduleTable /> */}
          </div>
          {/* <TableComponent /> */}
        </div>
      </div>
    </div>
  );
}

export default WorkPlanner;
