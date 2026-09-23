import { Leaf } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SUSTAINABILITY } from "@/lib/content";

export function Sustainability() {
  return (
    <section id="sustainability" aria-labelledby="sustainability-title" className="bg-white py-24 sm:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-linear-to-b from-ocean-500 via-ocean-600 to-navy-900 sm:aspect-[4/3] lg:aspect-[4/5]">
            <Photo image="vessel" sizes="(min-width: 1024px) 50vw, 100vw" imgClassName="transition-transform duration-[1.5s] ease-out-expo hover:scale-105" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-950/70 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 rounded-2xl border border-white/15 bg-navy-950/40 p-5 text-white backdrop-blur-md sm:inset-x-8 sm:bottom-8 sm:p-6">
              <div>
                <p className="font-display text-4xl font-extrabold sm:text-5xl">
                  −40<span className="text-tide-300">%</span>
                </p>
                <p className="mt-1 text-sm text-white/75">CO₂ intensity target by 2030*</p>
              </div>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-tide-400 text-navy-950">
                <Leaf className="size-6" aria-hidden />
              </span>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            id="sustainability-title"
            eyebrow="Sustainability"
            title="Navigating Towards a Cleaner Future"
            intro="Shipping moves around 80% of global trade. We take our responsibility seriously — investing in efficiency, cleaner energy and smarter operations to decarbonise every voyage."
          />
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {SUSTAINABILITY.map((item, i) => (
              <Reveal as="li" key={item.title} delay={0.1 + i * 0.07} className="group">
                <span className="grid size-11 place-items-center rounded-xl bg-tide-400/12 text-teal-600 transition-colors duration-500 group-hover:bg-tide-400 group-hover:text-navy-950">
                  <item.icon className="size-5" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-ink">{item.description}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 text-xs text-slate-ink/80">*Versus 2008 baseline, in line with IMO decarbonisation ambitions.</p>
        </div>
      </div>
    </section>
  );
}
