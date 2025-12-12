import { RootState } from "@/core/store/store";
import { clearSearchQuery, setSearchQuery } from "@/features/user/slice/searchSlice";
import { Search, Home, LayoutGrid, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SearchBarProps {
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ placeholder = "What do you want to play?" }: SearchBarProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // get current query from redux
  const currentQury = useSelector((state: RootState)=> state.search.query)

  const [inputQuery, setInputQury] = useState(currentQury)

  useEffect(()=>{
    setInputQury(currentQury)
  },[currentQury])

  const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value
    setInputQury(value)

    dispatch(setSearchQuery(value))

    if(location.pathname !== '/search'){
      navigate("/search")
    }
  }

  const HandleClearQury = () =>{
    dispatch(clearSearchQuery())
    setInputQury("")
  }
  
  return (
    <div className="flex items-center gap-2">
      {/* Home Button */}
      <Link
        to="/home"
        className="w-12 h-12 rounded-full bg-[#282828] hover:bg-[#3e3e3e] flex items-center justify-center transition-colors"
      >
        <Home className="w-6 h-6 text-white" fill="white" />
      </Link>

      {/* Search Input Container */}
      <div className="relative flex items-center">
        <div className="flex items-center bg-[#282828] hover:bg-[#3e3e3e] rounded-full px-4 py-3 w-[400px] transition-colors">
            <Search className="w-5 h-5 text-muted-foreground mr-3" />
            <div className="relative flex-1">
            <input
                type="text"
                value={inputQuery}
                onChange={HandleInputChange}
                placeholder={placeholder}
                className="bg-transparent w-full text-white placeholder:text-muted-foreground outline-none text-sm pr-6"
            />
            {inputQuery && (
                <button
                onClick={HandleClearQury}
                className="absolute right-0 top-1/2 -translate-y-1/2"
                >
                <X className="h-6 w-6 text-gray-400 hover:text-white" />
                </button>
            )}
            </div>
            <div className="w-px h-6 bg-[#727272] mx-3" />
            <LayoutGrid className="w-5 h-5 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
        </div>
        </div>
    </div>
  );
};
