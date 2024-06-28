import { useEffect, useState } from "react";
import signInImg from "../../assets/MacBook Air (2022).svg";
import googleLogo from "../../assets/google.jpg";
import "./ResetPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import BASE_URI from "../../../config";

axios.defaults.withCredentials = true;
function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const location = useLocation();
  //WORK TOMMOROW
  // const resetToken = "186e975b6053cdb6d3a5f094b1bd0ab6424dc22acf6336825e781857b5c19538"; // Replace with the actual token

  // const resetPasswordURL = `http://yourfrontend.com/resetPassword/${resetToken}`;
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setToken(queryParams.get("token"));
  }, [location]);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log("reset password");
    // if (password !== confirmPassword) {
    //   setError("Passwords do not match.");
    //   return;
    // }

    setLoading(true);
    console.log(`${BASE_URI}/users/reset-password/${token}`);
    try {
      const response = await axios.post(
        `${BASE_URI}/users/reset-password/${token}`,
        // "http://localhost:5050/api/v1/users/reset-password/3b42ffdc4a1b4ab94126646e8c077f3e9a26b6f425869ed96c965c67267ad74c"c6a478cbc3031bff3520cb0cb0eea8815d64a36c889910f43822ae0d23078615
        // or
        // "http://emp-monitoring.ap-south-1.elasticbeanstalk.com/api/v1/users/reset-password",

        {
          password: password,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(response.data.message === "Password updated successfuly");
      if (response.data.message === "Password updated successfuly") {
        setMessage("Your password has been successfully reset.");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
      // else {
      //   setError("Failed to reset password. Please try again.");
      // }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const token = localStorage.getItem("token");
  // if (token && user) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div className="login">
      <div className="image-section-login">
        <div className="image-holder">
          <img src={signInImg} alt="" className="image-fluid" />
        </div>
      </div>

      <div className="container form-section-login">
        <h1 className="signin-heading-login mb-2 text-center">
          Reset Password
        </h1>
        <p className="signIn-subHeading-login mb-4 text-center">
          Enter New Password, and we'll help you get back on track right away.
        </p>

        <form action="" onSubmit={handleResetPassword}>
          <div className="input-col">
            <label htmlFor="password" className="form-label">
              New Password
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
                placeholder="enter new Password..."
                value={password}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setPassword(e.target.value)}
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
              <div className="input-icon-holder-login">
                <FontAwesomeIcon icon={faEye} size="sm" />
              </div>
              <input
                type="password"
                id="confirmpassword"
                placeholder="confirm new Password..."
                value={confirmPassword}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="btn-holder-login my-5">
            {/* <button
              type="submit"
              className="btn-login "
              onClick={handleResetPassword}
            >
              Reset Password
            </button> */}
            <button
              type="submit"
              className="btn btn-primary mt-3"
              disabled={loading}
              // onClick={handleResetPassword}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
          {/* <div className="validation">{message && message}</div> */}
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
