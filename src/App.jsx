import SignInPage from "./pages/signInPage/SignInPage";
import LoginPage from "./pages/loginPage/LoginPage";
import LoggedInPage from "./pages/LoggedInPage/LoggedInPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
// import LoggedInPage from "./pages/LoggedInPage/LoggedInPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/loggedinpage" element={<LoggedInPage />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
