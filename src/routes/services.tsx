import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, PublicShell } from "@/components/rmc/PublicShell";
import { IconTile } from "@/components/rmc/SpecialtyIcon";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/rmc";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Royal Medical Center Doha" },
      {
        name: "description",
        content:
          "Clinical services, diagnostics, laboratory, pharmacy and specialized procedures at Royal Medical Center Doha.",
      },
      { property: "og:title", content: "Services — Royal Medical Center Doha" },
      {
        property: "og:description",
        content: "From consultations and imaging to laboratory, pharmacy and day surgery — all in one place.",
      },
    ],
  }),
  component: ServicesPage,
});

const CATEGORIES = [
  "All",
  "Clinical Services",
  "Diagnostics",
  "Laboratory",
  "Pharmacy",
  "Specialized Procedures",
] as const;

function ServicesPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const items = category === "All" ? SERVICES : SERVICES.filter((s) => s.category === category);

  return (
    <PublicShell>
      <PageHeader
        eyebrow="Services"
        title="Everything under one roof."
        subtitle="Consultations, diagnostics, laboratory, pharmacy and procedures — coordinated across both branches."
      >
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <article key={s.id} className="surface lift flex h-full flex-col gap-4 p-6">
              <IconTile name={s.icon} className="size-12" />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-primary">{s.category}</p>
                <h3 className="mt-1 font-display text-lg font-bold">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              </div>
              <div className="mt-auto flex flex-wrap gap-2">
                <Button asChild variant="quiet" size="sm" className="flex-1">
                  <Link to="/doctors" search={s.specialtyId ? { specialty: s.specialtyId } : {}}>
                    Find a Doctor
                  </Link>
                </Button>
                <Button asChild variant="hero" size="sm" className="flex-1">
                  <Link to="/appointments" search={s.specialtyId ? { specialty: s.specialtyId } : {}}>
                    Request Appointment
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PublicShell>
  );
}
