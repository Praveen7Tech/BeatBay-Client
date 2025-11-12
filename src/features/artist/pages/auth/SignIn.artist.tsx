
import LoginForm from "../../components/auth/SignInForm";
import AuthLayout from "../../../../core/components/Layout/AuthLayout";

export default function LoginPageArtist() {
  return (
    <AuthLayout title="Welcome Back" subtitle="Start your music journey today" googleRole="artist">
        <LoginForm/>
    </AuthLayout>
  )
}