
import { InputField } from '../ui/InputField'
import { Mail } from 'lucide-react'
import { Button } from '../ui/Button'
import z from 'zod'
import { useApi } from '@/core/hooks/useApi'
import { authApiArtist } from '../../services/artist-authApi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const FormData = z.object({
    email: z.string().email("Invalid email format")
})

type FormInput = z.infer<typeof FormData>

const ForgotPasswordFormArtist = () => {

    const {handleSubmit, register, formState:{errors}} = useForm<FormInput>({
        resolver: zodResolver(FormData)
    })
    const {execute: VerifyEmail} = useApi(authApiArtist.verifyEmail)

    const Onsubmit= async(data: FormInput)=>{
        try {
            await VerifyEmail(data)
        } catch (error) {
            
        }
    }
  return (
    <form onSubmit={handleSubmit(Onsubmit)}>
        <InputField {...register('email')} placeholder='enter email' icon={Mail}/>
        {errors.email && (<p className="text-white text-sm mt-1">{errors.email.message}</p>)}

        <Button type='submit'>Verify Email</Button>
    </form>
  )
}

export default ForgotPasswordFormArtist
