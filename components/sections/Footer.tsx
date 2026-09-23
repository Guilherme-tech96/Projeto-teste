import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SOCIALS } from "@/components/ui/SocialIcons";
import { FOOTER_LINKS, OFFICES, SERVICES, SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer id="contact" aria-labelledby="footer-title" className="relative overflow-hidden bg-navy-950 pt-20 text-white">
      <h2 id="footer-title" className="sr-only">
        Contact and site information
      </h2>
      <div className="container-page">
        <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tagline />
            <p className="mt-6 max-w-sm leading-relaxed text-white/60">
              {SITE.legalName} connects businesses to global markets through reliable ocean freight and integrated
              logistics.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="group mt-8 inline-flex items-center gap-3 font-display text-lg font-semibold transition hover:text-tide-300"
            >
              <Mail className="size-5 text-tide-300" aria-hidden />
              {SITE.email}
              <ArrowUpRight className="size-4 opacity-0 transition group-hover:opacity-100" aria-hidden />
            </a>
            <ul className="mt-8 flex gap-3" aria-label="Social media">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`NAVA on ${label}`}
                    className="grid size-11 place-items-center rounded-full border border-white/15 text-white/70 transition duration-300 hover:-translate-y-0.5 hover:border-tide-400 hover:bg-tide-400 hover:text-navy-950"
                  >
                    <Icon className="size-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:col-span-4">
            <div>
              <h3 className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">Explore</h3>
              <ul className="mt-5 space-y-3">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white/75 transition hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">Services</h3>
              <ul className="mt-5 space-y-3">
                {SERVICES.map((s) => (
                  <li key={s.title}>
                    <a href="#services" className="text-white/75 transition hover:text-white">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">Offices</h3>
            <ul className="mt-5 grid gap-6 sm:grid-cols-2">
              {OFFICES.map((office) => (
                <li key={office.city}>
                  <address className="not-italic">
                    <p className="flex items-center gap-2 font-display font-bold">
                      <MapPin className="size-4 text-tide-300" aria-hidden />
                      {office.city}
                    </p>
                    <p className="mt-0.5 text-xs tracking-wide text-tide-300/80 uppercase">{office.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{office.address}</p>
                    <a
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/70 transition hover:text-white"
                    >
                      <Phone className="size-3.5" aria-hidden />
                      {office.phone}
                    </a>
                  </address>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.legalName}. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><a href="#privacy" className="transition hover:text-white">Privacy</a></li>
            <li><a href="#terms" className="transition hover:text-white">Terms</a></li>
            <li><a href="#cookies" className="transition hover:text-white">Cookies</a></li>
          </ul>
        </div>
      </div>

      {/* Oversized wordmark */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.2em] text-center font-display text-[22vw] leading-none font-extrabold tracking-[0.08em] text-white/[0.03] select-none"
      >
        NAVA
      </p>
    </footer>
  );
}
