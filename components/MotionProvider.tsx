"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Honour the user's OS-level "reduce motion" preference across all animations. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
