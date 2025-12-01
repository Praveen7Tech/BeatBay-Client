//  {/* Quick Actions */}
//           <Card className="bg-spotify-dark border-spotify-tertiary">
//             <CardHeader>
//               <CardTitle className="text-spotify-text text-base">Quick Actions</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <Button variant="outline" className="w-full justify-start bg-transparent">
//                 Send Message
//               </Button>
//               <Button variant="outline" className="w-full justify-start bg-transparent">
//                 Reset Password
//               </Button>
//               <Button variant="outline" className="w-full justify-start bg-transparent">
//                 View Activity
//               </Button>
//               <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-500 bg-transparent">
//                 Delete Account
//               </Button>
//             </CardContent>
//           </Card>





// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// interface Activity {
//   time: string;
//   action: string;
// }

// interface ActivityCardProps {
//   title?: string;
//   activities: Activity[];
// }

// export default function ActivityCard({ title = "Recent Activity", activities }: ActivityCardProps) {
//   return (
//     <Card className="bg-spotify-dark border-spotify-tertiary">
//       <CardHeader>
//         <CardTitle className="text-spotify-text text-base">{title}</CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-3">
//         {activities.map((item, index) => (
//           <div key={index} className="flex justify-between text-sm text-spotify-secondary">
//             <span>{item.action}</span>
//             <span className="text-xs">{item.time}</span>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// }

function ActivityItem({ time, action }: { time: string; action: string }) {
  return (
    <div className="pb-3 border-b border-spotify-tertiary last:pb-0 last:border-0">
      <p className="text-sm text-spotify-text">{action}</p>
      <p className="text-xs text-spotify-tertiary mt-1">{time}</p>
    </div>
  )
}

//  <Card className="bg-spotify-dark border-spotify-tertiary">
//             <CardHeader>
//               <CardTitle className="text-spotify-text text-base">Quick Info</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <InfoItem label="Account Type" value="Professional" />
//               <InfoItem label="Verification" value="Verified" />
//               <InfoItem label="Content Policy" value="Compliant" />
//               <InfoItem label="Payment Method" value="Active" />
//             </CardContent>
//           </Card>

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center pb-3 border-b border-spotify-tertiary last:pb-0 last:border-0">
      <p className="text-sm text-spotify-secondary">{label}</p>
      <p className="text-sm font-medium text-spotify-text">{value}</p>
    </div>
  )
}

//  <AdminStatsCard
//             title="Avg. Daily Users"
//             value="12.4K"
//             change="+6.8%"
//             changeType="positive"
//             icon={Users}
//             subtitle="Last 30 days"
//           />
//           <AdminStatsCard
//             title="Revenue"
//             value="$94.2K"
//             change="+22.3%"
//             changeType="positive"
//             icon={TrendingUp}
//             subtitle="This month"
//           />