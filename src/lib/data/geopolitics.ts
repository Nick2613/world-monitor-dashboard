export interface Conflict {
  id: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'escalating' | 'de-escalating' | 'frozen';
  type: string;
  casualties: string;
  displaced: string;
  updated: string;
  description: string;
}

export const CONFLICTS: Conflict[] = [
  { id: 'c1', name: 'Russia-Ukraine War', region: 'Eastern Europe', lat: 48.5, lon: 36.2, severity: 'critical', status: 'active', type: 'State Conflict', casualties: '500K+', displaced: '12M', updated: '2 min ago', description: 'Ongoing full-scale invasion with intense fighting in Donetsk and Kharkiv oblasts.' },
  { id: 'c2', name: 'Gaza-Israel Conflict', region: 'Middle East', lat: 31.4, lon: 34.3, severity: 'critical', status: 'active', type: 'State-NonState', casualties: '45K+', displaced: '2.1M', updated: '5 min ago', description: 'Intense military operations in Gaza with expanding regional tensions involving Hezbollah and Iran.' },
  { id: 'c3', name: 'Sudan Civil War', region: 'East Africa', lat: 15.5, lon: 32.5, severity: 'critical', status: 'escalating', type: 'Civil War', casualties: '150K+', displaced: '12M', updated: '15 min ago', description: 'SAF vs RSF conflict creating humanitarian catastrophe with famine risk.' },
  { id: 'c4', name: 'Myanmar Civil War', region: 'Southeast Asia', lat: 19.7, lon: 96.2, severity: 'high', status: 'active', type: 'Civil War', casualties: '50K+', displaced: '3.5M', updated: '30 min ago', description: 'Military junta facing coordinated offensive from multiple ethnic armed organizations.' },
  { id: 'c5', name: 'Yemen Civil War', region: 'Middle East', lat: 15.5, lon: 48.5, severity: 'high', status: 'active', type: 'Proxy Conflict', casualties: '380K+', displaced: '4.5M', updated: '1 hr ago', description: 'Houthi control of western Yemen with Red Sea shipping attacks disrupting global trade.' },
  { id: 'c6', name: 'DRC Conflict', region: 'Central Africa', lat: -1.5, lon: 29.2, severity: 'high', status: 'escalating', type: 'Insurgency', casualties: '6M+ (cumulative)', displaced: '7M', updated: '2 hr ago', description: 'M23 rebel offensive in North Kivu with Rwanda alleged involvement.' },
  { id: 'c7', name: 'Ethiopia-Somalia Tensions', region: 'Horn of Africa', lat: 5.1, lon: 46.2, severity: 'medium', status: 'escalating', type: 'Interstate', casualties: 'Low', displaced: 'N/A', updated: '3 hr ago', description: 'Memorandum of understanding between Ethiopia and Somaliland raises tensions with Somalia.' },
  { id: 'c8', name: 'South China Sea Tensions', region: 'Asia Pacific', lat: 12.0, lon: 113.0, severity: 'medium', status: 'active', type: 'Territorial Dispute', casualties: 'Minimal', displaced: 'N/A', updated: '1 hr ago', description: ' escalating confrontations between Chinese and Philippine vessels in disputed waters.' },
  { id: 'c9', name: 'Haiti Gang Violence', region: 'Caribbean', lat: 18.9, lon: -72.3, severity: 'high', status: 'escalating', type: 'Internal Unrest', casualties: '5K+', displaced: '600K', updated: '4 hr ago', description: 'Armed gangs control 80% of Port-au-Prince with multinational security mission struggling.' },
  { id: 'c10', name: 'Armenia-Azerbaijan', region: 'South Caucasus', lat: 40.1, lon: 47.5, severity: 'medium', status: 'frozen', type: 'Territorial Dispute', casualties: '7K+ (2020 war)', displaced: '100K', updated: '6 hr ago', description: 'Post-2020 war frozen conflict with ongoing border skirmishes and peace talks.' },
  { id: 'c11', name: 'Sahel Insurgency', region: 'West Africa', lat: 14.5, lon: -1.5, severity: 'high', status: 'escalating', type: 'Insurgency', casualties: '30K+', displaced: '3.2M', updated: '2 hr ago', description: 'JNIM and ISGS expanding operations across Mali, Burkina Faso, and Niger.' },
  { id: 'c12', name: 'Kashmir Tensions', region: 'South Asia', lat: 34.5, lon: 76.0, severity: 'medium', status: 'frozen', type: 'Territorial Dispute', casualties: 'Intermittent', displaced: 'N/A', updated: '8 hr ago', description: 'India-Pakistan tensions over Kashmir with occasional ceasefire violations.' },
];

export interface Sanction {
  target: string;
  imposedBy: string;
  type: string;
  date: string;
  description: string;
  impact: string;
}

