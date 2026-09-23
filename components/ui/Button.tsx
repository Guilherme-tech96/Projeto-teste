import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "light" | "outline" | "outline-dark" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display font-semibold tracking-wide whitespace-nowrap transition duration-300 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-ocean-500 text-white shadow-[0_10px_30px_-10px_rgb(21_112_224/0.7)] hover:-translate-y-0.5 hover:bg-ocean-400 hover:shadow-[0_18px_40px_-12px_rgb(21_112_224/0.8)]",
  light: "bg-white text-navy-900 hover:-translate-y-0.5 hover:bg-mist-100",
  outline: "border border-white/35 text-white backdrop-blur-sm hover:border-white hover:bg-white/10",
  "outline-dark": "border border-navy-900/15 text-navy-900 hover:border-navy-900/40 hover:bg-navy-900/5",
  ghost: "text-navy-900 hover:text-ocean-500",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

type LinkButtonProps = ComponentPropsWithoutRef<"a"> & { variant?: Variant; size?: Size };

export function LinkButton({ variant, size, className, ...props }: LinkButtonProps) {
  return <a className={buttonClasses(variant, size, className)} {...props} />;
}
