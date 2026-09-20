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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const CATEGORIES = [
  "All",
  "Medical Departments",
  "Pharmacy & Laboratory Exams",
  "Med Technologies",
] as const;

function ServicesPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const items = category === "All" ? SERVICES : SERVICES.filter((s) => s.category === category);

  return (
    <PublicShell>
      <PageHeader
        eyebrow="Services"
        title="Everything under one roof."
        subtitle="Browse RMC’s published medical departments, pharmacy and laboratory services, and medical technologies."
      >
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              type="button"
              variant={category === c ? "hero" : "quiet"}
              size="sm"
              onClick={() => setCategory(c)}
              className={cn("rounded-md", category !== c && "text-muted-foreground")}
            >
              {c}
            </Button>
          ))}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, index) => (
            <article key={s.id} className="group flex min-h-72 flex-col gap-4 bg-card p-7 transition-colors hover:bg-primary-deep hover:text-primary-foreground">
              <div className="flex items-start justify-between">
                <IconTile name={s.icon} className="size-12" />
                <span className="text-xs font-bold text-primary/50">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-primary">{s.category}</p>
                 <h3 className="mt-1 font-display text-xl font-bold text-primary-deep group-hover:text-primary-foreground">{s.name}</h3>
                 <p className="mt-2 text-sm text-muted-foreground group-hover:text-primary-foreground/60">{s.description}</p>
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
