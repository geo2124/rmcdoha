import { createFileRoute } from "@tanstack/react-router";
import { DemoBadge, KpiCard, Panel, SectionHead } from "@/components/rmc/admin-ui";
import { DemandBars, FunnelBars, IntentPie, TrendArea } from "@/components/rmc/charts";
import { DEPARTMENT_DEMAND, FUNNEL, KPIS, PATIENT_INTENT, WEEKLY_TREND } from "@/data/rmc";

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="grid gap-8">
      <SectionHead title="Analytics" subtitle="The business case for the digital front door, in one view.">
        <DemoBadge />
      </SectionHead>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {KPIS.slice(0, 3).map((k) => (
          <KpiCard key={k.id} label={k.label} value={k.value} delta={k.delta} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Conversion funnel">
          <FunnelBars data={FUNNEL} />
        </Panel>
        <Panel title="Patient intent">
          <IntentPie data={PATIENT_INTENT} height={300} />
        </Panel>
        <Panel title="Weekly activity">
          <TrendArea data={WEEKLY_TREND} height={280} />
        </Panel>
        <Panel title="Department demand · 30 days">
          <DemandBars data={DEPARTMENT_DEMAND["30d"]} height={280} />
        </Panel>
      </div>

      <Panel title="What this means" hint="Interpretation of the simulated period">
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <li>Patients who use the Navigator book at a materially higher rate than those who browse alone.</li>
          <li>Cardiology and Orthopedics attract the highest digital demand — a capacity planning signal.</li>
          <li>Pre-visit summaries arrive for 3 in 4 booked appointments, shortening consultations.</li>
          <li>Weekend evenings are peak Navigator hours, when reception is least staffed.</li>
        </ul>
      </Panel>
    </div>
  );
}
