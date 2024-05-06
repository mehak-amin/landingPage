import { CiCalendar, CiFilter, CiUser } from "react-icons/ci";
import "./pages/WorkPlanners/WorkPlanner.css";
function TableComponent() {
  return (
    <div className="w-100 py-3">
      <div className="row  px-sm-3 px-md-5 py-2">
        <div className="col-lg-4">
          <span className="shadow p-2 rounded fw-600 fs-24">Work Planners</span>
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
          <ul className="d-flex justify-content-start align-items-center list-unstyled py-1 gap-md-5 gap-3">
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
        <div className="table-holder overflow-auto px-7">
          <table class="table table-bordered ">
            <thead>
              <tr>
                <th
                  scope="col "
                  className="text-center fw-normal fs-16 line-height-custom"
                >
                  Employess
                </th>
                <th scope="col" className="fw-normal fs-16 text-center">
                  Monday <br />
                  <p className="text-decoration-underline m-0">15</p>
                </th>
                <th scope="col" className="fw-normal fs-16 text-center">
                  Tuesday <br />
                  <p className="text-decoration-underline m-0">15</p>
                </th>
                <th scope="col" className="fw-normal fs-16 text-center">
                  Wednesday <br />
                  <p className="text-decoration-underline m-0">15</p>
                </th>
                <th scope="col" className="fw-normal fs-16 text-center">
                  Thursday <br />
                  <p className="text-decoration-underline m-0">15</p>
                </th>
                <th scope="col" className="fw-normal fs-16 text-center">
                  Friday <br />
                  <p className="text-decoration-underline m-0">15</p>
                </th>
                <th
                  scope="col"
                  className="fw-normal fs-16 text-center"
                  style={{ color: "#ff662f" }}
                >
                  Saturday <br />
                  <p className="text-decoration-underline m-0">15</p>
                </th>
                <th
                  scope="col"
                  className="fw-normal fs-16 text-center"
                  style={{ color: "#ff662f" }}
                >
                  Sunday <br />
                  <p className="text-decoration-underline m-0">15</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row " style={{ color: "#6d6d6d", width: "10rem" }}>
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <span
                      className=""
                      id=""
                      style={{
                        height: "36px",
                        width: "36px",
                      }}
                    >
                      <CiUser
                        id="user-icon"
                        style={{ height: "36px", width: "36px" }}
                      />
                    </span>

                    <div className="fw-normal fs-16">
                      Basit <br /> 2h 2m/38h
                    </div>
                  </div>
                </th>
                <td style={{ width: "8rem" }}>
                  <div className="text-center bg-work rounded-sm">
                    <p className="m-0 bg-transparent">9:00-5:00</p>
                    <p className="m-0 bg-transparent">office</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}>
                  <div className="text-center bg-work rounded-sm">
                    <p className="m-0">15 Apr</p>
                    <p className="m-0">out of office</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}>
                  <div className="text-center bg-sick rounded-sm">
                    <p className="m-0  rounded">15 Apr</p>
                    <p className="m-0 ">Sick Leave</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}>
                  <div className="text-center  bg-trip rounded-sm">
                    <p className="m-0 ">15 Apr</p>
                    <p className="m-0">Business Trip</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}></td>
                <td style={{ width: "8rem" }}> </td>
                <td style={{ width: "8rem" }}> </td>
              </tr>
              <tr>
                <th scope="row " style={{ color: "#6d6d6d", width: "10rem" }}>
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <span
                      className=""
                      id=""
                      style={{
                        height: "36px",
                        width: "36px",
                      }}
                    >
                      <CiUser
                        id="user-icon"
                        style={{ height: "36px", width: "36px" }}
                      />
                    </span>

                    <div className="fw-normal fs-16">
                      Basit <br /> 2h 2m/38h
                    </div>
                  </div>
                </th>
                <td style={{ width: "8rem" }}></td>
                <td style={{ width: "8rem" }}></td>
                <td style={{ width: "8rem" }}>
                  <div className="text-center bg-sick rounded-sm">
                    <p className="m-0  rounded">15 Apr</p>
                    <p className="m-0 ">Sick Leave</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}></td>
                <td style={{ width: "8rem" }}>
                  <div className="text-center bg-work rounded-sm">
                    <p className="m-0">15 Apr</p>
                    <p className="m-0">out of office</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}> </td>
                <td style={{ width: "8rem" }}> </td>
              </tr>
              <tr>
                <th scope="row " style={{ color: "#6d6d6d", width: "10rem" }}>
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <span
                      className=""
                      id=""
                      style={{
                        height: "36px",
                        width: "36px",
                      }}
                    >
                      <CiUser
                        id="user-icon"
                        style={{ height: "36px", width: "36px" }}
                      />
                    </span>

                    <div className="fw-normal fs-16">
                      Basit <br /> 2h 2m/38h
                    </div>
                  </div>
                </th>
                <td style={{ width: "8rem" }}>
                  <div className="text-center  bg-trip rounded-sm">
                    <p className="m-0 ">15 Apr</p>
                    <p className="m-0">Business Trip</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}></td>
                <td style={{ width: "8rem" }}>
                  <div className="text-center bg-work rounded-sm">
                    <p className="m-0">15 Apr</p>
                    <p className="m-0">out of office</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}>
                  <div className="text-center  bg-trip rounded-sm">
                    <p className="m-0 ">15 Apr</p>
                    <p className="m-0">Business Trip</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}></td>
                <td style={{ width: "8rem" }}> </td>
                <td style={{ width: "8rem" }}></td>
              </tr>

              <tr>
                <th scope="row " style={{ color: "#6d6d6d", width: "10rem" }}>
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <span
                      className=""
                      id=""
                      style={{
                        height: "36px",
                        width: "36px",
                      }}
                    >
                      <CiUser
                        id="user-icon"
                        style={{ height: "36px", width: "36px" }}
                      />
                    </span>

                    <div className="fw-normal fs-16">
                      Basit <br /> 2h 2m/38h
                    </div>
                  </div>
                </th>
                <td style={{ width: "8rem" }}>
                  <div className="text-center  bg-trip rounded-sm">
                    <p className="m-0 ">15 Apr</p>
                    <p className="m-0">Business Trip</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}></td>
                <td style={{ width: "8rem" }}>
                  <div className="text-center bg-work rounded-sm">
                    <p className="m-0">15 Apr</p>
                    <p className="m-0">out of office</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}>
                  <div className="text-center  bg-trip rounded-sm">
                    <p className="m-0 ">15 Apr</p>
                    <p className="m-0">Business Trip</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}></td>
                <td style={{ width: "8rem" }}> </td>
                <td style={{ width: "8rem" }}></td>
              </tr>

              <tr>
                <th scope="row " style={{ color: "#6d6d6d", width: "10rem" }}>
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <span
                      className=""
                      id=""
                      style={{
                        height: "36px",
                        width: "36px",
                      }}
                    >
                      <CiUser
                        id="user-icon"
                        style={{ height: "36px", width: "36px" }}
                      />
                    </span>

                    <div className="fw-normal fs-16">
                      Basit <br /> 2h 2m/38h
                    </div>
                  </div>
                </th>
                <td style={{ width: "8rem" }}>
                  <div className="text-center  bg-trip rounded-sm">
                    <p className="m-0 ">15 Apr</p>
                    <p className="m-0">Business Trip</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}></td>
                <td style={{ width: "8rem" }}>
                  <div className="text-center bg-work rounded-sm">
                    <p className="m-0">15 Apr</p>
                    <p className="m-0">out of office</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}>
                  <div className="text-center  bg-trip rounded-sm">
                    <p className="m-0 ">15 Apr</p>
                    <p className="m-0">Business Trip</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}></td>
                <td style={{ width: "8rem" }}></td>
                <td style={{ width: "8rem" }}></td>
              </tr>

              <tr>
                <th scope="row " style={{ color: "#6d6d6d", width: "10rem" }}>
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <span
                      className=""
                      id=""
                      style={{
                        height: "36px",
                        width: "36px",
                      }}
                    >
                      <CiUser
                        id="user-icon"
                        style={{ height: "36px", width: "36px" }}
                      />
                    </span>

                    <div className="fw-normal fs-16">
                      Basit <br /> 2h 2m/38h
                    </div>
                  </div>
                </th>
                <td style={{ width: "8rem" }}>
                  <div className="text-center  bg-trip rounded-sm">
                    <p className="m-0 ">15 Apr</p>
                    <p className="m-0">Business Trip</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}></td>
                <td style={{ width: "8rem" }}>
                  <div className="text-center bg-work rounded-sm">
                    <p className="m-0">15 Apr</p>
                    <p className="m-0">out of office</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}>
                  <div className="text-center  bg-trip rounded-sm">
                    <p className="m-0 ">15 Apr</p>
                    <p className="m-0">Business Trip</p>
                  </div>
                </td>
                <td style={{ width: "8rem" }}></td>
                <td style={{ width: "8rem" }}> </td>
                <td style={{ width: "8rem" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableComponent;
