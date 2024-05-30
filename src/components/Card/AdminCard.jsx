export default function AdminCard({ icon, title, data }) {
  return (
    <div
      className="px-4 py-4 shadow mb-5 bg-white w-100"
      style={{ minWidth: "17rem" }}
    >
      <div className="d-flex align-items-center justify-content-center gap-4 mb-5">
        <span className="fs-2">{icon}</span>
        <h6 className="mb-0 fs-3 fw-light" style={{ letterSpacing: "2px" }}>
          {title}
        </h6>
      </div>

      <h5 className="mb-0 fs-3 text-secondary text-center">{data}</h5>
    </div>
  );
}
