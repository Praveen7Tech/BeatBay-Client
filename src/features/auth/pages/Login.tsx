import AuthLayout from "../components/AuthLayout" 
import LoginForm from "../components/LoginForm" 

export default function LoginPage() {
  return (
    <AuthLayout
      logo={
        <div className="flex flex-col items-center">
          <img
            src="\logos\logo-w.png"
            alt="BeatBay Logo"
            width={80}
            height={60}
            className="rounded-full"
          />
          <p className="text-sm text-white mt-1">BeatBay</p>
        </div>
      }
    >
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>
      </div>

      <LoginForm />
    </AuthLayout>
  )
}
