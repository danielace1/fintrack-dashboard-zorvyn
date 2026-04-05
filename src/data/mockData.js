export const transactions = [
  {
    id: 1,
    title: "Salary",
    amount: 50000,
    category: "Salary",
    type: "income",
    date: "2026-03-02",
  },
  {
    id: 2,
    title: "Freelance Project",
    amount: 12000,
    category: "Freelance",
    type: "income",
    date: "2026-03-10",
  },
  {
    id: 3,
    title: "Swiggy Order",
    amount: 450,
    category: "Food",
    type: "expense",
    date: "2026-03-12",
  },
  {
    id: 4,
    title: "Groceries",
    amount: 2200,
    category: "Shopping",
    type: "expense",
    date: "2026-03-13",
  },
  {
    id: 5,
    title: "Electricity Bill",
    amount: 1800,
    category: "Bills",
    type: "expense",
    date: "2026-03-15",
  },
  {
    id: 6,
    title: "Movie Night",
    amount: 600,
    category: "Entertainment",
    type: "expense",
    date: "2026-03-19",
  },
  {
    id: 7,
    title: "Uber Ride",
    amount: 300,
    category: "Travel",
    type: "expense",
    date: "2026-03-21",
  },
  {
    id: 8,
    title: "Stock Profit",
    amount: 8000,
    category: "Investment",
    type: "income",
    date: "2026-03-22",
  },
  {
    id: 9,
    title: "Gym Membership",
    amount: 1500,
    category: "Health",
    type: "expense",
    date: "2026-04-01",
  },
  {
    id: 10,
    title: "Amazon Purchase",
    amount: 3200,
    category: "Shopping",
    type: "expense",
    date: "2026-04-05",
  },
];

export const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 500);
  });
};
