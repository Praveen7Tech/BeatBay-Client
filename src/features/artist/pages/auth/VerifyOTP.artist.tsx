import { FormWrapper } from "../../components/ui/AuthFormWrapper";
import AuthLayout from "../../components/ui/AuthLayout";
import VerifyOTPFormArtist from "../../components/auth/VerifyOTPForm"; 
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function VerifyOTPartist(){
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
    return(
        <AuthLayout>
            <FormWrapper title="Verify OTP">
                <VerifyOTPFormArtist/>
            </FormWrapper>
        </AuthLayout>
    )
}