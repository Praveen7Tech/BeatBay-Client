
import AuthLayout from "@/features/artist/components/ui/AuthLayout"
import LoginForm from "../components/LoginForm" 

export default function LoginPage() {
  return (
    <AuthLayout title="Sign In">
      <LoginForm />
    </AuthLayout>
  )
}
