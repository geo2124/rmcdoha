import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarPlus,
  Check,
  CircleCheck,
  MapPin,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { PublicShell } from "@/components/rmc/PublicShell";
import { DoctorAvatar } from "@/components/rmc/DoctorCard";
import { IconTile } from "@/components/rmc/SpecialtyIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BRANCHES,
  NEXT_DATES,
  SPECIALTIES,
  branchById,
  doctorById,
  doctorsBySpecialty,
  specialtyById,
  type BranchId,
} from "@/data/rmc";
import { PREVISIT_LABELS, PREVISIT_QUESTIONS } from "@/lib/navigator-engine";
import { useDemo, type Appointment } from "@/lib/demo-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/appointments")({
  validateSearch: (search: Record<string, unknown>) => ({
    doctor: typeof search.doctor === "string" ? search.doctor : undefined,
    specialty: typeof search.specialty === "string" ? search.specialty : undefined,
    time: typeof search.time === "string" ? search.time : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Request an Appointment — Royal Medical Center Doha" },
      {
        name: "description",
        content:
          "Choose a speciality, doctor, branch, date and time to request an appointment at Royal Medical Center Lusail or Al Gharrafa.",
      },
      { property: "og:title", content: "Request an Appointment — Royal Medical Center Doha" },
      { property: "og:description", content: "A guided appointment request in a few simple steps." },
    ],
  }),
  component: AppointmentsPage,
});

const STEP_LABELS = ["Specialty", "Doctor", "Branch", "Date", "Time", "Your details", "Confirm"];

