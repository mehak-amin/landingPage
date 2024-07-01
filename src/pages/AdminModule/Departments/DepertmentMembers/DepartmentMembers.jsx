import { RiDeleteBin6Line } from "react-icons/ri";
import { ShimmerTable } from "react-shimmer-effects";
import ModalComponent from "../../../../components/Modal/ModalComponent";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import SortButton from "../../../../components/Button/SortButton";
import SearchInput from "../../../../components/SearchInput";
import Header from "../../../../components/Header";
import { useMemo, useState } from "react";
import BASE_URI from "../../../../../config";
import useFetch from "../../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import formatDateToIST from "../../../../utils/formatDateToIST";
import { RxDotsHorizontal } from "react-icons/rx";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DepartmentMembers() {
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [editOrDeletePopUp, setEditOrDeletePopUp] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");
  const [memberId, setMemberId] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { id } = useParams();
  const [newMemberData, setNewMemberData] = useState({
    email: "",
    fullname: "",
    department_id: id,
    role: "",
  });

  const token = localStorage.getItem("token");
  let url = `${BASE_URI}/departments/getMembers/${id}?search=${search}&sort=${sortCriteria}&direction=${sortOrder}`;

  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, isLoading, error, refetch } = useFetch(url, fetchOptions);
  const membersdata = data?.data || {};

  let rolesUrl = `${BASE_URI}/roles`;

  const { data: rolesData } = useFetch(rolesUrl, fetchOptions);
  const roles = useMemo(() => {
    return (rolesData?.data?.roles || []).filter(
      (role) => role.is_active === 1
    );
  }, [rolesData]);
  // console.log(rolesData);

  const toggleEditOrDeletePopUp = (id) => {
    setEditOrDeletePopUp((prevEditOrDeletePopUp) => ({
      ...prevEditOrDeletePopUp,
      [id]: !prevEditOrDeletePopUp[id],
    }));
  };

  const handleAddMember = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URI}/employee/addUser`,
        data: newMemberData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAddMember(false);
      refetch();

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteMember = async () => {
    try {
      console.log(id);
      const response = await axios({
        method: selectedMembers?.length === 0 ? "PATCH" : "DELETE",
        url:
          selectedMembers?.length === 0
            ? `${BASE_URI}/departments/${id}`
            : `${BASE_URI}/departments`,
        data:
          selectedMembers?.length === 0
            ? { is_active: 0 }
            : { ids: selectedMembers },

        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // fetchDepartments();
      refetch();
      setDeletePopUp(false);
      setEditOrDeletePopUp(false);
      setSelectedMembers([]);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    setDeletePopUp(!deletePopUp);
  };

  const handleCloseDelete = () => {
    setEditOrDeletePopUp(false);
    setDeletePopUp(false);
  };

  const toggleAddTeamMember = () => {
    setAddMember(!addMember);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleAddMemberChange = (e) => {
    const { name, value } = e.target;
    setNewMemberData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // if (error) {
  //   return <div>Error fetching data</div>;
  // }

  return (
    <div className="bg-lightGray1 pb-5 container-xxl px-0">
      {deletePopUp && (
        <ModalComponent
          heading="Delete Department"
          handleClose={handleCloseDelete}
          handleClick={handleDeleteMember}
          btn1="Cancel"
          btn2="Delete"
        >
          <div className="py-3">
            <h6 className="text-center mb-2">
              Do you really want to remove the members that you have chosen?
            </h6>
            <h6 className="text-center">There is no turning back.</h6>
          </div>
        </ModalComponent>
      )}

      {isEdited && (
        <ModalComponent
          heading="Edit Department"
          //   handleClose={handleCloseEdit}
          //   handleClick={handleEditDepartment}
          btn1="Cancel"
          btn2="Update"
        >
          <div className="py-3">
            <label htmlFor="" className="d-block mb-1">
              Deapartment Name
            </label>
            <input
              type="text"
              //   value={departmentData}
              className="px-3 py-2 rounded border w-100"
              //   onChange={(e) => setDepartmentData(e.target.value)}
            />
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
        >
          <div className="py-3">
            <label htmlFor="fullname" className="d-block mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={newMemberData.fullname}
              placeholder="Enter your name...!"
              className="px-3 py-2 rounded border w-100"
              onChange={handleAddMemberChange}
            />
          </div>
          <div className="py-3">
            <label htmlFor="email" className="d-block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={newMemberData.email}
              placeholder="Enter email...!"
              className="px-3 py-2 rounded border w-100"
              onChange={handleAddMemberChange}
            />
          </div>
          <div className="py-3">
            <label htmlFor="role_id" className="d-block mb-1">
              Select Role
            </label>
            <select
              name="role"
              value={newMemberData.role}
              className="px-3 py-2 rounded border w-100"
              onChange={handleAddMemberChange}
              defaultValue=""
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
          <div className="py-3">
            <label htmlFor="department_id" className="d-block mb-1">
              Department Id
            </label>
            <input
              type="text"
              name="department_id"
              value={newMemberData.department_id}
              placeholder="Enter department id...!"
              className="px-3 py-2 rounded border w-100"
              readOnly
            />
          </div>
        </ModalComponent>
      )}
      {isLoading ? (
        <ShimmerTable row={5} col={5} />
      ) : (
        <div style={{ overflowX: "auto" }}>
          <div className="px-sm-5 px-3" style={{ minWidth: "66rem" }}>
            <div className="top-div-bottom-departments py-3">
              <div className="left-top-div-bottom-departments">
                <h5
                  // onClick={handleSelectAll}
                  className="cursor-pointer"
                >
                  {selectAll ? "Deselect all" : "Select all"}
                </h5>
              </div>
              <div className="right-top-div-bottom-departments">
                <h5>{selectedMembers.length} Departments Selected</h5>
                <h6>
                  <RiDeleteBin6Line
                    className="fs-3"
                    //   onClick={handleDelete}
                  />
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
                            //   checked={selectedDepartments.includes(member.id)}
                            //   onChange={() => handleCheckboxChange(member.id)}
                          />
                          {member.fullname}
                        </td>
                        <td className="text-center py-3">{member.email}</td>
                        <td className="text-center py-3">
                          {formatDateToIST(member.created_at)}
                        </td>
                        <td className="text-center py-3 text-capitalize">
                          {member.role}
                        </td>
                        <td className="text-center position-relative py-3">
                          <RxDotsHorizontal
                            className="fs-4 cursor-pointer"
                            onClick={() => {
                              toggleEditOrDeletePopUp(member.id);
                              setMemberId(member.id);
                            }}
                          />
                          {editOrDeletePopUp[member.id] && (
                            <div className="position-absolute top-75 start-50 translate-middle-x  z-3 border bg-white">
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
            ) : (
              <div
                className="bg-white flex justify-content-center align-items-center"
                style={{ height: "23.5rem" }}
              >
                <div>
                  <h4 className="text-secondary text-center">
                    No Member found!
                  </h4>
                  <p className="text-center text-secondary">
                    Please search something else
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
