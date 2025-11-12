
import AuthLayout from "@/core/components/Layout/AuthLayout"
import LoginForm from "../components/LoginForm" 

export default function LoginPage() {
  return (
    <AuthLayout title="Sign In" googleRole="user">
      <LoginForm />
    </AuthLayout>
  )
}
