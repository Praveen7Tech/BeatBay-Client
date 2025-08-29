import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { userService } from "../../services/UserService"

type OtpForm = {
    otp : string
}

export default function OtpVerification() {
    const [otp, setOtp] = useState(["","","","",])
    const [timer, setTimer] = useState(90)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email
    console.log("email-",email)

    const handleChange = (value: string, index:number)=>{
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
    }
    console.log("otp",otp)

    const handleVerify = async ()=>{
      setLoading(true)
      try {
        const OTP = otp.join("")
        const res = await userService.verifyOTP(email, OTP)
        console.log("otp res",res)
        navigate("/home")
      } catch (error) {
        console.error("Error in otp verifivation",error)
      }finally{
        setLoading(false)
      }
    }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-b from-green-600 to-green-800 rounded-2xl p-8 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
            <div className="w-6 h-6 border-2 border-green-600 rounded-full relative">
              <div className="absolute inset-1 border border-green-600 rounded-full"></div>
            </div>
          </div>
          <span className="text-white text-xl font-semibold">BeatBay</span>
          <span className="text-white text-sm ml-1">.com</span>
        </div>

        {/* Title */}
        <h2 className="text-white text-xl font-medium mb-8">OTP verification</h2>

        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-4 mb-8">
          {otp.map((digit, index)=>(
          <input
          key={digit}
            onChange={(e)=> handleChange(e.target.value, index)}
            type="text"
            maxLength={1}
            className="w-12 h-12 bg-transparent border-2 border-green-400 rounded-lg text-center text-white text-xl focus:outline-none focus:border-green-300"
          />
          ))}
        </div>

        {/* Verify Button */}
        <button 
        onClick={handleVerify}
        className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-medium mb-6 transition-colors">
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Timer */}
        <div className="text-white text-sm mb-6">1 : 27</div>

        {/* Divider */}
        <div className="border-t border-green-400 mb-6"></div>

        {/* Resend Button */}
        <button className="bg-transparent border border-gray-400 text-white py-2 px-8 rounded-full text-sm hover:bg-gray-700 transition-colors">
          RESEND OTP
        </button>
      </div>
    </div>
  )
}
