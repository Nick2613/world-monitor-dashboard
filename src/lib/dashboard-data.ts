// Layer definitions matching the World Monitor dashboard
export interface LayerConfig {
  id: string;
  label: string;
  color: string;
  icon: string;
  description: string;
  defaultOn: boolean;
}

export const LAYERS: LayerConfig[] = [
  { id: 'cables', label: 'Submarine Cables', color: '#3b82f6', icon: '🔗', description: 'Global submarine cable network', defaultOn: true },
  { id: 'outages', label: 'Outages', color: '#ef4444', icon: '🔴', description: 'Internet and service outages', defaultOn: true },
  { id: 'cyberThreats', label: 'Cyber Threats', color: '#f59e0b', icon: '⚠️', description: 'Active cyber threats and attacks', defaultOn: true },
  { id: 'datacenters', label: 'Data Centers', color: '#10b981', icon: '🏢', description: 'Major data center locations', defaultOn: true },
  { id: 'natural', label: 'Natural Events', color: '#8b5cf6', icon: '🌪️', description: 'Natural disasters and events', defaultOn: true },
  { id: 'iranAttacks', label: 'Iran Attacks', color: '#f97316', icon: '🇮🇷', description: 'Iran-related cyber activity', defaultOn: true },
];

export interface Incident {
  id: string;
  type: string;
  title: string;
  description: string;
  lat: number;
  lon: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  source?: string;
}

export interface CablePoint {
  lat: number;
  lon: number;
  name: string;
}

// Simulated submarine cable routes
export const SUBMARINE_CABLES: { name: string; points: [number, number][]; color: string }[] = [
  {
    name: 'SEA-ME-WE 3',
    color: '#3b82f6',
    points: [
      [51.4, 0.1], [50.9, 1.8], [48.9, 2.3], [43.3, 3.0], [37.0, 10.3],
      [30.0, 13.0], [25.0, 15.5], [14.7, 42.8], [8.0, 50.0], [1.3, 103.9],
      [22.3, 114.2], [31.2, 121.5], [35.7, 139.7], [39.7, 140.0]
    ]
  },
  {
    name: 'Transatlantic 1',
    color: '#2563eb',
    points: [
      [40.7, -74.0], [41.0, -70.0], [42.0, -60.0], [44.0, -48.0],
      [47.0, -35.0], [49.4, -2.1], [50.9, 1.8]
    ]
  },
  {
    name: 'Transatlantic 2',
    color: '#1d4ed8',
    points: [
      [40.7, -74.0], [38.5, -65.0], [35.0, -50.0], [30.0, -38.0],
      [25.0, -25.0], [20.0, -20.0], [14.7, -17.4]
    ]
  },
  {
    name: 'Asia-America Gateway',
    color: '#60a5fa',
    points: [
      [35.7, 139.7], [30.0, 131.0], [22.3, 114.2], [14.6, 120.98],
      [3.14, 101.7], [-6.17, 106.85], [-8.65, 115.2], [-33.9, 151.2]
    ]
  },
  {
    name: 'Africa Coast to Europe',
    color: '#93c5fd',
    points: [
      [50.9, 1.8], [48.0, -5.0], [43.0, -9.0], [36.7, -6.0],
      [30.0, -10.0], [25.0, -15.0], [14.7, -17.4]
    ]
  },
  {
    name: 'Pakistan & East Africa',
    color: '#3b82f6',
    points: [
      [24.9, 67.0], [12.8, 45.0], [0.5, 42.0], [-4.0, 39.7],
      [-6.16, 39.2], [-11.6, 43.25], [-25.7, 32.6]
    ]
  },
];

