
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store/store"
import { useApi } from "../api/useApi"
import { update } from "@/features/auth/slices/authSlice"
import { ProfileDetailsData, ProfileDetailsSchema } from "@/features/user/schemas/editProfile.Schema" 
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditProfileResponse } from "@/features/user/services/userApi"

export const useProfileEdit = (editApi: (data: FormData)=> Promise<EditProfileResponse>) => {
    const [image, setImage] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()
    const { execute, loading } = useApi(editApi)

    const {register, handleSubmit, formState:{errors}} = useForm<ProfileDetailsData>({
          resolver: zodResolver(ProfileDetailsSchema)
   })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleEdit = async (data: ProfileDetailsData) => {
        try {
            const hasChanges = data.name !== user?.name || image || data.bio !== user?.bio;
            if (!hasChanges) return;

            const formData = new FormData()
            if (data.name && data.name !== user?.name) formData.append("name", data.name)
            if (data.bio && data.bio !== user?.bio) formData.append("bio", data.bio)
            if (image) formData.append("profileImage", image)

            const res = await execute(formData)
            dispatch(update({ user: res.user }))
            return res
        } catch (err) {
            console.error(err)
            throw err; 
        }
    }

    return { user, image, preview, handleImageChange, handleEdit, register, handleSubmit, errors, loading }
}
