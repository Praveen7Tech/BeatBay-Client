
import { Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApi } from '@/core/hooks/api/useApi'
import { authApiArtist } from '../../services/artist-authApi'
import { Button } from '@/core/components/button/Button'
import { Input } from '@/core/components/input/Input'
import { ResetPassInput, ResetPassShema } from '@/features/auth/schemas/auth.validator'
import { useState } from 'react'

const ResetPasswordFormArtist = () => {
    const [showNewpass, setNewpass] = useState(false)
    const [showConfirmPass, setConfirmPass] = useState(false)

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
            navigate("/artist/login")
        } catch (error) {
            console.error(error)
        }
    }

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
            <Input theme="artist"{...register('newPassword')} placeholder='New password' icon={Lock} 
             error={errors.newPassword?.message} errorTheme='red' type='password'
             showPasswordToggle={true}
             isPasswordVisible={showNewpass}
             togglePasswordVisibility={()=> setNewpass(prev => !prev)}
             />
        </div>
        <div>
            <Input theme="artist" {...register('confirmPassword')} placeholder='Confirm password' icon={Lock}  error={errors.confirmPassword?.message} errorTheme='red' type='password'
            showPasswordToggle={true}
            isPasswordVisible={showConfirmPass}
            togglePasswordVisibility={()=> setConfirmPass(prev=> !prev)}
            />
        </div>
        
        <Button type='submit' theme='user' variant='secondary' loading={loading}>Rest passowrd</Button>
    </form>
  )
}

export default ResetPasswordFormArtist
