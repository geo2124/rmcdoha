import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Info,
  MapPin,
  Phone,
  RotateCcw,
  SendHorizontal,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PublicShell } from "@/components/rmc/PublicShell";
import { DoctorCard } from "@/components/rmc/DoctorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BRANCHES, doctorsBySpecialty, specialtyById } from "@/data/rmc";
import { EXAMPLE_PROMPTS, route as routeSymptoms, type NavigatorRoute } from "@/lib/navigator-engine";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/navigator")({
  head: () => ({
    meta: [
      { title: "RMC Health Navigator — Royal Medical Center Doha" },
      {
        name: "description",
        content:
          "Describe what you're experiencing and the RMC Health Navigator will guide you to the right speciality, doctor and next step. General guidance only, not a diagnosis.",
      },
      { property: "og:title", content: "RMC Health Navigator — Royal Medical Center Doha" },
      {
        property: "og:description",
        content: "An intelligent guide to help you find the right next step at Royal Medical Center.",
      },
    ],
  }),
  component: NavigatorPage,
});

interface Msg {
  id: number;
  role: "user" | "assistant";
  text: string;
}

function NavigatorPage() {
  const { t } = useLang();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [plan, setPlan] = useState<NavigatorRoute | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, done]);

  const push = (role: Msg["role"], text: string) =>
    setMessages((prev) => [...prev, { id: ++idRef.current, role, text }]);

  const say = (text: string, delay = 900) => {
    setTyping(true);
    const timer = setTimeout(() => {
      setTyping(false);
      push("assistant", text);
    }, delay);
    timers.current.push(timer);
  };

  const start = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    push("user", clean);
    setInput("");
    const result = routeSymptoms(clean);
    setPlan(result);

    if (result.kind === "urgent") {
      say(result.acknowledgement, 800);
      const timer = setTimeout(() => setDone(true), 1700);
      timers.current.push(timer);
      return;
    }

    say(result.acknowledgement, 900);
    const timer = setTimeout(() => {
      setTyping(true);
      const t2 = setTimeout(() => {
        setTyping(false);
        push("assistant", result.questions[0].question);
      }, 700);
      timers.current.push(t2);
    }, 1000);
    timers.current.push(timer);
  };

  const answer = (text: string) => {
    const clean = text.trim();
    if (!clean || !plan) return;
    push("user", clean);
    setInput("");
    const nextAnswers = [...answers, clean];
    setAnswers(nextAnswers);
    const next = questionIndex + 1;

    if (next < plan.questions.length) {
      setQuestionIndex(next);
      say(plan.questions[next].question, 800);
      return;
    }

    say("Thank you — that's everything I need. Here's what I'd suggest as a next step.", 900);
    const timer = setTimeout(() => setDone(true), 1800);
    timers.current.push(timer);
  };

  const submit = (text: string) => (plan && plan.kind === "specialty" ? answer(text) : start(text));

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setMessages([]);
    setPlan(null);
    setQuestionIndex(0);
    setAnswers([]);
    setDone(false);
    setTyping(false);
    setInput("");
  };

  const started = messages.length > 0;
  const specialty = plan?.specialtyId ? specialtyById(plan.specialtyId) : undefined;
  const recommended = plan?.specialtyId ? doctorsBySpecialty(plan.specialtyId) : [];

  return (
    <PublicShell>
      <section className="soft-gradient border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
            <span className="brand-gradient grid size-12 shrink-0 place-items-center rounded-2xl text-primary-foreground">
              <Sparkles className="size-6" />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold sm:text-4xl">{t("nav.title")}</h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">{t("nav.subtitle")}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="surface overflow-hidden">
          {/* Conversation */}
          <div
            ref={scrollRef}
            className="max-h-[26rem] min-h-[19rem] overflow-y-auto p-5 sm:p-7"
            aria-live="polite"
          >
            {!started ? (
              <div className="grid gap-6">
                <div>
                  <h2 className="font-display text-xl font-bold sm:text-2xl">{t("nav.what")}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Describe your symptoms in your own words, or pick an example below.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_PROMPTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => start(p)}
                      className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="grid gap-4">
                {messages.map((m) => (
                  <li
                    key={m.id}
                    className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}
                  >
                    {m.role === "assistant" && (
                      <span className="brand-gradient mt-1 grid size-8 shrink-0 place-items-center rounded-lg text-primary-foreground">
                        <Sparkles className="size-4" />
                      </span>
                    )}
                    <p
                      className={cn(
                        "rise max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground",
                      )}
                    >
                      {m.text}
                    </p>
                  </li>
                ))}
                {typing && (
                  <li className="flex gap-3">
                    <span className="brand-gradient mt-1 grid size-8 shrink-0 place-items-center rounded-lg text-primary-foreground">
                      <Sparkles className="size-4" />
                    </span>
                    <span className="flex items-center gap-1.5 rounded-2xl bg-muted px-4 py-4">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: `${i * 140}ms` }}
                        />
                      ))}
                    </span>
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-t border-border bg-card p-4"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={done ? "Start a new conversation to continue" : t("nav.placeholder")}
              disabled={typing || done}
              className="h-12 rounded-xl border-border text-base"
            />
            <Button type="submit" variant="hero" size="icon" className="size-12 rounded-xl" disabled={typing || done || !input.trim()} aria-label="Send">
              <SendHorizontal className="size-5" />
            </Button>
          </form>
        </div>

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" /> {t("nav.disclaimer")}
        </p>

        {started && (
          <Button variant="ghost" size="sm" className="mt-3 text-primary" onClick={reset}>
            <RotateCcw className="size-4" /> Start over
          </Button>
        )}

        {/* Result */}
        {done && plan?.kind === "urgent" && (
          <section className="rise mt-8 rounded-3xl border border-urgent/30 bg-urgent-soft p-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-urgent/30 bg-card px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-urgent">
              <AlertTriangle className="size-3.5" /> Urgent guidance
            </span>
            <h2 className="mt-5 text-2xl font-extrabold text-urgent sm:text-3xl">
              You may need urgent medical evaluation.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-foreground/80">{plan.reason}</p>
            <ul className="mt-4 grid gap-2 text-sm text-foreground/80">
              {plan.guidance.map((g) => (
                <li key={g} className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-urgent" /> {g}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="urgent" size="lg">
                <Link to="/emergency">Emergency Information</Link>
              </Button>
              <Button asChild variant="quiet" size="lg">
                <a href={`tel:${BRANCHES[0].phone.replace(/\s/g, "")}`}>
                  <Phone className="size-4" /> Call Medical Center
                </a>
              </Button>
              <Button asChild variant="quiet" size="lg">
                <a href={BRANCHES[0].directions} target="_blank" rel="noreferrer">
                  <MapPin className="size-4" /> Get Directions
                </a>
              </Button>
            </div>
          </section>
        )}

        {done && plan?.kind === "specialty" && (
          <section className="rise mt-8">
            <div className="surface overflow-hidden">
              <div className="brand-gradient px-7 py-6 text-primary-foreground">
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-85">Your recommended next step</p>
                <h2 className="mt-2 font-display text-3xl font-extrabold">{plan.specialtyLabel}</h2>
                <p className="mt-3 max-w-2xl text-sm opacity-90">{plan.reason}</p>
              </div>
              <div className="grid gap-6 p-7 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    What you told us
                  </h3>
                  <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                    {plan.questions.map((q, i) => (
                      <li key={q.id}>
                        <span className="text-foreground">{q.question}</span>{" "}
                        <span className="block">{answers[i] ?? "—"}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    Before your visit
                  </h3>
                  <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                    {plan.guidance.map((g) => (
                      <li key={g} className="flex items-start gap-2">
                        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" /> {g}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button asChild variant="hero" size="lg">
                      <Link to="/doctors" search={{ specialty: plan.specialtyId }}>
                        Find a {specialty?.name} Doctor <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="quiet" size="lg">
                      <Link to="/appointments" search={{ specialty: plan.specialtyId }}>
                        Request Appointment
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {recommended.length > 0 && (
              <div className="mt-10">
                <h3 className="text-2xl font-extrabold">Recommended Doctors</h3>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {recommended.map((d) => (
                    <DoctorCard key={d.id} doctor={d} />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </PublicShell>
  );
}
