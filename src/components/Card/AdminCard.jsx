export default function AdminCard({ icon, title, data = "--", page }) {
  return (
    <div
      className={`px-4 py-4  mb-5 bg-white w-100 rounded-3 custom-shadow min-width-xs ${
        page !== "teammateDetails" ? "min-width-17" : ""
      }`}
    >
      <div className="d-flex align-items-center justify-content-center gap-4 mb-5">
        <span className="fs-2">{icon}</span>
        <h6
          className={`mb-0 ${
            page === "teammateDetails" ? "fs-5" : "fs-4 fw-light"
          }`}
          style={{ letterSpacing: "2px" }}
        >
          {title}
        </h6>
      </div>

      <h5
        className={`mb-0  text-secondary text-center ${
          page === "teammateDetails" ? "fs-5" : "fs-4"
        }`}
      >
        {data}
      </h5>
    </div>
  );
}
