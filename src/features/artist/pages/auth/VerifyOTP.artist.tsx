
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import VerifyOTPFormArtist from "../../components/auth/VerifyOTPForm"
import AuthLayout from "../../components/ui/AuthLayout"

export default function VerifyOTPArtist() {
    const location = useLocation()
    const navigate = useNavigate()
    const email = location.state?.email
    const isAunteticated = !!email

    useEffect(()=>{
        if(!isAunteticated){
            navigate('/artist', {replace: true})
        }
    },[isAunteticated,navigate])

    if(!isAunteticated){
        return null
    }    
  return (
    <AuthLayout title="Verify OTP" subtitle="Enter your otp to verify">
        <VerifyOTPFormArtist/>
    </AuthLayout>
  )
}