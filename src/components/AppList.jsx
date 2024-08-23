import { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ShimmerTable } from "react-shimmer-effects";
import convertSecondsToTime from "../utils/formattingTime";
import { FcElectronics } from "react-icons/fc";
export default function AppList({ heading, data = "", backgound, loading }) {
  const [showAll, setShowAll] = useState(false);
  const location = useLocation();

  const renderPopover = (otherTabs) => {
    const tabs = Object.entries(otherTabs);
    const visibleTabs = showAll ? tabs : tabs.slice(0, 4);

    return (
      <Popover id="popover-basic" className="border-4 border-red border">
        <Popover.Body>
          {visibleTabs.map(([tab, tabData], tabIndex) => (
            <div key={tabIndex} className="flex gap-4 py-2">
              <p className="mb-0">{tab === "" ? "Tab" : tab}</p>
              <div>
                {Object.entries(tabData).map(([key, value], index) => (
                  <div key={`${tabIndex}-${index}`} className="fw-light">
                    {Number.isFinite(value)
                      ? convertSecondsToTime(value)
                      : "No time spent data"}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Popover.Body>
      </Popover>
    );
  };

  const getColorClass = (heading) => {
    switch (heading) {
      case "Productive Apps":
        return "text-green";
      case "Unproductive Apps":
        return "text-red";
      case "Neutral Apps":
        return "text-secondary";
      default:
        return "text-dark";
    }
  };

  return (
    <>
      {loading ? (
        <ShimmerTable row={5} col={5} />
      ) : (
        <div
          className="rounded border border-1 bg-white mb-5 w-100"
          style={{ minWidth: "60rem" }}
        >
          <h5 className={` text-white px-sm-5 px-3 py-3 ${backgound}`}>
            {heading}
          </h5>

          <div className="row row-cols-3 py-3" style={{ minWidth: "40rem" }}>
            {location.pathname === "/admin/dashboard" ? (
              data?.length > 0 ? (
                data?.map((app, index) => {
                  const appName = Object.keys(app)[0];
                  const appTime = app[appName];
                  return (
                    <div
                      className="col mb-4 d-flex align-items-center gap-2 px-5"
                      key={index}
                    >
                      {!app.logo ? (
                        <FcElectronics className="fs-2" />
                      ) : (
                        <img
                          src={app.logo}
                          alt={`${appName} logo`}
                          style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <p className="mb-0">{appName}</p>
                      <p className={`mb-0 fw-bold ${getColorClass(heading)}`}>
                        {convertSecondsToTime(appTime)}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="px-4 d-flex align-items-center justify-content-center h-75 w-100">
                  <div>
                    <h5 className="text-center fw-light text-secondary">
                      No, data found!
                    </h5>
                  </div>
                </div>
              )
            ) : data?.length > 0 ? (
              data.map((app, index) => {
                const appName = Object.keys(app).find((key) => key !== "logo");
                const appDetails = app[appName];
                const { AllTime, ...otherTabs } = appDetails;
                const logo = app.logo;

                return (
                  <OverlayTrigger
                    trigger={["click", "focus"]}
                    placement="bottom"
                    overlay={renderPopover(otherTabs)}
                    key={index}
                  >
                    <div className="col mb-4 d-flex align-items-center gap-2 px-5 cursor-pointer">
                      <img
                        src={logo}
                        alt={appName}
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          objectFit: "cover",
                        }}
                      />
                      <p className="mb-0">{appName}</p>
                      <p className={`mb-0 fw-bold ${getColorClass(heading)}`}>
                        {convertSecondsToTime(AllTime)}
                      </p>
                    </div>
                  </OverlayTrigger>
                );
              })
            ) : (
              <div className="px-4 d-flex align-items-center justify-content-center h-75 w-100">
                <div>
                  <h5 className="text-center fw-light text-secondary">
                    No data found!
                  </h5>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
