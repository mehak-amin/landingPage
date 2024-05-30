// import { Link } from "react-router-dom";
export default function ButtonActive({ heading, handleClick }) {
  // console.log(heading);
  return (
    <button
      className=" border  text-center px-1 py-2 rounded bg-gray text-white shadow cursor-pointer fs-5"
      onClick={handleClick}
    >
      {heading}
    </button>
  );
}
