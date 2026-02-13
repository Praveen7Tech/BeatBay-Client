import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InviteState = "none" | "pending" | "recieved" | "connected" | "another_room" | "offline"

 export interface InviteStateMap {
    [friendId: string] : InviteState
}

interface InitialSliceState {
    invites: InviteStateMap
}

const initialState: InitialSliceState = {
    invites: {}
}

const InviteStateSlice = createSlice({
    name: "InviteState",
    initialState:  initialState,
    reducers:{
        setInviteState(state, action: PayloadAction<{friendId: string; state: InviteState}>){
            state.invites[action.payload.friendId] = action.payload.state
        },
        setBulkInvite(state, action: PayloadAction<InviteStateMap>){
            state.invites = action.payload
        },
        clearInvite(state, action: PayloadAction<string>){
            delete state.invites[action.payload]
        }
    }
})

export const {setInviteState, setBulkInvite, clearInvite} = InviteStateSlice.actions
export default InviteStateSlice.reducer