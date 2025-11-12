"use client"

import SignupForm from "../../components/auth/SugnUpForm"
import AuthLayout from "../../components/ui/AuthLayout"

export default function SignupPageArtist() {
  return (
    <AuthLayout title="Join as Artist" subtitle="Start your music journey today">
        <SignupForm />
    </AuthLayout>
  )
}
