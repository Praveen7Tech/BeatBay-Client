"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { adminApi } from "../../services/adminApi"
import { useDebouncing } from "@/core/hooks/admin/useDebouncing"
import { SearchBar } from "../../components/common/SearchBar"
import { Pagination } from "../../components/common/Pagination"
import { UserTable } from "../../components/user/userTable"
import { SpinnerCustom } from "@/components/ui/spinner"

export function UserListing() {
  const [search, setSearchValue] = useState("")
  const [page, setPage] = useState(1)
  const limit = 5

  const searchValue = useDebouncing(search, 500)

  const {data: usersData, isLoading, isError, error} = useQuery({
    queryKey:["allUsers", page, searchValue],
    queryFn: ()=> adminApi.fetchUser(page, limit, searchValue)
  })

  if(isError) return <div>{error.message}</div>

  const {users, totalPages} = usersData ?? {}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-spotify-text mb-1">Users</h1>
          <p className="text-spotify-secondary">Manage platform users and their accounts</p>
        </div>
      </div>
      {isLoading && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40">
              <SpinnerCustom/>
            </div>
      )}

      {/* Search Bar*/}
      <SearchBar value={search} onChange={setSearchValue}/>

      {/* Users Table */}
      <UserTable users={users!}/>

      {/* Pagination */}
        <Pagination page={page} totalPages={totalPages!} setPage={setPage}/>
    </div>
  )
}
