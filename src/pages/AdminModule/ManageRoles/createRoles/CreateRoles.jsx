import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./CreateRoles.css";
import axios from "axios";
import BASE_URI from "../../../../../config";

// import "react-hot-toast/dist/index.css";

function CreateRoles({
  handleShowCreate,
  handleCloseCreate,
  fetchRoles,
  showToast,
}) {
  const [roleName, setRoleName] = useState("");

  const [status, setStatus] = useState("1");
  console.log(status);
  const token = localStorage.getItem("token");
  const handleCreate = async () => {
    console.log("creating role");
    try {
      const response = await axios.post(
        `${BASE_URI}/roles`,
        {
          role: roleName,
          is_active: status,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      fetchRoles();
      console.log("Displaying success toast");
      showToast.success("Role created successfully!");
      console.log("Role creation response:", response.data);

      handleCloseCreate();
    } catch (error) {
      console.log("Displaying error toast");
      showToast.error("Error creating role");
      console.error("Role creation error:", error);
    }
  };

  return (
    <div>
      <Modal show={handleShowCreate} onHide={handleCloseCreate}>
        <Modal.Header className="bg-darkgray d-flex justify-content-between no-border-radius">
          <Modal.Title className="text-white">Create Role</Modal.Title>
          <div
            className="text-white close-btn d-flex justify-content-center align-items-center fs-2"
            onClick={handleCloseCreate}
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
                placeholder="Enter Department Name...!"
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
              onClick={handleCloseCreate}
            >
              Cancel
            </Button>
            <Button
              className="px-4 bg-darkgray"
              variant="primary"
              onClick={handleCreate}
            >
              Create
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateRoles;
