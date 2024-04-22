import React, { useState } from "react";
import signInImg from "../../assets/MacBook Air (2022).svg";
import googleLogo from "../../assets/google.jpg";
import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };
  const handleLogin = (e) => {
    console.log("lalala");
    e.preventDefault();
    navigate("/loggedinpage");
    // <Navigate to="/loggedinpage" />;
  };

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
                // className="form-control"
                id="password"
                placeholder="enter Password..."
                value={password}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setPassword(e.target.value)}
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
            <button type="submit" className="btn-login " onClick={handleLogin}>
              Login
            </button>
          </div>
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
                Don't have an account click here!
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