// Simulated data center locations
export const DATA_CENTERS: { lat: number; lon: number; name: string; region: string; tier: string }[] = [
  { lat: 39.0, lon: -77.5, name: 'Ashburn, VA', region: 'North America', tier: 'Hyperscale' },
  { lat: 37.4, lon: -122.1, name: 'Silicon Valley', region: 'North America', tier: 'Hyperscale' },
  { lat: 45.5, lon: -73.6, name: 'Montreal', region: 'North America', tier: 'Large' },
  { lat: 51.5, lon: -0.1, name: 'London', region: 'Europe', tier: 'Hyperscale' },
  { lat: 50.1, lon: 8.7, name: 'Frankfurt', region: 'Europe', tier: 'Hyperscale' },
  { lat: 48.9, lon: 2.35, name: 'Paris', region: 'Europe', tier: 'Large' },
  { lat: 59.3, lon: 18.1, name: 'Stockholm', region: 'Europe', tier: 'Large' },
  { lat: 60.17, lon: 24.94, name: 'Helsinki', region: 'Europe', tier: 'Medium' },
  { lat: 52.37, lon: 4.9, name: 'Amsterdam', region: 'Europe', tier: 'Hyperscale' },
  { lat: 35.7, lon: 139.7, name: 'Tokyo', region: 'Asia Pacific', tier: 'Hyperscale' },
  { lat: 22.3, lon: 114.2, name: 'Hong Kong', region: 'Asia Pacific', tier: 'Hyperscale' },
  { lat: 1.35, lon: 103.8, name: 'Singapore', region: 'Asia Pacific', tier: 'Hyperscale' },
  { lat: 37.57, lon: 127.0, name: 'Seoul', region: 'Asia Pacific', tier: 'Large' },
  { lat: 31.2, lon: 121.5, name: 'Shanghai', region: 'Asia Pacific', tier: 'Hyperscale' },
  { lat: -33.9, lon: 151.2, name: 'Sydney', region: 'Asia Pacific', tier: 'Large' },
  { lat: 19.4, lon: -99.1, name: 'Mexico City', region: 'Latin America', tier: 'Medium' },
  { lat: -23.5, lon: -46.6, name: 'São Paulo', region: 'Latin America', tier: 'Large' },
  { lat: 25.2, lon: 55.3, name: 'Dubai', region: 'Middle East', tier: 'Large' },
  { lat: 28.6, lon: 77.2, name: 'Delhi NCR', region: 'South Asia', tier: 'Large' },
  { lat: 12.97, lon: 77.6, name: 'Bangalore', region: 'South Asia', tier: 'Large' },
  { lat: -33.87, lon: 18.4, name: 'Cape Town', region: 'Africa', tier: 'Medium' },
  { lat: 6.5, lon: 3.4, name: 'Lagos', region: 'Africa', tier: 'Medium' },
  { lat: 55.75, lon: 37.6, name: 'Moscow', region: 'Eastern Europe', tier: 'Large' },
  { lat: 25.0, lon: 121.5, name: 'Taipei', region: 'Asia Pacific', tier: 'Large' },
  { lat: 13.75, lon: 100.5, name: 'Bangkok', region: 'Asia Pacific', tier: 'Medium' },
  { lat: 47.6, lon: -122.3, name: 'Seattle', region: 'North America', tier: 'Large' },
  { lat: 32.1, lon: 34.8, name: 'Tel Aviv', region: 'Middle East', tier: 'Medium' },
  { lat: 41.0, lon: 28.98, name: 'Istanbul', region: 'Europe', tier: 'Medium' },
  { lat: -1.3, lon: 36.8, name: 'Nairobi', region: 'Africa', tier: 'Small' },
  { lat: 35.69, lon: 51.39, name: 'Tehran', region: 'Middle East', tier: 'Medium' },
];

// Simulated outages
export const OUTAGES: { lat: number; lon: number; name: string; impact: string; status: string }[] = [
  { lat: 40.7, lon: -74.0, name: 'New York Metro', impact: 'Major ISP outage affecting 2.3M users', status: 'active' },
  { lat: 51.5, lon: -0.1, name: 'London East', impact: 'Cloud provider regional failure', status: 'active' },
  { lat: 35.7, lon: 139.7, name: 'Tokyo Data Corridor', impact: 'Submarine cable degradation', status: 'degraded' },
  { lat: -23.5, lon: -46.6, name: 'São Paulo', impact: 'Power grid affecting DC operations', status: 'active' },
  { lat: 1.35, lon: 103.8, name: 'Singapore Exchange', impact: 'Partial routing failure', status: 'resolving' },
  { lat: 55.75, lon: 37.6, name: 'Moscow Region', impact: 'State-directed internet throttle', status: 'active' },
  { lat: 22.3, lon: 114.2, name: 'Hong Kong Gateway', impact: 'Undersea cable cut (2 cables)', status: 'degraded' },
  { lat: 50.1, lon: 8.7, name: 'Frankfurt Hub', impact: 'DDoS on major IX', status: 'resolving' },
  { lat: 25.2, lon: 55.3, name: 'Dubai Region', impact: 'DNS resolution failures', status: 'active' },
  { lat: -33.9, lon: 151.2, name: 'Sydney CBD', impact: 'Fiber cut in metro area', status: 'degraded' },
  { lat: 19.4, lon: -99.1, name: 'Mexico City', impact: 'Government firewall upgrades', status: 'active' },
  { lat: 6.5, lon: 3.4, name: 'Lagos West Africa', impact: 'SAT-3 cable fault', status: 'active' },
];

