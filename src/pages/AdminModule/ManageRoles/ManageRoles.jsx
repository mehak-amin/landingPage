import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaTrash, FaEllipsisH } from "react-icons/fa";
import EditDdelete from "../../../components/Edit-Delete-PopUp/Edit-delete";
import BASE_URI from "../../../../config";
import CreateRoles from "./createRoles/CreateRoles";
import "./ManageRoles.css";
import Header from "../../../components/Header";

function ManageRoles() {
  const [roles, setRoles] = useState([]); //roles container
  const [selectedRoles, setSelectedRoles] = useState([]); //selected role container
  const [showCreateModal, setShowCreateModal] = useState(false); //shows createRole modal
  const [showEditDeleteModal, setShowEditDeleteModal] = useState(false); //shows edit/delete modal

  // const [status, setStatus] = useState("1");
  const [startDate, setStartDate] = useState(new Date()); //sabreena
  // const [editRole, setEditRole] = useState(null); //
  // const [editRoleData, setEditRoleData] = useState({ name: "", is_active: 1 }); //not noted yet

  const handleShowCreate = () => setShowCreateModal(true); //shows create modal
  const handleCloseCreate = () => setShowCreateModal(false); //close create modal
  const handleShowEditDelete = (role) => {
    console.log("showeditdeletemodal");
    setShowEditDeleteModal(true);
    // setEditRole(role);
    // setEditRoleData({ name: role.name });
    // setEditRoleData({ name: role.name, is_active: role.is_active });
  }; // shows edit/delete modal
  const handleCloseEditDelete = () => {
    setShowEditDeleteModal(false);
    // setEditRole(null);
  }; //close edit/delete modal.

  const token = localStorage.getItem("token");

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

  //get Roles API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/roles`, {
          headers: {
            Authorization: "Bearer " + token,
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

  //delete selected🗑️
  // const handleDeleteSelected = (e) => {
  //   //e.preventDefault();
  //   setRoles((prevRoles) =>
  //     prevRoles.filter((role) => !selectedRoles.includes(role.id))
  //   );
  //   setSelectedRoles([]);
  // };

  // const handleDeleteSelected = () => {
  //   const updatedRoles = roles.filter(
  //     (role) => !selectedRoles.includes(role.id)
  //   );
  //   setRoles(updatedRoles);
  //   setSelectedRoles([]);
  // };

  return (
    <div className="container mt-5">
      <Header
        heading="Manage Roles"
        isDate={true}
        isFilter={false}
        btnName="Create Role"
        selectedStartDate={startDate}
        setSelectedStartDate={setStartDate}
      />
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
          {/* <CreateRoles
            handleShowCreate={showCreateModal}
            handleCloseCreate={handleCloseCreate}
          /> */}
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="text-white fw-medium">
            {selectedRoles.length} Roles Selected
          </span>
          <button
            className="btn-transparent p-2"
            // onClick={handleDeleteSelected}
          >
            <FaTrash />
          </button>
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
                    onClick={() => handleShowEditDelete(role)}
                  >
                    <FaEllipsisH />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showEditDeleteModal && (
          <EditDdelete
            showModal={showEditDeleteModal}
            closeModal={handleCloseEditDelete}
          />
        )}
        {showCreateModal && (
          <CreateRoles
            handleShowCreate={handleShowCreate}
            handleCloseCreate={handleCloseCreate}
          />
        )}
      </div>
    </div>
  );
}

export default ManageRoles;
