"use client"

import { Button } from "@/core/components/button/Button"
import { Input } from "@/core/components/input/Input"
import { userApi } from "../../services/userApi" 
import { Lock } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ChangePasswordData, ChangePasswordSchema } from "../../schemas/ChangePasswordSchema"
import { useChangePassword } from "@/core/hooks/password/useChangePassword"
import { useState } from "react"

interface EditPasswordProps {
  onCancel: () => void
}

export function EditPassword({ onCancel }: EditPasswordProps) {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
 
  const { register, handleSubmit,  formState: { errors },setError } = useForm<ChangePasswordData>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  const { handleChange } = useChangePassword(userApi.changePassword)

  const handleEditPassword = async (data: ChangePasswordData) => {
    try {
        await handleChange(data)
        onCancel()
    } catch (error:any) {
        if(error.response.data.message === "incorrect"){
            setError("currentPassword", {message:"Incorrect current password"})
        }
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">Change Password</h1>

      <form onSubmit={handleSubmit(handleEditPassword)}>
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Current Password</label>
            <Input
              {...register("currentPassword")}
              theme="artist"
              type="password"
              icon={Lock}
              placeholder="Enter current password"
              error={errors.currentPassword?.message} errorTheme="red"
              showPasswordToggle={true}
              isPasswordVisible={showCurrent}
              togglePasswordVisibility={()=> setShowCurrent(prev => !prev)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">New Password</label>
            <Input
              theme="artist"
              {...register("newPassword")}
              type="password"
              icon={Lock}
              placeholder="Enter new password"
              error={errors.newPassword?.message} errorTheme="red"
              showPasswordToggle={true}
              isPasswordVisible={showNew}
              togglePasswordVisibility={()=> setShowNew(prev => !prev)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm Password</label>
            <Input
              theme="artist"
              {...register("confirmPassword")}
              type="password"
              icon={Lock}
              placeholder="Confirm new password"
              error={errors.confirmPassword?.message} errorTheme="red"
              showPasswordToggle={true}
              isPasswordVisible={showConfirm}
              togglePasswordVisibility={()=> setShowConfirm(prev => !prev)}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-8 border-t border-[#2a2a2a]">
          <Button type="submit" theme="user" variant="primary">
            Update Password
          </Button>
          <Button type="button" theme="user" variant="dashboard" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
