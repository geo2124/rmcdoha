import { createFileRoute } from "@tanstack/react-router";
import { DemoBadge, Panel, SectionHead } from "@/components/rmc/admin-ui";
import { BRANCHES } from "@/data/rmc";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="grid gap-8">
      <SectionHead title="Settings" subtitle="Read-only in this demonstration environment.">
        <DemoBadge />
      </SectionHead>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Organisation">
          <dl className="grid gap-4 sm:grid-cols-2">
            {[
              ["Name", "Royal Medical Center"],
              ["Location", "Doha, Qatar"],
              ["Branches", "Lusail · Al Gharrafa"],
              ["Languages", "Arabic · English"],
              ["Email", "info@rmcdoha.com"],
              ["Website", "rmcdoha.com"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">{k}</dt>
                <dd className="mt-1 text-sm font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel title="Branches">
          <ul className="grid gap-3">
            {BRANCHES.map((b) => (
              <li key={b.id} className="rounded-2xl border border-border p-4">
                <p className="font-display font-bold">{b.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{b.address}</p>
                <p className="mt-1 text-sm text-primary">{b.phone}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Integrations" hint="Illustrative — not connected in the demo">
          <ul className="grid gap-2">
            {[
              "Clinical / HIS system",
              "SMS & WhatsApp notifications",
              "Insurance eligibility check",
              "Laboratory results delivery",
              "Payment gateway",
            ].map((i) => (
              <li key={i} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-muted px-4 py-3">
                <span className="truncate text-sm">{i}</span>
                <span className="shrink-0 rounded-full bg-card px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-muted-foreground">
                  Not connected
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Data & privacy">
          <p className="text-sm text-muted-foreground">
            This is a demonstration environment. All patient names, appointments, records and analytics figures shown
            in the Command Center are simulated. No real patient data is stored, processed or transmitted, and the
            Health Navigator never provides a diagnosis.
          </p>
        </Panel>
      </div>
    </div>
  );
}
