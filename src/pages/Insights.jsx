import { useMemo } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import clsx from "clsx";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  Target,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useFinanceStore } from "../store/useFinanceStore";
import InsightsSkeleton from "../components/InsightsSkeleton";
import EmptyState from "../components/EmptyState";

const Insights = () => {
  const { transactions, loading } = useFinanceStore();

  const insights = useMemo(() => {
    if (!transactions.length) return null;

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    const categoryMap = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {});

    const sortedCategories = Object.entries(categoryMap).sort(
      (a, b) => b[1] - a[1],
    );
    const topCategory = sortedCategories[0];

    const lastMonth = dayjs().subtract(1, "month");
    const lastMonthExpense = transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          dayjs(t.date).isAfter(lastMonth.startOf("month")) &&
          dayjs(t.date).isBefore(lastMonth.endOf("month")),
      )
      .reduce((acc, t) => acc + t.amount, 0);

    const change =
      lastMonthExpense === 0
        ? 0
        : ((expense - lastMonthExpense) / lastMonthExpense) * 100;

    return {
      income,
      expense,
      balance: income - expense,
      topCategory,
      change,
      savingsRate: income > 0 ? ((income - expense) / income) * 100 : 0,
    };
  }, [transactions]);

  if (loading) return <InsightsSkeleton />;

  if (!insights)
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <EmptyState type="insights" />
      </div>
    );

  const metrics = [
    {
      label: "Savings Potential",
      value: `₹${(insights.balance * 0.15).toFixed(0)}`,
      sub: "If you optimize categories",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Monthly Flux",
      value: `${insights.change > 0 ? "+" : ""}${insights.change.toFixed(1)}%`,
      sub: insights.change > 0 ? "Spending is up" : "Spending is down",
      icon: insights.change > 0 ? TrendingUp : TrendingDown,
      color: insights.change > 0 ? "text-rose-500" : "text-emerald-500",
      bg: insights.change > 0 ? "bg-rose-50" : "bg-emerald-50",
    },
    {
      label: "Efficiency Score",
      value: insights.savingsRate > 20 ? "High" : "Average",
      sub: "Based on balance ratio",
      icon: Target,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="text-indigo-500" size={22} />
            Smart Insights
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Personalized financial patterns & optimization tips
          </p>
        </div>
      </div>

      {/* Spending Concentration */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-3 md:p-4 text-white shadow-lg"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px] -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[80px] -ml-20 -mb-20" />

        <div className="relative z-10 flex flex-col md:flex-row gap-3 md:gap-5 items-center">
          <div className="size-16 md:size-18 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-inner">
            <Brain size={35} className="text-indigo-400" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="md:text-lg font-bold mb-1">
              Spending Concentration
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-xl">
              Analysis shows your{" "}
              <span className="text-white font-semibold">
                {insights.topCategory?.[0]}
              </span>{" "}
              expenses account for{" "}
              <span className="text-indigo-400 font-semibold">
                ₹{insights.topCategory?.[1].toLocaleString()}
              </span>
              . Reducing this by 10% would save you{" "}
              <span className="text-emerald-400 font-semibold">
                ₹{(insights.topCategory?.[1] * 0.1).toFixed(0)}
              </span>{" "}
              monthly.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-2 md:p-3 rounded-2xl backdrop-blur-md">
            <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
              Savings Rate
            </p>
            <p className="text-lg md:text-xl font-black text-white">
              {insights.savingsRate.toFixed(0)}%
            </p>
            <div className="w-full bg-white/10 h-1 md:h-1.5 rounded-full mt-1 md:mt-2">
              <motion.div
                className="bg-indigo-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.max(0, Math.min(100, insights.savingsRate))}%`,
                }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-slate-100 p-5 rounded-[2rem] shadow-sm group hover:shadow-lg transition-all"
          >
            <div
              className={clsx(
                "size-8 rounded-xl flex items-center justify-center mb-2 md:mb-4 transition-transform group-hover:scale-110",
                m.bg,
                m.color,
              )}
            >
              <m.icon size={20} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {m.label}
            </p>
            <h4 className={clsx("text-2xl font-bold mt-1", m.color)}>
              {m.value}
            </h4>
            <p className="text-[12px] text-slate-400 mt-1 font-medium">
              {m.sub}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div className="bg-indigo-50 border border-indigo-200 p-3 md:p-5 rounded-2xl">
        <p className="text-xs md:text-sm text-indigo-800 font-semibold md:font-medium">
          If you maintain your current savings rate, you could save{" "}
          <span className="font-bold">
            ₹{(insights.balance * 12).toLocaleString()}
          </span>{" "}
          in the next year.
        </p>
      </motion.div>

      {/* Smart Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-emerald-50 border border-emerald-200 p-3 md:p-4 rounded-[2rem] flex gap-3">
          <div className="size-10 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
            <TrendingUp size={20} />
          </div>
          <div>
            <h4 className="font-bold text-emerald-900">Optimization Goal</h4>
            <p className="text-sm text-emerald-700/80 mt-1">
              Your income is stable. We suggest moving{" "}
              <span className="font-bold">
                ₹{(insights.balance * 0.1).toFixed(0)}
              </span>{" "}
              to a high-interest savings account.
            </p>
            <button className="mt-3 flex items-center gap-1 text-xs font-black text-emerald-600 uppercase tracking-wider cursor-pointer">
              Learn How <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-200 p-3 md:p-4 rounded-[2rem] flex gap-3">
          <div className="size-10 bg-white rounded-2xl flex items-center justify-center text-rose-600 shadow-sm shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h4 className="font-bold text-rose-900">Expense Alert</h4>
            <p className="text-sm text-rose-700/80 mt-1">
              {insights.change > 0
                ? `You've spent ${insights.change.toFixed(1)}% more than last month. Check your ${insights.topCategory?.[0]} transactions.`
                : "Your spending is healthy this month. Keep maintaining your current budget limits."}
            </p>
            <button className="mt-3 flex items-center gap-1 text-xs font-black text-rose-600 uppercase tracking-wider cursor-pointer">
              Review List <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
