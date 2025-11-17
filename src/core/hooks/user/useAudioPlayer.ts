import { useEffect, useRef, useState } from "react"

export const useAudioPlayer = (audioUrl: string) =>{

    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsplaying] = useState(false)
    const [currentTime, setCurrentTime] =  useState(0)

    useEffect(()=>{
        if(!audioRef.current){
            audioRef.current = new Audio(audioUrl)
            audioRef.current.addEventListener("timeupdate", ()=>{
                setCurrentTime(audioRef.current!.currentTime)
            });
            audioRef.current.addEventListener("ended", ()=> setIsplaying(false))
        }
    },[audioUrl])

    const playPause= () =>{
        if(audioRef.current){
            if(isPlaying){
                audioRef.current.pause()
            }else{
                audioRef.current.play()
            }
            setIsplaying(!isPlaying)
        }
    }

    return {isPlaying, currentTime, playPause, audioRef: audioRef.current}
}