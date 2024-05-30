function Dropdown({ label, options, selectedValue, handleChange }) {
  return (
    <div className="w-50">
      <label>{label}</label>
      <select
        value={selectedValue}
        onChange={handleChange}
        className="px-3 py-2"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.role}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
