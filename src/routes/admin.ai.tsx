import { createFileRoute } from "@tanstack/react-router";
import { DemoBadge, Panel, SectionHead } from "@/components/rmc/admin-ui";
import { IntentPie } from "@/components/rmc/charts";
import { PATIENT_INTENT, TOP_REQUESTS } from "@/data/rmc";

export const Route = createFileRoute("/admin/ai")({
  component: AiPage,
});

const ASSISTANTS = [
  {
    name: "Health Navigator",
    status: "Active",
    detail: "Routes symptom descriptions to the right speciality with safety guardrails.",
    settings: ["Urgent-symptom escalation", "Arabic & English", "No diagnostic claims"],
  },
  {
    name: "Pre-Visit Assistant",
    status: "Active",
    detail: "Collects structured visit context before the patient arrives.",
    settings: ["5 standard questions", "Free-text answers", "Summary to clinical system"],
  },
  {
    name: "FAQ Assistant",
    status: "Active",
    detail: "Answers questions about branches, timings, insurance and services.",
    settings: ["Branch hours", "Insurance list", "Escalate to reception"],
  },
];

function AiPage() {
  return (
    <div className="grid gap-8">
      <SectionHead title="AI Navigator" subtitle="What patients are asking for, and how the assistants are configured.">
        <DemoBadge />
      </SectionHead>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Most common patient requests" hint="Share of Navigator conversations">
          <ul className="grid gap-4">
            {TOP_REQUESTS.map((r) => (
              <li key={r.name}>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
                  <p className="truncate text-sm font-semibold">{r.name}</p>
                  <p className="font-display text-sm font-bold">{r.value}%</p>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div className="brand-gradient h-full rounded-full" style={{ width: `${r.value * 3}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Patient intent" hint="Why patients open the Navigator">
          <IntentPie data={PATIENT_INTENT} height={300} />
        </Panel>
      </div>

      <div>
        <h3 className="font-display text-lg font-bold">AI Assistant configuration</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          A visual demonstration of how the platform would be configured. These controls are not active in the demo.
        </p>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {ASSISTANTS.map((a) => (
            <div key={a.name} className="surface p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <h4 className="min-w-0 truncate font-display font-bold">{a.name}</h4>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-accent-foreground">
                  <span className="size-1.5 rounded-full bg-success" /> {a.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{a.detail}</p>
              <ul className="mt-4 grid gap-2">
                {a.settings.map((s) => (
                  <li key={s} className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Panel title="Safety guardrails" hint="Applied to every Navigator conversation">
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <li>The assistant never presents itself as a doctor.</li>
          <li>No diagnosis or definitive medical conclusions are given.</li>
          <li>Potentially serious symptoms trigger an urgent-care pathway.</li>
          <li>A disclaimer accompanies every recommendation.</li>
        </ul>
      </Panel>
    </div>
  );
}
