import { IoFilterOutline } from "react-icons/io5";

export default function FilterButton() {
  return (
    <button className="border-0 bg-white px-3 rounded h-100">
      <IoFilterOutline className="me-3 fs-5" />
      Filter
    </button>
  );
}
