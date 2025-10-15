import React, { useEffect, useState } from "react"

interface TimerProps {
    initialTime ?: number,
    onExpire ?: ()=> void,
    reset ?: any
} 

export const Timer: React.FC<TimerProps> =({initialTime = 60,onExpire,reset}) =>{

    const [seconds, setSeconds] = useState(initialTime)

    useEffect(()=>{
        setSeconds(initialTime)
    },[reset, initialTime])

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
            <span className="text-sm text-red-600"> {formatTime(seconds)}</span>
        </div>
    )
}