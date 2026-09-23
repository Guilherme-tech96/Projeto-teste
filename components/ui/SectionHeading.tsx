import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, tone = "dark", align = "left", className, id }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", dark ? "text-ocean-500" : "text-tide-300", align === "center" && "justify-center")}>
        <span className={cn("h-px w-8", dark ? "bg-ocean-500" : "bg-tide-300")} aria-hidden />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-5 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl",
          dark ? "text-navy-900" : "text-white",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-6 text-lg leading-relaxed text-pretty", dark ? "text-slate-ink" : "text-white/70")}>{intro}</p>
      )}
    </Reveal>
  );
}
