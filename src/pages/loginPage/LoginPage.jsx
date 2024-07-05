import { useState, useEffect } from "react";
import signInImg from "../../assets/MacBook Air (2022).svg";
import googleLogo from "../../assets/google.jpg";
import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import BASE_URI from "../../../config";
import toast, { Toaster } from "react-hot-toast";

axios.defaults.withCredentials = true;
function LoginPage({ role, setRole, user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  // const [user, setUser] = useState(() => {
  //   const savedUser = localStorage.getItem("user");
  //   return savedUser
  //     ? JSON.parse(savedUser)
  //     : { id: 0, fullname: "", role: "", picture: "" };
  // });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", role);
  }, [user, role]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Check localStorage on component mount
  useEffect(() => {
    const storedRememberMe = localStorage.getItem("rememberMe") === "true";
    if (storedRememberMe) {
      setRememberMe(true);
      // Optionally, you could also fill in the email field from localStorage here
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URI}/users/login`, { email, password })
      .then((response) => {
        console.log(response);
        // console.log(response.data.userData.token);
        setUser(response.data.Data);
        // console.log(response.data.Data.role);
        setRole(response.data.Data.role);

        const token = response.data.token;
        localStorage.setItem("token", token);
        toast.success("Login Successful", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error("Login Failed", {
          position: "top-right",
        });
        // console.log(err);
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
    // If "Remember Me" is checked, store it in localStorage
    if (rememberMe) {
      localStorage.setItem("rememberMe", true);
      console.log("remerber mee");
      // Optionally, you could also store the email in localStorage here
    } else {
      localStorage.removeItem("rememberMe");
      // Optionally, you could also remove the email from localStorage here
    }
  };

  const token = localStorage.getItem("token");
  //temporarily comment out for reset password
  if (token && user) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else if (role === "user") {
      return <Navigate to="/users/myScreen" />;
    }
  }

  return (
    <div className="login">
      <div className="image-section-login">
        <div className="image-holder">
          <img src={signInImg} alt="" className="image-fluid" />
        </div>
      </div>

      <div className="container form-section-login w-md-50">
        <div>
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

            <div className="remember-forgot-link">
              <div className="remember-link m-0">
                <div>
                  <input
                    type="checkbox"
                    className="m-0"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                </div>
                <div className="remember-label ">
                  <label htmlFor="">remember me</label>
                </div>
              </div>
              <div className="">
                <Link to="forgetPassword" className="forgot-link">
                  Forgot password?
                </Link>
              </div>
            </div>
            {/* ----------------------- */}
            <div className="btn-holder-login">
              <button
                type="submit"
                className="btn-login "
                onClick={handleSubmit}
              >
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
      <Toaster />
    </div>
  );
}

export default LoginPage;
