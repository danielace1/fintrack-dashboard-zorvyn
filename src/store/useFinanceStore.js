import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchTransactions } from "../data/mockData";

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      role: "viewer",
      setRole: (role) => set({ role }),

      transactions: [],
      loading: false,

      loadTransactions: async () => {
        if (get().transactions.length > 0) return;

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

      updateTransaction: (id, updatedTx) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedTx } : t,
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "fintrack-storage",

      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
      }),
    },
  ),
);