// Simulated cyber threats
export const CYBER_THREATS: { lat: number; lon: number; name: string; type: string; severity: string }[] = [
  { lat: 55.75, lon: 37.6, name: 'APT29 - Cozy Bear', type: 'APT Campaign', severity: 'critical' },
  { lat: 39.9, lon: 116.4, name: 'APT41 - Double Dragon', type: 'Supply Chain', severity: 'critical' },
  { lat: 35.69, lon: 51.39, name: 'IRGC Cyber Command', type: 'State-Sponsored', severity: 'high' },
  { lat: 37.57, lon: 127.0, name: 'Lazarus Group', type: 'Ransomware', severity: 'high' },
  { lat: 51.4, lon: -0.1, name: 'LockBit 4.0', type: 'Ransomware-as-Service', severity: 'high' },
  { lat: -22.9, lon: -43.2, name: 'Anonymous Brazil', type: 'Hacktivism', severity: 'medium' },
  { lat: 48.86, lon: 2.35, name: 'Phishing Cluster', type: 'Phishing', severity: 'medium' },
  { lat: 28.6, lon: 77.2, name: 'APT Campaign - Patchwork', type: 'APT Campaign', severity: 'high' },
  { lat: 47.6, lon: -122.3, name: 'Ransomware Operators', type: 'Ransomware', severity: 'high' },
  { lat: 25.0, lon: 121.5, name: 'State-Sponsored Espionage', type: 'Cyber Espionage', severity: 'critical' },
  { lat: 52.5, lon: 13.4, name: 'DDoS-for-Hire Network', type: 'DDoS', severity: 'medium' },
  { lat: 30.0, lon: 31.2, name: 'Sandworm Activity', type: 'Destructive Malware', severity: 'critical' },
  { lat: 45.4, lon: -75.7, name: 'Financial Sector Targeting', type: 'APT Campaign', severity: 'high' },
  { lat: 14.6, lon: 121.0, name: 'Cryptojacking Surge', type: 'Cryptomining', severity: 'low' },
];

// Simulated natural events
export const NATURAL_EVENTS: { lat: number; lon: number; name: string; type: string; severity: string }[] = [
  { lat: 35.68, lon: 139.73, name: 'Japan Earthquake M5.2', type: 'Earthquake', severity: 'medium' },
  { lat: 19.4, lon: -155.3, name: 'Mauna Loa Activity', type: 'Volcano', severity: 'high' },
  { lat: 14.6, lon: 121.0, name: 'Typhoon Warning', type: 'Typhoon', severity: 'high' },
  { lat: -33.4, lon: -70.6, name: 'Chile Earthquake M6.1', type: 'Earthquake', severity: 'high' },
  { lat: 25.0, lon: 90.0, name: 'Cyclone Warning - Bay of Bengal', type: 'Cyclone', severity: 'high' },
  { lat: 64.1, lon: -21.9, name: 'Iceland Volcanic Unrest', type: 'Volcano', severity: 'medium' },
  { lat: 28.2, lon: -13.8, name: 'Canary Islands Swarm', type: 'Earthquake', severity: 'medium' },
  { lat: -6.2, lon: 106.8, name: 'Indonesia Volcanic Alert', type: 'Volcano', severity: 'high' },
  { lat: 37.8, lon: -122.4, name: 'SF Bay Area Storm', type: 'Storm', severity: 'medium' },
  { lat: -37.8, lon: 145.0, name: 'Victoria Floods', type: 'Flood', severity: 'high' },
];

