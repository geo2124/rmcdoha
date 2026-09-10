import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoBadge, KpiCard, Panel, SectionHead } from "@/components/rmc/admin-ui";
import { DemandBars, FunnelBars, TrendArea } from "@/components/rmc/charts";
import { DEPARTMENT_DEMAND, FUNNEL, KPIS, LIVE_FEED, WEEKLY_TREND } from "@/data/rmc";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const RANGES = [
  { id: "today", label: "Today" },
  { id: "7d", label: "7 Days" },
  { id: "30d", label: "30 Days" },
  { id: "90d", label: "90 Days" },
] as const;

function AdminDashboard() {
  const [range, setRange] = useState<(typeof RANGES)[number]["id"]>("7d");

  return (
    <div className="grid gap-8">
      <SectionHead title="Dashboard" subtitle="How the digital front door is performing across both branches.">
        <DemoBadge />
      </SectionHead>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {KPIS.map((k) => (
          <KpiCard key={k.id} label={k.label} value={k.value} delta={k.delta} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Panel title="Navigator activity & appointment requests" hint="Last 7 days · simulated">
          <TrendArea data={WEEKLY_TREND} />
        </Panel>

        <Panel title="Patient journey funnel" hint="Visitors through to confirmed bookings">
          <FunnelBars data={FUNNEL} />
          <Button asChild variant="soft" size="sm" className="mt-5">
            <Link to="/admin/journey">
              Full journey view <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Panel title="Department demand">
          <div className="mb-4 flex flex-wrap gap-2">
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
          <DemandBars data={DEPARTMENT_DEMAND[range]} />
        </Panel>

        <Panel title="Patient journey live feed" hint="Anonymised demo activity">
          <ul className="grid gap-3">
            {LIVE_FEED.map((item) => (
              <li key={item.id} className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-2">
                <Dot className="mt-0.5 size-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-sm">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
