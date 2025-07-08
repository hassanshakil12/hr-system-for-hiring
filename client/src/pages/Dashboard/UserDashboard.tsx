// import PageMeta from "../../components/common/PageMeta";
// import ScheduledAppointments from "../../components/ScheduledAppointments";
// import EcommerceMetrics2 from "../../components/ecommerce/EcommerceMetrics2";

// export default function Home() {
//   return (
//     <>
//       <PageMeta
//         title="All Mobile Phlebotomy Services Dashboard"
//         description="This is a All Mobile Phlebotomy Services Dashboard"
//       />
//       <div className="grid grid-cols-12 gap-4 md:gap-6">
//         <div className="col-span-12 xl:col-span-12">
//           <EcommerceMetrics2 />
//           <div className="my-2">
//             <ScheduledAppointments />
//           </div>
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
import { Users, Briefcase, FileText, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

const COLORS = ["#3b82f6", "#10b981", "#f97316", "#ef4444"];

const weeklyApplications = [
  { day: "Mon", applications: 20 },
  { day: "Tue", applications: 40 },
  { day: "Wed", applications: 35 },
  { day: "Thu", applications: 50 },
  { day: "Fri", applications: 70 },
  { day: "Sat", applications: 30 },
  { day: "Sun", applications: 10 },
];

const statusDistribution = [
  { name: "Pending", value: 120 },
  { name: "Reviewed", value: 90 },
  { name: "Interviewed", value: 60 },
  { name: "Hired", value: 30 },
];

export default function HRDashboardHome() {
  return (
    <>
      <PageMeta
        title="HR Recruitment Dashboard"
        description="Track jobs, applications, and hiring status"
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Metrics */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-blue-100">
            <CardContent className="flex items-center gap-4 py-4">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Jobs Posted</p>
                <h2 className="text-xl font-bold text-blue-900">150</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-100">
            <CardContent className="flex items-center gap-4 py-4">
              <FileText className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Applications Received</p>
                <h2 className="text-xl font-bold text-green-900">1,340</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-100">
            <CardContent className="flex items-center gap-4 py-4">
              <CheckCircle2 className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Candidates Hired</p>
                <h2 className="text-xl font-bold text-purple-900">85</h2>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart */}
        <div className="col-span-12 lg:col-span-7">
          <Card className="h-full">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Weekly Applications Overview
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyApplications}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Pie Chart */}
        <div className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Application Status Breakdown
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {statusDistribution.map((entry, index) => (
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

        {/* Latest Jobs */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Latest Job Postings
              </h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Frontend Developer - Google</li>
                <li>Backend Engineer - Microsoft</li>
                <li>UI/UX Designer - Airbnb</li>
                <li>Data Analyst - Meta</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Top Recruiters */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Top Recruiters This Week
              </h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Ali Raza - 25 hires</li>
                <li>Sara Malik - 18 hires</li>
                <li>John Doe - 15 hires</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
