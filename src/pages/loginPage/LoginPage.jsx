import { useState, useEffect } from "react";
import signInImg from "../../assets/MacBook Air (2022).svg";
import googleLogo from "../../assets/google.jpg";
import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URI from "../../../config";
import PulseLoader from "react-spinners/PulseLoader";
import toast, { Toaster } from "react-hot-toast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    const storedRememberMe = localStorage.getItem("rememberMe") === "true";
    if (storedRememberMe) {
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${BASE_URI}/users/login`, { email, password })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.Data));
        localStorage.setItem("role", response.data.Data.role);
        const token = response.data.token;
        localStorage.setItem("token", token);
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }
        toast.success("Login successful!", {
          position: "top-right",
        });
        if (response.data.Data.role === "admin") {
          navigate("/admin/dashboard");
        } else if (response.data.Data.role === "user") {
          navigate("/users/myScreen");
        }
      })
      .catch((err) => {
        setLoading(false);
        const errorMessage =
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : "An error occurred. Please try again.";
        toast.error(errorMessage, {
          position: "top-right",
        });
      });
  };

  const role = localStorage.getItem("role");

  if (localStorage.getItem("rememberMe") && role) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else if (role === "user") {
      return <Navigate to="/users/myScreen" />;
    } else {
      return <Navigate to="*" />;
    }
  }

  return (
    <div className="login container-xxxl p-0">
      <Toaster />
      <div className="image-section-login">
        <div className="image-holder">
          <img src={signInImg} alt="" className="image-fluid" />
        </div>
      </div>
      <div className="container form-section-login w-md-50">
        <div>
          <h1 className="signin-heading-login mb-2">Welcome Back</h1>
          <p className="signIn-subHeading-login mb-4">Login to continue</p>
          <form action="" onSubmit={handleSubmit}>
            <div className="input-col">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div
                className={`inputwithicon-login ${
                  isEmailFocused ? "focused" : ""
                }`}
              >
                <div className="input-icon-holder-login">
                  <FontAwesomeIcon icon={faEnvelope} size="sm" />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email..."
                  required
                  value={email}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="input-col">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div
                className={`inputwithicon-login ${
                  isPasswordFocused ? "focused" : ""
                }`}
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
                  id="password"
                  placeholder="Enter Password..."
                  required
                  value={password}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
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
                    style={{ width: "1.1rem", height: "1.1rem" }}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                </div>
                <div className="remember-label">
                  <label htmlFor="">Remember me</label>
                </div>
              </div>
              <div className="">
                <Link to="forgetPassword" className="forgot-link">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="btn-holder-login">
              <button type="submit" className="btn-login">
                {loading ? <PulseLoader size={8} color="white" /> : "Login"}
              </button>
            </div>
            <div className="socio-login">
              <div>Or continue with</div>
              <div className="google-logo">
                <span>
                  <img src={googleLogo} alt="" className="google-img" />
                </span>
                Google
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
