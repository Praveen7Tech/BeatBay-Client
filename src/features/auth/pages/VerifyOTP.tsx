import AuthLayout from "../components/AuthLayout"
import { OtpVerification } from "../components/OTPVerificationForm"

export default function VerifyOTPPage() {
  return (
    <AuthLayout
      logo={
        <div className="flex flex-col items-center">
          <img src="\logos\logo-w.png" alt="BeatBay Logo" width={60} height={60} className="mb-2" />
          <span className="text-sm text-gray-300">BeatBay</span>
        </div>
      }
    >
      <h2 className="text-2xl font-semibold text-center mb-8">OTP verification</h2>
      <OtpVerification />
    </AuthLayout>
  )
}
