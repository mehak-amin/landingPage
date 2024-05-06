import ButtonActive from "./Button/ButtonActive";
import ButtonInactive from "./Button/ButtonInactive";

export default function VentureHeader({ heading, name, setShow }) {
  return (
    <div className="container mt-1 p-0">
      <div className="row px-5 py-4">
        <div className="col-md-8 mb-4 mb-md-0">
          <h4 className="mb-0 shadow d-inline px-2 py-2 rounded">{heading}</h4>
        </div>
        <div className="col-md-4">
          <div className="row gap-3 mb-2">
            <ButtonActive heading={name} setShow={setShow} />

            <ButtonInactive heading="Integrations" />
          </div>
          <div className="row gap-3">
            <ButtonInactive heading="Data Exports" />

            <ButtonInactive heading="Reports" />
          </div>
        </div>
      </div>
    </div>
  );
}
