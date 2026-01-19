import { socket } from "@/core/config/socket"
import { savePlayBackState } from "@/core/service/playerStorageService"
import { RootState } from "@/core/store/store"
import { SongDetails } from "@/features/user/services/response.type"
import { setRoomSongQueueData, SongData } from "@/features/user/slice/privateRoomSlice"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

interface AudioPlayerProps {
    currentSongId: string | undefined, 
    audioUrl: string | undefined,
    currentSong: SongDetails| null
    onEnded?: () => void,
    initialTime?: number 
    isRepeating: boolean
    onTrackLoaded?: () => void;
}

export const useAudioPlayer = ({ currentSongId, initialTime = 0, audioUrl, onEnded, isRepeating, onTrackLoaded }: AudioPlayerProps) =>{
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)

    const room = useSelector((state: RootState)=> state.privateRoom)
    const user = useSelector((state: RootState)=> state.auth.user)
    const dispatch = useDispatch()
    const isHost = room.hostId === user?.id 
    
    // Store isRepeating in a ref to avoid re-triggering the effect when it changes
    const isRepeatingRef = useRef(isRepeating)
    useEffect(() => {
        isRepeatingRef.current = isRepeating
    }, [isRepeating])

    // initail song updation and action s managing
    // useEffect(() => {
    //     // When the host switches the song (audioUrl changes), broadcast immediately
    //     if (isHost && audioUrl && room.roomId && currentSong) {
    //         broadcastSync(true, 0); // Start at 0 seconds, isPlaying: true
    //     }
    // }, [audioUrl, isHost, room.roomId]); 

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
                        .then(() => {
                            setIsPlaying(true);
                            // reset time state in the provider
                        })
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
    },[audioUrl, isPlaying, initialTime, onTrackLoaded])

    // manage song sync in private room
    useEffect(() => {
        if (!socket) return;

        socket.on("receive_player_sync", (data: SongData) => {
            if (audioRef.current) {
                
                dispatch(setRoomSongQueueData(data));

                if (audioRef.current.src !== data.audioUrl) {
                    audioRef.current.src = data.audioUrl;
                    audioRef.current.load(); // Reload the new track
                }
                // Latency Compensation
                const latency = (Date.now() - data.updatedAt) / 1000;
                const adjustedTime = data.timestamp + latency;

                // Sync Time if drift > 2s
                if (Math.abs(audioRef.current.currentTime - adjustedTime) > 2) {
                    audioRef.current.currentTime = adjustedTime;
                }

                // Sync Play/Pause
                if (data.isPlaying && audioRef.current.paused) {
                    audioRef.current.play().then(() => setIsPlaying(true));
                } else if (!data.isPlaying && !audioRef.current.paused) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                }
            }
        });

        return () => { socket.off("receive_player_sync"); };
    }, [socket, isHost]);

    // broadcast event when host action change
    // const broadcastSync = (playing: boolean, time: number) => {
    //     if (isHost && room.roomId && currentSong) {
    //         console.log("here we gooooooo-",room.roomId)
    //         const syncPayload: any = {
    //             id: currentSong._id,
    //             title: currentSong.title,
    //             image: currentSong.coverImageUrl,
    //             audioUrl: currentSong.audioUrl,
    //             artist: currentSong.artistId.name,
    //             isPlaying: playing,
    //             timestamp: time,
    //             updatedAt: Date.now()
    //         };
    //         socket.emit("player_sync", { roomId: room.roomId, songData: syncPayload });
    //     }
    // };


    // manage play and pause action
   const playPause = useCallback(() => {
    console.log("pause start")
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            console.log("pause start 1")
        } else {
            if (audioRef.current.src && !audioRef.current.src.includes("undefined")) {
                audioRef.current.play();
                console.log("pause start 2")
            }
            console.log("pause start 3")
        }

        setIsPlaying(prev => !prev);
        console.log("pause start 4")
    }, [isPlaying]);



    // Realtime current time updation
    const seekTime = useCallback((time: number)=>{
        if(audioRef.current){
            audioRef.current.currentTime = time

            //broadcast
            //broadcastSync(isPlaying, time);
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