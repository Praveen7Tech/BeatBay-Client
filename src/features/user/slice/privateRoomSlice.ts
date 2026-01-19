import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RoomMember {
    id: string;
    name: string;
    image: string;
    role: "host" | "guest";
}
export interface SongData{
    id:string
    title:string
    image: string
    audioUrl: string
    artist: string
    timestamp: number
    duration: number
    isPlaying: boolean
    updatedAt:number
}
export interface PrivateRoomState{
    roomId: string | null
    hostId: string | null
    members: RoomMember[]
    pendingGuests: string[] | []
    status: "pending" | "jamming" | "none"
    isActive: boolean 
    songData:SongData | null
    queue: SongData[];
}

const initialState: PrivateRoomState = {
    roomId: null,
    hostId: null,
    members:[],
    pendingGuests: [],
    songData: null,
    status: "none",
    isActive: false,
    queue: [] 
}

const PrivateRoomSlice = createSlice({
    name:"private_room",
    initialState: initialState,
    reducers:{
         setPrivateRoom: (state, action: PayloadAction<Omit<PrivateRoomState, 'isActive'>>) => {
            state.roomId = action.payload.roomId;
            state.hostId = action.payload.hostId;
            state.members = action.payload.members || [];
            state.songData = action.payload.songData
            state.status = action.payload.status;
            state.queue = action.payload.queue
            state.isActive = true;
        },
        addMemberToRoom: (state, action: PayloadAction<RoomMember>) => {
            if (!state.members.find(m => m.id === action.payload.id)) {
                state.members.push(action.payload);
            }
        },
        clearPrivateRoom: () => {
            return initialState;
        },
        setRoomSongQueueData: (state, action: PayloadAction<SongData>) => {
            state.queue.push(action.payload);
        },
        setRoomQueue: (state, action: PayloadAction<SongData[]>) => {
            state.queue = action.payload;
        },
        setCurrentSong:(state,action: PayloadAction<SongData>)=>{
            state.songData = action.payload
        },
        removeSongFromQueue: (state, action:PayloadAction<string>)=>{
            state.queue = state.queue.filter(song => song.id !== action.payload)
        }
    }
})

export const {setPrivateRoom,clearPrivateRoom, setRoomSongQueueData, setRoomQueue, setCurrentSong, removeSongFromQueue} = PrivateRoomSlice.actions
export default PrivateRoomSlice.reducer