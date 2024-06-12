import { BiSortAlt2 } from "react-icons/bi";

export default function SortButton() {
  return (
    <button className="border-0 bg-white px-3 py-2 rounded h-100">
      <BiSortAlt2 className="me-3 fs-5" />
      Sort
    </button>
  );
}
