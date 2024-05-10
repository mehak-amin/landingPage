import { PiCopyrightLight } from "react-icons/pi";
export default function Footer() {
  return (
    <footer className="bg-white px-5 py-4">
      <ul className="d-flex justify-content-between fs-5 mb-5">
        <li>
          <a href="" className="text-decoration-none text-dark hoverEffect">
            Terms
          </a>
        </li>
        <li>
          <a href="" className="text-decoration-none text-dark hoverEffect">
            Privacy
          </a>
        </li>
        <li>
          <a href="" className="text-decoration-none text-dark hoverEffect">
            FAQ&apos;S
          </a>
        </li>
        <li>
          <a href="" className="text-decoration-none text-dark hoverEffect">
            Contact Us
          </a>
        </li>
      </ul>
      <p className="text-center fs-5">
        <PiCopyrightLight />
        2024 App Tracker
      </p>
    </footer>
  );
}