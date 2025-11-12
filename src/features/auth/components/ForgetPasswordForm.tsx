
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApi } from "../../../core/hooks/useApi"
import { authApi } from "../services/authApi"
import { useState } from "react"
import { Button } from "@/core/components/button/Button"
import { Input } from "@/core/components/input/Input"
import { EmailSchema, VerifyEmailInput } from "../schemas/auth.validator"

export default function ForgotPasswordForm() {
  const {register, handleSubmit, formState: {errors}} = useForm<VerifyEmailInput>({
    resolver: zodResolver(EmailSchema)
  })
  
  const [submited, setSubmitted] = useState(false)
  const {execute: verifyEmail,  loading} = useApi(authApi.verifyEmail)

  const onSubmit = async(data: VerifyEmailInput)=> {
    try {
      await verifyEmail(data)
      setSubmitted(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex flex-col items-center w-full max-w-xs mx-auto">
      <Input theme="user" {...register('email')} disabled={submited} type="email" placeholder="Enter Email" className="mb-4" error={errors.email?.message}/>

      <Button type="submit" theme="user" disabled={submited} loading={loading}>
        Submit
      </Button>

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
