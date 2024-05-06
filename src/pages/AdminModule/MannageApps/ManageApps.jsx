import React, { useState } from "react";
import "./ManageApps.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faFilter,
  faArrowDownShortWide,
  faMagnifyingGlass,
  faTrashCan,
  faEllipsis,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
// import figma from "../../assets/figma.jpeg";
// import discord from "../../assets/discord.png";
// import youtube from "../../assets/youtube.png";

const ManageApps = () => {
  const [addApp, setAddApp] = useState(false);

  const toggleAddApp = () => {
    setAddApp(!addApp);
  };

  const [selectedOption, setSelectedOption] = useState("productive");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const selectStyle = {
    backgroundColor:
      selectedOption === "productive"
        ? "rgba(54, 196, 73, 1)"
        : selectedOption === "unproductive"
        ? "red"
        : "grey",
    color: "white", // Optional: You can change the text color based on the background color
    border: "none", // Optional: You can remove the default border
    padding: "5px 10px",
    outline: "none", // Optional: You can remove the default outline
  };

  return (
    <div className="wrapper-div-manageapps">
      {/* <---- TOP DIV ----> */}

      <div className="top-div-manageapps">
        <div className="left-top-manageapps">
          <div className="heading-manageapps">
            <h4 className="heading-h4-manageapps">Manage Apps</h4>
            {/* <h4 className='responsive-h4-manageapps'>Teammates</h4> */}
          </div>
        </div>

        <div className="right-top-manageapps">
          <div className="calendar-manageapps">
            <h4>
              <FontAwesomeIcon icon={faCalendar} />
            </h4>
            <h4>April 11, 2024</h4>
          </div>

          <h4 className="filter-manageapps">
            <FontAwesomeIcon icon={faFilter} />
          </h4>

          {/* <div className="calendar-responsive-manageapps">
   <div className='day-teammates'><h6>Day</h6></div>
   <div><h6>Week</h6></div>
   <div><h6>Month</h6></div>
 </div> */}

          <div className="add-manageapps" onClick={toggleAddApp}>
            <h5>Add App</h5>
          </div>
        </div>
      </div>
      {/* <---------------- CENTER DIV MANAGE APPS ------------------> */}

      <div className="center-div-manageapps">
        <div className="center-top-manageapps">
          <div className="search-manageapps">
            <input type="text" placeholder="Search Apps..!" />
            <div className="search-icon">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>

          <div className="center-top-right-manageapps">
            <div className="center-manageapps-sort">
              <FontAwesomeIcon icon={faArrowDownShortWide} />
              <h6>Sort</h6>
            </div>
          </div>
        </div>
      </div>
      {/* <----------------- BOTTOM DIV -----------------> */}
      {addApp && (
        <div className="addapp-popup-wrapper">
          <div className="addapp-popup-manageapps">
            <div className="addapp-top-manageapps">
              <h4>Add App</h4>
              <div onClick={toggleAddApp}>
                <h4>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </h4>
              </div>
            </div>
            <div className="addapp-center-manageapps">
              <div className="addapp-top-center-manageapps">
                <h6>App Name</h6>
                <input type="text" placeholder="Enter App Name...!" />
              </div>
              <div className="addapp-bottom-center-manageapps">
                <h6>Select App Type</h6>
                <select
                  value={selectedOption}
                  onChange={handleChange}
                  style={selectStyle}
                >
                  <option value="productive">Productive</option>
                  <option value="unproductive">Unproductive</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>
            </div>
            <div className="addapp-bottom-manageapps">
              <div className="addapp-cancle-bottom-manageapps">
                <h6>Cancel</h6>
              </div>
              <div className="addapp-invite-bottom-manageapps">
                <h6>Add App</h6>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bottom-div-manageapps">
        <div className="content-bottom-div-manageapps">
          <div className="top-div-bottom-manageapps">
            <div className="left-top-div-bottom-manageapps">
              <h5>Select All</h5>
            </div>
            <div className="right-top-div-bottom-manageapps">
              <h5>0 Apps Selected</h5>
              <h6>
                <FontAwesomeIcon icon={faTrashCan} />
              </h6>
            </div>
          </div>
          <div className="table-container-manageapps">
            <table>
              <tr className="table-headding-manageapps">
                <th>
                  <h6>App Name</h6>
                </th>
                <th>
                  <h6>Type</h6>
                </th>

                <th>
                  <h6>Change Type</h6>
                </th>
              </tr>
              <tr>
                <td className="table-data-appname-manageapps">
                  <input type="checkbox" /> <h6>Figma</h6>{" "}
                  <img src={figma} alt="image" />
                </td>
                <td>
                  <h6 style={{ color: "green" }}>Productive</h6>
                </td>

                <td>
                  <h6>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </h6>
                </td>
              </tr>
              <tr>
                <td className="table-data-appname-manageapps">
                  <input type="checkbox" /> <h6>Youtube</h6>{" "}
                  <img src={youtube} alt="image" />
                </td>
                <td>
                  <h6 style={{ color: "red" }}>Unproductive</h6>
                </td>

                <td>
                  <h6>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </h6>
                </td>
              </tr>
              <tr>
                <td className="table-data-appname-manageapps">
                  <input type="checkbox" /> <h6>Discord</h6>{" "}
                  <img src={discord} alt="image" />
                </td>
                <td>
                  <h6 style={{ color: "#b3b3b3" }}>Neutral</h6>
                </td>

                <td>
                  <h6>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </h6>
                </td>
              </tr>
            </table>
          </div>
          <div className="responsive-table-manageapps">
            <table>
              <tr>
                <td>
                  <h6>App Name</h6>
                </td>
                <td className="table-data-appname-manageapps">
                  {" "}
                  <h6>Figma</h6> <img src={figma} alt="image" />
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Type</h6>
                </td>
                <td style={{ color: "green" }}>
                  <h6>Productive</h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Change Type</h6>
                </td>
                <td>
                  <h6>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </h6>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageApps;
