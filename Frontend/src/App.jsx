import LoginPage from "./components/LoginPage"
import Registration from "./components/Registration"
import ResetPassword from "./components/ResetPassword"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<Registration></Registration>}></Route>
        <Route path="/passwordReset" element={<ResetPassword></ResetPassword>}></Route>
      </Routes>
      // <Registration></Registration>
      {/* <LoginPage></LoginPage> */}
      {/* <ResetPassword></ResetPassword> */}
    </>
  )
}

export default App
