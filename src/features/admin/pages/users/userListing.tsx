"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/core/components/input/Input" 
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Search, Download } from "lucide-react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { adminApi } from "../../services/adminApi"
import { useDebouncing } from "@/core/hooks/admin/useDebouncing"

export function UserListing() {
  const [search, setSearchValue] = useState("")
  const [page, setPage] = useState(1)
  const limit = 2

  const searchValue = useDebouncing(search, 500)

  const {data: usersData, isLoading, isError, error} = useQuery({
    queryKey:["allUsers", page, searchValue],
    queryFn: ()=> adminApi.fetchUser(page, limit, searchValue)
  })

  if(isLoading){
    return <div>Loading</div>
  }
  if(isError) return <div>{error.message}</div>

  const {users, totalPages} = usersData ?? {}

  const URL_BASE = import.meta.env.VITE_API_URL;


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-spotify-text mb-1">Users</h1>
          <p className="text-spotify-secondary">Manage platform users and their accounts</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-spotify-dark border-spotify-tertiary">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-spotify-tertiary" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e:any) => setSearchValue(e.target.value)}
              className="pl-10 bg-spotify-black border-spotify-tertiary text-spotify-text placeholder:text-spotify-tertiary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-spotify-dark border-spotify-tertiary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-spotify-tertiary">
                <th className="px-6 py-4 text-left text-sm font-semibold text-spotify-secondary">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-spotify-secondary">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-spotify-secondary">Join Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-spotify-secondary">Followers</th>
                {/* <th className="px-6 py-4 text-left text-sm font-semibold text-spotify-secondary">Playlists</th> */}
                <th className="px-6 py-4 text-left text-sm font-semibold text-spotify-secondary">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-spotify-secondary">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-spotify-tertiary hover:bg-spotify-black/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                     {user.profilePicture ? (
                        <img
                            src={`${URL_BASE}/uploads/${user.profilePicture}`}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover"
                            onError={(e) => { e.currentTarget.src = "/placeholder.svg" }}
                        />
                        ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        )}
                      <span className="text-sm font-medium text-spotify-text">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-spotify-secondary">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-spotify-secondary">{user.joinDate}</td>
                  <td className="px-6 py-4 text-sm text-spotify-text font-medium">{user.followersCount}</td>
                  {/* <td className="px-6 py-4 text-sm text-spotify-text font-medium">{user.playlists}</td> */}
                  <td className="px-6 py-4">
                    <Badge
                      variant={user.status === true ? "default" : "destructive"}
                      className={user.status === true ? "bg-spotify-green text-spotify-black" : ""}
                    >
                      {user.status === true ? "Active" : "Blocked"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/users/${user.id}`}>
                      <Button variant="ghost" size="sm" className="text-spotify-green hover:text-spotify-green">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-spotify-secondary">
          page <span className="font-semibold">{page}</span> of{" "}
          <span className="font-semibold">{totalPages}</span> total
        </p>
        <div className="flex gap-2">
          <Button variant="outline" 
            onClick={()=> setPage((prev)=> prev-1)}
            disabled={page == 1}>
            Previous
          </Button>
          <Button variant="outline" disabled={page === totalPages}
            onClick={()=> setPage((prev)=> prev+1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
