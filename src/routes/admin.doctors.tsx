import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { DemoBadge, Panel, SectionHead } from "@/components/rmc/admin-ui";
import { DoctorAvatar } from "@/components/rmc/DoctorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DOCTORS, DOCTOR_LOAD, branchById, specialtyById } from "@/data/rmc";

export const Route = createFileRoute("/admin/doctors")({
  component: AdminDoctors,
});

function AdminDoctors() {
  const [q, setQ] = useState("");
  const rows = DOCTORS.filter((d) => {
    const term = q.trim().toLowerCase();
    if (!term) return true;
    return (
      d.name.toLowerCase().includes(term) ||
      (specialtyById(d.specialtyId)?.name.toLowerCase().includes(term) ?? false)
    );
  });

  return (
    <div className="grid gap-8">
      <SectionHead title="Doctors" subtitle="Roster, digital demand and availability status across both branches.">
        <DemoBadge />
      </SectionHead>

      <Panel>
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search doctors or specialties"
          className="mb-5 max-w-sm"
        />

        {rows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No doctors match that search.
          </p>
        ) : (
          <ul className="grid gap-3">
            {rows.map((d) => (
              <li
                key={d.id}
                className="grid gap-4 rounded-2xl border border-border p-4 sm:grid-cols-[auto_minmax(0,1.4fr)_minmax(0,1fr)_auto] sm:items-center"
              >
                <DoctorAvatar name={d.name} className="size-11 rounded-xl text-sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{d.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {specialtyById(d.specialtyId)?.name} · {branchById(d.branch).name}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Digital appointments (30 days)</p>
                  <div className="mt-1.5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="brand-gradient h-full rounded-full" style={{ width: `${(DOCTOR_LOAD[d.id] / 50) * 100}%` }} />
                    </div>
                    <span className="text-xs font-bold">{DOCTOR_LOAD[d.id]}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-accent px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-accent-foreground">
                    {d.availability}
                  </span>
                  <Button
                    variant="quiet"
                    size="sm"
                    onClick={() =>
                      toast.info(d.name, {
                        description: `${d.title} · ${d.languages.join(", ")} · next available ${d.nextAvailable}`,
                      })
                    }
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      toast.info("Availability editing", {
                        description: "Demo view only — schedules are managed in the clinical system.",
                      })
                    }
                  >
                    Availability
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
