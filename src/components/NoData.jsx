export default function NoData() {
  return (
    <div
      className="d-flex align-items-center justify-content-center bg-lightGray1 h-100"
      style={{ height: "calc(100vh - 10.5rem)" }}
    >
      <div>
        <h3 className="text-center"> No data found 🕛</h3>
        <p className="fw-light text-secondary">
          There is no tracking for this date, Please select another date!
        </p>
      </div>
    </div>
  );
}
