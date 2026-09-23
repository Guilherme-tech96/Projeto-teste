"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/** Counts up from zero to `value` the first time it scrolls into view. */
export function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduce) {
      node.textContent = String(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (node.textContent = Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  // Server-render the final value so it is correct without JS and for crawlers.
  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