function AppointmentsPage() {
  const search = Route.useSearch();
  const { confirmBooking } = useDemo();

  const preselectedDoctor = search.doctor ? doctorById(search.doctor) : undefined;
  const [step, setStep] = useState(preselectedDoctor ? 2 : search.specialty ? 1 : 0);
  const [specialtyId, setSpecialtyId] = useState<string | undefined>(
    preselectedDoctor?.specialtyId ?? search.specialty,
  );
  const [doctorId, setDoctorId] = useState<string | undefined>(preselectedDoctor?.id);
  const [branch, setBranch] = useState<BranchId | undefined>(preselectedDoctor?.branch);
  const [date, setDate] = useState<string | undefined>();
  const [time, setTime] = useState<string | undefined>(search.time);
  const [patient, setPatient] = useState({ name: "", mobile: "", email: "", dob: "", reason: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const doctor = doctorId ? doctorById(doctorId) : undefined;
  const doctors = useMemo(() => (specialtyId ? doctorsBySpecialty(specialtyId) : []), [specialtyId]);

  const goto = (n: number) => {
    setStep(n);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (patient.name.trim().length < 3) e.name = "Please enter your full name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(patient.mobile.trim())) e.mobile = "Please enter a valid mobile number.";
    if (!/^\S+@\S+\.\S+$/.test(patient.email.trim())) e.email = "Please enter a valid email address.";
    if (!patient.dob) e.dob = "Please enter your date of birth.";
    if (patient.reason.trim().length < 4) e.reason = "A short reason helps the care team prepare.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    const appt = confirmBooking({ specialtyId, doctorId, branch, date, time, patient });
    setAppointment(appt);
    goto(6);
    toast.success("Appointment request confirmed", { description: `Reference ${appt.id} · demo data only` });
  };

  if (appointment) {
    return (
      <PublicShell>
        <Confirmation appointment={appointment} />
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <section className="soft-gradient border-b border-border">
        <div ref={topRef} className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Appointments</p>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Request an appointment</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Seven short steps. You'll receive a request reference at the end — our team confirms the final time.
          </p>

          <ol className="mt-8 flex flex-wrap gap-2">
            {STEP_LABELS.map((label, i) => (
              <li key={label}>
                <button
                  type="button"
                  disabled={i > step}
                  onClick={() => goto(i)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    i === step && "border-primary bg-primary text-primary-foreground",
                    i < step && "border-primary/30 bg-card text-primary",
                    i > step && "border-border bg-card text-muted-foreground",
                  )}
                >
                  {i < step && <Check className="me-1 inline size-3" />}
                  {i + 1}. {label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="surface p-6 sm:p-8">
          {step === 0 && (
            <Step title="Choose a specialty" hint="Not sure which one? The Health Navigator can suggest one.">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SPECIALTIES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSpecialtyId(s.id);
                      setDoctorId(undefined);
                      goto(1);
                    }}
                    className={cn(
                      "lift grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl border p-4 text-start",
                      specialtyId === s.id ? "border-primary bg-accent" : "border-border bg-card",
                    )}
                  >
                    <IconTile name={s.icon} />
                    <span className="min-w-0">
                      <span className="block truncate font-display text-sm font-bold">{s.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {doctorsBySpecialty(s.id).length} doctors
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <Button asChild variant="soft" size="sm" className="mt-6">
                <Link to="/navigator">
                  <Sparkles className="size-4" /> Ask the Health Navigator instead
                </Link>
              </Button>
            </Step>
          )}

          {step === 1 && (
            <Step title="Choose a doctor" hint={specialtyById(specialtyId!)?.name}>
              <div className="grid gap-3">
                {doctors.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setDoctorId(d.id);
                      setBranch(d.branch);
                      goto(2);
                    }}
                    className={cn(
                      "lift grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border p-4 text-start",
                      doctorId === d.id ? "border-primary bg-accent" : "border-border bg-card",
                    )}
                  >
                    <DoctorAvatar name={d.name} className="size-12 rounded-xl text-base" />
                    <span className="min-w-0">
                      <span className="block truncate font-display font-bold">{d.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {d.title} · {branchById(d.branch).name}
                      </span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-primary" />
                  </button>
                ))}
              </div>
            </Step>
          )}

          {step === 2 && (
            <Step title="Choose a branch" hint={doctor ? `${doctor.name} practises at ${branchById(doctor.branch).name}` : undefined}>
              <div className="grid gap-3 sm:grid-cols-2">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setBranch(b.id);
                      goto(3);
                    }}
                    className={cn(
                      "lift rounded-2xl border p-5 text-start",
                      branch === b.id ? "border-primary bg-accent" : "border-border bg-card",
                    )}
                  >
                    <span className="flex items-center gap-2 font-display font-bold">
                      <MapPin className="size-4 text-primary" /> {b.name}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">{b.address}</span>
                    <span className="mt-2 block text-xs text-primary">{b.phone}</span>
                  </button>
                ))}
              </div>
            </Step>
          )}

          {step === 3 && (
            <Step title="Choose a date" hint="Demo availability for the next two weeks.">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
                {NEXT_DATES.map((d) => (
                  <button
                    key={d.iso}
                    type="button"
                    onClick={() => {
                      setDate(d.iso);
                      goto(4);
                    }}
                    className={cn(
                      "rounded-xl border p-3 text-center transition-colors",
                      date === d.iso ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40",
                    )}
                  >
                    <span className="block text-[0.65rem] uppercase tracking-wider opacity-80">{d.weekday}</span>
                    <span className="mt-1 block font-display text-lg font-bold">{d.day}</span>
                  </button>
                ))}
              </div>
            </Step>
          )}

          {step === 4 && (
            <Step title="Choose a time" hint={date ? NEXT_DATES.find((d) => d.iso === date)?.label : undefined}>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {(doctor?.slots ?? ["09:00", "10:30", "12:00", "16:00"]).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setTime(slot);
                      goto(5);
                    }}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-sm font-semibold transition-colors",
                      time === slot ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40",
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </Step>
          )}

          {step === 5 && (
            <Step title="Your details" hint="Used only within this demo — nothing is transmitted.">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" error={errors.name}>
                  <Input value={patient.name} onChange={(e) => setPatient({ ...patient, name: e.target.value })} placeholder="Sarah Al Ansari" />
                </Field>
                <Field label="Mobile" error={errors.mobile}>
                  <Input value={patient.mobile} onChange={(e) => setPatient({ ...patient, mobile: e.target.value })} placeholder="+974 5000 0000" />
                </Field>
                <Field label="Email" error={errors.email}>
                  <Input type="email" value={patient.email} onChange={(e) => setPatient({ ...patient, email: e.target.value })} placeholder="you@example.com" />
                </Field>
                <Field label="Date of Birth" error={errors.dob}>
                  <Input type="date" value={patient.dob} onChange={(e) => setPatient({ ...patient, dob: e.target.value })} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Reason for visit" error={errors.reason}>
                    <Textarea
                      rows={3}
                      value={patient.reason}
                      onChange={(e) => setPatient({ ...patient, reason: e.target.value })}
                      placeholder="Briefly describe what you'd like reviewed."
                    />
                  </Field>
                </div>
              </div>

              <Summary specialtyId={specialtyId} doctorId={doctorId} branch={branch} date={date} time={time} />

              <Button variant="hero" size="xl" className="mt-6 w-full sm:w-auto" onClick={submit}>
                Confirm appointment request
              </Button>
            </Step>
          )}

          {step > 0 && step < 6 && (
            <Button variant="ghost" size="sm" className="mt-6 text-primary" onClick={() => goto(step - 1)}>
              <ArrowLeft className="size-4" /> Back
            </Button>
          )}
        </div>
      </div>
    </PublicShell>
  );
}

