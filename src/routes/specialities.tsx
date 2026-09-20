import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader, PublicShell } from "@/components/rmc/PublicShell";
import { IconTile } from "@/components/rmc/SpecialtyIcon";
import { Button } from "@/components/ui/button";
import { SPECIALTIES, doctorsBySpecialty } from "@/data/rmc";

export const Route = createFileRoute("/specialities")({
  head: () => ({
    meta: [
      { title: "Specialities — Royal Medical Center Doha" },
      {
        name: "description",
        content:
          "Explore Royal Medical Center specialities including dermatology, orthopedics, pediatrics, ophthalmology, urology and more.",
      },
      { property: "og:title", content: "Specialities — Royal Medical Center Doha" },
      {
        property: "og:description",
        content: "Explore Royal Medical Center Doha’s published medical departments and doctors.",
      },
    ],
  }),
  component: SpecialitiesPage,
});

function SpecialitiesPage() {
  const groups = ["Clinical Services", "Specialized Procedures", "Diagnostics"] as const;

  return (
    <PublicShell>
      <PageHeader
        eyebrow="Specialities"
        title="Care organised around the way patients think."
        subtitle="Every speciality lists its doctors, what it treats and how soon you can be seen."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {groups.map((group) => {
          const items = SPECIALTIES.filter((s) => s.category === group);
          if (items.length === 0) return null;
          return (
            <section key={group} className="mb-16 grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">RMC Department Group</p>
                <h2 className="mt-2 text-2xl font-bold text-primary-deep">{group}</h2>
                <p className="mt-2 text-sm text-muted-foreground">Explore the published departments and their specialist teams.</p>
              </div>
              <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
                {items.map((s, index) => {
                  const count = doctorsBySpecialty(s.id).length;
                  return (
                    <article key={s.id} className="group flex min-h-72 flex-col gap-4 bg-card p-6 transition-colors hover:bg-primary-soft">
                      <div className="flex items-start justify-between"><IconTile name={s.icon} className="size-12" /><span className="text-xs font-bold text-primary/50">{String(index + 1).padStart(2, "0")}</span></div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-primary-deep">{s.name}</h3>
                        <p className="text-xs text-muted-foreground">{s.nameAr}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
                      </div>
                      <p className="mt-auto text-xs font-semibold text-primary">
                        {count} {count === 1 ? "doctor" : "doctors"} available
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button asChild variant="hero" size="sm" className="flex-1">
                          <Link to="/doctors" search={{ specialty: s.id }}>
                            View specialists <ArrowRight className="size-4" />
                          </Link>
                        </Button>
                        <Button asChild variant="quiet" size="sm">
                          <Link to="/appointments" search={{ specialty: s.id }}>
                            Book
                          </Link>
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </PublicShell>
  );
}
