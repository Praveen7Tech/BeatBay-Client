import AuthLayout from "../components/AuthLayout";
import ForgotPasswordForm from "../components/ForgetPasswordForm";


export default function ForgotPassword() {
    return (
    <AuthLayout title="Forget Password" subTitle="Enter your registerd email below!">
      <ForgotPasswordForm/>
    </AuthLayout>
  )
}