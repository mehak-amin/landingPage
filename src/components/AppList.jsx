import { ShimmerTable } from "react-shimmer-effects";
export default function AppList({ heading, data = "", backgound, loading }) {
  return (
    <>
      {loading ? (
        <ShimmerTable row={5} col={5} />
      ) : (
        <div
          className="rounded border border-1 bg-white mb-5 w-100"
          style={{ minWidth: "60rem" }}
        >
          <h4 className={` text-white px-sm-5 px-3 py-3 ${backgound}`}>
            {heading}
          </h4>
          <div className="row row-cols-4 py-3" style={{ minWidth: "40rem" }}>
            {Array.isArray(data)
              ? data.map((app) => (
                  <div
                    className="col mb-4 d-flex align-items-center gap-2 px-5"
                    key={Object.keys(app)}
                  >
                    <p className="mb-0">{Object.keys(app)}</p>
                    <p className="mb-0">
                      {(app[Object.keys(app)].AllTime / 60).toFixed(0)}m
                    </p>
                  </div>
                ))
              : Object.entries(data).map(([key, value], index) => {
                  return (
                    <div
                      key={index}
                      className="col mb-4 d-flex align-items-center gap-2 px-5"
                    >
                      <p className="mb-0">{key}</p>
                      <p className="mb-0">{(value / 60).toFixed(0)}</p>
                    </div>
                  );
                })}
          </div>
        </div>
      )}
    </>
  );
}
