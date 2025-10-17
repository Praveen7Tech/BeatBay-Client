import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    return (
        <AuthLayout>
            <div className="flex justify-center mb-6">...Updated app...</div>
            <h2 className="text-2xl font-semibold text-center mb-8">Log in</h2>
            <LoginForm/>
        </AuthLayout>
    )
}