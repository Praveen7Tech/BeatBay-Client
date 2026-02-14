import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type NotifyType = "INVITE" | "REJECT" | "JOINED" | "REMOVE";

export interface Notification{
    id: string
    senderName: string
    senderImage: string | null
    type: NotifyType
    message: string
    isRead: boolean
    time: Date
    isTemp?:boolean
}

interface Notifications{
    list : Notification[]
    unreadCount: number
    isDeleting: boolean
}

const initialState : Notifications ={
    list: [],
    unreadCount: 0,
    isDeleting: false
}

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers:{
        setNotifications:(state, action: PayloadAction<Notification[]>) =>{
            state.list = action.payload
            state.unreadCount = action.payload.filter(n=> !n.isRead).length
        },
        addNotification(state, action: PayloadAction<Notification>){
            state.list.unshift(action.payload)
            state.unreadCount += 1
        },
        markAsRead(state, action: PayloadAction<string>){
            const notificationId = action.payload
            const target = state.list.find(n=> n.id == notificationId)
            if(target){
                if(!target.isRead){
                    state.unreadCount -= 1
                }
                state.list = state.list.filter(n=> n.id !== notificationId)
            }
        },
        markAllRead(state){
            state.list = []
            state.unreadCount = 0
            state.isDeleting = false
        },
        setDeleting(state, action: PayloadAction<boolean>){
            state.isDeleting = action.payload
        }
    }
})

export const {addNotification,setNotifications, markAsRead, markAllRead, setDeleting} = notificationSlice.actions
export default notificationSlice.reducer