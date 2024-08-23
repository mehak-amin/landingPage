import { useEffect, useRef, useState } from "react";
import "./ManageApps.css";
import Header from "../../../components/Header";
import SearchInput from "../../../components/SearchInput";
import SortButton from "../../../components/Button/SortButton";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

import BASE_URI from "../../../../config";
import useFetch from "../../../hooks/useFetch";
import { ShimmerTable } from "react-shimmer-effects";
import axios from "axios";
import ModalComponent from "../../../components/Modal/ModalComponent";
import { RxDotsHorizontal } from "react-icons/rx";
import toast from "react-hot-toast";

const ManageApps = () => {
  const [addApp, setAddApp] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("");

  const [isEdited, setIsEdited] = useState(false);
  const [editOrDeletePopUp, setEditOrDeletePopUp] = useState("");

  const [id, setId] = useState("");
  const [appSingleData, setSingleAppData] = useState({
    application_name: "",
    category: "",
    type: "",
  });
  const [newAppData, setNewAppData] = useState({
    application_name: "",
    category: "",
    type_id: "",
    url: "",
  });
  const sortPopupRef = useRef(null);
  const editPopupRefs = useRef({});

  const token = localStorage.getItem("token");
  let url = `${BASE_URI}/appList?search=${search}&sort=${sortCriteria}&direction=${sortOrder}`;

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

  const categoryList = categoryData?.data?.appCategories || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortPopupRef.current &&
        !sortPopupRef.current.contains(event.target)
      ) {
        setIsSort(false);
      }
      Object.keys(editPopupRefs.current).forEach((id) => {
        if (
          editPopupRefs.current[id] &&
          !editPopupRefs.current[id].contains(event.target)
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
        type_id: response.data.data.logs.type,
      });
    } catch (err) {
      toast.error(err?.message, {
        position: "top-right",
      });
    }
  };

  const handleEditDepartment = async () => {
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
      toast.success("App updated successfully", {
        position: "top-right",
      });
    } catch (err) {
      toast.error(err?.message, {
        position: "top-right",
      });
    }
  };

  const handleCreateApp = async () => {
    try {
      await axios({
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
      toast.success("App created Sucesfully", {
        position: "top-right",
      });
    } catch (err) {
      toast.error(err?.message, {
        position: "top-right",
      });
    }
  };

  const toggleAddApp = () => {
    setAddApp(!addApp);
    setNewAppData({
      application_name: "",
      category: "",
      type_id: "",
      url: "",
    });
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
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

  const toggleEditOrDeletePopUp = (id) => {
    setEditOrDeletePopUp((prevEditOrDeletePopUp) => ({
      ...prevEditOrDeletePopUp,
      [id]: !prevEditOrDeletePopUp[id],
    }));
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
    <div className="wrapper-div-manageapps container-xxxl p-0">
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
                readOnly
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="d-block text-secondary">
                Category
              </label>
              <select
                className="px-3 py-2 rounded border w-100"
                name="category"
                value={appSingleData?.category}
                onChange={handleEditChange}
              >
                <option value="" disabled>
                  --Select category--
                </option>
                <option value="productive">Productive</option>
                <option value="unproductive">Unproductive</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="d-block text-secondary">
                Application Type
              </label>
              <select
                className="px-3 py-2 rounded border w-100"
                value={appSingleData?.type_id}
                name="type_id"
                onChange={handleEditChange}
              >
                <option value="" disabled>
                  --Select Type--
                </option>
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.type}
                  </option>
                ))}
              </select>
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
                placeholder="Enter Application Name...!"
                onChange={handleAddChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="d-block mb-1">
                Select Category
              </label>
              <select
                className="px-3 py-2 rounded border w-100"
                name="type"
                onChange={handleAddChange}
              >
                <option value="" disabled>
                  --Select Category
                </option>
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="" className="d-block mb-1">
                Select App Type
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
                placeholder="Please Provide URL...!"
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
          placeholder="Search Applications...!"
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
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="px-sm-5 px-3">
          <ShimmerTable row={6} col={5} />
        </div>
      ) : appList?.length === 0 ? (
        <div
          className="bg-white flex align-items-center justify-content-center"
          style={{ height: "20rem" }}
        >
          <h4 className="text-secondary">No Application found</h4>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }} className="min-vh-100 mh-100">
          <div className="px-sm-5 px-3" style={{ minWidth: "66rem" }}>
            <div className="top-div-bottom-departments py-3">
              <div className="text-white px-3 px-sm-5">
                <h5 className="cursor-pointer">Applications List</h5>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th className="text-start px-3 ps-5 py-3">App name</th>
                  <th className="py-3 text-center">Category</th>
                  <th className="py-3 text-center">Type</th>
                  <th className="py-3 text-center">Change Type</th>
                </tr>
              </thead>
              <tbody>
                {appList?.map((item) => {
                  const categoryColor = getCategoryColor(item?.category);
                  return (
                    <tr key={item?.id}>
                      <td className="py-3 ps-5 w-25">
                        <div className="d-flex align-items-center gap-2">
                          {/* <input
                        type="checkbox"
                        className="border-0"
                        style={{ width: "1rem", height: "1rem" }}
                        checked={selectedApps.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />{" "} */}
                          <p className="mb-0">{item?.application_name}</p>
                          {/* <img
                        src={item?.url}
                        alt=""
                        style={{
                          height: "1.2rem",
                          width: "1.2rem",
                          objectFit: "cover",
                        }}
                      /> */}
                        </div>
                      </td>
                      <td className="text-center text-capitalize py-3">
                        <p
                          className="mb-0"
                          style={{ color: categoryColor, fontWeight: "500" }}
                        >
                          {item?.category}
                        </p>
                      </td>
                      <td className="text-center text-capitalize py-3">
                        {item?.type}
                      </td>
                      <td
                        className="text-center position-relative py-3"
                        ref={(el) => (editPopupRefs.current[item.id] = el)}
                      >
                        <RxDotsHorizontal
                          className="fs-4 cursor-pointer"
                          onClick={() => {
                            toggleEditOrDeletePopUp(item.id);
                            setId(item.id);
                          }}
                        />
                        {editOrDeletePopUp[item.id] && (
                          <div className="position-absolute top-75 start-50 translate-middle-x z-3 border bg-white">
                            <h6
                              className="py-3 px-5 border-bottom cursor-pointer"
                              onClick={handleEdit}
                            >
                              Edit
                            </h6>
                            {/* <h6
                          className="py-3 px-5 text-red cursor-pointer"
                          onClick={handleDelete}
                        >
                          Delete
                        </h6> */}
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
      )}
    </div>
  );
};

export default ManageApps;
