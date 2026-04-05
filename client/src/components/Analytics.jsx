import { 
  PieChart, Pie, Cell, Tooltip, Legend, 
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer 
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, PieChart as PieChartIcon, BarChart2 } from "lucide-react";
import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL;

// Define specific color palettes for segregation
const STATUS_COLORS = {
  "Open": "#94a3b8",        // slate-400
  "In Progress": "#3b82f6", // blue-500
  "Fixed": "#22c55e",       // green-500
};

const PRIORITY_COLORS = {
  "High": "#ef4444",   // red-500
  "Medium": "#f59e0b", // amber-500
  "Low": "#10b981",    // emerald-500
};

export default function Analytics() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${URL}/api/bugs/analytics`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics", err);
        setError("Failed to load analytics data.");
      }
    };

    fetchAnalytics();

      const socket = io(URL);

  socket.on("bugCreated", fetchAnalytics);
  socket.on("bugUpdated", fetchAnalytics);
  socket.on("bugDeleted", fetchAnalytics);

  return () => socket.disconnect();
  }, []);

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center text-red-500 font-medium">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p>Crunching the numbers...</p>
      </div>
    );
  }

  // Map backend data to chart format
  const statusData = [
    { name: "Open", value: data.statusCount.open || 0 },
    { name: "In Progress", value: data.statusCount.inProgress || 0 },
    { name: "Fixed", value: data.statusCount.fixed || 0 },
  ];

  const priorityData = [
    { name: "High", value: data.priorityCount.high || 0 },
    { name: "Medium", value: data.priorityCount.medium || 0 },
    { name: "Low", value: data.priorityCount.low || 0 },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans p-6 md:p-10">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Project Analytics
        </h1>
        <p className="text-slate-500 mt-2">Visualizing bug lifecycle and severity distribution.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Status Distribution Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-[450px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <PieChartIcon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-700">Status Distribution</h2>
          </div>
          
          <div className="flex-1 w-full h-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={statusData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={80} 
                  outerRadius={120} 
                  paddingAngle={5}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Distribution Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-[450px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-700">Priority Breakdown</h2>
          </div>

          <div className="flex-1 w-full h-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} allowDecimals={false} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[entry.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}