
import { useApi } from "@/core/hooks/useApi"
import { RootState } from "@/core/store/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { Camera, Mail, Lock, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import z from "zod"
import { userApi } from "../services/userApi"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginSuccess, update } from "@/features/auth/slices/authSlice"

const imgURL = import.meta.env.VITE_API_URL

const EditSchema = z
  .object({
    name: z.string().min(2, "Name is required").optional(),
    password: z
      .string()
      .transform((val) => (val === "" ? undefined : val)) // Treat empty string as undefined
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: "Password must be at least 6 characters",
      }),
    confirmPassword: z
      .string()
      .transform((val) => (val === "" ? undefined : val)) // same handling
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
    <div className="w-full max-w-2xl mx-auto bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-8">
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
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
          <div className="flex items-center gap-3 px-4 py-3 bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] focus-within:border-[#00d084] transition-colors">
            <User className="w-5 h-5 text-gray-500" />
            
            <input
            {...register('name')}
              type="text"
              defaultValue={user?.name}
              placeholder="Enter your full name"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
          <div className="flex items-center gap-3 px-4 py-3 bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] focus-within:border-[#00d084] transition-colors">
            <Mail className="w-5 h-5 text-gray-500" />
            <input
              // {...register('email')}
              type="email"
              value={user?.email}
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
            />
             {/* {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>} */}
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
          <div className="flex items-center gap-3 px-4 py-3 bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] focus-within:border-[#00d084] transition-colors">
            <Lock className="w-5 h-5 text-gray-500" />
            <input
              {...register("password")}
              type="password"
              // defaultValue={"password"}
              placeholder="Enter new password"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
            />
             {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <p className="text-xs text-gray-500 mt-2">Leave blank to keep current password</p>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm Password</label>
          <div className="flex items-center gap-3 px-4 py-3 bg-[#2a2a2a] rounded-lg border border-[#3a3a3a] focus-within:border-[#00d084] transition-colors">
            <Lock className="w-5 h-5 text-gray-500" />
            <input
              {...register("confirmPassword")}
              type="password"
              // defaultValue={"password"}
              placeholder="Confirm new password"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
            />
             {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-8 pt-8 border-t border-[#2a2a2a]">
        <button className="flex-1 px-4 py-3 bg-[#00d084] text-black rounded-lg font-semibold hover:bg-[#00c070] transition-colors">
          Save Changes
        </button>
        <button type="button" onClick={()=> navigate('/profile')} className="flex-1 px-4 py-3 bg-[#2a2a2a] text-gray-300 rounded-lg font-semibold hover:bg-[#3a3a3a] transition-colors">
          Cancel
        </button>
      </div>
      </form>
    </div>
  )
}