function Step({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="rise">
      <h2 className="font-display text-xl font-bold sm:text-2xl">{title}</h2>
      {hint && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Summary({
  specialtyId,
  doctorId,
  branch,
  date,
  time,
}: {
  specialtyId?: string;
  doctorId?: string;
  branch?: BranchId;
  date?: string;
  time?: string;
}) {
  const rows = [
    ["Specialty", specialtyId ? specialtyById(specialtyId)?.name : "—"],
    ["Doctor", doctorId ? doctorById(doctorId)?.name : "—"],
    ["Branch", branch ? branchById(branch).name : "—"],
    ["Date", date ? NEXT_DATES.find((d) => d.iso === date)?.label : "—"],
    ["Time", time ?? "—"],
  ];
  return (
    <dl className="mt-6 grid gap-3 rounded-2xl bg-muted p-5 sm:grid-cols-5">
      {rows.map(([k, v]) => (
        <div key={k as string} className="min-w-0">
          <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">{k}</dt>
          <dd className="mt-1 truncate text-sm font-semibold">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------- Confirmation + pre-visit */

function Confirmation({ appointment }: { appointment: Appointment }) {
  const doctor = doctorById(appointment.doctorId)!;
  const specialty = specialtyById(appointment.specialtyId)!;
  const branch = branchById(appointment.branch);
  const dateLabel = NEXT_DATES.find((d) => d.iso === appointment.date)?.label ?? appointment.date;

  return (
    <>
      <section className="soft-gradient border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
          <span className="rise mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
            <CircleCheck className="size-9" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">Appointment Request Confirmed</h1>
          <p className="mt-3 text-muted-foreground">
            Reference <span className="font-semibold text-foreground">{appointment.id}</span> · our team will confirm
            the final time by phone.
          </p>

          <dl className="surface mt-8 grid gap-5 p-6 text-start sm:grid-cols-2">
            {[
              ["Doctor", doctor.name],
              ["Specialty", specialty.name],
              ["Date", dateLabel],
              ["Time", appointment.time],
              ["Branch", branch.name],
              ["Patient", appointment.patient.name],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              variant="quiet"
              size="lg"
              onClick={() =>
                toast.success("Calendar file prepared", { description: "Demo only — no file is downloaded." })
              }
            >
              <CalendarPlus className="size-4" /> Add to Calendar
            </Button>
            <Button asChild variant="quiet" size="lg">
              <a href={branch.directions} target="_blank" rel="noreferrer">
                <MapPin className="size-4" /> Get Directions
              </a>
            </Button>
            <Button asChild variant="hero" size="lg">
              <Link to="/portal">View Appointment</Link>
            </Button>
          </div>
        </div>
      </section>

      <PreVisitAssistant appointmentId={appointment.id} reason={appointment.patient.reason} />
    </>
  );
}

function PreVisitAssistant({ appointmentId, reason }: { appointmentId: string; reason: string }) {
  const { savePreVisit } = useDemo();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [input, setInput] = useState(reason);
  const [complete, setComplete] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = input.trim();
    if (!clean) return;
    const next = [...answers, clean];
    setAnswers(next);
    setInput("");
    if (index + 1 < PREVISIT_QUESTIONS.length) {
      setIndex(index + 1);
    } else {
      setComplete(true);
      savePreVisit({ appointmentId, answers: next });
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="surface overflow-hidden">
        <div className="border-b border-border p-6 sm:p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground">
            <Sparkles className="size-3.5" /> Pre-visit assistant
          </span>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">Prepare for your appointment</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Answer a few quick questions so your care team can better understand your visit.
          </p>
        </div>

        {!complete ? (
          <form onSubmit={submit} className="p-6 sm:p-8">
            <div className="flex items-center gap-2">
              {PREVISIT_QUESTIONS.map((_, i) => (
                <span
                  key={i}
                  className={cn("h-1.5 flex-1 rounded-full", i <= index ? "bg-primary" : "bg-muted")}
                />
              ))}
            </div>
            <p className="mt-6 font-display text-lg font-bold">{PREVISIT_QUESTIONS[index]}</p>
            <Textarea
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              className="mt-4"
            />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button type="submit" variant="hero" size="lg" disabled={!input.trim()}>
                {index + 1 === PREVISIT_QUESTIONS.length ? "Finish" : "Next"} <ArrowRight className="size-4" />
              </Button>
              <span className="text-xs text-muted-foreground">
                Question {index + 1} of {PREVISIT_QUESTIONS.length}
              </span>
            </div>
          </form>
        ) : (
          <div className="rise p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold">Pre-Visit Summary</h3>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {answers.map((a, i) => (
                <div key={i} className="rounded-2xl bg-muted p-4">
                  <dt className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    {PREVISIT_LABELS[i]}
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm font-semibold text-primary">
              Your information has been prepared for your care team.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Demo: This information would be securely transmitted to the medical center's clinical system in a
              production deployment.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-6">
              <Link to="/portal">
                Go to Patient Portal <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
