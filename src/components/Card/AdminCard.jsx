import { PiFlowArrowLight } from "react-icons/pi";
export default function AdminCard({ icon, title, data, percent }) {
  return (
    <div className="px-4 py-5 shadow mb-5" style={{ width: "17rem" }}>
      <div className="d-flex align-items-center gap-5 mb-5">
        <span className="fs-2">{icon}</span>
        <h5 className="mb-0 fs-4" style={{ letterSpacing: "2px" }}>
          {title}
        </h5>
      </div>
      <div className="d-flex" style={{ gap: "4rem" }}>
        <h5 className="mb-0 fs-4">{data}</h5>
        <button
          className="border-0 px-3 rounded-pill text-white"
          style={{ backgroundColor: "#6d6d6d" }}
        >
          <PiFlowArrowLight className="me-2" />
          <span>{percent}</span>
        </button>
      </div>
    </div>
  );
}
