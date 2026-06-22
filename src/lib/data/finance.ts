export interface ForexPair {
  pair: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
}

export const FOREX: ForexPair[] = [
  { pair: 'EUR/USD', name: 'Euro / US Dollar', price: 1.1245, change: 0.0023, changePercent: 0.21, bid: 1.1243, ask: 1.1247, high: 1.1278, low: 1.1198 },
  { pair: 'GBP/USD', name: 'British Pound / US Dollar', price: 1.3456, change: 0.0045, changePercent: 0.34, bid: 1.3454, ask: 1.3458, high: 1.3498, low: 1.3387 },
  { pair: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 149.23, change: -0.45, changePercent: -0.30, bid: 149.21, ask: 149.25, high: 150.12, low: 148.34 },
  { pair: 'USD/INR', name: 'US Dollar / Indian Rupee', price: 83.45, change: 0.12, changePercent: 0.14, bid: 83.43, ask: 83.47, high: 83.78, low: 83.12 },
  { pair: 'AUD/USD', name: 'Australian Dollar / USD', price: 0.6734, change: 0.0012, changePercent: 0.18, bid: 0.6732, ask: 0.6736, high: 0.6765, low: 0.6701 },
  { pair: 'USD/CNY', name: 'US Dollar / Chinese Yuan', price: 7.2345, change: -0.0123, changePercent: -0.17, bid: 7.2340, ask: 7.2350, high: 7.2567, low: 7.2189 },
  { pair: 'USD/CAD', name: 'US Dollar / Canadian Dollar', price: 1.3678, change: 0.0023, changePercent: 0.17, bid: 1.3676, ask: 1.3680, high: 1.3723, low: 1.3612 },
  { pair: 'USD/CHF', name: 'US Dollar / Swiss Franc', price: 0.8823, change: -0.0012, changePercent: -0.14, bid: 0.8821, ask: 0.8825, high: 0.8867, low: 0.8798 },
  { pair: 'NZD/USD', name: 'New Zealand Dollar / USD', price: 0.6123, change: 0.0008, changePercent: 0.13, bid: 0.6121, ask: 0.6125, high: 0.6156, low: 0.6098 },
  { pair: 'EUR/GBP', name: 'Euro / British Pound', price: 0.8356, change: -0.0012, changePercent: -0.14, bid: 0.8354, ask: 0.8358, high: 0.8389, low: 0.8323 },
  { pair: 'EUR/JPY', name: 'Euro / Japanese Yen', price: 167.89, change: -0.23, changePercent: -0.14, bid: 167.85, ask: 167.93, high: 168.45, low: 166.78 },
  { pair: 'GBP/JPY', name: 'British Pound / Japanese Yen', price: 200.45, change: 0.67, changePercent: 0.34, bid: 200.41, ask: 200.49, high: 201.23, low: 198.56 },
  { pair: 'USD/SGD', name: 'US Dollar / Singapore Dollar', price: 1.3456, change: 0.0012, changePercent: 0.09, bid: 1.3454, ask: 1.3458, high: 1.3498, low: 1.3412 },
  { pair: 'USD/AED', name: 'US Dollar / UAE Dirham', price: 3.6725, change: 0.0000, changePercent: 0.00, bid: 3.6724, ask: 3.6726, high: 3.6725, low: 3.6725 },
  { pair: 'USD/KRW', name: 'US Dollar / Korean Won', price: 1345.67, change: 3.45, changePercent: 0.26, bid: 1345.00, ask: 1346.34, high: 1352.45, low: 1338.56 },
  { pair: 'USD/BRL', name: 'US Dollar / Brazilian Real', price: 5.2345, change: 0.0234, changePercent: 0.45, bid: 5.2323, ask: 5.2367, high: 5.2678, low: 5.1987 },
];

export interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  marketCap: string;
  volume24h: string;
  dominance: number;
}

export const CRYPTO: CryptoAsset[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 108456.78, change24h: 1234.56, changePercent24h: 1.15, marketCap: '2.14T', volume24h: '48.5B', dominance: 56.2 },
  { symbol: 'ETH', name: 'Ethereum', price: 3845.23, change24h: 67.89, changePercent24h: 1.80, marketCap: '462B', volume24h: '18.2B', dominance: 17.8 },
  { symbol: 'BNB', name: 'BNB', price: 689.45, change24h: -5.67, changePercent24h: -0.82, marketCap: '105B', volume24h: '2.1B', dominance: 3.2 },
  { symbol: 'SOL', name: 'Solana', price: 178.34, change24h: 4.56, changePercent24h: 2.62, marketCap: '82B', volume24h: '3.8B', dominance: 2.8 },
  { symbol: 'XRP', name: 'XRP', price: 2.3456, change24h: 0.0567, changePercent24h: 2.47, marketCap: '134B', volume24h: '5.2B', dominance: 4.1 },
  { symbol: 'ADA', name: 'Cardano', price: 0.7823, change24h: 0.0123, changePercent24h: 1.60, marketCap: '27.5B', volume24h: '1.2B', dominance: 1.1 },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.2345, change24h: -0.0089, changePercent24h: -3.66, marketCap: '34.5B', volume24h: '2.8B', dominance: 1.4 },
  { symbol: 'AVAX', name: 'Avalanche', price: 38.45, change24h: 1.23, changePercent24h: 3.30, marketCap: '15.2B', volume24h: '890M', dominance: 0.8 },
  { symbol: 'DOT', name: 'Polkadot', price: 7.23, change24h: 0.12, changePercent24h: 1.69, marketCap: '10.2B', volume24h: '450M', dominance: 0.6 },
  { symbol: 'LINK', name: 'Chainlink', price: 18.45, change24h: 0.45, changePercent24h: 2.50, marketCap: '11.5B', volume24h: '678M', dominance: 0.7 },
  { symbol: 'MATIC', name: 'Polygon', price: 0.5678, change24h: -0.0123, changePercent24h: -2.12, marketCap: '5.6B', volume24h: '345M', dominance: 0.4 },
  { symbol: 'UNI', name: 'Uniswap', price: 12.34, change24h: 0.23, changePercent24h: 1.90, marketCap: '7.4B', volume24h: '234M', dominance: 0.5 },
];

