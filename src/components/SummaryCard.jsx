import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import clsx from "clsx";

const SummaryCard = ({ title, value, icon: Icon, color, trend }) => {
  const isPositive = trend > 0;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-white/20 via-transparent to-slate-100/20 pointer-events-none" />

      <div className="relative flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {title}
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            ₹ {value.toLocaleString()}
          </h2>

          {trend !== undefined && (
            <div className="flex items-center mt-2">
              <div
                className={clsx(
                  "flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold shadow-sm",
                  isPositive
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : "bg-rose-50 text-rose-600 border border-rose-100",
                )}
              >
                {isPositive ? (
                  <TrendingUp size={12} strokeWidth={3} />
                ) : (
                  <TrendingDown size={12} strokeWidth={3} />
                )}
                <span>{Math.abs(trend)}%</span>
              </div>
              <span className="text-[10px] text-slate-400 ml-2 font-medium">
                vs last month
              </span>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className={clsx(
              "absolute inset-0 blur-2xl opacity-30 rounded-full",
              color,
            )}
          />

          <div
            className={clsx(
              "relative h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg",
              color,
            )}
          >
            <Icon size={26} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
