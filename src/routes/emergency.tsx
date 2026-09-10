import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, MapPin, Phone } from "lucide-react";
import { PublicShell } from "@/components/rmc/PublicShell";
import { Button } from "@/components/ui/button";
import { BRANCHES } from "@/data/rmc";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Information — Royal Medical Center Doha" },
      {
        name: "description",
        content:
          "Urgent care information for Royal Medical Center Doha: call the Lusail or Al Gharrafa branch, get directions and know what to do in an emergency.",
      },
      { property: "og:title", content: "Emergency Information — Royal Medical Center Doha" },
      { property: "og:description", content: "Call, get directions, and know what to do in an emergency." },
    ],
  }),
  component: EmergencyPage,
});

function EmergencyPage() {
  return (
    <PublicShell>
      <section className="border-b border-urgent/20 bg-urgent-soft">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-urgent/30 bg-card px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-urgent">
            <AlertTriangle className="size-3.5" /> Emergency
          </span>
          <h1 className="mt-6 text-4xl font-extrabold text-urgent sm:text-5xl">Need urgent medical care?</h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-foreground/80">
            If symptoms are severe or getting rapidly worse, do not wait for an appointment. Call the nearest branch
            or go directly to the Emergency Department.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="urgent" size="xl" className="w-full sm:w-auto">
              <a href="tel:+97444502050">
                <Phone className="size-5" /> Call Now · +974 44502050
              </a>
            </Button>
            <Button asChild variant="quiet" size="xl" className="w-full sm:w-auto">
              <a href={BRANCHES[0]!.directions} target="_blank" rel="noreferrer">
                <MapPin className="size-5" /> Get Directions
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-extrabold">Emergency Department</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {BRANCHES.map((b) => (
            <div key={b.id} className="surface p-6">
              <h3 className="font-display text-lg font-bold">{b.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.address}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild variant="urgent" size="sm">
                  <a href={`tel:${b.phone.replace(/\s/g, "")}`}>
                    <Phone className="size-4" /> {b.phone}
                  </a>
                </Button>
                <Button asChild variant="quiet" size="sm">
                  <a href={b.directions} target="_blank" rel="noreferrer">
                    Directions
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-extrabold">What to do in an emergency</h2>
        <ol className="mt-5 grid gap-3">
          {[
            "Call for help first. Use the branch numbers above, or Qatar emergency services on 999.",
            "Stay with the person and keep them still and calm until help arrives.",
            "Do not give food, drink or medication unless instructed by a medical professional.",
            "Bring any medication list, allergy information and ID if you can do so quickly.",
          ].map((step, i) => (
            <li key={step} className="surface grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 p-5">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-urgent-soft font-bold text-urgent">
                {i + 1}
              </span>
              <p className="text-sm text-muted-foreground">{step}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 rounded-2xl border border-border bg-muted p-5 text-sm text-muted-foreground">
          This page provides general information only and is part of a demonstration prototype. It does not replace
          professional medical advice.{" "}
          <Link to="/navigator" className="text-primary underline underline-offset-4">
            For non-urgent concerns, use the Health Navigator.
          </Link>
        </p>
      </div>
    </PublicShell>
  );
}
