import { useState } from "react";
import "./ManageApps.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../components/Header";
import SearchInput from "../../../components/SearchInput";
import SortButton from "../../../components/Button/SortButton";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import BASE_URI from "../../../../config";
import useFetch from "../../../hooks/useFetch";
import { RxDotsHorizontal } from "react-icons/rx";
import axios from "axios";
import ModalComponent from "../../../components/Modal/ModalComponent";

const ManageApps = () => {
  const [addApp, setAddApp] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [isFilter, setIsFilter] = useState("");
  const [selectedApps, setSelectedApps] = useState([]);
  const [selectedOption, setSelectedOption] = useState("productive");
  const [isEdited, setIsEdited] = useState(false);
  const [editOrDeletePopUp, setEditOrDeletePopUp] = useState("");
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [id, setId] = useState("");
  const [appSingleData, setSingleAppData] = useState({
    application_name: "",
    category: "",
    type: "",
  });
  const [newAppData, setNewAppData] = useState({
    application_name: "",
    category: "",
    type: "",
    url: "",
  });

  const token = localStorage.getItem("token");
  let url = `${BASE_URI}/appList?search=${search}`;

  if (isFilter) {
    url += `&sort=${sortCriteria}&direction=${sortOrder}`;
  }

  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, isLoading, error, refetch } = useFetch(url, fetchOptions);
  const appsData = data?.data || {};
  const { appList } = appsData;

  let categoryUrl = `${BASE_URI}/category`;
  const categoryFetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const { data: categoryData } = useFetch(categoryUrl, categoryFetchOptions);
  // console.log(categoryData?.data.appCategories);
  const categoryList = categoryData?.data?.appCategories || [];
  console.log(categoryList);

  const getSingleApp = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${BASE_URI}/appList/${id}`,

        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setSingleAppData({
        application_name: response.data.data.logs.application_name,
        category: response.data.data.logs.category,
        type: response.data.data.logs.type,
      });
      // console.log(response.data.data.logs);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditDepartment = async () => {
    // console.log(id);
    try {
      await axios({
        method: "PATCH",
        url: `${BASE_URI}/appList/${id}`,
        data: appSingleData,
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

  const handleDeleteApp = async () => {
    try {
      // console.log(id);
      const response = await axios({
        method: selectedApps?.length === 0 ? "PATCH" : "DELETE",
        url:
          selectedApps?.length === 0
            ? `${BASE_URI}/appList/${id}`
            : `${BASE_URI}/appList`,
        data:
          selectedApps?.length === 0 ? { is_active: 0 } : { ids: selectedApps },

        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // fetchDepartments();
      refetch();
      setDeletePopUp(false);
      setEditOrDeletePopUp(false);
      setSelectedApps([]);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateApp = async () => {
    console.log(newAppData);
    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URI}/appList`,
        data: newAppData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAddApp(false);
      refetch();
      setNewAppData({
        application_name: "",
        category: "",
        type: "",
        url: "",
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleAddApp = () => {
    setAddApp(!addApp);
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleDelete = () => {
    setDeletePopUp(!deletePopUp);
  };
  const handleCloseDelete = () => {
    setEditOrDeletePopUp(false);
    setDeletePopUp(false);
  };
  const handleEdit = () => {
    getSingleApp();
    setIsEdited(!isEdited);
  };
  const handleCloseEdit = () => {
    setEditOrDeletePopUp(false);
    setIsEdited(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSingleAppData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewAppData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // console.log(newAppData);

  const toggleEditOrDeletePopUp = (id) => {
    setEditOrDeletePopUp((prevEditOrDeletePopUp) => ({
      ...prevEditOrDeletePopUp,
      [id]: !prevEditOrDeletePopUp[id],
    }));
  };

  const handleSelectAll = () => {
    if (selectedApps.length === appList.length) {
      setSelectedApps([]);
    } else {
      setSelectedApps(appList.map((app) => app.id));
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedApps((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((appId) => appId !== id)
        : [...prevSelected, id]
    );
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "productive":
        return "green";
      case "unproductive":
        return "red";
      case "neutral":
        return "gray";
      default:
        return "black";
    }
  };

  return (
    <div className="wrapper-div-manageapps container-xxl p-0">
      {deletePopUp && (
        <ModalComponent
          heading="Delete App"
          handleClose={handleCloseDelete}
          handleClick={handleDeleteApp}
          btn1="Cancel"
          btn2="Delete"
        >
          <div className="py-3">
            <h6 className="text-center mb-2">
              Do you really want to remove the apps that you have chosen?
            </h6>
            <h6 className="text-center">There is no turning back.</h6>
          </div>
        </ModalComponent>
      )}

      {isEdited && (
        <ModalComponent
          heading="Edit App"
          handleClose={handleCloseEdit}
          handleClick={handleEditDepartment}
          btn1="Cancel"
          btn2="Update"
        >
          <div className="py-3">
            <div className="mb-3">
              <label htmlFor="" className="d-block text-secondary">
                Application Name
              </label>
              <input
                type="text"
                name="application_name"
                value={appSingleData?.application_name}
                className="px-3 py-2 rounded border w-100"
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="d-block text-secondary">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={appSingleData?.category}
                className="px-3 py-2 rounded border w-100"
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="d-block text-secondary">
                Application Type
              </label>
              <input
                type="text"
                name="type"
                value={appSingleData?.type}
                className="px-3 py-2 rounded border w-100"
                onChange={handleEditChange}
              />
            </div>
          </div>
        </ModalComponent>
      )}

      {addApp && (
        <ModalComponent
          heading="Add App"
          handleClose={toggleAddApp}
          handleClick={handleCreateApp}
          btn1="Cancel"
          btn2="Create"
        >
          <div className="py-3">
            <div className="mb-3">
              <label htmlFor="" className="d-block mb-1">
                Application Name <span className="text-red">*</span>
              </label>
              <input
                type="text"
                name="application_name"
                value={newAppData?.application_name}
                className="px-3 py-2 rounded border w-100"
                placeholder="Enter Application name...!"
                onChange={handleAddChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="d-block mb-1">
                Select App Type
              </label>
              <select
                className="px-3 py-2 rounded border w-100"
                name="type"
                onChange={handleAddChange}
              >
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="d-block mb-1">
                Select Category
              </label>
              <select
                className="px-3 py-2 rounded border w-100"
                name="category"
                onChange={handleAddChange}
              >
                <option value="productive">Productive</option>
                <option value="unproductive">Unproductive</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="d-block mb-1">
                Enter Url
              </label>
              <input
                type="text"
                name="url"
                placeholder="Please provide url...!"
                value={newAppData?.url}
                className="px-3 py-2 rounded border w-100"
                onChange={handleAddChange}
              />
            </div>
          </div>
        </ModalComponent>
      )}
      <Header
        heading="Manage Apps"
        isDate={false}
        isMonthFilter={false}
        btnName="Add App"
        handleClick={toggleAddApp}
      />

      <div className="d-md-flex gap-6  px-md-5 px-3 py-4 position-relative">
        <SearchInput
          placeholder="Search Departments...!"
          value={search}
          setValue={setSearch}
        />

        <div className="d-flex gap-4 mt-3 mt-md-0">
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
                  <option value="" disabled selected>
                    --Select--
                  </option>
                  <option value="department_name">App Name</option>
                  <option value="type">Type</option>
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
              <div className="d-flex gap-4 align-items-center px-3 py-2">
                <button
                  className=" border px-3 text-center py-1 rounded fw-light shadow cursor-pointer fs-5 bg-transparent"
                  onClick={() => setIsFilter(false)}
                >
                  Reset
                </button>
                <button
                  className=" border  text-center px-3 py-1 rounded bg-gray text-white shadow cursor-pointer fs-5"
                  onClick={() => setIsFilter(true)}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* {addApp && (
        <div className="addapp-popup-wrapper">
          <div className="addapp-popup-manageapps">
            <div className="addapp-top-manageapps">
              <h4>Add App</h4>
              <div onClick={toggleAddApp}>
                <h4>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </h4>
              </div>
            </div>
            <div className="addapp-center-manageapps">
              <div className="addapp-top-center-manageapps">
                <h6>App Name</h6>
                <input type="text" placeholder="Enter App Name...!" />
              </div>
              <div className="addapp-bottom-center-manageapps">
                <h6>Select App Type</h6>
                <select
                  value={selectedOption}
                  onChange={handleChange}
                  // style={selectStyle}
                >
                  <option value="productive">Productive</option>
                  <option value="unproductive">Unproductive</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>
            </div>
            <div className="addapp-bottom-manageapps">
              <div className="addapp-cancle-bottom-manageapps">
                <h6>Cancel</h6>
              </div>
              <div className="addapp-invite-bottom-manageapps">
                <h6>Add App</h6>
              </div>
            </div>
          </div>
        </div>
      )} */}

      <div style={{ overflowX: "auto" }}>
        <div className="px-sm-5 px-3" style={{ minWidth: "66rem" }}>
          <div className="top-div-bottom-departments py-3">
            <div className="left-top-div-bottom-departments">
              <h5 onClick={handleSelectAll} className="cursor-pointer">
                Select All
              </h5>
            </div>
            <div className="right-top-div-bottom-departments">
              <h5>{selectedApps.length} Departments Selected</h5>
              <h6>
                <RiDeleteBin6Line className="fs-3" onClick={handleDelete} />
              </h6>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="text-start px-3 ps-5 py-3">App name</th>
                <th className="py-3">Type</th>
                <th className="py-3">Category</th>
                <th className="py-3">Change Type</th>
              </tr>
            </thead>
            <tbody>
              {appList?.map((item) => {
                const categoryColor = getCategoryColor(item?.category);
                return (
                  <tr key={item?.id}>
                    <td className="py-3 ps-5 w-25">
                      <input
                        type="checkbox"
                        className="d-inline border-0 me-2 text-capitalize"
                        style={{ width: "1rem", height: "1rem" }}
                        checked={selectedApps.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />{" "}
                      {item?.application_name}
                    </td>
                    <td
                      className="text-center text-capitalize py-3"
                      style={{ color: categoryColor, fontWeight: "500" }}
                    >
                      {item?.category}
                    </td>
                    <td className="text-center text-capitalize py-3">
                      {item?.type}
                    </td>
                    <td
                      className="text-center position-relative py-3"
                      // onClick={() => {
                      //   toggleEditOrDeletePopUp(item.id);
                      //   setId(item.id);
                      // }}
                    >
                      <RxDotsHorizontal
                        className="fs-4 cursor-pointer"
                        onClick={() => {
                          toggleEditOrDeletePopUp(item.id);
                          setId(item.id);
                        }}
                      />
                      {editOrDeletePopUp[item.id] && (
                        <div className="position-absolute top-75 start-50 translate-middle-x  z-3 border bg-white">
                          <h6
                            className="py-3 px-5 border-bottom cursor-pointer"
                            onClick={handleEdit}
                          >
                            Edit
                          </h6>
                          <h6
                            className="py-3 px-5 text-red cursor-pointer"
                            onClick={handleDelete}
                          >
                            Delete
                          </h6>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="bottom-div-manageapps">
        <div className="content-bottom-div-manageapps">
          <div className="top-div-bottom-manageapps">
            <div className="left-top-div-bottom-manageapps">
              <h5>Select All</h5>
            </div>
            <div className="right-top-div-bottom-manageapps">
              <h5>0 Apps Selected</h5>
              <h6>
                <FontAwesomeIcon icon={faTrashCan} />
              </h6>
            </div>
          </div>
          <div className="table-container-manageapps">
            <table>
              <tr className="table-headding-manageapps">
                <th>
                  <h6>App Name</h6>
                </th>
                <th>
                  <h6>Type</h6>
                </th>

                <th>
                  <h6>Change Type</h6>
                </th>
              </tr>
              <tr>
                <td className="table-data-appname-manageapps">
                  <input type="checkbox" /> <h6>Figma</h6>{" "}
                  <img src="" alt="image" />
                </td>
                <td>
                  <h6 style={{ color: "green" }}>Productive</h6>
                </td>

                <td>
                  <h6>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </h6>
                </td>
              </tr>
              <tr>
                <td className="table-data-appname-manageapps">
                  <input type="checkbox" /> <h6>Youtube</h6>{" "}
                  <img src="" alt="image" />
                </td>
                <td>
                  <h6 style={{ color: "red" }}>Unproductive</h6>
                </td>

                <td>
                  <h6>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </h6>
                </td>
              </tr>
              <tr>
                <td className="table-data-appname-manageapps">
                  <input type="checkbox" /> <h6>Discord</h6>{" "}
                  <img src="" alt="image" />
                </td>
                <td>
                  <h6 style={{ color: "#b3b3b3" }}>Neutral</h6>
                </td>

                <td>
                  <h6>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </h6>
                </td>
              </tr>
            </table>
          </div>
          <div className="responsive-table-manageapps">
            <table>
              <tr>
                <td>
                  <h6>App Name</h6>
                </td>
                <td className="table-data-appname-manageapps">
                  {" "}
                  <h6>Figma</h6> <img src="" alt="image" />
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Type</h6>
                </td>
                <td style={{ color: "green" }}>
                  <h6>Productive</h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Change Type</h6>
                </td>
                <td>
                  <h6>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </h6>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ManageApps;
