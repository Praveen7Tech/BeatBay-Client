import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RoomMember {
    id: string;
    name: string;
    image: string;
    role: "host" | "guest";
}
export interface PrivateRoomState{
    roomId: string | null
    hostId: string | null
    members: RoomMember[]
    pendingGuests: string[] | []
    status: "pending" | "jamming" | "none"
    isActive: boolean 
}

const initialState: PrivateRoomState = {
    roomId: null,
    hostId: null,
    members:[],
    pendingGuests: [],
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
            state.members = action.payload.members || [];
            state.status = action.payload.status;
            state.isActive = true;
        },
        addMemberToRoom: (state, action: PayloadAction<RoomMember>) => {
            if (!state.members.find(m => m.id === action.payload.id)) {
                state.members.push(action.payload);
            }
        },
        clearPrivateRoom: () => {
            return initialState;
        }
    }
})

export const {setPrivateRoom,clearPrivateRoom} = PrivateRoomSlice.actions
export default PrivateRoomSlice.reducer