import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Award,
  BadgeCheck,
  CalendarClock,
  Languages,
  MapPin,
  Phone,
  Stethoscope,
} from "lucide-react";
import { PublicShell } from "@/components/rmc/PublicShell";
import { DoctorAvatar, DoctorCard } from "@/components/rmc/DoctorCard";
import { Button } from "@/components/ui/button";
import { branchById, doctorById, doctorsBySpecialty, specialtyById } from "@/data/rmc";

const DEMO_SLOTS = ["09:30", "11:00", "12:30", "16:00", "17:30", "18:45"];

export const Route = createFileRoute("/doctors/$doctorId")({
  loader: ({ params }) => {
    const doctor = doctorById(params.doctorId);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Doctor unavailable — Royal Medical Center" }, { name: "robots", content: "noindex" }] };
    }
    const { doctor } = loaderData;
    const specialty = specialtyById(doctor.specialtyId)?.name ?? "Specialist";
    const title = `${doctor.name} — ${specialty} | Royal Medical Center`;
    const description = `${doctor.name}, ${doctor.title} at Royal Medical Center, Doha. Areas of care: ${doctor.expertise.slice(0, 3).join(", ")}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: DoctorProfile,
});

function DoctorProfile() {
  const { doctor } = Route.useLoaderData();
  const specialty = specialtyById(doctor.specialtyId);
  const branch = branchById(doctor.branch);
  const colleagues = doctorsBySpecialty(doctor.specialtyId).filter((d) => d.id !== doctor.id);

  return (
    <PublicShell>
      <section className="soft-gradient border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <nav className="text-xs text-muted-foreground">
            <Link to="/doctors" className="hover:text-primary">
              Find a Doctor
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{doctor.name}</span>
          </nav>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5">
              <DoctorAvatar
                name={doctor.name}
                {...(doctor.imageUrl ? { imageUrl: doctor.imageUrl } : {})}
                className="size-20 rounded-3xl text-2xl sm:size-24"
              />
              <div className="min-w-0">
                <h1 className="text-2xl font-extrabold sm:text-4xl">{doctor.name}</h1>
                <p className="mt-1 text-base font-semibold text-primary">{specialty?.name}</p>
                <p className="text-sm text-muted-foreground">{doctor.title}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" /> Royal Medical Center, Doha
                  </span>
                  {doctor.languages && doctor.languages.length > 0 && (
                    <span className="inline-flex items-center gap-1.5">
                      <Languages className="size-3.5" /> {doctor.languages.join(", ")}
                    </span>
                  )}
                  {doctor.experience !== undefined && (
                    <span className="inline-flex items-center gap-1.5">
                      <Award className="size-3.5" /> {doctor.experience} years of experience
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-foreground">
                    <CalendarClock className="size-3.5 text-primary" /> Call reception to confirm availability
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/appointments" search={{ doctor: doctor.id }}>
                  Book Appointment
                </Link>
              </Button>
              <Button
                variant="quiet"
                size="xl"
                onClick={() =>
                  toast.success("Call-back request noted", {
                    description: `Demo only — in production, ${branch.name} reception would call you back.`,
                  })
                }
              >
                <Phone className="size-4" /> Request a Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="grid gap-6">
          <article className="surface p-6">
            <h2 className="font-display text-xl font-bold">About the doctor</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {doctor.about ??
                `${doctor.name} practises at Royal Medical Center, Doha as ${doctor.title}. Profile details are published on the official Royal Medical Center website.`}
            </p>
            <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Areas of expertise
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {doctor.expertise.map((e) => (
                <li key={e} className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
                  {e}
                </li>
              ))}
            </ul>
            <a
              href={doctor.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex text-xs font-semibold text-primary hover:underline"
            >
              View the official Royal Medical Center profile
            </a>
          </article>

          <article className="surface p-6">
            <h2 className="font-display text-xl font-bold">Services offered</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {doctor.services.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" /> {s}
                </li>
              ))}
            </ul>
            {doctor.consultation && doctor.consultation.length > 0 && (
              <>
                <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Consultation type
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{doctor.consultation.join(" · ")}</p>
              </>
            )}
          </article>

          {doctor.credentials && doctor.credentials.length > 0 && (
            <article className="surface p-6">
              <h2 className="font-display text-xl font-bold">Credentials</h2>
              <ul className="mt-4 grid gap-2.5">
                {doctor.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Stethoscope className="mt-0.5 size-4 shrink-0 text-primary" /> {c}
                  </li>
                ))}
              </ul>
            </article>
          )}
        </div>

        <aside className="grid gap-6">
          <div className="surface p-6">
            <h2 className="font-display text-lg font-bold">Appointment times</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Simulated demo times — Royal Medical Center confirms the real slot by phone.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {(doctor.slots ?? DEMO_SLOTS).map((slot) => (
                <Button key={slot} asChild variant="soft" size="sm">
                  <Link to="/appointments" search={{ doctor: doctor.id, time: slot }}>
                    {slot}
                  </Link>
                </Button>
              ))}
            </div>
            <Button asChild variant="hero" size="lg" className="mt-5 w-full">
              <Link to="/appointments" search={{ doctor: doctor.id }}>
                Book Appointment
              </Link>
            </Button>
          </div>

          <div className="surface p-6">
            <h2 className="font-display text-lg font-bold">Branch & contact</h2>
            <p className="mt-3 text-sm font-semibold">{branch.name}</p>
            <p className="text-sm text-muted-foreground">{branch.address}</p>
            <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="mt-2 inline-flex items-center gap-2 text-sm text-primary">
              <Phone className="size-3.5" /> {branch.phone}
            </a>
            {doctor.insurance && doctor.insurance.length > 0 && (
              <>
                <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Accepted insurance
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{doctor.insurance.join(" · ")}</p>
              </>
            )}
          </div>
        </aside>
      </div>

      {colleagues.length > 0 && (
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-extrabold">Other {specialty?.name} doctors</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {colleagues.slice(0, 3).map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          </div>
        </section>
      )}
    </PublicShell>
  );
}
