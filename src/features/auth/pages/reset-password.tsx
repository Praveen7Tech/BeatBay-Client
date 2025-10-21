import AuthLayout from "../components/AuthLayout";
import ResetPasswordForm from "../components/reset-passwordForm";

export default function ResetPassword() {
    return(
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
      <h2 className="text-2xl font-semibold text-center mb-2 text-white">Change Password</h2>
      <p className="text-center text-gray-400 text-sm mb-8">Enter a different password with the previous</p>
      <ResetPasswordForm />
    </AuthLayout>
    )
}