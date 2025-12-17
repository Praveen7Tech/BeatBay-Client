import { socket } from "@/core/config/socket"
import { RootState } from "@/core/store/store"
import { showSuccess } from "@/core/utils/toast.config"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export const useSocketInit = () =>{
    const user = useSelector((state:RootState)=> state.auth.user)

    const isAuthenticated = !!user

    useEffect(()=>{
        if(isAuthenticated && user.id){
            socket.connect()

            socket.emit("register_user", user.id)
            console.log("socket connected and user registerd")

            socket.on("recieve_invite", (data)=>{
                showSuccess(`new invite from : ${data.fromUser.name}`)
                console.log(`new invite from : ${data.fromUser.name}`)
            })
        }

        return ()=>{
            socket.off("recieve_invite")
            socket.disconnect()
        }
    },[isAuthenticated,user?.id])
}