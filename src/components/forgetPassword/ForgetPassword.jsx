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
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  // const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleResendLink = (e) => {
    e.preventDefault();
    console.log("lalala");
    axios
      .post(`${BASE_URI}/api/v1/users/forgot-password`, { email, password })
      .then((response) => {
        console.log(response);
        console.log(response.data.userData.token);
        setUser(response.data.userData);
        const token = response.data.userData.token;
        localStorage.setItem("token", token);
      });
    // .catch((err) => {
    //   console.log(err);
    //   if (err?.response?.data?.message === "Invalid Credentials") {
    //     setMessage("Incorrect Password");
    //   } else if (
    //     err?.response?.data?.message ===
    //     "No user found with those credentials"
    //   ) {
    //     setMessage("Invalid User");
    //   } else if (
    //     err?.response?.data?.message === "Provide all the credentials"
    //   ) {
    //     setMessage("All fields Required");
    //   }
    // });
  };

  const token = localStorage.getItem("token");
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
          <div className="validation">{message && message}</div>
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
