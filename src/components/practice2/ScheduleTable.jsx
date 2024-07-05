// import React, { useState, useEffect } from "react";
// import Image1 from "../../assets/istockphoto-488558342-1024x1024.jpg";
// import Image2 from "../../assets/istockphoto-841971598-1024x1024.jpg";
// import Image3 from "../../assets/istockphoto-1180407386-1024x1024.jpg";
// import Image4 from "../../assets/istockphoto-1195544410-1024x1024.jpg";
// import Image5 from "../../assets/istockphoto-1437816897-1024x1024.jpg";
// // import Image6 from "../../../assets/istockphoto-1476170969-1024x1024.jpg";
// // import "bootstrap/dist/css/bootstrap.min.css";
// import "./ScheduleTable.css"; // Import custom CSS for additional styling
// // import "./ScheduleTable.css";

// const ScheduleTable = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const time = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
//   const timeSlots = [
//     "10:00",
//     "10:30",
//     "11:00",
//     "11:30",
//     "12:00",
//     "12:30",
//     "13:00",
//     "13:30",
//     "14:00",
//     "14:30",
//     "15:00",
//     "15:30",
//     "16:00",
//   ];
//   const data = [
//     {
//       id: "1",
//       profile: Image1,
//       name: "Jasia Hassan",
//       role: "Backend Developer",
//       // avatar: "https://via.placeholder.com/40", // Placeholder for avatar image
//       cells: [
//         {
//           start: "10:00",
//           end: "12:00",
//           content: "Business Trip",
//           type: "business-trip",
//         },
//       ],
//     },
//     {
//       id: "2",
//       profile: Image2,
//       name: "Basit",
//       role: "UI/UX Designer",
//       // avatar: "https://via.placeholder.com/40",
//       cells: [
//         {
//           start: "12:00",
//           end: "16:00",
//           content: "Sick Leave",
//           type: "sick-leave",
//         },
//       ],
//     },
//     {
//       id: "3",
//       profile: Image3,
//       name: "Basit",
//       role: "UI/UX",
//       // avatar: "https://via.placeholder.com/40",
//       cells: [
//         {
//           start: "12:00",
//           end: "13:30",
//           content: "Sick Leave",
//           type: "sick-leave",
//         },
//       ],
//     },
//     {
//       id: "4",
//       profile: Image4,
//       name: "Basit",
//       role: "UI/UX",
//       // avatar: "https://via.placeholder.com/40",
//       cells: [
//         {
//           start: "12:00",
//           end: "13:00",
//           content: "Sick Leave",
//           type: "sick-leave",
//         },
//       ],
//     },
//     {
//       id: "5",
//       profile: Image5,
//       name: "Basit",
//       role: "UI/UX",
//       // avatar: "https://via.placeholder.com/40",
//       cells: [
//         {
//           start: "14:00",
//           end: "16:00",
//           content: "Sick Leave",
//           type: "sick-leave",
//         },
//       ],
//     },
//   ];

//   //current date

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentDate(new Date());
//     }, 1000); // Update every second

//     return () => clearInterval(timer); // Cleanup timer on component unmount
//   }, []);

//   const formattedDate = currentDate.toLocaleDateString("en-US", {
//     // year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   const calculateColSpan = ({ start, end }) => {
//     const startIndex = timeSlots.indexOf(start);
//     const endIndex = timeSlots.indexOf(end);
//     return endIndex - startIndex;
//   };

//   const renderRowCells = (row) => {
//     const cells = [];
//     const totalColumns = timeSlots.length;
//     for (let i = 0; i < totalColumns; i++) {
//       let foundContent = false;
//       for (let j = 0; j < row.cells.length; j++) {
//         const cell = row.cells[j];
//         const startIndex = timeSlots.indexOf(cell.start);
//         const endIndex = timeSlots.indexOf(cell.end);
//         if (i >= startIndex && i < endIndex) {
//           const colspan = calculateColSpan(cell);
//           const cellContent = i === startIndex ? cell.content : null; // Render content only in the starting cell
//           cells.push(
//             <td
//               key={i}
//               colSpan={colspan}
//               className={`activity-cell p-1 `}
//               // className="activity-cell business-trip bg-primary"
//             >
//               <div className={`${cell.type}`}>
//                 {formattedDate}
//                 <br />
//                 {cellContent}
//               </div>
//             </td>
//           );
//           foundContent = true;
//           i = endIndex - 1; // Skip the indices covered by colspan
//           break;
//         }
//       }
//       if (!foundContent) {
//         cells.push(<td key={i}></td>); // Empty cell if no content found for this column
//       }
//     }
//     return cells;
//   };

//   // const ScheduleTable = () => {
//   const renderTableHeader = () => (
//     <tr>
//       {/* <th>Employees</th>
//       {timeSlots.map((time, index) => (
//         <th key={index}>{time}</th>
//       ))} */}
//       <th scope="col" className="text-center sticky-left px-7">
//         Employees
//       </th>
//       {time.map((time, index) => (
//         <th
//           key={index}
//           colspan={2}
//           className="fixed-width-header text-left px-7"
//         >
//           {time}
//         </th>
//       ))}
//     </tr>
//   );

