import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";

interface RoomGuardProps {
  children: React.ReactNode;
}

export const RoomGuard = ({  children }: RoomGuardProps) => {
    const room = useSelector((state:RootState)=> state.privateRoom)
    const isBlocked = room.isActive
    
    if (!isBlocked) return <>{children}</>;

    return (
        <Tooltip>
        <TooltipTrigger asChild>
            <div className="inline-block opacity-50 cursor-not-allowed">
            {children}
            </div>
        </TooltipTrigger>
        <TooltipContent side="top">
            <p>You can't access this song right now!</p>
        </TooltipContent>
        </Tooltip>
    );
};
