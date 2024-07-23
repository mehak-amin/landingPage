import { Card, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const ReviewCard = ({
  rating,
  reviewMessage,
  userImage,
  userName,
  userAddress,
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} color={i <= rating ? "#ffc107" : "#e4e5e9"} />
      );
    }
    return stars;
  };

  return (
    <motion.div
      className="mb-3 rounded-4 custom-shadow px-4 py-4 border"
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{
        scale: 1.1,
        backgroundColor: "black",
        color: "white",
      }}
    >
      {/* <Card className="mb-3 rounded-4 custom-shadow px-4 py-4"> */}
      <Card.Body>
        <Row className="mb-5">
          <Col>{renderStars()}</Col>
        </Row>
        <Row className="mb-5" style={{ fontWeight: "600" }}>
          <Col>
            <Card.Text>{reviewMessage}</Card.Text>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs="auto">
            <img
              src={userImage}
              alt={userName}
              className="rounded-circle"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          </Col>
          <Col>
            <Card.Text className="mb-0">
              <strong>{userName}</strong>
            </Card.Text>
            <Card.Text className="text-muted">{userAddress}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      {/* </Card> */}
    </motion.div>
  );
};

export default ReviewCard;
