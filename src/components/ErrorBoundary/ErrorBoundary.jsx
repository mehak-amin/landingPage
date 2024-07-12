import { useState, useEffect } from "react";
import { Container, Alert, Button } from "react-bootstrap";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error) => {
      setHasError(true);
    };

    const handleRejection = (event) => {
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  if (hasError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Something went wrong. Please try refreshing the page or contact
            support if the issue persists.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => window.location.reload()}
              variant="outline-danger"
            >
              Reload Page
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return children;
};

export default ErrorBoundary;
