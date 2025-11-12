
import ForgotPasswordFormArtist from "../../components/auth/ForgotPasswordForm";
import AuthLayout from "../../components/ui/AuthLayout";

export default function ForgetPasswordArtist() {
  return (
    <AuthLayout title="Forget Password" subtitle="Enter your registered email below">
        <ForgotPasswordFormArtist/>
    </AuthLayout>
  )
}
