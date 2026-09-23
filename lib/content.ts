import {
  CalendarClock,
  Container,
  Earth,
  FileCheck,
  Forklift,
  Fuel,
  Gauge,
  Headset,
  Route,
  ShieldCheck,
  Ship,
  TrainFront,
  Warehouse,
  Wind,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "NAVA",
  legalName: "NAVA Maritime Transport",
  url: "https://www.nava-shipping.com",
  email: "info@nava-shipping.com",
  description:
    "Reliable maritime transport and global logistics solutions connecting businesses, ports and markets worldwide.",
};

export const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Global Network", href: "#network" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Contact", href: "#contact" },
] as const;

export const STATS = [
  { value: 45, suffix: "+", label: "Countries served" },
  { value: 120, suffix: "+", label: "Ports of call" },
  { value: 500, suffix: "K+", label: "TEU transported" },
  { value: 24, suffix: "/7", label: "Operations" },
] as const;

export type Service = { title: string; description: string; icon: LucideIcon; tag: string };

export const SERVICES: Service[] = [
  {
    title: "Ocean Freight",
    tag: "FCL · LCL",
    icon: Ship,
    description: "International container transport on scheduled liner services, full or shared loads, door to door.",
  },
  {
    title: "Project Cargo",
    tag: "Heavy lift · OOG",
    icon: Container,
    description: "Engineered transport for oversized, heavy and high-value cargo — from turbines to industrial plants.",
  },
  {
    title: "Port Logistics",
    tag: "Terminals",
    icon: Forklift,
    description: "Terminal handling, stevedoring and port operations managed end to end by on-site specialists.",
  },
  {
    title: "Intermodal Transport",
    tag: "Sea · Road · Rail",
    icon: TrainFront,
    description: "Seamless combinations of sea, road and rail that move cargo inland with a single point of contact.",
  },
  {
    title: "Warehousing",
    tag: "Storage · Distribution",
    icon: Warehouse,
    description: "Bonded and general warehousing, inventory control, consolidation and last-mile distribution.",
  },
  {
    title: "Customs & Documentation",
    tag: "Compliance",
    icon: FileCheck,
    description: "Customs clearance, trade documentation and regulatory support across every border you cross.",
  },
];

export const ADVANTAGES = [
  {
    title: "Global Network",
    icon: Earth,
    description: "Owned offices and trusted agents in 45+ countries, with direct calls at the world's key ports.",
  },
  {
    title: "Reliable Schedules",
    icon: CalendarClock,
    description: "Fixed-day weekly departures and proactive updates, so your supply chain runs on time.",
  },
  {
    title: "Cargo Security",
    icon: ShieldCheck,
    description: "Sealed, monitored and insured from origin to destination under ISO-certified procedures.",
  },
  {
    title: "Dedicated Support",
    icon: Headset,
    description: "A named logistics advisor and a 24/7 operations desk that answers in minutes, not days.",
  },
] as const;

export const SUSTAINABILITY = [
  { title: "Energy efficiency", icon: Gauge, description: "Hull, propeller and engine upgrades that cut fuel burn per container." },
  { title: "Lower emissions", icon: Wind, description: "Measurable reduction targets for CO₂, SOx and NOx across the fleet." },
  { title: "Route optimisation", icon: Route, description: "Weather-routing and slow steaming to save fuel on every voyage." },
  { title: "Cleaner fuels", icon: Fuel, description: "Progressive adoption of biofuels, LNG and future-ready alternatives." },
] as const;

export const OFFICES = [
  { city: "Lisbon", role: "Headquarters", address: "Av. Infante D. Henrique 300, 1950-421", phone: "+351 210 000 100" },
  { city: "Rotterdam", role: "Northern Europe", address: "Waalhaven Z.z. 44, 3089 JH", phone: "+31 10 000 2200" },
  { city: "Luanda", role: "Africa", address: "Av. 4 de Fevereiro 81, Porto de Luanda", phone: "+244 222 000 300" },
  { city: "Singapore", role: "Asia Pacific", address: "1 HarbourFront Ave, #12-01, 098632", phone: "+65 6000 4400" },
] as const;

export const FOOTER_LINKS = [
  { label: "Company", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Global Network", href: "#network" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Careers", href: "mailto:careers@nava-shipping.com" },
  { label: "Contact", href: "#contact" },
] as const;
