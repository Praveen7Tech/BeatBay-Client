import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useDispatch } from "react-redux"
import { useApi } from "./useApi"
import { update } from "@/features/auth/slices/authSlice"

export const useEditProfile =(editApi: (data: FormData)=> Promise<any>)=>{
    const [image, setImage] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const user =  useSelector((state:RootState)=> state.auth.user)
    const dispatch = useDispatch()

    const {execute} = useApi(editApi)

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0]
     if (file) {
       setImage(file)
       setPreview(URL.createObjectURL(file))
     }
   }

    const handleEdit = async (data: Record<string, any>) => {
        try {
        const hasChanges = data.name !== user?.name || data.password || image || data.bio
        if (!hasChanges) return

        const formData = new FormData()
        if (data.name && data.name !== user?.name) formData.append("name", data.name)
        if (data.password) formData.append("password", data.password)
        if (data.bio) formData.append("bio", data.bio)
        if (image) formData.append("profileImage", image)

        const res = await execute(formData)
        console.log("form data-", formData)
        dispatch(update({ user: res.user }))
        return res
        } catch (err) {
        console.error(err)
        }
    }

    return {user, image, preview, handleImageChange, handleEdit}
}