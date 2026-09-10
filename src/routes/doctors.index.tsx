import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PageHeader, PublicShell } from "@/components/rmc/PublicShell";
import { DoctorCard } from "@/components/rmc/DoctorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { BRANCHES, DOCTORS, SPECIALTIES, specialtyById } from "@/data/rmc";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/doctors/")({
  validateSearch: (search: Record<string, unknown>) => ({
    specialty: typeof search.specialty === "string" ? search.specialty : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Find a Doctor — Royal Medical Center Doha" },
      {
        name: "description",
        content:
          "Search Royal Medical Center doctors by specialty, branch, language, availability and insurance across Lusail and Al Gharrafa.",
      },
      { property: "og:title", content: "Find a Doctor — Royal Medical Center Doha" },
      {
        property: "og:description",
        content: "Filter RMC consultants and specialists and book an appointment in a few taps.",
      },
    ],
  }),
  component: DoctorsPage,
});

const LANGUAGES = ["Arabic", "English", "French", "Urdu", "Turkish"];
const INSURERS = ["QLM", "AXA", "Allianz Care", "MetLife", "Cigna", "Self-pay"];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function DoctorsPage() {
  const { specialty: initialSpecialty } = Route.useSearch();
  const { t } = useLang();

  const [q, setQ] = useState("");
  const [specialty, setSpecialty] = useState<string | undefined>(initialSpecialty);
  const [branch, setBranch] = useState<string | undefined>();
  const [gender, setGender] = useState<string | undefined>();
  const [language, setLanguage] = useState<string | undefined>();
  const [availability, setAvailability] = useState<string | undefined>();
  const [insurance, setInsurance] = useState<string | undefined>();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DOCTORS.filter((d) => {
      const sp = specialtyById(d.specialtyId);
      if (specialty && d.specialtyId !== specialty) return false;
      if (branch && d.branch !== branch) return false;
      if (gender && d.gender !== gender) return false;
      if (language && !d.languages.includes(language)) return false;
      if (availability && d.availability !== availability) return false;
      if (insurance && !d.insurance.includes(insurance)) return false;
      if (!term) return true;
      return (
        d.name.toLowerCase().includes(term) ||
        d.title.toLowerCase().includes(term) ||
        (sp?.name.toLowerCase().includes(term) ?? false) ||
        d.expertise.some((e) => e.toLowerCase().includes(term))
      );
    });
  }, [q, specialty, branch, gender, language, availability, insurance]);

  const activeCount = [specialty, branch, gender, language, availability, insurance].filter(Boolean).length;

  const clearAll = () => {
    setSpecialty(undefined);
    setBranch(undefined);
    setGender(undefined);
    setLanguage(undefined);
    setAvailability(undefined);
    setInsurance(undefined);
  };

  const filterPanel = (
    <div className="grid gap-6">
      <FilterGroup label="Specialty">
        {SPECIALTIES.map((s) => (
          <Chip key={s.id} active={specialty === s.id} onClick={() => setSpecialty(specialty === s.id ? undefined : s.id)}>
            {s.name}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup label="Branch">
        {BRANCHES.map((b) => (
          <Chip key={b.id} active={branch === b.id} onClick={() => setBranch(branch === b.id ? undefined : b.id)}>
            {b.name}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup label="Gender">
        {["female", "male"].map((g) => (
          <Chip key={g} active={gender === g} onClick={() => setGender(gender === g ? undefined : g)}>
            {g === "female" ? "Female doctor" : "Male doctor"}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup label="Language">
        {LANGUAGES.map((l) => (
          <Chip key={l} active={language === l} onClick={() => setLanguage(language === l ? undefined : l)}>
            {l}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup label="Availability">
        {["Today", "This week", "Next week"].map((a) => (
          <Chip key={a} active={availability === a} onClick={() => setAvailability(availability === a ? undefined : a)}>
            {a}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup label="Insurance">
        {INSURERS.map((i) => (
          <Chip key={i} active={insurance === i} onClick={() => setInsurance(insurance === i ? undefined : i)}>
            {i}
          </Chip>
        ))}
      </FilterGroup>
      {activeCount > 0 && (
        <Button variant="ghost" size="sm" onClick={clearAll} className="justify-start text-primary">
          <X className="size-4" /> Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <PublicShell>
      <PageHeader eyebrow="Find a Doctor" title={t("doctors.h1")} subtitle="Search by name, specialty or the condition you'd like reviewed. Filters help you narrow to the right fit.">
        <div className="relative max-w-2xl">
          <Search className="pointer-events-none absolute inset-y-0 start-4 my-auto size-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("doctors.search")}
            className="h-14 rounded-xl border-border bg-card ps-11 text-base shadow-[var(--shadow-card)]"
          />
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="surface sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto p-5">{filterPanel}</div>
        </aside>

        <div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <p className="min-w-0 truncate text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{results.length}</span> doctors
              {activeCount > 0 ? ` · ${activeCount} filters active` : ""}
            </p>
            <Button variant="quiet" size="sm" className="lg:hidden" onClick={() => setFiltersOpen((v) => !v)}>
              <SlidersHorizontal className="size-4" /> Filters
            </Button>
          </div>

          {filtersOpen && <div className="surface mt-4 p-5 lg:hidden">{filterPanel}</div>}

          {results.length === 0 ? (
            <div className="surface mt-6 grid place-items-center gap-3 p-14 text-center">
              <Search className="size-8 text-muted-foreground" />
              <h3 className="font-display text-lg font-bold">No doctors match these filters</h3>
              <p className="max-w-sm text-sm text-muted-foreground">
                Try removing a filter, or let the Health Navigator suggest the right specialty for your symptoms.
              </p>
              <Button variant="hero" size="sm" onClick={clearAll}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicShell>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</h3>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function DoctorsSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-56 rounded-2xl" />
      ))}
    </div>
  );
}
