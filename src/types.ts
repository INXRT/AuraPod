export interface HardwareLayer {
  id: string;
  name: string;
  tagline: string;
  specs: { label: string; value: string }[];
  description: string;
  gain: string;
  iconName: string;
}

export interface TelemetryState {
  rsrp: number; // in dBm e.g. -118 or -78
  sinr: number; // in dB e.g. 2.4 or 18.2
  bars: number; // 1 to 4
  latency: number; // in ms
  downloadSpeed: number; // in Mbps
  uploadSpeed: number; // in Mbps
  frequencyBand: string; // e.g. "3.5 GHz (n78)"
  towerDistance: string; // e.g. "1.4 km (Azimuth 42° NNE)"
  gainAdded: number; // in dBi
}
