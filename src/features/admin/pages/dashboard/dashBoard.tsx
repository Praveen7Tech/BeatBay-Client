import { Users,UserStar, Music, Album,  } from "lucide-react";
import { AdminStatsCard } from "../../components/dashboard/admin.statusCard"; 
import { AdminGrowthChart } from "../../components/dashboard/admin.growthChart"; 
import { useDasboard } from "@/core/hooks/admin/useDashBoard";

export default function AdminDashboard() {
  const {loading, totalUser, totalArtist, totalSongs, totalAlbums} = useDasboard()
  if (loading) {
    return <div className="min-h-screen bg-background p-8">Loading Dashboard...</div>;
  }
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-border pb-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatsCard
            title="Total Users"
            value={totalUser}
            change="+12.5%"
            changeType="positive"
            icon={Users}
            subtitle="Active this month"
            link="users"
          />
          <AdminStatsCard
            title="Total Artists"
            value={totalArtist}
            change="+12.5%"
            changeType="positive"
            icon={UserStar}
            subtitle="Active this month"
            link="artists"
          />
          <AdminStatsCard
            title="Total Songs"
            value={totalSongs}
            change="+8.3%"
            changeType="positive"
            icon={Music}
            subtitle="Uploaded tracks"
          />
          <AdminStatsCard
            title="Albums"
            value={totalAlbums}
            change="+5.7%"
            changeType="positive"
            icon={Album}
            subtitle="Published albums"
          />
          {/* <AdminStatsCard
            title="Playlists"
            value="8,291"
            change="+15.2%"
            changeType="positive"
            icon={List}
            subtitle="User created"
          />
          <AdminStatsCard
            title="Total Streams"
            value="128M"
            change="+18.4%"
            changeType="positive"
            icon={TrendingUp}
            subtitle="This month"
          />
          <AdminStatsCard
            title="Active Artists"
            value="2,156"
            change="+9.1%"
            changeType="positive"
            icon={Activity}
            subtitle="Content creators"
          /> */}
         
        </div>

        {/* Growth Chart */}
        <AdminGrowthChart />

        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <AdminActivityTable />
          <TopPerformersTable /> */}
        </div>
      </div>
    </div>
  );
}
