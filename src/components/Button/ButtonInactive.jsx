import { Link } from "react-router-dom";
export default function ButtonInactive({ heading, handleClick }) {
  return (
    <button
      className=" border px-2 text-center py-2 rounded fw-normal custom-shadow cursor-pointer  bg-transparent scale-up-hover"
      onClick={handleClick}
    >
      {heading}
    </button>
  );
}