//   const renderTableData = () => {
//     return data.map((row) => (
//       <tr key={row.id} className="p-0">
//         <th className="employee-cell sticky-left">
//           <div className="employeId d-flex align-items-center justify-content-start w-100 px-3 gap-4 text-secondary">
//             <div className="profile-holder">
//               <img src={row.profile} alt={row.name} className="user-profile" />
//             </div>
//             <div className="fs-16 fw-normal">
//               <div className="fw-semibold m-0 text-start">{row.name}</div>
//               <div className="fs-vsmall m-0">{row.role}</div>
//             </div>
//           </div>
//         </th>

//         {renderRowCells(row)}
//       </tr>
//     ));
//   };

//   return (
//     <div className="day-calandar d-flex py-2 bg-body table-responsive">
//       <div className="calendar">
//         <div className="calendar-slider">
//           <table className="table table-bordered">
//             <thead>{renderTableHeader()}</thead>
//             <tbody>{renderTableData()}</tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScheduleTable;
import React, { useState } from "react";
import axios from "axios";
import BASE_URI from "../../../config";
import ModalComponent from "../Modal/ModalComponent";

import { Link } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

import formatDateToIST from "../../utils/formatDateToIST";
import { RxDotsHorizontal } from "react-icons/rx";

function ScheduleTable() {
  const [isEdited, setIsEdited] = useState(false);
  const [departmentData, setDepartmentData] = useState("");
  const [deptName, setDeptName] = useState("");
  const [id, setId] = useState("");

  const [isSort, setIsSort] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [search, setSearch] = useState("");

  const [editOrDeletePopUp, setEditOrDeletePopUp] = useState("");

  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const token = localStorage.getItem("token");
  // ----------------------------------------------------------------------------------------------------------
  let url = `${BASE_URI}/departments?search=${search}&sort=${sortCriteria}&direction=${sortOrder}`;

  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, isLoading, error, refetch } = useFetch(url, fetchOptions);
  const departmentsData = data?.data || [];

  const getSingleDepartment = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${BASE_URI}/departments/${id}`,

        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setDepartmentData(response.data.data[0].department_name);
      console.log(response.data.data[0].department_name);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = () => {
    getSingleDepartment();
    setIsEdited(!isEdited);
  };

  const handleEditDepartment = async () => {
    try {
      await axios({
        method: "PATCH",
        url: `${BASE_URI}/departments/${id}`,
        data: {
          department_name: departmentData,
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      refetch();
      setIsEdited(false);
      setEditOrDeletePopUp(false);
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  // ----------------------------------------------------------------------------------------------------------

  const handleCloseEdit = () => {
    setIsEdited(false);
  };
  const toggleEditOrDeletePopUp = (id) => {
    setEditOrDeletePopUp((prevEditOrDeletePopUp) => ({
      ...prevEditOrDeletePopUp,
      [id]: !prevEditOrDeletePopUp[id],
    }));
  };

  return (
    <div>
      {isEdited && (
        <ModalComponent
          heading="Edit Department"
          handleClose={handleCloseEdit}
          handleClick={handleEditDepartment}
          btn1="Cancel"
          btn2="Update"
        >
          <div className="py-3">
            <label htmlFor="" className="d-block mb-1">
              Deapartment Name
            </label>
            <input
              type="text"
              value={departmentData}
              className="px-3 py-2 rounded border w-100"
              onChange={(e) => setDepartmentData(e.target.value)}
            />
          </div>
        </ModalComponent>
      )}
      <div>
        <table className="table table-borderless">
          {/* <thead>
            <tr>
              <th className="border-0 text-start py-2 ps-5">Department Name</th>
              <th className="border-0 py-2 text-center">Created</th>
              <th className="border-0 py-2 text-center">Members</th>
              <th className="border-0 py-2 text-center">Edit/Delete</th>
            </tr>
          </thead> */}
          <tbody>
            {departmentsData &&
              departmentsData?.map((department, departmentIndex) => (
                <tr key={departmentIndex}>
                  <td className="py-3 ps-5 text-capitalize">
                    <input
                      type="checkbox"
                      className="d-inline border-0 me-2"
                      style={{ width: "1rem", height: "1rem" }}
                      checked={selectedDepartments.includes(department.id)}
                      onChange={() => handleCheckboxChange(department.id)}
                    />
                    {department?.department_name}
                  </td>
                  <td className="text-center py-3">
                    {formatDateToIST(department?.created_at)}
                  </td>
                  <td className="text-center py-3">
                    <Link
                      to={`departmentMembers/${department.id}`}
                      className="link-dark text-decoration-none"
                    >
                      {department?.member_count}
                    </Link>
                  </td>
                  <td className="text-center position-relative py-3">
                    <RxDotsHorizontal
                      className="fs-4 cursor-pointer"
                      onClick={() => {
                        toggleEditOrDeletePopUp(department.id);
                        setId(department.id);
                      }}
                    />
                    {editOrDeletePopUp[department.id] && (
                      <div className="position-absolute top-75 start-50 translate-middle-x  z-3 border bg-white">
                        <h6
                          className="py-3 px-5 border-bottom cursor-pointer"
                          onClick={handleEdit}
                        >
                          Edit
                        </h6>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScheduleTable;
