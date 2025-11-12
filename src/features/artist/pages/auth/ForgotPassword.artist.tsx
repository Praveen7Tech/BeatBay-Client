
import ForgotPasswordFormArtist from "../../components/auth/ForgotPasswordForm";
import AuthLayout from "../../../../core/components/Layout/AuthLayout";

export default function ForgetPasswordArtist() {
  return (
    <AuthLayout title="Forget Password" subtitle="Enter your registered email below">
        <ForgotPasswordFormArtist/>
    </AuthLayout>
  )
}
