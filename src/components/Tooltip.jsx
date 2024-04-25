import { Popover } from "react-bootstrap";
export default function Tooltip() {
  return (
    <Popover style={{ boxShadow: "-1px 2px 5px rgba(0,0,0,0.1)" }}>
      <Popover.Content>
        <div className="d-flex justify-content-between">
          <p>Chat 1</p>
          <p>32m</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Chat 2</p>
          <p>32m</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Chat 3</p>
          <p>32m</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Chat 4</p>
          <p>32m</p>
        </div>
      </Popover.Content>
    </Popover>
  );
}
