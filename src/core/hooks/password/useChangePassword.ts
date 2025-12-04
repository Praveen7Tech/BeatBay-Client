
import { useApi } from "../api/useApi"
import { ChangePasswordData } from "@/features/user/schemas/ChangePasswordSchema"; 

interface ApiResponse {
    message: string;
}

export const useChangePassword = (changePasswordApi: (data: Omit<ChangePasswordData, 'confirmPassword'>) => Promise<ApiResponse>) => {
    const { execute } = useApi(changePasswordApi)

    const handleChange = async (data: ChangePasswordData) => {
        try {
            const payload = {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            }
            const res = await execute(payload)
            return res
        } catch (err) {
            console.error(err)
            throw err 
        }
    }

    return { handleChange }
}
