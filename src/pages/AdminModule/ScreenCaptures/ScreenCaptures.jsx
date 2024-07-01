import { useState, useEffect, useMemo } from "react";
import Header from "../../../components/Header";
import { RiDeleteBin6Line } from "react-icons/ri";
import BASE_URI from "../../../../config";
import useFetch from "../../../hooks/useFetch";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import "./ScreenCaptures.css";
import ModalComponent from "../../../components/Modal/ModalComponent";
import NoData from "../../../components/NoData";
import { convertDate } from "../../../utils/formattingDate";
import axios from "axios";

export default function ScreenCaptures() {
  const [date, setDate] = useState(new Date());
  const [visibleScreenshots, setVisibleScreenshots] = useState({});
  const [selectedUsers, setSelectedUsers] = useState({});
  const [selectedScreenshots, setSelectedScreenshots] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const formattedDate = convertDate(date);
  const token = localStorage.getItem("token");
  let url = `${BASE_URI}/snapshots/snap?from=${formattedDate}&to=${formattedDate}&department=${activeDepartment}`;

  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, isLoading, error, refetch } = useFetch(url, fetchOptions);
  const screenCaptures = useMemo(() => data?.data || [], [data]);

  let departmentsUrl = `${BASE_URI}/departments`;
  const { data: departmentsData } = useFetch(departmentsUrl, fetchOptions);
  const departments = useMemo(
    () =>
      (departmentsData?.data || []).filter(
        (department) => department.is_active === 1
      ),
    [departmentsData]
  );

  useEffect(() => {
    if (departments.length > 0) {
      setActiveDepartment(departments[0].id);
    }
  }, [departments]);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = document.getElementById(
        "department-container"
      ).offsetWidth;
      const itemsWidth = departments.length * 120;
      setShowDropdown(itemsWidth > containerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [departments]);

  useEffect(() => {
    const newSelectedUsers = {};
    const newSelectedScreenshots = [];

    screenCaptures.forEach((capture) => {
      newSelectedUsers[capture.user.id] = selectAll;
      capture.screenshots.forEach((img) => {
        if (selectAll) {
          newSelectedScreenshots.push(img.id);
        }
      });
    });

    setSelectedUsers(newSelectedUsers);
    setSelectedScreenshots(newSelectedScreenshots);
  }, [selectAll, screenCaptures]);

  const handleDeleteScreenshots = async () => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${BASE_URI}/snapshots/snap`,
        data: { ids: selectedScreenshots },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      refetch();
      setIsDelete(false);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleScreenshots = (userId) => {
    setVisibleScreenshots((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const handleUserCheckboxChange = (userId) => {
    const newSelectedUsers = {
      ...selectedUsers,
      [userId]: !selectedUsers[userId],
    };
    setSelectedUsers(newSelectedUsers);

    const userScreenshots =
      screenCaptures
        .find((capture) => capture.user.id === userId)
        ?.screenshots.map((img) => img.id) || [];

    if (newSelectedUsers[userId]) {
      setSelectedScreenshots((prevSelected) => [
        ...prevSelected,
        ...userScreenshots,
      ]);
    } else {
      setSelectedScreenshots((prevSelected) =>
        prevSelected.filter((id) => !userScreenshots.includes(id))
      );
    }
  };

  const handleScreenshotCheckboxChange = (imgId) => {
    setSelectedScreenshots((prevSelected) =>
      prevSelected.includes(imgId)
        ? prevSelected.filter((id) => id !== imgId)
        : [...prevSelected, imgId]
    );
  };

  const handleCloseDelete = () => {
    setIsDelete(false);
  };

  const handleDepartmentChange = (departmentId) => {
    setActiveDepartment(departmentId);
    refetch();
  };

  const countSelectedScreenshotsForUser = (userId) => {
    const userScreenshots =
      screenCaptures
        .find((capture) => capture.user.id === userId)
        ?.screenshots.map((img) => img.id) || [];
    return userScreenshots.filter((imgId) =>
      selectedScreenshots.includes(imgId)
    ).length;
  };

  return (
    <div className="container-xxl p-0">
      {isDelete && (
        <ModalComponent
          heading="Delete Screenshots"
          handleClose={handleCloseDelete}
          handleClick={handleDeleteScreenshots}
          btn1="Cancel"
          btn2="Delete"
        >
          <div className="py-3">
            <h6 className="text-center mb-2">
              Do you really want to remove the screenshots that you have chosen?
            </h6>
            <h6 className="text-center">There is no turning back.</h6>
          </div>
        </ModalComponent>
      )}
      <Header
        heading="Screen Captures"
        isDate={true}
        isMonthFilter={false}
        selectedStartDate={date}
        setSelectedStartDate={setDate}
      />
      <div className="bg-lightGray1">
        <div
          id="department-container"
          className="px-sm-5 p-2 border-lightgreen custom-shadow"
        >
          <ul className="list-unstyled d-flex gap-3 mb-0">
            {departments
              .slice(0, showDropdown ? 1 : departments.length)
              .map((dept) => (
                <li
                  key={dept.id}
                  className={`p-2 rounded cursor-pointer ${
                    activeDepartment === dept.id ? "bg-darkGray text-white" : ""
                  }`}
                  onClick={() => handleDepartmentChange(dept.id)}
                >
                  {dept.department_name}
                </li>
              ))}
            {showDropdown && (
              <div className="">
                <select
                  className="form-select h-100"
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  value={activeDepartment}
                >
                  {departments.slice(1).map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.department_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {/* {!showDropdown && (
              <div className="d-none d-md-flex">
                {departments.slice(1).map((dept) => (
                  <li
                    key={dept.id}
                    className={`p-2 rounded cursor-pointer ${
                      activeDepartment === dept.id
                        ? "bg-darkGray text-white"
                        : ""
                    }`}
                    onClick={() => handleDepartmentChange(dept.id)}
                  >
                    {dept.department_name}
                  </li>
                ))}
              </div>
            )} */}
          </ul>
        </div>

        {screenCaptures?.length === 0 ? (
          <div className="py-5 px-3 px-sm-5 rounded-2">
            <NoData />
          </div>
        ) : (
          <div className="py-5 px-3 px-sm-5 rounded-2">
            <div className="px-sm-5 p-3 bg-graySecondary d-flex align-items-center justify-content-between rounded-top">
              <div className="bg-white px-3 py-2 rounded-1 shadow fw-bolder">
                <span className="d-custom-inline">Screenshots Selected</span>{" "}
                {selectedScreenshots.length}
              </div>
              <div className="d-flex gap-3 align-items-center">
                <button
                  className="px-3 py-2 border-0 rounded-1 fw-bolder"
                  onClick={() => setSelectAll((prevState) => !prevState)}
                >
                  {selectAll ? "Deselect all" : "Select all"}
                </button>
                <RiDeleteBin6Line
                  className="fs-2 cursor-pointer"
                  onClick={() => setIsDelete(true)}
                />
              </div>
            </div>
            <ul className="bg-white p-0 list-unstyled">
              {screenCaptures?.map((capture) => {
                const isVisible = visibleScreenshots[capture.user.id];
                const selectedCount = countSelectedScreenshotsForUser(
                  capture.user.id
                );
                return (
                  <li key={capture.user.id} className="py-3 border-bottom px-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedUsers[capture.user.id] || false}
                          onChange={() =>
                            handleUserCheckboxChange(capture.user.id)
                          }
                          style={{ width: "1.2rem", height: "1.2rem" }}
                        />
                        {capture.user.picture === "" ? (
                          <FaRegUserCircle className="fs-3 text-secondary" />
                        ) : (
                          <img
                            src={capture.user.picture}
                            alt="User"
                            className="rounded-circle"
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                              objectFit: "cover",
                            }}
                          />
                        )}

                        <div>
                          <h5 className="text-capitalize fw-light">
                            {capture.user.fullname === ""
                              ? "no name"
                              : capture.user.fullname}
                          </h5>
                          <p className="text-secondary mb-0">
                            {selectedCount}/{capture.screenshots.length}
                          </p>
                        </div>
                      </div>
                      {isVisible ? (
                        <BsArrowUpCircle
                          className="fs-3 text-secondary cursor-pointer"
                          onClick={() => toggleScreenshots(capture.user.id)}
                        />
                      ) : (
                        <BsArrowDownCircle
                          className="fs-3 text-secondary cursor-pointer"
                          onClick={() => toggleScreenshots(capture.user.id)}
                        />
                      )}
                    </div>
                    <div
                      className={`screenshot-container ${
                        isVisible ? "show" : ""
                      }`}
                    >
                      {isVisible && (
                        <div className="scrollable-container">
                          <div className="d-flex gap-3 py-3">
                            {capture.screenshots.length === 0 ? (
                              <p className="text-center">
                                No Screenshot found...!
                              </p>
                            ) : (
                              capture.screenshots.map((img) => (
                                <div key={img.id} className="position-relative">
                                  <input
                                    type="checkbox"
                                    className="position-absolute top-0 end-0 translate-middle-x bg-white z-2"
                                    checked={selectedScreenshots.includes(
                                      img.id
                                    )}
                                    onChange={() =>
                                      handleScreenshotCheckboxChange(img.id)
                                    }
                                    style={{
                                      width: "1.3rem",
                                      height: "1.3rem",
                                      cursor: "pointer",
                                    }}
                                  />
                                  <img
                                    src={img.screenshot_url}
                                    alt=""
                                    style={{
                                      width: "15rem",
                                      height: "15rem",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
