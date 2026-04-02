import { useFinanceStore } from "../store/useFinanceStore";
import clsx from "clsx";

const Topbar = () => {
  const { role, setRole } = useFinanceStore();

  return (
    <div className="h-16 bg-white/70 backdrop-blur-xl border-b border-gray-200 flex items-center justify-between px-6">
      {/* Title */}
      <h2 className="text-lg font-semibold tracking-tight">
        Dashboard Overview
      </h2>

      {/* Role Switch */}
      <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setRole("viewer")}
          className={clsx(
            "px-4 py-1 rounded-md text-sm transition",
            role === "viewer" ? "bg-white shadow text-black" : "text-gray-500",
          )}
        >
          Viewer
        </button>

        <button
          onClick={() => setRole("admin")}
          className={clsx(
            "px-4 py-1 rounded-md text-sm transition",
            role === "admin" ? "bg-white shadow text-black" : "text-gray-500",
          )}
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default Topbar;
