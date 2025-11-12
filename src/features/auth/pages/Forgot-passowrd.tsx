
import AuthLayout from "@/core/components/Layout/AuthLayout";
import ForgotPasswordForm from "../components/ForgetPasswordForm";


export default function ForgotPassword() {
    return (
    <AuthLayout title="Forget Password" subtitle="Enter your registerd email below!">
      <ForgotPasswordForm/>
    </AuthLayout>
  )
}