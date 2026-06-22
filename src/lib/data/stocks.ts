export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  exchange: string;
  timezone: string;
}

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', exchange: 'NYSE / NASDAQ', timezone: 'America/New_York' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', exchange: 'NSE / BSE', timezone: 'Asia/Kolkata' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', exchange: 'LSE', timezone: 'Europe/London' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', exchange: 'TSE', timezone: 'Asia/Tokyo' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', exchange: 'XETRA', timezone: 'Europe/Berlin' },
  { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY', exchange: 'SSE / SZSE', timezone: 'Asia/Shanghai' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', currency: 'AED', exchange: 'DFM / ADX', timezone: 'Asia/Dubai' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', exchange: 'SGX', timezone: 'Asia/Singapore' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', exchange: 'ASX', timezone: 'Australia/Sydney' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL', exchange: 'B3', timezone: 'America/Sao_Paulo' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', exchange: 'Tadawul', timezone: 'Asia/Riyadh' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW', exchange: 'KRX', timezone: 'Asia/Seoul' },
];

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  high52w: number;
  low52w: number;
  country: string;
  sector: string;
}

// Generate realistic stock data per country
export const STOCKS: Record<string, Stock[]> = {
  US: [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 234.58, change: 3.21, changePercent: 1.39, volume: '52.3M', marketCap: '3.6T', high52w: 260.1, low52w: 164.08, country: 'US', sector: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 452.17, change: 5.83, changePercent: 1.31, volume: '28.1M', marketCap: '3.36T', high52w: 468.35, low52w: 309.45, country: 'US', sector: 'Technology' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 135.42, change: -2.18, changePercent: -1.58, volume: '312.5M', marketCap: '3.32T', high52w: 153.13, low52w: 47.32, country: 'US', sector: 'Semiconductors' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 182.36, change: 1.94, changePercent: 1.08, volume: '24.7M', marketCap: '2.24T', high52w: 191.75, low52w: 130.67, country: 'US', sector: 'Technology' },
    { symbol: 'AMZN', name: 'Amazon.com', price: 201.45, change: 2.67, changePercent: 1.34, volume: '45.2M', marketCap: '2.1T', high52w: 213.43, low52w: 139.57, country: 'US', sector: 'Consumer' },
    { symbol: 'META', name: 'Meta Platforms', price: 524.31, change: 8.12, changePercent: 1.57, volume: '18.9M', marketCap: '1.34T', high52w: 542.81, low52w: 274.38, country: 'US', sector: 'Technology' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 267.83, change: -5.41, changePercent: -1.98, volume: '98.4M', marketCap: '854B', high52w: 344.29, low52w: 138.8, country: 'US', sector: 'Automotive' },
    { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 523.18, change: 1.32, changePercent: 0.25, volume: '3.2M', marketCap: '808B', high52w: 545.19, low52w: 388.84, country: 'US', sector: 'Conglomerate' },
    { symbol: 'JPM', name: 'JPMorgan Chase', price: 258.47, change: 3.56, changePercent: 1.4, volume: '9.8M', marketCap: '745B', high52w: 272.63, low52w: 162.45, country: 'US', sector: 'Finance' },
    { symbol: 'V', name: 'Visa Inc.', price: 317.82, change: 2.14, changePercent: 0.68, volume: '7.1M', marketCap: '650B', high52w: 325.08, low52w: 242.52, country: 'US', sector: 'Finance' },
    { symbol: 'JNJ', name: 'Johnson & Johnson', price: 156.23, change: -0.87, changePercent: -0.55, volume: '6.3M', marketCap: '376B', high52w: 168.85, low52w: 143.13, country: 'US', sector: 'Healthcare' },
    { symbol: 'WMT', name: 'Walmart Inc.', price: 94.56, change: 1.23, changePercent: 1.32, volume: '12.4M', marketCap: '761B', high52w: 97.84, low52w: 57.18, country: 'US', sector: 'Retail' },
  ],
  IN: [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2934.50, change: 45.30, changePercent: 1.57, volume: '8.2M', marketCap: '19.9L Cr', high52w: 3024.9, low52w: 2220.3, country: 'IN', sector: 'Conglomerate' },
    { symbol: 'TCS', name: 'Tata Consultancy', price: 4123.75, change: -28.60, changePercent: -0.69, volume: '2.1M', marketCap: '15.0L Cr', high52w: 4440.6, low52w: 3250.5, country: 'IN', sector: 'Technology' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1742.30, change: 18.45, changePercent: 1.07, volume: '5.6M', marketCap: '13.2L Cr', high52w: 1825.4, low52w: 1365.2, country: 'IN', sector: 'Finance' },
    { symbol: 'INFY', name: 'Infosys Ltd.', price: 1876.40, change: 12.80, changePercent: 0.69, volume: '9.3M', marketCap: '7.8L Cr', high52w: 1975.3, low52w: 1383.1, country: 'IN', sector: 'Technology' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1285.60, change: 22.30, changePercent: 1.76, volume: '11.2M', marketCap: '9.0L Cr', high52w: 1334.5, low52w: 987.4, country: 'IN', sector: 'Finance' },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2534.15, change: -15.20, changePercent: -0.60, volume: '1.8M', marketCap: '5.9L Cr', high52w: 2789.0, low52w: 2280.5, country: 'IN', sector: 'Consumer' },
    { symbol: 'SBIN', name: 'State Bank of India', price: 832.40, change: 14.60, changePercent: 1.79, volume: '18.5M', marketCap: '7.4L Cr', high52w: 863.2, low52w: 548.7, country: 'IN', sector: 'Finance' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1645.80, change: 32.10, changePercent: 1.99, volume: '4.7M', marketCap: '9.8L Cr', high52w: 1720.5, low52w: 1080.2, country: 'IN', sector: 'Telecom' },
    { symbol: 'ITC', name: 'ITC Limited', price: 468.75, change: 3.40, changePercent: 0.73, volume: '12.1M', marketCap: '5.8L Cr', high52w: 495.3, low52w: 384.2, country: 'IN', sector: 'Consumer' },
    { symbol: 'KOTAKBANK', name: 'Kotak Mah. Bank', price: 1892.30, change: -8.50, changePercent: -0.45, volume: '3.4M', marketCap: '3.8L Cr', high52w: 2023.7, low52w: 1621.5, country: 'IN', sector: 'Finance' },
  ],
  GB: [
    { symbol: 'SHEL', name: 'Shell plc', price: 28.45, change: 0.32, changePercent: 1.14, volume: '5.8M', marketCap: '185B', high52w: 30.12, low52w: 23.17, country: 'GB', sector: 'Energy' },
    { symbol: 'AZN', name: 'AstraZeneca', price: 128.50, change: -1.23, changePercent: -0.95, volume: '3.2M', marketCap: '164B', high52w: 138.45, low52w: 98.34, country: 'GB', sector: 'Healthcare' },
    { symbol: 'HSBA', name: 'HSBC Holdings', price: 8.23, change: 0.11, changePercent: 1.36, volume: '14.5M', marketCap: '163B', high52w: 8.67, low52w: 5.98, country: 'GB', sector: 'Finance' },
    { symbol: 'ULVR', name: 'Unilever plc', price: 44.12, change: 0.45, changePercent: 1.03, volume: '4.1M', marketCap: '138B', high52w: 47.23, low52w: 36.78, country: 'GB', sector: 'Consumer' },
    { symbol: 'BP', name: 'BP plc', price: 5.32, change: 0.08, changePercent: 1.53, volume: '11.3M', marketCap: '108B', high52w: 5.78, low52w: 4.12, country: 'GB', sector: 'Energy' },
    { symbol: 'GSK', name: 'GSK plc', price: 16.78, change: -0.22, changePercent: -1.30, volume: '6.7M', marketCap: '83B', high52w: 18.45, low52w: 13.23, country: 'GB', sector: 'Healthcare' },
    { symbol: 'BA', name: 'BAE Systems', price: 14.56, change: 0.34, changePercent: 2.39, volume: '5.2M', marketCap: '48B', high52w: 15.12, low52w: 10.34, country: 'GB', sector: 'Defense' },
    { symbol: 'RIO', name: 'Rio Tinto', price: 58.23, change: 1.12, changePercent: 1.96, volume: '3.8M', marketCap: '95B', high52w: 62.45, low52w: 46.78, country: 'GB', sector: 'Mining' },
  ],
  JP: [
    { symbol: '7203', name: 'Toyota Motor', price: 2845.0, change: 42.0, changePercent: 1.50, volume: '8.5M', marketCap: '45.2T', high52w: 2960.0, low52w: 2230.5, country: 'JP', sector: 'Automotive' },
    { symbol: '6758', name: 'Sony Group', price: 13420.0, change: -85.0, changePercent: -0.63, volume: '3.2M', marketCap: '16.8T', high52w: 14520.0, low52w: 9820.0, country: 'JP', sector: 'Technology' },
    { symbol: '6861', name: 'Keyence Corp.', price: 67500.0, change: 1250.0, changePercent: 1.89, volume: '0.8M', marketCap: '16.1T', high52w: 72400.0, low52w: 52800.0, country: 'JP', sector: 'Technology' },
    { symbol: '9984', name: 'SoftBank Group', price: 9845.0, change: 234.0, changePercent: 2.44, volume: '12.5M', marketCap: '13.5T', high52w: 10820.0, low52w: 5120.0, country: 'JP', sector: 'Investment' },
    { symbol: '8306', name: 'MUFG', price: 1890.0, change: 15.0, changePercent: 0.80, volume: '28.3M', marketCap: '18.9T', high52w: 2010.0, low52w: 1345.0, country: 'JP', sector: 'Finance' },
    { symbol: '7974', name: 'Nintendo', price: 8850.0, change: -120.0, changePercent: -1.34, volume: '5.7M', marketCap: '11.2T', high52w: 9870.0, low52w: 7230.0, country: 'JP', sector: 'Gaming' },
    { symbol: '6501', name: 'Hitachi', price: 3245.0, change: 56.0, changePercent: 1.76, volume: '7.1M', marketCap: '14.2T', high52w: 3480.0, low52w: 2580.0, country: 'JP', sector: 'Conglomerate' },
    { symbol: '4063', name: 'Shin-Etsu Chemical', price: 18200.0, change: -230.0, changePercent: -1.25, volume: '1.2M', marketCap: '8.8T', high52w: 19800.0, low52w: 14200.0, country: 'JP', sector: 'Materials' },
  ],
  DE: [
    { symbol: 'SAP', name: 'SAP SE', price: 232.45, change: 3.78, changePercent: 1.65, volume: '3.4M', marketCap: '282B', high52w: 245.12, low52w: 155.34, country: 'DE', sector: 'Technology' },
    { symbol: 'SIE', name: 'Siemens AG', price: 188.72, change: 2.14, changePercent: 1.15, volume: '4.8M', marketCap: '152B', high52w: 198.45, low52w: 145.23, country: 'DE', sector: 'Industrial' },
    { symbol: 'ALV', name: 'Allianz SE', price: 285.30, change: 1.56, changePercent: 0.55, volume: '2.1M', marketCap: '120B', high52w: 298.67, low52w: 228.45, country: 'DE', sector: 'Insurance' },
    { symbol: 'DTE', name: 'Deutsche Telekom', price: 27.45, change: 0.23, changePercent: 0.84, volume: '8.9M', marketCap: '134B', high52w: 29.12, low52w: 19.87, country: 'DE', sector: 'Telecom' },
    { symbol: 'BMW', name: 'BMW AG', price: 98.67, change: -1.23, changePercent: -1.23, volume: '2.3M', marketCap: '64B', high52w: 108.45, low52w: 72.34, country: 'DE', sector: 'Automotive' },
    { symbol: 'BAS', name: 'BASF SE', price: 47.23, change: 0.67, changePercent: 1.44, volume: '3.7M', marketCap: '42B', high52w: 52.34, low52w: 38.12, country: 'DE', sector: 'Chemicals' },
  ],
  CN: [
    { symbol: '600519', name: 'Kweichow Moutai', price: 1485.0, change: 18.5, changePercent: 1.26, volume: '2.1M', marketCap: '1.87T', high52w: 1568.0, low52w: 1320.0, country: 'CN', sector: 'Consumer' },
    { symbol: '601318', name: 'Ping An Insurance', price: 48.35, change: 0.82, changePercent: 1.73, volume: '45.2M', marketCap: '882B', high52w: 52.15, low52w: 33.45, country: 'CN', sector: 'Insurance' },
    { symbol: '600036', name: 'China Merchants Bank', price: 35.67, change: 0.45, changePercent: 1.28, volume: '22.8M', marketCap: '899B', high52w: 38.90, low52w: 27.34, country: 'CN', sector: 'Finance' },
    { symbol: '000858', name: 'Wuliangye Yibin', price: 148.23, change: -2.15, changePercent: -1.43, volume: '8.5M', marketCap: '574B', high52w: 162.45, low52w: 118.34, country: 'CN', sector: 'Consumer' },
    { symbol: '601012', name: 'LONGi Green Energy', price: 24.56, change: 0.78, changePercent: 3.28, volume: '35.4M', marketCap: '186B', high52w: 32.45, low52w: 15.67, country: 'CN', sector: 'Energy' },
    { symbol: '002594', name: 'BYD Company', price: 268.90, change: 5.34, changePercent: 2.03, volume: '15.6M', marketCap: '784B', high52w: 289.45, low52w: 182.34, country: 'CN', sector: 'Automotive' },
  ],
  AE: [
    { symbol: 'EMAAR', name: 'Emaar Properties', price: 10.45, change: 0.18, changePercent: 1.75, volume: '8.2M', marketCap: '102B', high52w: 11.23, low52w: 7.89, country: 'AE', sector: 'Real Estate' },
    { symbol: 'ADNOC', name: 'ADNOC Distribution', price: 4.12, change: 0.05, changePercent: 1.23, volume: '12.5M', marketCap: '110B', high52w: 4.45, low52w: 3.12, country: 'AE', sector: 'Energy' },
    { symbol: 'DIB', name: 'Dubai Islamic Bank', price: 6.78, change: -0.12, changePercent: -1.74, volume: '5.3M', marketCap: '67B', high52w: 7.45, low52w: 5.23, country: 'AE', sector: 'Finance' },
    { symbol: 'ETISALAT', name: 'e& (Etisalat)', price: 18.23, change: 0.34, changePercent: 1.90, volume: '3.8M', marketCap: '212B', high52w: 19.45, low52w: 13.67, country: 'AE', sector: 'Telecom' },
    { symbol: 'ADCBBANK', name: 'Abu Dhabi Commercial', price: 13.45, change: 0.23, changePercent: 1.74, volume: '2.1M', marketCap: '132B', high52w: 14.23, low52w: 9.87, country: 'AE', sector: 'Finance' },
  ],
  SG: [
    { symbol: 'D05', name: 'DBS Group', price: 39.45, change: 0.56, changePercent: 1.44, volume: '4.2M', marketCap: '107B', high52w: 41.23, low52w: 30.12, country: 'SG', sector: 'Finance' },
    { symbol: 'U11', name: 'UOB', price: 31.23, change: 0.34, changePercent: 1.10, volume: '2.8M', marketCap: '58B', high52w: 33.45, low52w: 24.78, country: 'SG', sector: 'Finance' },
    { symbol: 'Z74', name: 'Singtel', price: 3.45, change: 0.02, changePercent: 0.58, volume: '18.5M', marketCap: '65B', high52w: 3.72, low52w: 2.78, country: 'SG', sector: 'Telecom' },
    { symbol: 'O39', name: 'OCBC Bank', price: 15.67, change: 0.23, changePercent: 1.49, volume: '3.1M', marketCap: '78B', high52w: 16.45, low52w: 12.23, country: 'SG', sector: 'Finance' },
    { symbol: 'C38U', name: 'CapitaLand Integrated', price: 3.12, change: 0.04, changePercent: 1.30, volume: '8.9M', marketCap: '28B', high52w: 3.45, low52w: 2.34, country: 'SG', sector: 'Real Estate' },
  ],
  AU: [
    { symbol: 'BHP', name: 'BHP Group', price: 42.34, change: 0.78, changePercent: 1.88, volume: '6.5M', marketCap: '164B', high52w: 45.23, low52w: 35.12, country: 'AU', sector: 'Mining' },
    { symbol: 'CBA', name: 'Commonwealth Bank', price: 128.45, change: 1.23, changePercent: 0.97, volume: '3.2M', marketCap: '196B', high52w: 134.56, low52w: 98.34, country: 'AU', sector: 'Finance' },
    { symbol: 'CSL', name: 'CSL Limited', price: 285.60, change: -2.45, changePercent: -0.85, volume: '1.1M', marketCap: '133B', high52w: 305.23, low52w: 234.56, country: 'AU', sector: 'Healthcare' },
    { symbol: 'RIO', name: 'Rio Tinto', price: 118.23, change: 2.34, changePercent: 2.02, volume: '3.4M', marketCap: '118B', high52w: 128.45, low52w: 95.67, country: 'AU', sector: 'Mining' },
    { symbol: 'NAB', name: 'NAB', price: 34.56, change: 0.45, changePercent: 1.32, volume: '5.8M', marketCap: '92B', high52w: 36.78, low52w: 26.45, country: 'AU', sector: 'Finance' },
  ],
  BR: [
    { symbol: 'PETR4', name: 'Petrobras', price: 38.45, change: 0.67, changePercent: 1.78, volume: '45.2M', marketCap: '501B', high52w: 41.23, low52w: 28.34, country: 'BR', sector: 'Energy' },
    { symbol: 'VALE3', name: 'Vale SA', price: 62.34, change: 1.23, changePercent: 2.01, volume: '22.1M', marketCap: '312B', high52w: 68.45, low52w: 48.12, country: 'BR', sector: 'Mining' },
    { symbol: 'ITUB4', name: 'Itau Unibanco', price: 34.12, change: 0.45, changePercent: 1.34, volume: '28.5M', marketCap: '298B', high52w: 36.78, low52w: 26.34, country: 'BR', sector: 'Finance' },
    { symbol: 'BBDC4', name: 'Bradesco', price: 16.78, change: -0.23, changePercent: -1.35, volume: '35.2M', marketCap: '186B', high52w: 18.45, low52w: 12.67, country: 'BR', sector: 'Finance' },
    { symbol: 'ABEV3', name: 'Ambev SA', price: 14.56, change: 0.12, changePercent: 0.83, volume: '15.8M', marketCap: '229B', high52w: 15.78, low52w: 11.23, country: 'BR', sector: 'Consumer' },
  ],
  SA: [
    { symbol: '2222', name: 'Saudi Aramco', price: 28.45, change: 0.34, changePercent: 1.21, volume: '8.5M', marketCap: '1.78T', high52w: 30.12, low52w: 22.34, country: 'SA', sector: 'Energy' },
    { symbol: '1120', name: 'Al Rajhi Bank', price: 98.23, change: 1.45, changePercent: 1.50, volume: '3.2M', marketCap: '245B', high52w: 105.34, low52w: 78.56, country: 'SA', sector: 'Finance' },
    { symbol: '2350', name: 'ACWA Power', price: 345.0, change: 5.0, changePercent: 1.47, volume: '1.8M', marketCap: '101B', high52w: 368.0, low52w: 245.0, country: 'SA', sector: 'Energy' },
    { symbol: '4280', name: 'Saudi National Bank', price: 42.34, change: 0.56, changePercent: 1.34, volume: '4.5M', marketCap: '85B', high52w: 45.67, low52w: 32.12, country: 'SA', sector: 'Finance' },
    { symbol: '5110', name: 'STC Group', price: 48.90, change: -0.67, changePercent: -1.35, volume: '2.3M', marketCap: '147B', high52w: 54.23, low52w: 35.67, country: 'SA', sector: 'Telecom' },
  ],
  KR: [
    { symbol: '005930', name: 'Samsung Electronics', price: 84500.0, change: 1250.0, changePercent: 1.50, volume: '12.5M', marketCap: '502T', high52w: 92000.0, low52w: 55000.0, country: 'KR', sector: 'Technology' },
    { symbol: '000660', name: 'SK Hynix', price: 185000.0, change: 3200.0, changePercent: 1.76, volume: '4.2M', marketCap: '135T', high52w: 198000.0, low52w: 98000.0, country: 'KR', sector: 'Semiconductors' },
    { symbol: '373220', name: 'LG Energy Solution', price: 385000.0, change: -8500.0, changePercent: -2.16, volume: '1.8M', marketCap: '91T', high52w: 460000.0, low52w: 295000.0, country: 'KR', sector: 'Batteries' },
    { symbol: '005380', name: 'Hyundai Motor', price: 262000.0, change: 4500.0, changePercent: 1.75, volume: '3.5M', marketCap: '100T', high52w: 285000.0, low52w: 185000.0, country: 'KR', sector: 'Automotive' },
    { symbol: '055550', name: 'Shinhan Financial', price: 54200.0, change: 780.0, changePercent: 1.46, volume: '2.8M', marketCap: '51T', high52w: 58500.0, low52w: 38500.0, country: 'KR', sector: 'Finance' },
  ],
};

