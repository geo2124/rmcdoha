import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Facebook,
  Home,
  Instagram,
  Mail,
  Menu,
  Phone,
  Sparkles,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo, LogoMark } from "@/components/rmc/Logo";
import { BRANCHES } from "@/data/rmc";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", key: "nav.home" },
  { to: "/doctors", key: "nav.doctors" },
  { to: "/specialities", key: "nav.specialities" },
  { to: "/services", key: "nav.services" },
  { to: "/navigator", key: "nav.navigator" },
  { to: "/appointments", key: "nav.appointments" },
  { to: "/portal", key: "nav.portal" },
] as const;

function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center rounded-md border border-primary-foreground/15 bg-primary-foreground/5 p-0.5 text-xs font-semibold">
      {(["en", "ar"] as const).map((l) => (
        <Button
          key={l}
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setLang(l)}
          className={cn(
            "h-7 rounded px-2.5 py-1 transition-colors",
             lang === l ? "bg-primary text-primary-deep" : "text-primary-foreground/55 hover:text-primary-foreground",
          )}
        >
          {l === "en" ? "English" : "العربية"}
        </Button>
      ))}
    </div>
  );
}

function SiteHeader() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary-foreground/10 bg-midnight text-foreground shadow-[var(--shadow-card)]">
      <div className="mx-auto flex h-[4.75rem] max-w-[90rem] items-center gap-4 px-4 sm:px-6 lg:h-24 lg:px-10">
        <Logo compact />

        <nav className="ms-auto hidden items-center gap-1 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
               className="border-b border-transparent px-2 py-2 text-sm font-medium text-primary-foreground/65 transition-colors hover:text-primary-foreground data-[status=active]:border-primary data-[status=active]:text-primary-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 xl:ms-0">
          <div className="hidden md:block">
            <LanguageToggle />
          </div>
          <Button asChild variant="urgent" size="sm" className="hidden sm:inline-flex">
            <Link to="/emergency">{t("nav.emergency")}</Link>
          </Button>
          <Button asChild variant="hero" size="sm" className="hidden lg:inline-flex">
            <Link to="/appointments">{t("nav.request")}</Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="size-10 border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/10 xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-primary-foreground/10 bg-primary-deep px-4 pb-5 pt-3 xl:hidden">
          <nav className="grid gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-primary-foreground/70 data-[status=active]:bg-primary-foreground/10 data-[status=active]:text-primary-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              to="/emergency"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-urgent"
            >
              {t("nav.emergency")}
            </Link>
          </nav>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <LanguageToggle />
            <Button asChild variant="hero" size="sm">
              <Link to="/appointments" onClick={() => setOpen(false)}>
                {t("nav.request")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

const TABS = [
  { to: "/", icon: Home, key: "nav.home" },
  { to: "/doctors", icon: Stethoscope, key: "nav.doctors" },
  { to: "/appointments", icon: CalendarDays, key: "nav.appointments" },
  { to: "/navigator", icon: Sparkles, key: "nav.ai" },
  { to: "/portal", icon: User, key: "nav.profile" },
] as const;

function MobileTabBar() {
  const { t } = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <ul className="grid grid-cols-5">
        {TABS.map((tab) => {
          const active = tab.to === "/" ? pathname === "/" : pathname.startsWith(tab.to);
          return (
            <li key={tab.to}>
              <Link
                to={tab.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[0.62rem] font-semibold transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <tab.icon className="size-5" strokeWidth={1.8} />
                <span className="truncate px-1">{t(tab.key)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="mt-24 border-t border-primary-foreground/10 bg-midnight text-foreground">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_0.8fr_0.9fr] lg:px-10 lg:py-20">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark />
            <div>
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.1em] text-primary-foreground">
                {t("brand.name")}
              </p>
               <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/65">{t("brand.tagline")}</p>
            </div>
          </div>
           <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            One digital experience connecting our doctors, specialities and services to the people who need them.
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href="https://www.facebook.com/rmcdoha"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
               className="grid size-9 place-items-center rounded-md border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/50 hover:text-primary-foreground"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href="https://www.instagram.com/rmcdoha"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
               className="grid size-9 place-items-center rounded-md border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/50 hover:text-primary-foreground"
            >
              <Instagram className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Branches</h4>
          <ul className="mt-4 space-y-4 text-sm">
            {BRANCHES.map((b) => (
              <li key={b.id}>
                <p className="font-semibold">{b.name}</p>
                <p className="text-primary-foreground/65">{b.address}</p>
                <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="mt-1 inline-flex items-center gap-2 text-primary-foreground">
                  <Phone className="size-3.5" /> {b.phone}
                </a>
              </li>
            ))}
            <li>
              <a href="mailto:info@rmcdoha.com" className="inline-flex items-center gap-2 text-primary-foreground">
                <Mail className="size-3.5" /> info@rmcdoha.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/70">
             <li><Link to="/doctors" className="hover:text-primary-foreground">Doctors</Link></li>
             <li><Link to="/specialities" className="hover:text-primary-foreground">Specialities</Link></li>
             <li><Link to="/services" className="hover:text-primary-foreground">Services</Link></li>
             <li><Link to="/appointments" className="hover:text-primary-foreground">Appointments</Link></li>
             <li><Link to="/navigator" className="hover:text-primary-foreground">Health Navigator</Link></li>
             <li><Link to="/emergency" className="hover:text-primary-foreground">Emergency</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Platform</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/70">
             <li><Link to="/portal" className="hover:text-primary-foreground">Patient Portal</Link></li>
             <li><Link to="/admin" className="hover:text-primary-foreground">Management Demo</Link></li>
            <li><span className="cursor-default">Privacy</span></li>
            <li><span className="cursor-default">Terms</span></li>
          </ul>
          <p className="mt-6 rounded-md bg-primary-foreground/8 p-3 text-xs leading-relaxed text-primary-foreground/65">
            {t("footer.rights")} All doctors, availability and figures shown are simulated demo data.
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Royal Medical Center · Doha, Qatar
      </div>
    </footer>
  );
}

export function PublicShell({ children }: { children: ReactNode }) {
  const { dir } = useLang();
  return (
    <div dir={dir} className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-primary-foreground/10 bg-midnight text-foreground">
      <div className="command-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
        )}
        <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-[1.06] text-primary-foreground sm:text-5xl lg:text-7xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/65 sm:text-lg">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
