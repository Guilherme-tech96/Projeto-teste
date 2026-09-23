// Front-end only shipment tracking simulation. Results are deterministic per
// reference number so the same input always shows the same journey.

export const TRACKING_PATTERN = /^([A-Z]{4}\d{7}|NV\d{8})$/;
export const SAMPLE_REFERENCE = "NAVU4827316";

export const MILESTONES = [
  "Booking confirmed",
  "Gate in at origin",
  "Loaded on vessel",
  "In transit",
  "Discharged at destination",
  "Delivered",
] as const;

const LANES = [
  ["Rotterdam, NL", "Singapore, SG"],
  ["Lisbon, PT", "Luanda, AO"],
  ["Shanghai, CN", "Rotterdam, NL"],
  ["Santos, BR", "Lisbon, PT"],
  ["Singapore, SG", "Los Angeles, US"],
  ["Lagos, NG", "Rotterdam, NL"],
  ["New York, US", "Lisbon, PT"],
] as const;

const VESSELS = ["NAVA Atlântico", "NAVA Meridian", "NAVA Horizon", "NAVA Estrela", "NAVA Pacifica", "NAVA Boreal"];

export type TrackingResult = {
  reference: string;
  vessel: string;
  voyage: string;
  origin: string;
  destination: string;
  stage: number; // index into MILESTONES
  progress: number; // 0..1 across the ocean leg
  eta: string;
};

function hash(input: string) {
  let h = 2166136261;
  for (const c of input) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

export function normaliseReference(raw: string) {
  return raw.replace(/[\s-]/g, "").toUpperCase();
}

export function simulateTracking(reference: string, now = new Date()): TrackingResult {
  const h = hash(reference);
  const [origin, destination] = LANES[h % LANES.length];
  const stage = 1 + ((h >>> 3) % (MILESTONES.length - 1));
  const progress = stage < 3 ? 0 : stage > 3 ? 1 : 0.2 + ((h >>> 7) % 60) / 100;
  const daysToEta = stage >= 5 ? -((h >>> 11) % 4) - 1 : 2 + ((h >>> 11) % 18);
  const eta = new Date(now.getTime() + daysToEta * 86_400_000);

  return {
    reference,
    vessel: VESSELS[(h >>> 5) % VESSELS.length],
    voyage: `${String.fromCharCode(65 + ((h >>> 9) % 26))}${String((h >>> 13) % 900 + 100)}${stage % 2 ? "E" : "W"}`,
    origin,
    destination,
    stage,
    progress,
    eta: eta.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
  };
}
