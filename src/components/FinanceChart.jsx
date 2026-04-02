import dayjs from "dayjs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const FinanceChart = ({ data }) => {
  const formatCurrency = (value) =>
    `₹${new Intl.NumberFormat("en-IN", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)}`;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f1f5f9"
        />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
          dy={10}
          tickFormatter={(str) => dayjs(str).format("MMM DD")}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
          tickFormatter={formatCurrency}
          width={50}
        />

        <Tooltip
          cursor={{ stroke: "#e2e8f0", strokeWidth: 2 }}
          labelFormatter={(label) => dayjs(label).format("MMMM DD, YYYY")}
          contentStyle={{
            borderRadius: "12px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
            padding: "12px",
          }}
          itemStyle={{ fontWeight: "bold", fontSize: "13px" }}
        />

        <Area
          name="Income"
          type="monotone"
          dataKey="income"
          stroke="#6366f1"
          strokeWidth={3}
          fill="url(#colorIncome)"
          animationDuration={1500}
        />

        <Area
          name="Expense"
          type="monotone"
          dataKey="expense"
          stroke="#f43f5e"
          strokeWidth={3}
          fill="url(#colorExpense)"
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
