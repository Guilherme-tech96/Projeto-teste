import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/content";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-mist-50 py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="What we do"
            title="Our Services"
            intro="Integrated maritime and logistics services designed around your cargo, your timelines and your markets."
          />
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-slate-ink lg:text-right">
              Six specialised business lines. <br className="hidden lg:block" />
              One seamless supply chain.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal
              as="li"
              key={service.title}
              delay={(i % 3) * 0.08}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-mist-200 bg-white p-8 transition duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_60px_-25px_rgb(5_20_48/0.35)]"
            >
                {/* Hover wash */}
                <div
                  aria-hidden
                  className="absolute inset-0 -z-0 bg-linear-to-br from-navy-900 via-navy-800 to-ocean-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-ocean-100 text-ocean-600 transition duration-500 group-hover:bg-white/10 group-hover:text-tide-300">
                    <service.icon className="size-6" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="font-display text-sm font-bold text-mist-200 transition-colors duration-500 group-hover:text-white/25">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="relative mt-10 font-display text-2xl font-bold text-navy-900 transition-colors duration-500 group-hover:text-white">
                  {service.title}
                </h3>
                <p className="relative mt-3 flex-1 leading-relaxed text-slate-ink transition-colors duration-500 group-hover:text-white/70">
                  {service.description}
                </p>
                <div className="relative mt-8 flex items-center justify-between border-t border-mist-100 pt-5 transition-colors duration-500 group-hover:border-white/10">
                  <span className="text-xs font-semibold tracking-widest text-ocean-500 uppercase transition-colors duration-500 group-hover:text-tide-300">
                    {service.tag}
                  </span>
                  <ArrowUpRight
                    className="size-5 text-navy-900 transition duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                    aria-hidden
                  />
                </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
