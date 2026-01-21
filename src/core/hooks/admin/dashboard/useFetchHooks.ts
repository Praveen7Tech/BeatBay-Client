import { adminApi } from "@/features/admin/services/adminApi"
import { useQuery } from "@tanstack/react-query"

export const useDashBoardDemographics = (entity:string, range:string)=>{
    return useQuery({
        queryKey: ["demographics", entity, range],
        queryFn: () => adminApi.demogarphics(entity, range),
        staleTime: 1000 * 60 * 5,
        placeholderData: (previousData) => previousData
    })
}