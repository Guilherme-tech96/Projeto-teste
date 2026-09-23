"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, LoaderCircle, PackageSearch, Ship } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import {
  MILESTONES,
  SAMPLE_REFERENCE,
  TRACKING_PATTERN,
  normaliseReference,
  simulateTracking,
  type TrackingResult,
} from "@/lib/tracking";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; result: TrackingResult };

export function Tracking() {
  const inputId = useId();
  const [value, setValue] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  function track(raw: string) {
    const reference = normaliseReference(raw);
    if (!TRACKING_PATTERN.test(reference)) {
      setState({
        status: "error",
        message: "Please enter a valid container number (e.g. NAVU4827316) or booking number (e.g. NV24081937).",
      });
      return;
    }
    setState({ status: "loading" });
    window.setTimeout(() => setState({ status: "done", result: simulateTracking(reference) }), 1100);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    track(value);
  }

  return (
    <section id="tracking" aria-labelledby="tracking-title" className="relative bg-white py-24 sm:py-28">
      <div className="container-page">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-linear-to-br from-ocean-600 via-ocean-500 to-navy-800 p-6 text-white shadow-[0_40px_80px_-40px_rgb(10_88_184/0.6)] sm:p-12 lg:p-16">
          <svg aria-hidden className="absolute -right-24 -bottom-24 -z-10 size-[28rem] text-white/[0.06]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            {[46, 36, 26, 16].map((r) => (
              <circle key={r} cx="50" cy="50" r={r} strokeWidth="0.6" />
            ))}
          </svg>

          <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-2">
              <span className="grid size-14 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                <PackageSearch className="size-7" strokeWidth={1.6} aria-hidden />
              </span>
              <h2 id="tracking-title" className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                Track Your Shipment
              </h2>
              <p className="mt-4 max-w-md text-white/75">
                Real-time visibility of your cargo, from gate-in to final delivery. Enter your reference to see where it is.
              </p>
            </div>

            <div className="lg:col-span-3">
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3 rounded-2xl bg-white p-2 shadow-xl sm:flex-row">
                <label htmlFor={inputId} className="sr-only">
                  Container or booking number
                </label>
                <input
                  id={inputId}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter container or booking number"
                  autoComplete="off"
                  spellCheck={false}
                  aria-invalid={state.status === "error"}
                  aria-describedby={`${inputId}-hint`}
                  className="h-13 min-w-0 flex-1 rounded-xl bg-transparent px-4 font-medium tracking-wide text-navy-900 uppercase placeholder:tracking-normal placeholder:text-slate-ink/70 placeholder:normal-case focus:outline-none"
                />
                <Button type="submit" size="lg" className="bg-navy-900 hover:bg-navy-800" disabled={state.status === "loading"}>
                  {state.status === "loading" ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : null}
                  Track Shipment
                </Button>
              </form>
              <p id={`${inputId}-hint`} className="mt-3 text-sm text-white/70">
                Try a demo reference:{" "}
                <button
                  type="button"
                  className="font-semibold text-white underline decoration-tide-300 decoration-2 underline-offset-4 hover:text-tide-300"
                  onClick={() => {
                    setValue(SAMPLE_REFERENCE);
                    track(SAMPLE_REFERENCE);
                  }}
                >
                  {SAMPLE_REFERENCE}
                </button>
              </p>

              <div aria-live="polite" className="mt-6">
                <AnimatePresence mode="wait">
                  {state.status === "error" && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl bg-navy-950/40 px-4 py-3 text-sm text-white"
                      role="alert"
                    >
                      {state.message}
                    </motion.p>
                  )}
                  {state.status === "done" && (
                    <motion.div
                      key={state.result.reference}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <TrackingCard result={state.result} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrackingCard({ result }: { result: TrackingResult }) {
  const delivered = result.stage === MILESTONES.length - 1;
  return (
    <article className="rounded-2xl bg-white p-5 text-navy-900 shadow-xl sm:p-7" aria-label={`Tracking result for ${result.reference}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-slate-ink uppercase">Reference</p>
          <p className="mt-1 font-display text-xl font-extrabold tracking-wide">{result.reference}</p>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase",
            delivered ? "bg-tide-400/15 text-teal-700" : "bg-ocean-100 text-ocean-600",
          )}
        >
          {MILESTONES[result.stage]}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm font-semibold">
          <span>{result.origin}</span>
          <span className="text-right">{result.destination}</span>
        </div>
        <div className="relative mt-3 h-1.5 rounded-full bg-mist-100">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-ocean-500 to-tide-400"
            initial={{ width: 0 }}
            animate={{ width: `${result.progress * 100}%` }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
          <motion.span
            className="absolute top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-navy-900 text-white shadow-lg"
            initial={{ left: "0%" }}
            animate={{ left: `${result.progress * 100}%` }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <Ship className="size-4" aria-hidden />
          </motion.span>
        </div>
      </div>

      <dl className="mt-7 grid grid-cols-3 gap-4 border-y border-mist-100 py-4 text-sm">
        <div>
          <dt className="text-slate-ink">Vessel</dt>
          <dd className="mt-0.5 font-semibold">{result.vessel}</dd>
        </div>
        <div>
          <dt className="text-slate-ink">Voyage</dt>
          <dd className="mt-0.5 font-semibold">{result.voyage}</dd>
        </div>
        <div>
          <dt className="text-slate-ink">{delivered ? "Delivered" : "ETA"}</dt>
          <dd className="mt-0.5 font-semibold">{result.eta}</dd>
        </div>
      </dl>

      <ol className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
        {MILESTONES.map((m, i) => {
          const done = i <= result.stage;
          return (
            <li key={m} className={cn("flex items-center gap-2 text-sm", done ? "text-navy-900" : "text-slate-ink/60")}>
              <span
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-full",
                  done ? "bg-tide-400 text-navy-950" : "border border-mist-200",
                  i === result.stage && !delivered && "ring-4 ring-tide-400/25",
                )}
              >
                {done && <Check className="size-3" strokeWidth={3} aria-hidden />}
              </span>
              {m}
              <span className="sr-only">{done ? "(completed)" : "(pending)"}</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-5 text-xs text-slate-ink">Demo only — tracking data is simulated.</p>
    </article>
  );
}
