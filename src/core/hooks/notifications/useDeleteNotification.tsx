import { userApi } from "@/features/user/services/userApi"
import { markAllRead, markAsRead, setDeleting } from "@/features/user/slice/notificationSlice"
import { useDispatch } from "react-redux"

export const useNotificationActions = () =>{

    const dispatch = useDispatch()

    const handleMarkAsRead = async(id: string)=>{
        try {
            dispatch(markAsRead(id))

            await userApi.deleteNotification(id)
        } catch (error) {
            console.error("Failed to delete notification", error)
        }
    }

    const handleMarkAllAsRead = async()=>{
        try {
            dispatch(setDeleting(true))

            await userApi.deleteAllNotifications()

            dispatch(markAllRead())
        } catch (error) {
            console.error("Failed to delete all the notification", error)
        }
    }

    return {
        handleMarkAsRead,
        handleMarkAllAsRead
    }
}