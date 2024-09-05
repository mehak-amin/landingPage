import { Button, Card } from "react-bootstrap";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { motion } from "framer-motion";

const PricingCard = ({ type, pricing, audience, features }) => {
  return (
    <motion.div
      className="text-center custom-shadow pt-5 pb-3 px-3 rounded-4 border"
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{
        scale: 1.1,
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Card.Header as="h5" className="border-0 text-start fs-3 fw-bold">
        {type}
      </Card.Header>
      <Card.Body>
        <Card.Title className="fw-bold text-start" style={{ fontSize: "1.8rem" }}>
          ${pricing} <span className="text-muted fs-5 fw-normal">/month</span>
        </Card.Title>
        <Card.Subtitle className="pb-4 fs-5 text-start border-bottom border-2 mb-4">
          {audience}
        </Card.Subtitle>
        <Card.Text className="text-start" style={{ marginBlockEnd: "-1rem" }}>
          <ul className="list-unstyled">
            {features.map((feature, index) => (
              <li key={index} className="mb-3" style={{ fontWeight: "600" }}>
                <IoIosCheckmarkCircle className="me-2 fs-5" />
                {feature}
              </li>
            ))}
          </ul>
        </Card.Text>
        <Button
          className="rounded-pill px-5 py-2 border-0 text-white w-auto fw-bold"
          style={{
            background: "linear-gradient(to right, #777777, #333333)",fontSize: "15px", marginTop:"10px"
          }}
        >
          Get Started
        </Button>
      </Card.Body>
    </motion.div>
  );
};
export default PricingCard;
