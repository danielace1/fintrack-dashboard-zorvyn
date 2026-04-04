import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { SearchX, RefreshCcw, BarChart3, PlusCircle } from "lucide-react";

const EmptyState = ({ onReset, message, type = "search" }) => {
  const navigate = useNavigate();

  const config = {
    search: {
      icon: <SearchX size={32} strokeWidth={1.5} />,
      title: message || "No records found",
      description:
        "We couldn't find any transactions matching your current filters or search term.",
      actionLabel: "Clear all filters",
      actionIcon: <RefreshCcw size={14} />,
      onAction: onReset,
    },
    insights: {
      icon: <BarChart3 size={32} strokeWidth={1.5} />,
      title: "Not enough data yet",
      description:
        "Start adding your income and expenses to unlock personalized financial insights and patterns.",
      actionLabel: "Add your first transaction",
      actionIcon: <PlusCircle size={14} />,
      onAction: () => navigate("/transactions"),
    },
  };

  const active = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 px-4 h-full"
    >
      <div className="relative mb-5">
        <div className="absolute inset-0 bg-indigo-100 blur-3xl rounded-full opacity-60 animate-pulse" />
        <div className="relative size-18 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex items-center justify-center text-slate-400">
          {active.icon}
        </div>
      </div>

      <h3 className="text-slate-900 font-bold text-lg tracking-tight">
        {active.title}
      </h3>
      <p className="text-slate-400 text-sm max-w-[320px] text-center mt-2 leading-relaxed">
        {active.description}
      </p>

      <button
        onClick={active.onAction}
        className="mt-4 flex items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider shadow-lg shadow-indigo-100 transition-all active:scale-95 cursor-pointer"
      >
        {active.actionIcon}
        {active.actionLabel}
      </button>
    </motion.div>
  );
};

export default EmptyState;
