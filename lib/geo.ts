// Equirectangular projection matching scripts/generate-world-dots.mjs
export const MAP = { width: 1000, latTop: 80, latBottom: -58 } as const;
export const MAP_HEIGHT = Math.round((MAP.width * (MAP.latTop - MAP.latBottom)) / 360);

export type LatLon = readonly [lat: number, lon: number];

export function project([lat, lon]: LatLon): [number, number] {
  return [
    ((lon + 180) / 360) * MAP.width,
    ((MAP.latTop - lat) / (MAP.latTop - MAP.latBottom)) * MAP_HEIGHT,
  ];
}

export type Port = { id: string; name: string; region: string; coords: LatLon; hub?: boolean };

export const PORTS: Port[] = [
  { id: "lisbon", name: "Lisbon", region: "Europe", coords: [38.7, -9.1], hub: true },
  { id: "rotterdam", name: "Rotterdam", region: "Europe", coords: [51.9, 4.5], hub: true },
  { id: "luanda", name: "Luanda", region: "Africa", coords: [-8.8, 13.2], hub: true },
  { id: "singapore", name: "Singapore", region: "Asia", coords: [1.3, 103.8], hub: true },
  { id: "shanghai", name: "Shanghai", region: "Asia", coords: [31.2, 121.5] },
  { id: "jebel-ali", name: "Jebel Ali", region: "Middle East", coords: [25.0, 55.1] },
  { id: "lagos", name: "Lagos", region: "Africa", coords: [6.4, 3.4] },
  { id: "durban", name: "Durban", region: "Africa", coords: [-29.9, 31.0] },
  { id: "santos", name: "Santos", region: "South America", coords: [-23.96, -46.3] },
  { id: "new-york", name: "New York", region: "North America", coords: [40.7, -74.0] },
  { id: "houston", name: "Houston", region: "North America", coords: [29.7, -95.0] },
  { id: "los-angeles", name: "Los Angeles", region: "North America", coords: [33.7, -118.2] },
];

// Waypoints roughly follow real sea lanes (Suez, Cape, Panama, Malacca).
const W = {
  channel: [49.5, -5.5],
  finisterre: [43.5, -10.5],
  gibraltar: [36.0, -6.0],
  sicily: [36.5, 13.5],
  suez: [30.5, 32.4],
  bab: [12.6, 43.4],
  socotra: [13.5, 53.0],
  hormuz: [26.0, 56.5],
  srilanka: [5.5, 80.5],
  malacca: [4.5, 98.5],
  southChinaSea: [12.0, 112.0],
  taiwan: [24.5, 121.0],
  canaries: [27.5, -16.5],
  capeVerde: [14.5, -20.0],
  guinea: [2.0, 2.0],
  angolaOff: [-12.0, 10.5],
  capeGood: [-36.0, 20.0],
  midAtlanticN: [40.0, -40.0],
  midAtlanticS: [-5.0, -25.0],
  brazilEast: [-8.0, -33.5],
  florida: [24.5, -82.0],
  caribbean: [15.5, -75.0],
  panama: [8.5, -79.5],
  mexicoPac: [16.0, -100.0],
  midPacific: [30.0, -170.0],
  japanE: [33.0, 145.0],
} as const satisfies Record<string, LatLon>;

const port = (id: string) => PORTS.find((p) => p.id === id)!.coords;

export type Route = { id: string; points: LatLon[]; duration: number };

export const ROUTES: Route[] = [
  {
    id: "rotterdam-singapore",
    duration: 14,
    points: [port("rotterdam"), W.channel, W.finisterre, W.gibraltar, W.sicily, W.suez, W.bab, W.srilanka, W.malacca, port("singapore")],
  },
  { id: "singapore-shanghai", duration: 7, points: [port("singapore"), W.southChinaSea, W.taiwan, port("shanghai")] },
  { id: "lisbon-luanda", duration: 10, points: [port("lisbon"), W.canaries, W.capeVerde, W.guinea, W.angolaOff, port("luanda")] },
  { id: "lisbon-lagos", duration: 9, points: [port("lisbon"), W.canaries, W.capeVerde, port("lagos")] },
  { id: "luanda-durban", duration: 8, points: [port("luanda"), W.angolaOff, [-24, 11], W.capeGood, [-34, 28], port("durban")] },
  { id: "durban-singapore", duration: 12, points: [port("durban"), [-20, 60], [-5, 85], W.malacca, port("singapore")] },
  { id: "rotterdam-newyork", duration: 11, points: [port("rotterdam"), W.channel, [48, -30], port("new-york")] },
  { id: "lisbon-santos", duration: 12, points: [port("lisbon"), W.canaries, W.capeVerde, W.midAtlanticS, W.brazilEast, port("santos")] },
  { id: "newyork-houston", duration: 8, points: [port("new-york"), [33, -76], W.florida, [26, -90], port("houston")] },
  { id: "houston-losangeles", duration: 12, points: [port("houston"), [22, -88], W.caribbean, W.panama, W.mexicoPac, [22, -110], port("los-angeles")] },
  // Transpacific lane, split at the antimeridian so it wraps around the map edges.
  { id: "losangeles-pacific", duration: 9, points: [port("los-angeles"), [31, -150], W.midPacific, [31, -180]] },
  { id: "pacific-shanghai", duration: 9, points: [[31, 180], [32, 160], W.japanE, port("shanghai")] },
  { id: "suez-jebelali", duration: 9, points: [W.bab, W.socotra, [22.5, 60], W.hormuz, port("jebel-ali")] },
];

/** Smooth polyline through projected points (Catmull-Rom → cubic Bézier). */
export function routePath(points: LatLon[]): string {
  const p = points.map(project);
  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}
