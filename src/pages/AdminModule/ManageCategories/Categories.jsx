import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import SortButton from "../../../components/Button/SortButton";
import SearchInput from "../../../components/SearchInput";
import Header from "../../../components/Header";
import ModalComponent from "../../../components/Modal/ModalComponent";
import { useEffect, useRef, useState } from "react";
import BASE_URI from "../../../../config";
import useFetch from "../../../hooks/useFetch";
import { RxDotsHorizontal } from "react-icons/rx";
import { ShimmerTable } from "react-shimmer-effects";
import axios from "axios";
import toast from "react-hot-toast";
export default function Categories() {
  const [isEdited, setIsEdited] = useState(false);
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [search, setSearch] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [editOrDeletePopUp, setEditOrDeletePopUp] = useState(false);
  const [id, setId] = useState(false);
  const [singleCategoryData, setSingleCategoryData] = useState({
    type: "",
  });
  const [newCategory, setNewCategory] = useState({
    type: "",
  });
  const sortPopupRef = useRef(null);
  const editDeletePopupRefs = useRef({});
  const token = localStorage.getItem("token");
  let url = `${BASE_URI}/category?search=${search}&sort=${sortCriteria}&direction=${sortOrder}`;
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const { data, isLoading, error, refetch } = useFetch(url, fetchOptions);
  const categoryData = data?.data?.appCategories || [];
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
  const getSingleCategory = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${BASE_URI}/category/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setSingleCategoryData({
        type: response.data.data.type,
      });
    } catch (err) {
      toast.error(err?.message, {
        position: "top-right",
      });
    }
  };
  const handleEditCategory = async () => {
    // console.log(id);
    try {
      await axios({
        method: "PATCH",
        url: `${BASE_URI}/category/${id}`,
        data: singleCategoryData,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      refetch();
      setIsEdited(false);
      setEditOrDeletePopUp(false);
      toast.success("Category updated", {
        position: "top-right",
      });
    } catch (err) {
      toast.error(err?.message, {
        position: "top-right",
      });
    }
  };
  const handleCreateCategory = async () => {
    // console.log(newAppData);
    try {
      await axios({
        method: "POST",
        url: `${BASE_URI}/category`,
        data: newCategory,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setIsAddCategory(false);
      refetch();
      setNewCategory({
        type: "",
      });
      toast.success("Category created successfully", {
        position: "top-right",
      });
    } catch (err) {
      toast.error(err?.message, {
        position: "top-right",
      });
    }
  };
  const toggleEditOrDeletePopUp = (id) => {
    setEditOrDeletePopUp((prevEditOrDeletePopUp) => ({
      ...prevEditOrDeletePopUp,
      [id]: !prevEditOrDeletePopUp[id],
    }));
  };
  const handleEdit = () => {
    getSingleCategory();
    setIsEdited(!isEdited);
  };
  const handleCloseEdit = () => {
    setEditOrDeletePopUp(false);
    setIsEdited(false);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSingleCategoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const toggleAddCategory = () => {
    setIsAddCategory(!isAddCategory);
  };
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };
  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };
  return (
    <div className="wrapper-div-departments container-xxxl p-0">
      {isEdited && (
        <ModalComponent
          heading="Edit App"
          handleClose={handleCloseEdit}
          handleClick={handleEditCategory}
          btn1="Cancel"
          btn2="Update"
        >
          <div className="py-3">
            <div className="mb-3">
              <label htmlFor="" className="d-block text-secondary">
                Category Name
              </label>
              <input
                type="text"
                name="type"
                value={singleCategoryData?.type}
                className="px-3 py-2 rounded border w-100"
                onChange={handleEditChange}
              />
            </div>
          </div>
        </ModalComponent>
      )}
      {isAddCategory && (
        <ModalComponent
          heading="Add Category"
          handleClose={toggleAddCategory}
          handleClick={handleCreateCategory}
          btn1="Cancel"
          btn2="Add"
        >
          <div className="py-3">
            <div className="mb-3">
              <label htmlFor="" className="d-block mb-1">
                Category Name <span className="text-red">*</span>
              </label>
              <input
                type="text"
                name="type"
                value={newCategory.type}
                className="px-3 py-2 rounded border w-100"
                placeholder="Enter Category Name...!"
                onChange={handleAddChange}
              />
            </div>
          </div>
        </ModalComponent>
      )}
      <Header
        heading="Manage Categories"
        isDate={false}
        isMonthFilter={false}
        btnName="Add Category"
        handleClick={toggleAddCategory}
      />
      <div className="d-md-flex gap-6 px-md-5 px-3 py-4 position-relative">
        <SearchInput
          placeholder="Search Categories...!"
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
                  <option value="category_name">Category Name</option>
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
                <label className="d-flex align-items-center gap-3 px-4 py-2">
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
      ) : (
        <div style={{ overflowX: "auto" }} className="min-vh-100 mh-100">
          <div className="px-sm-5 px-3" style={{ minWidth: "66rem" }}>
            <div className="top-div-bottom-departments py-3">
              <div className="left-top-div-bottom-departments">
                <h5 className="cursor-pointer text-decoration-none">
                  Categories List
                </h5>
              </div>
            </div>
            {error ? (
              <div
                className="bg-white flex justify-content-center align-items-center"
                style={{ height: "23.5rem" }}
              >
                <div>
                  <h4 className="text-secondary text-center">
                    {error?.response?.data?.message || "Something went wrong"}
                  </h4>
                </div>
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th className="py-3 text-center">Category Name</th>
                    <th className="py-3 text-center">Change Category</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData?.map((category) => {
                    return (
                      <tr key={category.id}>
                        <td className="py-3 text-center text-capitalize">
                          {category.type}
                        </td>
                        <td
                          ref={(el) =>
                            (editDeletePopupRefs.current[category.id] = el)
                          }
                          className="text-center position-relative py-3"
                        >
                          <RxDotsHorizontal
                            className="fs-4 cursor-pointer"
                            onClick={() => {
                              toggleEditOrDeletePopUp(category.id);
                              setId(category.id);
                            }}
                          />
                          {editOrDeletePopUp[category.id] && (
                            <div className="position-absolute top-75 start-50 translate-middle-x z-3 border bg-white">
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
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}