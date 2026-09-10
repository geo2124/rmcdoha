import type { ReactNode } from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHead({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 grid gap-4 sm:flex sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h2 className="font-display text-xl font-extrabold sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function Panel({ title, hint, children, className }: { title?: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("surface p-5 sm:p-6", className)}>
      {title && (
        <header className="mb-5">
          <h3 className="font-display text-base font-bold">{title}</h3>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </header>
      )}
      {children}
    </section>
  );
}

export function KpiCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="surface lift p-5">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-3 font-display text-3xl font-extrabold text-primary-deep">{value}</p>
      <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-success">
        <TrendingUp className="size-3.5" /> {delta} vs last period
      </p>
    </div>
  );
}

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-sand px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-foreground/70">
      Demo Data
    </span>
  );
}
