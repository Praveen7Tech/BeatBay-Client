import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { adminApi } from "@/features/admin/services/adminApi"

export const useDemographics = ( entity: string,range: string) => {

  const {data, isLoading, isError,error } = useQuery({
    queryKey: ["demographics", entity, range],
    queryFn: () => adminApi.demogarphics(entity, range),
    staleTime: 1000 * 60 * 5,
    placeholderData: prev => prev,
  })

  const chartData = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map(item => ({
      period: item.date,
      total: item.total,
    }));
  }, [data]);

  return {
    chartData,
    isLoading,
    isError,error,
    total:data?.totalDocs
  }
}
