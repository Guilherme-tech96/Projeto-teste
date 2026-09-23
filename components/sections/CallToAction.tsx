import { Mail } from "lucide-react";
import { QuoteButton } from "@/components/quote/QuoteButton";
import { LinkButton } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/content";

export function CallToAction() {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-navy-900 py-28 text-white sm:py-40">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-navy-900 via-navy-800 to-ocean-600">
        <Photo image="containers" sizes="100vw" />
        <div className="absolute inset-0 bg-navy-950/75" />
        <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-navy-950/60 to-transparent" />
      </div>

      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-tide-300">
            <span className="h-px w-8 bg-tide-300" aria-hidden />
            Let&apos;s talk cargo
          </p>
          <h2 id="cta-title" className="mt-6 font-display text-5xl leading-[1] font-extrabold tracking-tight text-balance sm:text-7xl">
            Ready to Move <span className="text-gradient">Your Cargo?</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/75 sm:text-xl">
            Talk to our team and discover the best maritime solution for your business.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <QuoteButton size="lg" />
            <LinkButton href={`mailto:${SITE.email}`} variant="outline" size="lg">
              <Mail className="size-4" aria-hidden />
              {SITE.email}
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
