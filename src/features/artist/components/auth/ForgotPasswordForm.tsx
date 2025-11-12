
import { Mail } from 'lucide-react'
import { useApi } from '@/core/hooks/useApi'
import { authApiArtist } from '../../services/artist-authApi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button } from '@/core/components/button/Button'
import { Input } from '@/core/components/input/Input'
import { EmailSchema, VerifyEmailInput } from '@/features/auth/schemas/auth.validator'

const ForgotPasswordFormArtist = () => {

    const [submit, setSubmit] = useState(false)

    const {handleSubmit, register, formState:{errors}} = useForm<VerifyEmailInput>({
        resolver: zodResolver(EmailSchema)
    })
    const {execute: VerifyEmail, loading} = useApi(authApiArtist.verifyEmail)

    const Onsubmit= async(data: VerifyEmailInput)=>{
        try {
            await VerifyEmail(data)
            setSubmit(true)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <form onSubmit={handleSubmit(Onsubmit)}>
        <div>
            <Input theme="artist" {...register('email')} placeholder='enter email' disabled={submit} icon={Mail}  error={errors.email?.message} errorTheme='red'/>
        </div>
        
        <Button type='submit' theme='user' variant='secondary' disabled={submit} loading={loading}>
            Verify Email
        </Button>

        {submit && (
            <p className="text-white/80 text-sm text-center">
                Please check your email for create
                <br />a new password
            </p>
        )}
    </form>
  )
}

export default ForgotPasswordFormArtist