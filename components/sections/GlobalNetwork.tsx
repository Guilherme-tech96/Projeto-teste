"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MAP, MAP_HEIGHT, PORTS, ROUTES, project, routePath } from "@/lib/geo";
import { WORLD_DOTS_PATH } from "@/lib/world-dots";

const routes = ROUTES.map((r) => ({ ...r, d: routePath(r.points) }));

const REGIONS = [
  { name: "Europe", detail: "Lisbon · Rotterdam · Algeciras" },
  { name: "Africa", detail: "Luanda · Lagos · Durban" },
  { name: "Asia & Middle East", detail: "Singapore · Shanghai · Jebel Ali" },
  { name: "The Americas", detail: "New York · Houston · Santos · Los Angeles" },
];

export function GlobalNetwork() {
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mapRef, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  return (
    <section
      id="network"
      aria-labelledby="network-title"
      className="relative isolate overflow-hidden bg-navy-950 py-24 text-white sm:py-32"
    >
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div aria-hidden className="absolute top-1/3 left-1/2 -z-10 size-[60rem] -translate-x-1/2 rounded-full bg-ocean-600/15 blur-[140px]" />

      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <SectionHeading id="network-title" tone="light" eyebrow="Global Network" title="Connecting Global Markets" />
          <Reveal delay={0.1}>
            <p className="max-w-lg text-lg leading-relaxed text-white/70 lg:ml-auto">
              From major European ports to Africa, Asia and the Americas, NAVA connects businesses through a reliable
              global maritime network.
            </p>
          </Reveal>
        </div>

        <div ref={mapRef} className="relative mt-14 sm:mt-20">
          <svg
            viewBox={`0 0 ${MAP.width} ${MAP_HEIGHT}`}
            className="h-auto w-full"
            role="img"
            aria-label="World map showing NAVA shipping routes between Europe, Africa, Asia and the Americas"
          >
            <defs>
              <linearGradient id="route-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#3d8dff" />
                <stop offset="1" stopColor="#1fd8c8" />
              </linearGradient>
              <radialGradient id="port-glow">
                <stop offset="0" stopColor="#5ee9dc" stopOpacity="0.8" />
                <stop offset="1" stopColor="#5ee9dc" stopOpacity="0" />
              </radialGradient>
            </defs>

            <path d={WORLD_DOTS_PATH} stroke="#8fb4e8" strokeOpacity="0.22" strokeWidth="2.7" strokeLinecap="round" />

            {routes.map((route, i) => (
              <g key={route.id}>
                <motion.path
                  d={route.d}
                  fill="none"
                  stroke="url(#route-grad)"
                  strokeWidth="1.3"
                  strokeOpacity="0.55"
                  initial={{ pathLength: reduce ? 1 : 0 }}
                  animate={inView ? { pathLength: 1 } : undefined}
                  transition={{ duration: 2.2, delay: 0.2 + i * 0.12, ease: [0.65, 0, 0.35, 1] }}
                />
                {inView && (
                  <path
                    d={route.d}
                    fill="none"
                    stroke="#5ee9dc"
                    strokeWidth="1.3"
                    strokeDasharray="2 10"
                    strokeLinecap="round"
                    className="animate-dash opacity-70"
                  />
                )}
                {inView && !reduce && (
                  <circle r="2.6" fill="#fff">
                    <animateMotion dur={`${route.duration}s`} repeatCount="indefinite" path={route.d} begin={`-${i * 1.7}s`} />
                  </circle>
                )}
              </g>
            ))}

            {PORTS.map((port, i) => {
              const [x, y] = project(port.coords);
              return (
                <motion.g
                  key={port.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ delay: 0.6 + i * 0.07, type: "spring", stiffness: 260, damping: 18 }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >
                  <circle cx={x} cy={y} r={port.hub ? 14 : 9} fill="url(#port-glow)" />
                  {port.hub && (
                    <circle
                      cx={x}
                      cy={y}
                      r="5"
                      fill="none"
                      stroke="#5ee9dc"
                      className="animate-pulse-ring [transform-box:fill-box] [transform-origin:center]"
                    />
                  )}
                  <circle cx={x} cy={y} r={port.hub ? 3.6 : 2.4} fill={port.hub ? "#fff" : "#5ee9dc"} />
                  {port.hub && (
                    <text
                      x={x + 8}
                      y={y - 8}
                      className="fill-white font-display text-[11px] font-bold tracking-wide max-sm:text-[16px]"
                    >
                      {port.name}
                    </text>
                  )}
                </motion.g>
              );
            })}
          </svg>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {REGIONS.map((region, i) => (
            <Reveal
              as="li"
              key={region.name}
              delay={i * 0.08}
              className="group bg-navy-950 p-6 transition-colors duration-500 hover:bg-navy-900"
            >
              <p className="flex items-center gap-2 font-display text-lg font-bold">
                <span className="size-2 rounded-full bg-tide-400 transition-transform duration-500 group-hover:scale-150" aria-hidden />
                {region.name}
              </p>
              <p className="mt-2 text-sm text-white/55">{region.detail}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
