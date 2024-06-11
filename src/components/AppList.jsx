import { OverlayTrigger, Popover } from "react-bootstrap";
import { ShimmerTable } from "react-shimmer-effects";
export default function AppList({ heading, data = "", backgound, loading }) {
  const renderPopover = (app) => {
    return (
      <Popover id="popover-basic" className="border-4 border-red border">
        <Popover.Body>
          {Object.entries(app).map(([appName, appData], appIndex) => (
            <div key={appIndex}>
              <strong>{appName}</strong>
              {Object.entries(appData).map(([tab, tabData], tabIndex) => (
                <div
                  key={`${appIndex}-${tabIndex}`}
                  className="flex gap-4 py-2"
                >
                  {tab === "AllTime" ? "" : tab}

                  {Object.entries(tabData).map(([key, value], index) => (
                    <div key={`${tabIndex}-${index}`} className="fw-light">{`${(
                      value / 60
                    ).toFixed(2)}min`}</div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </Popover.Body>
      </Popover>
    );
  };

  const getColorClass = (heading) => {
    // console.log(heading);
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
          <div className="row row-cols-4 py-3" style={{ minWidth: "40rem" }}>
            {Array.isArray(data) ? (
              data?.length > 0 ? (
                data?.map((app) => (
                  <OverlayTrigger
                    trigger={["click", "focus"]}
                    placement="bottom"
                    overlay={renderPopover(app)}
                    key={Object.keys(app)}
                  >
                    <div className="col mb-4 d-flex align-items-center gap-3 px-5 cursor-pointer">
                      <p className="mb-0">{Object.keys(app)}</p>
                      <p className={`mb-0 fw-bold ${getColorClass(heading)}`}>
                        {(app[Object.keys(app)].AllTime / 60).toFixed(0)}m
                      </p>
                    </div>
                  </OverlayTrigger>
                ))
              ) : (
                <div className="px-4 d-flex align-items-center justify-content-center h-75">
                  <div>
                    <h5 className="text-center fw-light text-secondary">
                      No, data found!
                    </h5>
                    {/* <p>
                      No, tracking for this date please select another date.
                    </p> */}
                  </div>
                </div>
              )
            ) : Object.entries(data)?.length > 0 ? (
              Object.entries(data).map(([key, value], index) => {
                return (
                  <div
                    key={index}
                    className="col mb-4 d-flex align-items-center gap-2 px-5"
                  >
                    <p className="mb-0">{key}</p>
                    <p className={`mb-0 fw-bold ${getColorClass(heading)}`}>
                      {(value / 60).toFixed(0)}m
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
                  {/* <p>No, tracking for this date please select another date.</p> */}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
