import "./ForgetPassword";
import { useState } from "react";
import signInImg from "../../assets/MacBook Air (2022).svg";
import googleLogo from "../../assets/google.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import BASE_URI from "../../../config";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  axios.defaults.withCredentials = true;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const token = localStorage.getItem("token");
  const handleResendLink = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URI}/users/forgot-password`,
        {
          email: email,
        },
        {
          headers: {
            // Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(response.data.status);
      if (response.data.status === "Success") {
        setMessage("Password reset link has been sent to your email.");
      }
      //  else {
      //   setError("This email address does not have an account.");
      // }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  if (token && user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login">
      <div className="image-section-login">
        <div className="image-holder">
          <img src={signInImg} alt="" className="image-fluid" />
        </div>
      </div>

      <div className="container form-section-login">
        <h1 className="signin-heading-login mb-2">Password Recovery</h1>
        <p className="signIn-subHeading-login mb-4 text-center">
          Provide your email address, and we'll help you get back on track right
          away
        </p>

        <form action="" onSubmit={handleResendLink}>
          <div className="input-col mb-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div
              className={`inputwithicon-login ${isFocused ? "focused" : ""}`}
            >
              <div className="input-icon-holder-login">
                <FontAwesomeIcon icon={faEnvelope} size="sm" />
              </div>
              <input
                type="email"
                // className="form-control"
                id="email"
                placeholder="enter Email..."
                value={email}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="btn-holder-login">
            <button
              type="submit"
              className="btn-login "
              onClick={handleResendLink}
            >
              Send Password Reset Link
            </button>
          </div>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {/* <div className="validation">{message && message}</div> */}
          <div className="socio-login my-4">
            <div>or continue with</div>
            <div className="google-logo">
              <span>
                <img src={googleLogo} alt="" className="google-img" />
              </span>
              Google
            </div>
          </div>

          <div className="signUp-link-holder d-flex justify-content-center align-items-center">
            <span className="signUp-link px-5">
              <Link to="/" className="link">
                Back To Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
