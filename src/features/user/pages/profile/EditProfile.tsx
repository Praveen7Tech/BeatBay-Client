
import { useApi } from "@/core/hooks/useApi"
import { RootState } from "@/core/store/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { Camera, Mail, Lock, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import z from "zod"
import { userApi } from "../../services/userApi" 
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { update } from "@/features/auth/slices/authSlice"
import { InputField } from "@/features/artist/components/ui/InputField"
import { Button } from "@/core/components/button/Button"

const imgURL = import.meta.env.VITE_API_URL

const EditSchema = z
  .object({
    name: z.string().min(2, "Name is required").optional(),
    password: z
      .string()
      .transform((val) => (val === "" ? undefined : val)) // empty string as undefined
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: "Password must be at least 6 characters",
      }),
    confirmPassword: z
      .string()
      .transform((val) => (val === "" ? undefined : val)) 
      .optional(),
    image: z.any().optional(),
  })
  .refine(
    (data) => !data.password || data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );



type EditProfile = z.infer<typeof EditSchema>

export default function EditProfile() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const user = useSelector((state: RootState)=> state.auth.user)
  const {register, handleSubmit, formState:{errors}} = useForm<EditProfile>({
    resolver: zodResolver(EditSchema)
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const file = e.target.files?.[0]
    if(file){
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  

  const {execute: EditProfile}  = useApi(userApi.editProfile)

  const EditProfileData = async (data: EditProfile) => {
    try {
      // Checking if any actual changes were made
      const hasChanges =
        data.name !== user?.name ||
        data.password ||
        image;

      if (!hasChanges) {
        console.log("No changes detected, skipping update.");
        return; 
      }

      const formData = new FormData();
      if (data.name && data.name !== user?.name) formData.append("name", data.name);
      if (data.password) formData.append("password", data.password);
      if (image) formData.append("profileImage", image);

      const res = await EditProfile(formData);
      dispatch(update({user: res.user}))
      navigate('/profile')
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className=" max-w-3xl mx-auto bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Edit Profile</h1>
        <p className="text-gray-400 text-sm">Update your personal information and account settings</p>
      </div>
      <form onSubmit={handleSubmit(EditProfileData)}>
      {/* Profile Image Section */}
      <div className="mb-8 pb-8 border-b border-[#2a2a2a]">
        <label className="block text-sm font-semibold text-gray-300 mb-4">
          Profile Picture
        </label>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-[#2a2a2a] rounded-full flex items-center justify-center border-2 border-[#3a3a3a] overflow-hidden">
            {preview ? (
              <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
            ) : user?.profilePicture ? (
              <img
                src={`${imgURL}/uploads/${user?.profilePicture}`}
                alt={`${user.name}'s profile`}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <User className="w-12 h-12 text-gray-500" />
            )}
          </div>

          {/* Hidden input for file selection */}
          <label className="flex items-center gap-2 px-4 py-2 bg-[#00d084] text-black rounded-lg font-medium hover:bg-[#00c070] transition-colors cursor-pointer">
            <Camera className="w-4 h-4" />
            Upload Image
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>
      </div>


      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name Field */}
          <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
            <InputField
            icon={User}
            {...register('name')}
              type="text"
              defaultValue={user?.name}
              placeholder="Enter your full name"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}

        {/* Email Field */}
          <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
          
            <InputField
              icon={Mail}
              type="email"
              value={user?.email}
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
            />

        {/* Password Field */}
          <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
          
            <InputField
              {...register("password")}
              type="password"
              icon={Lock}
              placeholder="Enter new password"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
            />
             {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}

        {/* Confirm Password Field */}
          <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm Password</label>
            <InputField
              {...register("confirmPassword")}
              type="password"
              icon={Lock}
              placeholder="Confirm new password"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
            />
             {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3  pt-8 border-t border-[#2a2a2a]">
        <Button type="submit" theme="user" variant="primary">
          Save Changes
        </Button>
        <Button type="button" theme="user" variant="dashboard" onClick={()=> navigate('/profile')}>
          Cancel
        </Button>
      </div>
      </form>
    </div>
  )
}
