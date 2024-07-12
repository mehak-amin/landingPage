import { AiOutlineMail } from "react-icons/ai";
import "./LandingPage.css";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [animateDiv, setAnimateDiv] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    setTimeout(() => {
      setAnimateDiv(true);
    }, 2000); // Adjust the timeout to control when the div starts animating
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(to right, #777777, #333333)",
      }}
    >
      <div className="container-xl min-vh-100 h-100">
        <nav className="d-flex align-items-center justify-content-between py-4 text-white">
          <h1 className="body">empsuite</h1>
          <ul className="d-flex align-items-center gap-5 list-unstyled mb-0">
            <li className="cursor-pointer">Product</li>
            <li className="cursor-pointer">Solution</li>
            <li className="cursor-pointer">Customer</li>
            <li className="cursor-pointer">Pricing</li>
            <li className="cursor-pointer">About Us</li>
          </ul>
          <button className="rounded-pill px-4 py-2 fw-bold fs-5 border">
            Get Started
          </button>
        </nav>

        <div
          className="d-flex flex-direction-column align-items-center justify-content-center gap-4 text-white"
          style={{ minHeight: "38rem" }}
        >
          <div className="text-center text-wrap">
            <h1
              style={{ fontSize: "4.7rem" }}
              className="fw-bold write-animation"
            >
              Empower Your Workforce
            </h1>
            <h1
              style={{ fontSize: "4.7rem" }}
              className="fw-bold write-animation delay-animation"
            >
              {isVisible && "Smart Tracking"}
            </h1>
          </div>
          <div>
            <p className="fs-5 mb-0">
              Our cutting-edge employee tracking app designed to
            </p>
            <p className="fs-5">
              streamline workforce management like never before.
            </p>
          </div>
          <div
            className={`rounded-pill py-2 ps-4 pe-2 bg-white d-flex align-items-center justify-content-between w-50 ${
              animateDiv ? "slide-up" : "hidden"
            }`}
          >
            <div className="w-50">
              <AiOutlineMail className="fs-4 text-secondary" />

              <input
                type="email"
                placeholder="Enter your email"
                className="border-0 w-75 py-2 px-4 outline-0"
              />
            </div>
            <button
              className="rounded-pill px-5 py-3 border-0 text-white"
              style={{
                background: "linear-gradient(to right, #777777, #333333)",
              }}
            >
              Start for free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
