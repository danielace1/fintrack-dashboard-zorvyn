import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import clsx from "clsx";

const Sidebar = ({ onClose }) => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Transactions", icon: Receipt, path: "/transactions" },
    { name: "Insights", icon: BarChart3, path: "/insights" },
  ];

  const isSettingsActive = location.pathname === "/settings";

  return (
    <div className="h-full flex flex-col bg-white p-4 w-full">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <div className="h-4 w-4 bg-white rounded-sm rotate-45" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          FinTrack<span className="text-indigo-600">.</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={clsx(
                "group relative flex items-center justify-between p-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100/50"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span
                  className={clsx(
                    "font-semibold text-sm",
                    isActive
                      ? "opacity-100"
                      : "opacity-80 group-hover:opacity-100",
                  )}
                >
                  {item.name}
                </span>
              </div>

              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="h-5 w-1 bg-indigo-600 rounded-full absolute left-0"
                />
              )}

              {isActive && <ChevronRight size={14} className="opacity-50" />}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 mt-6 border-t border-slate-100 space-y-1">
        <Link to="/settings">
          <button
            onClick={onClose}
            className={clsx(
              "flex items-center gap-2 p-3 rounded-xl transition-all duration-200 cursor-pointer w-full",
              isSettingsActive
                ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100/50"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
            )}
          >
            <Settings size={20} />
            <span className="text-sm font-semibold">Settings</span>
          </button>
        </Link>

        <div className="mt-4 p-2 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="h-10 w-10 text-sm rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-indigo-700 font-semibold">
            SA
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-semibold text-slate-900 truncate">
              Sudharsan
            </p>
            <p className="text-[11px] font-normal text-slate-400 truncate">
              sudharsan@gmail.com
            </p>
          </div>
          <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
