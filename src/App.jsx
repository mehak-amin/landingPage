import SignInPage from "./pages/signInPage/SignInPage";
import LoginPage from "./pages/loginPage/LoginPage";
import Admin from "./pages/AdminModule/Admin/Admin";
import User from "./pages/UserModule/User/User";
import AdminDashboard from "./pages/AdminModule/AdminDashboard/AdminDashboard";
import Departments from "./pages/AdminModule/Departments/Departments";
import ManageApps from "./pages/AdminModule/MannageApps/ManageApps";
import Teamates from "./pages/AdminModule/Teammates/Teammates";
import Layout from "./Layout/Layout";
import MyScreen from "./pages/UserModule/MyScreen/MyScreen";
import Ventures from "./pages/UserModule/Ventures/Ventures";
import NewTask from "./pages/UserModule/Ventures/NewTask/NewTask";

import { Routes, Route } from "react-router-dom";
import TeammateDetails from "./pages/AdminModule/Teammates/TeammateDetails/TeammateDetails";

import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import WorkPlanner from "./pages/AdminModule/WorkPlanners/WorkPlanner";

import PrivateRoutes from "./Router/PrivateRoutes";
import { useState } from "react";

import ManageRoles from "./pages/AdminModule/ManageRoles/ManageRoles";
import Settings from "./pages/AdminModule/Settings/Settings";

function App() {
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "";
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser
      ? JSON.parse(savedUser)
      : { id: 0, fullname: "", role: "", picture: "" };
  });

  return (
    <Routes>
      <Route path="/signUp" element={<SignInPage />} />
      <Route
        path="/"
        element={
          <LoginPage
            role={role}
            setRole={setRole}
            user={user}
            setUser={setUser}
          />
        }
      />

      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* <Route element={<PrivateRoutes />}> */}
      <Route path="/" element={<Layout role={role} user={user} />}>
        <Route path="admin" element={<Admin />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* <Route path="departments" element={<Departments />} />
          <Route path="manageApps" element={<ManageApps />} /> */}
          <Route path="teammates" element={<Teamates />} />

          <Route
            path="teammates/teammateDetails/:id"
            element={<TeammateDetails />}
          />

          <Route path="workplanner" element={<WorkPlanner />} />

          <Route path="settings" element={<Settings />}>
            <Route path="departments" element={<Departments />} />
            <Route path="manageApps" element={<ManageApps />} />
            <Route path="manageroles" element={<ManageRoles />} />
          </Route>
        </Route>
        <Route path="users" element={<User />}>
          <Route path="myScreen" element={<MyScreen />} />
          <Route path="projects" element={<Ventures />} />

          <Route path="newTask" element={<NewTask />} />

          <Route path="projects/newTask" element={<NewTask />} />
        </Route>
      </Route>
      {/* </Route> */}
    </Routes>
  );
}

export default App;
