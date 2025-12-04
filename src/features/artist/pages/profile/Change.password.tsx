"use client"

import { Button } from "@/core/components/button/Button"
import { Input } from "@/core/components/input/Input"
import { Lock, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ChangePasswordData, ChangePasswordSchema } from "@/features/user/schemas/ChangePasswordSchema"
import { useChangePassword } from "@/core/hooks/password/useChangePassword"
import { artistApi } from "../../services/artist.api"
import { useNavigate } from "react-router-dom"



export function EditPassword() {
    const navigate = useNavigate()
  const { register, handleSubmit,  formState: { errors },setError } = useForm<ChangePasswordData>({
      resolver: zodResolver(ChangePasswordSchema),
    })
  
    const { handleChange } = useChangePassword(artistApi.changePassword)
  
    const handleEditPassword = async (data: ChangePasswordData) => {
      try {
          await handleChange(data)
          navigate('/artist-profile')
      } catch (error:any) {
          if(error.response.data.message === "incorrect"){
              setError("currentPassword", {message:"Incorrect current password"})
          }
      }
    }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
        <h2 className="text-3xl font-bold">Change Password</h2>
        <button className="text-zinc-400 hover:text-white transition">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit(handleEditPassword)} className="space-y-6 max-w-3xl mx-auto">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Current Password</label>
            <Input
              {...register("currentPassword")}
              theme="artist"
              icon={Lock}
              type="password"
              placeholder="Enter current password"
              error={errors.currentPassword?.message}
              errorTheme="red"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">New Password</label>
            <Input
              theme="artist"
              icon={Lock}
              {...register("newPassword")}
              type="password"
              placeholder="Enter new password"
              error={errors.newPassword?.message}
              errorTheme="red"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Confirm Password</label>
            <Input
              theme="artist"
              icon={Lock}
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm new password"
              error={errors.confirmPassword?.message}
              errorTheme="red"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-zinc-800">
          <Button theme="artist" variant="dashboard" onClick={()=> navigate('/artist-profile')} type="button">
            Cancel
          </Button>
          <Button theme="artist" type="submit">
            Update Password
          </Button>
        </div>
      </form>
    </div>
  )
}