export interface Commodity {
  name: string;
  symbol: string;
  price: number;
  unit: string;
  change: number;
  changePercent: number;
  category: string;
}

export const COMMODITIES: Commodity[] = [
  { name: 'Crude Oil WTI', symbol: 'CL', price: 78.45, unit: 'USD/bbl', change: 1.23, changePercent: 1.59, category: 'Energy' },
  { name: 'Brent Crude', symbol: 'BZ', price: 82.34, unit: 'USD/bbl', change: 1.45, changePercent: 1.79, category: 'Energy' },
  { name: 'Natural Gas', symbol: 'NG', price: 2.845, unit: 'USD/MMBtu', change: -0.056, changePercent: -1.93, category: 'Energy' },
  { name: 'Gold', symbol: 'XAU', price: 2678.45, unit: 'USD/oz', change: 12.34, changePercent: 0.46, category: 'Precious Metals' },
  { name: 'Silver', symbol: 'XAG', price: 31.23, unit: 'USD/oz', change: 0.45, changePercent: 1.46, category: 'Precious Metals' },
  { name: 'Platinum', symbol: 'XPT', price: 987.65, unit: 'USD/oz', change: -5.67, changePercent: -0.57, category: 'Precious Metals' },
  { name: 'Copper', symbol: 'HG', price: 4.567, unit: 'USD/lb', change: 0.034, changePercent: 0.75, category: 'Industrial Metals' },
  { name: 'Aluminum', symbol: 'ALI', price: 2489.0, unit: 'USD/mt', change: 23.45, changePercent: 0.95, category: 'Industrial Metals' },
  { name: 'Iron Ore', symbol: 'FE', price: 112.34, unit: 'USD/mt', change: 2.56, changePercent: 2.33, category: 'Industrial Metals' },
  { name: 'Wheat', symbol: 'ZW', price: 567.89, unit: 'USc/bu', change: -8.45, changePercent: -1.47, category: 'Agriculture' },
  { name: 'Corn', symbol: 'ZC', price: 445.67, unit: 'USc/bu', change: -3.23, changePercent: -0.72, category: 'Agriculture' },
  { name: 'Soybeans', symbol: 'ZS', price: 1134.56, unit: 'USc/bu', change: 12.34, changePercent: 1.10, category: 'Agriculture' },
  { name: 'Coffee', symbol: 'KC', price: 234.56, unit: 'USc/lb', change: 5.67, changePercent: 2.48, category: 'Agriculture' },
  { name: 'Cotton', symbol: 'CT', price: 78.45, unit: 'USc/lb', change: -1.23, changePercent: -1.54, category: 'Agriculture' },
  { name: 'Uranium', symbol: 'UX', price: 82.34, unit: 'USD/lb', change: 1.78, changePercent: 2.21, category: 'Energy' },
];

export interface Bond {
  name: string;
  yield: number;
  change: number;
  country: string;
  maturity: string;
}

export const BONDS: Bond[] = [
  { name: 'US 10Y Treasury', yield: 4.234, change: 0.012, country: 'US', maturity: '10Y' },
  { name: 'US 2Y Treasury', yield: 4.567, change: -0.008, country: 'US', maturity: '2Y' },
  { name: 'US 30Y Bond', yield: 4.456, change: 0.015, country: 'US', maturity: '30Y' },
  { name: 'UK 10Y Gilt', yield: 4.123, change: 0.005, country: 'GB', maturity: '10Y' },
  { name: 'Germany 10Y Bund', yield: 2.345, change: -0.003, country: 'DE', maturity: '10Y' },
  { name: 'Japan 10Y JGB', yield: 1.023, change: 0.001, country: 'JP', maturity: '10Y' },
  { name: 'India 10Y G-Sec', yield: 7.123, change: 0.023, country: 'IN', maturity: '10Y' },
  { name: 'China 10Y Gov Bond', yield: 2.234, change: -0.005, country: 'CN', maturity: '10Y' },
  { name: 'Australia 10Y', yield: 4.345, change: 0.008, country: 'AU', maturity: '10Y' },
  { name: 'Brazil 10Y', yield: 14.234, change: 0.045, country: 'BR', maturity: '10Y' },
];