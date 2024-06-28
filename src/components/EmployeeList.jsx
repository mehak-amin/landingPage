import { useState } from "react";
import { RiListView } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import convertSecondsToTime from "../utils/formattingTime";
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

  const getData = (employee) => {
    switch (heading) {
      case "Most Productive":
        return `${convertSecondsToTime(
          employee?.modeledData?.productiveTime
        )} of ${convertSecondsToTime(employee?.modeledData?.desktime)}`;
      case "Most Unproductive":
        return `${convertSecondsToTime(
          employee?.modeledData?.unproductiveTime
        )} of ${convertSecondsToTime(employee?.modeledData?.desktime)}`;
      case "Most Effective":
        return `${convertSecondsToTime(
          employee?.modeledData?.desktime
        )} of 8h 0min`;
      case "Most Offline":
        return `${convertSecondsToTime(
          employee?.modeledData?.offlineTime
        )} of ${convertSecondsToTime(employee?.modeledData?.desktime)}`;
      default:
        return "";
    }
  };

  return (
    <div className="py-3 px-4 border rounded custom-shadow card">
      <h5 className="mb-4">{heading}</h5>
      <div className="d-flex flex-column gap-4 card-body">
        {visibleEmployees?.length > 0 ? (
          visibleEmployees?.map((employee) => (
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
                  className="rounded-circle"
                  style={{ width: "3rem", height: "3rem", objectFit: "cover" }}
                />
              )}
              <div className="employee-details mt-1" style={{ color: "gray" }}>
                <h6 className="text-decoration-underline mb-0 text-capitalize">
                  {employee.user.name}
                </h6>
                <div className="d-flex gap-1">
                  <p className="mb-0">{getMetric(employee)}</p>
                  <p className="mb-0">{getData(employee)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 d-flex align-items-center justify-content-center h-75">
            <div>
              <h5 className="text-center fw-light text-secondary">
                No, data found!
              </h5>
              {/* <p>No, tracking for this date please select another date.</p> */}
            </div>
          </div>
        )}
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
