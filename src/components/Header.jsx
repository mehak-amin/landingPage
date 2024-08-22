import { useState, useCallback } from "react";
import ReactDatePicker from "react-datepicker";
import { LuFilter } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import ButtonActive from "./Button/ButtonActive";
import "react-datepicker/dist/react-datepicker.css";

export default function Header({
  heading,
  isMonthFilter,
  isDate,
  selectedStartDate,
  setSelectedStartDate,
  selectedEndDate,
  setSelectedEndDate,
  btnName,
  handleClick,
}) {
  const [activeButton, setActiveButton] = useState("day");
  const [isOpen, setIsOpen] = useState(false);

  const toggleCalendar = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const handleChange = useCallback(
    (date) => {
      if (!date) return;

      let start = new Date(date);
      let end = new Date(date);

      if (activeButton === "week") {
        end.setDate(start.getDate() + 6);
      } else if (activeButton === "month") {
        end.setDate(start.getDate() + 29);
      }

      setSelectedStartDate(start);
      {
        setSelectedEndDate &&
          setSelectedEndDate(activeButton === "day" ? start : end);
      }

      setIsOpen(false);
    },
    [activeButton, setSelectedStartDate, setSelectedEndDate]
  );

  const handleButtonClick = useCallback(
    (type) => {
      setActiveButton(type);
      let start = new Date();
      let end = new Date(start);

      if (type === "week") {
        end.setDate(start.getDate() + 6);
      } else if (type === "month") {
        end.setDate(start.getDate() + 29);
      }

      setSelectedStartDate(start);
      {
        setSelectedEndDate && setSelectedEndDate(type === "day" ? start : end);
      }
    },
    [setSelectedStartDate, setSelectedEndDate]
  );

  const customDateFormat = "MMM dd, yyyy";
  const showWeekNumbers = activeButton === "week";

  return (
    <div className="flex-885px justify-content-between px-md-5 px-3 py-4 bg-white">
      <h5 className="mb-885px custom-shadow d-inline-flex px-3 py-2 rounded text-capitalize">
        {heading}
      </h5>

      <div>
        <div className="d-md-flex gap-3 align-items-center">
          {isDate && (
            <div className="d-flex gap-3 align-items-center justify-content-lg-end justify-content-start mb-3 mb-md-0">
              <div className="calendar-icon" onClick={toggleCalendar}>
                <CiCalendar className="fs-2 cursor-pointer" />
              </div>

              <div
                style={{
                  width: `${activeButton === "day" ? "40%" : "auto"} `,
                }}
              >
                <ReactDatePicker
                  className="border-0 fs-5 w-100"
                  selected={selectedStartDate}
                  startDate={selectedStartDate}
                  endDate={selectedEndDate}
                  onChange={handleChange}
                  dateFormat={customDateFormat}
                  popperPlacement="bottom-end"
                  showPopperArrow={false}
                  showWeekNumbers={showWeekNumbers}
                  open={isOpen}
                  onClickOutside={() => setIsOpen(false)}
                  filterDate={(date) => date.getDay() !== 0}
                  selectsRange={activeButton !== "day"}
                  placeholderText="Select a date range"
                  readOnly
                />
              </div>

              <h3 className="text-center">
                <LuFilter className="text-success" />
              </h3>
            </div>
          )}

          {isMonthFilter ? (
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${
                  activeButton === "day"
                    ? "btn btn-secondary"
                    : "btn-disabled btn-outline-secondary"
                }`}
                onClick={() => handleButtonClick("day")}
              >
                Day
              </button>
              <button
                type="button"
                className={`btn ${
                  activeButton === "week"
                    ? "btn btn-secondary"
                    : "btn-disabled btn-outline-secondary"
                }`}
                onClick={() => handleButtonClick("week")}
              >
                Week
              </button>
              <button
                type="button"
                className={`btn ${
                  activeButton === "month"
                    ? "btn btn-secondary"
                    : "btn-disabled btn-outline-secondary"
                }`}
                onClick={() => handleButtonClick("month")}
              >
                Month
              </button>
            </div>
          ) : (
            btnName && (
              <div>
                <ButtonActive heading={btnName} handleClick={handleClick} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
