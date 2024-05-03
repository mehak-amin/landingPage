import SignInPage from "./pages/signInPage/SignInPage";
import LoginPage from "./pages/loginPage/LoginPage";
import LoggedInPage from "./pages/LoggedInPage/LoggedInPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Ventures from "./pages/Ventures/Ventures";
import NewTask from "./pages/Ventures/NewTask/NewTask";
// import LoggedInPage from "./pages/LoggedInPage/LoggedInPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/loggedinpage" element={<LoggedInPage />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/projects" element={<Ventures />} />
      <Route path="/projects/newTask" element={<NewTask />} />
    </Routes>
  );
}

export default App;
