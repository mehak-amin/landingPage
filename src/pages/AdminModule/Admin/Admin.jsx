import "./Admin.css";
import { Outlet, Navigate } from "react-router-dom";
function Admin() {
  // return <Outlet />;
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return token && role === "admin" ? <Outlet /> : <Navigate to="/" />;
}

export default Admin;
