import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./components/LoginPage";
import OTPPage from "./components/OTPpage";
import Registration from "./components/Registration";
import ResetPassword from "./components/ResetPassword";
import EmailPage from "./components/EmailPage";
import MessagePage from "./components/MessagePage";
import Dashboard from "./components/Dashboard";
import { Test } from "./components/Test";
// import axios from "axios";
// import { toast } from "react-toastify";
// import setupAxiosInterceptor from "./middlewares/axiosInterceptor";


function App() {


  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/password_reset" element={<ResetPassword />} />
      <Route path="/email" element={<EmailPage />} />
      {/* <Route path="/otp" element={<OTPPage />} /> */}
      <Route path="/message" element={<MessagePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;