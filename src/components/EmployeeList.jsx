import { useState } from "react";
import { RiListView } from "react-icons/ri";
const EmployeeList = ({ heading }) => {
  const [showAllEmployees, setShowAllEmployees] = useState(false);
  const employeeData = [
    {
      id: 1,
      name: "John Doe",
      profileImage: "src/assets/images.png",
      productivityPercentage: 85,
      hoursWorked: 160,
    },
    {
      id: 2,
      name: "Jane Smith",
      profileImage: "src/assets/images.png",
      productivityPercentage: 90,
      hoursWorked: 150,
    },
    {
      id: 3,
      name: "Michael Johnson",
      profileImage: "src/assets/images.png",
      productivityPercentage: 80,
      hoursWorked: 170,
    },
    {
      id: 4,
      name: "Michael Johnson",
      profileImage: "src/assets/images.png",
      productivityPercentage: 80,
      hoursWorked: 170,
    },
    {
      id: 5,
      name: "Michael Johnson",
      profileImage: "src/assets/images.png",
      productivityPercentage: 80,
      hoursWorked: 170,
    },
    {
      id: 6,
      name: "Michael Johnson",
      profileImage: "src/assets/images.png",
      productivityPercentage: 80,
      hoursWorked: 170,
    },
    {
      id: 7,
      name: "Michael Johnson",
      profileImage: "src/assets/images.png",
      productivityPercentage: 80,
      hoursWorked: 170,
    },
    {
      id: 8,
      name: "Michael Johnson",
      profileImage: "src/assets/images.png",
      productivityPercentage: 80,
      hoursWorked: 170,
    },
    {
      id: 9,
      name: "Michael Johnson",
      profileImage: "src/assets/images.png",
      productivityPercentage: 80,
      hoursWorked: 170,
    },
  ];
  function formatHoursAndMinutes(hours) {
    const totalHours = Math.floor(hours / 60);
    const minutes = hours % 60;
    return `${totalHours}h ${minutes}min`;
  }
  const visibleEmployees = showAllEmployees
    ? employeeData
    : employeeData.slice(0, 3);

  return (
    <div className="py-3 px-4 border rounded shadow card">
      <h4 className="mb-5">{heading}</h4>
      <div className="d-flex flex-column gap-4 card-body">
        {visibleEmployees.map((employee) => (
          <div key={employee.id} className="employee-card d-flex gap-3">
            <img
              src={employee.profileImage}
              alt={employee.name}
              style={{ width: "3rem", height: "3rem", objectFit: "cover" }}
            />
            <div className="employee-details" style={{ color: "gray" }}>
              <h6 className="text-decoration-underline mb-0">
                {employee.name}
              </h6>
              <div className="d-flex gap-1">
                <p className="mb-0">{employee.productivityPercentage}%</p>
                <p className="mb-0">
                  {formatHoursAndMinutes(employee.hoursWorked)} of 8h 03min
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end">
        {showAllEmployees ? (
          <button
            onClick={() => setShowAllEmployees(false)}
            className=" d-flex align-items-center gap-1 bg-transparent px-1 rounded"
          >
            View less <RiListView />
          </button>
        ) : (
          <button
            onClick={() => setShowAllEmployees(true)}
            className=" d-flex align-items-center gap-1 bg-transparent px-1 rounded"
          >
            View all <RiListView />
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
