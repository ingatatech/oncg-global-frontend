"use client";

import { useState, useEffect } from "react";
import AdminLayout from "./layout";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ArrowRight,
  Calendar,
  Building2,
  BarChart3,
  RefreshCw,
  Loader2,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  UserCheck,
  Newspaper,
  Inbox,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "@/lib/axios";

interface DashboardStats {
  insights: number;
  publications: number;
  contactMessages: number;
  leaders: number;
  subscribers: number;
  offices: number;
}

interface MonthlyStats {
  month: number;
  monthName: string;
  insights: number;
  publications: number;
  leaders: number;
  subscribers: number;
  contactMessages: number;
  offices: number;
  total: number;
}

interface YearlyStats {
  year: number;
  insights: number;
  publications: number;
  leaders: number;
  subscribers: number;
  contactMessages: number;
  offices: number;
  total: number;
}

interface StatisticsResponse {
  totals: DashboardStats;
  monthly: MonthlyStats[];
  yearly: YearlyStats[];
  currentYear: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    insights: 0,
    publications: 0,
    contactMessages: 0,
    leaders: 0,
    subscribers: 0,
    offices: 0,
  });
  const [yearlyData, setYearlyData] = useState<YearlyStats[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("monthly");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      // Fetch all data in parallel
      const [
        insightsRes,
        publicationsRes,
        leadersRes,
        subscribersRes,
        contactMessagesRes,
        officesRes,
      ] = await Promise.all([
        api.get("/insights"),
        api.get("/publications"),
        api.get("/leaders"),
        api.get("/subscribers"),
        api.get("/contact-messages"),
        api.get("/offices"),
      ]);

      // Fetch statistics data
      const [statisticsRes] = await Promise.all([
        api.get("/users/statistics"),
      ]);

      const statisticsData: StatisticsResponse = statisticsRes.data;

      // Calculate totals
      const totals: DashboardStats = {
        insights:
          insightsRes.data?.insights?.length || insightsRes.data?.length || 0,
        publications:
          publicationsRes.data?.data?.length ||
          publicationsRes.data?.length ||
          0,
        leaders: leadersRes.data?.data?.length || leadersRes.data?.length || 0,
        subscribers:
          subscribersRes.data?.data?.length || subscribersRes.data?.length || 0,
        contactMessages:
          contactMessagesRes.data?.data?.length ||
          contactMessagesRes.data?.length ||
          0,
        offices:
          officesRes.data?.data?.length || officesRes.data?.length || 0,
      };

      setStats(totals);

      setMonthlyData(statisticsData?.monthly || []);
      setYearlyData(statisticsData?.yearly || []);
      setCurrentYear(statisticsData?.currentYear || new Date().getFullYear());
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setStats({
        insights: 0,
        publications: 0,
        contactMessages: 0,
        leaders: 0,
        subscribers: 0,
        offices: 0,
      });
      setMonthlyData([]);
      setYearlyData([]);
    } finally {
      setLoading(false);
    }
  }

  // Calculate growth percentages
  function calculateGrowth(
    current: number,
    previous: number
  ): { percentage: string; trend: "up" | "down" | "neutral" } {
    if (previous === 0) {
      return {
        percentage: current > 0 ? "+100%" : "0%",
        trend: current > 0 ? "up" : "neutral",
      };
    }

    const growth = ((current - previous) / previous) * 100;
    const percentage =
      growth > 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;
    const trend = growth > 0 ? "up" : growth < 0 ? "down" : "neutral";

    return { percentage, trend };
  }

  // Get growth data for stat cards
  function getStatGrowth(key: keyof DashboardStats) {
    if (!monthlyData || monthlyData.length < 2) {
      return { percentage: "0%", trend: "neutral" as const };
    }

    const currentMonth = monthlyData[monthlyData.length - 1];
    const previousMonth = monthlyData[monthlyData.length - 2];

    if (!currentMonth || !previousMonth) {
      return { percentage: "0%", trend: "neutral" as const };
    }

    return calculateGrowth(currentMonth[key] || 0, previousMonth[key] || 0);
  }

  // Prepare chart data based on time range
  const chartData = timeRange === "monthly" ? monthlyData : yearlyData;
  const chartDataKey = timeRange === "monthly" ? "monthName" : "year";

  // Prepare pie chart data
  const pieData = [
    { name: "Insights", value: stats.insights, color: "#3b82f6" },
    { name: "Publications", value: stats.publications, color: "#10b981" },
    { name: "Leaders", value: stats.leaders, color: "#8b5cf6" },
    { name: "Subscribers", value: stats.subscribers, color: "#ef4444" },
    { name: "Offices", value: stats.offices, color: "#06b6d4" },
  ].filter((item) => item.value > 0);

  const statCards = [
    // Content Management Section
    {
      title: "Published Insights",
      value: stats?.insights || 0,
      growth: getStatGrowth("insights"),
      icon: Newspaper,
      gradient: "from-blue-500 via-blue-600 to-indigo-700",
      bgGradient: "from-blue-50/50 via-indigo-50/30 to-purple-50/20",
      glowColor: "shadow-blue-500/20",
      href: "/admin/insights",
      description: "Knowledge articles shared",
      accentColor: "text-blue-600",
      section: "Content Management",
    },
    {
      title: "Publications",
      value: stats?.publications || 0,
      growth: getStatGrowth("publications"),
      icon: FileText,
      gradient: "from-emerald-500 via-green-600 to-teal-700",
      bgGradient: "from-emerald-50/50 via-green-50/30 to-teal-50/20",
      glowColor: "shadow-emerald-500/20",
      href: "/admin/publications",
      description: "Published documents",
      accentColor: "text-emerald-600",
      section: "Content Management",
    },
    {
      title: "Contact Messages",
      value: stats?.contactMessages || 0,
      growth: getStatGrowth("contactMessages"),
      icon: Inbox,
      gradient: "from-purple-500 via-violet-600 to-indigo-700",
      bgGradient: "from-purple-50/50 via-violet-50/30 to-indigo-50/20",
      glowColor: "shadow-purple-500/20",
      href: "/admin/contact-messages",
      description: "Inquiries received",
      accentColor: "text-purple-600",
      section: "Content Management",
    },

    // People & Subscribers Section
    {
      title: "Leaders",
      value: stats?.leaders || 0,
      growth: getStatGrowth("leaders"),
      icon: Users,
      gradient: "from-pink-500 via-rose-600 to-red-700",
      bgGradient: "from-pink-50/50 via-rose-50/30 to-red-50/20",
      glowColor: "shadow-pink-500/20",
      href: "/admin/leaders",
      description: "Leadership profiles",
      accentColor: "text-pink-600",
      section: "People & Subscribers",
    },
    {
      title: "Subscribers",
      value: stats?.subscribers || 0,
      growth: getStatGrowth("subscribers"),
      icon: UserCheck,
      gradient: "from-cyan-500 via-teal-600 to-blue-700",
      bgGradient: "from-cyan-50/50 via-teal-50/30 to-blue-50/20",
      glowColor: "shadow-cyan-500/20",
      href: "/admin/subscribers",
      description: "Active subscribers",
      accentColor: "text-cyan-600",
      section: "People & Subscribers",
    },

    // Offices Section
    {
      title: "Office Locations",
      value: stats?.offices || 0,
      growth: getStatGrowth("offices"),
      icon: Building2,
      gradient: "from-indigo-500 via-purple-600 to-pink-700",
      bgGradient: "from-indigo-50/50 via-purple-50/30 to-pink-50/20",
      glowColor: "shadow-indigo-500/20",
      href: "/admin/offices",
      description: "Office branches",
      accentColor: "text-indigo-600",
      section: "Offices",
    },
  ];

  // Group stat cards by section
  const groupedStatCards = statCards.reduce((acc, card) => {
    const section = card.section;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(card);
    return acc;
  }, {} as Record<string, typeof statCards>);

  return (
    <AdminLayout>
      {/* Header Actions */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="monthly">Monthly View ({currentYear})</option>
            </select>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDashboardData}
            disabled={loading}
            className="border-gray-200 bg-transparent text-sm px-3 py-1"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid - Organized by Sections */}
      {Object.entries(groupedStatCards).map(([sectionName, cards], sectionIndex) => (
        <div key={sectionName} className="mb-8">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
          >
            <div className="h-1 w-8 bg-gradient-to-r from-primary to-blue-600 rounded-full"></div>
            {sectionName}
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (sectionIndex * 0.1) + (index * 0.1) }}
                className="group cursor-pointer"
              >
                <div
                  className={`relative bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-lg hover:shadow-2xl ${stat.glowColor} transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden`}
                >
                  {/* Animated background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent group-hover:from-white/20 transition-all duration-500"></div>

                  {/* Floating orbs */}
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-white/15 to-white/5 rounded-full blur-sm group-hover:scale-125 transition-transform duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                      >
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {stat.growth.trend === "up" && (
                          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            <TrendingUp className="h-3 w-3" />
                            {stat.growth.percentage}
                          </div>
                        )}
                        {stat.growth.trend === "down" && (
                          <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                            <TrendingDown className="h-3 w-3" />
                            {stat.growth.percentage}
                          </div>
                        )}
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-slate-700 text-sm font-semibold group-hover:text-slate-800 transition-colors">
                        {stat.title}
                      </h3>
                      <div
                        className={`text-3xl font-bold ${stat.accentColor} mb-2 group-hover:scale-105 transition-transform duration-300`}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                            ...
                          </div>
                        ) : (
                          stat.value.toLocaleString()
                        )}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {stat.description}
                      </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-4 bg-slate-200/50 rounded-full h-1 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full group-hover:animate-pulse transition-all duration-1000`}
                        style={{
                          width: `${Math.min(
                            (stat.value /
                              Math.max(...statCards.map((s) => s.value))) *
                              100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Detailed Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Monthly Analytics
              </h3>
              <p className="text-sm text-gray-600">Content growth over time</p>
            </div>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          {chartData && chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis
                  dataKey={chartDataKey}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="insights"
                  fill="#3b82f6"
                  name="Insights"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="publications"
                  fill="#10b981"
                  name="Publications"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="leaders"
                  fill="#8b5cf6"
                  name="Leaders"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="subscribers"
                  fill="#f59e0b"
                  name="Subscribers"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm">Loading analytics...</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Content Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Content Distribution
              </h3>
              <p className="text-sm text-gray-600">
                Overview of all content types
              </p>
            </div>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm">Loading distribution...</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}

