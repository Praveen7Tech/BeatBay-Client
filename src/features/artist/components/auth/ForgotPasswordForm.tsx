
import { InputField } from '../ui/InputField'
import { Mail } from 'lucide-react'
import z from 'zod'
import { useApi } from '@/core/hooks/useApi'
import { authApiArtist } from '../../services/artist-authApi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button } from '@/core/components/button/Button'

const FormData = z.object({
    email: z.string().email("Invalid email format")
})

type FormInput = z.infer<typeof FormData>

const ForgotPasswordFormArtist = () => {

    const [submit, setSubmit] = useState(false)

    const {handleSubmit, register, formState:{errors}} = useForm<FormInput>({
        resolver: zodResolver(FormData)
    })
    const {execute: VerifyEmail, loading} = useApi(authApiArtist.verifyEmail)

    const Onsubmit= async(data: FormInput)=>{
        try {
            await VerifyEmail(data)
            setSubmit(true)
        } catch (error) {
            
        }
    }
  return (
    <>
     <p className="text-white/80 text-sm text-center pb-3">Enter your registered email below</p>
    <form onSubmit={handleSubmit(Onsubmit)}>
        <InputField {...register('email')} placeholder='enter email' disabled={submit} icon={Mail}/>
        {errors.email && (<p className="text-white text-sm mt-1">{errors.email.message}</p>)}

        <Button type='submit' theme='artist' variant='secondary' disabled={submit} loading={loading}>
            Verify Email
        </Button>

        {submit && (
            <p className="text-white/80 text-sm text-center">
                Please check your email for create
                <br />a new password
            </p>
        )}
    </form>
    </>
  )
}

export default ForgotPasswordFormArtist
