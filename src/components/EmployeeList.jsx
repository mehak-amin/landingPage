import { useState } from "react";
import { RiListView } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
const EmployeeList = ({ heading, data }) => {
  const [showAllEmployees, setShowAllEmployees] = useState(false);
  const visibleEmployees =
    showAllEmployees && data?.length > 4 ? data : data?.slice(0, 3);

  const getMetric = (employee) => {
    switch (heading) {
      case "Most Productive":
        return `${employee.modeledData.productivity.toFixed(2)}%`;
      case "Most Unproductive":
        return `${employee.modeledData.unproductivity.toFixed(2)}%`;
      case "Most Effective":
        return `${employee.modeledData.effectiveness.toFixed(2)}%`;
      case "Most Offline":
        return `${employee.modeledData.offlineTime.toFixed(2)}%`;
      default:
        return "";
    }
  };

  return (
    <div className="py-3 px-4 border rounded shadow card">
      <h4 className="mb-5">{heading}</h4>
      <div className="d-flex flex-column gap-4 card-body">
        {visibleEmployees?.map((employee) => (
          <div
            key={employee.user.user_id}
            className="employee-card d-flex gap-3"
          >
            {employee.user.picture === "" ? (
              <FaUserCircle className="fs-1" />
            ) : (
              <img
                src={employee.user.picture}
                alt=""
                style={{ width: "3rem", height: "3rem", objectFit: "cover" }}
              />
            )}
            <div className="employee-details" style={{ color: "gray" }}>
              <h6 className="text-decoration-underline mb-0">
                {employee.user.name}
              </h6>
              <div className="d-flex gap-1">
                <p className="mb-0">{getMetric(employee)}</p>
                <p className="mb-0">
                  {/* {formatHoursAndMinutes(employee.hoursWorked)} of 8h 03min */}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleEmployees?.length > 4 && (
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
      )}
    </div>
  );
};

export default EmployeeList;
