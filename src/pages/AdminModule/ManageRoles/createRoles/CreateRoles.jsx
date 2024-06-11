import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./CreateRoles.css";
import axios from "axios";
import BASE_URI from "../../../../../config";

function CreateRoles({ handleShowCreate, handleCloseCreate }) {
  const [roleName, setRoleName] = useState("");
  const [status, setStatus] = useState("1");
  console.log(status);

  const token = localStorage.getItem("token");

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${BASE_URI}/roles`,
        {
          role: roleName,
          // is_active: 1,
          // status,
          is_active: status,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Role creation response:", response.data);

      handleClose();
    } catch (error) {
      console.error("Role creation error:", error);
    }
  };

  return (
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
  );
}

export default CreateRoles;
// import React from "react";
// import "./CreateRoles.css";

// function CreateRoles({
//   show,
//   handleClose,
//   handleDelete,
//   handleEdit,
//   editRoleData,
//   handleEditInputChange,
// }) {
//   if (!show) return null;

//   return (
//     <div className="popup-overlay">
//       <div className="popup">
//         <div className="popup-header">
//           <h3>Create Role</h3>
//           <button className="close-button" onClick={handleClose}>
//             &times;
//           </button>
//         </div>
//         <form>
//           <div className="form-group">
//             <label htmlFor="roleName">Role Name</label>
//             <input
//               type="text"
//               id="roleName"
//               name="name"
//               value={editRoleData.name}
//               onChange={handleEditInputChange}
//               placeholder="Enter Department Name...!"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="status">Status</label>
//             <select
//               id="status"
//               name="is_active"
//               value={editRoleData.is_active}
//               onChange={handleEditInputChange}
//             >
//               <option value={1}>Active</option>
//               <option value={0}>Inactive</option>
//             </select>
//           </div>
//           <div className="form-buttons">
//             <button type="button" onClick={handleClose}>
//               Cancel
//             </button>
//             <button type="button" onClick={handleEdit}>
//               Create
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateRoles;