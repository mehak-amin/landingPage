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
// import LoggedInPage from "./pages/AdminModule/Admin/LoggedInPage";
// import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
// import Ventures from "./pages/Ventures/Ventures";
// import NewTask from "./pages/Ventures/NewTask/NewTask";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/signUp" element={<SignInPage />} />
      <Route path="/" element={<LoginPage />} />

      <Route path="/" element={<Layout />}>
        <Route path="admin" element={<Admin />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="departments" element={<Departments />} />
          <Route path="manageApps" element={<ManageApps />} />
          <Route path="teammates" element={<Teamates />} />
        </Route>
        <Route path="users" element={<User />}>
          <Route path="myScreen" element={<MyScreen />} />
          <Route path="projects" element={<Ventures />}>
            <Route path="newTask" element={<NewTask />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
