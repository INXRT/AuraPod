export interface SpecItem {
  category: string;
  feature: string;
  phoneAlone: string;
  industrialBooster: string;
  auraPodPocket: string;
  auraPodRoom: string;
}

export const comparisonSpecs: SpecItem[] = [
  {
    category: "Cost & Value",
    feature: "Retail Price",
    phoneAlone: "$0 (Existing)",
    industrialBooster: "$450 - $850",
    auraPodPocket: "$29 (₹1,999)",
    auraPodRoom: "$49 (₹3,499)"
  },
  {
    category: "Hardware Architecture",
    feature: "RF Concentrator",
    phoneAlone: "Internal dipole (Omni)",
    industrialBooster: "External Yagi Rooftop Mast",
    auraPodPocket: "Dual Telescopic Masts (Swivel Array)",
    auraPodRoom: "18-Stage Parabolic Metamaterial Dish"
  },
  {
    category: "Directional Gain",
    feature: "RF Signal Focus",
    phoneAlone: "0 dBi (Scattered)",
    industrialBooster: "+60 dB (Active High-Power)",
    auraPodPocket: "+12 dBi (Direct Device Beam)",
    auraPodRoom: "+11.8 dBi (120° Wide-Room Aperture)"
  },
  {
    category: "Ideal Environment",
    feature: "Deployment Setting",
    phoneAlone: "Dead zone failure",
    industrialBooster: "Permanent building drill-in",
    auraPodPocket: "Everyday carry: Library, cafe, travel",
    auraPodRoom: "Stationary hub: Multi-bed dorm, desk, window"
  },
  {
    category: "Portability & Form Factor",
    feature: "Size & Weight",
    phoneAlone: "In pocket",
    industrialBooster: "5 kg (Coaxial cable run)",
    auraPodPocket: "<180 g (Solid Pocket Block)",
    auraPodRoom: "320 g (Cylindrical Desk Hub + Folding Dish)"
  },
  {
    category: "Power Consumption",
    feature: "Power Supply",
    phoneAlone: "Internal phone battery",
    industrialBooster: "30W Wall Outlet (Grid)",
    auraPodPocket: "<2.1W (Laptop USB-C or Power Bank)",
    auraPodRoom: "<2.5W (5V USB-C or Desktop Power)"
  },
  {
    category: "Regulatory Safety",
    feature: "FCC / Carrier Licensing",
    phoneAlone: "Not needed",
    industrialBooster: "Requires Carrier Registration",
    auraPodPocket: "100% Unlicensed Safe (FCC Part 15)",
    auraPodRoom: "100% Unlicensed Safe (FCC Part 15)"
  },
  {
    category: "Resilience Software",
    feature: "LMS Submission Defense",
    phoneAlone: "❌ Browser upload crashes",
    industrialBooster: "❌ None (RF only)",
    auraPodPocket: "✅ AuraQueue Never-Fail Engine",
    auraPodRoom: "✅ AuraQueue + Multi-Device Dorm Sync"
  }
];

export const pocketBomItems = [
  { component: "Dual 3-Stage Telescopic Masts", function: "Multi-band 4G/5G and Wi-Fi beam capture", cost: 2.80, costInr: 230 },
  { component: "CNC Swivel Knuckles & Gold Pogo Pins", function: "Low-loss RF impedance joint & stowage slot", cost: 1.50, costInr: 125 },
  { component: "Shielded Active LNA IC + SAW Filter", function: "Sub-1.2 dB Noise Figure signal amplification", cost: 2.20, costInr: 180 },
  { component: "5V USB-C Bus & Micro-Controller", function: "Power regulation, telemetry & status logic", cost: 1.20, costInr: 100 },
  { component: "Anodized Titanium Pocket Block & Hinge", function: "Ultra-compact pocket block casing", cost: 0.80, costInr: 65 },
  { component: "Recycled Packaging & Braided Cable", function: "Retail box & durable USB-C braided cable", cost: 1.00, costInr: 80 },
];

export const roomBomItems = [
  { component: "18-Stage Parabolic Metamaterial Grid", function: "Origami wideband radio wave concentrator", cost: 3.60, costInr: 295 },
  { component: "Focal Feed Receiver Horn & Dielectric Node", function: "Precision focal collector & dielectric lens", cost: 2.40, costInr: 195 },
  { component: "Dual CNC Aluminum Articulated Struts", function: "45° radar elevation to 12mm flat-fold arm", cost: 2.10, costInr: 170 },
  { component: "Shielded Ultra-LNA & Multi-Band RF Filter", function: "Multi-device room-scale RF amplification", cost: 2.50, costInr: 205 },
  { component: "Anodized Cylindrical Pod Base & Halo Ring", function: "Desk-stabilizing weighted pod with LED halo", cost: 1.80, costInr: 150 },
  { component: "Retail Packaging, Desk Stand & Cable", function: "Desk kit box, rubber foot pads & 2m cable", cost: 1.80, costInr: 150 },
];

// Default export for backwards compatibility
export const bomItems = pocketBomItems;
