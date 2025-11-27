import { useEffect, useState } from "react"

export const useDebouncing =(value: string, delay: number)=>{
    const [deBounceValue, setDebounceValue] = useState(value)

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebounceValue(value)
        },delay)

        return ()=> clearTimeout(handler)
    },[value, delay])

    return deBounceValue;
}