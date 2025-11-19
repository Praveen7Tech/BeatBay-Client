
import { useCallback, useEffect, useRef, useState } from "react"


export const useAudioPlayer = (audioUrl: string, onEnded?: ()=> void) =>{
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)

    // initial audio element creation when component mount
    useEffect(()=>{
        audioRef.current = new Audio()
        const audio = audioRef.current

        const handleTimeUpdat = ()=> setCurrentTime(audio.currentTime)
        const handleEnded = ()=> {
            setIsPlaying(false)
            // use the skipForwad callback fn to automatically play next song if ended
            if(onEnded){
                onEnded()
            }
        }
        audio.addEventListener("timeupdate", handleTimeUpdat)
        audio.addEventListener("ended", handleEnded)      

        // cleanup the event listners when component unmount
        return ()=>{
            audio.removeEventListener("timeupdate", handleTimeUpdat)
            audio.removeEventListener('ended', handleEnded)
            audio.pause()
            audioRef.current = null
        }
    },[onEnded])


    // handle the new song change 
    useEffect(()=>{
        if(audioRef.current && audioUrl && !audioUrl.includes("undefined")){
            // check the new url defferent from the current song then update
            if(audioRef.current.src !== audioUrl){
                audioRef.current.src = audioUrl
                audioRef.current.play()                // play the music after the new url set
                .then(()=> setIsPlaying(true))
                .catch(err => console.error("Auto play failed", err))
            }else if(isPlaying){
                // song url not changed but play again (chnage from pause action)
                audioRef.current.play()
            }
        }
    },[audioUrl, isPlaying])


    // manage play and pause action
    const playPause = useCallback(()=>{
        if(audioRef.current){
            if(isPlaying){
                audioRef.current.pause()
            }else{
                // check the sorce file exist before playing
                if(audioRef.current.src && !audioRef.current.src.includes("undefined")){
                    audioRef.current.play()
                }
            }
            setIsPlaying(!isPlaying)
        }
    },[isPlaying])


    // Realtime current time updation
    const seekTime = useCallback((time: number)=>{
        if(audioRef.current){
            audioRef.current.currentTime = time
        }
    },[])


    // RealTime volume  level
    const setVolume = useCallback((volumePercentage: number)=>{
        if(audioRef.current){
            audioRef.current.volume = volumePercentage / 100
        }
    },[])

    return {isPlaying, currentTime,playPause, seekTime, setVolume, audioRef: audioRef.current}
}
