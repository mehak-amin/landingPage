import { Outlet, Navigate } from "react-router-dom";

export default function User() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  // return <Outlet />;
  return token && role === "user" ? <Outlet /> : <Navigate to="/" />;
}
