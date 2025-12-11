
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "../../../core/hooks/api/useApi";
import { authApi } from "../services/authApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/core/components/button/Button";
import { Input } from "@/core/components/input/Input";
import { ResetPassInput, ResetPassShema } from "../schemas/auth.validator";
import { useState } from "react";


export default function ResetPasswordForm() {
    const [showNew, setNew] = useState(false)
    const [showConfirm, setConfirm] = useState(false)
    const {register, handleSubmit, formState:{errors}} = useForm<ResetPassInput>({
        resolver: zodResolver(ResetPassShema)
    })
    const [queryParams] = useSearchParams()
    const token = queryParams.get("token")

    const navigate = useNavigate()
    const {execute: resetPassword, loading } = useApi(authApi.ResetPassword)

    const onSubmit = async(data: ResetPassInput)=> {
        if (!token) {
            console.error("Token not found in URL");
            return;
        }
        try {
            await resetPassword({token, password: data.newPassword})
            navigate("/login")
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-xs mx-auto">
      <Input theme="user" {...register("newPassword")} type="password" placeholder="New Password" 
      error={errors.newPassword?.message} 
      showPasswordToggle={true}
      isPasswordVisible={showNew}
      togglePasswordVisibility={()=> setNew(prev => !prev)}
      />
      <Input theme="user" {...register("confirmPassword")} type="password" placeholder="Confirm Password" 
      error={errors.confirmPassword?.message}
       showPasswordToggle={true}
       isPasswordVisible={showConfirm}
       togglePasswordVisibility={()=> setConfirm(prev => !prev)}
      />
      <Button type="submit" theme="user" loading={loading}>
        Reset Password
      </Button>
    </form>
  )
}