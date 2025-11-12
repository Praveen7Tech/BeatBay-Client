"use client"

import SignupForm from "../../components/auth/SugnUpForm"
import AuthLayout from "../../../../core/components/Layout/AuthLayout"

export default function SignupPageArtist() {
  return (
    <AuthLayout title="Join as Artist" subtitle="Start your music journey today" googleRole="artist">
        <SignupForm />
    </AuthLayout>
  )
}
