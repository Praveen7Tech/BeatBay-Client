import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface PrivateRoomState{
    roomId: string | null
    hostId: string | null
    guestId: string | null
    status: "pending" | "jamming" | "none"
    isActive: boolean 
}

const initialState: PrivateRoomState = {
    roomId: null,
    hostId: null,
    guestId: null,
    status: "none",
    isActive: false 
}

const PrivateRoomSlice = createSlice({
    name:"private_room",
    initialState: initialState,
    reducers:{
         setPrivateRoom: (state, action: PayloadAction<Omit<PrivateRoomState, 'isActive'>>) => {
            state.roomId = action.payload.roomId;
            state.hostId = action.payload.hostId;
            state.guestId = action.payload.guestId;
            state.status = action.payload.status;
            state.isActive = true;
        },
        clearPrivateRoom: () => {
            return initialState;
        }
    }
})

export const {setPrivateRoom,clearPrivateRoom} = PrivateRoomSlice.actions
export default PrivateRoomSlice.reducer