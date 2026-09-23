"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { QuoteButton } from "@/components/quote/QuoteButton";
import { LinkButton } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { HeroScene } from "./HeroScene";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy-950 pb-24 text-white sm:items-center sm:pb-0"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-kenburns">
          <HeroScene />
          <Photo image="hero" priority sizes="100vw" />
        </div>
        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-navy-950/90 via-navy-950/55 to-navy-950/10" />
        <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-transparent to-navy-950/50" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container-page pt-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="eyebrow text-tide-300"
        >
          <span className="h-px w-8 bg-tide-300" aria-hidden />
          NAVA Maritime Transport
        </motion.p>

        <h1
          id="hero-title"
          className="mt-6 max-w-4xl font-display text-[clamp(2.9rem,8.5vw,7rem)] leading-[0.95] font-extrabold tracking-[-0.035em]"
        >
          {["Moving the World", "Across the Sea."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={i === 1 ? "text-gradient block" : "block"}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-white/75 sm:text-xl"
        >
          Reliable maritime transport and global logistics solutions connecting businesses, ports and markets worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <LinkButton href="#services" variant="light" size="lg">
            Explore Our Services
          </LinkButton>
          <QuoteButton variant="outline" size="lg" />
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="group absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.65rem] font-semibold tracking-[0.3em] text-white/60 uppercase transition hover:text-white sm:flex"
        aria-label="Scroll to content"
      >
        Scroll
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/35 pt-2 group-hover:border-white">
          <span className="block size-1.5 animate-scroll-dot rounded-full bg-tide-300" />
        </span>
      </motion.a>
      <a href="#about" className="absolute right-5 bottom-8 grid size-11 place-items-center rounded-full border border-white/25 text-white/70 sm:hidden" aria-label="Scroll to content">
        <ArrowDown className="size-4 animate-bounce" aria-hidden />
      </a>

      {/* Live-ops ticker */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 1, ease }}
        className="absolute right-10 bottom-10 hidden w-72 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md xl:block"
      >
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-white/60 uppercase">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-tide-400" />
            <span className="relative size-2 rounded-full bg-tide-400" />
          </span>
          Live operations
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <dt className="text-xs text-white/50">Vessels at sea</dt>
            <dd className="font-display text-2xl font-bold">38</dd>
          </div>
          <div>
            <dt className="text-xs text-white/50">On-time arrival</dt>
            <dd className="font-display text-2xl font-bold">97.4%</dd>
          </div>
        </dl>
      </motion.div>
    </section>
  );
}
