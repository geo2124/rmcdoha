import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  Building2,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  PieChart,
  Route as RouteIcon,
  Settings,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoMark } from "@/components/rmc/Logo";
import { useDemo } from "@/lib/demo-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "RMC Digital Command Center — Management Demo" },
      {
        name: "description",
        content:
          "Demo management dashboard for Royal Medical Center: patient journey analytics, AI Navigator insights, appointments and department demand. All data simulated.",
      },
      { property: "og:title", content: "RMC Digital Command Center — Management Demo" },
      { property: "og:description", content: "Patient Experience & Digital Care Intelligence — demo environment." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/journey", label: "Patient Journey", icon: RouteIcon },
  { to: "/admin/ai", label: "AI Navigator", icon: Sparkles },
  { to: "/admin/appointments", label: "Appointments", icon: CalendarCheck },
  { to: "/admin/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/admin/departments", label: "Departments", icon: Building2 },
  { to: "/admin/analytics", label: "Analytics", icon: PieChart },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

function AdminLayout() {
  const { adminSignedIn, signInAdmin, signOutAdmin } = useDemo();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  if (!adminSignedIn) return <DemoLogin onSignIn={signInAdmin} />;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 start-0 z-50 w-64 shrink-0 bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full rtl:translate-x-full lg:rtl:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <LogoMark className="size-9" />
          <span className="min-w-0">
            <span className="block truncate text-[0.7rem] font-bold uppercase tracking-[0.16em]">RMC</span>
            <span className="block truncate text-[0.65rem] text-sidebar-foreground/60">Command Center</span>
          </span>
          <button
            type="button"
            className="ms-auto lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="grid gap-1 p-3">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="size-4 shrink-0" strokeWidth={1.7} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-3">
          <div className="rounded-xl bg-sidebar-accent p-3 text-xs text-sidebar-foreground/80">
            <p className="font-semibold text-sidebar-foreground">Demo Environment</p>
            <p className="mt-1 leading-relaxed">
              All patient, appointment and analytics data shown here is simulated.
            </p>
          </div>
          <button
            type="button"
            onClick={signOutAdmin}
            className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </aside>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-primary-deep/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-card/90 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid size-10 place-items-center rounded-lg border border-border lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate font-display text-base font-extrabold sm:text-lg">RMC Digital Command Center</h1>
            <p className="truncate text-xs text-muted-foreground">Patient Experience &amp; Digital Care Intelligence</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-gold/40 bg-sand px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-foreground/70 sm:inline-flex">
              <Activity className="size-3" /> Demo Data
            </span>
            <Button asChild variant="quiet" size="sm">
              <Link to="/">Patient site</Link>
            </Button>
          </div>
        </header>

        <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function DemoLogin({ onSignIn }: { onSignIn: () => void }) {
  const [email, setEmail] = useState("demo@rmcdoha.com");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");

  return (
    <div className="soft-gradient grid min-h-screen place-items-center px-4 py-14">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          ← Back to patient site
        </Link>
        <form
          className="surface p-7"
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim() === "demo@rmcdoha.com" && password === "demo123") {
              setError("");
              onSignIn();
            } else {
              setError("Use the demo credentials shown below.");
            }
          }}
        >
          <LogoMark className="size-12" />
          <h1 className="mt-5 font-display text-2xl font-extrabold">RMC Digital Command Center</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Management demo sign-in. Simulated locally — no real authentication.
          </p>

          <div className="mt-6 grid gap-4">
            <div className="grid gap-2">
              <Label className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Password</Label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button type="submit" variant="hero" size="xl" className="w-full">
              Enter Command Center
            </Button>
          </div>

          <p className="mt-5 rounded-xl bg-muted p-3 text-xs text-muted-foreground">
            Demo credentials — email <span className="font-semibold text-foreground">demo@rmcdoha.com</span>, password{" "}
            <span className="font-semibold text-foreground">demo123</span>.
          </p>
        </form>
      </div>
    </div>
  );
}
