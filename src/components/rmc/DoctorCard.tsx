import { Link } from "@tanstack/react-router";
import { CalendarClock, Languages, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { branchById, specialtyById, type Doctor } from "@/data/rmc";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function DoctorAvatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className={cn(
        "grid size-14 shrink-0 place-items-center rounded-2xl bg-primary-soft font-display text-lg font-bold text-primary-deep",
        className,
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const { t } = useLang();
  const specialty = specialtyById(doctor.specialtyId);
  const branch = branchById(doctor.branch);

  return (
    <article className="surface lift flex h-full flex-col gap-4 p-5">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
        <DoctorAvatar name={doctor.name} />
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-bold">{doctor.name}</h3>
          <p className="truncate text-sm text-primary">{specialty?.name}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{doctor.title}</p>
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-muted-foreground">{doctor.expertise.join(" · ")}</p>

      <dl className="mt-auto grid gap-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">{branch.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Languages className="size-3.5 shrink-0" />
          <span className="truncate">{doctor.languages.join(", ")}</span>
        </div>
        <div className="flex items-center gap-2 text-foreground">
          <CalendarClock className="size-3.5 shrink-0 text-primary" />
          <span className="truncate">
            {t("common.nextAvailable")}: {doctor.nextAvailable}
          </span>
        </div>
      </dl>

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="hero" size="sm" className="flex-1">
          <Link to="/appointments" search={{ doctor: doctor.id }}>
            {t("common.book")}
          </Link>
        </Button>
        <Button asChild variant="quiet" size="sm" className="flex-1">
          <Link to="/doctors/$doctorId" params={{ doctorId: doctor.id }}>
            {t("common.viewProfile")}
          </Link>
        </Button>
      </div>
    </article>
  );
}
