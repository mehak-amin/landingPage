// import { Link } from "react-router-dom";
export default function ButtonActive({ heading, handleClick }) {
  // console.log(heading);
  return (
    <button
      className=" border  text-center px-3 py-2 rounded bg-gray text-white custom-shadow cursor-pointer scale-up-hover"
      onClick={handleClick}
    >
      {heading}
    </button>
  );
}
