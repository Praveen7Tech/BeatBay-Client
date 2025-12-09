import { savePlayBackState } from "@/core/service/playerStorageService"
import { useCallback, useEffect, useRef, useState } from "react"

interface AudioPlayerProps {
    currentSongId: string | undefined, 
    audioUrl: string | undefined,
    onEnded?: () => void,
    initialTime?: number 
    isRepeating: boolean
}

export const useAudioPlayer = ({ currentSongId, initialTime = 0, audioUrl, onEnded, isRepeating }: AudioPlayerProps) =>{
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    
    // Store isRepeating in a ref to avoid re-triggering the effect when it changes
    const isRepeatingRef = useRef(isRepeating)
    useEffect(() => {
        isRepeatingRef.current = isRepeating
    }, [isRepeating])

    // initial audio element creation when component mount
    useEffect(()=>{
        audioRef.current = new Audio()
        const audio = audioRef.current

        const handleTimeUpdate = ()=> {
            const time = audio.currentTime
            setCurrentTime(time)

            if(currentSongId && Math.floor(time) % 5 === 0){
                savePlayBackState({
                    songId: currentSongId,
                    currentTime: time
                })
            }
        }
        const handleEnded = ()=> {

            if(isRepeatingRef.current && audioRef.current){
                audioRef.current.currentTime = 0
                audioRef.current.play()
            }else{
                setIsPlaying(false)
                // use the skipForwad callback fn to automatically play next song if ended
                if(onEnded){
                    onEnded()
                }
            }
            
        }
        audio.addEventListener("timeupdate", handleTimeUpdate)
        audio.addEventListener("ended", handleEnded)      

        // cleanup the event listners when component unmount
        return ()=>{
            audio.removeEventListener("timeupdate", handleTimeUpdate)
            audio.removeEventListener('ended', handleEnded)
            audio.pause()
            audioRef.current = null
        }
    },[onEnded, currentSongId])


    // handle the new song change 
    useEffect(()=>{
        if(audioRef.current && audioUrl && !audioUrl.includes("undefined")){
            const audio = audioRef.current
            // check the new url defferent from the current song then update
            if(audio.src !== audioUrl){
                audio.src = audioUrl

                const handleMetaDataLoad = () =>{
                    if(initialTime > 0 && audioRef.current){
                        audioRef.current.currentTime = initialTime
                    }

                    // play song after add the current time after initial hydration
                    audio.play()
                        .then(()=> setIsPlaying(true))
                        .catch(err => console.error("Auto play failed", err))

                    audio.removeEventListener("loadedmetadata", handleMetaDataLoad)        
                }
                // adding the event listener when the browser loads the song data
                audio.addEventListener("loadedmetadata", handleMetaDataLoad)
                
            }else if(isPlaying){
                // song url not changed but play again (change from pause action)
                audio.play()
            }
        }
    },[audioUrl, isPlaying, initialTime])


    // manage play and pause action
    const playPause = useCallback(()=>{
        if(audioRef.current){
            if(isPlaying){
                audioRef.current.pause()
            }else{
                // check the source file exist before playing
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


    // RealTime volume level
    const setVolume = useCallback((volumePercentage: number)=>{
        if(audioRef.current){
            audioRef.current.volume = volumePercentage / 100
        }
    },[])

    return {isPlaying, currentTime,playPause, seekTime, setVolume, audioRef: audioRef.current}
}