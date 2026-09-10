import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "brand-gradient grid size-10 shrink-0 place-items-center rounded-xl text-primary-foreground",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3.2 5 6v5.4c0 4.2 2.9 7.6 7 9.4 4.1-1.8 7-5.2 7-9.4V6l-7-2.8Z" strokeLinejoin="round" />
        <path d="M12 8.6v6.2M8.9 11.7h6.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3">
      <LogoMark />
      <span className={cn("min-w-0 leading-tight", compact && "hidden sm:block")}>
        <span className="block truncate font-display text-[0.94rem] font-extrabold uppercase tracking-[0.1em] text-primary-deep">
          {t("brand.name")}
        </span>
        <span className="block truncate text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
          {t("brand.tagline")}
        </span>
      </span>
    </Link>
  );
}
