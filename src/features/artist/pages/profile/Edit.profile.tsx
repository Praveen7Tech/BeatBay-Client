
import { zodResolver } from "@hookform/resolvers/zod";
import { Biohazard, User, User2, X } from "lucide-react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { authApiArtist } from "../../services/artist-authApi"; 
import { Button } from "@/core/components/button/Button";
import { Input } from "@/core/components/input/Input";
import { useProfileEdit } from "@/core/hooks/useEditProfile";
import { ProfileDetailsData, ProfileDetailsSchema } from "../../schema-validator/EditProfile.Schema";
const imgURL = import.meta.env.VITE_API_URL

export function EditArtistProfile() {
    const navigate = useNavigate()
    // schema validator
    const {register, handleSubmit, formState:{errors}} = useForm<ProfileDetailsData>({
        resolver: zodResolver(ProfileDetailsSchema)
    })  

    // handle edit profile
    const {user, preview, handleEdit, handleImageChange} = useProfileEdit(authApiArtist.editProfile)
    const EditProfileData = async(data: ProfileDetailsData)=>{
      await handleEdit(data)
      navigate('/artist-profile')
    }

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
              <Input  type="file" accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer rounded-lg"
                onChange={handleImageChange} />
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
              <Input theme="artist" icon={User2} {...register('name')} defaultValue={user?.name} type="text"placeholder="Enter artist name"  error={errors.name?.message} errorTheme="red"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Bio
              </label>
              <Input theme="artist" icon={Biohazard} {...register('bio')} placeholder="Enter artist bio" defaultValue={user?.bio} 
              error={errors.bio?.message} errorTheme="red"/>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-4 border-t border-zinc-800">
          <Button theme="artist" variant="dashboard" onClick={()=> navigate('/artist-profile')} type="button">
            Cancel
          </Button>
          <Button theme="artist" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
