export const transactions = [
  {
    id: 1,
    title: "Salary",
    amount: 50000,
    category: "Salary",
    type: "income",
    date: "2026-03-02",
    createdAt: 1772409600000,
  },
  {
    id: 2,
    title: "Freelance Project",
    amount: 12000,
    category: "Freelance",
    type: "income",
    date: "2026-03-10",
    createdAt: 1773100800000,
  },
  {
    id: 3,
    title: "Swiggy Order",
    amount: 450,
    category: "Food",
    type: "expense",
    date: "2026-03-10",
    createdAt: 1773273600000,
  },
  {
    id: 4,
    title: "Groceries",
    amount: 2200,
    category: "Shopping",
    type: "expense",
    date: "2026-03-12",
    createdAt: 1773360000000,
  },
  {
    id: 5,
    title: "Electricity Bill",
    amount: 1800,
    category: "Bills",
    type: "expense",
    date: "2026-03-15",
    createdAt: 1773532800000,
  },
  {
    id: 6,
    title: "Movie Night",
    amount: 600,
    category: "Entertainment",
    type: "expense",
    date: "2026-03-19",
    createdAt: 1773878400000,
  },
  {
    id: 7,
    title: "Uber Ride",
    amount: 300,
    category: "Travel",
    type: "expense",
    date: "2026-03-20",
    createdAt: 1774051200000,
  },
  {
    id: 8,
    title: "Stock Profit",
    amount: 8000,
    category: "Investment",
    type: "income",
    date: "2026-03-22",
    createdAt: 1774137600000,
  },
  {
    id: 9,
    title: "Salary",
    amount: 45000,
    category: "Salary",
    type: "income",
    date: "2026-04-01",
    createdAt: 1774237600000,
  },
  {
    id: 10,
    title: "Gym Membership",
    amount: 1500,
    category: "Health",
    type: "expense",
    date: "2026-04-02",
    createdAt: 1774915200000,
  },
  {
    id: 11,
    title: "Amazon Purchase",
    amount: 3200,
    category: "Shopping",
    type: "expense",
    date: "2026-04-05",
    createdAt: 1775260800000,
  },
];

export const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 500);
  });
};
