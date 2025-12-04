import { SongResponse } from "@/features/user/services/userApi";
import React, { createContext, useCallback, useContext, useState } from "react";
import { useAudioPlayer } from "../hooks/song/useAudioPlayer";

interface AudioContextType{
    currentSong: SongResponse | null
    setPlaylistAndPlay: (songs: SongResponse[], startIndex?: number)=> void
    isPlaying: boolean
    currentTime: number
    playPause: ()=> void
    seekTime: (time: number)=> void
    setVolume: (volume: number[])=> void
    volume: number

    playList: SongResponse[]
    skipForward: ()=> void
    skipBackward: ()=> void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioPlayerProvider = ({children}:{children: React.ReactNode})=>{

    const [currentIndex, setCurrentIndex] = useState<number>(-1)
    const [volume, setVolumeState] = useState(50) // default volume 50%
    const [playList, setPlayList] = useState<SongResponse[] | []>([])

     const currentSong = playList[currentIndex]

    const URL = import.meta.env.VITE_API_URL
    const audioUrl = `${URL}/songs/${currentSong?.audioUrl}`

    // Skip forwad song
     const skipForward = useCallback(()=>{
        if(playList.length === 0) return

        const nextIndex = (currentIndex + 1) % playList.length
        setCurrentIndex(nextIndex)
    },[currentIndex, playList.length])

    const {isPlaying, currentTime, playPause, seekTime, setVolume} = useAudioPlayer(audioUrl, skipForward)

    // seting playlist and play first song
    const setPlaylistAndPlay = useCallback((songs: SongResponse[], index = 0)=>{
        setPlayList(songs)
        setCurrentIndex(index)
    },[])

    // voolume adjustment
    const handleSetVolume =  (value: number[])=>{
        const newVolume = value[0]
        setVolumeState(newVolume)
        setVolume(newVolume)
    }


    // skip song to backward
    const skipBackward = useCallback(()=>{
        if(playList.length === 0) return;

        const previousIndex = (currentIndex - 1 + playList.length) % playList.length
        setCurrentIndex(previousIndex)
    },[currentIndex, playList.length])

    return(
        <AudioContext.Provider value={{currentSong, currentTime, playList, playPause,isPlaying,seekTime,setVolume: handleSetVolume, volume: volume, skipForward, skipBackward, setPlaylistAndPlay
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

