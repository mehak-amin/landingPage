import React, { useState } from "react";
import "./EditDelete.css"; // Assuming you still want to use some custom styles
import EditRoles from "../../pages/AdminModule/ManageRoles/editRoles/EditRoles";

function EditDdelete({ showModal, closeModal }) {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="popup-overlay" onClick={closeModal}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="bttn btn-edit w-100 py-3" onClick={handleShowEdit}>
          Edit
        </button>

        {showEditModal && (
          <EditRoles
            handleShowEdit={handleShowEdit}
            handleCloseEdit={handleCloseEdit}
          />
        )}

        <button
          className="bttn btn-delete w-100 py-3 text-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EditDdelete;

// ----------------------------------------------------------------
// import React, { useState } from "react";
// import { Modal } from "react-bootstrap";
// import "./EditDelete.css";
// // import editRoles from "../../pages/AdminModule/ManageRoles/editRoles/EditRoles";
// import EditRoles from "../../pages/AdminModule/ManageRoles/editRoles/EditRoles";

// function EditDdelete({ showModal, closeModal }) {
//   const [showEditModal, setShowEditModal] = useState(false); //shows edit modal
//   const handleShowEdit = () => {
//     console.log("showEditModal");
//     setShowEditModal(true);
//   };
//   const handleCloseEdit = () => {
//     setShowEditModal(false);
//   };
//   //edit in edit/delete modal
//   // const handleEdit = async () => {
//   //   setShowEditModal(true);
//   //   console.log("edit");
//   // };
//   //delete in edit/delete modal
//   const handleDelete = () => {
//     console.log("delete");
//   };
//   return (
//     <>
//       <Modal className="custom-modal " show={showModal} onHide={closeModal}>
//         <Modal.Body className="p-0">
//           <button
//             className="bttn btn-delete w-100 py-3 "
//             variant="danger"
//             onClick={handleShowEdit}
//           >
//             Edit
//           </button>

//           {showEditModal && (
//             <EditRoles
//               handleShowEdit={handleShowEdit}
//               handleCloseEdit={handleCloseEdit}
//             />
//           )}
//           <button
//             className=" bttn w-100 py-3   text-danger "
//             variant="primary"
//             onClick={handleDelete}
//           >
//             Delete
//           </button>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default EditDdelete;
