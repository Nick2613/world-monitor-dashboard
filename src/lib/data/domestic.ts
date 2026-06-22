export interface DomesticNews {
  id: string;
  country: string;
  title: string;
  category: string;
  time: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  summary: string;
}

export const DOMESTIC_NEWS: Record<string, DomesticNews[]> = {
  US: [
    { id: 'us1', country: 'US', title: 'Fed holds rates at 4.25-4.50%, signals September cut likely', category: 'Economy', time: '1 hr ago', importance: 'critical', source: 'Reuters', summary: 'Federal Reserve maintains current rate with updated dot plot showing majority favoring a cut in Q3.' },
    { id: 'us2', country: 'US', title: 'Supreme Court rules on major AI copyright case', category: 'Tech Policy', time: '3 hr ago', importance: 'high', source: 'AP News', summary: 'Landmark 6-3 decision establishes framework for AI-generated content ownership.' },
    { id: 'us3', country: 'US', title: 'Bipartisan infrastructure bill Phase 2 funding released', category: 'Policy', time: '4 hr ago', importance: 'medium', source: 'The Hill', summary: '$120B in new funding for bridges, broadband, and clean energy infrastructure.' },
    { id: 'us4', country: 'US', title: 'US jobless claims fall to 215K, labor market stays tight', category: 'Economy', time: '5 hr ago', importance: 'high', source: 'BLS', summary: 'Continuing claims decline as hiring remains resilient across sectors.' },
    { id: 'us5', country: 'US', title: 'Pentagon announces $2B AI defense contract awards', category: 'Defense', time: '6 hr ago', importance: 'high', source: 'DoD', summary: 'Contracts awarded to Palantir, Anduril, and Scale AI for autonomous systems development.' },
    { id: 'us6', country: 'US', title: 'California wildfire season: 3 major fires burning across the state', category: 'Natural Disaster', time: '8 hr ago', importance: 'medium', source: 'CalFire', summary: 'Over 200,000 acres burned with evacuation orders affecting 45,000 residents.' },
    { id: 'us7', country: 'US', title: 'Tesla Gigafactory Texas expansion to double output by 2027', category: 'Business', time: '10 hr ago', importance: 'medium', source: 'Austin American-Statesman', summary: '$5B expansion plan creates 5,000 new manufacturing jobs in Central Texas.' },
  ],
  IN: [
    { id: 'in1', country: 'IN', title: 'RBI cuts repo rate by 25bps to 6.25% in surprise move', category: 'Economy', time: '2 hr ago', importance: 'critical', source: 'RBI', summary: 'Reserve Bank of India surprises markets with rate cut citing cooling inflation trends.' },
    { id: 'in2', country: 'IN', title: 'India GDP growth accelerates to 7.8% in Q1 FY27', category: 'Economy', time: '4 hr ago', importance: 'critical', source: 'MoSPI', summary: 'Strong manufacturing and services sector drive fastest growth among major economies.' },
    { id: 'in3', country: 'IN', title: 'ISRO successfully launches next-gen navigation satellite', category: 'Technology', time: '6 hr ago', importance: 'high', source: 'ISRO', summary: 'NVS-2 satellite enhances regional GPS coverage for India and neighboring countries.' },
    { id: 'in4', country: 'IN', title: 'Monsoon arrives in Kerala, IMD forecasts above-normal rainfall', category: 'Weather', time: '8 hr ago', importance: 'high', source: 'IMD', summary: '106% of long-period average expected, boosting agricultural outlook.' },
    { id: 'in5', country: 'IN', title: 'UPI transactions cross 20B in single month for first time', category: 'Fintech', time: '10 hr ago', importance: 'medium', source: 'NPCI', summary: 'Digital payments ecosystem processes over $2T in monthly transaction value.' },
    { id: 'in6', country: 'IN', title: 'Delhi-Mumbai Expressway Phase 3 opens, cuts travel to 12 hours', category: 'Infrastructure', time: '12 hr ago', importance: 'medium', source: 'MoRTH', summary: 'India\'s longest expressway now fully operational, transforming logistics corridor.' },
  ],
  GB: [
    { id: 'gb1', country: 'GB', title: 'Bank of England holds rates at 4.25%, signals August cut', category: 'Economy', time: '3 hr ago', importance: 'critical', source: 'BOE', summary: 'MPC votes 7-2 to hold with inflation falling to 2.1% target range.' },
    { id: 'gb2', country: 'GB', title: 'UK Parliament passes AI regulation framework', category: 'Tech Policy', time: '5 hr ago', importance: 'high', source: 'BBC', summary: 'Pro-innovation approach with sector-specific regulators gaining AI oversight powers.' },
    { id: 'gb3', country: 'GB', title: 'UK GDP grows 0.4% Q2, beating expectations', category: 'Economy', time: '7 hr ago', importance: 'high', source: 'ONS', summary: 'Services sector drives growth as manufacturing stabilizes.' },
    { id: 'gb4', country: 'GB', title: 'NHS AI diagnostic tool rollout to all hospitals by 2027', category: 'Healthcare', time: '9 hr ago', importance: 'medium', source: 'NHS', summary: 'AI-powered diagnostic tools expected to reduce waiting times by 40%.' },
  ],
  JP: [
    { id: 'jp1', country: 'JP', title: 'BOJ holds ultra-loose policy despite yen pressure at 150', category: 'Economy', time: '2 hr ago', importance: 'critical', source: 'BOJ', summary: 'Bank of Japan maintains negative rates, signaling gradual normalization path.' },
    { id: 'jp2', country: 'JP', title: 'Japan chip export controls expanded, new restrictions on China', category: 'Trade Policy', time: '5 hr ago', importance: 'high', source: 'METI', summary: 'Aligned with US restrictions, Japan adds 23 semiconductor equipment categories.' },
    { id: 'jp3', country: 'JP', title: 'TSMC Kumamoto fab begins mass production', category: 'Technology', time: '8 hr ago', importance: 'high', source: 'Nikkei', summary: 'First TSMC Japan fab producing 28nm and 16nm chips for automotive and IoT.' },
    { id: 'jp4', country: 'JP', title: 'Japan population falls below 123M, birth rate hits new low', category: 'Demographics', time: '10 hr ago', importance: 'medium', source: 'MHLW', summary: 'Record low 1.2 million births in 2025 as aging crisis deepens.' },
  ],
  DE: [
    { id: 'de1', country: 'DE', title: 'German industry output rises 1.2%, easing recession fears', category: 'Economy', time: '3 hr ago', importance: 'high', source: 'Destatis', summary: 'Manufacturing rebound led by automotive and machinery sectors.' },
    { id: 'de2', country: 'DE', title: 'Germany commits EUR 50B to semiconductor sovereignty plan', category: 'Technology', time: '6 hr ago', importance: 'high', source: 'Bundeswirtschaftsministerium', summary: 'Major push to reduce dependency on Asian chip manufacturing.' },
    { id: 'de3', country: 'DE', title: 'Bundeswehr recruits 25K in Q2, defense spending at 2.1% GDP', category: 'Defense', time: '8 hr ago', importance: 'medium', source: 'BMVg', summary: 'Defense transformation accelerating under Zeitenwende framework.' },
  ],
  CN: [
    { id: 'cn1', country: 'CN', title: 'China PBOC cuts RRR by 50bps to boost economic stimulus', category: 'Economy', time: '1 hr ago', importance: 'critical', source: 'PBOC', summary: 'People\'s Bank of China releases 1T yuan in liquidity to support growth.' },
    { id: 'cn2', country: 'CN', title: 'China EV exports surge 45% YoY, dominate global market', category: 'Industry', time: '4 hr ago', importance: 'high', source: 'CAAM', summary: 'BYD, NIO, XPeng expand aggressively in EU, Southeast Asia, and Middle East.' },
    { id: 'cn3', country: 'CN', title: 'China tech crackdown easing: Gaming approvals accelerate', category: 'Tech Policy', time: '7 hr ago', importance: 'medium', source: 'NPPA', summary: 'Regulatory pivot as government balances tech innovation with control.' },
    { id: 'cn4', country: 'CN', title: 'Taiwan Strait tensions: 27 PLA aircraft in ADIZ', category: 'Security', time: '9 hr ago', importance: 'high', source: 'MND Taiwan', summary: 'Largest single-day incursion since April as military exercises continue.' },
  ],
  AE: [
    { id: 'ae1', country: 'AE', title: 'UAE non-oil GDP grows 5.2% in Q1, diversification on track', category: 'Economy', time: '3 hr ago', importance: 'high', source: 'UAE MoF', summary: 'Tourism, fintech, and AI sectors drive economic transformation.' },
    { id: 'ae2', country: 'AE', title: 'Dubai launches $50B AI city project', category: 'Technology', time: '6 hr ago', importance: 'high', source: 'Dubai Future Foundation', summary: 'Dedicated AI research and deployment zone targeting 1,000 AI companies.' },
    { id: 'ae3', country: 'AE', title: 'Abu Dhabi sovereign fund invests $10B in US AI infrastructure', category: 'Investment', time: '9 hr ago', importance: 'medium', source: 'ADIA', summary: 'Major data center and compute infrastructure investments across the US.' },
  ],
  SG: [
    { id: 'sg1', country: 'SG', title: 'Singapore MAS maintains tight monetary policy', category: 'Economy', time: '4 hr ago', importance: 'high', source: 'MAS', summary: 'S$NEER policy band unchanged as inflation remains above target.' },
    { id: 'sg2', country: 'SG', title: 'Singapore fintech investment hits $4.2B in H1 2026', category: 'Fintech', time: '8 hr ago', importance: 'medium', source: 'MAS', summary: 'Digital banking and AI-powered wealth management lead investment surge.' },
  ],
  AU: [
    { id: 'au1', country: 'AU', title: 'RBA holds cash rate at 4.10%, housing market cools', category: 'Economy', time: '3 hr ago', importance: 'critical', source: 'RBA', summary: 'Reserve Bank signals rates to stay higher for longer amid services inflation.' },
    { id: 'au2', country: 'AU', title: 'AUKUS submarine program reaches $368B milestone', category: 'Defense', time: '6 hr ago', importance: 'high', source: 'Australian DoD', summary: 'Australia-US submarine industrial base expansion on schedule.' },
    { id: 'au3', country: 'AU', title: 'Australia-China trade relations thaw: new wine export deal', category: 'Trade', time: '10 hr ago', importance: 'medium', source: 'DFAT', summary: 'Breakthrough in agricultural trade as diplomatic relations normalize.' },
  ],
  BR: [
    { id: 'br1', country: 'BR', title: 'Brazil Selic rate cut to 10.75% as inflation falls to 4.1%', category: 'Economy', time: '2 hr ago', importance: 'critical', source: 'BCB', summary: 'Central bank continues easing cycle, markets price further cuts ahead.' },
    { id: 'br2', country: 'BR', title: 'Petrobras announces $20B offshore pre-salt expansion', category: 'Energy', time: '5 hr ago', importance: 'high', source: 'Petrobras', summary: 'Major deepwater oil development in Santos Basin to boost production by 30%.' },
    { id: 'br3', country: 'BR', title: 'Amazon deforestation falls 42% under new enforcement plan', category: 'Environment', time: '8 hr ago', importance: 'medium', source: 'INPE', summary: 'Satellite data confirms significant reduction in Amazon clearing activity.' },
  ],
  SA: [
    { id: 'sa1', country: 'SA', title: 'Saudi Aramco boosts MAX capacity to 13M bpd', category: 'Energy', time: '3 hr ago', importance: 'critical', source: 'Aramco', summary: 'Capacity expansion aligns with Vision 2030 economic diversification timeline.' },
    { id: 'sa2', country: 'SA', title: 'NEOM project receives $20B new investment commitment', category: 'Infrastructure', time: '7 hr ago', importance: 'high', source: 'PIF', summary: 'PIF leads new funding round for The Line and industrial zone development.' },
    { id: 'sa3', country: 'SA', title: 'Saudi Arabia digital economy reaches 4.2% of GDP', category: 'Technology', time: '10 hr ago', importance: 'medium', source: 'MCIT', summary: 'Rapid digital transformation under Vision 2030 digital government program.' },
  ],
  KR: [
    { id: 'kr1', country: 'KR', title: 'BOK holds rates at 3.25%, won weakens past 1345', category: 'Economy', time: '2 hr ago', importance: 'critical', source: 'BOK', summary: 'Export-driven recovery supports policy hold despite currency pressure.' },
    { id: 'kr2', country: 'KR', title: 'Samsung starts 2nm GAA chip production for mobile', category: 'Technology', time: '5 hr ago', importance: 'high', source: 'Samsung', summary: 'Second company after TSMC to mass-produce 2nm chips using GAA transistors.' },
    { id: 'kr3', country: 'KR', title: 'South Korea fertility rate hits 0.72, world\'s lowest', category: 'Demographics', importance: 'high', source: 'KOSTAT', time: '8 hr ago', summary: 'Government announces $200B emergency package to address demographic crisis.' },
  ],
};

