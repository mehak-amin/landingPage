import { IoIosSearch } from "react-icons/io";

export default function SearchInput({ placeholder, value, setValue }) {
  return (
    <div className="position-relative">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="px-3 py-2 rounded border pe-5 w-100"
        onChange={(e) => setValue(e.target.value)}
      />
      <IoIosSearch className="position-absolute custom-top custom-end fs-5 text-gray" />
    </div>
  );
}
