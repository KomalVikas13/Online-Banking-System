import LoginPage from "./components/LoginPage"
import OTPPage from "./components/OTPpage"
import Registration from "./components/Registration"
import ResetPassword from "./components/ResetPassword"
import EmailPage from "./components/EmailPage"
import MessagePage from "./components/MessagePage"
import { Route, Routes } from "react-router-dom"
import { Test } from "./components/Test"
import Dashboard from "./components/Dashboard"

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/register" element={<Registration></Registration>}></Route>
      <Route path="/password_reset" element={<ResetPassword></ResetPassword>}></Route>
      <Route path="/email" element={<EmailPage></EmailPage>}></Route>
      <Route path="/otp" element={<OTPPage></OTPPage>}></Route>
      <Route path="/message" element={<MessagePage></MessagePage>}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/test" element={<Test></Test>}></Route>
    </Routes>
  )
}

export default App
