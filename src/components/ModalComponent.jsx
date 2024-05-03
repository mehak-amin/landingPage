import { Modal, Button } from "react-bootstrap";
import { RxCrossCircled } from "react-icons/rx";
export default function ModalComponent({
  heading,
  content,
  handleClose,
  show,
  btn1,
  btn2,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{ margin: "2.4rem auto" }}
      className="px-4"
    >
      <Modal.Header
        className="text-white d-flex justify-content-between border-0 rounded-0"
        style={{ backgroundColor: "#6D6D6D" }}
      >
        <Modal.Title className="text-center">{heading}</Modal.Title>
        <RxCrossCircled className="fs-2 cursor-pointer" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer className="flex-nowrap justify-content-around">
        <Button
          variant="secondary"
          onClick={handleClose}
          className="bg-transparent text-dark"
        >
          {btn1}
        </Button>
        <Button variant="primary" className="border-0">
          {btn2}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
