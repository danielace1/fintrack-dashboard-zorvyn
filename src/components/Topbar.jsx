import { useLocation } from "react-router";
import { useFinanceStore } from "../store/useFinanceStore";
import { ShieldCheck, Eye, Bell, Search, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const Topbar = () => {
  const location = useLocation();
  const { role, setRole } = useFinanceStore();

  const pageTitles = {
    "/": "Overview",
    "/transactions": "Transactions",
    "/insights": "Insights",
  };

  return (
    <div className="flex flex-1 items-center justify-between px-1 md:px-4 h-full">
      <div className="flex items-center gap-2">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={location.pathname}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-slate-900 font-extrabold tracking-tight text-lg md:text-lg"
            >
              {pageTitles[location.pathname] || "Dashboard"}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden xl:flex items-center gap-2 bg-slate-100/50 border border-slate-200 px-3 py-1.5 rounded-full w-64 group focus-within:border-indigo-400 transition-all">
          <Search
            size={16}
            className="text-slate-400 group-focus-within:text-indigo-500"
          />
          <input
            type="text"
            placeholder="Search analytics..."
            className="bg-transparent border-none text-sm outline-none w-full placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/50">
            {["viewer", "admin"].map((item) => {
              const isActive = role === item;
              return (
                <button
                  key={item}
                  onClick={() => setRole(item)}
                  className={clsx(
                    "relative flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-bold transition-all z-10 cursor-pointer",
                    isActive
                      ? "text-slate-900"
                      : "text-slate-500 hover:text-slate-700",
                  )}
                >
                  <div className="relative">
                    {item === "viewer" ? (
                      <Eye size={16} />
                    ) : (
                      <ShieldCheck size={16} />
                    )}
                    {isActive && (
                      <span
                        className={clsx(
                          "absolute -top-1 -right-1 h-2 w-2 rounded-full border border-white animate-pulse",
                          item === "admin" ? "bg-indigo-500" : "bg-amber-500",
                        )}
                      />
                    )}
                  </div>

                  <span className="capitalize hidden sm:block">{item}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeRole"
                      className="absolute inset-0 bg-white shadow-sm border border-slate-200/50 rounded-lg -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.4,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 border-l border-slate-200 pl-2 md:pl-6">
          <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors cursor-pointer">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white shadow-sm flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            SA
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
