// import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
// import PageMeta from "../../components/common/PageMeta";
// import BookedRankingTable from "../../components/BookedRankingTable";
// import ShippedRankingTable from "../../components/ShippedRankingTable";

// export default function Home() {
//   return (
//     <>
//       <PageMeta
//         title="All Mobile Phlebotomy Services Dashboard"
//         description="This is a All Mobile Phlebotomy Services Dashboard"
//       />
//       <div className="grid grid-cols-12 gap-4 md:gap-6">
//         <div className="col-span-12 xl:col-span-12">
//           <EcommerceMetrics />
//           <div className="my-2">
//             <BookedRankingTable />
//           </div>
//           <ShippedRankingTable />
//         </div>
//       </div>
//     </>
//   );
// }

import PageMeta from "../../components/common/PageMeta";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Briefcase, FileText, UserCheck, Users2 } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

const COLORS = ["#3b82f6", "#10b981", "#f97316", "#ef4444"];

const weeklyJobActivity = [
  { day: "Mon", applications: 10, views: 50 },
  { day: "Tue", applications: 20, views: 70 },
  { day: "Wed", applications: 18, views: 65 },
  { day: "Thu", applications: 25, views: 80 },
  { day: "Fri", applications: 35, views: 90 },
  { day: "Sat", applications: 12, views: 40 },
  { day: "Sun", applications: 8, views: 30 },
];

const hiringStatus = [
  { name: "Shortlisted", value: 50 },
  { name: "Interviewed", value: 30 },
  { name: "Hired", value: 15 },
  { name: "Rejected", value: 25 },
];

export default function OrgDashboardHome() {
  return (
    <>
      <PageMeta
        title="Organization Hiring Dashboard"
        description="Overview of job postings and candidate applications"
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Top Metrics */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-100">
            <CardContent className="flex items-center gap-4 py-4">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Jobs Posted</p>
                <h2 className="text-xl font-bold text-blue-900">42</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-100">
            <CardContent className="flex items-center gap-4 py-4">
              <FileText className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <h2 className="text-xl font-bold text-green-900">980</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-100">
            <CardContent className="flex items-center gap-4 py-4">
              <UserCheck className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Hires This Month</p>
                <h2 className="text-xl font-bold text-orange-900">21</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-100">
            <CardContent className="flex items-center gap-4 py-4">
              <Users2 className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Active Job Seekers</p>
                <h2 className="text-xl font-bold text-purple-900">320</h2>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart: Weekly Activity */}
        <div className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Weekly Applications & Views
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyJobActivity}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="applications"
                    fill="#3b82f6"
                    name="Applications"
                  />
                  <Bar dataKey="views" fill="#10b981" name="Views" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Pie Chart: Hiring Funnel */}
        <div className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Candidate Hiring Funnel
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={hiringStatus}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {hiringStatus.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Jobs */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Top Performing Job Posts
              </h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Senior Backend Developer — 220 applications</li>
                <li>React.js Frontend Engineer — 175 applications</li>
                <li>HR Officer — 150 applications</li>
                <li>Business Analyst — 140 applications</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applicants */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Recent Applicants
              </h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Ali Khan applied for Frontend Engineer</li>
                <li>Sara Ahmed applied for UI/UX Designer</li>
                <li>John Doe applied for HR Officer</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
