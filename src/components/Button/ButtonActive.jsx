import { Link } from "react-router-dom";
export default function ButtonActive({ heading, setShow }) {
  return (
    <button
      className="col-md-5 border px-1 text-center py-2 rounded bg-gray text-white shadow cursor-pointer fs-5"
      onClick={() => heading === "New Project" && setShow(true)}
    >
      {heading === "New Task" ? (
        <Link to="newTask" style={{ textDecoration: "none", color: "inherit" }}>
          {heading}
        </Link>
      ) : (
        heading
      )}
    </button>
  );
}
