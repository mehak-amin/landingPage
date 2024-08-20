import { RiDeleteBin6Line } from "react-icons/ri";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ModalComponent from "./Modal/ModalComponent"; // Ensure this is the correct path
import BASE_URI from "../../config";

export default function Screenshots({ data }) {
  const [showAll, setShowAll] = useState(false);
  const [selectedScreenshots, setSelectedScreenshots] = useState([]);
  const [isDelete, setIsDelete] = useState(false); // State to control the modal visibility

  // Ensure snaps is an empty array if data is undefined or null
  const snaps = showAll ? data || [] : data?.slice(0, 8) || [];

  const handleSelectScreenshot = (id) => {
    if (selectedScreenshots.includes(id)) {
      setSelectedScreenshots((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedScreenshots((prev) => [...prev, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedScreenshots.length === snaps.length) {
      setSelectedScreenshots([]);
    } else {
      setSelectedScreenshots(snaps.map((item) => item.id));
    }
  };

  const handleDeleteScreenshots = async () => {
    try {
      const response = await axios.post(
        `${BASE_URI}/snapshots/snap`,
        {
          ids: selectedScreenshots,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        toast.success("Screenshots deleted successfully");
        setSelectedScreenshots([]);
        setIsDelete(false);
      } else {
        toast.error("Failed to delete screenshots: " + response.statusText);
      }
    } catch (error) {
      // console.error("Error deleting screenshots:", error);

      const errorMessage =
        error.response?.data?.message || "Failed to delete screenshots";
      toast.error(errorMessage);
    }
  };

  const handleOpenDeleteModal = () => {
    setIsDelete(true);
  };

  const handleCloseDelete = () => {
    setIsDelete(false);
  };

  return (
    <div className="mb-4">
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

      <div className="px-sm-5 px-3 py-2 bg-graySecondary d-flex align-items-center justify-content-between">
        <div className="bg-white px-3 py-1 rounded-1 shadow fw-bolder">
          <span className="d-none d-sm-inline">Screenshots Selected</span>{" "}
          {selectedScreenshots.length}
        </div>
        <div className="d-flex gap-3 align-items-center">
          <button
            className="px-3 py-1 border-0 rounded-1 fw-bolder"
            onClick={handleSelectAll}
          >
            {selectedScreenshots.length === snaps.length
              ? "Deselect all"
              : "Select all"}
          </button>
          <RiDeleteBin6Line
            className="fs-3"
            style={{ cursor: "pointer" }}
            onClick={handleOpenDeleteModal}
          />
        </div>
      </div>
      {snaps.length > 0 ? (
        <div className="d-flex gap-4 flex-wrap p-5">
          {snaps?.map((item) => {
            return (
              <div key={item.id} className="position-relative">
                <input
                  type="checkbox"
                  checked={selectedScreenshots.includes(item.id)}
                  onChange={() => handleSelectScreenshot(item.id)}
                  className="position-absolute top-0 end-0 translate-middle-x bg-white z-2"
                  style={{
                    width: "1.3rem",
                    height: "1.3rem",
                    cursor: "pointer",
                  }}
                />
                <img
                  src={item.screenshot_url}
                  alt=""
                  style={{
                    width: "15rem",
                    height: "15rem",
                    objectFit: "cover",
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="px-4 py-2 d-flex align-items-center justify-content-center h-75">
          <div>
            <h5 className="text-center fw-light text-secondary">
              No, data found!
            </h5>
          </div>
        </div>
      )}
      {data?.length > 8 && (
        <div className="d-flex justify-content-end px-5 ">
          {showAll ? (
            <button
              onClick={() => setShowAll(false)}
              className=" d-flex align-items-center gap-1 bg-transparent px-1 rounded border p-1 scale-up-hover"
            >
              View less <GoChevronUp />
            </button>
          ) : (
            <button
              onClick={() => setShowAll(true)}
              className=" d-flex align-items-center gap-1 bg-transparent px-1 rounded border p-1 scale-up-hover"
            >
              View all <GoChevronDown />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
