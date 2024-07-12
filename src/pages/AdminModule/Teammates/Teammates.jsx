import "./Teammates.css";

import Header from "../../../components/Header";

import SearchInput from "../../../components/SearchInput";
import FilterButton from "../../../components/Button/FilterButton";
import SortButton from "../../../components/Button/SortButton";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import BASE_URI from "../../../../config";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import ModalComponent from "../../../components/Modal/ModalComponent";
import { FaSlack, FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { convertDate } from "../../../utils/formattingDate";
import { ShimmerTable } from "react-shimmer-effects";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";

const Teamates = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [isFilter, setIsFilter] = useState(false);
  const [applyFilter, setApplyFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [addTeamMember, setAddTeamMember] = useState(false);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    department_id: "",
    role: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filterPopupRef = useRef(null);
  const sortPopupRef = useRef(null);

  const itemsPerPage = 4;
  const formattedStartDate = convertDate(startDate);

  const token = localStorage.getItem("token");

  let url = `${BASE_URI}/admin/emplReport?date=${formattedStartDate}&tab=${activeTab}`;

  if (sortCriteria && sortOrder) {
    url += `&sort_by=${sortCriteria}&sort_direction=${sortOrder}`;
  }

  if (selectedItems.length > 0 && applyFilter) {
    url += `&department[0]=${selectedItems}`;
  }

  if (search) {
    url += `&search=${search}`;
  }
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, isLoading, error, refetch } = useFetch(url, fetchOptions);

  const teamsData = useMemo(() => data || {}, [data]);

  const {
    absentCount,
    employeesCount,
    lateCount,
    outstream,
    slackingCount,
    workingCount,
  } = teamsData;

  const handleClickOutside = (event) => {
    if (
      filterPopupRef.current &&
      !filterPopupRef.current.contains(event.target)
    ) {
      setIsFilter(false);
    }
    if (sortPopupRef.current && !sortPopupRef.current.contains(event.target)) {
      setIsSort(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URI}/departments`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setDepartments(
          res.data.data.filter((department) => department.is_active === 1)
        );
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
        });
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URI}/roles`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setRoles(res.data.data.roles.filter((role) => role.is_active === 1));
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
        });
      });
  }, []);

  const totalPages = Math.ceil(outstream?.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return outstream?.slice(startIndex, endIndex);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(`${BASE_URI}/employee/addUser`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        setLoading(false);
        if (resp.data.status === "Success") {
          setAddTeamMember(false);
        }
        setFormData({ fullname: "", email: "", department_id: "", role: "" });
        refetch();
        toast.success("New Team Member added successfully", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
        });
        setLoading(false);
      });
  };

  const handleCheckboxChange = (departmentId) => {
    if (selectedItems.includes(departmentId)) {
      setSelectedItems(selectedItems.filter((id) => id !== departmentId));
    } else {
      setSelectedItems([...selectedItems, departmentId]);
    }
    setApplyFilter(false);
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(departments.map((department) => department.id));
    }
    setSelectAll(!selectAll);
    setApplyFilter(false);
  };

  const handleSetDepartments = () => {
    setApplyFilter(true);
    setIsFilter(false);
  };

  const handleReset = () => {
    setSelectAll(false);
    setApplyFilter(false);
    setSelectedItems([]);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const sideHeadings = [
    "Department",
    "Arrived at",
    "Left at",
    "Productive Time",
    "Offline Time",
    "Active App",
    "Active Project",
    "Desktime",
  ];

  function secondsToHoursMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }

  const handleShowModal = () => {
    setAddTeamMember(true);
  };
  const closeModal = () => {
    setAddTeamMember(false);
    setFormData({ fullname: "", email: "", department_id: "", role: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={i === currentPage}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={i === currentPage}
            >
              {i}
            </button>
          );
        }
        buttons.push(<span key="ellipsis1">...</span>);
        buttons.push(
          <button
            key={totalPages}
            onClick={() => handleClick(totalPages)}
            disabled={totalPages === currentPage}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 3) {
        buttons.push(
          <button
            key={1}
            onClick={() => handleClick(1)}
            disabled={1 === currentPage}
          >
            1
          </button>
        );
        buttons.push(<span key="ellipsis2">...</span>);
        for (let i = totalPages - 4; i <= totalPages; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={i === currentPage}
            >
              {i}
            </button>
          );
        }
      } else {
        buttons.push(
          <button
            key={1}
            onClick={() => handleClick(1)}
            disabled={1 === currentPage}
          >
            1
          </button>
        );
        buttons.push(<span key="ellipsis3">...</span>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={i === currentPage}
            >
              {i}
            </button>
          );
        }
        buttons.push(<span key="ellipsis4">...</span>);
        buttons.push(
          <button
            key={totalPages}
            onClick={() => handleClick(totalPages)}
            disabled={totalPages === currentPage}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="container-xxxl px-0">
      <Header
        heading="Team Members"
        isDate={true}
        isMonthFilter={false}
        btnName="Add Team Members"
        selectedStartDate={startDate}
        setSelectedStartDate={setStartDate}
        handleClick={handleShowModal}
      />

      <div className=" pt-4 bg-lightGray1">
        <div className="d-md-flex gap-6 mb-3 px-md-5 px-3 position-relative">
          <SearchInput
            placeholder="Search team member...!"
            value={search}
            setValue={setSearch}
          />

          <div className="d-flex gap-4 mt-3 mt-md-0">
            <div ref={filterPopupRef}>
              <div
                className="border-0 bg-white rounded py-2 py-md-0 h-100"
                onClick={() => setIsFilter(!isFilter)}
              >
                <FilterButton />
              </div>

              {isFilter && (
                <div
                  className="z-3 position-absolute bg-white custom-shadow positioning-points"
                  style={{
                    width: "18rem",
                  }}
                >
                  <div className="py-2 px-4 fs-5 fw-light flex align-items-center gap-5">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                      style={{ width: "1rem", height: "1rem" }}
                    />
                    <label htmlFor="">Select all</label>
                  </div>

                  <div className="py-3 px-4 border-top">
                    <SearchInput placeholder="Search" />
                  </div>

                  <ul className="list-unstyled fs-5 fw-light">
                    {departments.map((department) => {
                      return (
                        <li
                          className="py-2 px-4 border-top border-bottom flex align-items-center gap-5"
                          key={department.id}
                        >
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(department.id)}
                            onChange={() => handleCheckboxChange(department.id)}
                            style={{ width: "1rem", height: "1rem" }}
                          />
                          <label htmlFor="">{department.department_name}</label>
                        </li>
                      );
                    })}

                    <li className="pt-3 px-4 border-top d-flex align-items-center justify-content-between">
                      <button
                        className=" border px-3 text-center py-1 rounded fw-light shadow cursor-pointer fs-5 bg-transparent"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                      <button
                        className=" border  text-center px-3 py-1 rounded bg-gray text-white shadow cursor-pointer fs-5"
                        onClick={handleSetDepartments}
                      >
                        Apply
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div ref={sortPopupRef}>
              <div
                className="border-0 bg-white rounded h-100"
                onClick={() => setIsSort(!isSort)}
              >
                <SortButton />
              </div>

              {isSort && (
                <div
                  className="z-3 position-absolute bg-white custom-shadow"
                  style={{ top: "115%", left: "-40%" }}
                >
                  <div className="px-3 py-2">
                    <select
                      value={sortCriteria}
                      onChange={handleSortCriteriaChange}
                      className="py-1 rounded"
                    >
                      <option value="" disabled>
                        --Select--
                      </option>
                      <option value="name">Name</option>
                      <option value="status">Status</option>
                      <option value="productiveTime">Productive Time</option>
                      <option value="offlineTime">Offline Time</option>
                      <option value="deskTime">DeskTime</option>
                      <option value="arrivedAt">Arrived at</option>
                      <option value="leftAt">Left at</option>
                      <option value="timeAtWork">At work</option>
                      <option value="activeApp">Active app</option>
                      <option value="activeProject">Active project</option>
                    </select>
                  </div>

                  <div className="d-flex flex-direction-column">
                    <label className="d-flex align-items-center gap-3 px-4 py-2 border-top border-bottom">
                      <input
                        type="radio"
                        value="asc"
                        checked={sortOrder === "asc"}
                        onChange={handleSortOrderChange}
                      />
                      Ascending <IoIosArrowRoundUp />
                    </label>
                    <label className="d-flex align-items-center gap-3 px-4 py-2 ">
                      <input
                        type="radio"
                        value="desc"
                        checked={sortOrder === "desc"}
                        onChange={handleSortOrderChange}
                      />
                      Descending <IoIosArrowRoundDown />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <ShimmerTable row={5} col={5} />
        ) : (
          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: "50rem" }}>
              <div className="d-flex px-4 pt-4 gap-3 ms-2">
                <div
                  className={`d-flex gap-4 px-3 py-2  ${
                    activeTab === "employees"
                      ? "bg-gray text-white"
                      : "bg-white"
                  }`}
                  onClick={() => setActiveTab("employees")}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="mb-0 fw-normal">Employees</h5>
                  <h5 className="mb-0 fw-normal">{employeesCount}</h5>
                </div>
                <div
                  className={`d-flex gap-4 px-3 py-2  ${
                    activeTab === "working" ? "bg-gray text-white" : "bg-white"
                  }`}
                  onClick={() => setActiveTab("working")}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="mb-0 fw-normal">Working</h5>
                  <h5 className="mb-0 fw-normal">{workingCount}</h5>
                </div>
                <div
                  className={`d-flex gap-4 px-3 py-2 ${
                    activeTab === "late" ? "bg-gray text-white" : "bg-white"
                  }`}
                  onClick={() => setActiveTab("late")}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="mb-0 fw-normal">Late</h5>
                  <h5 className="mb-0 fw-normal">{lateCount}</h5>
                </div>
                <div
                  className={`d-flex gap-4 px-3 py-2  ${
                    activeTab === "slacking" ? "bg-gray text-white" : "bg-white"
                  }`}
                  onClick={() => setActiveTab("slacking")}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="mb-0 fw-normal">Slack</h5>
                  <h5 className="mb-0 fw-normal">{slackingCount}</h5>
                </div>
                <div
                  className={`d-flex gap-4 px-3 py-2  ${
                    activeTab === "absent" ? "bg-gray text-white" : "bg-white"
                  }`}
                  onClick={() => setActiveTab("absent")}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="mb-0 fw-normal">Absent</h5>
                  <h5 className="mb-0 fw-normal">{absentCount}</h5>
                </div>
              </div>
              {/* </div> */}
              {outstream?.length === 0 ? (
                <div
                  className="d-flex align-items-center justify-content-center bg-white border-top"
                  style={{ height: "20rem" }}
                >
                  <h4>No team member found!</h4>
                </div>
              ) : (
                <div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="text-center py-3 bg-lightGray1">Name</th>
                        {getCurrentItems()?.map((item, index) => (
                          <th
                            key={index}
                            className="text-center py-3 fw-normal hover-effect border"
                          >
                            <Link
                              to={`teammateDetails/${item.user.user_id}`}
                              className="text-black text-decoration-none"
                            >
                              {item.user.picture === "" ? (
                                <FaUserCircle className="fs-1 me-4" />
                              ) : (
                                <img
                                  src={item.user.picture}
                                  alt=""
                                  className="rounded-circle me-4 border"
                                  style={{
                                    width: "2.7rem",
                                    height: "2.7rem",
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                              {item.user.name}
                            </Link>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sideHeadings.map((heading, headingIndex) => (
                        <tr key={headingIndex}>
                          <td
                            className={`text-center py-3 fw-bold ${
                              headingIndex % 2 !== 0
                                ? "bg-lightGray1"
                                : "bg-white"
                            }`}
                          >
                            {heading}
                          </td>
                          {getCurrentItems()?.map((item, itemIndex) => (
                            <td
                              key={itemIndex}
                              className="text-center py-3 border"
                            >
                              {headingIndex === 0
                                ? item.user.department_name
                                : headingIndex === 1
                                ? item.modeledData
                                  ? item.modeledData?.arrivedAt
                                  : "-"
                                : headingIndex === 2
                                ? item.modeledData
                                  ? item.modeledData?.leftAt
                                  : "-"
                                : headingIndex === 3
                                ? item.modeledData
                                  ? secondsToHoursMinutes(
                                      item.modeledData?.productiveTime
                                    )
                                  : "-"
                                : headingIndex === 4
                                ? item.modeledData
                                  ? item.modeledData?.offlineTime === "-"
                                    ? "-"
                                    : secondsToHoursMinutes(
                                        item.modeledData?.offlineTime
                                      )
                                  : "-"
                                : headingIndex === 5
                                ? item.modeledData
                                  ? item.modeledData?.activeApp
                                  : "-"
                                : headingIndex === 7
                                ? item.modeledData
                                  ? secondsToHoursMinutes(
                                      item.modeledData?.deskTime
                                    )
                                  : "-"
                                : "-"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination-controls d-flex justify-content-md-end mt-3">
                    <div className="d-flex gap-1 px-4 py-3">
                      <button
                        className="rounded border border-secondary"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                      >
                        <IoIosArrowRoundBack className="fs-3" />
                        <span className="d-md-inline d-none">Previous</span>
                      </button>
                      {renderPaginationButtons()}
                      <button
                        className="rounded border border-secondary"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                      >
                        <span className="d-md-inline d-none">Next</span>
                        <IoIosArrowRoundForward className="fs-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {addTeamMember && (
        <ModalComponent
          handleClose={closeModal}
          heading="Add Teammate"
          btn1="Cancel"
          btn2="Invite"
          size="lg"
        >
          <div className="px-4 py-3 mb-5">
            <h5 className="text-center">
              Add Team Members so you can Monitor their Output.
            </h5>
            <h5 className="text-center">
              Forming Teams helps you stay Structured.
            </h5>
          </div>
          <form className="mb-3" onSubmit={handleSubmit}>
            <div className="d-flex gap-4 mb-5">
              <label htmlFor="name" className="w-50">
                Full Name <span className="text-red">*</span>
                <input
                  type="text"
                  id="name"
                  name="fullname"
                  placeholder="Enter Full name..."
                  className="d-block px-3 py-2 w-100 rounded border"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="email" className="w-50">
                Email <span className="text-red">*</span>
                <input
                  type="text"
                  placeholder="Enter Email..."
                  className="d-block px-3 py-2 w-100 rounded border"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="d-flex gap-4 mb-5">
              <div className="w-50 h-100">
                <label>Department</label>
                <select
                  id="department-select"
                  value={formData.department_id}
                  name="department_id"
                  onChange={handleChange}
                  className="px-3 py-2"
                >
                  <option value="" disabled>
                    --Select Department--
                  </option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.department_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-50 h-100">
                <label>Role</label>
                <select
                  id="role-select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="px-3 py-2"
                >
                  <option value="" disabled>
                    --Select Role--
                  </option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="d-flex gap-6">
              <button type="submit" className="btn">
                {loading ? (
                  <PulseLoader size={8} color="white" />
                ) : (
                  "Add Team Members"
                )}
              </button>
              <div className="d-flex gap-4 align-items-center">
                <p className="mb-0 ">
                  Import<span className="ms-2">from:</span>
                </p>
                <button className="px-3 border rounded bg-transparent py-2 d-flex align-items-center gap-2">
                  <FaSlack /> <span>Slack</span>
                </button>
                <button className="px-3 border rounded bg-transparent py-2 d-flex align-items-center gap-2">
                  <FcGoogle />
                  <span>Workspace</span>
                </button>
              </div>
            </div>
          </form>
        </ModalComponent>
      )}
    </div>
  );
};

export default Teamates;