// Market indices per country
export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export const INDICES: Record<string, MarketIndex[]> = {
  US: [
    { name: 'S&P 500', value: 5942.47, change: 45.23, changePercent: 0.77 },
    { name: 'NASDAQ', value: 19234.56, change: 123.45, changePercent: 0.64 },
    { name: 'DOW 30', value: 43256.78, change: 234.56, changePercent: 0.54 },
    { name: 'Russell 2000', value: 2089.34, change: -12.45, changePercent: -0.59 },
    { name: 'VIX', value: 14.23, change: -0.67, changePercent: -4.50 },
  ],
  IN: [
    { name: 'NIFTY 50', value: 24567.30, change: 234.50, changePercent: 0.96 },
    { name: 'SENSEX', value: 80432.15, change: 745.20, changePercent: 0.94 },
    { name: 'NIFTY BANK', value: 52345.60, change: 456.70, changePercent: 0.88 },
    { name: 'NIFTY IT', value: 38901.45, change: -123.40, changePercent: -0.32 },
    { name: 'INDIA VIX', value: 13.45, change: -0.23, changePercent: -1.68 },
  ],
  GB: [
    { name: 'FTSE 100', value: 8723.45, change: 56.78, changePercent: 0.66 },
    { name: 'FTSE 250', value: 21345.67, change: 123.45, changePercent: 0.58 },
    { name: 'FTSE All-Share', value: 4567.89, change: 28.34, changePercent: 0.62 },
  ],
  JP: [
    { name: 'NIKKEI 225', value: 40125.45, change: 345.67, changePercent: 0.87 },
    { name: 'TOPIX', value: 2876.34, change: 23.45, changePercent: 0.82 },
    { name: 'JPX-NIKKEI 400', value: 22345.67, change: 178.90, changePercent: 0.81 },
  ],
  DE: [
    { name: 'DAX 40', value: 19456.78, change: 123.45, changePercent: 0.64 },
    { name: 'MDAX', value: 28345.12, change: -45.67, changePercent: -0.16 },
    { name: 'TecDAX', value: 3567.89, change: 23.45, changePercent: 0.66 },
  ],
  CN: [
    { name: 'Shanghai Composite', value: 3245.67, change: 28.34, changePercent: 0.88 },
    { name: 'Shenzhen Component', value: 10456.78, change: 89.45, changePercent: 0.86 },
    { name: 'Hang Seng', value: 19456.34, change: 234.56, changePercent: 1.22 },
  ],
  AE: [
    { name: 'DFM General', value: 5234.56, change: 45.67, changePercent: 0.88 },
    { name: 'ADX General', value: 9876.54, change: 78.90, changePercent: 0.81 },
  ],
  SG: [
    { name: 'STI', value: 3456.78, change: 23.45, changePercent: 0.68 },
    { name: 'FSSTI', value: 1234.56, change: 12.34, changePercent: 1.01 },
  ],
  AU: [
    { name: 'ASX 200', value: 8123.45, change: 56.78, changePercent: 0.70 },
    { name: 'ASX All Ordinaries', value: 8456.78, change: 45.67, changePercent: 0.54 },
  ],
  BR: [
    { name: 'IBOVESPA', value: 134567.89, change: 1234.56, changePercent: 0.93 },
    { name: 'BRAZIL INDEX', value: 12456.78, change: 89.45, changePercent: 0.72 },
  ],
  SA: [
    { name: 'Tadawul All Share', value: 12456.78, change: 78.90, changePercent: 0.64 },
    { name: 'TASI', value: 11234.56, change: 56.78, changePercent: 0.51 },
  ],
  KR: [
    { name: 'KOSPI', value: 2789.45, change: 23.45, changePercent: 0.85 },
    { name: 'KOSDAQ', value: 876.34, change: 12.34, changePercent: 1.43 },
  ],
};

// Mini chart data (simulated price history for sparklines)
export function generateSparkline(basePrice: number, points: number = 24, volatility: number = 0.02): number[] {
  const data: number[] = [basePrice];
  for (let i = 1; i < points; i++) {
    const change = (Math.random() - 0.48) * volatility * basePrice;
    data.push(Math.max(basePrice * 0.9, Math.min(basePrice * 1.1, data[i - 1] + change)));
  }
  return data;
}