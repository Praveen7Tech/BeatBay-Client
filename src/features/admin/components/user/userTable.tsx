import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { AdminFetchUsersResponse } from "../../services/adminApi"

interface UserTableProps{
    users: AdminFetchUsersResponse[]
}

export function UserTable({users}: UserTableProps){
    const URL_BASE = import.meta.env.VITE_API_URL;
    return(
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
    )
}