import { SongResponse } from "@/features/user/services/userApi";
import React, { createContext, useCallback, useContext, useState } from "react";
import { useAudioPlayer } from "../hooks/user/useAudioPlayer";

interface AudioContextType{
    currentSong: SongResponse | null
    playSong: (song:SongResponse) => void
    isPlaying: boolean
    currentTime: number
    playPause: ()=> void
    seekTime: (time: number)=> void
    setVolume: (volume: number[])=> void
    volume: number
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioPlayerProvider = ({children}:{children: React.ReactNode})=>{
    const [currentSong, setCurrentSong] = useState<SongResponse | null>(null)
    const [volume, setVolumeState] = useState(50) // default volume 50%

    const URL = import.meta.env.VITE_API_URL
    const audioUrl = `${URL}/songs/${currentSong?.audioUrl}`

    const {isPlaying, currentTime, playPause, seekTime, setVolume} = useAudioPlayer(audioUrl)

    const playSong = useCallback((song: SongResponse)=>{
        setCurrentSong(song)
    },[])

    const handleSetVolume =  (value: number[])=>{
        const newVolume = value[0]
        setVolumeState(newVolume)
        setVolume(newVolume)
    }

    return(
        <AudioContext.Provider value={{currentSong, currentTime, playSong, playPause,isPlaying,seekTime,setVolume: handleSetVolume, volume: volume
        }}>
            {children}
        </AudioContext.Provider>
    )
}

export const useAudioContext = () =>{
    const context = useContext(AudioContext)
    if(context === undefined){
        throw new Error("error in using audio context")
    }
    return context
}

