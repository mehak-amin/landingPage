import React from "react";
import { Modal } from "react-bootstrap";
import "./EditDelete.css";

function EditDdelete({ showModal, toggleModal, handleDelete, handleEdit }) {
  return (
    <>
      <Modal
        className="custom-modal "
        // dialogClassName="custom-modal"
        show={showModal}
        onHide={toggleModal}
      >
        <Modal.Body className="p-0">
          {/* <div className="border d-inline"> */}
          <button
            className="bttn btn-delete w-100 py-3 "
            variant="danger"
            onClick={handleDelete}
          >
            Edit
          </button>
          {/* </div> */}
          {/* <div> */}
          <button
            className=" bttn w-100 py-3   text-danger "
            variant="primary"
            onClick={handleEdit}
          >
            Delete
          </button>
          {/* </div> */}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditDdelete;
