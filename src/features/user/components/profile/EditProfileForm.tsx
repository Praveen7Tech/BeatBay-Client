"use client"

import { Button } from "@/core/components/button/Button"
import { Input } from "@/core/components/input/Input"
import { userApi } from "../../services/userApi"
import { ImagePlus, Lock, Mail, User } from "lucide-react"
import { useEditProfile } from "@/core/hooks/useEditProfile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { EditProfileData, EditProfileSchema } from "../../schemas/editProfile.Schema"

interface EditProfileProps {
  onCancel: () => void
}

export function EditProfileForm({ onCancel }: EditProfileProps) {
    // schema validation
    const { register, handleSubmit, formState: { errors }} = useForm<EditProfileData>({
        resolver: zodResolver(EditProfileSchema),
    })

    // handle edit profile
    const { user, preview, handleImageChange, handleEdit } = useEditProfile(userApi.editProfile)
    const handleEditProfile = async (data: EditProfileData) => {
    await handleEdit(data)
    onCancel()
    }
 
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">Edit Profile</h1>

      <form onSubmit={handleSubmit(handleEditProfile)}>
        <div className="flex gap-12 mb-8">
          {/* Left: Profile Picture Section */}
            <div className="shrink-0">
                <label className="block text-sm font-semibold text-gray-300 mb-4">
                Profile Picture
                </label>

                {/* Circle preview box */}
                <div className="relative w-32 h-32 rounded-full border-4 border-[#0f0f0f] flex items-center justify-center overflow-hidden">
                    {preview ? (  <img src={preview}   className="w-full h-full object-cover rounded-full" />
                    ) : ( <User className="w-16 h-16 text-gray-500" />  )}
                </div>

                {/* Upload icon under preview */}
                <label className="mt-3 flex items-center justify-center gap-2 text-gray-400 hover:text-[#00d084] cursor-pointer transition">
                    <ImagePlus className="w-5 h-5" />
                    <span className="text-sm font-medium">Change Image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
            </div>
          

          {/* Right: Form Fields */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
              <Input theme="user" icon={User}  {...register("name")} type="text" defaultValue={user?.name}
                placeholder="Enter your full name"
                error={errors.name?.message} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
              <Input  theme="user"  icon={Mail} type="email" value={user?.email} placeholder="Enter your email"
                disabled />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">New Password</label>
                <Input  theme="user"  {...register("password")}  type="password" icon={Lock} placeholder="Enter new password" error={errors.password?.message} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm Password</label>
                <Input  theme="user"  {...register("confirmPassword")} type="password" icon={Lock}
                  placeholder="Confirm new password" error={errors.confirmPassword?.message} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-8 border-t border-[#2a2a2a]">
          <Button type="submit" theme="user" variant="primary" >
            Save Changes
          </Button>
          <Button type="button" theme="user" variant="dashboard" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
