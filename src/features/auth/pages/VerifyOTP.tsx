import AuthLayout from "../components/AuthLayout";
import { OtpVerification } from "../components/OTPVerificationForm";

export default function VerifyOTPPage (){
    return (
        <AuthLayout>
            <h2 className="text-2xl font-semibold text-center mb-8">OTP verification</h2>
            <OtpVerification/>
        </AuthLayout>
    )
}