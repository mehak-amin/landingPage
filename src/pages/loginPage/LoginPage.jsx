import { useState } from "react";
import signInImg from "../../assets/MacBook Air (2022).svg";
import googleLogo from "../../assets/google.jpg";
import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import BASE_URI from "../../../config";

axios.defaults.withCredentials = true;
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientId, setClientId] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});
  // const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URI}/users/login`, { email, password, client_id: clientId })
      .then((response) => {
        console.log(response.data);

        setUser(response.data.Data);
        const token = response.data.token;
        localStorage.setItem("token", token);
      })
      .catch((err) => {
        if (err?.response?.data?.message === "Invalid Credentials") {
          setMessage("Incorrect Password");
        } else if (
          err?.response?.data?.message ===
          "No user found with those credentials"
        ) {
          setMessage("Invalid User");
        } else if (
          err?.response?.data?.message === "Provide all the credentials"
        ) {
          setMessage("All fields Required");
        }
      });
  };

  const token = localStorage.getItem("token");

  if (token && user) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="login">
      <div className="image-section-login">
        <div className="image-holder">
          <img src={signInImg} alt="" className="image-fluid" />
        </div>
      </div>

      <div className="container form-section-login">
        <h1 className="signin-heading-login mb-2">Welcome Back</h1>
        <p className="signIn-subHeading-login mb-4">Login to continue</p>
        {/* --------------- */}
        <form action="" onSubmit={handleSubmit}>
          <div className="input-col">
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

          <div className="input-col">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div
              className={`inputwithicon-login ${isFocused ? "focused" : ""}`}
            >
              <div className="input-icon-holder-login">
                <FontAwesomeIcon icon={faEye} size="sm" />
              </div>
              <input
                type="password"
                id="password"
                placeholder="enter Password......"
                value={password}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="input-col">
            <label htmlFor="clientId" className="form-label">
              Client Id
            </label>
            <div
              className={`inputwithicon-login ${isFocused ? "focused" : ""}`}
            >
              <input
                type="text"
                id="clientId"
                placeholder="enter client ID"
                value={clientId}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setClientId(e.target.value)}
              />
            </div>
          </div>

          <div className="remember-forgot-link">
            <div className="remember-link m-0">
              <div>
                <input type="checkbox" className="m-0" />
              </div>
              <div className="remember-label ">
                <label htmlFor="">remember me</label>
              </div>
            </div>
            <div className="">
              <a href="" className="forgot-link">
                Forgot password?
              </a>
            </div>
          </div>
          {/* ----------------------- */}
          <div className="btn-holder-login">
            <button type="submit" className="btn-login " onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="validation">{message && message}</div>
          <div className="socio-login">
            <div>or continue with</div>
            <div className="google-logo">
              <span>
                <img src={googleLogo} alt="" className="google-img" />
              </span>
              Google
            </div>
          </div>

          <div className="signUp-link-holder d-flex justify-content-center align-items-center">
            <span className="signUp-link ">
              <Link to="/" className="link">
                Don&apos;t have an account click here!
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
