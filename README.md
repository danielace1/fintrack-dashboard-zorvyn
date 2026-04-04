# FinTrack - Financial Dashboard

FinTrack is a modern financial dashboard that helps users **track, analyze, and understand their financial activity** through an intuitive and visually rich interface.

This project was built as part of an assignment provided by Zorvyn to demonstrate **UI/UX design, state management, and frontend engineering skills**.

---

## Live Link

[https://fintrack-dashboard-zorvyn.vercel.app](https://fintrack-dashboard-zorvyn.vercel.app)

## Screenshots

![Dashboard Overview](/public/screenshots/dashboard.png)

![Transaction List](/public/screenshots/transactions.png)

## Tech Stack

- **React**
- **Tailwind CSS**
- **Zustand**
- **Framer Motion**
- **Recharts**
- **Day.js**
- **Lucide Icons**

---

## Features

### Dashboard Overview

- Summary cards for **Total Balance, Income, and Expenses**
- **Time-based visualization** (cash flow trends)
- **Category breakdown** using charts
- Time filters (7d / 30d / all)

---

### Transactions Management

- View all transactions with:
  - Date
  - Amount
  - Category
  - Type (Income / Expense)

- Features:
  - Search transactions
  - Filter by type & category
  - Sort (newest, oldest, amount)
  - Add transaction (Admin)
  - Edit transaction (Admin)
  - Delete transaction (Admin)
  - Export transactions as CSV

---

### Insights Section

- Highest spending category
- Monthly spending comparison
- Savings rate calculation
- Smart insights & recommendations

---

### Role-Based UI

- **Viewer** - Can only view data

- **Admin** - Can add, edit, and delete transactions

---

### State Management

- Built using **Zustand** - Centralized store for:
  - Transactions
  - Filters
  - Role management

---

### Data Handling

- Uses mock API simulation for fetching transactions
- Async loading states handled with skeleton UI

### Data Persistence

- Uses **localStorage (Zustand persist middleware)**
- Data remains even after page refresh

---

### UI/UX Highlights

- Clean, modern, and responsive design
- Smooth animations with **Framer Motion**
- Skeleton loaders & empty states
- Thoughtful micro-interactions

---

## Installation & Setup

- Clone the repository and install dependencies:

```bash
git clone https://github.com/danielace1/fintrack-dashboard-zorvyn.git

npm install
```

- Start the development server:

```bash
npm run dev
```

- Open [http://localhost:5173](http://localhost:5173) to view the app in the browser.

## License

[MIT](./License)

## Author

- [Sudharsan A](https://github.com/danielace1)
