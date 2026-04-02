import { create } from "zustand";

export const useFinanceStore = create((set) => ({
  role: "viewer",
  setRole: (role) => set({ role }),

  transactions: [],

  setTransactions: (data) => set({ transactions: data }),

  addTransaction: (tx) =>
    set((state) => ({
      transactions: [...state.transactions, tx],
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));
