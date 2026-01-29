import { artistApi } from "@/features/artist/services/artist.api"
import { useMutation } from "@tanstack/react-query"
import { useToaster } from "../../toast/useToast"

export const useArtistOnBoarding = () =>{
    const {toast} = useToaster()

    const {mutate: onBoarding} = useMutation({
        mutationFn: ()=> artistApi.getOnBoardingLink(),
        onSuccess:(data)=>{
            if(data.link){
                window.location.href = data.link
            }
        },
        onError:(error)=>{
            toast.error(error.message || "Failed to generate onbaording link")
        }
    })

    return {
        onBoarding
    }
}