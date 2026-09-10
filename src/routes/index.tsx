import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  HeartPulse,
  MessageSquareHeart,
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
import { DOCTORS, SPECIALTIES } from "@/data/rmc";
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
        content: "Find the right care, book appointments and prepare for your visit at RMC Lusail and Al Gharrafa.",
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
      {/* Hero */}
      <section className="soft-gradient border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-primary">
              <ShieldCheck className="size-3.5" /> {t("home.eyebrow")}
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              {t("home.h1")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
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

            <Link
              to="/navigator"
              className="surface lift mt-6 flex max-w-md items-center gap-4 p-4"
            >
              <span className="brand-gradient grid size-11 shrink-0 place-items-center rounded-xl text-primary-foreground">
                <Sparkles className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-sm font-bold">✦ {t("home.cta3")}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {t("home.cta3sub")}
                </span>
              </span>
              <ArrowRight className="ms-auto size-4 shrink-0 text-primary" />
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <UserRound className="size-4 text-primary" /> {t("home.stat1")}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" /> {t("home.stat2")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone className="size-4 text-primary" /> {t("home.stat3")}
              </span>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Reception area of Royal Medical Center in Doha with a patient speaking to a clinician"
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full rounded-3xl border border-border object-cover shadow-[var(--shadow-lift)]"
            />
            <div className="surface absolute -bottom-6 start-6 hidden max-w-[15rem] p-4 sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{t("home.cardEyebrow")}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("home.cardBody")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How can we help */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{t("home.help")}</h2>
          <p className="mt-3 text-muted-foreground">{t("home.helpSub")}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {helpCards.map((card) => (
            <Link key={card.to} to={card.to} className="surface lift group flex flex-col gap-4 p-6">
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
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("home.storyEyebrow")}</p>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                {t("home.storyH2")}
              </h2>
              <p className="mt-4 text-muted-foreground">
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
                <li key={step.title} className="surface p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-lg bg-primary-soft text-xs font-bold text-primary-deep">
                      {i + 1}
                    </span>
                    <step.icon className="size-5 text-primary" strokeWidth={1.6} />
                  </div>
                  <p className="mt-3 font-display font-bold">{step.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
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

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALTIES.slice(0, 6).map((s) => (
            <Link
              key={s.id}
              to="/doctors"
              search={{ specialty: s.id }}
              className="surface lift grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4"
            >
              <IconTile name={s.icon} />
              <span className="min-w-0">
                <span className="block truncate font-display font-bold">{s.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{s.blurb}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-primary" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured doctors */}
      <section className="border-t border-border bg-card">
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
