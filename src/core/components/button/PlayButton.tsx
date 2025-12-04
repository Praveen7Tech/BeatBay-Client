import { Play } from "lucide-react"

export const PlayButton = () =>{
    return(
        <div>
            <button
            className="absolute bottom-2 right-2 w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:scale-105 hover:bg-spotify-green"
            onClick={(e) => e.preventDefault()}
            >
            <Play className="w-5 h-5 text-black fill-black ml-0.5" />
            </button>
        </div>
    )
}