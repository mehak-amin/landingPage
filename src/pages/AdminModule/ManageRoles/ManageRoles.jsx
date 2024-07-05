import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { FaTrash, FaEllipsisH } from "react-icons/fa";
import BASE_URI from "../../../../config";
import CreateRoles from "./createRoles/CreateRoles";
import "./ManageRoles.css";
import Header from "../../../components/Header";
import SearchInput from "../../../components/SearchInput";
import SortButton from "../../../components/Button/SortButton";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { Modal, Button, Form } from "react-bootstrap";
import { ShimmerTable } from "react-shimmer-effects";
import toast, { Toaster } from "react-hot-toast";

function ManageRoles() {
  const [roles, setRoles] = useState([]); //roles container
  const [selectedRoles, setSelectedRoles] = useState([]); //selected role container
  const [showCreateModal, setShowCreateModal] = useState(false); //shows createRole modal
  // const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [editOrDeletePopUp, setEditOrDeletePopUp] = useState(""); //editDeletePOPup
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
  const [errorMessage, setErrorMessage] = useState("");

  //   const [editOrDeletePopUp, setEditOrDeletePopUp] = useState(null); // Track which popup is open
  const sortButtonRef = useRef(null);
  // const popupRefs = useRef([]); // Store refs for each edit/delete popup
  const popupRefs = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortButtonRef.current &&
        !sortButtonRef.current.contains(event.target)
      ) {
        setIsSort(false);
      }
      if (popupRefs.current && !popupRefs.current.contains(event.target)) {
        setEditOrDeletePopUp(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  //get Roles API
  let url = `${BASE_URI}/roles?search=${search}&sort=${sortCriteria}&direction=${sortOrder}`;
  useEffect(() => {
    fetchRoles();
  }, [token, url]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response);
      console.log(response.data.data.roles);
      response.data.data.roles.forEach((role) => {
        console.log(role.role); // Logs each role name (e.g., "admin", "Manager", "user")
        setRoleName(role.role); //user
        console.log(roleName); //user
      });
      // setError(false);
      setErrorMessage("");

      const fetchedRoles = response.data.data.roles.map((role) => ({
        ...role,
        created_at: formatDate(role.created_at),
      }));

      setRoles(fetchedRoles);

      // setErrorMessage("");//check
    } catch (error) {
      // setError(true);
      setErrorMessage("No data found");
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    fetchRoles(e.target.value);
  };

  // -------------get role to edit role-------------------------
  const getSingleRole = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${BASE_URI}/roles/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setRoleName(response.data.data.roles[0].role);
      console.log(response.data.data.roles[0].role);
      setStatus(response.data.data.roles[0].is_active);
      setEditModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleEdit = () => {
  //   getSingleRole();
  //   setEditModal(true);
  // };
  const handleShowEdit = () => {
    console.log("edit clicked");
    getSingleRole();
    setEditModal(true);
  };

  //---------------------------edit in editDelete----------------------------
  const handleEditRole = async () => {
    try {
      await axios({
        method: "PATCH",
        url: `${BASE_URI}/roles/${id}`,
        data: {
          role: roleName,
          is_active: status,
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      // setRoleName(response.data.data[0].role);
      // console.log(roleName);
      fetchRoles();

      setEditModal(false);
      toast.success("Roles updated successfully!", {
        position: "top-right",
      });
    } catch (err) {
      toast.error("Failed to update role", {
        position: "top-right",
      });
      console.log(err);
    }
  };

  //------------------selectAll btn click fxn-----------------------
  const handleSelectAll = () => {
    if (selectedRoles.length === roles.length) {
      setSelectedRoles([]);
    } else {
      setSelectedRoles(roles.map((role) => role.id));
    }
  };

  //-------------------checkbox click fxn--------------------------
  const handleCheckboxChange = (id) => {
    setSelectedRoles((prevSelectedRoles) => {
      if (prevSelectedRoles.includes(id)) {
        return prevSelectedRoles.filter((roleId) => roleId !== id);
      } else {
        return [...prevSelectedRoles, id];
      }
    });
  };

  //------------------delete in editDelete-------------------------
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
      fetchRoles();
      console.log(response);
      console.log("Role deleting response:", response.data);
      toast.success("Roles deleted successfully!", {
        position: "top-right",
      });
    } catch (err) {
      toast.error("Failed deleting role", {
        position: "top-right",
      });
      console.error("Error deleting role:", err);
    }
  };

  //----------------------delete selected🗑️------------------------
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
      fetchRoles();
      // After successful deletion, update state or fetch roles again
      // For example, refetch roles after deletion
      // fetchRoles();

      // Clear the selectedRoles state after deletion
      setSelectedRoles([]);
    } catch (err) {
      console.error("Error deleting selected roles:", err);
    }
  };

  return (
    <div className="manageRolesWrapper container mt-5 px-0">
      <Header
        heading="Manage Roles"
        isDate={false}
        isFilter={false}
        btnName="Create Role"
        handleClick={handleShowCreate}
        selectedStartDate={startDate}
        setSelectedStartDate={setStartDate}
      />
      {/*------------------------- edit modal------------------------------ */}
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
      <div className="main-content-holder px-5">
        {/* -------------------------serch & sort------------------------ */}
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
                ref={sortButtonRef}
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
                    <option value="role">role</option>
                    <option value="created_at">created at</option>
                    <option value="is_active">status</option>
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

        {/*---------------------main UI -----------------------*/}
        {loading ? (
          <ShimmerTable row={5} col={5} />
        ) : (
          <div>
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
              <div className="selected-delete-holder d-flex align-items-center gap-3">
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
            {/* ------------------------table------------------------- */}
            <div className=" table-responsive">
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
                  {
                    // loading ? (
                    //   <tr>
                    //     <td colSpan="4" className="text-center">
                    //       Loading...
                    //     </td>
                    //   </tr>
                    // ) :
                    errorMessage ? (
                      <tr>
                        <td colSpan="4">{errorMessage}</td>
                      </tr>
                    ) : (
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

                          <td
                            className="text-center position-relative"
                            onClick={() => {
                              toggleEditOrDeletePopUp(role.id);
                              setId(role.id);
                            }}
                          >
                            <FaEllipsisH />
                            {editOrDeletePopUp[role.id] && (
                              <div
                                className="position-absolute top-50 right-10 translate-middle-x  z-3 border bg-white"
                                ref={popupRefs}
                              >
                                <h6
                                  className="py-3 px-5 border-bottom cursor-pointer"
                                  onClick={handleShowEdit}
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
                    )
                  }
                </tbody>
                {/* )} */}
              </table>
              <Toaster position="top-right" />
              {showCreateModal && (
                <CreateRoles
                  handleShowCreate={handleShowCreate}
                  handleCloseCreate={handleCloseCreate}
                  fetchRoles={fetchRoles}
                  showToast={toast}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageRoles;
