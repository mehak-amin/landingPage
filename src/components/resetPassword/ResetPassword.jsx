import { useState } from "react";
import signInImg from "../../assets/MacBook Air (2022).svg";
import googleLogo from "../../assets/google.jpg";
import "./ResetPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URI from "../../../config";

axios.defaults.withCredentials = true;
function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleResetPassword = (e) => {
    console.log("lalalal");
    e.preventDefault();
    axios
      .post(
        `${BASE_URI}/api/v1/users/reset-password/b7293698d4e362ec6e90c2e5cf5cd179106d824c9a7fc2bca4ce78cb175c9f46`,

        {
          password,
          confirmPassword,
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "Success") {
          navigate("/");
        }
        // console.log(response.data.userData.token);
        // setUser(response.data.userData);
        // const token = response.data.userData.token;
        // localStorage.setItem("token", token);
      });
    //   .catch((err) => {
    //     console.log(err);
    //     if (err?.response?.data?.message === "Invalid Credentials") {
    //       setMessage("Incorrect Password");
    //     } else if (
    //       err?.response?.data?.message ===
    //       "No user found with those credentials"
    //     ) {
    //       setMessage("Invalid User");
    //     } else if (
    //       err?.response?.data?.message === "Provide all the credentials"
    //     ) {
    //       setMessage("All fields Required");
    //     }
    //   });
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
            <button
              type="submit"
              className="btn-login "
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
          <div className="validation">{message && message}</div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
