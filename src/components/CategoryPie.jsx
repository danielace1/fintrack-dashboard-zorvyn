import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";

const COLORS = [
  "#10b981",
  "#6366f1",
  "#f43f5e",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
];

export const CategoryPie = ({ data }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
          animationBegin={0}
          animationDuration={800}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              className="outline-none"
            />
          ))}

          <Label
            value={`₹${total.toLocaleString()}`}
            position="center"
            className="text-slate-900 font-extrabold text-lg"
            fill="#0f172a"
          />
          <Label
            value="Total Spent"
            position="center"
            dy={20}
            className="text-slate-400 font-bold text-[10px] uppercase tracking-wider"
          />
        </Pie>

        <Tooltip
          isAnimationActive={false}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white p-3 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: payload[0].payload.fill }}
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      {payload[0].name}
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      ₹{payload[0].value.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
