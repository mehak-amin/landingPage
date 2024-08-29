import { useEffect, useState } from "react";
import signInImg from "../../assets/MacBook Air (2022).svg";
import googleLogo from "../../assets/google.jpg";
import "./UpdatePassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import BASE_URI from "../../../config";

axios.defaults.withCredentials = true;
function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const handleFocus = () => {
    setIsFocused(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  // const token = localStorage.getItem("token");
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Debugging: Check the token
    console.log("Token:", token);

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    // Check for JWT structure
    if (token.split(".").length !== 3) {
      console.error("Malformed JWT token:", token);
      return;
    }

    try {
      const response = await axios.patch(
        `${BASE_URI}/users/me`,
        {
          password: password,
          newPassword: newPassword,
          passwordConfirm: passwordConfirm,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Password updated:", response);
    } catch (error) {
      console.error(
        "Error updating password:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="login">
      <div className="image-section-login">
        <div className="image-holder">
          <img src={signInImg} alt="" className="image-fluid" />
        </div>
      </div>

      <div className="container form-section-login">
        <h1 className="signin-heading-login mb-2 text-center">
          Update Password
        </h1>
        <p className="signIn-subHeading-login mb-4 text-center">
          Update Password, and we'll help you get back on track right away.
        </p>

        <form action="" onSubmit={handleUpdatePassword}>
          <div className="input-col">
            <label htmlFor="password" className="form-label">
              Current Password
            </label>
            <div
              className={`inputwithicon-login ${isFocused ? "focused" : ""}`}
            >
              <div
                className="input-icon-holder-login"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  size="sm"
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="currentpassword"
                placeholder="enter current Password..."
                value={password}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="input-col">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <div
              className={`inputwithicon-login ${isFocused ? "focused" : ""}`}
            >
              <div
                className="input-icon-holder-login"
                onClick={toggleNewPasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showNewPassword ? faEye : faEyeSlash}
                  size="sm"
                />
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder="enter new Password..."
                value={newPassword}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="input-col">
            <label htmlFor="password" className="form-label">
              Confirm New Password
            </label>
            <div
              className={`inputwithicon-login ${isFocused ? "focused" : ""}`}
            >
              <div
                className="input-icon-holder-login"
                onClick={toggleConfirmPasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEye : faEyeSlash}
                  size="sm"
                />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="passwordConfirm"
                placeholder="confirm new Password..."
                value={passwordConfirm}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          </div>

          <div className="btn-holder-login my-5">
            <button
              type="submit"
              className="btn btn-primary mt-3"
              disabled={loading}
            >
              {loading ? "Updatting..." : "Update Password"}
            </button>
          </div>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
