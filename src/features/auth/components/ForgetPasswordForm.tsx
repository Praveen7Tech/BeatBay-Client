import { Input } from "../../../core/components/Input" 
import { Button } from "../../../core/components/Button" 
import { Link } from "react-router-dom"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApi } from "../../../core/hooks/useApi"
import { authApi } from "../services/authApi"
import { useState } from "react"

const EmailSchema = z.object({
  email: z.string().email("invalid email")
})

type VerifyEmailInput = z.infer<typeof EmailSchema>

export default function ForgotPasswordForm() {
  const {register, handleSubmit, formState: {errors}} = useForm<VerifyEmailInput>({
    resolver: zodResolver(EmailSchema)
  })
  
  const [submited, setSubmitted] = useState(false)
  const {execute: verifyEmail, error, loading} = useApi(authApi.verifyEmail)

  const onSubmit = async(data: VerifyEmailInput)=> {
    try {
      console.log("data ",data)
      await verifyEmail(data)
      setSubmitted(true)
    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex flex-col items-center w-full max-w-xs mx-auto">
      <Input {...register('email')} disabled={submited} type="email" placeholder="Enter Email" className="mb-4" />
      
      <p className="text-center text-sm text-gray-300 mb-6">
        Remember the password?{" "}
        <Link to={'/login'} className="text-green-500 hover:text-green-400">
          Sign in
        </Link>
      </p>

      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}

      <Button type="submit" className="mb-6" disabled={submited}>
        {loading ? "Verifying email..." : "Submit"}
      </Button>
      {error && <p className="text-red-400">{error}</p>}

      {submited && (
      <p className="text-center text-xs text-gray-400">
        Please check your email for create
        <br />a new password
      </p>
      )}
    </div>
    </form>
  )
}
