import { RootState } from "@/core/store/store"
import { artistApi } from "@/features/artist/services/artist.api"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useSelector } from "react-redux"

export const useFansListing = () =>{

    const [page, setPage] = useState(1)
    const limit = 10
    const artistId = useSelector((state:RootState)=> state.auth.user?.id)
    
    const {data, isLoading} = useQuery({
        queryKey: ["fans-listing", artistId, page],
        queryFn: ()=> artistApi.getAllFans(page,limit),
        enabled: !!artistId,
        placeholderData: (previusData)=> previusData
    })

    const fans = data?.fans
    const totalPages = data?.totalPages
    const totalCount = data?.totalCount

    return {
        fans,
        totalCount,
        totalPages,
        isLoading,
        setPage,
        page
    }
}