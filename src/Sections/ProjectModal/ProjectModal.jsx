import { Modal, Button } from "react-bootstrap";
import { RxCrossCircled } from "react-icons/rx";
import { useState } from "react";
import "./ProjectModal.css";
export default function ProjectModal({ show, setShow }) {
  const [visibility, setVisibility] = useState("all");

  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
  };
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      style={{ margin: "2.4rem auto" }}
    >
      <Modal.Header
        // closeButton
        className="text-white d-flex justify-content-between border-0 rounded-0"
        style={{ backgroundColor: "#6D6D6D" }}
      >
        <Modal.Title>Create a Project</Modal.Title>
        <RxCrossCircled
          className="fs-2 cursor-pointer"
          onClick={() => setShow(false)}
        />
      </Modal.Header>
      <Modal.Body className="mb-4">
        <form action="" className="d-flex flex-column gap-4">
          <div>
            <label htmlFor="">
              Project Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              className="form-control py-3"
              placeholder="Enter Project Name.."
              required
            />
          </div>

          <div>
            <label htmlFor="">Status</label>
            <select
              name=""
              id=""
              className="custom-select p-3 w-100 border rounded text-lightGray"
            >
              <option value="" disabled>
                --Select Status--
              </option>
              <option value="">Active</option>
              <option value="">Archived</option>
            </select>
          </div>

          <div>
            <label htmlFor="">Visibilty</label>
            <div className="d-flex gap-5 mb-3">
              <div className="d-flex gap-3">
                <input
                  type="radio"
                  id="all"
                  name="visibility"
                  value="all"
                  onChange={handleVisibilityChange}
                  checked={visibility === "all"}
                />
                <label htmlFor="">Visible to all</label>
              </div>
              <div className="d-flex gap-3">
                <input
                  type="radio"
                  id="members"
                  name="visibility"
                  value="members"
                  onChange={handleVisibilityChange}
                  checked={visibility === "members"}
                />
                <label htmlFor="">Limit Visibility</label>
              </div>
            </div>
            <hr />
            <div className="d-flex ">
              <div>
                <label htmlFor="">Individual</label>
                <select name="" id="" className="px-3 py-2 border rounded">
                  <option value="" disabled>
                    --Select Teams--
                  </option>
                  <option value="">Team 1</option>
                  <option value="">Individual</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Members</label>
                <select name="" id="" className="px-3 py-2 border rounded">
                  <option value="" disabled>
                    --Select Members--
                  </option>
                  <option value="">Jonas</option>
                  <option value="">Devin</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="flex-nowrap gap-6 border-0">
        <Button
          variant="secondary"
          className="bg-transparent text-dark"
          onClick={() => setShow(false)}
        >
          Cancel
        </Button>
        <Button variant="primary" className="border-0">
          Create Project
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
