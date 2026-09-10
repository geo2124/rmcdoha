import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DemoBadge, Panel, SectionHead } from "@/components/rmc/admin-ui";
import { DemandBars } from "@/components/rmc/charts";
import { DEPARTMENT_DEMAND } from "@/data/rmc";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/departments")({
  component: DepartmentsPage,
});

const RANGES = [
  { id: "today", label: "Today" },
  { id: "7d", label: "7 Days" },
  { id: "30d", label: "30 Days" },
  { id: "90d", label: "90 Days" },
] as const;

function DepartmentsPage() {
  const [range, setRange] = useState<(typeof RANGES)[number]["id"]>("30d");
  const data = DEPARTMENT_DEMAND[range];
  const total = data.reduce((sum, d) => sum + d.requests, 0);

  return (
    <div className="grid gap-8">
      <SectionHead title="Departments" subtitle="Where digital demand is concentrating, so capacity can follow it.">
        <DemoBadge />
      </SectionHead>

      <Panel title="Department demand" hint={`${total.toLocaleString()} requests in the selected period`}>
        <div className="mb-5 flex flex-wrap gap-2">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                range === r.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
        <DemandBars data={data} height={320} />
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((d) => (
          <div key={d.name} className="surface p-5">
            <p className="font-display font-bold">{d.name}</p>
            <p className="mt-2 font-display text-2xl font-extrabold text-primary-deep">{d.requests.toLocaleString()}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {((d.requests / total) * 100).toFixed(1)}% of demand in this period
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