export interface EconomicIndicator {
  name: string;
  value: string;
  previous: string;
  trend: string;
  country: string;
}

export const ECONOMIC_INDICATORS: Record<string, EconomicIndicator[]> = {
  US: [
    { name: 'GDP Growth (QoQ)', value: '2.8%', previous: '3.1%', trend: 'down', country: 'US' },
    { name: 'CPI (YoY)', value: '3.2%', previous: '3.4%', trend: 'down', country: 'US' },
    { name: 'Unemployment', value: '4.1%', previous: '4.2%', trend: 'down', country: 'US' },
    { name: 'Fed Funds Rate', value: '4.25-4.50%', previous: '4.25-4.50%', trend: 'stable', country: 'US' },
    { name: '10Y Treasury Yield', value: '4.23%', previous: '4.22%', trend: 'up', country: 'US' },
    { name: 'Trade Balance', value: '-$68.2B', previous: '-$65.1B', trend: 'down', country: 'US' },
    { name: 'Consumer Confidence', value: '102.3', previous: '100.8', trend: 'up', country: 'US' },
    { name: 'PMI Manufacturing', value: '52.1', previous: '51.8', trend: 'up', country: 'US' },
  ],
  IN: [
    { name: 'GDP Growth (YoY)', value: '7.8%', previous: '7.2%', trend: 'up', country: 'IN' },
    { name: 'CPI (YoY)', value: '4.3%', previous: '4.8%', trend: 'down', country: 'IN' },
    { name: 'Unemployment', value: '6.8%', previous: '7.2%', trend: 'down', country: 'IN' },
    { name: 'Repo Rate', value: '6.25%', previous: '6.50%', trend: 'down', country: 'IN' },
    { name: '10Y G-Sec Yield', value: '7.12%', previous: '7.10%', trend: 'up', country: 'IN' },
    { name: 'Current Account', value: '-$23.5B', previous: '-$18.2B', trend: 'down', country: 'IN' },
    { name: 'IIP Growth', value: '5.2%', previous: '4.8%', trend: 'up', country: 'IN' },
    { name: 'PMI Manufacturing', value: '58.2', previous: '57.8', trend: 'up', country: 'IN' },
  ],
  GB: [
    { name: 'GDP Growth (QoQ)', value: '0.4%', previous: '0.2%', trend: 'up', country: 'GB' },
    { name: 'CPI (YoY)', value: '2.1%', previous: '2.3%', trend: 'down', country: 'GB' },
    { name: 'Unemployment', value: '4.3%', previous: '4.4%', trend: 'down', country: 'GB' },
    { name: 'Bank Rate', value: '4.25%', previous: '4.25%', trend: 'stable', country: 'GB' },
    { name: 'PMI Manufacturing', value: '51.2', previous: '50.8', trend: 'up', country: 'GB' },
  ],
  JP: [
    { name: 'GDP Growth (QoQ)', value: '0.3%', previous: '-0.2%', trend: 'up', country: 'JP' },
    { name: 'CPI (YoY)', value: '2.8%', previous: '2.7%', trend: 'up', country: 'JP' },
    { name: 'Unemployment', value: '2.6%', previous: '2.5%', trend: 'up', country: 'JP' },
    { name: 'Policy Rate', value: '-0.10%', previous: '-0.10%', trend: 'stable', country: 'JP' },
    { name: '10Y JGB Yield', value: '1.02%', previous: '1.00%', trend: 'up', country: 'JP' },
    { name: 'PMI Manufacturing', value: '49.8', previous: '49.2', trend: 'up', country: 'JP' },
  ],
  DE: [
    { name: 'GDP Growth (QoQ)', value: '0.2%', previous: '-0.1%', trend: 'up', country: 'DE' },
    { name: 'CPI (YoY)', value: '2.3%', previous: '2.5%', trend: 'down', country: 'DE' },
    { name: 'Unemployment', value: '5.8%', previous: '5.9%', trend: 'down', country: 'DE' },
    { name: 'ECB Rate', value: '3.25%', previous: '3.25%', trend: 'stable', country: 'DE' },
    { name: 'PMI Manufacturing', value: '45.2', previous: '44.8', trend: 'up', country: 'DE' },
  ],
  CN: [
    { name: 'GDP Growth (YoY)', value: '5.2%', previous: '5.3%', trend: 'down', country: 'CN' },
    { name: 'CPI (YoY)', value: '0.5%', previous: '0.3%', trend: 'up', country: 'CN' },
    { name: 'Unemployment', value: '5.1%', previous: '5.2%', trend: 'down', country: 'CN' },
    { name: 'LPR 1Y', value: '3.10%', previous: '3.10%', trend: 'stable', country: 'CN' },
    { name: 'PMI Manufacturing', value: '50.1', previous: '49.8', trend: 'up', country: 'CN' },
  ],
  AE: [
    { name: 'GDP Growth (YoY)', value: '4.5%', previous: '4.2%', trend: 'up', country: 'AE' },
    { name: 'CPI (YoY)', value: '1.8%', previous: '2.0%', trend: 'down', country: 'AE' },
    { name: 'Unemployment', value: '3.2%', previous: '3.3%', trend: 'down', country: 'AE' },
  ],
  SG: [
    { name: 'GDP Growth (YoY)', value: '3.2%', previous: '2.9%', trend: 'up', country: 'SG' },
    { name: 'CPI (YoY)', value: '2.5%', previous: '2.8%', trend: 'down', country: 'SG' },
    { name: 'Unemployment', value: '2.0%', previous: '2.1%', trend: 'down', country: 'SG' },
  ],
  AU: [
    { name: 'GDP Growth (QoQ)', value: '0.5%', previous: '0.3%', trend: 'up', country: 'AU' },
    { name: 'CPI (YoY)', value: '3.4%', previous: '3.6%', trend: 'down', country: 'AU' },
    { name: 'Unemployment', value: '4.0%', previous: '4.1%', trend: 'down', country: 'AU' },
    { name: 'Cash Rate', value: '4.10%', previous: '4.10%', trend: 'stable', country: 'AU' },
  ],
  BR: [
    { name: 'GDP Growth (YoY)', value: '2.8%', previous: '2.5%', trend: 'up', country: 'BR' },
    { name: 'CPI (YoY)', value: '4.1%', previous: '4.5%', trend: 'down', country: 'BR' },
    { name: 'Unemployment', value: '7.8%', previous: '8.1%', trend: 'down', country: 'BR' },
    { name: 'Selic Rate', value: '10.75%', previous: '11.00%', trend: 'down', country: 'BR' },
  ],
  SA: [
    { name: 'GDP Growth (YoY)', value: '3.5%', previous: '3.8%', trend: 'down', country: 'SA' },
    { name: 'CPI (YoY)', value: '1.5%', previous: '1.6%', trend: 'down', country: 'SA' },
    { name: 'Unemployment', value: '5.4%', previous: '5.6%', trend: 'down', country: 'SA' },
  ],
  KR: [
    { name: 'GDP Growth (YoY)', value: '2.4%', previous: '2.2%', trend: 'up', country: 'KR' },
    { name: 'CPI (YoY)', value: '1.9%', previous: '2.1%', trend: 'down', country: 'KR' },
    { name: 'Unemployment', value: '2.8%', previous: '2.7%', trend: 'up', country: 'KR' },
    { name: 'Base Rate', value: '3.25%', previous: '3.25%', trend: 'stable', country: 'KR' },
  ],
};