export const SANCTIONS: Sanction[] = [
  { target: 'Russia', imposedBy: 'G7 + EU', type: 'Comprehensive', date: '2022-Ongoing', description: 'Oil price cap, SWIFT ban, technology exports, asset freezes', impact: 'Major — GDP contracted 2.1% in 2024' },
  { target: 'Iran', imposedBy: 'US + EU', type: 'Nuclear/Economic', date: '2018-Renewed', description: 'Oil exports, financial transactions, technology transfers', impact: 'Severe — 40% inflation, currency collapse' },
  { target: 'North Korea', imposedBy: 'UN Security Council', type: 'Comprehensive', date: '2006-Ongoing', description: 'WMD-related, arms embargo, luxury goods, labor export', impact: 'Severe — GDP estimated $18B' },
  { target: 'China (Tech)', imposedBy: 'US', type: 'Technology', date: '2019-Ongoing', description: 'Semiconductor equipment, AI chips, Huawei entity list', impact: 'Significant — $100B+ tech sector impact' },
  { target: 'Myanmar Military', imposedBy: 'US + EU + UK', type: 'Targeted', date: '2021-Ongoing', description: 'Arms embargo, gem ban, financial sanctions on military entities', impact: 'Moderate — military relies on regional allies' },
  { target: 'Venezuela', imposedBy: 'US + EU', type: 'Economic/Political', date: '2017-Ongoing', description: 'Oil sector sanctions, gold trading ban, asset freezes', impact: 'Severe — oil production at 30% of capacity' },
  { target: 'Houthi Movement', imposedBy: 'US + UN', type: 'Terrorist/Arms', date: '2024-Renewed', description: 'Designation as Specially Designated Global Terrorist, arms embargo', impact: 'Moderate — limits funding but Iran support continues' },
];

export interface DiplomaticEvent {
  id: string;
  title: string;
  countries: string[];
  type: string;
  date: string;
  significance: 'critical' | 'high' | 'medium';
  description: string;
}

export const DIPLOMATIC_EVENTS: DiplomaticEvent[] = [
  { id: 'd1', title: 'India-USA Quad Summit on Indo-Pacific Security', countries: ['India', 'USA', 'Japan', 'Australia'], type: 'Summit', date: 'Jun 22, 2026', significance: 'high', description: 'Quad leaders meet to strengthen maritime security cooperation amid China tensions.' },
  { id: 'd2', title: 'Russia-China Strategic Partnership Renewal', countries: ['Russia', 'China'], type: 'Bilateral', date: 'Jun 20, 2026', significance: 'critical', description: 'Putin and Xi sign new comprehensive strategic agreement expanding military and economic ties.' },
  { id: 'd3', title: 'EU-Mercosur Trade Deal Finalized After 25 Years', countries: ['EU', 'Brazil', 'Argentina', 'Uruguay', 'Paraguay'], type: 'Trade Agreement', date: 'Jun 18, 2026', significance: 'high', description: 'Historic trade agreement covering 800M people creates world\'s largest free trade area.' },
  { id: 'd4', title: 'BRICS Expansion: 8 New Members Joining', countries: ['BRICS', 'Turkey', 'Egypt', 'Indonesia', 'Nigeria', 'Saudi Arabia', 'UAE', 'Ethiopia'], type: 'Multilateral', date: 'Jun 15, 2026', significance: 'critical', description: 'BRICS expands to 16 members, challenging G7 economic dominance.' },
  { id: 'd5', title: 'Iran Nuclear Talks Resume in Vienna', countries: ['Iran', 'US', 'EU', 'Russia', 'China'], type: 'Negotiation', date: 'Jun 12, 2026', significance: 'high', description: 'Renewed JCPOA negotiations with new US administration showing willingness to engage.' },
  { id: 'd6', title: 'ASEAN Emergency Meeting on South China Sea', countries: ['ASEAN', 'Philippines', 'Vietnam', 'Malaysia'], type: 'Emergency Meeting', date: 'Jun 10, 2026', significance: 'high', description: 'ASEAN members coordinate response to escalating maritime confrontations with China.' },
  { id: 'd7', title: 'African Union Peace Summit on Sudan', countries: ['AU', 'Sudan', 'UAE', 'Saudi Arabia', 'Egypt'], type: 'Peace Summit', date: 'Jun 8, 2026', significance: 'medium', description: 'Attempt to broker ceasefire between SAF and RSF with regional guarantors.' },
  { id: 'd8', title: 'NATO Defense Spending Summit', countries: ['NATO', 'US', 'Germany', 'UK', 'Poland'], type: 'Summit', date: 'Jun 5, 2026', significance: 'high', description: 'All members now meeting 2% GDP defense spending target as Europe rearms.' },
];

export interface Election {
  country: string;
  type: string;
  date: string;
  candidates: string[];
  significance: string;
  status: string;
}

export const ELECTIONS: Election[] = [
  { country: 'United States', type: 'Midterm', date: 'Nov 2026', candidates: ['TBD (D)', 'TBD (R)'], significance: 'Global markets, foreign policy', status: 'Campaigning' },
  { country: 'India', type: 'State Elections', date: 'Nov 2026', candidates: ['BJP', 'INC', 'Regional'], significance: 'Economic reform momentum', status: 'Upcoming' },
  { country: 'Brazil', type: 'Presidential', date: 'Oct 2026', candidates: ['Lula (PT)', 'Bolsonaro (PL)', 'TBD'], significance: 'Latin America\'s largest economy', status: 'Campaigning' },
  { country: 'Germany', type: 'Federal Election', date: 'Sep 2026', candidates: ['CDU/CSU', 'SPD', 'AfD', 'Greens'], significance: 'EU leadership, defense policy', status: 'Campaigning' },
  { country: 'Japan', type: 'General Election', date: 'Oct 2026', candidates: ['LDP', 'CDP', 'Nippon Ishin'], significance: 'BOJ policy, regional security', status: 'Upcoming' },
  { country: 'Australia', type: 'Federal Election', date: 'May 2026', candidates: ['Labor', 'Liberal/National', 'Greens'], significance: 'AUKUS, China relations', status: 'Campaigning' },
];