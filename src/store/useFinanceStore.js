import { create } from "zustand";
import { fetchTransactions } from "../data/mockData";

export const useFinanceStore = create((set) => ({
  role: "viewer",
  setRole: (role) => set({ role }),

  transactions: [],
  loading: false,

  loadTransactions: async () => {
    set({ loading: true });

    const data = await fetchTransactions();

    set({
      transactions: data,
      loading: false,
    });
  },

  addTransaction: (tx) =>
    set((state) => ({
      transactions: [...state.transactions, tx],
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));
