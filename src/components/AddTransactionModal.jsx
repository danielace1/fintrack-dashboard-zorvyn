import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import clsx from "clsx";
import {
  X,
  Tag,
  Calendar,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  IndianRupee,
  Edit3,
} from "lucide-react";
import { useFinanceStore } from "../store/useFinanceStore";

const AddTransactionModal = ({ isOpen, onClose, initialData = null }) => {
  const getInitialForm = (data) => ({
    title: data?.title || "",
    amount: data?.amount || "",
    category: data?.category || "",
    type: data?.type || "expense",
    date: data?.date
      ? data.date.split("T")[0]
      : new Date().toLocaleDateString("en-CA"), // Format: YYYY-MM-DD
  });

  const [form, setForm] = useState(() => getInitialForm(initialData));

  const { addTransaction, updateTransaction } = useFinanceStore();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.title || !form.amount || !form.category || !form.date) {
      toast.error("Please fill all fields");
      return;
    }

    if (initialData) {
      // Update existing transaction
      updateTransaction(initialData.id, {
        ...form,
        amount: Number(form.amount),
        createdAt: initialData.createdAt,
      });
      toast.success("Transaction updated successfully");
    } else {
      // Add new transaction
      addTransaction({
        ...form,
        id: Date.now(),
        amount: Number(form.amount),
        createdAt: Date.now(),
      });
      toast.success("Transaction added successfully");
    }

    setForm(getInitialForm(null));
    onClose();
  };

  const isEdit = !!initialData;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
          <motion.div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-50"
          >
            <div className="px-5 md:px-8 pt-5 md:pt-8 pb-3 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {isEdit ? "Edit Record" : "New Record"}
                </h2>
                <p className="mt-1 text-sm text-slate-400 font-medium">
                  {isEdit
                    ? "Update your activity ledger"
                    : "Add to your activity ledger"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 md:p-8 pt-2 space-y-4">
              <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200/50">
                {["expense", "income"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm({ ...form, type })}
                    className={clsx(
                      "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all capitalize cursor-pointer",
                      form.type === type
                        ? type === "income"
                          ? "bg-white text-emerald-600 shadow-sm"
                          : "bg-white text-rose-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-600",
                    )}
                  >
                    {type === "income" ? (
                      <ArrowUpCircle size={16} />
                    ) : (
                      <ArrowDownCircle size={16} />
                    )}
                    {type}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="label">Title</label>
                  <div className="mt-1 relative group">
                    <div className="form-icons">
                      {isEdit ? <Edit3 size={15} /> : <Plus size={15} />}
                    </div>
                    <input
                      name="title"
                      value={form.title}
                      placeholder="e.g. Starbucks Coffee"
                      className="input-field"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="label">Amount</label>
                    <div className="mt-1 relative group">
                      <div className="form-icons">
                        <IndianRupee size={15} />
                      </div>
                      <input
                        name="amount"
                        type="number"
                        value={form.amount}
                        placeholder="0.00"
                        className="input-field"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="label">Date</label>
                    <div className="mt-1 relative group">
                      <div className="form-icons">
                        <Calendar size={16} />
                      </div>
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        className="input-field cursor-pointer"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="label">Category</label>
                  <div className="mt-1 relative group">
                    <div className="form-icons">
                      <Tag size={16} />
                    </div>
                    <input
                      name="category"
                      value={form.category}
                      placeholder="e.g. Food, Shopping, Salary"
                      className="input-field"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-xl shadow-indigo-100 transition-all transform active:scale-[0.98] cursor-pointer"
              >
                {isEdit ? "Update Transaction" : "Save Transaction"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddTransactionModal;
