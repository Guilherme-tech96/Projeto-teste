"use client";

import { CircleCheck, LoaderCircle, X } from "lucide-react";
import { useState, type FormEvent, type Ref } from "react";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

const CARGO_TYPES = ["Full container (FCL)", "Shared container (LCL)", "Project / heavy cargo", "Reefer", "Other"];

const field =
  "mt-1.5 block w-full rounded-xl font-normal tracking-normal normal-case border border-mist-200 bg-mist-50 px-4 py-3 text-sm text-navy-900 placeholder:text-slate-ink/60 transition focus:border-ocean-500 focus:bg-white focus:ring-4 focus:ring-ocean-500/15 focus:outline-none";
const label = "block text-xs font-semibold tracking-wide text-navy-800 uppercase";

export function QuoteDialog({ ref }: { ref: Ref<HTMLDialogElement> }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    // No backend: simulate a request round-trip.
    window.setTimeout(() => setStatus("sent"), 1200);
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="quote-title"
      onClose={() => setStatus("idle")}
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-3xl bg-white p-0 text-navy-900 shadow-2xl open:animate-[fade-in_0.35s_ease-out]"
    >
      <div className="relative p-6 sm:p-10">
        <form method="dialog" className="absolute top-4 right-4">
          <button
            className="grid size-10 place-items-center rounded-full text-slate-ink transition hover:bg-mist-100 hover:text-navy-900"
            aria-label="Close"
          >
            <X className="size-5" aria-hidden />
          </button>
        </form>

        {status === "sent" ? (
          <div className="flex flex-col items-center py-10 text-center" role="status">
            <CircleCheck className="size-14 text-tide-400" aria-hidden />
            <h2 id="quote-title" className="mt-6 font-display text-3xl font-extrabold">
              Request received
            </h2>
            <p className="mt-3 max-w-sm text-slate-ink">
              Thank you. A NAVA logistics advisor will contact you within one business day with a tailored proposal.
            </p>
            <form method="dialog" className="mt-8">
              <Button>Close</Button>
            </form>
          </div>
        ) : (
          <>
            <LogoMark className="size-10" />
            <h2 id="quote-title" className="mt-5 font-display text-3xl font-extrabold tracking-tight">
              Request a Quote
            </h2>
            <p className="mt-2 text-slate-ink">Tell us about your cargo and we&apos;ll find the best maritime solution.</p>

            <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className={label}>
                Full name
                <input required name="name" autoComplete="name" className={field} placeholder="Ana Ferreira" />
              </label>
              <label className={label}>
                Company
                <input name="company" autoComplete="organization" className={field} placeholder="Company Ltd." />
              </label>
              <label className={label}>
                Business email
                <input required type="email" name="email" autoComplete="email" className={field} placeholder="you@company.com" />
              </label>
              <label className={label}>
                Cargo type
                <select name="cargo" className={field} defaultValue={CARGO_TYPES[0]}>
                  {CARGO_TYPES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className={label}>
                Origin
                <input required name="origin" className={field} placeholder="Port or city of origin" />
              </label>
              <label className={label}>
                Destination
                <input required name="destination" className={field} placeholder="Port or city of destination" />
              </label>
              <label className={`${label} sm:col-span-2`}>
                Details <span className="font-normal normal-case tracking-normal text-slate-ink">(optional)</span>
                <textarea name="details" rows={3} className={field} placeholder="Volume, weight, dates, special requirements…" />
              </label>
              <div className="flex flex-col-reverse items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-ink">We reply within one business day. No spam, ever.</p>
                <Button type="submit" size="lg" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" aria-hidden /> Sending…
                    </>
                  ) : (
                    "Send request"
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
