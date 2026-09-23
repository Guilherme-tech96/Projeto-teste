import { cn } from "@/lib/cn";

type LogoMarkProps = { className?: string; title?: string };

/**
 * The NAVA mark: a geometric anchor reduced to ring, stem, stock and a
 * horizon arc. The arc carries the ocean→tide gradient to suggest the sea
 * and a global route line.
 */
export function LogoMark({ className, title }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id="nava-tile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10306a" />
          <stop offset="1" stopColor="#020a18" />
        </linearGradient>
        <linearGradient id="nava-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3d8dff" />
          <stop offset="1" stopColor="#1fd8c8" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#nava-tile)" />
      <g fill="none" strokeLinecap="round" strokeWidth="3.2">
        <circle cx="24" cy="12.5" r="3.6" stroke="#fff" />
        <path d="M24 16.1V37.5M17 21.5h14" stroke="#fff" />
        <path d="M11.5 28.5a12.5 12.5 0 0 0 25 0" stroke="url(#nava-arc)" />
      </g>
    </svg>
  );
}

type LogoProps = { className?: string; tone?: "light" | "dark"; tagline?: boolean };

export function Logo({ className, tone = "light", tagline = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="size-9" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] font-extrabold tracking-[0.28em]",
            tone === "light" ? "text-white" : "text-navy-900",
          )}
        >
          NAVA
        </span>
        {tagline && (
          <span
            className={cn(
              "mt-1.5 text-[0.6rem] font-semibold tracking-[0.3em] uppercase",
              tone === "light" ? "text-white/55" : "text-slate-ink",
            )}
          >
            Maritime Transport
          </span>
        )}
      </span>
    </span>
  );
}
