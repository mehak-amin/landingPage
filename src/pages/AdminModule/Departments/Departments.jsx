import { useEffect, useMemo, useRef, useState } from "react";
import "./Departments.css";

import axios from "axios";

import BASE_URI from "../../../../config";
import Header from "../../../components/Header";
import SearchInput from "../../../components/SearchInput";
import SortButton from "../../../components/Button/SortButton";
import formatDateToIST from "../../../utils/formatDateToIST";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import useFetch from "../../../hooks/useFetch";
import ModalComponent from "../../../components/Modal/ModalComponent";
import { ShimmerTable } from "react-shimmer-effects";
import { RxDotsHorizontal } from "react-icons/rx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Departments = () => {
  const [createDeparment, setcreateDeparment] = useState(false);
  const [departmentData, setDepartmentData] = useState("");
  const [deptName, setDeptName] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [editOrDeletePopUp, setEditOrDeletePopUp] = useState("");
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [id, setId] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [search, setSearch] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [isActive, setIsActive] = useState(0);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const sortPopupRef = useRef(null);
  const editDeletePopupRefs = useRef({});

  const token = localStorage.getItem("token");
  let url = `${BASE_URI}/departments?search=${search}&sort=${sortCriteria}&direction=${sortOrder}`;

  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, isLoading, error, refetch } = useFetch(url, fetchOptions);
  const departmentsData = useMemo(() => data?.data || [], [data]);

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
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = (activeStatus) => {
    setIsActive(activeStatus);
    setDeletePopUp(!deletePopUp);
  };
  const handleEdit = () => {
    getSingleDepartment();
    setIsEdited(!isEdited);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortPopupRef.current &&
        !sortPopupRef.current.contains(event.target)
      ) {
        setIsSort(false);
      }
      Object.keys(editDeletePopupRefs.current).forEach((id) => {
        if (
          editDeletePopupRefs.current[id] &&
          !editDeletePopupRefs.current[id].contains(event.target)
        ) {
          setEditOrDeletePopUp((prev) => ({
            ...prev,
            [id]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleEditOrDeletePopUp = (id) => {
    setEditOrDeletePopUp((prevEditOrDeletePopUp) => ({
      ...prevEditOrDeletePopUp,
      [id]: !prevEditOrDeletePopUp[id],
    }));
  };

  const togglecreateDeparment = () => {
    setcreateDeparment(!createDeparment);
    setDeptName("");
  };

  const handleCreateDepartment = async () => {
    try {
      await axios({
        method: "POST",
        url: `${BASE_URI}/departments`,
        data: {
          deptName,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setcreateDeparment(false);
      refetch();
      toast.success("Department Created Successfully", {
        position: "top-right",
      });
      setDeptName("");
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-right",
      });
    }
  };

  const handleDeleteDepartment = async () => {
    try {
      await axios({
        method: selectedDepartments?.length === 0 ? "PATCH" : "DELETE",
        url:
          selectedDepartments?.length === 0
            ? `${BASE_URI}/departments/${id}`
            : `${BASE_URI}/departments`,
        data:
          selectedDepartments?.length === 0
            ? { is_active: isActive === 0 ? 1 : 0 }
            : { ids: selectedDepartments },

        headers: {
          Authorization: "Bearer " + token,
        },
      });

      refetch();
      setDeletePopUp(false);
      setEditOrDeletePopUp(false);
      setSelectedDepartments([]);
      selectedDepartments.length === 0
        ? toast.success(
            isActive === 0 ? "Department Enabled" : "Department Disabled",
            {
              position: "top-right",
            }
          )
        : toast.success("Selected departments deleted successfully!", {
            position: "top-right",
          });
    } catch (err) {
      toast.error(err.message);
    }
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
      toast.success("Department Updated", {
        position: "top-right",
      });
      refetch();
      setIsEdited(false);
      setEditOrDeletePopUp(false);
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
      });
    }
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleCloseDelete = () => {
    setEditOrDeletePopUp(false);
    setDeletePopUp(false);
  };

  const handleCloseEdit = () => {
    setEditOrDeletePopUp(false);
    setIsEdited(false);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (selectedDepartments.length === departmentsData.length) {
      setSelectedDepartments([]);
    } else {
      setSelectedDepartments(
        departmentsData.map((department) => department.id)
      );
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedDepartments((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((departmentId) => departmentId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className="wrapper-div-departments container-xxxl px-0">
      {deletePopUp && (
        <ModalComponent
          heading="Delete Department"
          handleClose={handleCloseDelete}
          handleClick={handleDeleteDepartment}
          btn1="Cancel"
          btn2={isActive === 0 ? "Enable" : "Disable"}
        >
          <div className="py-3">
            <h6 className="text-center mb-2">
              Do you really want to enable/disable the projects that you have
              chosen?
            </h6>
            <h6 className="text-center">There is no turning back.</h6>
          </div>
        </ModalComponent>
      )}

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

      <Header
        heading="Departments"
        isDate={false}
        isMonthFilter={false}
        btnName="Create Department"
        handleClick={togglecreateDeparment}
      />

      <div className="d-md-flex gap-6  px-md-5 px-3 py-4 position-relative">
        <SearchInput
          placeholder="Search Departments...!"
          value={search}
          setValue={setSearch}
        />

        <div ref={sortPopupRef} className="d-flex gap-4 mt-3 mt-md-0">
          <div
            className="border-0 bg-white rounded"
            onClick={() => setIsSort(!isSort)}
          >
            <SortButton />
          </div>
          {isSort && (
            <div
              className="z-3 position-absolute bg-white custom-shadow"
              style={{ top: "115%", left: "-50%" }}
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
                  <option value="department_name">Department Name</option>
                  <option value="created">Created</option>
                  <option value="members">Members</option>
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

      {createDeparment && (
        <ModalComponent
          heading="Create Department"
          handleClose={togglecreateDeparment}
          handleClick={handleCreateDepartment}
          btn1="Cancel"
          btn2="Create"
          // size="m"
        >
          <div className="py-3">
            <label htmlFor="" className="d-block mb-1">
              Deapartment Name
            </label>
            <input
              type="text"
              value={deptName}
              placeholder="Enter Department Name...!"
              className="px-3 py-2 rounded border w-100"
              onChange={(e) => setDeptName(e.target.value)}
            />
          </div>
        </ModalComponent>
      )}
      {isLoading ? (
        <div className="px-sm-5 px-3">
          <ShimmerTable row={6} col={5} />
        </div>
      ) : (
        <div style={{ overflowX: "auto" }} className="min-vh-100 mh-100">
          <div className="px-md-5 px-3" style={{ minWidth: "66rem" }}>
            <div className="top-div-bottom-departments py-3">
              <div className="left-top-div-bottom-departments">
                <h5 onClick={handleSelectAll} className="cursor-pointer">
                  {selectAll ? "Deselect all" : "Select all"}
                </h5>
              </div>
              <div className="right-top-div-bottom-departments">
                <h5>{selectedDepartments.length} Departments Selected</h5>
                <h6>
                  <RiDeleteBin6Line className="fs-3" onClick={handleDelete} />
                </h6>
              </div>
            </div>

            {error ? (
              <div
                className="bg-white flex align-items-center justify-content-center"
                style={{ height: "20rem" }}
              >
                <h4 className="text-secondary">
                  {error?.response?.data?.message || "Something went wrong"}
                </h4>
              </div>
            ) : (
              <div>
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th className="border-0 text-start py-2 ps-5">
                        Department Name
                      </th>
                      <th className="border-0 py-2 text-center">Created</th>
                      <th className="border-0 py-2 text-center">Members</th>
                      <th className="border-0 py-2 text-center">Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentsData &&
                      departmentsData?.map((department, departmentIndex) => (
                        <tr key={departmentIndex}>
                          <td className="py-3 ps-5 text-capitalize">
                            <input
                              type="checkbox"
                              className="d-inline border-0 me-2"
                              style={{ width: "1rem", height: "1rem" }}
                              checked={selectedDepartments.includes(
                                department.id
                              )}
                              onChange={() =>
                                handleCheckboxChange(department.id)
                              }
                            />{" "}
                            {department?.department_name}
                          </td>
                          <td className="text-center py-3 px-0">
                            {formatDateToIST(department?.created_at)}
                          </td>
                          <td className="text-center py-3 px-0">
                            <Link
                              to={`departmentMembers/${department.id}`}
                              className="text-secondary fw-bold"
                            >
                              {department?.member_count}
                            </Link>
                          </td>
                          <td
                            ref={(el) =>
                              (editDeletePopupRefs.current[department.id] = el)
                            }
                            className="text-center position-relative py-3 px-0"
                          >
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
                                <h6
                                  className="py-3 px-5 text-red cursor-pointer"
                                  onClick={() =>
                                    handleDelete(department.is_active)
                                  }
                                >
                                  {department.is_active === 0
                                    ? "Enable"
                                    : "Disable"}
                                </h6>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
