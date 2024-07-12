import "./CalendarWeek.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function CalendarWeek() {
  const employees = [
    {
      icon: faUser,
      name: "Basit Bashir",
      position: "UI/UX",
    },
    {
      icon: faUser,
      name: "Jasia Hassan",
      position: "Backend Dev.",
    },
    {
      icon: faUser,
      name: "Farhana Bukhari",
      position: "Frontend Dev.",
    },
    {
      icon: faUser,
      name: "Sabreena Geelani",
      position: "Frontend Dev.",
    },
    {
      icon: faUser,
      name: "Raneesa Shafi",
      position: "Frontend Dev.",
    },
    {
      icon: faUser,
      name: "Rukaiya  Yousuf",
      position: "Backend Dev.",
    },
    {
      icon: faUser,
      name: "Tehleel Azad",
      position: "Backend Dev.",
    },
    {
      icon: faUser,
      name: "Adeeba Ali",
      position: "Backend Dev.",
    },
    {
      icon: faUser,
      name: "Sabreena Geelani",
      position: "Frontend Dev.",
    },
    {
      icon: faUser,
      name: "Raneesa Shafi",
      position: "Frontend Dev.",
    },
    {
      icon: faUser,
      name: "Rukaiya  Yousuf",
      position: "Backend Dev.",
    },
    {
      icon: faUser,
      name: "Tehleel Azad",
      position: "Backend Dev.",
    },
  ];
  const activities = [
    {
      date: "15 Apr",
      taskDone: "out of office",
    },
    {
      date: "15 Apr",
      taskDone: "sick leave",
    },
    {
      date: "15 Apr",
      taskDone: "Business trip",
    },
    {
      date: "15 Apr",
      taskDone: "out of office",
    },
    {
      date: "15 Apr",
      taskDone: "sick leave",
    },
    {
      date: "15 Apr",
      taskDone: "Business trip",
    },
    {
      date: "15 Apr",
      taskDone: "out of office",
    },
    {
      date: "15 Apr",
      taskDone: "sick leave",
    },
    {
      date: "15 Apr",
      taskDone: "Business trip",
    },
    {
      date: "15 Apr",
      taskDone: "out of office",
    },
    {
      date: "15 Apr",
      taskDone: "sick leave",
    },
    {
      date: "15 Apr",
      taskDone: "Business trip",
    },
  ];
  return (
    <>
      <div className="day-calandar d-flex py-2 bg-body">
        <div className=" width-20">
          <div className="px-4 py-3 fw-bold">Employees</div>
          <ul className="list-unstyled">
            <li>
              <div className=" ">
                {employees.map((employees, index) => (
                  <div key={index} className="d-flex  p-0">
                    <div className="employeId d-flex align-items-center justify-content-start border-1 w-100 py-1 px-3 gap-4 text-secondary">
                      <span>
                        <FontAwesomeIcon
                          icon={employees.icon}
                          className="custom-icon"
                        />
                      </span>
                      <div className="fs-16 fw-normal">
                        <p className="fw-semibold m-0">{employees.name}</p>
                        <p className="fs-vsmall m-0"> {employees.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </li>
          </ul>
        </div>
        <div className=" calendar">
          <div className="calendar-slider">
            <ul className="d-flex align-items-center list-unstyled gap-5 m-0 px-4 py-1 fw-bold">
              <li className="text-center">
                Monday <br />
                15
                <ul className="list-unstyled">
                  <li className="border">aaaaa</li>
                  <li>bbbb</li>
                  <li>cccc</li>
                </ul>
              </li>
              <li className="text-center">
                Tuesday
                <br />
                15
                <ul className="list-unstyled">
                  <li className="border">aaaaa</li>
                  <li>bbbb</li>
                  <li>cccc</li>
                </ul>
              </li>
              <li className="text-center">
                Wednesday
                <br />
                15
              </li>
              <li className="text-center">
                Thursday
                <br />
                15
              </li>
              <li className="text-center">
                Friday
                <br />
                15
              </li>
              <li className="text-center weekend-color">
                Saturday
                <br />
                15
              </li>
              <li className="text-center weekend-color">
                Sunday
                <br />
                15
              </li>
            </ul>
            {/* </div> */}
            {/* <div className="activity-holder border-1 py-1 px-2">
              <div className=" activity bg-trip width-20 rounded-sm px-2 text-white text-center py-1  d-flex align-items-center justify-content-center flex-column">
                <p className="m-0">lalal</p>
                <p className="m-0 ">gagaga</p>
              </div>
            </div>
            <div className="activity-holder border-1 py-1 px-2">
              <div className=" activity bg-trip width-20 rounded-sm px-2 text-white text-center py-1  d-flex align-items-center justify-content-center flex-column">
                <p className="m-0">lalal</p>
                <p className="m-0 ">gagaga</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col " className="px-4 py-3 fw-bold">
              Employees
            </th>
            <th scope="col">
              Monday
              <br />
              15
            </th>
            <th scope="col">
              Tuesday
              <br />
              15
            </th>
            <th scope="col">
              Wednesday
              <br />
              15
            </th>
            <th scope="col">
              Thursday
              <br />
              15
            </th>
            <th scope="col">
              Friday
              <br />
              15
            </th>
            <th scope="col">
              Saturday
              <br />
              15
            </th>
            <th scope="col">
              Sunday
              <br />
              15
            </th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr>
            <th scope="row">
              <div className=" ">
                {employees.map((employees, index) => (
                  <div
                    key={index}
                    className="d-flex  p-0 top-border bottom-border"
                  >
                    <div className="employeId d-flex align-items-center justify-content-start border-1 w-100 py-1 px-3 gap-4 text-secondary">
                      <span>
                        <FontAwesomeIcon
                          icon={employees.icon}
                          className="custom-icon"
                        />
                      </span>
                      <div className="fs-16 fw-normal">
                        <p className="fw-semibold m-0">{employees.name}</p>
                        <p className="fs-vsmall m-0 text-start">
                          {employees.position}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </th>
            <td className=" p-0">
              <div className=" ">
                {activities.map((activities, index) => (
                  <div
                    key={index}
                    className="d-flex  p-0 top-border bottom-border"
                  >
                    <div className="employeId d-flex align-items-center justify-content-start border-1 w-100 py-1 px-3 gap-4 text-secondary">
                      <div className="fs-16 fw-normal">
                        <p className="fw-semibold m-0">{activities.date}</p>
                        <p className="fs-vsmall m-0 text-start">
                          {activities.taskDone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </td>
            <td className="p-0">
              {" "}
              <div className=" ">
                {activities.map((activities, index) => (
                  <div
                    key={index}
                    className="d-flex  p-0 top-border bottom-border"
                  >
                    <div className="employeId d-flex align-items-center justify-content-start border-1 w-100 py-1 px-3 gap-4 text-secondary">
                      <div className="fs-16 fw-normal">
                        <p className="fw-semibold m-0">{activities.date}</p>
                        <p className="fs-vsmall m-0 text-start">
                          {activities.taskDone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </td>
            <td className="p-0">
              <div className=" ">
                {activities.map((activities, index) => (
                  <div
                    key={index}
                    className="d-flex  p-0 top-border bottom-border"
                  >
                    <div className="employeId d-flex align-items-center justify-content-start border-1 w-100 py-1 px-3 gap-4 text-secondary">
                      <div className="fs-16 fw-normal">
                        <p className="fw-semibold m-0">{activities.date}</p>
                        <p className="fs-vsmall m-0 text-start">
                          {activities.taskDone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </td>
            <td className="p-0">
              {" "}
              <div className=" ">
                {activities.map((activities, index) => (
                  <div
                    key={index}
                    className="d-flex  p-0 top-border bottom-border"
                  >
                    <div className="employeId d-flex align-items-center justify-content-start border-1 w-100 py-1 px-3 gap-4 text-secondary">
                      <div className="fs-16 fw-normal">
                        <p className="fw-semibold m-0">{activities.date}</p>
                        <p className="fs-vsmall m-0 text-start">
                          {activities.taskDone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </td>
            <td className="p-0">
              {" "}
              <div className=" ">
                {activities.map((activities, index) => (
                  <div
                    key={index}
                    className="d-flex  p-0 top-border bottom-border"
                  >
                    <div className="employeId d-flex align-items-center justify-content-start border-1 w-100 py-1 px-3 gap-4 text-secondary">
                      <div className="fs-16 fw-normal">
                        <p className="fw-semibold m-0">{activities.date}</p>
                        <p className="fs-vsmall m-0 text-start">
                          {activities.taskDone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </td>
            <td>@mdo</td>
            <td>Otto</td>
          </tr>
          {/* <tr>
            <th scope="row"></th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td colspan="1" className="bg-primary">
              Larry the Bird
            </td>
            <td>@twitter</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
}

export default CalendarWeek;
