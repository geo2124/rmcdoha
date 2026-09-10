import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DemoBadge, Panel, SectionHead } from "@/components/rmc/admin-ui";
import { ADMIN_APPOINTMENTS, NEXT_DATES, branchById, doctorById, specialtyById } from "@/data/rmc";
import { useDemo } from "@/lib/demo-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/appointments")({
  component: AdminAppointments,
});

const FILTERS = ["All", "Requested", "Confirmed", "Pre-visit pending"] as const;

function AdminAppointments() {
  const { appointments } = useDemo();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const sessionRows = appointments.map((a) => ({
    id: a.id,
    patient: `${a.patient.name.split(" ")[0]} ${a.patient.name.split(" ")[1]?.[0] ?? ""}.`,
    specialty: specialtyById(a.specialtyId)?.name ?? "—",
    doctor: doctorById(a.doctorId)?.name ?? "—",
    branch: branchById(a.branch).name,
    date: `${NEXT_DATES.find((d) => d.iso === a.date)?.label ?? a.date} · ${a.time}`,
    status: "Requested",
  }));

  const rows = [...sessionRows, ...ADMIN_APPOINTMENTS].filter(
    (r) => filter === "All" || r.status === filter,
  );

  return (
    <div className="grid gap-8">
      <SectionHead title="Appointments" subtitle="Requests arriving from the digital front door, ready for reception to confirm.">
        <DemoBadge />
      </SectionHead>

      <Panel>
        <div className="mb-5 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {rows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No appointments with this status.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] text-sm">
              <thead>
                <tr className="border-b border-border text-start text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="px-3 py-3 text-start font-bold">Reference</th>
                  <th className="px-3 py-3 text-start font-bold">Patient</th>
                  <th className="px-3 py-3 text-start font-bold">Specialty</th>
                  <th className="px-3 py-3 text-start font-bold">Doctor</th>
                  <th className="px-3 py-3 text-start font-bold">Branch</th>
                  <th className="px-3 py-3 text-start font-bold">Date</th>
                  <th className="px-3 py-3 text-start font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-border/70 last:border-0">
                    <td className="px-3 py-3.5 font-semibold">{r.id}</td>
                    <td className="px-3 py-3.5 text-muted-foreground">{r.patient}</td>
                    <td className="px-3 py-3.5">{r.specialty}</td>
                    <td className="px-3 py-3.5 text-muted-foreground">{r.doctor}</td>
                    <td className="px-3 py-3.5 text-muted-foreground">{r.branch}</td>
                    <td className="px-3 py-3.5 text-muted-foreground">{r.date}</td>
                    <td className="px-3 py-3.5">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider",
                          r.status === "Confirmed" && "bg-accent text-accent-foreground",
                          r.status === "Requested" && "bg-sand text-foreground/70",
                          r.status === "Pre-visit pending" && "bg-muted text-muted-foreground",
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-5 text-xs text-muted-foreground">
          Patient identifiers are anonymised. Any booking you make in the patient demo appears at the top of this list.
        </p>
      </Panel>
    </div>
  );
}
