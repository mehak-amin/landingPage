import { Link } from "react-router-dom";
export default function ButtonInactive({ heading }) {
  return (
    <button className=" border px-2 text-center py-2 rounded fw-normal custom-shadow cursor-pointer  bg-transparent scale-up-hover">
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
