import React, { useState } from "react";
import signInImg from "../../assets/MacBook Air (2022).svg";
import "./SignInPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faEnvelope,
  faEye,
  faEyeSlash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SignInForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here (e.g., API call, authentication)
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Department:", department);
  };

  return (
    <>
      <div className="signIn">
        <div className="image-section">
          <div className="image-holder">
            <img src={signInImg} alt="" className="image-fluid" />
          </div>
        </div>
        <div className="container form-section">
          <h1 className="signin-heading mb-2">Create account</h1>
          <p className="signIn-subHeading mb-4">
            We are glad to have you onboard😊
          </p>
          <form action="" onSubmit={handleSubmit}>
            <div className="row-with-inputs row d-flex justify-content-between">
              <div className="col-with-input col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <div className={`inputwithicon ${isFocused ? "focused" : ""}`}>
                  <div className="input-icon-holder">
                    <FontAwesomeIcon icon={faPen} size="sm" />
                  </div>
                  <input
                    type="text"
                    // className="form-control"
                    id="firstName"
                    placeholder="enter First Name..."
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-with-input col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <div className={`inputwithicon ${isFocused ? "focused" : ""}`}>
                  <div className="input-icon-holder">
                    <FontAwesomeIcon icon={faPen} size="sm" />
                  </div>
                  <input
                    type="text"
                    // className="form-control"
                    id="lastName"
                    placeholder="enter Last Name..."
                    value={lastName}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row-with-inputs row">
              <div className="col-with-input col-md-6">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className={`inputwithicon ${isFocused ? "focused" : ""}`}>
                  <div className="input-icon-holder">
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
              <div className="col-with-input col-md-6">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className={`inputwithicon ${isFocused ? "focused" : ""}`}>
                  <div className="input-icon-holder">
                    <FontAwesomeIcon icon={faEyeSlash} size="sm" />
                  </div>
                  <input
                    type="password"
                    // className="form-control"
                    id="confirmPassword"
                    placeholder="confirm Password..."
                    value={confirmPassword}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row-with-inputs row">
              <div className="col-with-input col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className={`inputwithicon ${isFocused ? "focused" : ""}`}>
                  <div className="input-icon-holder">
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
              <div className="col-with-input col-md-6">
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <div className={`inputwithicon ${isFocused ? "focused" : ""}`}>
                  <div className="input-icon-holder">
                    <FontAwesomeIcon icon={faBuilding} size="sm" />
                  </div>
                  <input
                    type="text"
                    // className="form-control"
                    id="department"
                    placeholder="enter Department..."
                    value={department}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="btn-holder">
              <button type="submit" className="btn ">
                Signup
              </button>
            </div>
            <div className="row">
              <a href="Already have account click here!"></a>
            </div>
            <div className=" d-flex justify-content-center align-items-center">
              <span className="signIn-link ">
                <Link to="/login" className="link">
                  Already have account click here!
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
