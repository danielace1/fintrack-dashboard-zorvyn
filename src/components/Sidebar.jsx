import { LayoutDashboard, Receipt, BarChart3 } from "lucide-react";
import clsx from "clsx";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Transactions", icon: Receipt },
    { name: "Insights", icon: BarChart3 },
  ];

  const active = "Dashboard";

  return (
    <div className="w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200 p-5">
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10 text-blue-600 tracking-tight">
        FinTrack
      </h1>

      {/* Menu */}
      <nav className="space-y-2">
        {menu.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={clsx(
                "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200",
                "hover:bg-gray-100 hover:shadow-sm",
                active === item.name && "bg-blue-50 text-blue-600 shadow-sm",
              )}
            >
              <Icon size={18} />
              <span className="font-medium">{item.name}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
