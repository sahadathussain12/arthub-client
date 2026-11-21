"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PIE_COLORS = ["#9333EA", "#EC4899", "#06B6D4", "#10B981", "#F59E0B"];

export default function AdminCharts({ charts }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sales Area Chart */}
      <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl">
        <h2 className="text-lg font-bold mb-4">Sales Trend Overview</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={charts.salesData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333EA" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#9333EA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "#100D20", borderColor: "#9333EA" }} />
              <Area type="monotone" dataKey="amount" stroke="#A855F7" fill="url(#salesGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Pie Chart */}
      <div className="rounded-2xl border border-purple-500/20 bg-[#100D20] p-6 shadow-xl">
        <h2 className="text-lg font-bold mb-4">Artworks by Category</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={charts.categoryData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                dataKey="value"
              >
                {charts.categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#100D20", borderColor: "#9333EA" }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}