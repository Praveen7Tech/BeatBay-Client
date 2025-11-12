
import LoginForm from "../../components/auth/SignInForm";
import AuthLayout from "../../components/ui/AuthLayout";

export default function LoginPageArtist() {
  return (
    <AuthLayout title="Welcome Back" subtitle="Start your music journey today">
        <LoginForm/>
    </AuthLayout>
  )
}