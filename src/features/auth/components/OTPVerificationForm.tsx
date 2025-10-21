import { useLocation, useNavigate } from "react-router-dom"
import { useApi } from "../../../core/hooks/useApi"
import { authApi } from "../services/authApi"
import { useState } from "react"
import { Button } from "../../../core/components/Button"
import {Timer} from "../../../core/components/Timer"
import { Devider } from "../../../core/components/Devider.ui"
import { showError } from "../../../core/utils/toast.config"


export function OtpVerification() {

  const [otp, setOtp] = useState(["","","",""])
  const [timerKey, setTimerKey] = useState(0)
  const [isTimerActive, setTimerActive] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email

  const {execute: verifyOTP, loading } = useApi(authApi.verifyOtp)
  const {execute: resendOTP} = useApi(authApi.resendOtp)

  const HandleChange =  (index: number, value: string)=>{
    if(!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    const nextInput = document.getElementById(`otp-${index + 2}`)
    if(value && nextInput){
      (nextInput as HTMLInputElement).focus()
    }
  }

  const HandleVerify = async ()=>{
    const code = otp.join("")
    if(code.length < 4) {
      showError("Fill the OTP form")
      return
    }  

    try {
      await verifyOTP({email, otp:code})
      navigate("/login")
    } catch (error) {
      
    }
  }

  const HandleResend = async ()=>{
    try {
      await resendOTP({email})
      setTimerActive(true)
      setTimerKey((prev)=> prev + 1)
    } catch (error) {
      console.error("error in resend otp",error)
    }
  }
  
  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-xs mx-auto">
      <div className="flex gap-4 justify-center w-full">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index + 1}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => HandleChange(index, e.target.value)}
            className="h-14 w-14 text-center text-2xl font-semibold rounded-lg border-2 border-green-600/60 bg-black/30 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
            placeholder="•"
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      {/* Verify otp button*/}
      <Button
        type="button"
        disabled={loading}
        onClick={HandleVerify}
        className="mt-4"
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>

      {/* timer */}
      {
      isTimerActive ? 
      (<Timer
      key={timerKey}
      initialTime={60}
      onExpire={()=> setTimerActive(false)}
      />)
      :
      (<p>no timer</p>)
      }

      <Devider/>

      {/* resend otp button */}
      <Button
        type="button"
        disabled={isTimerActive}
        onClick={HandleResend}
      >
        {loading ? "Re sending Otp.." : "Resend OTP"}
      </Button>
    </div>
  )
}
