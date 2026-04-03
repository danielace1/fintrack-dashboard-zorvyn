import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import clsx from "clsx";
import toast from "react-hot-toast";
import {
  Trash2,
  Search,
  Plus,
  Filter,
  Download,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronDown,
} from "lucide-react";
import { useFinanceStore } from "../store/useFinanceStore";
import AddTransactionModal from "../components/AddTransactionModal";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const { transactions, deleteTransaction, role } = useFinanceStore();

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
      .filter((t) => (filter === "all" ? true : t.type === filter))
      .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
  }, [transactions, search, filter]);

  const handleDelete = (id) => {
    if (role !== "admin") {
      toast.error("Access Denied");
      return;
    }
    deleteTransaction(id);
    toast.success("Transaction removed successfully");
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Activity Ledger
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Monitor and manage your{" "}
            <span className="text-indigo-600 font-bold">financial history</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="p-2.5 text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-sm"
            >
              <Download size={18} />
            </button>
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-full mr-0.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900/90 text-white text-xs font-medium rounded-md whitespace-nowrap shadow-md backdrop-blur-sm"
                >
                  Export CSV
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {role === "admin" && (
            <button onClick={() => setOpen(true)} className="admin-btns">
              <Plus size={17} />
              Add Record
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 group">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
          />
          <input
            type="text"
            placeholder="Search ledger..."
            className="w-full bg-slate-50 border border-slate-100 outline-none pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative flex items-center min-w-[160px]">
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            <Filter size={14} />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 pl-9 pr-10 py-2.5 rounded-xl text-xs font-semibold text-slate-600 appearance-none cursor-pointer focus:border-indigo-200 focus:bg-white transition-all outline-none"
          >
            <option value="all">All Transactions</option>
            <option value="income">Credits (Income)</option>
            <option value="expense">Debits (Expense)</option>
          </select>
          <div className="absolute right-3 text-slate-400 pointer-events-none">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-6 md:w-10">
                #
              </th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Transaction Details
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Category
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Date
              </th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                Amount
              </th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <AnimatePresence initial={false}>
              {filtered.map((t, index) => (
                <motion.tr
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={t.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-xs font-bold text-slate-300">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={clsx(
                          "h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
                          t.type === "income"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600",
                        )}
                      >
                        {t.type === "income" ? (
                          <ArrowUpCircle size={18} />
                        ) : (
                          <ArrowDownCircle size={18} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm leading-none mb-1">
                          {t.title}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                          ID: TX-{t.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-wide">
                      {t.category}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-500 font-semibold italic">
                      {dayjs(t.date).format("DD MMM, YYYY")}
                    </p>
                  </td>

                  <td
                    className={clsx(
                      "px-6 py-4 text-sm font-bold text-right",
                      t.type === "income"
                        ? "text-emerald-600"
                        : "text-slate-900",
                    )}
                  >
                    {t.type === "income" ? "+" : "-"} ₹
                    {t.amount.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      {role === "admin" ? (
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-100/50 rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      ) : (
                        <div
                          className="h-2 w-2 rounded-full bg-slate-200"
                          title="Viewer Only"
                        />
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <AddTransactionModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Transactions;
