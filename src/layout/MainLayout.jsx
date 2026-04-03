import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useFinanceStore } from "../store/useFinanceStore";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { loadTransactions } = useFinanceStore();
  const location = useLocation();

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className="2xl:container 2xl:mx-auto flex h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      <aside className="hidden lg:flex h-full w-64 border-r border-slate-200/60 bg-white">
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl lg:hidden"
            >
              <div className="absolute top-4 right-4 lg:hidden">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-slate-200/60 bg-white/80 backdrop-blur-md px-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="mr-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
          >
            <Menu size={23} />
          </button>

          <div className="flex-1">
            <Topbar />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-[1400px] mx-auto p-4 md:p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
