import { library } from "@fortawesome/fontawesome-svg-core";
import React, { useState, useEffect } from "react";
import "./ManageRoles.css";
// import { PiTrashBold } from "react-icons/pi";
import { FaTrash, FaEllipsisH } from "react-icons/fa";
import EditDdelete from "../../../components/Edit-Delete-PopUp/Edit-delete";
import BASE_URI from "../../../../config";
// import {
//   addRole,
//   bulkDeleteRoles,
//   deleteRole,
//   getRoles,
//   updateRole,
// } from "../../../services/RollManagerService";
import axios from "axios";

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
  //   const [active, setActive] = useState(true);
  // const [roles, setRoles] = useState(rolesData);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [editingRole, setEditingRole] = useState(null);
  // const [dates, setDates] = useState([]);
  // const [newRoleName, setNewRoleName] = useState("");
  // const [newRoleStatus, setNewRoleStatus] = useState("active"); // Default to active
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

    //get the components of the date
    const dayOfWeek = weekDays[date.getUTCDay()];
    const day = date.getUTCDate();
    // const month = months[date.getUTCMonth()];
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    // Get hours and minutes for formatting
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format minutes with leading zero
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    // Format hours with leading zero
    const formattedHours = hours < 10 ? "0" + hours : hours;

    // Combine the components into the desired format
    return `${dayOfWeek} ${day} ${month}, ${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  useEffect(() => {
    axios
      .get(`${BASE_URI}/api/v1/roles`, {
        headers: "Bearer " + token,
      })
      .then((resp) => {
        console.log(resp.data.data.roles);
        setRoles(resp.data.data.roles);
        // });
        const fetchedRoles = resp.data.data.roles.map((role) => ({
          ...role,
          created_at: formatDate(role.created_at),
        }));
        setRoles(fetchedRoles);
      })
      .catch((err) => {
        console.error("Error fetching roles:", err);
      });
  }, [token]);
  const handleSelectAll = () => {
    if (selectedRoles.length === roles.length) {
      setSelectedRoles([]);
    } else {
      setSelectedRoles(roles.map((role) => role.id)); //[1,2,3,....]
    }
  };

  // -----------------
  // const handleAddRole = () => {
  //   axios
  //     .post(
  //       `${BASE_URI}/api/v1/roles`,
  //       {
  //         role: newRoleName,
  //         is_active: newRoleStatus === 'active' ? 1 : 0,
  //       },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     )
  //     .then((resp) => {
  //       // Role successfully added, update roles list
  //       fetchRoles();
  //       // Clear input fields
  //       setNewRoleName("");
  //       setNewRoleStatus("active"); // Reset status to active
  //       console.log("Role added successfully:", resp.data);
  //     })
  //     .catch((err) => {
  //       console.error("Error adding role:", err);
  //       // Handle error
  //     });
  // };

  // -----------------------
  // const handleAddRole = () => {
  //   axios
  //     .post(
  //       `${BASE_URI}/api/v1/roles`,
  //       {
  //         role: "Roll Name",
  //         is_active: newRoleStatus === "active" ? 1 : 0,
  //       },
  //       {
  //         headers: {
  //           Authorization: "Bearer" + token,
  //         },
  //       }
  //     )
  //     .then((resp) => {
  //       // Role successfully added, update roles list
  //       fetchRoles();
  //       // Clear input fields
  //       setNewRoleName("");
  //       setNewRoleStatus("active"); // Reset status to active
  //       console.log("Role added successfully:", resp.data);
  //     });
  // };

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
    setSelectedRoles([]); // Clear the selection after deletion
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleDelete = () => {
    console.log("deleted successfully");
    toggleModal();
  };
  const handleEdit = () => {
    console.log("edited successfully");
    toggleModal();
  };

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
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
            showModal={showModal}
            toggleModal={toggleModal}
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
