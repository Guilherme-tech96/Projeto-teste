import { Check } from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STATS } from "@/lib/content";

const POINTS = ["End-to-end door-to-door solutions", "Local teams in every key market", "One partner, one point of contact"];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            id="about-title"
            eyebrow="About NAVA"
            title={
              <>
                Global Shipping.
                <br />
                <span className="text-ocean-500">Local Expertise.</span>
              </>
            }
            intro="NAVA delivers integrated maritime transport and logistics solutions, linking businesses to the world's leading markets. From a single container to complex project cargo, our people combine global reach with deep knowledge of every port we serve."
          />
          <Reveal delay={0.15}>
            <ul className="mt-8 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-center gap-3 font-medium text-navy-800">
                  <span className="grid size-6 place-items-center rounded-full bg-tide-400/15 text-tide-400">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-linear-to-br from-navy-800 via-ocean-600 to-navy-900 sm:aspect-[5/4] lg:aspect-[4/5]">
            <Photo image="port" sizes="(min-width: 1024px) 45vw, 100vw" imgClassName="transition-transform duration-[1.5s] ease-out-expo hover:scale-105" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-950/60 to-transparent" />
          </div>
          <div className="absolute -bottom-8 left-6 rounded-2xl bg-navy-900 p-6 text-white shadow-2xl shadow-navy-900/30 sm:left-auto sm:-right-6 lg:-left-10 lg:right-auto">
            <p className="font-display text-4xl font-extrabold">
              <Counter value={25} />
              <span className="text-tide-300">yrs</span>
            </p>
            <p className="mt-1 text-sm text-white/65">of maritime excellence</p>
          </div>
        </Reveal>
      </div>

      <div className="container-page mt-28">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-mist-200 bg-mist-200 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="group bg-white p-7 transition-colors duration-500 hover:bg-mist-50 sm:p-10">
              <dt className="text-sm font-medium text-slate-ink">{stat.label}</dt>
              <dd className="mt-3 font-display text-5xl font-extrabold tracking-tight text-navy-900 sm:text-6xl">
                <Counter value={stat.value} />
                <span className="text-ocean-500">{stat.suffix}</span>
              </dd>
              <div className="mt-6 h-0.5 w-10 rounded-full bg-tide-400 transition-all duration-500 group-hover:w-20" aria-hidden />
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
