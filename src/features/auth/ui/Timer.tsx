import React, { useEffect, useState } from "react"

interface TimerProps {
    initialTime ?: number,
    onExpire ?: ()=> void
} 

export const Timer: React.FC<TimerProps> =({initialTime = 60,onExpire}) =>{

    const [seconds, setSeconds] = useState(initialTime)

    useEffect(()=>{
        setSeconds(initialTime)
    },[ initialTime])

    useEffect(()=>{
        if(seconds <= 0){
            onExpire?.()
            return
        }

        const interval = setInterval(() => {
            setSeconds((prev)=> prev - 1)
        }, (1000));

        return ()=> clearInterval(interval)
    },[seconds,onExpire])

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec < 10 ? `0${sec}` : sec}`;
    };

    return (
        <div>
            <span className="text-md text-shadow-black"> {formatTime(seconds)}</span>
        </div>
    )
}