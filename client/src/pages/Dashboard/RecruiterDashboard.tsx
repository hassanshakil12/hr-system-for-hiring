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
import {
  Users,
  ClipboardList,
  UserCheck,
  Briefcase,
  CalendarCheck,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

// Chart Colors
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

// Weekly Interview Schedule
const weeklyInterviews = [
  { day: "Mon", interviews: 2 },
  { day: "Tue", interviews: 5 },
  { day: "Wed", interviews: 4 },
  { day: "Thu", interviews: 6 },
  { day: "Fri", interviews: 7 },
  { day: "Sat", interviews: 1 },
  { day: "Sun", interviews: 0 },
];

// Candidate Status Breakdown
const candidateStatus = [
  { name: "Shortlisted", value: 60 },
  { name: "Interviewed", value: 40 },
  { name: "Hired", value: 25 },
  { name: "Rejected", value: 35 },
];

export default function RecruiterDashboardHome() {
  return (
    <>
      <PageMeta
        title="Recruiter Dashboard"
        description="Monitor candidate pipelines and interviews"
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Top Metrics */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-100">
            <CardContent className="flex items-center gap-4 py-4">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Jobs Assigned</p>
                <h2 className="text-xl font-bold text-blue-900">12</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-100">
            <CardContent className="flex items-center gap-4 py-4">
              <ClipboardList className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Candidates Reviewed</p>
                <h2 className="text-xl font-bold text-green-900">320</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-100">
            <CardContent className="flex items-center gap-4 py-4">
              <UserCheck className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Hires Finalized</p>
                <h2 className="text-xl font-bold text-yellow-900">18</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-100">
            <CardContent className="flex items-center gap-4 py-4">
              <CalendarCheck className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Upcoming Interviews</p>
                <h2 className="text-xl font-bold text-purple-900">9</h2>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart: Weekly Interviews */}
        <div className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Interviews Scheduled This Week
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyInterviews}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="interviews" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Pie Chart: Candidate Status */}
        <div className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Candidate Pipeline Status
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={candidateStatus}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {candidateStatus.map((entry, index) => (
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

        {/* Recent Candidates Reviewed */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Recently Reviewed Candidates
              </h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Hamza Ali – Frontend Developer – Interview Scheduled</li>
                <li>Fatima Khan – Backend Developer – Shortlisted</li>
                <li>Omar Riaz – UI/UX Designer – Rejected</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Top Jobs by Applications */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Jobs with Most Applications
              </h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Software Engineer – 110 applications</li>
                <li>Product Manager – 90 applications</li>
                <li>Data Analyst – 85 applications</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
