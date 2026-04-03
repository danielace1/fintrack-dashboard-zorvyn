import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import dayjs from "dayjs";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
  Calendar,
} from "lucide-react";
import { useFinanceStore } from "../store/useFinanceStore";
import DashboardSkeleton from "../components/DashboardSkeleton";
import SummaryCard from "../components/SummaryCard";
import { FinanceChart } from "../components/FinanceChart";
import { CategoryPie } from "../components/CategoryPie";

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("all");
  const { role, transactions, loading } = useFinanceStore();

  const filteredData = useMemo(() => {
    if (timeframe === "all") return transactions;
    const cutoff = dayjs().subtract(timeframe === "7d" ? 7 : 30, "day");

    return transactions.filter((t) => dayjs(t.date).isAfter(cutoff));
  }, [timeframe, transactions]);

  const stats = useMemo(() => {
    const income = filteredData
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    const expense = filteredData
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [filteredData]);

  const chartData = useMemo(() => {
    const map = filteredData.reduce((acc, curr) => {
      const date = curr.date;
      if (!acc[date]) acc[date] = { date, income: 0, expense: 0 };
      acc[date][curr.type] += curr.amount;
      return acc;
    }, {});

    return Object.values(map).sort(
      (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    );
  }, [filteredData]);

  const categoryData = useMemo(() => {
    const map = filteredData
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {});

    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  const topCategory = useMemo(() => {
    if (categoryData.length === 0) return null;
    return categoryData.reduce((prev, current) =>
      prev.value > current.value ? prev : current,
    );
  }, [categoryData]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-1"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              Financial Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-slate-900 tracking-tight"
          >
            Good {dayjs().hour() < 12 ? "Morning" : "Afternoon"}, Sudharsan
          </motion.h1>

          <p className="text-slate-400 text-xs font-medium flex items-center gap-1.5 mt-1">
            <Calendar size={12} className="text-slate-300" />
            Today is {dayjs().format("MMMM D, YYYY")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {["7d", "30d", "all"].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  timeframe === t
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {role === "admin" && (
            <Link to="/transactions">
              <button className="admin-btns">
                <Plus size={17} />
                <span className="hidden sm:inline">Add Transaction</span>
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard
          title="Net Balance"
          value={stats.balance}
          icon={Wallet}
          color="bg-indigo-600"
          trend={12}
        />
        <SummaryCard
          title="Total Income"
          value={stats.income}
          icon={TrendingUp}
          color="bg-emerald-500"
          trend={8}
        />
        <SummaryCard
          title="Total Expenses"
          value={stats.expense}
          icon={TrendingDown}
          color="bg-rose-500"
          trend={-2}
        />
      </div>

      {/* Finance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col min-h-[380px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">
                Cash Flow Trend
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Daily income and expense visualization
              </p>
            </div>
            <Calendar size={18} className="text-slate-300" />
          </div>
          <div className="h-[320px] min-h-[320px] w-full">
            <FinanceChart data={chartData} />
          </div>
        </div>

        {/* Spend Allocation */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col h-full">
            <h3 className="font-bold text-slate-800 text-lg mb-6">
              Spend Allocation
            </h3>
            <div className="flex-1 min-h-[220px]">
              <CategoryPie data={categoryData} />
            </div>

            <AnimatePresence mode="wait">
              {topCategory && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50"
                >
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-[10px] uppercase tracking-widest mb-2">
                    <ArrowUpRight size={14} />
                    Auto Insight
                  </div>
                  <p className="text-indigo-900/80 text-sm leading-relaxed">
                    Most of your expenses come from{" "}
                    <span className="font-extrabold text-indigo-700">
                      {topCategory.name}
                    </span>
                    (₹{topCategory.value.toLocaleString()}). Consider optimizing
                    this area.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
