"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { IMAGES, type ImageKey } from "@/lib/images";

type PhotoProps = {
  image: ImageKey;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * Full-bleed photograph that fades in once loaded. If the image cannot be
 * loaded, the element's own background (set via `className`) stays visible,
 * so every section still looks intentional.
 */
export function Photo({ image, sizes, priority, className, imgClassName }: PhotoProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const { src, alt } = IMAGES[image];

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {state !== "error" && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          className={cn(
            "object-cover transition-opacity duration-1000",
            state === "loaded" ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
