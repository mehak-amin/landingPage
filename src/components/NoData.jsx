export default function NoData() {
  return (
    <div
      className="d-flex align-items-center justify-content-center bg-lightGray1"
      style={{ minHeight: "calc(100vh - 10.5rem)" }}
    >
      <div>
        <h3 className="text-center"> No data found 🕛</h3>
        <p className="fw-light text-secondary text-center px-2">
          There is no tracking for this date, Please select another date!
        </p>
      </div>
    </div>
  );
}
