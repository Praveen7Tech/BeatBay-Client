import AuthLayout from "../components/AuthLayout";
import ForgotPasswordForm from "../components/ForgetPasswordForm";


export default function ForgotPassword() {
    return (
    <AuthLayout>
      <div className="flex flex-col items-center">
          <img
            src="\logos\logo-w.png"
            alt="BeatBay Logo"
            width={80}
            height={60}
            className="rounded-full"
          />
          <p className="text-sm text-white mt-1">BeatBay</p>
        </div>
      <h2 className="text-3xl font-bold text-center mb-2">Forgot Password</h2>
      <p className="text-center text-gray-300 text-sm mb-8">Enter your registered email below</p>
      <ForgotPasswordForm/>
    </AuthLayout>
  )
}