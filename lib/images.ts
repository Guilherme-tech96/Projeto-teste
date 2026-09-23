// Photography is served from Unsplash (free licence). Replace any entry with a
// local file in /public (e.g. "/images/hero.jpg") to self-host.
const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80`;

export const IMAGES = {
  hero: { src: unsplash("photo-1494412574643-ff11b0a5c1c3"), alt: "Container ship sailing across the open ocean" },
  port: { src: unsplash("photo-1605745341112-85968b19335b"), alt: "Stacked shipping containers at an international port terminal" },
  vessel: { src: unsplash("photo-1578575437130-527eed3abbec"), alt: "Modern container vessel underway in deep blue water" },
  containers: { src: unsplash("photo-1566576721346-d4a3b4eaeb55"), alt: "Colourful shipping containers ready for loading" },
} as const;

export type ImageKey = keyof typeof IMAGES;
