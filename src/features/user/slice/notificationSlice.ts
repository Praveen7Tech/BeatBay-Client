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
}

const initialState : Notifications ={
    list: [],
    unreadCount: 0
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
        }
    }
})

export const {addNotification,setNotifications, markAsRead} = notificationSlice.actions
export default notificationSlice.reducer