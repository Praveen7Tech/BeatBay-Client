import {  userApi } from "@/features/user/services/userApi";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAudioPlayer } from "../hooks/song/useAudioPlayer";
import { clearPlayBackState, getPlaybackState } from "../service/playerStorageService";
import { SongDetails } from "@/features/user/services/response.type";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useToaster } from "../hooks/toast/useToast";

type PlayBackType = "GLOBAL" | "ROOM"

interface AudioContextType{
    currentSong: SongDetails | null
    setPlaylistAndPlay: (songs: SongDetails[], startIndex?: number)=> void
    startRoomPlayback: (songs: SongDetails[], startIndex?: number)=> void;
    isPlaying: boolean
    currentTime: number
    playPause: ()=> void
    seekTime: (time: number)=> void
    setVolume: (volume: number[])=> void
    volume: number

    playList: SongDetails[]
    skipForward: ()=> void
    skipBackward: ()=> void

    isRepeating: boolean
    RepeatSong: ()=> void
    onTrackLoaded?: ()=> void
    isRoomActive: boolean;
    isHost:boolean;
    appendSongToPlaylist: (song:SongDetails)=> void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioPlayerProvider = ({children}:{children: React.ReactNode})=>{

    const [currentIndex, setCurrentIndex] = useState<number>(-1)
    const [volume, setVolumeState] = useState(50)
    const [playList, setPlayList] = useState<SongDetails[]>([])
    const [initialTime, setInitialTime] = useState<number>(0)
    const [isRepeating, setIsrepeating] = useState(false)
    const {toast} = useToaster()
    const [PlayBackType, setPlaybackType] = useState<PlayBackType>("GLOBAL")

    const user = useSelector((state:RootState)=> state.auth.user)
    const room = useSelector((state:RootState)=> state.privateRoom)
    const isRoomActive = room.isActive 
    const isHost = room.hostId === user?.id

    const canControl = (PlayBackType === "GLOBAL" && !isRoomActive) || (PlayBackType === "ROOM" && isRoomActive)

    // Safe currentSong with bounds checking
    const currentSong: SongDetails | null = 
        playList.length > 0 && currentIndex >= 0 && currentIndex < playList.length 
            ? playList[currentIndex] 
            : null
            
    const audioUrl = currentSong?.audioUrl
    const currentSongId = currentSong?.id

    // Repeat the current song
    const RepeatSong = useCallback(()=>{
        setIsrepeating(prev => !prev)
    },[])

    // reset initial time when hydration
    const resetInitialTime = useCallback(() => {
        setInitialTime(0);
    }, []);

    // Skip forward song - use functional update to avoid stale closures
    const skipForward = useCallback(()=>{
        if(!canControl) return;

        setCurrentIndex(prev => {
            if(playList.length === 0) return prev
            return (prev + 1) % playList.length
        })
    },[playList.length, canControl])

    // initiate the audio player hook
    const {isPlaying, currentTime, playPause, seekTime, setVolume} = useAudioPlayer(
        {currentSongId, initialTime, audioUrl, onEnded: skipForward, isRepeating, currentSong, onTrackLoaded: resetInitialTime})

    //hydration for fetch last played song if exists
    useEffect(() => {
        const storedState = getPlaybackState();
        
        const RestoreLastPlayedSong = async () => {
        if (storedState?.songId) {
                try {
                    const data = await userApi.SongDetailHydration(storedState.songId);
                    
                    if (data && data.songs) {
                        setPlayList(Array.isArray(data.songs) ? data.songs : [data.songs]);
                        setCurrentIndex(0);
                        setInitialTime(storedState.currentTime); 
                    } else {
                        handleInvalidContent();
                    }
                } catch (error) {
                    handleInvalidContent();
                }
            }
        };

        const handleInvalidContent = () => {
            console.warn("Content blocked or unavailable");
            clearPlayBackState(); // Clear localStorage
            setPlayList([]);      // Empty player
            setCurrentIndex(-1);
        };

        RestoreLastPlayedSong();
    }, []);

    const playPauseGuarded = () => {
        if (!canControl) return;
        playPause();
    };

    const seekTimeGuarded = (time: number) => {
        if (!canControl) return;
        seekTime(time);
    };

    const skipForwardGuarded = () => {
        if (!canControl) return;
        skipForward();
    };

    const skipBackwardGuarded = () => {
        if (!canControl) return;
        skipBackward();
    };


    // setting playlist and play first song
    const setPlaylistAndPlay = useCallback((songs: SongDetails[], index = 0)=>{
        if(isRoomActive) {
            toast.error("you are in a room")
            return ;
        }
        setPlaybackType("GLOBAL")
        setPlayList(songs)
        setCurrentIndex(index)
        setInitialTime(0)
        clearPlayBackState()
    },[isRoomActive])

    const startRoomPlayback = useCallback((song:SongDetails[],index=0)=>{
        console.log("start ")
        setPlaybackType("ROOM")
        setPlayList(song)
        setCurrentIndex(index)
        setInitialTime(0)
        clearPlayBackState()
    },[])

    // add new song to room playlist
    const appendSongToPlaylist = (song:SongDetails)=>{
        console.log("initial", playList)
        setPlayList(prev=>{
            return [...prev,song]
        })
        console.log("playlist update",playList)
    }

    // volume adjustment
    const handleSetVolume = (value: number[])=>{
        const newVolume = value[0]
        setVolumeState(newVolume)
        setVolume(newVolume)
    }

    // skip song backward - use functional update to avoid stale closures
    const skipBackward = useCallback(()=>{
        if(!canControl) return;

        setCurrentIndex(prevIndex => {
            if(playList.length === 0) return prevIndex
            return (prevIndex - 1 + playList.length) % playList.length
        })
    },[playList.length, canControl])

    return(
        <AudioContext.Provider value={{
            currentSong, 
            currentTime, 
            playList, 
            playPause: playPauseGuarded, 
            isPlaying, 
            seekTime: seekTimeGuarded, 
            setVolume: handleSetVolume, 
            volume, 
            skipForward:skipForwardGuarded, 
            skipBackward:skipBackwardGuarded, 
            setPlaylistAndPlay, 
            startRoomPlayback,
            isRepeating, 
            RepeatSong, 
            isRoomActive,
            isHost,
            appendSongToPlaylist
        }}
            >
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