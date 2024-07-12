import { RiDeleteBin6Line } from "react-icons/ri";
import { ShimmerTable } from "react-shimmer-effects";
import ModalComponent from "../../../../components/Modal/ModalComponent";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import SortButton from "../../../../components/Button/SortButton";
import SearchInput from "../../../../components/SearchInput";
import Header from "../../../../components/Header";
import { useEffect, useMemo, useRef, useState } from "react";
import BASE_URI from "../../../../../config";
import useFetch from "../../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import formatDateToIST from "../../../../utils/formatDateToIST";
import { RxDotsHorizontal } from "react-icons/rx";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function DepartmentMembers() {
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [editOrDeletePopUp, setEditOrDeletePopUp] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");
  const [memberId, setMemberId] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedAddMembers, setSelectedAddMembers] = useState([]);
  const [addMemberselectAll, setAddMemberSelectAll] = useState(false);

  const { id } = useParams();

  const sortPopupRef = useRef(null);
  const editDeletePopupRefs = useRef({});

  const token = localStorage.getItem("token");
  let url = `${BASE_URI}/departments/getMembers/${id}?search=${search}&sort=${sortCriteria}&direction=${sortOrder}`;
  let newMembersUrl = `${BASE_URI}/employee/${id}`;

  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, isLoading, error, refetch } = useFetch(url, fetchOptions);
  const membersdata = data?.data || {};

  const { data: newData } = useFetch(newMembersUrl, fetchOptions);
  const newMembersData = useMemo(() => newData?.data || [], [newData]);

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

  const handleAddMember = async () => {
    try {
      await axios({
        method: "PATCH",
        url: `${BASE_URI}/admin/addMember`,
        data: {
          ids: selectedAddMembers,
          dept: Number(id),
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      toast.success("Member added successfully", {
        position: "top-right",
      });
      setAddMember(false);
      refetch();
    } catch (err) {
      toast.error(err?.message, {
        position: "top-right",
      });
    }
  };

  const handleDeleteMember = async () => {
    try {
      await axios({
        method: "PATCH",
        url: `${BASE_URI}/departments/removeMember/${id}`,
        data: { ids: selectedMembers },

        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Member removed successfully", {
        position: "top-right",
      });
      refetch();
      setDeletePopUp(false);
      setEditOrDeletePopUp(false);
      setSelectedMembers([]);
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
      });
    }
  };

  const handleDelete = (id) => {
    setDeletePopUp(!deletePopUp);
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((id) => id !== id)
        : [...prevSelected, id]
    );
  };

  const handleCloseDelete = () => {
    setEditOrDeletePopUp(false);
    setDeletePopUp(false);
  };

  const toggleAddTeamMember = () => {
    setAddMember(!addMember);
    setSelectedAddMembers([]);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (selectedMembers.length === membersdata.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(membersdata.map((department) => department.id));
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((departmentId) => departmentId !== id)
        : [...prevSelected, id]
    );
  };

  const handleAddMemberSelectAll = () => {
    if (addMemberselectAll) {
      setSelectedAddMembers([]);
    } else {
      setSelectedAddMembers(newMembersData.map((member) => member.id));
    }
    setAddMemberSelectAll(!addMemberselectAll);
  };

  const handleAddMemberCheckboxChange = (id) => {
    if (selectedAddMembers.includes(id)) {
      setSelectedAddMembers(
        selectedAddMembers.filter((memberId) => memberId !== id)
      );
    } else {
      setSelectedAddMembers([...selectedAddMembers, id]);
    }
  };

  return (
    <div className="wrapper-div-departments container-xxxl px-0">
      {deletePopUp && (
        <ModalComponent
          heading="Delete Department"
          handleClose={handleCloseDelete}
          handleClick={handleDeleteMember}
          btn1="Cancel"
          btn2="Remove"
        >
          <div className="py-3">
            <h6 className="text-center mb-2">
              Do you really want to remove members that you have chosen?
            </h6>
            <h6 className="text-center">There is no turning back.</h6>
          </div>
        </ModalComponent>
      )}

      <Header
        heading="Department Members"
        isDate={false}
        isMonthFilter={false}
        btnName="Add Team Member"
        handleClick={toggleAddTeamMember}
      />

      <div className="d-md-flex gap-6  px-md-5 px-3 py-4 position-relative">
        <SearchInput
          placeholder="Search Members...!"
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
                  <option value="name">Name</option>
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

      {addMember && (
        <ModalComponent
          heading="Add Member"
          handleClose={toggleAddTeamMember}
          handleClick={handleAddMember}
          btn1="Cancel"
          btn2="Add"
          size="lg"
        >
          <div>
            <h5 className="mb-3">Select Members</h5>
            <div className="py-2 px-4 d-flex align-items-center justify-content-between border bg-lightGray1">
              <p className="mb-0">
                <span>{selectedAddMembers.length}</span> Members Selected
              </p>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={addMemberselectAll}
                  style={{ width: "1.2rem", height: "1.2rem" }}
                  onChange={handleAddMemberSelectAll}
                />
                <label>
                  {addMemberselectAll ? "Deselect all" : "Select all"}
                </label>
              </div>
            </div>
          </div>
          {newMembersData.map((member) => (
            <div
              key={member.id}
              className="py-2 px-4 d-flex align-items-center gap-5 border"
            >
              <input
                type="checkbox"
                style={{ width: "1.2rem", height: "1.2rem" }}
                checked={selectedAddMembers.includes(member.id)}
                onChange={() => handleAddMemberCheckboxChange(member.id)}
              />
              <label className="text-capitalize">
                {member.fullname || "noName"}
              </label>
            </div>
          ))}
        </ModalComponent>
      )}
      {isLoading ? (
        <div className="px-sm-5 px-3">
          <ShimmerTable row={6} col={5} />
        </div>
      ) : (
        <div style={{ overflowX: "auto" }} className="min-vh-100 mh-100">
          <div className="px-sm-5 px-3" style={{ minWidth: "66rem" }}>
            <div className="top-div-bottom-departments py-3">
              <div className="left-top-div-bottom-departments">
                <h5 onClick={handleSelectAll} className="cursor-pointer">
                  {selectAll ? "Deselect all" : "Select all"}
                </h5>
              </div>
              <div className="right-top-div-bottom-departments">
                <h5>{selectedMembers.length} Departments Selected</h5>
                <h6>
                  <RiDeleteBin6Line className="fs-3" onClick={handleDelete} />
                </h6>
              </div>
            </div>

            {!error ? (
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th className="border-0 text-start py-2 ps-4">Name</th>
                    <th className="border-0 py-2 text-center">Email</th>
                    <th className="border-0 py-2 text-center">Created</th>
                    <th className="border-0 py-2 text-center">Role</th>
                    <th className="border-0 py-2 text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {membersdata.map((member) => {
                    return (
                      <tr key={member.id}>
                        <td className="py-3 ps-4 text-capitalize">
                          <input
                            type="checkbox"
                            className="d-inline border-0 me-2"
                            style={{ width: "1rem", height: "1rem" }}
                            checked={selectedMembers.includes(member.id)}
                            onChange={() => handleCheckboxChange(member.id)}
                          />
                          {member.fullname}
                        </td>
                        <td className="text-center py-3 fs-09rem px-0">
                          {member.email}
                        </td>
                        <td className="text-center py-3 fs-09rem px-0">
                          {formatDateToIST(member.created_at)}
                        </td>
                        <td className="text-center py-3 text-capitalize px-0">
                          {member.role}
                        </td>
                        <td
                          ref={(el) =>
                            (editDeletePopupRefs.current[member.id] = el)
                          }
                          className="text-center position-relative py-3 px-0"
                        >
                          <RxDotsHorizontal
                            className="fs-4 cursor-pointer"
                            onClick={() => {
                              toggleEditOrDeletePopUp(member.id);
                              setMemberId(member.id);
                            }}
                          />
                          {editOrDeletePopUp[member.id] && (
                            <div className="position-absolute top-75 start-50 translate-middle-x  z-1 border bg-white">
                              <Link to={`editMember/${memberId}`}>
                                <h6
                                  className="py-3 px-5 border-bottom cursor-pointer"
                                  //   onClick={handleEdit}
                                >
                                  Edit
                                </h6>
                              </Link>
                              <h6
                                className="py-3 px-5 text-red cursor-pointer"
                                onClick={() => handleDelete(member.id)}
                              >
                                Remove
                              </h6>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}
