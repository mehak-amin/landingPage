// import React, { useState } from "react";
// import "./EditDelete.css"; // Assuming you still want to use some custom styles
// import EditRoles from "../../pages/AdminModule/ManageRoles/editRoles/EditRoles";

// function EditDdelete({ showModal, closeModal }) {
//   const [showEditModal, setShowEditModal] = useState(false);

//   const handleShowEdit = () => {
//     setShowEditModal(true);
//   };

//   const handleCloseEdit = () => {
//     setShowEditModal(false);
//   };

//   const handleDelete = () => {
//     console.log("delete");
//   };

//   if (!showModal) {
//     return null;
//   }

//   return (
//     <div className="popup-overlay" onClick={closeModal}>
//       <div className="popup" onClick={(e) => e.stopPropagation()}>
//         <button className="bttn btn-edit w-100 py-3" onClick={handleShowEdit}>
//           Edit
//         </button>

//         {showEditModal && (
//           <EditRoles
//             handleShowEdit={handleShowEdit}
//             handleCloseEdit={handleCloseEdit}
//           />
//         )}

//         <button
//           className="bttn btn-delete w-100 py-3 text-danger"
//           onClick={handleDelete}
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

// export default EditDdelete;

// ----------------------------------------------------------------
