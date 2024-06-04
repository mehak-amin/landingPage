import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaTrash, FaEllipsisH } from "react-icons/fa";
import EditDdelete from "../../../components/Edit-Delete-PopUp/Edit-delete";
import BASE_URI from "../../../../config";
// import CreateRoles from "./createRoles/Createroles";
import CreateRoles from "./createRoles/CreateRoles";
import "./ManageRoles.css";
// import { library } from "@fortawesome/fontawesome-svg-core";
// // import {
// //   addRole,
// //   bulkDeleteRoles,
// //   deleteRole,
// //   getRoles,
// //   updateRole,
// // } from "../../../services/RollManagerService";

// const rolesData = [
//   {
//     id: 1,
//     name: "Management",
//     created: "Wed 24 Apr, 2024 02:22 PM",
//     status: "Active",
//   },

//   {
//     id: 2,
//     name: "HR",
//     created: "Mon 22 Apr, 2024 03:30 PM",
//     status: "Inactive",
//   },
//   {
//     id: 3,
//     name: "UI/UX",
//     created: "Thu 25 Apr, 2024 04:45 PM",
//     status: "Inactive",
//   },
//   {
//     id: 4,
//     name: "Frontend",
//     created: "Wed 24 Apr, 2024 05:00 PM",
//     status: "Active",
//   },
//   {
//     id: 5,
//     name: "Backend",
//     created: "Wed 24 Apr, 2024 02:22 PM",
//     status: "Inactive",
//   },
// ];

function ManageRoles() {
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditDeleteModal, setShowEditDeleteModal] = useState(false);

  const handleShowCreate = () => {
    console.log("clicked");
    setShowCreateModal(true);
  };
  const handleCloseCreate = () => setShowCreateModal(false);

  const handleShowEditDelete = () => setShowEditDeleteModal(true);
  const handleCloseEditDelete = () => setShowEditDeleteModal(false);
  //   const [active, setActive] = useState(true);
  // const [roles, setRoles] = useState(rolesData);
  // const [editingRole, setEditingRole] = useState(null);
  // const [dates, setDates] = useState([]);

  // const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const formatDate = (apiDate) => {
    const date = new Date(apiDate);
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

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/roles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data.roles);
        const fetchedRoles = response.data.data.roles.map((role) => ({
          ...role,
          created_at: formatDate(role.created_at),
        }));
        setRoles(fetchedRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, [token]);

  const handleSelectAll = () => {
    if (selectedRoles.length === roles.length) {
      setSelectedRoles([]);
    } else {
      setSelectedRoles(roles.map((role) => role.id));
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedRoles((prevSelectedRoles) => {
      if (prevSelectedRoles.includes(id)) {
        return prevSelectedRoles.filter((roleId) => roleId !== id);
      } else {
        return [...prevSelectedRoles, id];
      }
    });
  };

  const handleDeleteSelected = () => {
    setRoles((prevRoles) =>
      prevRoles.filter((role) => !selectedRoles.includes(role.id))
    );
    setSelectedRoles([]);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = () => {
    console.log("Deleted successfully");
    handleCloseEditDelete();
  };

  const handleEdit = () => {
    console.log("Edited successfully");
    handleCloseEditDelete();
  };

  return (
    <div className="container mt-5">
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
          <button onClick={handleShowCreate}>show</button>
          <CreateRoles show={showCreateModal} handleClose={handleCloseCreate} />
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="text-white fw-medium">
            {selectedRoles.length} Roles Selected
          </span>
          <button
            className="btn-transparent p-2"
            onClick={handleDeleteSelected}
          >
            <FaTrash />
          </button>
          <EditDdelete
            showModal={showEditDeleteModal}
            toggleModal={handleShowEditDelete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-start">Role Name</th>
              <th className="text-center">Created</th>
              <th className="text-center">Status</th>
              <th className="text-end">Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
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
                <td className="text-end ">
                  <button
                    className="btn-transparent p-2 mr-2"
                    onClick={toggleModal}
                  >
                    <FaEllipsisH />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageRoles;
