import HSBar from "react-horizontal-stacked-bar-chart";
import { useState } from "react";
import { LuFilter } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import Card from "../../components/Card/Card";
import { BarChart, Bar, XAxis } from "recharts";
// import { OverlayTrigger, Popover } from "react-bootstrap";

import "./MyScreen.css";
function MyScreen() {
  const [activeButton, setActiveButton] = useState("day");
  const generateData = () => {
    const data = [];
    const total = 1; // Total sum of productive, unproductive, and neutral

    // Generate time slots from '10:00 AM' to '5:00 PM' with 10-minute intervals
    for (let hour = 10; hour <= 17; hour++) {
      // hours from 10 AM to 5 PM
      for (let minute = 0; minute < 60; minute += 10) {
        // 10-minute intervals
        const timeSlot = `${(hour % 12).toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;

        // Generate random values for productive, unproductive, and neutral
        const productive = Math.random() * total; // Random value between 0 and 1
        const unproductive = Math.random() * (total - productive); // Random value between 0 and remaining total
        const neutral = total - (productive + unproductive); // Remaining total

        data.push({ timeSlot, productive, unproductive, neutral });
      }
    }

    return data;
  };

  const data = generateData();
  // console.log(data);

  const formatXAxis = (tickItem) => {
    console.log(tickItem);
    if (
      tickItem === "10:00 AM" ||
      tickItem === "01:00 PM" ||
      tickItem === "04:00 PM"
    ) {
      console.log(tickItem);
      return tickItem;
    } else {
      return "";
    }
  };

  const appData = [
    {
      id: 0,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "WhatsApp",
      TimeUsed: "50m",
    },
    {
      id: 1,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Instagram",
      TimeUsed: "30m",
    },
    {
      id: 2,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Facebook",
      TimeUsed: "50m",
    },
    {
      id: 3,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "YouTube",
      TimeUsed: "50m",
    },
    {
      id: 4,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Twitter",
      TimeUsed: "50m",
    },
    {
      id: 5,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Snapchat",
      TimeUsed: "50m",
    },
    {
      id: 6,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "TikTok",
      TimeUsed: "50m",
    },
    {
      id: 7,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "LinkedIn",
      TimeUsed: "50m",
    },
    {
      id: 8,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Netflix",
      TimeUsed: "50m",
    },
    {
      id: 9,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Spotify",
      TimeUsed: "50m",
    },
    {
      id: 10,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "YouTube",
      TimeUsed: "50m",
    },
    {
      id: 11,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Twitter",
      TimeUsed: "50m",
    },
    {
      id: 12,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Snapchat",
      TimeUsed: "50m",
    },
    {
      id: 13,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "TikTok",
      TimeUsed: "50m",
    },
    {
      id: 14,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "LinkedIn",
      TimeUsed: "50m",
    },
    {
      id: 15,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Netflix",
      TimeUsed: "50m",
    },
    {
      id: 16,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Spotify",
      TimeUsed: "50m",
    },
    {
      id: 17,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "LinkedIn",
      TimeUsed: "50m",
    },
    {
      id: 18,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Netflix",
      TimeUsed: "50m",
    },
    {
      id: 19,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Spotify",
      TimeUsed: "50m",
    },
    {
      id: 20,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Spotify",
      TimeUsed: "50m",
    },
    {
      id: 21,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "LinkedIn",
      TimeUsed: "50m",
    },
    {
      id: 22,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Netflix",
      TimeUsed: "50m",
    },
    {
      id: 23,
      Logo: "src/assets/ic_sharp-whatsapp.svg",
      AppName: "Spotify",
      TimeUsed: "50m",
    },
  ];

  const timeData = [
    { value: 3, color: "#3D78CA", label: "Email" },
    { value: 1, color: "#FF662F", label: "Social Media" },
    { value: 12, color: "#003074", label: "Office Apps" },
    { value: 8, color: "#36C449", label: "News" },
    { value: 2, color: "#882FFF", label: "Entertainment" },
  ];

  const legendItems = [
    { color: "#3D78CA", label: "Email" },
    { color: "#FF662F", label: "Social Media" },
    { color: "#003074", label: "Office Apps" },
    { color: "#36C449", label: "News" },
    { color: "#882FFF", label: "Entertainment" },
  ];

  // const renderPopover = (app) => (
  //   <Popover id={`${app.AppName}-popover`}>
  //     <Popover.Title as="h3">{app.AppName}</Popover.Title>
  //     <Popover.Content>
  //       {app.AppName} Usage: {app.TimeUsed} hours
  //     </Popover.Content>
  //   </Popover>
  // );

  return (
    <>
      <div className="container mt-1 p-0">
        <div className="row px-4 py-4">
          <div className="col-md-7 mb-4 mb-md-0">
            <h4 className="mb-0 shadow d-inline px-2 py-2 rounded">
              My Screen
            </h4>
          </div>

          <div className="col-md-5 ">
            <div className="row align-items-center">
              <div className="col-5 col-sm-5 mb-sm-0 d-flex align-items-center justify-content-between">
                <h2>
                  <CiCalendar />
                </h2>
                <h5 className="mb-0">April 23, 2024</h5>
              </div>

              <div className="col-auto">
                <h3 className="text-center">
                  <LuFilter className="text-success" />
                </h3>
              </div>

              <div className="col-5">
                <div className="btn-group w-100" role="group">
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
                      activeButton === "month"
                        ? "btn btn-secondary"
                        : "btn-disabled btn-outline-secondary"
                    }`}
                    onClick={() => setActiveButton("month")}
                  >
                    Month
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="custom-bg-opacity  px-5 pb-4">
          <div className="container py-4">
            {/* First Row */}
            <div className="row mb-4 gx-5">
              <Card title="Arrival Time" text="5:15" />
              <Card title="Desktime" text="5h 15m" s />
              <Card title="Productive Time" text="3h 12m" s />
            </div>

            {/* Second Row */}
            <div className="row gx-5">
              <Card title="Productivity" text="75.3%" />
              <Card title="Effectiveness" text="71.7%" />
              <Card title="Left Time" text="15:15" />
            </div>
          </div>
          <div className="px-3 py-2 border-4 border-white border rounded mb-5">
            <p className="fs-4 fw-medium">Productivity Bar</p>
            <div
              className="text-center barChart"
              // style={{ overflowX: "auto", maxWidth: "100%" }}
            >
              <BarChart
                width={data.length * 28}
                height={300}
                data={data}
                barSize={20} // Adjust bar size for better visibility
                barGap={0}
                barCategoryGap={1}
                margin={{ top: 30, right: 40, bottom: 30, left: 40 }}
              >
                <XAxis
                  dataKey="timeSlot"
                  interval={0}
                  height={70}
                  tickFormatter={formatXAxis}
                />

                <Bar dataKey="productive" fill="#36c449" stackId="a" />
                <Bar dataKey="unproductive" fill="#ff662f" stackId="a" />
                <Bar dataKey="neutral" fill="#D3D3D3" stackId="a" />
              </BarChart>
            </div>
          </div>

          <div className="rounded border border-1 bg-white mb-5">
            <h4 className="bg-lightgreen text-white px-3 py-3">
              Productive Apps
            </h4>
            <div className="row row-cols-4">
              {appData.map((app) => (
                <div
                  className="col mb-4 d-flex align-items-center gap-2 px-5"
                  key={app.id}
                >
                  {/* <OverlayTrigger
                    key={app.id}
                    trigger="click"
                    placement="bottom"
                    overlay={renderPopover(app)}
                  
                  > */}
                  <img src={app.Logo} alt="..." />
                  {/* </OverlayTrigger> */}
                  <p className="mb-0">{app.AppName}</p>
                  <p className="mb-0">{app.TimeUsed}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded border border-1 bg-white mb-5">
            <h4 className="bg-red text-white px-3 py-3">Unproductive Apps</h4>
            <div className="row row-cols-4">
              {appData.map((app) => (
                <div
                  className="col mb-4 d-flex align-items-center gap-2 px-5"
                  key={app.id}
                >
                  <img src={app.Logo} alt="..." />
                  <p className="mb-0">{app.AppName}</p>
                  <p className="mb-0">{app.TimeUsed}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded border border-1 bg-white mb-5">
            <h4 className="bg-lightGray text-white px-3 py-3">Neutral Apps</h4>
            <div className="row row-cols-4">
              {appData.map((app) => (
                <div
                  className="col mb-4 d-flex align-items-center gap-2 px-5"
                  key={app.id}
                >
                  <img src={app.Logo} alt="..." />
                  <p className="mb-0">{app.AppName}</p>
                  <p className="mb-0">{app.TimeUsed}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded shadow px-5 pb-4">
            <p className="py-3 px-1 fs-4 fw-medium">Categories</p>

            <div className="legend-container">
              {legendItems.map((item, index) => (
                <div key={index} className="legend-item">
                  <span
                    className="legend-color"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="legend-label">{item.label}</span>
                </div>
              ))}
            </div>
            <HSBar id="hsbarExample" data={timeData} showLegend={false} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyScreen;
