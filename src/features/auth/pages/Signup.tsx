import React from "react";
import AuthLayout from "../components/AuthLayout";
import SignupForm from "../components/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout>
      <div className="flex justify-center mb-6">...Updated app...</div>
      <h2 className="text-2xl font-semibold text-center mb-8">Register</h2>
      <SignupForm />
    </AuthLayout>
  );
}
