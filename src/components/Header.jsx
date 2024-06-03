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

  // console.log(selectedStartDate);
  // console.log(selectedEndDate);
  const toggleCalendar = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const handleChange = useCallback(
    (date) => {
      if (!date) return;

      if (activeButton === "day") {
        setSelectedStartDate(date);
        {
          setSelectedEndDate && setSelectedEndDate(date);
        }
      } else if (activeButton === "week" || activeButton === "month") {
        const [start, end] = date;
        setSelectedStartDate(start);
        setSelectedEndDate(end);
      }

      setIsOpen(false);
    },
    [activeButton, setSelectedStartDate, setSelectedEndDate]
  );

  const customDateFormat = "MMMM dd, yyyy";
  const showWeekNumbers = activeButton === "week";

  return (
    <div className="d-md-flex justify-content-between px-md-5 px-3 py-4 bg-white">
      <div className="mb-4 mb-md-0">
        <h4 className="mb-0 shadow d-inline px-2 py-2 rounded">{heading}</h4>
      </div>
      <div>
        <div className="d-md-flex gap-3 align-items-center">
          {isDate && (
            <div className="d-flex gap-3 align-items-center justify-content-md-end mb-3 mb-md-0">
              <div className="calendar-icon " onClick={toggleCalendar}>
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
                  filterDate={(date) => date.getDay() != 0}
                  selectsRange={activeButton !== "day"}
                  locale="en"
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
                onClick={() => setActiveButton("day")}
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
                onClick={() => setActiveButton("week")}
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
                onClick={() => setActiveButton("month")}
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
