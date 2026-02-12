import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../services/userApi";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";

export const useFriendsActivity = () =>{

    const user = useSelector((state: RootState) => state.auth.user);

    const {data: friends, isLoading, isError,error,} = useQuery({
        queryKey: ["friendsActivity"],
        queryFn: userApi.getFriends,
        enabled: !!user?.id,
    });

    return{
        friends,
        isLoading,
        isError,
        error
    }
}