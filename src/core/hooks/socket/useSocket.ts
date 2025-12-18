import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { socket } from "@/core/config/socket";

export const useSocket = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (!user?.id) {
        socket.disconnect();
        return;
        }

        socket.connect();
        socket.emit("register", user.id);

        return () => {
        socket.disconnect(); 
        };
    }, [user?.id]);
};
