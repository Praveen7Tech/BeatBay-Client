import { RootState } from "@/core/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, X } from "lucide-react"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import z from "zod";
import { authApiArtist } from "../../services/artist-authApi"; 
import { useApi } from "@/core/hooks/useApi";
import { useDispatch } from "react-redux";
import { update } from "@/features/auth/slices/authSlice";

const EditSchema = z.object({
    name: z.string().min(2, "Name is required").optional(),
    bio: z.string().min(2, "Bio must be atleast 10 letter length").optional(),
    password: z.string() .transform((val) => (val === "" ? undefined : val)).optional()
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

const imgURL = import.meta.env.VITE_API_URL

export function EditArtistProfile() {
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

    const {execute: EditProfileArtist}  = useApi(authApiArtist.editProfile)
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
    
        const res = await EditProfileArtist(formData);
        dispatch(update({user:res.user}))
        navigate('/artist-profile')
        } catch (error) {
        console.error(error);
        }
    };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
        <h2 className="text-3xl font-bold">Edit Artist Info</h2>
        <button onClick={()=> navigate('/artist-profile')} className="text-zinc-400 hover:text-white transition">
          <X size={24} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(EditProfileData)} className="space-y-6 max-w-3xl mx-auto">
        <div className="flex gap-6">
          {/* Image Upload */}
          <div className="shrink-0">
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Profile Image
            </label>
            <label className="relative block w-32 h-32 cursor-pointer">
            <div className="relative">
            {preview ?
                (<img src={preview} className="w-32 h-32 rounded-lg object-cover bg-zinc-800" />)
                :
                user?.profilePicture ?
                (<img
                    src={`${imgURL}/uploads/${user?.profilePicture}`}
                    alt="Artist"
                    className="w-32 h-32 rounded-lg object-cover bg-zinc-800"
                />) : (<User className="w-12 h-12 text-gray-500"/>)
            }
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer rounded-lg"
                onChange={handleImageChange}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg opacity-0 hover:opacity-100 transition">
                <span className="text-white text-sm font-medium">Change Image</span>
              </div>
            </div>
            </label>
          </div>

          {/* Form Fields */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Artist Name
              </label>
              <input
                {...register('name')}
                defaultValue={user?.name}
                type="text"
                placeholder="Enter artist name"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Bio
              </label>
              <textarea
                {...register('bio')}
                placeholder="Enter artist bio"
                rows={4}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition resize-none"
              />
              {errors.bio && <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>
              <input
                {...register('password')}
                type="text"
                placeholder="Enter password"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Confirm Password
              </label>
              <input
                {...register('confirmPassword')}
                type="text"
                placeholder="confirm password"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition"
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-4 border-t border-zinc-800">
          <button onClick={()=> navigate('/artist-profile')}
            type="button"
            className="px-6 py-2 border border-zinc-700 rounded-lg text-white hover:bg-zinc-800 transition"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-zinc-100 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
