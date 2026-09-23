import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADVANTAGES } from "@/lib/content";

export function WhyNava() {
  return (
    <section id="why-nava" aria-labelledby="why-title" className="bg-mist-50 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="why-title"
          align="center"
          eyebrow="The NAVA difference"
          title="Why Choose NAVA"
          intro="Four commitments that shape every voyage and every shipment we handle."
        />

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 0.08}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-mist-200 transition duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgb(5_20_48/0.35)] hover:ring-transparent"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-ocean-500 to-tide-400 transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
              />
              <span className="grid size-14 place-items-center rounded-full bg-linear-to-br from-navy-800 to-ocean-600 text-white shadow-lg shadow-ocean-600/25 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <item.icon className="size-6" strokeWidth={1.6} aria-hidden />
              </span>
              <h3 className="mt-8 font-display text-xl font-bold text-navy-900">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-ink">{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
