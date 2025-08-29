import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SignUp from "../pages/user/SignUp"
import OtpVerification from "../pages/user/VerifyOtp"
import HomePage from "../pages/user/HomePage"


const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                {/* user routes */}
                <Route path={"/"} element={<SignUp/>}/>
                <Route path="/verify-otp" element={<OtpVerification/>}/>
                <Route path="/home" element={<HomePage/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes