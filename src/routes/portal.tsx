import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarDays,
  ClipboardList,
  FileText,
  FlaskConical,
  MapPin,
  Pill,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { PublicShell } from "@/components/rmc/PublicShell";
import { DoctorAvatar } from "@/components/rmc/DoctorCard";
import { Button } from "@/components/ui/button";
import { branchById, doctorById, specialtyById, NEXT_DATES } from "@/data/rmc";
import { PREVISIT_LABELS } from "@/lib/navigator-engine";
import { useDemo } from "@/lib/demo-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Patient Portal — Royal Medical Center Doha" },
      {
        name: "description",
        content:
          "View upcoming appointments, medical documents, lab results, prescriptions and follow-ups in the Royal Medical Center patient portal demo.",
      },
      { property: "og:title", content: "Patient Portal — Royal Medical Center Doha" },
      { property: "og:description", content: "Your appointments and follow-up care in one place." },
    ],
  }),
  component: PortalPage,
});

const TABS = [
  { id: "appointments", label: "Appointments", icon: CalendarDays },
  { id: "documents", label: "Medical Documents", icon: FileText },
  { id: "labs", label: "Lab Results", icon: FlaskConical },
  { id: "prescriptions", label: "Prescriptions", icon: Pill },
  { id: "followups", label: "Follow-Ups", icon: RefreshCw },
] as const;

const DOCS = [
  { name: "Orthopedic consultation note", date: "12 Aug 2026", meta: "Dr. Ahmed Hassan · Lusail" },
  { name: "Knee X-ray report", date: "12 Aug 2026", meta: "Diagnostic Imaging · Lusail" },
  { name: "Annual health screening summary", date: "3 Mar 2026", meta: "Internal Medicine · Al Gharrafa" },
];

const LABS = [
  { name: "Complete blood count", date: "12 Aug 2026", status: "Normal" },
  { name: "Vitamin D, 25-hydroxy", date: "12 Aug 2026", status: "Low" },
  { name: "C-reactive protein", date: "12 Aug 2026", status: "Normal" },
];

const RX = [
  { name: "Paracetamol 500 mg", detail: "As needed, max 4 daily", status: "Active" },
  { name: "Vitamin D3 1000 IU", detail: "One capsule daily", status: "Active" },
  { name: "Topical anti-inflammatory gel", detail: "Twice daily to the knee", status: "Completed" },
];

const FOLLOWUPS = [
  { name: "Orthopedic review", detail: "6 weeks after physiotherapy starts", status: "Scheduled" },
  { name: "Repeat vitamin D level", detail: "After 3 months of supplementation", status: "Due Nov 2026" },
];

function PortalPage() {
  const { appointments, preVisit } = useDemo();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("appointments");

  const booked = appointments[0];
  const doctor = booked ? doctorById(booked.doctorId) : doctorById("ahmed-hassan");
  const specialty = booked ? specialtyById(booked.specialtyId) : specialtyById("orthopedics");
  const branch = booked ? branchById(booked.branch) : branchById("lusail");
  const dateLabel = booked
    ? (NEXT_DATES.find((d) => d.iso === booked.date)?.label ?? booked.date)
    : "September 18";
  const timeLabel = booked?.time ?? "10:30 AM";
  const patientName = booked?.patient.name ?? "Sarah";

  return (
    <PublicShell>
      <section className="soft-gradient border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Patient Portal</p>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Good morning, {patientName.split(" ")[0]}
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Everything about your care at Royal Medical Center, in one place. All records shown are simulated demo data.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <div className="grid gap-6">
          {/* Upcoming appointment */}
          <article className="surface overflow-hidden">
            <div className="brand-gradient px-6 py-4 text-primary-foreground">
              <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-85">Upcoming Appointment</p>
            </div>
            <div className="grid gap-5 p-6 sm:grid-cols-[auto_minmax(0,1fr)]">
              <DoctorAvatar name={doctor!.name} className="size-16 rounded-2xl text-xl" />
              <div className="min-w-0">
                <h2 className="font-display text-xl font-bold">{doctor!.name}</h2>
                <p className="text-sm text-primary">{specialty!.name}</p>
                <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Date", dateLabel],
                    ["Time", timeLabel],
                    ["Branch", branch.name],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">{k}</dt>
                      <dd className="mt-0.5 text-sm font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    variant="hero"
                    size="sm"
                    onClick={() =>
                      toast.info("Appointment details", {
                        description: `${doctor!.name} · ${dateLabel} at ${timeLabel} · ${branch.name}`,
                      })
                    }
                  >
                    View Appointment
                  </Button>
                  <Button asChild variant="quiet" size="sm">
                    <a href={branch.directions} target="_blank" rel="noreferrer">
                      <MapPin className="size-4" /> Get Directions
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* My care */}
          <article className="surface p-6">
            <h2 className="font-display text-xl font-bold">My Care</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {TABS.map((tItem) => (
                <button
                  key={tItem.id}
                  type="button"
                  onClick={() => setTab(tItem.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors",
                    tab === tItem.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  <tItem.icon className="size-3.5" /> {tItem.label}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-3">
              {tab === "appointments" &&
                (appointments.length === 0 ? (
                  <EmptyState
                    title="No appointments requested yet in this session"
                    body="Book an appointment and it will appear here instantly."
                    cta={{ to: "/appointments", label: "Request an appointment" }}
                  />
                ) : (
                  appointments.map((a) => (
                    <Row
                      key={a.id}
                      title={`${doctorById(a.doctorId)?.name} · ${specialtyById(a.specialtyId)?.name}`}
                      meta={`${NEXT_DATES.find((d) => d.iso === a.date)?.label ?? a.date} at ${a.time} · ${branchById(a.branch).name}`}
                      badge={a.id}
                    />
                  ))
                ))}

              {tab === "documents" &&
                DOCS.map((d) => <Row key={d.name} title={d.name} meta={`${d.date} · ${d.meta}`} badge="PDF" />)}

              {tab === "labs" &&
                LABS.map((l) => <Row key={l.name} title={l.name} meta={l.date} badge={l.status} />)}

              {tab === "prescriptions" &&
                RX.map((r) => <Row key={r.name} title={r.name} meta={r.detail} badge={r.status} />)}

              {tab === "followups" &&
                FOLLOWUPS.map((f) => <Row key={f.name} title={f.name} meta={f.detail} badge={f.status} />)}
            </div>
          </article>
        </div>

        <aside className="grid gap-6">
          <div className="surface p-6">
            <h2 className="font-display text-lg font-bold">Pre-visit summary</h2>
            {preVisit ? (
              <dl className="mt-4 grid gap-3">
                {preVisit.answers.map((a, i) => (
                  <div key={i}>
                    <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {PREVISIT_LABELS[i]}
                    </dt>
                    <dd className="mt-0.5 text-sm">{a}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                No pre-visit questionnaire completed yet. It appears right after you book an appointment.
              </p>
            )}
          </div>

          <div className="surface p-6">
            <span className="brand-gradient grid size-11 place-items-center rounded-xl text-primary-foreground">
              <Sparkles className="size-5" />
            </span>
            <h2 className="mt-4 font-display text-lg font-bold">New concern?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The Health Navigator can suggest the right speciality before you book.
            </p>
            <Button asChild variant="hero" size="sm" className="mt-4 w-full">
              <Link to="/navigator">Open Health Navigator</Link>
            </Button>
          </div>

          <div className="surface p-6">
            <h2 className="font-display text-lg font-bold">Care team notes</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ClipboardList className="mt-0.5 size-4 shrink-0 text-primary" />
                Bring previous imaging reports to your orthopedic review.
              </li>
              <li className="flex items-start gap-2">
                <ClipboardList className="mt-0.5 size-4 shrink-0 text-primary" />
                Arrive 15 minutes early for registration and insurance verification.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </PublicShell>
  );
}

function Row({ title, meta, badge }: { title: string; meta: string; badge: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-border p-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{meta}</p>
      </div>
      <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-accent-foreground">
        {badge}
      </span>
    </div>
  );
}

function EmptyState({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta: { to: string; label: string };
}) {
  return (
    <div className="grid place-items-center gap-3 rounded-2xl border border-dashed border-border p-10 text-center">
      <CalendarDays className="size-7 text-muted-foreground" />
      <p className="font-display font-bold">{title}</p>
      <p className="max-w-sm text-sm text-muted-foreground">{body}</p>
      <Button asChild variant="hero" size="sm">
        <Link to={cta.to as "/appointments"}>{cta.label}</Link>
      </Button>
    </div>
  );
}
