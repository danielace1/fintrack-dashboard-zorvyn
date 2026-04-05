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
  RotateCcw,
  Edit3,
} from "lucide-react";
import { useFinanceStore } from "../store/useFinanceStore";
import AddTransactionModal from "../components/AddTransactionModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import EmptyState from "../components/EmptyState";
import TransactionsSkeleton from "../components/TransactionSkeleton";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { transactions, deleteTransaction, role, loading } = useFinanceStore();

  const filtered = useMemo(() => {
    if (!transactions) return [];

    let result = [...transactions];

    // search by title, category, amount, date
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((t) =>
        [
          t.title,
          t.category,
          t.type,
          t.amount?.toString(),
          dayjs(t.date).format("DD MMM YYYY"),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query),
      );
    }

    // filters
    if (filter !== "all") {
      result = result.filter((t) => t.type === filter);
    }

    if (category !== "all") {
      result = result.filter((t) => t.category === category);
    }

    switch (sortOrder) {
      case "newest":
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;

      case "oldest":
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;

      case "high":
        result.sort((a, b) => b.amount - a.amount);
        break;

      case "low":
        result.sort((a, b) => a.amount - b.amount);
        break;

      default:
        break;
    }

    return result;
  }, [transactions, search, filter, category, sortOrder]);

  const categories = useMemo(() => {
    const unique = new Set(transactions.map((t) => t.category));
    return ["all", ...unique];
  }, [transactions]);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };

  // CSV Export
  const handleExportCSV = () => {
    if (!transactions.length) return toast.error("No data to export");

    const headers = ["Title", "Amount", "Category", "Type", "Date"];

    const rows = transactions.map((t) => [
      `"${t.title}"`,
      t.amount,
      `"${t.category}"`,
      t.type,
      dayjs(t.date).format("YYYY-MM-DD"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV downloaded successfully");
  };

  if (loading) {
    return <TransactionsSkeleton />;
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Activity Ledger
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Monitor and manage your{" "}
            <span className="text-indigo-600 font-bold">financial history</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={handleExportCSV}
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
            <button
              onClick={() => {
                setSelectedTransaction(null);
                setOpen(true);
              }}
              className="admin-btns"
            >
              <Plus size={17} />
              Add Record
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 group">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
          />
          <input
            type="text"
            placeholder="Search by transaction, category, date, amount..."
            className="w-full bg-slate-50 border border-slate-100 outline-none pl-10 pr-4 py-2 rounded-xl text-sm transition-all focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Type Filter */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Filter size={14} />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-slate-50 border border-slate-100 pl-9 pr-8 py-2 rounded-xl text-xs font-semibold text-slate-600 appearance-none cursor-pointer focus:border-indigo-200 focus:bg-white transition-all outline-none"
            >
              <option value="all">All Transactions</option>
              <option value="income">Credits (Income)</option>
              <option value="expense">Debits (Expense)</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <ChevronDown size={14} />
            </div>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-50 border border-slate-100 pl-3 pr-8 py-2 rounded-xl text-xs font-semibold text-slate-600 appearance-none cursor-pointer focus:border-indigo-200 focus:bg-white transition-all outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <ChevronDown size={14} />
            </div>
          </div>

          {/* Sort Order Filter */}
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-slate-50 border border-slate-100 pl-3 pr-8 py-2 rounded-xl text-xs font-semibold text-slate-600 appearance-none cursor-pointer focus:border-indigo-200 focus:bg-white transition-all outline-none"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="high">High Amount</option>
              <option value="low">Low Amount</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <ChevronDown size={14} />
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setSearch("");
              setFilter("all");
              setCategory("all");
              setSortOrder("newest");
            }}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition-all cursor-pointer"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            type="search"
            onReset={() => {
              setSearch("");
              setFilter("all");
            }}
          />
        ) : (
          <div className="overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
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
                  <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
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

                      <td className="p-4 text-right">
                        <div className="flex justify-end items-center gap-2">
                          {role === "admin" ? (
                            <>
                              <button
                                onClick={() => handleEdit(t)}
                                title="Edit"
                                className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button
                                onClick={() => setDeleteId(t.id)}
                                title="Delete"
                                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-100/50 rounded-lg transition-all cursor-pointer opacity-100"
                              >
                                <Trash2 size={15} />
                              </button>
                            </>
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
        )}
      </div>

      <AddTransactionModal
        key={selectedTransaction?.id || "new"}
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setSelectedTransaction(null);
        }}
        initialData={selectedTransaction}
      />

      <DeleteConfirmModal
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        deleteTransaction={deleteTransaction}
      />
    </div>
  );
};

export default Transactions;
