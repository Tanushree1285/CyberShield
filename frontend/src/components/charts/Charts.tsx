import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ResourceStatsProps {
  data?: { name: string; count: number }[];
}

/** Resource stats bar chart */
export const ResourceStatsChart = ({ data = [] }: ResourceStatsProps) => (
  <div className="rounded-lg border border-border bg-card p-5">
    <h3 className="font-semibold mb-4">Resources Overview</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data.length > 0 ? data : []}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
        <XAxis dataKey="name" stroke="hsl(215 20% 55%)" fontSize={12} />
        <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
        <Tooltip
          contentStyle={{
            background: "hsl(222 44% 9%)",
            border: "1px solid hsl(222 30% 18%)",
            borderRadius: "8px",
            color: "hsl(210 40% 93%)",
          }}
        />
        <Bar dataKey="count" fill="hsl(187 80% 48%)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const COLORS = ["hsl(187 80% 48%)", "hsl(160 84% 39%)", "hsl(280 80% 60%)", "hsl(30 90% 55%)", "hsl(0 80% 60%)"];

interface CountryDistributionProps {
  data?: { name: string; value: number }[];
}

/** Country distribution pie chart */
export const CountryDistributionChart = ({ data = [] }: CountryDistributionProps) => {

  const filteredData = data.filter(
    (item) => item.name !== "Global"
  );

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="font-semibold mb-4">Country Distribution</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {filteredData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
