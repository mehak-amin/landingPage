import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center text-center bg-lightGray1 vh-100 m-0 p-0">
      <div>
        <h1 className="display-1">404</h1>
        <p className="lead">
          Oops! The page you are looking for does not exist.
        </p>
        <Link to="/">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default NotFound;
