import { Card } from "react-bootstrap";
import "../../pages/MyScreen/MyScreen.css";
export default function CustomCard({ title, text }) {
  return (
    <div className="col-md-4 mb-4">
      <Card className=" shadow px-4 ">
        {/* <Card.Img variant="top" src={imgSrc} /> */}
        <Card.Body>
          <Card.Text className="fw-bold">{title}</Card.Text>
          <Card.Title className="text-green">{text}</Card.Title>
          <Card.Img src="src/assets/Chart.png" />

          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
}