// Simulated Iran attacks
export const IRAN_ATTACKS: { lat: number; lon: number; name: string; target: string; type: string }[] = [
  { lat: 32.0, lon: 34.8, name: 'Israel Infrastructure Targeting', target: 'Power Grid', type: 'Destructive' },
  { lat: 50.1, lon: 8.7, name: 'German Industrial Espionage', target: 'Manufacturing', type: 'Espionage' },
  { lat: 38.9, lon: -77.0, name: 'US Government Probing', target: 'Federal Networks', type: 'Reconnaissance' },
  { lat: 51.5, lon: -0.1, name: 'UK Financial Sector DDoS', target: 'Banking', type: 'DDoS' },
  { lat: 35.7, lon: 139.7, name: 'Japan Defense Networks', target: 'Defense Contractor', type: 'APT' },
  { lat: -33.9, lon: 18.4, name: 'South Africa SCADA Targeting', target: 'Energy Infrastructure', type: 'Destructive' },
  { lat: 25.2, lon: 55.3, name: 'Gulf Region Campaign', target: 'Oil & Gas', type: 'Sabotage' },
  { lat: 46.2, lon: 6.15, name: 'Geneva UN Network Probing', target: 'Diplomatic Networks', type: 'Espionage' },
  { lat: 22.3, lon: 114.2, name: 'Asia Pacific Campaign', target: 'Telecom', type: 'Espionage' },
  { lat: -23.5, lon: -46.6, name: 'LATAM Infrastructure Scan', target: 'Utilities', type: 'Reconnaissance' },
  { lat: 48.86, lon: 2.35, name: 'French Naval Intelligence', target: 'Naval Systems', type: 'Espionage' },
  { lat: 55.75, lon: 37.6, name: 'Russia-Iran Collaboration', target: 'Joint Operations', type: 'State-Sponsored' },
];

// DEFCON simulation data
export const DEFCON_DATA = {
  level: 5,
  label: 'DEFCON 5',
  description: 'Lowest threat level. Normal peacetime operations.',
  percentage: 2,
  trend: 'stable' as const,
};

// Live incident feed
export const LIVE_INCIDENTS: { id: string; time: string; title: string; type: string; severity: string }[] = [
  { id: '1', time: '2 min ago', title: 'Major DDoS attack targeting European banking sector', type: 'cyber', severity: 'high' },
  { id: '2', time: '8 min ago', title: 'Submarine cable SEA-ME-WE 3 experiencing packet loss', type: 'cable', severity: 'medium' },
  { id: '3', time: '15 min ago', title: 'IRGC cyber unit detected probing US federal networks', type: 'iran', severity: 'critical' },
  { id: '4', time: '22 min ago', title: 'Lagos data center power grid failure impacting West Africa connectivity', type: 'outage', severity: 'high' },
  { id: '5', time: '31 min ago', title: 'Magnitude 5.2 earthquake detected near Tokyo - monitoring infrastructure', type: 'natural', severity: 'medium' },
  { id: '6', time: '45 min ago', title: 'APT41 supply chain compromise detected in 3 cloud providers', type: 'cyber', severity: 'critical' },
  { id: '7', time: '1 hr ago', title: 'Hong Kong submarine cable cut - 40% capacity reduction on APAC routes', type: 'cable', severity: 'high' },
  { id: '8', time: '1 hr ago', title: 'New LockBit 4.0 variant targeting healthcare sector in UK', type: 'cyber', severity: 'high' },
  { id: '9', time: '2 hr ago', title: 'Frankfurt Internet Exchange under sustained DDoS - mitigation in progress', type: 'outage', severity: 'medium' },
  { id: '10', time: '2 hr ago', title: 'Iran-linked APT targeting Gulf oil & gas SCADA systems', type: 'iran', severity: 'critical' },
  { id: '11', time: '3 hr ago', title: 'Canary Islands seismic swarm - 12 events in 24 hours', type: 'natural', severity: 'low' },
  { id: '12', time: '3 hr ago', title: 'Moscow region implementing state-directed traffic throttling', type: 'outage', severity: 'high' },
];

// Statistics
export const STATS = {
  activeOutages: 12,
  cyberThreats: 47,
  dataCenters: 30,
  cablesMonitored: 482,
  naturalEvents: 8,
  iranActivity: 23,
  totalIncidents24h: 156,
};

export const CATEGORIES = [
  { id: 'world', label: 'WORLD', icon: '🌍', active: true },
  { id: 'tech', label: 'TECH', icon: '💻', active: false },
  { id: 'finance', label: 'FINANCE', icon: '📈', active: false },
  { id: 'commodity', label: 'COMMODITY', icon: '⛏️', active: false },
  { id: 'energy', label: 'ENERGY', icon: '⚡', active: false },
  { id: 'goodnews', label: 'Good News', icon: '☀️', active: false },
];