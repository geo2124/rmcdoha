import { Link } from "@tanstack/react-router";
import { CalendarClock, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { branchById, specialtyById, type Doctor } from "@/data/rmc";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function DoctorAvatar({ name, imageUrl, className }: { name: string; imageUrl?: string; className?: string }) {
  if (imageUrl) {
    return <img src={imageUrl} alt={`${name}, Royal Medical Center`} className={cn("size-14 shrink-0 rounded-xl object-cover object-top", className)} />;
  }
  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className={cn(
        "grid size-14 shrink-0 place-items-center rounded-xl bg-primary-soft font-display text-lg font-bold text-primary-deep",
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

  return (
    <article className="surface lift flex h-full flex-col gap-4 p-5">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
        <DoctorAvatar name={doctor.name} imageUrl={doctor.imageUrl} />
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-bold">{doctor.name}</h3>
          <p className="truncate text-sm text-primary">{specialty?.name}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{doctor.title}</p>
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-muted-foreground">{doctor.expertise.join(" · ")}</p>

      <dl className="mt-auto grid gap-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2"><MapPin className="size-3.5 shrink-0" /><span>Royal Medical Center, Doha</span></div>
        <div className="flex items-center gap-2 text-foreground">
          <CalendarClock className="size-3.5 shrink-0 text-primary" />
          <span>Call RMC to confirm availability</span>
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
        <Button asChild variant="ghost" size="icon" title="View official RMC profile">
          <a href={doctor.sourceUrl} target="_blank" rel="noreferrer" aria-label={`View ${doctor.name} on the official RMC website`}><ExternalLink className="size-4" /></a>
        </Button>
      </div>
    </article>
  );
}
