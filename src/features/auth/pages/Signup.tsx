
import AuthLayout from "@/features/artist/components/ui/AuthLayout"
import SignupForm from "../components/SignupForm" 

export default function SignupPage() {
  return (
    <AuthLayout title="Register">
      <SignupForm />
    </AuthLayout>
  )
}
