import AuthLayout from "../components/AuthLayout"
import { OtpVerification } from "../components/OTPVerificationForm"

export default function VerifyOTPPage() {
  return (
    <AuthLayout title="OTP verification">
      <OtpVerification />
    </AuthLayout>
  )
}
