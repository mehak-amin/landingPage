import { CiCalendar, CiFilter, CiUser } from "react-icons/ci";
// import "./pages/WorkPlanners/WorkPlanner.css";
function TableComponent() {
  // ----
  const workData = [
    {
      date: "2024-05-01",
      day: "Monday",
      employees: [
        { name: "Employee 1", activity: "Work from Office" },
        { name: "Employee 2", activity: "Meeting" },
        // Other employees and their activities for this date
      ],
    },
    {
      date: "2024-05-02",
      day: "Tuesday",
      employees: [
        { name: "Employee 1", activity: "Leave" },
        { name: "Employee 2", activity: "Work from Home" },
        // Other employees and their activities for this date
      ],
    },
    // Other dates and their respective data
  ];

  // ----
  return (
    //     <div className="table-holder overflow-auto px-7">
    //       <table class="table table-bordered ">
    //         <thead>
    //           <tr>
    //             <th
    //               scope="col "
    //               className="text-center fw-normal fs-16 line-height-custom"
    //             >

    // {/* {workData.map(({ date, day }) => (
    //     <div key={date} className="day-cell">
    //       <div className="date">{date}</div>
    //       <div className="day">{day}</div>
    //     </div>
    //   ))} */}

    //               Employess
    //             </th>
    //             <th scope="col" className="fw-normal fs-16 text-center">
    //               Monday <br />
    //               <p className="text-decoration-underline m-0">15</p>
    //             </th>
    //             <th scope="col" className="fw-normal fs-16 text-center">
    //               Tuesday <br />
    //               <p className="text-decoration-underline m-0">15</p>
    //             </th>
    //             <th scope="col" className="fw-normal fs-16 text-center">
    //               Wednesday <br />
    //               <p className="text-decoration-underline m-0">15</p>
    //             </th>
    //             <th scope="col" className="fw-normal fs-16 text-center">
    //               Thursday <br />
    //               <p className="text-decoration-underline m-0">15</p>
    //             </th>
    //             <th scope="col" className="fw-normal fs-16 text-center">
    //               Friday <br />
    //               <p className="text-decoration-underline m-0">15</p>
    //             </th>
    //             <th
    //               scope="col"
    //               className="fw-normal fs-16 text-center"
    //               style={{ color: "#ff662f" }}
    //             >
    //               Saturday <br />
    //               <p className="text-decoration-underline m-0">15</p>
    //             </th>
    //             <th
    //               scope="col"
    //               className="fw-normal fs-16 text-center"
    //               style={{ color: "#ff662f" }}
    //             >
    //               Sunday <br />
    //               <p className="text-decoration-underline m-0">15</p>
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <th scope="row " style={{ color: "#6d6d6d", width: "10rem" }}>
    //               <div className="d-flex justify-content-center align-items-center gap-1">
    //                 <span
    //                   className=""
    //                   id=""
    //                   style={{
    //                     height: "36px",
    //                     width: "36px",
    //                   }}
    //                 >
    //                   <CiUser
    //                     id="user-icon"
    //                     style={{ height: "36px", width: "36px" }}
    //                   />
    //                 </span>

    //                 <div className="fw-normal fs-16">
    //                   Basit <br /> 2h 2m/38h
    //                 </div>
    //               </div>
    //             </th>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center bg-work rounded-sm">
    //                 <p className="m-0 bg-transparent">9:00-5:00</p>
    //                 <p className="m-0 bg-transparent">office</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center bg-work rounded-sm">
    //                 <p className="m-0">15 Apr</p>
    //                 <p className="m-0">out of office</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center bg-sick rounded-sm">
    //                 <p className="m-0  rounded">15 Apr</p>
    //                 <p className="m-0 ">Sick Leave</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center  bg-trip rounded-sm">
    //                 <p className="m-0 ">15 Apr</p>
    //                 <p className="m-0">Business Trip</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}></td>
    //             <td style={{ width: "8rem" }}> </td>
    //             <td style={{ width: "8rem" }}> </td>
    //           </tr>
    //           <tr>
    //             <th scope="row " style={{ color: "#6d6d6d", width: "10rem" }}>
    //               <div className="d-flex justify-content-center align-items-center gap-1">
    //                 <span
    //                   className=""
    //                   id=""
    //                   style={{
    //                     height: "36px",
    //                     width: "36px",
    //                   }}
    //                 >
    //                   <CiUser
    //                     id="user-icon"
    //                     style={{ height: "36px", width: "36px" }}
    //                   />
    //                 </span>

    //                 <div className="fw-normal fs-16">
    //                   Basit <br /> 2h 2m/38h
    //                 </div>
    //               </div>
    //             </th>
    //             <td style={{ width: "8rem" }}></td>
    //             <td style={{ width: "8rem" }}></td>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center bg-sick rounded-sm">
    //                 <p className="m-0  rounded">15 Apr</p>
    //                 <p className="m-0 ">Sick Leave</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}></td>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center bg-work rounded-sm">
    //                 <p className="m-0">15 Apr</p>
    //                 <p className="m-0">out of office</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}> </td>
    //             <td style={{ width: "8rem" }}> </td>
    //           </tr>
    //           <tr>
    //             <th scope="row " style={{ color: "#6d6d6d", width: "10rem" }}>
    //               <div className="d-flex justify-content-center align-items-center gap-1">
    //                 <span
    //                   className=""
    //                   id=""
    //                   style={{
    //                     height: "36px",
    //                     width: "36px",
    //                   }}
    //                 >
    //                   <CiUser
    //                     id="user-icon"
    //                     style={{ height: "36px", width: "36px" }}
    //                   />
    //                 </span>

    //                 <div className="fw-normal fs-16">
    //                   Basit <br /> 2h 2m/38h
    //                 </div>
    //               </div>
    //             </th>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center  bg-trip rounded-sm">
    //                 <p className="m-0 ">15 Apr</p>
    //                 <p className="m-0">Business Trip</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}></td>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center bg-work rounded-sm">
    //                 <p className="m-0">15 Apr</p>
    //                 <p className="m-0">out of office</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center  bg-trip rounded-sm">
    //                 <p className="m-0 ">15 Apr</p>
    //                 <p className="m-0">Business Trip</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}></td>
    //             <td style={{ width: "8rem" }}> </td>
    //             <td style={{ width: "8rem" }}></td>
    //           </tr>

    //           <tr>
    //             <th scope="row " style={{ color: "#6d6d6d", width: "10rem" }}>
    //               <div className="d-flex justify-content-center align-items-center gap-1">
    //                 <span
    //                   className=""
    //                   id=""
    //                   style={{
    //                     height: "36px",
    //                     width: "36px",
    //                   }}
    //                 >
    //                   <CiUser
    //                     id="user-icon"
    //                     style={{ height: "36px", width: "36px" }}
    //                   />
    //                 </span>

    //                 <div className="fw-normal fs-16">
    //                   Basit <br /> 2h 2m/38h
    //                 </div>
    //               </div>
    //             </th>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center  bg-trip rounded-sm">
    //                 <p className="m-0 ">15 Apr</p>
    //                 <p className="m-0">Business Trip</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}></td>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center bg-work rounded-sm">
    //                 <p className="m-0">15 Apr</p>
    //                 <p className="m-0">out of office</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center  bg-trip rounded-sm">
    //                 <p className="m-0 ">15 Apr</p>
    //                 <p className="m-0">Business Trip</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}></td>
    //             <td style={{ width: "8rem" }}> </td>
    //             <td style={{ width: "8rem" }}></td>
    //           </tr>

    //           <tr>
    //             <th scope="row " style={{ color: "#6d6d6d", width: "10rem" }}>
    //               <div className="d-flex justify-content-center align-items-center gap-1">
    //                 <span
    //                   className=""
    //                   id=""
    //                   style={{
    //                     height: "36px",
    //                     width: "36px",
    //                   }}
    //                 >
    //                   <CiUser
    //                     id="user-icon"
    //                     style={{ height: "36px", width: "36px" }}
    //                   />
    //                 </span>

    //                 <div className="fw-normal fs-16">
    //                   Basit <br /> 2h 2m/38h
    //                 </div>
    //               </div>
    //             </th>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center  bg-trip rounded-sm">
    //                 <p className="m-0 ">15 Apr</p>
    //                 <p className="m-0">Business Trip</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}></td>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center bg-work rounded-sm">
    //                 <p className="m-0">15 Apr</p>
    //                 <p className="m-0">out of office</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center  bg-trip rounded-sm">
    //                 <p className="m-0 ">15 Apr</p>
    //                 <p className="m-0">Business Trip</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}></td>
    //             <td style={{ width: "8rem" }}></td>
    //             <td style={{ width: "8rem" }}></td>
    //           </tr>

    //           <tr>
    //             <th scope="row " style={{ color: "#6d6d6d", width: "10rem" }}>
    //               <div className="d-flex justify-content-center align-items-center gap-1">
    //                 <span
    //                   className=""
    //                   id=""
    //                   style={{
    //                     height: "36px",
    //                     width: "36px",
    //                   }}
    //                 >
    //                   <CiUser
    //                     id="user-icon"
    //                     style={{ height: "36px", width: "36px" }}
    //                   />
    //                 </span>

    //                 <div className="fw-normal fs-16">
    //                   Basit <br /> 2h 2m/38h
    //                 </div>
    //               </div>
    //             </th>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center  bg-trip rounded-sm">
    //                 <p className="m-0 ">15 Apr</p>
    //                 <p className="m-0">Business Trip</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}></td>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center bg-work rounded-sm">
    //                 <p className="m-0">15 Apr</p>
    //                 <p className="m-0">out of office</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}>
    //               <div className="text-center  bg-trip rounded-sm">
    //                 <p className="m-0 ">15 Apr</p>
    //                 <p className="m-0">Business Trip</p>
    //               </div>
    //             </td>
    //             <td style={{ width: "8rem" }}></td>
    //             <td style={{ width: "8rem" }}> </td>
    //             <td style={{ width: "8rem" }}></td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    <div>
      <div className="calendar-header">
        {workData.map(({ date, day }) => (
          <div key={date} className="day-cell">
            <div className="date">{date}</div>
            <div className="day">{day}</div>
          </div>
        ))}
      </div>
      <div className="employee-list">
        {workData[0]?.employees.map(({ name }) => (
          <div key={name} className="employee-cell">
            {name}
          </div>
        ))}
      </div>
      <div className="work-grid">
        {workData.map(({ employees }) => (
          <div key={employees[0].name} className="work-row">
            {employees.map(({ activity }) => (
              <div key={activity} className="work-cell">
                {activity}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableComponent;
