
interface PlaybackState{
    songId: string
    currentTime: number
}

const STORAGE_KEY = 'last_played_state'

export const getPlaybackState = (): PlaybackState | null => {
    try {
        const state = localStorage.getItem(STORAGE_KEY);
        return state ? JSON.parse(state) : null;
    } catch (error) {
        console.error("Could not retrieve playback state from localStorage:", error);
        return null;
    }
};

export const savePlayBackState = (state: PlaybackState) =>{
    try {
        localStorage.setItem(STORAGE_KEY,JSON.stringify(state))
    } catch (error) {
        console.error("error in playback state save", error)
    }
} 

export const clearPlayBackState = () =>{
    localStorage.removeItem(STORAGE_KEY)
}