import { motion } from "framer-motion";
import toast from "react-hot-toast";
import clsx from "clsx";
import {
  User,
  Shield,
  Bell,
  Palette,
  Trash2,
  LogOut,
  ChevronRight,
  UserCheck,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { useFinanceStore } from "../store/useFinanceStore";

const Settings = () => {
  const { role, setRole } = useFinanceStore();

  const handleRoleToggle = (newRole) => {
    setRole(newRole);

    toast.success(
      newRole === "admin" ? "Admin mode enabled" : "Viewer mode enabled",
      {
        icon:
          newRole === "admin" ? (
            <ShieldCheck size={18} />
          ) : (
            <Shield size={18} />
          ),
      },
    );
  };
  const clearData = () => {
    if (role !== "admin") return toast.error("Only admins can wipe data");
    toast.error("Data wipe functionality not implemented yet");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="text-slate-400 text-sm font-medium mt-1">
          Manage your account and app preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-4 text-white shadow-xl">
        <div className="absolute top-0 right-0 size-48 bg-indigo-500/20 blur-[80px] -mr-20 -mt-20" />
        <div className="relative z-10 flex items-center gap-6">
          <div className="size-16 rounded-full border-4 border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
            <User size={35} className="text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white mb-1">
              Sudharsan
            </h2>
            <p className="text-indigo-400 text-xs font-semibold uppercase flex items-center gap-1">
              {role === "admin" ? (
                <UserCheck size={14} />
              ) : (
                <Shield size={14} />
              )}
              {role} Account
            </p>
          </div>
        </div>
      </div>

      {/* Access Control */}
      <SettingSection
        title="Access & Permissions"
        description="Switch between User and Admin roles to test application logic."
      >
        <div className="grid grid-cols-2 gap-4 p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => handleRoleToggle("viewer")}
            className={clsx(
              "flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer",
              role === "viewer"
                ? "bg-white text-indigo-600 shadow-md"
                : "text-slate-400 hover:text-slate-600",
            )}
          >
            <Shield size={16} /> User Mode
          </button>
          <button
            onClick={() => handleRoleToggle("admin")}
            className={clsx(
              "flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer",
              role === "admin"
                ? "bg-white text-rose-600 shadow-md"
                : "text-slate-400 hover:text-slate-600",
            )}
          >
            <ShieldAlert size={16} /> Admin Mode
          </button>
        </div>
      </SettingSection>

      {/* Application Settings */}
      <SettingSection
        title="Application Settings"
        description="Customize how the platform behaves for you."
      >
        <SettingRow
          icon={Bell}
          label="Notifications"
          subLabel="Alerts, Budgets, and Insights"
          action={
            <div className="h-6 w-11 bg-indigo-600 rounded-full relative p-1 transition-all">
              <div className="h-4 w-4 bg-white rounded-full ml-auto" />
            </div>
          }
        />
        <div className="h-px bg-slate-50 w-full" />
        <SettingRow
          icon={Palette}
          label="Interface Theme"
          subLabel="Light / Dark mode preference"
          action={
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase tracking-wider">
              System
            </span>
          }
        />
      </SettingSection>

      {/* Data & Security */}
      <SettingSection
        title="Data & Security"
        description="Control your data export and storage options."
      >
        <SettingRow
          icon={Shield}
          label="2FA Authentication"
          subLabel="Security layer for transactions"
          action={<ChevronRight className="text-slate-300" />}
        />
        <div className="h-px bg-slate-50 w-full" />
        <button
          onClick={clearData}
          className="w-full flex items-center justify-between py-3 group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all">
              <Trash2 size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-rose-600">Erase All Data</p>
              <p className="text-[11px] text-rose-400 font-medium uppercase tracking-wider">
                Clear all transaction history
              </p>
            </div>
          </div>
          <ChevronRight className="text-rose-200" />
        </button>
      </SettingSection>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-600 py-3 rounded-[2rem] font-bold text-sm uppercase tracking-wider hover:bg-slate-200 transition-all cursor-pointer">
        <LogOut size={14} />
        Sign Out of Dashboard
      </button>

      <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
        FinTrack Dashboard - Made with ❤️
      </p>
    </motion.div>
  );
};

// Helper components
const SettingSection = ({ title, description, children }) => (
  <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
    <div className="mb-4">
      <h3 className="font-bold text-slate-900 tracking-tight mb-0.5">
        {title}
      </h3>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

const SettingRow = ({ icon: Icon, label, subLabel, action }) => (
  <div className="flex items-center justify-between py-2 group">
    <div className="flex items-center gap-3">
      <div className="size-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800 mb-0.5">{label}</p>
        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          {subLabel}
        </p>
      </div>
    </div>
    {action}
  </div>
);

export default Settings;
