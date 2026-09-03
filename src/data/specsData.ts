export interface SpecItem {
  category: string;
  feature: string;
  phoneAlone: string;
  industrialBooster: string;
  mifiDongle: string;
  auraPod: string;
}

export const comparisonSpecs: SpecItem[] = [
  {
    category: "Cost & Economics",
    feature: "Retail Price",
    phoneAlone: "$0 (Existing)",
    industrialBooster: "$450 - $850",
    mifiDongle: "$60 - $120",
    auraPod: "$29 (₹1,999)"
  },
  {
    category: "Hardware",
    feature: "Directional RF Gain",
    phoneAlone: "0 dBi (Omni)",
    industrialBooster: "+60 dB (Active high-power)",
    mifiDongle: "0 to +2 dBi (Omni)",
    auraPod: "+10 to +12 dBi (Directional Focus)"
  },
  {
    category: "Regulatory",
    feature: "Carrier / FCC Licensing",
    phoneAlone: "Not needed",
    industrialBooster: "Requires Carrier Registration",
    mifiDongle: "Carrier SIM Locked",
    auraPod: "100% Unlicensed & Safe (FCC Part 15)"
  },
  {
    category: "Software",
    feature: "Resumable LMS Submission",
    phoneAlone: "❌ Browser crashes",
    industrialBooster: "❌ None",
    mifiDongle: "❌ Browser crashes",
    auraPod: "✅ AuraQueue Never-Fail Engine"
  },
  {
    category: "Offline Mode",
    feature: "Campus Vault & P2P Mesh",
    phoneAlone: "❌ None",
    industrialBooster: "❌ None",
    mifiDongle: "❌ None",
    auraPod: "✅ 3 AM Pre-Caching + DormMesh P2P"
  },
  {
    category: "Portability",
    feature: "Weight & Setup",
    phoneAlone: "In pocket",
    industrialBooster: "5 kg (Rooftop cables)",
    mifiDongle: "140 g (Dongle)",
    auraPod: "Under 180 g (Pocket Block)"
  },
  {
    category: "Power",
    feature: "Power Consumption",
    phoneAlone: "Internal battery",
    industrialBooster: "30W Wall Outlet",
    mifiDongle: "Internal battery (4-6 hrs)",
    auraPod: "<2.1W (Laptop USB-C or Powerbank)"
  }
];

export const bomItems = [
  { component: "Dual 3-Stage Telescopic Antennas", function: "Wideband 4G/5G and Wi-Fi reception", cost: 2.80, costInr: 230 },
  { component: "Gold Pogo-Pin Contacts & Swivel Knuckles", function: "High-efficiency RF impedance match", cost: 1.50, costInr: 125 },
  { component: "Active Ultra-LNA IC + Dual SAW Filters", function: "Sub-1.2 dB Noise Figure signal amplification", cost: 2.20, costInr: 180 },
  { component: "USB-C Micro-PCB & Power Bus", function: "5V 0.5A power delivery & signal coupling", cost: 1.20, costInr: 100 },
  { component: "Anodized Titanium Pocket Chassis & Hinge", function: "Compact pocket block with flip cover", cost: 0.80, costInr: 65 },
  { component: "Recycled Packaging & Braided USB-C Cable", function: "Retail box & cable accessory", cost: 1.00, costInr: 80 },
];
