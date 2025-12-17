import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface PrivateRoomState{
    roomId: string | null
    partnerName: string | null
    partnerId: string | null
    isHost: boolean,
    isActive: boolean 
}

const initialState: PrivateRoomState = {
    roomId: null,
    partnerName: null,
    partnerId: null,
    isHost: false,
    isActive: false 
}

const PrivateRoomSlice = createSlice({
    name:"private_room",
    initialState: initialState,
    reducers:{
         setPrivateRoom: (state, action: PayloadAction<Omit<PrivateRoomState, 'isActive'>>) => {
            state.roomId = action.payload.roomId;
            state.partnerName = action.payload.partnerName;
            state.partnerId = action.payload.partnerId;
            state.isHost = action.payload.isHost;
            state.isActive = true;
        },
        clearPrivateRoom: () => {
            return initialState;
        }
    }
})

export const {setPrivateRoom,clearPrivateRoom} = PrivateRoomSlice.actions
export default PrivateRoomSlice.reducer