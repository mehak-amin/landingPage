import React, { useEffect, useState } from "react";
import "./Departments.css";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { DiAppcelerator } from 'react-icons/di';
import BASE_URI from "../../../../config";

const Departments = () => {
  const [createDeparment, setcreateDeparment] = useState(false);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [deptName, setDeptName] = useState("");
  const [editOrDeletePopUp, setEditOrDeletePopUp] = useState({});
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [id, setId] = useState("");
  // const [toggleStates, setToggleStates] = useState({});

  const navigate = useNavigate();

  const handleDelete = () => {
    setDeletePopUp(!deletePopUp);
  };

  const toggleEditOrDeletePopUp = (id) => {
    // console.log(id)
    setEditOrDeletePopUp((prevEditOrDeletePopUp) => ({
      ...prevEditOrDeletePopUp,
      [id]: !prevEditOrDeletePopUp[id],
    }));
  };

  // const toggleEditOrDeletePopUp = ()=>{
  //   setEditOrDeletePopUp(!editOrDeletePopUp);
  // }

  const togglecreateDeparment = () => {
    setcreateDeparment(!createDeparment);
  };

  //    <-------- GETTING DATA FROM BACKEND (GET) --------->

  const fetchDepartments = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${BASE_URI}/api/v1/departments`,
      });
      setDepartmentsData(response.data.data);
      setDeptName("");
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDepartments();
  }, []);

  //   <----------- POSTING DATA ON BACKEND (POST) (CREATE DEPARTMENT) ----------->

  const handleCreateDepartment = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URI}/api/v1/departments`,
        data: {
          deptName,
        },
      });
      setcreateDeparment(false);
      fetchDepartments();

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  //   DELETING DATA OF BACKEND (DELETE)

  const handleDeleteDepartment = async () => {
    try {
      console.log(id);
      const response = await axios({
        method: "DELETE",
        url: `${BASE_URI}/api/v1/departments/${id}`,
      });
      fetchDepartments();
      setDeletePopUp(false);

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATING DATA ON BACKEND WITH (PATCH)

  const handleEditDepartment = async () => {
    try {
      const response = await axios({
        method: "PATCH",
        url: `${BASE_URI}/api/v1/departments/${id}`,
        data: {
          newName,
        },
      });
      navigate("/loggedinpage");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper-div-departments">
      {/* <--------- DELETE POPUP STRUCTURE -----------> */}
      {deletePopUp && (
        <div className="wrapper-delete-popup-departments">
          <div className="delete-popup-departments">
            <div className="delete-department-top-departments">
              <h4>Delete Department</h4>
              <div onClick={() => setDeletePopUp(!deletePopUp)}>
                <h4>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </h4>
              </div>
            </div>

            <div className="delete-department-center-departments">
              <h6>
                Do you really want to remove the projects that you have chosen?
              </h6>
              <h6>There is no turning back.</h6>
            </div>

            <div className="delete-department-bottom-departments">
              <h5 onClick={() => setDeletePopUp(false)}>Cancel</h5>
              <h5 onClick={handleDeleteDepartment}>Delete</h5>
            </div>
          </div>
        </div>
      )}

      {/* <---- TOP DIV ----> */}

      <div className="top-div-departments">
        <div className="left-top-departments">
          <div className="heading-departments">
            <h4 className="heading-h4-departments">Departments</h4>
            {/* <h4 className='responsive-h4-departments'>Teammates</h4> */}
          </div>
        </div>

        <div className="right-top-departments">
          <div className="calendar-departments">
            <h4>
              <FontAwesomeIcon icon={faCalendar} />
            </h4>
            <h4>April 11, 2024</h4>
          </div>

          <h4 className="filter-departments">
            <FontAwesomeIcon icon={faFilter} />
          </h4>

          {/* <div className="calendar-responsive-departments">
   <div className='day-teammates'><h6>Day</h6></div>
   <div><h6>Week</h6></div>
   <div><h6>Month</h6></div>
 </div> */}

          <div className="add-departments" onClick={togglecreateDeparment}>
            <h5>Create Department</h5>
          </div>
        </div>
      </div>
      {/* <---------------- CENTER DIV MANAGE APPS ------------------> */}

      <div className="center-div-departments">
        <div className="center-top-departments">
          <div className="search-departments">
            <input type="text" placeholder="Search Departments..!" />
            <div className="search-icon">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>

          <div className="center-top-right-departments">
            <div className="center-departments-sort">
              <FontAwesomeIcon icon={faArrowDownShortWide} />
              <h6>Sort</h6>
            </div>
          </div>
        </div>
      </div>
      {/* <----------------- BOTTOM DIV -----------------> */}
      {createDeparment && (
        <div className="create-department-popup-wrapper">
          <div className="create-department-popup-departments">
            <div className="create-department-top-departments">
              <h4>Create Department</h4>
              <div onClick={togglecreateDeparment}>
                <h4>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </h4>
              </div>
            </div>
            <div className="create-department-center-departments">
              <div className="create-department-top-center-departments">
                <h6>Department Name</h6>
                <input
                  type="text"
                  placeholder="Enter Department Name...!"
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                />
              </div>
            </div>
            <div className="create-department-bottom-departments">
              <div
                className="create-department-cancle-bottom-departments"
                onClick={() => setDeptName("")}
              >
                <h6>Cancel</h6>
              </div>
              <div
                className="create-department-invite-bottom-departments"
                onClick={handleCreateDepartment}
              >
                <h6>Create</h6>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bottom-div-departments">
        <div className="content-bottom-div-departments">
          <div className="top-div-bottom-departments">
            <div className="left-top-div-bottom-departments">
              <h5>Select All</h5>
            </div>
            <div className="right-top-div-bottom-departments">
              <h5>0 Departments Selected</h5>
              <h6>
                <FontAwesomeIcon icon={faTrashCan} />
              </h6>
            </div>
          </div>
          {departmentsData.map((department, departmentIndex) => (
            <div key={departmentIndex} className="table-container-departments">
              <table>
                <tr className="table-headding-departments">
                  <th>
                    <h6>Role Name</h6>
                  </th>
                  <th>
                    <h6>Created</h6>
                  </th>
                  <th>
                    <h6>Members</h6>
                  </th>
                  <th>
                    <h6>Edit/Delete</h6>
                  </th>
                </tr>
                <tr>
                  <td className="table-data-appname-departments">
                    <input type="checkbox" />{" "}
                    <h6>{department.department_name}</h6>
                  </td>
                  <td>
                    <h6>{department.created_at}</h6>
                  </td>
                  <td>
                    <h6>3</h6>
                  </td>
                  <td>
                    <h6
                      onClick={() => {
                        toggleEditOrDeletePopUp(department.id);
                        setId(department.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faEllipsis} />
                      {editOrDeletePopUp[department.id] && (
                        <div>
                          <h6>Edit</h6>
                          <h6 onClick={handleDelete}>Delete</h6>
                        </div>
                      )}
                    </h6>
                  </td>
                </tr>
              </table>
            </div>
          ))}

          <div className="responsive-table-departments">
            <table>
              <tr>
                <td>
                  <input type="checkbox" />
                  <h6>Management</h6>
                </td>
                <td className="table-data-appname-departments">
                  <h6>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Created</h6>
                </td>
                <td className="date2-responsive-departments">
                  <h6>Wed 20 April, 2024 02:33 PM</h6>
                </td>
                <td className="date-responsive-departments">
                  <h6>Wed 20 April</h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Members</h6>
                </td>
                <td>
                  <h6>3</h6>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
