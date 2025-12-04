"use client"

import { Mail, Lock, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApi } from "@/core/hooks/api/useApi"
import { authApiArtist } from "../../services/artist-authApi" 
import { type SignupFormInputs, signupSchema } from "@/features/auth/schemas/auth.validator"
import { Button } from "@/core/components/button/Button"
import { Input } from "@/core/components/input/Input"

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  })

  const navigate = useNavigate()
  const { execute: Signup, loading } = useApi(authApiArtist.signUp)

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      await Signup(data)
      navigate(`/verify-otp-artist`, { state: { email: data.email } })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Input
          theme="artist"
          {...register("name")}
          placeholder="Artist Name"
          icon={User}
          error={errors.name?.message} errorTheme="red"
        />
      </div>

      <div>
        <Input theme="artist" {...register("email")} placeholder="Email" icon={Mail} error={errors.email?.message} errorTheme="red"/>
      </div>

      <div>
        <Input
          theme="artist"
          {...register("password")}
          placeholder="Password"
          icon={Lock}
          type="password"
          error={errors.password?.message}
          errorTheme="red"
        />
      </div>

      <Button
        type="submit"
        theme="user"
        variant="secondary"
        loading={loading}
      >
        Create Account
      </Button>
      
    </form>
  )
}
