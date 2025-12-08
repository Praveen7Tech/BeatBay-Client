import { SongResponse, userApi } from "@/features/user/services/userApi";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAudioPlayer } from "../hooks/song/useAudioPlayer";
import { clearPlayBackState, getPlaybackState } from "../service/playerStorageService";

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
    const [initialTime, setInitialTime] = useState<number>(0)

    const currentSong = playList[currentIndex]
    const audioUrl = currentSong?.audioUrl
    const currentSongId = currentSong?._id

    // Skip forwad song
     const skipForward = useCallback(()=>{
        if(playList.length === 0) return

        const nextIndex = (currentIndex + 1) % playList.length
        setCurrentIndex(nextIndex)
    },[currentIndex, playList.length])

    // initiate the audio player hook
    const {isPlaying, currentTime, playPause, seekTime, setVolume} = 
    useAudioPlayer({currentSongId, initialTime, audioUrl, onEnded: skipForward})

    //hydration for fetch last played song if exists
    useEffect(()=>{
        const storedState = getPlaybackState()
        const RestoreLastPlayedSong = async()=>{
            if(storedState?.songId){
                try {
                    const data = await userApi.SongDetail(storedState.songId)

                    setPlayList([data.songs])
                    setCurrentIndex(0)
                    setInitialTime(storedState.currentTime)
                } catch (error) {
                    console.error("error in fetching last played song", error)
                    clearPlayBackState()
                }
            }
           
        }

        RestoreLastPlayedSong()
    },[])

    // seting playlist and play first song
    const setPlaylistAndPlay = useCallback((songs: SongResponse[], index = 0)=>{
        console.log("list", songs)
        setPlayList(songs)
        setCurrentIndex(index)
        setInitialTime(0)
        clearPlayBackState()
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

