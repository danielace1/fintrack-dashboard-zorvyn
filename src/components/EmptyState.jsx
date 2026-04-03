import { motion } from "framer-motion";
import { SearchX, RefreshCcw } from "lucide-react";

const EmptyState = ({ onReset, message = "No records found" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-indigo-100 blur-2xl rounded-full opacity-50" />

        <div className="relative h-16 w-16 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center text-slate-300">
          <SearchX size={32} strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="text-slate-900 font-bold text-lg tracking-tight">
        {message}
      </h3>
      <p className="text-slate-400 text-sm max-w-[280px] text-center mt-1 font-medium">
        We couldn't find any transactions matching your current filters or
        search term.
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="mt-6 flex items-center gap-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          <RefreshCcw size={14} />
          Clear all filters
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
