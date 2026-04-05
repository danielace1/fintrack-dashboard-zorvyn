import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

const DeleteConfirmModal = ({ deleteId, setDeleteId, deleteTransaction }) => {
  return (
    <AnimatePresence>
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDeleteId(null)}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-2xl p-5 w-[320px] shadow-xl"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Delete Transaction
            </h3>
            <p className="text-sm text-slate-500 mb-5 font-semibold">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-800">
                {deleteId?.title}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm rounded-lg bg-slate-100 hover:bg-slate-200 cursor-pointer text-slate-700"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!deleteId) return;

                  deleteTransaction(deleteId);
                  toast.success("Transaction removed successfully");
                  setDeleteId(null);
                }}
                className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
