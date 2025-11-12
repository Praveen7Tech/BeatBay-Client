
import AuthLayout from "@/core/components/Layout/AuthLayout"
import SignupForm from "../components/SignupForm" 

export default function SignupPage() {
  return (
    <AuthLayout title="Register" googleRole="user">
      <SignupForm />
    </AuthLayout>
  )
}
