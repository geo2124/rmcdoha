import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useMounted } from "@/hooks/use-mounted";

const AXIS = { stroke: "var(--color-muted-foreground)", fontSize: 11 };
const TOOLTIP = {
  contentStyle: {
    borderRadius: "0.75rem",
    border: "1px solid var(--color-border)",
    background: "var(--color-card)",
    fontSize: "0.78rem",
    boxShadow: "var(--shadow-card)",
  },
};
const PALETTE = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-muted-foreground)",
];

function ChartFrame({ height, children }: { height: number; children: React.ReactElement }) {
  const mounted = useMounted();
  if (!mounted) return <Skeleton className="w-full rounded-xl" style={{ height }} />;
  return (
    <ResponsiveContainer width="100%" height={height}>
      {children}
    </ResponsiveContainer>
  );
}

export function DemandBars({ data, height = 280 }: { data: { name: string; requests: number }[]; height?: number }) {
  return (
    <ChartFrame height={height}>
      <BarChart data={data} margin={{ left: -18, right: 8, top: 8 }}>
        <XAxis dataKey="name" tickLine={false} axisLine={false} {...AXIS} interval={0} angle={-16} dy={10} height={48} />
        <YAxis tickLine={false} axisLine={false} {...AXIS} />
        <Tooltip {...TOOLTIP} />
        <Bar dataKey="requests" radius={[8, 8, 0, 0]} fill="var(--color-chart-1)" animationDuration={700} />
      </BarChart>
    </ChartFrame>
  );
}

export function IntentPie({ data, height = 260 }: { data: { name: string; value: number }[]; height?: number }) {
  return (
    <ChartFrame height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius="52%" outerRadius="82%" paddingAngle={3} animationDuration={700}>
          {data.map((_, i) => (
            <Cell key={i} fill={PALETTE[i % PALETTE.length]} stroke="var(--color-card)" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip formatter={(v: number) => `${v}%`} {...TOOLTIP} />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          formatter={(value) => <span style={{ fontSize: "0.72rem", color: "var(--color-muted-foreground)" }}>{value}</span>}
        />
      </PieChart>
    </ChartFrame>
  );
}

export function TrendArea({
  data,
  height = 260,
}: {
  data: { day: string; navigator: number; requests: number }[];
  height?: number;
}) {
  return (
    <ChartFrame height={height}>
      <AreaChart data={data} margin={{ left: -20, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="gNav" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gReq" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" tickLine={false} axisLine={false} {...AXIS} />
        <YAxis tickLine={false} axisLine={false} {...AXIS} />
        <Tooltip {...TOOLTIP} />
        <Area type="monotone" dataKey="navigator" name="AI conversations" stroke="var(--color-chart-1)" fill="url(#gNav)" strokeWidth={2} animationDuration={700} />
        <Area type="monotone" dataKey="requests" name="Appointment requests" stroke="var(--color-chart-2)" fill="url(#gReq)" strokeWidth={2} animationDuration={700} />
      </AreaChart>
    </ChartFrame>
  );
}

export function FunnelBars({ data }: { data: { stage: string; value: number }[] }) {
  const max = data[0]?.value ?? 1;
  return (
    <ol className="grid gap-3">
      {data.map((row, i) => {
        const pct = (row.value / max) * 100;
        const stepPct = i === 0 ? 100 : (row.value / data[i - 1].value) * 100;
        return (
          <li key={row.stage}>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
              <p className="min-w-0 truncate text-sm font-semibold">{row.stage}</p>
              <p className="shrink-0 text-sm text-muted-foreground">
                <span className="font-display font-bold text-foreground">{row.value.toLocaleString()}</span>
                <span className="ms-2 text-xs">{pct.toFixed(1)}% of visitors</span>
              </p>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="brand-gradient h-full rounded-full transition-[width] duration-700"
                style={{ width: `${Math.max(pct, 3)}%` }}
              />
            </div>
            {i > 0 && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                {stepPct.toFixed(1)}% continued from the previous step
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
