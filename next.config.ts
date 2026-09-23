import type { NextConfig } from "next";

// NAVA_STATIC_EXPORT=1 produces a fully static copy in out/ (used for the
// shareable single-file preview, see scripts/build-preview.mjs).
const staticExport = process.env.NAVA_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(staticExport && { output: "export" as const }),
  images: {
    unoptimized: staticExport,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
