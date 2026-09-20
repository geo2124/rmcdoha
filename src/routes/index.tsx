import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  HeartPulse,
  MessageSquareHeart,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  MapPin,
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
      { title: "Royal Medical Center Doha — Healthcare, made easier." },
      {
        name: "description",
        content:
          "Connect with the right doctor, service and next step at Royal Medical Center Doha through one simple digital experience.",
      },
      { property: "og:title", content: "Royal Medical Center Doha — Healthcare, made easier." },
      {
        property: "og:description",
        content: "Find the right care, book appointments and prepare for your visit at RMC Al Hilal and Al Gharrafa.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLang();

  const helpCards = [
    { icon: "HeartPulse", title: "card1.title", body: "card1.body", cta: "card1.cta", to: "/navigator" },
    { icon: "Stethoscope", title: "card2.title", body: "card2.body", cta: "card2.cta", to: "/doctors" },
    { icon: "ClipboardCheck", title: "card3.title", body: "card3.body", cta: "card3.cta", to: "/appointments" },
    { icon: "Smile", title: "card4.title", body: "card4.body", cta: "card4.cta", to: "/portal" },
  ] as const;

  return (
    <PublicShell>
      <section className="px-4 pb-12 pt-6 sm:px-6 lg:pb-20 lg:pt-10">
        <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-lift)] lg:min-h-[660px] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <p className="inline-flex w-fit items-center gap-2 rounded-md bg-primary-soft px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-primary-deep">
              <ShieldCheck className="size-3.5" /> {t("home.eyebrow")}
            </p>
            <h1 className="mt-7 max-w-xl text-5xl font-extrabold leading-[1.02] text-primary-deep sm:text-6xl lg:text-7xl">
              {t("home.h1")}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("home.sub")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/navigator">
                  {t("home.cta1")} <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="quiet" size="xl">
                <Link to="/appointments">{t("home.cta2")}</Link>
              </Button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 border-t border-border pt-5 text-xs text-muted-foreground">
              <span className="pe-3"><strong className="block text-lg text-primary-deep">{SPECIALTIES.length}</strong>{t("home.stat1")}</span>
              <span className="border-s border-border px-3"><strong className="block text-lg text-primary-deep">{DOCTORS.length}</strong>Published doctors</span>
              <span className="border-s border-border ps-3"><strong className="block text-lg text-primary-deep">2</strong>Doha branches</span>
            </div>
          </div>

          <div className="relative min-h-[380px] lg:min-h-full">
            <img
              src={heroImage}
              alt="Reception area of Royal Medical Center in Doha with a patient speaking to a clinician"
              width={1600}
              height={1200}
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-deep/85 to-transparent p-6 pt-24 text-primary-foreground sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{t("home.cardEyebrow")}</p>
              <p className="mt-2 max-w-sm text-sm text-primary-foreground/85">{t("home.cardBody")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How can we help */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{t("home.help")}</h2>
          <p className="mt-3 text-muted-foreground">{t("home.helpSub")}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {helpCards.map((card) => (
            <Link key={card.to} to={card.to} className="surface lift group flex min-h-64 flex-col gap-4 p-6">
              <IconTile name={card.icon} className="size-12 group-hover:bg-primary group-hover:text-primary-foreground" />
              <div>
                <h3 className="font-display text-lg font-bold">{t(card.title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(card.body)}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {t(card.cta)} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Journey strip */}
      <section className="border-y border-primary-deep bg-primary-deep text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{t("home.storyEyebrow")}</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                {t("home.storyH2")}
              </h2>
              <p className="mt-4 text-primary-foreground/70">
                {t("home.storyBody")}
              </p>
              <Button asChild variant="soft" size="lg" className="mt-6">
                <Link to="/admin">
                  {t("home.storyCta")} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <ol className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: MessageSquareHeart, title: t("home.step1"), body: t("home.step1body") },
                { icon: Stethoscope, title: t("home.step2"), body: t("home.step2body") },
                { icon: CalendarDays, title: t("home.step3"), body: t("home.step3body") },
                { icon: HeartPulse, title: t("home.step4"), body: t("home.step4body") },
              ].map((step, i) => (
                <li key={step.title} className="rounded-md border border-primary-foreground/15 bg-primary-foreground/7 p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-lg bg-primary-soft text-xs font-bold text-primary-deep">
                      {i + 1}
                    </span>
                    <step.icon className="size-5 text-gold" strokeWidth={1.6} />
                  </div>
                  <p className="mt-3 font-display font-bold">{step.title}</p>
                  <p className="mt-1 text-sm text-primary-foreground/65">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Specialities preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-4 sm:flex sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">{t("home.specH2")}</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {t("home.specSub")}
            </p>
          </div>
          <Button asChild variant="quiet">
            <Link to="/specialities">{t("home.specAll")}</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALTIES.slice(0, 6).map((s, index) => (
            <Link
              key={s.id}
              to="/doctors"
              search={{ specialty: s.id }}
              className="group grid min-h-44 grid-cols-[auto_minmax(0,1fr)] content-between gap-4 bg-card p-6 transition-colors hover:bg-primary-soft"
            >
              <span className="text-xs font-bold text-primary/60">0{index + 1}</span>
              <span className="min-w-0">
                <IconTile name={s.icon} className="mb-5" />
                <span className="block font-display text-lg font-bold text-primary-deep">{s.name}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{s.blurb}</span>
              </span>
              <ArrowUpRight className="col-start-2 size-4 shrink-0 justify-self-end text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured doctors */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid gap-4 sm:flex sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold sm:text-4xl">{t("home.docH2")}</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                {t("home.docSub")}
              </p>
            </div>
            <Button asChild variant="quiet">
              <Link to="/doctors">{t("nav.doctors")}</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DOCTORS.slice(0, 3).map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Royal Medical Center Doha</p>
            <h2 className="mt-3 text-3xl font-extrabold text-primary-deep sm:text-4xl">Care within reach.</h2>
            <p className="mt-3 max-w-md text-muted-foreground">Contact either RMC branch directly for appointments and current availability.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {BRANCHES.map((branch) => (
              <a key={branch.id} href={branch.directions} target="_blank" rel="noreferrer" className="group bg-card p-6 transition-colors hover:bg-primary-soft">
                <MapPin className="size-5 text-primary" />
                <h3 className="mt-5 text-xl font-bold text-primary-deep">{branch.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{branch.address}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">{branch.phone}<ArrowUpRight className="size-4" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency band */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid items-center gap-6 rounded-3xl border border-urgent/25 bg-urgent-soft p-7 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-extrabold text-urgent">{t("home.urgentH2")}</h2>
            <p className="mt-2 text-sm text-foreground/80">
              {t("home.urgentBody")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="urgent" size="lg">
              <Link to="/emergency">{t("home.urgentCta")}</Link>
            </Button>
            <Button asChild variant="quiet" size="lg">
              <a href="tel:+97444502050">
                <Phone className="size-4" /> {t("home.callLusail")}
              </a>
            </Button>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/admin" className="underline decoration-dotted underline-offset-4 hover:text-primary">
            {t("home.managementDemo")}
          </Link>
        </p>
      </section>
    </PublicShell>
  );
}
