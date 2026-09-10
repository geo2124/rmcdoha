import { createFileRoute } from "@tanstack/react-router";
import { DemoBadge, Panel, SectionHead } from "@/components/rmc/admin-ui";
import { FunnelBars, TrendArea } from "@/components/rmc/charts";
import { FUNNEL, LIVE_FEED, WEEKLY_TREND } from "@/data/rmc";

export const Route = createFileRoute("/admin/journey")({
  component: JourneyPage,
});

function JourneyPage() {
  const visitors = FUNNEL[0]!.value;
  const booked = FUNNEL[FUNNEL.length - 1]!.value;

  return (
    <div className="grid gap-8">
      <SectionHead
        title="Patient Journey"
        subtitle="Where patients enter, where they progress and where they drop off."
      >
        <DemoBadge />
      </SectionHead>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Entry to booking", `${((booked / visitors) * 100).toFixed(1)}%`, "Visitors who complete a booking"],
          ["Navigator uplift", "2.9×", "Booking rate vs. patients who never open the Navigator"],
          ["Median time to book", "3m 41s", "From first visit to submitted request"],
        ].map(([label, value, hint]) => (
          <div key={label} className="surface p-5">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
            <p className="mt-3 font-display text-3xl font-extrabold text-primary-deep">{value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
          </div>
        ))}
      </div>

      <Panel title="Conversion funnel" hint="Website visitors through to confirmed bookings">
        <FunnelBars data={FUNNEL} />
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Panel title="Weekly progression" hint="AI conversations vs. appointment requests">
          <TrendArea data={WEEKLY_TREND} height={300} />
        </Panel>
        <Panel title="Recent journey events">
          <ul className="grid gap-3">
            {LIVE_FEED.map((item) => (
              <li key={item.id} className="rounded-xl border border-border p-3">
                <p className="text-sm">{item.text}</p>
                <p className="text-xs text-muted-foreground">{item.meta}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
