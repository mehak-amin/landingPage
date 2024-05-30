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
import Test from "./pages/Test";

import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import WorkPlanner from "./pages/AdminModule/WorkPlanners/WorkPlanner";

import { Routes, Route } from "react-router-dom";
// import { Scheduler } from "@aldabil/react-scheduler";
// import { ImPilcrow } from "react-icons/im";
import { useState } from "react";


function App() {
  const [role, setRole] = useState("");
  console.log(role);
  return (
    <Routes>
      <Route path="/signUp" element={<SignInPage />} />

      <Route path="/" element={<LoginPage role={role} setRole={setRole} />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route
        path="/resetPassword/b7293698d4e362ec6e90c2e5cf5cd179106d824c9a7fc2bca4ce78cb175c9f46"
        element={<ResetPassword />}
      />


      <Route path="/" element={<Layout role={role} />}>
        <Route path="admin" element={<Admin />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="departments" element={<Departments />} />
          <Route path="manageApps" element={<ManageApps />} />
          <Route path="teammates" element={<Teamates />} />

          <Route
            path="teammates/teammateDetails/:id"
            element={<TeammateDetails />}
          />

          <Route path="workplanner" element={<WorkPlanner />} />

        </Route>
        <Route path="users" element={<User />}>
          <Route path="myScreen" element={<MyScreen />} />
          <Route path="projects" element={<Ventures />} />
          <Route path="projects/newTask" element={<NewTask />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
