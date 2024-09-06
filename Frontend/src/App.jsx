import LoginPage from "./components/LoginPage"
import OTPPage from "./components/OTPpage"
import Registration from "./components/Registration"
import ResetPassword from "./components/ResetPassword"
import EmailPage from "./components/EmailPage"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<Registration></Registration>}></Route>
        <Route path="/passwordReset" element={<ResetPassword></ResetPassword>}></Route>
        <Route path="/email" element={<EmailPage></EmailPage>}></Route>
        <Route path="/otp" element={<OTPPage></OTPPage>}></Route>
      </Routes>
    </>
  )
}

export default App
