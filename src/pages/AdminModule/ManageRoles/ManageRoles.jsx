import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { FaTrash, FaEllipsisH } from "react-icons/fa";
// import EditDdelete from "../../../components/Edit-Delete-PopUp/Edit-delete";
import BASE_URI from "../../../../config";
import CreateRoles from "./createRoles/CreateRoles";
import "./ManageRoles.css";
import Header from "../../../components/Header";
import SearchInput from "../../../components/SearchInput";
import SortButton from "../../../components/Button/SortButton";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { Modal, Button, Form } from "react-bootstrap";

function ManageRoles() {
  const [roles, setRoles] = useState([]); //roles container
  const [selectedRoles, setSelectedRoles] = useState([]); //selected role container
  const [showCreateModal, setShowCreateModal] = useState(false); //shows createRole modal
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const [editOrDeletePopUp, setEditOrDeletePopUp] = useState({}); //editDeletePOPup
  const [id, setId] = useState(null); //id of role we wanna edit
  const [editModal, setEditModal] = useState(false); //shows edit modal
  const [roleName, setRoleName] = useState(""); //name in role we wanna edit
  const [status, setStatus] = useState("1");
  const [startDate, setStartDate] = useState(new Date()); //sabreena
  const [search, setSearch] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("role");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //format date
  const formatDate = (apiDate) => {
    const date = new Date(apiDate);
    console.log(date.toLocaleString()); //sabreena
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    //     //get the components of the date
    // console.log(date.toLocaleString().getDay());//sabreena
    const dayOfWeek = weekDays[date.getUTCDay()];
    const day = date.getUTCDate();

    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    // Get hours and minutes for formatting
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedHours = hours < 10 ? "0" + hours : hours;

    return `${dayOfWeek} ${day} ${month}, ${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const handleShowCreate = () => setShowCreateModal(true); //shows create modal
  const handleCloseCreate = () => setShowCreateModal(false); //close create modal
  const handleShowEdit = () => {
    console.log("edit clicked");
    setEditModal(true);
  };
  const handleCloseEdit = () => {
    setEditModal(false);
  };
  //editDeletePopup
  const toggleEditOrDeletePopUp = (id) => {
    // console.log(id)
    setEditOrDeletePopUp((prevEditOrDeletePopUp) => ({
      ...prevEditOrDeletePopUp,
      [id]: !prevEditOrDeletePopUp[id],
    }));
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const token = localStorage.getItem("token");
  // let url = `${BASE_URI}/roles`;
  // if (sortCriteria && sortOrder) {
  //   url += `?sort=${sortCriteria}&direction=${sortOrder}`;
  // }

  // if (search) {
  //   url += `&search=${search}`;
  // }

  // const BASE_URI = 'your_base_uri';
  // const search = 'your_search_query';
  // const sortBy = 'field_name'; // e.g., 'name', 'created_at', etc.
  // const sortOrder = 'asc'; // 'asc' for ascending or 'desc' for descending

  // const fetchRoles = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URI}/roles`, {
  //       params: {
  //         search: search,
  //         sortBy: sortBy,
  //         sortOrder: sortOrder
  //       },
  //       headers: {
  //         Authorization: `Bearer your_token_here`
  //       }
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching roles:', error);
  //   }
  // };

  // fetchRoles();

  //get Roles API
  let url = `${BASE_URI}/roles?search=${search}&sort=${sortCriteria}&direction=${sortOrder}`;
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data.data.roles);
        setError(false);

        const fetchedRoles = response.data.data.roles.map((role) => ({
          ...role,
          created_at: formatDate(role.created_at),
        }));
        setRoles(fetchedRoles);
      } catch (error) {
        setError(true);
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, [token, url]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // -------------edit role-------------------------
  const getSingleRole = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${BASE_URI}/roles/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setRoleName(response.data.data[0].role);
      console.log(response.data.data[0].role);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    getSingleRole();
    setEditModal(!editModal);
  };

  //edit in editDelete
  const handleEditRole = async () => {
    try {
      await axios({
        method: "PATCH",
        url: `${BASE_URI}/roles/${id}`,
        data: {
          role: roleName,
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      // refetch();
      setEditModal(false);
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  //selectAll btn click fxn
  const handleSelectAll = () => {
    if (selectedRoles.length === roles.length) {
      setSelectedRoles([]);
    } else {
      setSelectedRoles(roles.map((role) => role.id));
    }
  };

  //checkbox click fxn
  const handleCheckboxChange = (id) => {
    setSelectedRoles((prevSelectedRoles) => {
      if (prevSelectedRoles.includes(id)) {
        return prevSelectedRoles.filter((roleId) => roleId !== id);
      } else {
        return [...prevSelectedRoles, id];
      }
    });
  };

  //delete in editDelete
  const handleDeleteRoles = async (id) => {
    console.log("deleting");
    try {
      const response = await axios.patch(
        `${BASE_URI}/roles/${id}`,
        {
          // role: roleName,
          is_active: 0,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log("Role deleting response:", response.data);
    } catch (err) {
      console.error("Error deleting role:", err);
    }
  };

  //delete selected🗑️

  const handleDeleteSelectedRoles = async () => {
    console.log("delete all");
    try {
      // Map through selectedRoles and send requests to set status to inactive
      await Promise.all(
        selectedRoles.map(async (roleId) => {
          await axios.patch(
            `${BASE_URI}/roles/${roleId}`,
            {
              is_active: 0,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          );
        })
      );

      // After successful deletion, update state or fetch roles again
      // For example, refetch roles after deletion
      // fetchRoles();

      // Clear the selectedRoles state after deletion
      setSelectedRoles([]);
    } catch (err) {
      console.error("Error deleting selected roles:", err);
    }
  };

  console.log(isSort);
  return (
    <div className="manageRolesWrapper container mt-5 px-0">
      <Header
        heading="Manage Roles"
        isDate={true}
        isFilter={false}
        btnName="Create Role"
        handleClick={handleShowCreate}
        selectedStartDate={startDate}
        setSelectedStartDate={setStartDate}
      />
      <div className="main-content-holder px-5">
        {/* -------------------needs to be edited------------------------------ */}
        <div className="d-md-flex gap-6  px-md-5 px-3 py-4 position-relative ">
          {/* SEARCH ROLES */}
          <SearchInput
            placeholder="Search Roles...!"
            value={search}
            setValue={setSearch}
            onChange={handleSearchChange}
          />
          {/* SORT ROLES */}
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
                    value={sortCriteria}
                    onChange={handleSortCriteriaChange}
                    className="py-1 rounded"
                  >
                    <option value="" disabled selected>
                      --Select--
                    </option>
                    <option value="department_name">role</option>
                    <option value="created">created _at</option>
                    <option value="status">is _active</option>
                  </select>
                </div>

                <div className="d-flex flex-direction-column">
                  <label className="d-flex align-items-center gap-3 px-4 py-2 border-top border-bottom">
                    <input
                      type="radio"
                      value="asc"
                      checked={sortOrder === "asc"}
                      onChange={handleSortOrderChange}
                    />
                    Ascending <IoIosArrowRoundUp />
                  </label>
                  <label className="d-flex align-items-center gap-3 px-4 py-2 ">
                    <input
                      type="radio"
                      value="desc"
                      checked={sortOrder === "desc"}
                      onChange={handleSortOrderChange}
                    />
                    Descending <IoIosArrowRoundDown />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* {filteredDepartments.map((department, departmentIndex) => (
  // Render each filtered department here
))} */}
        {/* edit modal */}
        {editModal && (
          <Modal show={handleShowEdit} onHide={handleCloseEdit}>
            <Modal.Header className="bg-darkgray d-flex justify-content-between no-border-radius">
              <Modal.Title className="text-white">Edit Role</Modal.Title>
              <div
                className="text-white close-btn d-flex justify-content-center align-items-center fs-2"
                onClick={handleCloseEdit}
              >
                &times;
              </div>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formRoleName">
                  <Form.Label>Role Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Role Name...!"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex gap-4 ">
                <Button
                  className="px-4"
                  variant="secondary"
                  onClick={handleCloseEdit}
                >
                  Cancel
                </Button>
                <Button
                  className="px-4 bg-darkgray"
                  variant="primary"
                  onClick={() => {
                    handleEditRole();
                  }}
                >
                  Update
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        )}

        <div
          className="d-flex justify-content-between align-items-center mb-2 p-2"
          style={{ backgroundColor: "#d3d3d3" }}
        >
          <div>
            <a
              href="#"
              className="text-white fw-medium underline-clickable"
              onClick={handleSelectAll}
            >
              Select all
            </a>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white fw-medium">
              {selectedRoles.length} Roles Selected
            </span>
            <button
              className="btn-transparent p-2"
              onClick={handleDeleteSelectedRoles}
            >
              <FaTrash />
            </button>
          </div>
        </div>
        <div className=" table-responsive">
          {/* ------------------------- */}
          {/* {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {!loading && roles.length === 0 && (
            <table>
              <thead>
                <tr>
                  <th>Column 1</th>
                  <th>Column 2</th>
                  <th>Column 3</th>
                  <th>Column 4</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4">No data found</td>
                </tr>
              </tbody>
            </table>
          )}
          {!loading && roles.length > 0 && ( */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-start pl-2">Role Name</th>
                <th className="text-center">Created</th>
                <th className="text-center">Status</th>
                <th className="text-center">Edit / Delete</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : roles.length > 0 ? (
                roles.map((role) => (
                  <tr key={role.id}>
                    <td className="text-start ">
                      <input
                        type="checkbox"
                        checked={selectedRoles.includes(role.id)}
                        onChange={() => handleCheckboxChange(role.id)}
                      />
                      <span className="ml-2">{role.role}</span>
                    </td>
                    <td className="text-center">{role.created_at}</td>
                    <td
                      className={
                        role.is_active === 1
                          ? "text-success text-center text-decoration-underline"
                          : "text-danger text-center text-decoration-underline"
                      }
                    >
                      {role.is_active === 1 ? "Active" : "Inactive"}
                    </td>
                    {/* <td className="text-end ">
                    <button
                      className="btn-transparent p-2 mr-2"
                      onClick={() => handleShowEditDelete(role)}
                    >
                      <FaEllipsisH />
                    </button>
                  </td> */}
                    <td
                      className="text-center position-relative"
                      onClick={() => {
                        toggleEditOrDeletePopUp(role.id);
                        setId(role.id);
                      }}
                    >
                      <FaEllipsisH />
                      {editOrDeletePopUp[role.id] && (
                        <div className="position-absolute top-50 right-10 translate-middle-x  z-3 border bg-white">
                          <h6
                            className="py-3 px-5 border-bottom cursor-pointer"
                            // onClick={() => {
                            //   handleEditRoles(role.id);
                            // }}
                            onClick={handleEdit}
                            // onClick={() => handleShowEdit(role)}
                          >
                            Edit
                          </h6>
                          <h6
                            className="py-3 px-5 text-red cursor-pointer"
                            onClick={() => handleDeleteRoles(role.id)}
                          >
                            Delete
                          </h6>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
            {/* )} */}
          </table>
          {/* // )} */}
          {/* {showEditDeleteModal && (
            <EditDdelete
              showModal={showEditDeleteModal}
              closeModal={handleCloseEditDelete}
            />
          )} */}
          {showCreateModal && (
            <CreateRoles
              handleShowCreate={handleShowCreate}
              handleCloseCreate={handleCloseCreate}
            />
          )}
          {/* {editModal && (
            <EditRoles
              handleShowEdit={handleShowEdit}
              handleEditRoles={handleEditRoles}
              handleCloseEdit={handleCloseEdit}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default ManageRoles;
