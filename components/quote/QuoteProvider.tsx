"use client";

import { createContext, useCallback, useContext, useRef, type ReactNode } from "react";
import { QuoteDialog } from "./QuoteDialog";

const QuoteContext = createContext<() => void>(() => {});

export function QuoteProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = useCallback(() => dialogRef.current?.showModal(), []);

  return (
    <QuoteContext.Provider value={open}>
      {children}
      <QuoteDialog ref={dialogRef} />
    </QuoteContext.Provider>
  );
}

export const useOpenQuote = () => useContext(QuoteContext);
