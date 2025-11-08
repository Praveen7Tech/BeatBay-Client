import AuthLayout from "../components/AuthLayout";
import ResetPasswordForm from "../components/reset-passwordForm";

export default function ResetPassword() {
    return(
     <AuthLayout title="Change Password" subTitle="Enter a different password with the previous">
      <ResetPasswordForm />
    </AuthLayout>
    )
}