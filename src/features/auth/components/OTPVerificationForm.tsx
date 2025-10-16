import { data, useLocation, useNavigate } from "react-router-dom"
import { useApi } from "../../../core/hooks/useApi"
import { authApi } from "../services/authApi"
import { useState } from "react"
import { Button } from "../../../core/components/Button"
import {Timer} from "../../../core/components/Timer"



export function OtpVerification() {

  const [otp, setOtp] = useState(["","","",""])
  const [timerKey, setTimerKey] = useState(0)
  const [isTimerActive, setTimerActive] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email

  const {execute: verifyOTP, loading, error} = useApi(authApi.verifyOtp)
  const {execute: resendOTP} = useApi(authApi.resendOtp)

  console.log("otp - ",email)

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
      alert("please enter otp")
      return
    }  

    try {
      await verifyOTP({email, otp:code})
      console.log("otp verification successfull.")
      navigate("/login")
    } catch (error) {
      
    }
  }

  const HandleResend = async ()=>{
    try {
      await resendOTP({email})
      setTimerActive(true)
      setTimerKey((prev)=> prev + 1)
      console.log("otp resend successfully")
    } catch (error) {
      console.error("error in resend otp",error)
    }
  }
  
  return (
    <div className="flex items-center gap-4">
      {/* Accessible label for screen readers */}
      <label className="sr-only" htmlFor="otp-1">
        Enter 4-digit verification code
      </label>

      {/* OTP inputs left-to-right */}
      <div className="flex items-center gap-2" aria-label="Enter 4-digit code">
        {otp.map((digit, index)=>(
        <input
           key={index}
            id={`otp-${index + 1}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e)=> HandleChange(index, e.target.value)}
          className="h-12 w-12 text-center rounded-md border border-input bg-background text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="•"
          aria-label="Digit 1"
        />
        ))}
        
      </div>

      {error && <p className="text-red-500">{error}</p>}

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

      {/* resend otp button */}
      <Button
        type="button"
        disabled={isTimerActive}
        onClick={HandleResend}
      >
        Resend OTP
      </Button>
    </div>
  )
}
