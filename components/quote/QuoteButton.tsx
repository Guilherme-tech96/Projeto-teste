"use client";

import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/Button";
import { useOpenQuote } from "./QuoteProvider";

type QuoteButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & { arrow?: boolean };

export function QuoteButton({ children = "Request a Quote", arrow = true, ...props }: QuoteButtonProps) {
  const openQuote = useOpenQuote();
  return (
    <Button aria-haspopup="dialog" onClick={openQuote} {...props}>
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />}
    </Button>
  );
}
