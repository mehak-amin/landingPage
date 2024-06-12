import { useState } from "react";
import "./ManageApps.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/Header";
import SearchInput from "../../../components/SearchInput";
import SortButton from "../../../components/Button/SortButton";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import BASE_URI from "../../../../config";
import useFetch from "../../../hooks/useFetch";
import { RxDotsHorizontal } from "react-icons/rx";

const ManageApps = () => {
  const [addApp, setAddApp] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const token = localStorage.getItem("token");
  let url = `${BASE_URI}/appList`;

  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, isLoading, error, refetch } = useFetch(url, fetchOptions);
  const appData = data?.data || {};
  const { appList } = appData;

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
      <Header
        heading="Manage Apps"
        isDate={false}
        isMonthFilter={false}
        btnName="Add App"
      />

      <div className="d-md-flex gap-6  px-md-5 px-3 py-4 position-relative">
        <SearchInput
          placeholder="Search Departments...!"
          value={search}
          setValue={setSearch}
        />

        <div className="d-flex gap-4 mt-3 mt-md-0">
          <div
            className="border-0 bg-white rounded"
            onClick={() => setIsSort(!isSort)}
          >
            <SortButton />
          </div>
          {isSort && (
            <div
              className="z-3 position-absolute bg-white custom-shadow"
              style={{ top: "115%", left: "-50%" }}
            >
              <div className="px-3 py-2">
                <select
                  // value={sortCriteria}
                  // onChange={handleSortCriteriaChange}
                  className="py-1 rounded"
                >
                  <option value="" disabled selected>
                    --Select--
                  </option>
                  <option value="department_name">Department Name</option>
                  <option value="created">Created</option>
                  <option value="members">Members</option>
                </select>
              </div>

              <div className="d-flex flex-direction-column">
                <label className="d-flex align-items-center gap-3 px-4 py-2 border-top border-bottom">
                  <input
                    type="radio"
                    value="asc"
                    // checked={sortOrder === "asc"}
                    // onChange={handleSortOrderChange}
                  />
                  Ascending <IoIosArrowRoundUp />
                </label>
                <label className="d-flex align-items-center gap-3 px-4 py-2 ">
                  <input
                    type="radio"
                    value="desc"
                    // checked={sortOrder === "desc"}
                    // onChange={handleSortOrderChange}
                  />
                  Descending <IoIosArrowRoundDown />
                </label>
              </div>
            </div>
          )}
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

      <div style={{ overflowX: "auto" }}>
        <div className="px-sm-5 px-3" style={{ minWidth: "66rem" }}>
          <div className="top-div-bottom-departments py-3">
            <div className="left-top-div-bottom-departments">
              <h5
                // onClick={handleSelectAll}
                className="cursor-pointer"
              >
                Select All
              </h5>
            </div>
            <div className="right-top-div-bottom-departments">
              <h5>{selectedDepartments.length} Departments Selected</h5>
              <h6>
                <RiDeleteBin6Line
                  className="fs-3"
                  // onClick={handleDelete}
                />
              </h6>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="text-start px-3 ps-5">App name</th>
                <th>Type</th>
                <th>Category</th>
                <th>Change Type</th>
              </tr>
            </thead>
            <tbody>
              {appList?.map((item) => {
                return (
                  <tr key={item?.id}>
                    <td className="px-3 ps-5">
                      <input
                        type="checkbox"
                        className="d-inline border-0 me-2 text-capitalize"
                        style={{ width: "1rem", height: "1rem" }}
                        // checked={selectedDepartments.includes(department.id)}
                        // onChange={() => handleCheckboxChange(department.id)}
                      />{" "}
                      {item?.application_name}
                    </td>
                    <td className="text-center text-capitalize">
                      {item?.category}
                    </td>
                    <td className="text-center"></td>
                    <td className="text-center">
                      <RxDotsHorizontal className="fs-4" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="bottom-div-manageapps">
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
                  <img src="" alt="image" />
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
                  <img src="" alt="image" />
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
                  <img src="" alt="image" />
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
                  <h6>Figma</h6> <img src="" alt="image" />
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
      </div> */}
    </div>
  );
};

export default ManageApps;
