import { Modal, Button } from "react-bootstrap";
import { RxCrossCircled } from "react-icons/rx";
import "./ModalComponent.css";
export default function ModalComponent({
  heading,
  children,
  handleClose,
  handleClick,
  btn1,
  btn2,
}) {
  return (
    <Modal show onHide={handleClose} centered size="lg">
      <Modal.Header
        className="text-white d-flex justify-content-between border-0 rounded-0 px-5"
        style={{ backgroundColor: "#6D6D6D" }}
      >
        <Modal.Title className="text-center">{heading}</Modal.Title>
        <RxCrossCircled className="fs-2 cursor-pointer" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body className="px-5">{children}</Modal.Body>
      <Modal.Footer className="flex-nowrap justify-content-end px-5 pb-4 border-0">
        <div className="d-flex gap-4">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="bg-transparent text-dark px-5 py-2"
          >
            {btn1}
          </Button>
          <Button
            variant="primary"
            className="border-0 px-5 py-2"
            onClick={handleClick}
          >
            {btn2}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
