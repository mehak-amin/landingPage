import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./CreateRoles.css";

function CreateRoles({ show, handleClose }) {
  const [roleName, setRoleName] = useState("");
  const [status, setStatus] = useState("Active");

  const handleCreate = () => {
    // Handle the creation logic here
    console.log("Role Name:", roleName);
    console.log("Status:", status);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="bg-darkgray d-flex justify-content-between no-border-radius">
        <Modal.Title className="text-white">Create Role</Modal.Title>
        <div
          className="text-white close-btn d-flex justify-content-center align-items-center fs-2"
          onClick={handleClose}
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
              <option>Active</option>
              <option>Inactive</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex gap-4 ">
          <Button className="px-4" variant="secondary" onClick={handleClose}>
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
  );
}

export default CreateRoles;
