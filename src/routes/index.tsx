import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CalendarDays,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicShell } from "@/components/rmc/PublicShell";
import { IconTile } from "@/components/rmc/SpecialtyIcon";
import { DoctorCard } from "@/components/rmc/DoctorCard";
import { BRANCHES, DOCTORS, SPECIALTIES } from "@/data/rmc";
import { useLang } from "@/lib/i18n";
import heroImage from "@/assets/rmc-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Royal Medical Center Doha — Advanced Care, Connected" },
      { name: "description", content: "Access Royal Medical Center Doha doctors, departments, appointments and patient services through one connected digital experience." },
      { property: "og:title", content: "Royal Medical Center Doha — Advanced Care, Connected" },
      { property: "og:description", content: "Find specialist care, request an appointment and connect with RMC Al Hilal and Al Gharrafa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const quickAccess = [
  { icon: UserRound, title: "Find a doctor", body: "Search RMC’s published specialist team.", to: "/doctors", tone: "primary" },
  { icon: Bot, title: "Health Navigator", body: "Get a safe, guided next step.", to: "/navigator", tone: "gold" },
  { icon: CalendarDays, title: "Appointments", body: "Request a visit in a few steps.", to: "/appointments", tone: "primary" },
] as const;

function Index() {
  const { t } = useLang();

  return (
    <PublicShell>
      <section className="bg-background px-3 py-3 sm:px-5 sm:py-5 lg:px-8 lg:py-8">
        <div className="command-shadow relative mx-auto min-h-[calc(100vh-8.5rem)] max-w-[90rem] overflow-hidden rounded-lg bg-card lg:grid lg:grid-cols-[minmax(0,1.55fr)_minmax(22rem,0.7fr)]">
          <div className="relative flex min-h-[610px] items-end overflow-hidden lg:min-h-[760px]">
            <img src={heroImage} alt="Royal Medical Center clinical reception in Doha" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/55 to-primary-deep/10" />
            <div className="relative z-10 max-w-4xl p-7 text-primary-foreground sm:p-10 lg:p-16">
              <div className="mb-7 inline-flex items-center gap-2 border-s-2 border-gold ps-3 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                <ShieldCheck className="size-4" /> Royal Medical Center · Doha
              </div>
              <h1 className="max-w-3xl text-5xl font-bold leading-[0.98] sm:text-6xl lg:text-8xl">
                Advanced care, <span className="text-primary">connected.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/72 sm:text-lg">
                One precise digital front door to RMC’s doctors, departments and patient services across Doha.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="navigator" size="xl">
                  <Link to="/appointments">Request appointment <ArrowRight /></Link>
                </Button>
                <Button asChild size="xl" className="border border-primary-foreground/25 bg-primary-foreground/8 text-primary-foreground hover:bg-primary-foreground/14">
                  <Link to="/doctors">Find a specialist</Link>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-primary-foreground/15 pt-6">
                {[[SPECIALTIES.length, "Medical departments"], [DOCTORS.length, "Published doctors"], [BRANCHES.length, "Doha branches"]].map(([value, label]) => (
                  <div key={label}>
                    <strong className="font-display text-2xl text-primary-foreground">{value}</strong>
                    <span className="ms-2 text-xs text-primary-foreground/55">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="command-grid relative flex flex-col justify-between bg-primary-deep p-6 text-primary-foreground sm:p-8 lg:p-10">
            <div>
              <div className="flex items-center justify-between border-b border-primary-foreground/15 pb-5">
                <p className="font-display text-xl font-semibold">Patient access</p>
                <span className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
                  <span className="size-1.5 bg-primary" /> Online
                </span>
              </div>
              <div className="mt-6 space-y-3">
                {quickAccess.map((item, index) => (
                  <Link key={item.to} to={item.to} className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-md border border-primary-foreground/12 bg-primary-foreground/7 p-5 backdrop-blur-sm transition-colors hover:border-primary/60 hover:bg-primary-foreground/12">
                    <span className={item.tone === "gold" ? "grid size-11 place-items-center bg-gold/15 text-gold" : "grid size-11 place-items-center bg-primary/15 text-primary"}>
                      <item.icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-semibold">{item.title}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-primary-foreground/48">{item.body}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-primary-foreground/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    <span className="col-start-2 text-[0.6rem] font-bold tracking-[0.16em] text-primary-foreground/25">0{index + 1}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-10 border-t border-primary-foreground/15 pt-6">
              <Link to="/emergency" className="group flex items-center justify-between text-sm font-semibold text-primary-foreground/75 hover:text-primary-foreground">
                <span className="flex items-center gap-3"><HeartPulse className="size-5 text-urgent" /> Emergency information</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Clinical network</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-primary-deep sm:text-5xl">Specialist care without the complexity.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">Explore RMC’s published medical departments and connect directly to the right specialist.</p>
            <Button asChild variant="quiet" className="mt-7">
              <Link to="/specialities">All departments <ArrowRight /></Link>
            </Button>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALTIES.slice(0, 6).map((specialty, index) => (
              <Link key={specialty.id} to="/doctors" search={{ specialty: specialty.id }} className="group min-h-56 bg-card p-6 transition-colors hover:bg-primary-deep hover:text-primary-foreground">
                <div className="flex items-start justify-between">
                  <IconTile name={specialty.icon} className="rounded-sm group-hover:bg-primary/15 group-hover:text-primary" />
                  <span className="text-xs font-bold text-muted-foreground group-hover:text-primary-foreground/35">0{index + 1}</span>
                </div>
                <h3 className="mt-10 text-xl font-bold text-primary-deep group-hover:text-primary-foreground">{specialty.name}</h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground group-hover:text-primary-foreground/55">{specialty.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-deep text-primary-foreground">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-10 lg:py-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">A guided patient journey</p>
            <h2 className="mt-4 max-w-xl text-4xl font-bold leading-tight sm:text-5xl">From uncertainty to the right next step.</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-primary-foreground/60">The RMC Health Navigator safely guides patients toward relevant care without diagnosing or replacing a clinician.</p>
            <Button asChild variant="navigator" size="lg" className="mt-8">
              <Link to="/navigator"><Sparkles /> Start Health Navigator</Link>
            </Button>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-lg bg-primary-foreground/12 sm:grid-cols-2">
            {[
              ["Tell us what you need", "Share a symptom or care goal in your own words."],
              ["Find relevant care", "Review matching RMC departments and doctors."],
              ["Request your visit", "Choose your preferred doctor and branch."],
              ["Prepare with confidence", "Keep your appointment details and next steps together."],
            ].map(([title, body], index) => (
              <li key={title} className="bg-midnight-raised p-7">
                <span className="font-display text-sm font-bold text-primary">0{index + 1}</span>
                <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/52">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">RMC specialists</p>
            <h2 className="mt-4 text-4xl font-bold text-primary-deep sm:text-5xl">Meet your care team.</h2>
          </div>
          <Button asChild variant="quiet"><Link to="/doctors">View all doctors <ArrowRight /></Link></Button>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DOCTORS.slice(0, 3).map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Royal Medical Center Doha</p>
            <h2 className="mt-4 text-4xl font-bold text-primary-deep">Two branches. One standard of care.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {BRANCHES.map((branch) => (
              <a key={branch.id} href={branch.directions} target="_blank" rel="noreferrer" className="group border-s-2 border-primary bg-background p-6 transition-colors hover:bg-primary-soft">
                <MapPin className="size-5 text-primary" />
                <h3 className="mt-7 text-2xl font-bold text-primary-deep">{branch.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{branch.address}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-deep"><Phone className="size-4 text-primary" />{branch.phone}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid items-center gap-6 border border-urgent/25 bg-urgent-soft p-7 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <h2 className="text-2xl font-bold text-urgent">{t("home.urgentH2")}</h2>
            <p className="mt-2 text-sm text-foreground/75">{t("home.urgentBody")}</p>
          </div>
          <Button asChild variant="urgent" size="lg"><Link to="/emergency">{t("home.urgentCta")}</Link></Button>
        </div>
      </section>
    </PublicShell>
  );
}