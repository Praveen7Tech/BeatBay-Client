
import { Lock } from 'lucide-react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApi } from '@/core/hooks/useApi'
import { authApiArtist } from '../../services/artist-authApi'
import { Button } from '@/core/components/button/Button'
import { Input } from '@/core/components/input/Input'

const ResetPassShema = z.object({
    newPassword: z.string().min(6,"password must be atleast 6 charecters"),
    confirmPassword: z.string().min(6, "password must be atleast 6 charecters")
})
.refine((data)=> data.newPassword === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
})

type ResetPassInput = z.infer<typeof ResetPassShema>

const ResetPasswordFormArtist = () => {

    const {register, handleSubmit, formState:{errors}} = useForm<ResetPassInput>({
        resolver: zodResolver(ResetPassShema)
    })
    const [queryParams] = useSearchParams()
    const token = queryParams.get("token")

    const navigate = useNavigate()
    const {execute: resetPassword, loading} = useApi(authApiArtist.ResetPassword)

    const onSubmit = async(data: ResetPassInput)=> {
        if (!token) {
            console.error("Token not found in URL");
            return;
        }
        try {
            await resetPassword({token, password: data.newPassword})
            navigate("/artist-signin")
        } catch (error) {
            console.error(error)
        }
    }

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
            <Input theme="artist"{...register('newPassword')} placeholder='New password' icon={Lock} 
             error={errors.newPassword?.message}/>
        </div>
        <div>
            <Input theme="artist" {...register('confirmPassword')} placeholder='Confirm password' icon={Lock}
             error={errors.confirmPassword?.message}/>
        </div>
        
        <Button type='submit' theme='artist' variant='primary' loading={loading}>Rest passowrd</Button>
    </form>
  )
}

export default ResetPasswordFormArtist
