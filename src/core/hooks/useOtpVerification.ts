import React, { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { showError } from "../utils/toast.config"
import { useApi } from "./useApi"

interface otpVerificationProps {
    verifyApiEndpoint: (data: {email:string, otp: string})=> Promise<any>
    resendApiEndpoint: (data: {email: string})=> Promise<any>
    redirectPath: string
}

export const useOtpVerification= ({verifyApiEndpoint, resendApiEndpoint, redirectPath}: otpVerificationProps)=>{
    const [otp, setOtp] = useState(["","","",""])
    const [canResend, setCanResend] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const location = useLocation()
    const navigate = useNavigate()
    const email = location.state?.email

    const {execute: VerifyOTP, loading: verifyLoading} = useApi(verifyApiEndpoint)
    const {execute: ResendOTP, loading: resendLoading} = useApi(resendApiEndpoint)

    const HandleChange = (index:number, value: string, inputId: string)=>{
        if(/^[0-9]?$/.test(value)){
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

           // focus to next input
           if (value && index < otp.length - 1) {
                const nextInputId = inputId.replace(index.toString(), (index + 1).toString());
                document.getElementById(nextInputId)?.focus();
            }
        }
    }

    const HandleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>, inputId: string) => {
        if ((e.key === 'Backspace' || e.key === 'Delete') && !otp[index] && index > 0) {
            const prevInputId = inputId.replace(index.toString(), (index - 1).toString());
            document.getElementById(prevInputId)?.focus();
        }
    };

    const HandleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault()
        const code = otp.join("")
        if(code.length < 4){
            showError("fill the OTP form.!")
            return
        }
        try {
           await VerifyOTP({email, otp:code})
           navigate(redirectPath)
        } catch (error) {
             console.error("error in verify otp",error)
        }
    }

    const HandleResend = async ()=>{
        try {
            await ResendOTP({email})
            setCanResend(false)
        } catch (error) {
            console.error("error in resend otp",error)
        }
    }

    return {otp, email, canResend, verifyLoading, resendLoading, HandleChange, HandleSubmit, HandleResend, setCanResend, inputRefs, HandleKeyDown}

}