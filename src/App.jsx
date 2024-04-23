import React from "react";
import SignInPage from "./pages/signInPage/SignInPage";
import LoginPage from "./pages/loginPage/LoginPage";
import LoggedInPage from "./pages/LoggedInPage/LoggedInPage";
// import LoggedInPage from "./pages/LoggedInPage/LoggedInPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/loggedinpage" element={<LoggedInPage />} />
    </Routes>
  );
}

export default App;
