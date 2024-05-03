import { Link } from "react-router-dom";
export default function ButtonInactive({ heading }) {
  return (
    <button className="col-md-5 border px-1 text-center py-2 rounded fw-normal shadow cursor-pointer fs-5 bg-transparent">
      {heading === "Cancel" ? (
        <Link
          to="/projects"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {heading}
        </Link>
      ) : (
        heading
      )}
    </button>
  );
}
