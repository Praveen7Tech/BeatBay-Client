import { SongResponse } from "@/features/user/services/userApi";
import React, { createContext, useCallback, useContext, useState } from "react";
import { useAudioPlayer } from "../hooks/user/useAudioPlayer";

interface AudioContextType{
    currentSong: SongResponse | null
    playSong: (song: SongResponse)=> void
    isPlaying: boolean
    currentTime: number
    playPause: ()=> void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioPlayerProvider = ({children}: {children: React.ReactNode}) =>{
    const [currentSong, setCurrentSong] = useState<SongResponse | null>(null)
    const URL = import.meta.env.VITE_API_URL
    const audioUrl = `${URL}/songs/${currentSong?.audioUrl}`

    const {isPlaying, currentTime, playPause} = useAudioPlayer(audioUrl)

    const playSong = useCallback((song: SongResponse)=>{
        setCurrentSong(song)
    },[])

    return(
        <AudioContext.Provider value={{currentSong, currentTime,playSong, isPlaying, playPause}}>
            {children}
        </AudioContext.Provider>
    )
}

export const useAudioContext = () =>{
    const context = useContext(AudioContext)
    if(context === undefined){
        throw new Error("eror in using audio context")
    }
    return context
}