'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import {
  COUNTRIES, STOCKS, INDICES, generateSparkline,
  type Stock, type MarketIndex,
} from '@/lib/data/stocks';
import { FOREX, CRYPTO, COMMODITIES, BONDS } from '@/lib/data/finance';
import { AI_NEWS, FUNDING_ROUNDS, AI_MODELS } from '@/lib/data/tech-ai';
import { CONFLICTS, SANCTIONS, DIPLOMATIC_EVENTS, ELECTIONS } from '@/lib/data/geopolitics';
import { DOMESTIC_NEWS, ECONOMIC_INDICATORS } from '@/lib/data/domestic';
import { SUBMARINE_CABLES, DATA_CENTERS, OUTAGES, CYBER_THREATS, NATURAL_EVENTS, IRAN_ATTACKS, LIVE_INCIDENTS, STATS, DEFCON_DATA } from '@/lib/dashboard-data';
import {
  Search, Maximize2, Settings, X, ChevronDown,
  Eye, EyeOff, Radio, Clock, Shield, Zap, Globe, Server, Cable,
  AlertTriangle, Flag, PanelLeftClose, PanelLeftOpen,
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, BarChart3,
  Landmark, Briefcase, Coins,
  Activity, Minus,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface ActiveLayers { [key: string]: boolean }
type TabId = 'world' | 'finance' | 'techai' | 'geopolitics' | 'domestic';

// ─── Constants ───────────────────────────────────────────────────────────────
const EXCHANGE_COORDS: Record<string, [number, number, string]> = {
  US: [40.71, -74.01, 'NYSE / NASDAQ'],
  IN: [19.07, 72.87, 'BSE / NSE'],
  GB: [51.51, -0.09, 'LSE'],
  JP: [35.67, 139.75, 'TSE'],
  DE: [50.11, 8.68, 'XETRA'],
  CN: [31.23, 121.47, 'SSE / SZSE'],
  AE: [25.20, 55.27, 'DFM / ADX'],
  SG: [1.28, 103.85, 'SGX'],
  AU: [-33.87, 151.21, 'ASX'],
  BR: [-23.55, -46.63, 'B3'],
  SA: [24.71, 46.68, 'Tadawul'],
  KR: [37.57, 126.98, 'KRX'],
};

const TECH_HUBS = [
  { name: 'Silicon Valley', lat: 37.39, lon: -122.08, type: 'AI Research', companies: 'OpenAI, Google, Meta' },
  { name: 'Seattle', lat: 47.61, lon: -122.33, type: 'Cloud & AI', companies: 'Microsoft, Amazon' },
  { name: 'Shenzhen', lat: 22.54, lon: 114.06, type: 'Hardware', companies: 'Huawei, Tencent, DJI' },
  { name: 'Beijing', lat: 39.92, lon: 116.40, type: 'AI & Tech', companies: 'Baidu, ByteDance' },
  { name: 'Bangalore', lat: 12.97, lon: 77.59, type: 'IT Services', companies: 'Infosys, Wipro, TCS' },
  { name: 'London', lat: 51.52, lon: -0.10, type: 'Fintech & AI', companies: 'DeepMind, Revolut' },
  { name: 'Tel Aviv', lat: 32.07, lon: 34.78, type: 'Cybersecurity', companies: 'Check Point, Wiz' },
  { name: 'Tokyo', lat: 35.68, lon: 139.69, type: 'Robotics', companies: 'Sony, SoftBank, Keyence' },
  { name: 'Berlin', lat: 52.52, lon: 13.41, type: 'AI Research', companies: 'SAP, Mistral EU' },
  { name: 'Toronto', lat: 43.65, lon: -79.38, type: 'AI Research', companies: 'Cohere, Hinton Lab' },
  { name: 'Paris', lat: 48.86, lon: 2.35, type: 'AI Research', companies: 'Mistral, Hugging Face' },
  { name: 'Seoul', lat: 37.57, lon: 126.98, type: 'Semiconductors', companies: 'Samsung, SK Hynix' },
];

// ─── useLivePrices Hook ─────────────────────────────────────────────────────
function useLivePrices() {
  const [liveStocks, setLiveStocks] = useState<Record<string, Stock[]>>(() => {
    const copy: Record<string, Stock[]> = {};
    for (const code in STOCKS) {
      copy[code] = STOCKS[code].map(s => ({ ...s }));
    }
    return copy;
  });
  const [liveIndices, setLiveIndices] = useState<Record<string, MarketIndex[]>>(() => {
    const copy: Record<string, MarketIndex[]> = {};
    for (const code in INDICES) {
      copy[code] = INDICES[code].map(i => ({ ...i }));
    }
    return copy;
  });
  const [liveCrypto, setLiveCrypto] = useState(() => CRYPTO.map(c => ({ ...c })));
  const [liveForex, setLiveForex] = useState(() => FOREX.map(f => ({ ...f })));
  const [tickMap, setTickMap] = useState<Record<string, 'up' | 'down'>>({});

  const prevRef = useRef<Record<string, number>>({});

  // Initialize previous values ref
  useEffect(() => {
    for (const code in liveStocks) {
      liveStocks[code].forEach(s => { prevRef.current[`s_${code}_${s.symbol}`] = s.price; });
    }
    for (const code in liveIndices) {
      liveIndices[code].forEach(i => { prevRef.current[`i_${code}_${i.name}`] = i.value; });
    }
    liveCrypto.forEach(c => { prevRef.current[`c_${c.symbol}`] = c.price; });
    liveForex.forEach(f => { prevRef.current[`f_${f.pair}`] = f.price; });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTicks: Record<string, 'up' | 'down'> = {};

      setLiveStocks(prev => {
        const next: Record<string, Stock[]> = {};
        for (const code in prev) {
          next[code] = prev[code].map(s => {
            const prevPrice = prevRef.current[`s_${code}_${s.symbol}`] ?? s.price;
            const pctChange = (Math.random() - 0.5) * 2 * (0.001 + Math.random() * 0.004); // ±0.1-0.5%
            const newPrice = +(s.price * (1 + pctChange)).toFixed(2);
            prevRef.current[`s_${code}_${s.symbol}`] = s.price;
            newTicks[`s_${code}_${s.symbol}`] = newPrice >= s.price ? 'up' : 'down';
            return { ...s, price: newPrice };
          });
        }
        return next;
      });

      setLiveIndices(prev => {
        const next: Record<string, MarketIndex[]> = {};
        for (const code in prev) {
          next[code] = prev[code].map(i => {
            const prevVal = prevRef.current[`i_${code}_${i.name}`] ?? i.value;
            const pctChange = (Math.random() - 0.5) * 2 * (0.001 + Math.random() * 0.004);
            const newVal = +(i.value * (1 + pctChange)).toFixed(2);
            prevRef.current[`i_${code}_${i.name}`] = i.value;
            newTicks[`i_${code}_${i.name}`] = newVal >= i.value ? 'up' : 'down';
            return { ...i, value: newVal };
          });
        }
        return next;
      });

      setLiveCrypto(prev => {
        const next = prev.map(c => {
          const prevPrice = prevRef.current[`c_${c.symbol}`] ?? c.price;
          const pctChange = (Math.random() - 0.5) * 2 * (0.002 + Math.random() * 0.008); // ±0.2-1%
          const newPrice = +(c.price * (1 + pctChange)).toFixed(2);
          prevRef.current[`c_${c.symbol}`] = c.price;
          newTicks[`c_${c.symbol}`] = newPrice >= c.price ? 'up' : 'down';
          return { ...c, price: newPrice };
        });
        return next;
      });

      setLiveForex(prev => {
        const next = prev.map(f => {
          const prevPrice = prevRef.current[`f_${f.pair}`] ?? f.price;
          const pctChange = (Math.random() - 0.5) * 2 * (0.0001 + Math.random() * 0.0004); // ±0.01-0.05%
          const newPrice = +(f.price * (1 + pctChange)).toFixed(4);
          prevRef.current[`f_${f.pair}`] = f.price;
          newTicks[`f_${f.pair}`] = newPrice >= f.price ? 'up' : 'down';
          return { ...f, price: newPrice };
        });
        return next;
      });

      setTickMap(newTicks);
      setTimeout(() => setTickMap({}), 650);
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTickClass = useCallback((key: string) => {
    return tickMap[key] === 'up' ? 'tick-up' : tickMap[key] === 'down' ? 'tick-down' : '';
  }, [tickMap]);

  return { liveStocks, liveIndices, liveCrypto, liveForex, tickMap, getTickClass };
}

// ─── popupStyle Helper ────────────────────────────────────────────────────
function popupStyle(title: string, content: string, accentColor: string = '#3b82f6') {
  return `<div style="background:#151a28;padding:12px 14px;border-radius:6px;border-left:3px solid ${accentColor};min-width:180px;">
    <div style="font-size:13px;font-weight:700;color:#f3f4f6;margin-bottom:8px;">${title}</div>
    ${content}
  </div>`;
}

function popupBadge(text: string, bgColor: string, textColor: string = '#fff') {
  return `<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;background:${bgColor};color:${textColor};">${text}</span>`;
}

// ─── Map Component ──────────────────────────────────────────────────────────
function DashboardMap({ activeTab, activeLayers, selectedCountry }: {
  activeTab: TabId; activeLayers: ActiveLayers; selectedCountry: string;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersRef = useRef<any>(null);

  const initMap = useCallback(async () => {
    if (mapInstanceRef.current) return;
    try {
      const L = (await import('leaflet')).default;
      if (!mapRef.current) return;
      // Fix leaflet default marker icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
      const map = L.map(mapRef.current, {
        center: [20, 10], zoom: 3, zoomControl: true, attributionControl: true,
        minZoom: 2, maxZoom: 12, worldCopyJump: true, preferCanvas: true,
      });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd', maxZoom: 19,
      }).addTo(map);
      layersRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    } catch (err) {
      console.error('Failed to initialize map:', err);
    }
  }, []);

  const updateLayers = useCallback(async () => {
    if (!layersRef.current || !mapInstanceRef.current) return;
    const L = (await import('leaflet')).default;
    const lg = layersRef.current;
    const map = mapInstanceRef.current;
    lg.clearLayers();

    const country = COUNTRIES.find(c => c.code === selectedCountry);

    // ── WORLD tab ──
    if (activeTab === 'world') {
      if (activeLayers.cables) {
        SUBMARINE_CABLES.forEach((cable: any) => {
          const line = L.polyline(cable.points, { color: cable.color, weight: 1.5, opacity: 0.5, smoothFactor: 2 });
          line.addTo(lg);
          line.bindPopup(popupStyle(cable.name, `<div style="font-size:11px;color:#9ca3af;margin-bottom:4px;">🔗 Submarine Cable</div><div style="font-size:10px;color:#6b7280;">Status: <span style="color:#10b981;font-weight:600;">Operational</span></div>`, cable.color));
        });
      }
      if (activeLayers.outages) {
        OUTAGES.forEach((o: any) => {
          const colors: any = { active: '#ef4444', degraded: '#f59e0b', resolving: '#3b82f6' };
          const m = L.circleMarker([o.lat, o.lon], { radius: 8, fillColor: colors[o.status], fillOpacity: 0.3, color: colors[o.status], weight: 2, opacity: 0.8 });
          m.addTo(lg); m.bindPopup(popupStyle(o.name, `<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">${popupBadge(o.status.toUpperCase(), o.status === 'active' ? '#ef4444' : o.status === 'degraded' ? '#f59e0b' : '#3b82f6')}</div><div style="font-size:11px;color:#9ca3af;">${o.impact}</div>`, o.status === 'active' ? '#ef4444' : o.status === 'degraded' ? '#f59e0b' : '#3b82f6'));
        });
      }
      if (activeLayers.cyberThreats) {
        CYBER_THREATS.forEach((t: any) => {
          const colors: any = { critical: '#ef4444', high: '#f59e0b', medium: '#3b82f6', low: '#6b7280' };
          const sizes: any = { critical: 10, high: 7, medium: 5, low: 3 };
          const m = L.circleMarker([t.lat, t.lon], { radius: sizes[t.severity], fillColor: colors[t.severity], fillOpacity: 0.25, color: colors[t.severity], weight: 2, opacity: 0.9 });
          m.addTo(lg); m.bindPopup(popupStyle(t.name, `<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">${popupBadge(t.severity.toUpperCase(), t.severity === 'critical' ? '#ef4444' : t.severity === 'high' ? '#f59e0b' : t.severity === 'medium' ? '#3b82f6' : '#6b7280')}</div><div style="font-size:11px;color:#9ca3af;">Type: ${t.type}</div>`, t.severity === 'critical' ? '#ef4444' : t.severity === 'high' ? '#f59e0b' : '#3b82f6'));
        });
      }
      if (activeLayers.datacenters) {
        DATA_CENTERS.forEach((dc: any) => {
          const m = L.circleMarker([dc.lat, dc.lon], { radius: dc.tier === 'Hyperscale' ? 5 : 3, fillColor: '#10b981', fillOpacity: 0.7, color: '#10b981', weight: 1, opacity: 0.4 });
          m.addTo(lg); m.bindPopup(popupStyle(dc.name, `<div style="font-size:11px;color:#9ca3af;margin-bottom:4px;">🏢 Data Center</div><div style="font-size:10px;color:#6b7280;">Region: ${dc.region}</div><div style="font-size:10px;color:#6b7280;margin-top:4px;">Tier: ${dc.tier || 'Standard'}</div>`, '#10b981'));
        });
      }
      if (activeLayers.natural) {
        NATURAL_EVENTS.forEach((e: any) => {
          const m = L.circleMarker([e.lat, e.lon], { radius: 9, fillColor: '#8b5cf6', fillOpacity: 0.2, color: '#8b5cf6', weight: 2, opacity: 0.8, dashArray: '4,4' });
          m.addTo(lg); m.bindPopup(popupStyle(e.name, `<div style="font-size:11px;color:#9ca3af;margin-bottom:4px;">🌪️ ${e.type}</div><div style="font-size:10px;color:#6b7280;">Natural Event — Monitoring Active</div>`, '#8b5cf6'));
        });
      }
      if (activeLayers.iranAttacks) {
        IRAN_ATTACKS.forEach((a: any) => {
          const m = L.circleMarker([a.lat, a.lon], { radius: 7, fillColor: '#f97316', fillOpacity: 0.2, color: '#f97316', weight: 2, opacity: 0.9 });
          m.addTo(lg); m.bindPopup(popupStyle(a.name, `<div style="font-size:11px;color:#9ca3af;margin-bottom:4px;">🎯 Target: ${a.target}</div><div style="font-size:10px;color:#6b7280;">Type: ${a.type}</div>`, '#f97316'));
        });
      }
    }

    // ── FINANCE tab ──
    if (activeTab === 'finance') {
      // Draw lines from selected country to others (trade connections)
      const selCoords = EXCHANGE_COORDS[selectedCountry];
      if (selCoords) {
        Object.entries(EXCHANGE_COORDS).forEach(([code, [lat, lon, name]]) => {
          if (code === selectedCountry) return;
          const line = L.polyline(
            [[selCoords[0], selCoords[1]], [lat, lon]],
            { color: '#3b82f6', weight: 0.5, opacity: 0.15, dashArray: '4,8' }
          );
          line.addTo(lg);
          const m = L.circleMarker([lat, lon], {
            radius: 4, fillColor: '#3b82f6', fillOpacity: 0.3,
            color: '#3b82f6', weight: 1.5, opacity: 0.7
          });
          m.addTo(lg);
          const c = COUNTRIES.find(co => co.code === code);
          m.bindPopup(popupStyle(`${c?.flag || ''} ${name}`, `<div style="font-size:11px;color:#9ca3af;margin-bottom:4px;">${c?.name || code}</div><div style="font-size:10px;color:#6b7280;">Exchange · ${code}</div><div style="font-size:10px;color:#3b82f6;margin-top:6px;cursor:pointer;">View Details →</div>`, '#3b82f6'));
        });
        // Selected country large marker with pulse ring
        const pulseRing = L.circleMarker([selCoords[0], selCoords[1]], {
          radius: 18, fillColor: '#f59e0b', fillOpacity: 0.05,
          color: '#f59e0b', weight: 1, opacity: 0.3
        });
        pulseRing.addTo(lg);
        const mainMarker = L.circleMarker([selCoords[0], selCoords[1]], {
          radius: 8, fillColor: '#f59e0b', fillOpacity: 0.6,
          color: '#f59e0b', weight: 2, opacity: 1
        });
        mainMarker.addTo(lg);
        mainMarker.bindPopup(popupStyle(`${country?.flag || ''} ${selCoords[2]}`, `<div style="font-size:11px;color:#9ca3af;margin-bottom:4px;">${country?.name} — Selected Exchange</div><div style="font-size:10px;color:#f59e0b;">★ Primary Market View</div>`, '#f59e0b'));
      }
    }

    // ── TECH/AI tab ──
    if (activeTab === 'techai') {
      // Draw subtle connections between tech hubs
      for (let i = 0; i < TECH_HUBS.length; i++) {
        for (let j = i + 1; j < TECH_HUBS.length; j++) {
          const a = TECH_HUBS[i], b = TECH_HUBS[j];
          const dist = Math.sqrt((a.lat - b.lat) ** 2 + (a.lon - b.lon) ** 2);
          if (dist < 80) {
            const line = L.polyline(
              [[a.lat, a.lon], [b.lat, b.lon]],
              { color: '#8b5cf6', weight: 0.4, opacity: 0.12, dashArray: '2,6' }
            );
            line.addTo(lg);
          }
        }
      }
      TECH_HUBS.forEach((hub) => {
        const m = L.circleMarker([hub.lat, hub.lon], {
          radius: 6, fillColor: '#8b5cf6', fillOpacity: 0.35,
          color: '#a78bfa', weight: 1.5, opacity: 0.9
        });
        m.addTo(lg);
        m.bindPopup(popupStyle(hub.name, `<div style="font-size:11px;color:#9ca3af;margin-bottom:6px;">${hub.type}</div><div style="font-size:10px;color:#6b7280;margin-bottom:2px;font-weight:600;">Key Companies:</div><div style="font-size:10px;color:#a78bfa;line-height:1.6;">${hub.companies.split(', ').map(c => `<div style="padding:1px 0;">• ${c}</div>`).join('')}</div>`, '#8b5cf6'));
      });
      // Highlight selected country's tech presence
      const countryTechHubs: Record<string, number[]> = {
        US: [0, 1], IN: [4], GB: [5], JP: [7], DE: [8], CN: [2, 3],
        AE: [], SG: [], AU: [], BR: [], SA: [], KR: [11],
      };
      (countryTechHubs[selectedCountry] || []).forEach(idx => {
        const hub = TECH_HUBS[idx];
        const glow = L.circleMarker([hub.lat, hub.lon], {
          radius: 14, fillColor: '#f59e0b', fillOpacity: 0.08,
          color: '#f59e0b', weight: 1.5, opacity: 0.5
        });
        glow.addTo(lg);
      });
    }

    // ── GEOPOLITICS tab ──
    if (activeTab === 'geopolitics') {
      CONFLICTS.forEach((c) => {
        const colors: any = { critical: '#ef4444', high: '#f59e0b', medium: '#3b82f6', low: '#6b7280' };
        const sizes: any = { critical: 12, high: 8, medium: 6, low: 4 };
        // Pulse ring for critical
        if (c.severity === 'critical') {
          const ring = L.circleMarker([c.lat, c.lon], {
            radius: 20, fillColor: '#ef4444', fillOpacity: 0.04,
            color: '#ef4444', weight: 1, opacity: 0.2
          });
          ring.addTo(lg);
        }
        const m = L.circleMarker([c.lat, c.lon], { radius: sizes[c.severity], fillColor: colors[c.severity], fillOpacity: 0.35, color: colors[c.severity], weight: 2, opacity: 0.9 });
        m.addTo(lg); m.bindPopup(popupStyle(c.name, `<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${colors[c.severity]};box-shadow:0 0 6px ${colors[c.severity]};"></span>${popupBadge(c.severity.toUpperCase(), colors[c.severity])} ${popupBadge(c.status, c.status === 'active' ? '#ef4444' : '#f59e0b')}</div><div style="font-size:10px;color:#6b7280;margin-bottom:2px;">${c.type}</div><div style="font-size:10px;color:#9ca3af;">💀 ${c.casualties} casualties · 🏠 ${c.displaced} displaced</div><div style="font-size:10px;color:#6b7280;margin-top:6px;font-style:italic;">${c.description}</div>`, colors[c.severity]));
      });
      // Diplomatic event markers
      const eventCoords: Record<string, [number, number]> = {
        'India': [28.6, 77.2], 'USA': [38.9, -77.0], 'Japan': [35.68, 139.69],
        'Australia': [-35.28, 149.13], 'Russia': [55.75, 37.62], 'China': [39.9, 116.4],
        'EU': [50.11, 8.68], 'Brazil': [-15.79, -47.88], 'Argentina': [-34.6, -58.38],
        'Iran': [35.69, 51.39], 'Philippines': [14.6, 120.98], 'Vietnam': [21.03, 105.85],
        'NATO': [50.85, 4.35], 'Sudan': [15.5, 32.56], 'UAE': [24.45, 54.65],
        'Saudi Arabia': [24.71, 46.68], 'Egypt': [30.04, 31.24], 'ASEAN': [-0.79, 113.92],
      };
      DIPLOMATIC_EVENTS.forEach((d) => {
        const c = d.countries[0];
        const coords = eventCoords[c];
        if (coords) {
          const colors: any = { critical: '#ef4444', high: '#f59e0b', medium: '#3b82f6' };
          const m = L.circleMarker(coords, {
            radius: 5, fillColor: colors[d.significance] || '#60a5fa',
            fillOpacity: 0.4, color: colors[d.significance] || '#60a5fa', weight: 1.5
          });
          m.addTo(lg); m.bindPopup(popupStyle(d.title, `<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">${popupBadge(d.type, d.significance === 'critical' ? '#ef4444' : d.significance === 'high' ? '#f59e0b' : '#3b82f6')}</div><div style="font-size:10px;color:#6b7280;">${d.type} · ${d.date}</div><div style="font-size:10px;color:#9ca3af;margin-top:4px;">${d.description}</div><div style="font-size:10px;color:#6b7280;margin-top:4px;">Countries: ${d.countries.join(', ')}</div>`, d.significance === 'critical' ? '#ef4444' : d.significance === 'high' ? '#f59e0b' : '#3b82f6'));
        }
      });
    }

    // ── DOMESTIC tab ──
    if (activeTab === 'domestic' && country) {
      const coords = EXCHANGE_COORDS[country.code];
      if (coords) {
        // Large highlight area
        const area = L.circleMarker([coords[0], coords[1]], {
          radius: 25, fillColor: '#f59e0b', fillOpacity: 0.04,
          color: '#f59e0b', weight: 1.5, opacity: 0.15
        });
        area.addTo(lg);
        const inner = L.circleMarker([coords[0], coords[1]], {
          radius: 15, fillColor: '#f59e0b', fillOpacity: 0.08,
          color: '#f59e0b', weight: 1, opacity: 0.25
        });
        inner.addTo(lg);
        const center = L.circleMarker([coords[0], coords[1]], {
          radius: 8, fillColor: '#f59e0b', fillOpacity: 0.6,
          color: '#f59e0b', weight: 2.5, opacity: 1
        });
        center.addTo(lg);
        center.bindPopup(popupStyle(`${country.flag} ${country.name}`, `<div style="font-size:11px;color:#9ca3af;margin-bottom:4px;">Domestic Intelligence View</div><div style="font-size:10px;color:#6b7280;">Exchange: ${coords[2]}</div><div style="font-size:10px;color:#f59e0b;margin-top:6px;">★ Focused Monitoring Active</div>`, '#f59e0b'));
        // Fly to country
        map.flyTo([coords[0], coords[1]], 5, { duration: 1.2 });
      }
    }
  }, [activeTab, activeLayers, selectedCountry]);

  // Fly to selected country on finance/techai tabs too
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (activeTab === 'finance' || activeTab === 'techai') {
      const coords = EXCHANGE_COORDS[selectedCountry];
      if (coords) {
        map.flyTo([coords[0], coords[1]], 4, { duration: 1.0 });
      }
    } else if (activeTab === 'world') {
      map.flyTo([20, 10], 3, { duration: 1.0 });
    } else if (activeTab === 'geopolitics') {
      map.flyTo([30, 20], 3, { duration: 1.0 });
    }
  }, [activeTab, selectedCountry]);

  useEffect(() => {
    let alive = true;
    initMap().then(() => { if (alive) updateLayers(); });
    return () => { alive = false; if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; layersRef.current = null; } };
  }, [initMap]);

  useEffect(() => {
    if (mapInstanceRef.current) updateLayers();
  }, [activeTab, activeLayers, selectedCountry, updateLayers]);

  return <div ref={mapRef} className="w-full h-full" />;
}

// ─── Sparkline Mini Chart ────────────────────────────────────────────────────
function Sparkline({ data, color, width = 80, height = 28 }: { data: number[]; color: string; width?: number; height?: number }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  const lastY = height - ((data[data.length - 1] - min) / range) * (height - 4) - 2;
  return (
    <svg width={width} height={height} className="flex-shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width} cy={lastY} r={2} fill={color} opacity={0.8} />
    </svg>
  );
}

// ─── Severity / Importance Badge ──────────────────────────────────────────────
function Badge({ text, variant }: { text: string; variant: 'critical' | 'high' | 'medium' | 'low' | 'positive' | 'negative' | 'neutral' }) {
  const styles: Record<string, string> = {
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
    high: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    medium: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    low: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    positive: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    negative: 'bg-red-500/20 text-red-400 border-red-500/30',
    neutral: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  };
  return <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono uppercase border ${styles[variant] || styles.low}`}>{text}</span>;
}

// ─── Tab Definitions ──────────────────────────────────────────────────────────
const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'world', label: 'WORLD', icon: '🌍' },
  { id: 'finance', label: 'FINANCE', icon: '📈' },
  { id: 'techai', label: 'TECH & AI', icon: '💻' },
  { id: 'geopolitics', label: 'GEOPOLITICS', icon: '⚔️' },
  { id: 'domestic', label: 'DOMESTIC', icon: '🏠' },
];

const WORLD_LAYERS = [
  { id: 'cables', label: 'Submarine Cables', color: '#3b82f6', icon: '🔗' },
  { id: 'outages', label: 'Outages', color: '#ef4444', icon: '🔴' },
  { id: 'cyberThreats', label: 'Cyber Threats', color: '#f59e0b', icon: '⚠️' },
  { id: 'datacenters', label: 'Data Centers', color: '#10b981', icon: '🏢' },
  { id: 'natural', label: 'Natural Events', color: '#8b5cf6', icon: '🌪️' },
  { id: 'iranAttacks', label: 'Iran Attacks', color: '#f97316', icon: '🇮🇷' },
];

// ─── Scrolling Ticker Tape ───────────────────────────────────────────────────
function TickerTape({ liveIndices, liveCrypto }: { liveIndices: Record<string, MarketIndex[]>; liveCrypto: typeof CRYPTO }) {
  const tickerItems = useMemo(() => {
    const items: { label: string; value: string; change: number }[] = [];
    // Top indices from major countries
    ['US', 'IN', 'GB', 'JP', 'DE', 'CN', 'KR', 'AU', 'BR', 'SA'].forEach(code => {
      const idx = (liveIndices[code] || INDICES[code])?.[0];
      const c = COUNTRIES.find(co => co.code === code);
      if (idx && c) {
        items.push({ label: `${c.flag} ${idx.name}`, value: idx.value.toLocaleString(), change: idx.changePercent });
      }
    });
    // Top crypto
    (liveCrypto || CRYPTO).slice(0, 4).forEach(cr => {
      items.push({ label: cr.symbol, value: `$${cr.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, change: cr.changePercent24h });
    });
    return items;
  }, [liveIndices, liveCrypto]);

  return (
    <div className="flex items-center bg-[#080b12] border-b border-white/5 overflow-hidden h-6 flex-shrink-0">
      <div className="flex items-center gap-0.5 px-2 bg-[#0d1117] h-full border-r border-white/5 flex-shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-live" />
        <span className="text-[9px] font-bold text-emerald-400 tracking-wider ml-1">MARKETS</span>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex gap-6 animate-ticker whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-[10px]">
              <span className="text-gray-500 font-medium">{item.label}</span>
              <span className="text-gray-300 font-mono">{item.value}</span>
              <span className={`font-mono ${item.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)}%
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('world');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [activeLayers, setActiveLayers] = useState<ActiveLayers>(() => {
    const init: ActiveLayers = {};
    WORLD_LAYERS.forEach((l) => { init[l.id] = true; });
    return init;
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [panelOpen, setPanelOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [countryDropdown, setCountryDropdown] = useState(false);
  const [financeSubTab, setFinanceSubTab] = useState<'stocks' | 'forex' | 'crypto' | 'commodities' | 'bonds'>('stocks');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Live price simulation
  const { liveStocks, liveIndices, liveCrypto, liveForex, getTickClass } = useLivePrices();
  const [streamText, setStreamText] = useState('DATA STREAMING');
  useEffect(() => {
    const msgs = ['DATA STREAMING', 'LIVE FEED', 'STREAMING DATA', 'LIVE MONITOR'];
    let idx = 0;
    const iv = setInterval(() => { idx = (idx + 1) % msgs.length; setStreamText(msgs[idx]); }, 4000);
    return () => clearInterval(iv);
  }, []);

  // Live clock (client-only to avoid hydration mismatch)
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted) return;
    const update = () => setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' UTC');
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  // Click outside to close dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleLayer = (id: string) => setActiveLayers((prev) => ({ ...prev, [id]: !prev[id] }));

  const country = COUNTRIES.find(c => c.code === selectedCountry)!;
  const stocks = STOCKS[selectedCountry] || [];
  const indices = INDICES[selectedCountry] || [];
  const domesticNews = DOMESTIC_NEWS[selectedCountry] || [];
  const econIndicators = ECONOMIC_INDICATORS[selectedCountry] || [];
  const activeLayerCount = Object.values(activeLayers).filter(Boolean).length;

  // Generate sparkline data for stocks
  const sparklineData = useMemo(() => {
    const data: Record<string, number[]> = {};
    stocks.forEach(s => { data[s.symbol] = generateSparkline(s.price); });
    return data;
  }, [stocks]);

  // Sector breakdown data
  const sectorData = useMemo(() => {
    const sectors: Record<string, { count: number; avgChange: number }> = {};
    stocks.forEach(s => {
      if (!sectors[s.sector]) sectors[s.sector] = { count: 0, avgChange: 0 };
      sectors[s.sector].count++;
      sectors[s.sector].avgChange += s.changePercent;
    });
    Object.values(sectors).forEach(s => { s.avgChange /= s.count; });
    return Object.entries(sectors).sort((a, b) => b[1].avgChange - a[1].avgChange);
  }, [stocks]);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0a0e17] text-gray-100 overflow-hidden">
      {/* ─── Top Category Bar ─────────────────────────────────── */}
      <header className="flex items-center gap-1 px-3 py-1.5 bg-[#0d1117] border-b border-white/5 text-xs flex-shrink-0">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-2.5 py-1 rounded-md transition-all duration-150 font-medium tracking-wide ${activeTab === tab.id
              ? 'bg-white/10 text-white shadow-sm shadow-white/5' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}>
            <span className="mr-1">{tab.icon}</span>{tab.label}
          </button>
        ))}
        <div className="flex-1" />
        <div className="flex items-center gap-3 text-[10px] text-gray-600">
          <span className="font-mono" suppressHydrationWarning>{currentTime}</span>
          <span>v2.8.0</span>
        </div>
      </header>

      {/* ─── Ticker Tape ───────────────────────────────────────── */}
      <TickerTape liveIndices={liveIndices} liveCrypto={liveCrypto} />

      {/* ─── Main Toolbar ──────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0d1117]/80 border-b border-white/5 flex-shrink-0">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Toggle sidebar">
          {sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
        </button>
        <span className="text-sm font-bold tracking-widest text-white">MONITOR</span>
        <div className="flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-live" />
          <span className="text-[10px] font-bold text-red-400 tracking-wider">LIVE</span>
          <span className="text-[8px] text-red-400/60 font-mono tracking-wide ml-0.5">{streamText}</span>
        </div>

        {/* Tab-specific label */}
        <div className="ml-3 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
          <span className="text-[10px] text-gray-400 font-medium tracking-wider">
            {activeTab === 'world' && 'GLOBAL THREAT MONITOR'}
            {activeTab === 'finance' && `${country.flag} ${country.currency} MARKETS`}
            {activeTab === 'techai' && 'AI & TECHNOLOGY INTELLIGENCE'}
            {activeTab === 'geopolitics' && 'GEOPOLITICAL RISK ANALYSIS'}
            {activeTab === 'domestic' && `${country.flag} DOMESTIC INTEL`}
          </span>
        </div>

        {/* Country Selector */}
        <div className="relative ml-auto" ref={dropdownRef}>
          <button onClick={() => setCountryDropdown(!countryDropdown)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-all ${countryDropdown
              ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/15'}`}>
            <span className="text-sm">{country.flag}</span>
            <span className="hidden sm:inline capitalize">{country.name}</span>
            <span className="sm:hidden">{country.code}</span>
            <ChevronDown size={12} className={`transition-transform ${countryDropdown ? 'rotate-180' : ''}`} />
          </button>
          {countryDropdown && (
            <div className="absolute top-full right-0 mt-1.5 w-64 bg-[#151a28] border border-white/10 rounded-lg shadow-2xl z-50 max-h-96 overflow-hidden">
              <div className="p-2 border-b border-white/5">
                <div className="flex items-center gap-2 px-2 py-1.5 bg-white/5 rounded-md">
                  <Search size={12} className="text-gray-500" />
                  <input type="text" placeholder="Search countries..." className="flex-1 bg-transparent text-xs text-gray-200 placeholder:text-gray-600 outline-none" />
                </div>
              </div>
              <div className="overflow-y-auto wm-scrollbar max-h-72 py-1">
                {COUNTRIES.map((c) => (
                  <button key={c.code} onClick={() => { setSelectedCountry(c.code); setCountryDropdown(false); }}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 text-xs hover:bg-white/8 transition-colors ${selectedCountry === c.code ? 'bg-white/8 text-white' : 'text-gray-400'}`}>
                    <span className="text-base">{c.flag}</span>
                    <div className="flex-1 text-left">
                      <p className={`${selectedCountry === c.code ? 'text-white font-medium' : ''}`}>{c.name}</p>
                      <p className="text-[10px] text-gray-600">{c.exchange} · {c.currency}</p>
                    </div>
                    {selectedCountry === c.code && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/30">
          <Shield size={12} className="text-green-400" />
          <span className="text-[10px] font-bold text-green-400">DEFCON {DEFCON_DATA.level}</span>
          <span className="text-[10px] font-mono text-green-400/60">{DEFCON_DATA.percentage}%</span>
        </div>
        <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-white/5">
          <button onClick={() => setSearchOpen(!searchOpen)} className={`p-1.5 rounded hover:bg-white/10 transition-colors ${searchOpen ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`} title="Search"><Search size={14} /></button>
          <button className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Fullscreen"><Maximize2 size={14} /></button>
          <button className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Settings"><Settings size={14} /></button>
        </div>
      </div>

      {searchOpen && (
        <div className="flex items-center gap-2 px-3 py-2 bg-[#0d1117] border-b border-white/5 flex-shrink-0 animate-in">
          <Search size={14} className="text-gray-500" />
          <input type="text" placeholder="Search stocks, news, events, countries..." className="flex-1 bg-transparent text-sm text-gray-200 placeholder:text-gray-600 outline-none" autoFocus />
          <button onClick={() => setSearchOpen(false)} className="text-gray-500 hover:text-gray-300"><X size={14} /></button>
        </div>
      )}

      {/* ─── Main Content ──────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-72 bg-[#0d1117] border-r border-white/5 flex flex-col flex-shrink-0 overflow-hidden sidebar-transition">
            {/* WORLD: Layer Controls */}
            {activeTab === 'world' && (
              <>
                <div className="p-3 border-b border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Layers ({activeLayerCount}/{WORLD_LAYERS.length})</h3>
                    <button onClick={() => { const allOff = activeLayerCount === WORLD_LAYERS.length; const n: ActiveLayers = {}; WORLD_LAYERS.forEach((l) => { n[l.id] = !allOff; }); setActiveLayers(n); }} className="text-[10px] text-gray-500 hover:text-gray-300">
                      {activeLayerCount === WORLD_LAYERS.length ? 'None' : 'All'}
                    </button>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {WORLD_LAYERS.map((layer) => (
                      <button key={layer.id} onClick={() => toggleLayer(layer.id)} className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-xs transition-all ${activeLayers[layer.id] ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}>
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: activeLayers[layer.id] ? layer.color : '#374151', boxShadow: activeLayers[layer.id] ? `0 0 6px ${layer.color}60` : 'none' }} />
                        <span className="flex-1 text-left truncate">{layer.icon} {layer.label}</span>
                        {activeLayers[layer.id] ? <Eye size={12} className="text-gray-400" /> : <EyeOff size={12} />}
                      </button>
                    ))}
                  </div>
                </div>
                <SidebarWorldFeed />
              </>
            )}

            {/* FINANCE: Sub-tabs + Data */}
            {activeTab === 'finance' && (
              <FinanceSidebar subTab={financeSubTab} onSubTabChange={setFinanceSubTab} selectedCountry={selectedCountry} liveStocks={liveStocks} liveIndices={liveIndices} liveCrypto={liveCrypto} liveForex={liveForex} getTickClass={getTickClass} />
            )}

            {/* TECH/AI: Model Leaderboard + News Feed */}
            {activeTab === 'techai' && (
              <>
                <div className="p-3 border-b border-white/5">
                  <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">AI Model Leaderboard</h3>
                  <div className="flex flex-col gap-1">
                    {AI_MODELS.slice(0, 5).map((m, i) => (
                      <div key={m.name} className={`flex items-center gap-2 p-1.5 rounded ${i === 0 ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-white/[0.03]'}`}>
                        <span className={`text-[10px] font-bold font-mono w-4 text-center ${i === 0 ? 'text-amber-400' : 'text-gray-600'}`}>#{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-gray-200 font-medium truncate">{m.name}</p>
                          <p className="text-[10px] text-gray-500">{m.company} · {m.benchmark}</p>
                        </div>
                        {m.openSource ? <Badge text="OSS" variant="positive" /> : <Badge text="Prop" variant="neutral" />}
                      </div>
                    ))}
                  </div>
                </div>
                <SidebarTechFeed />
              </>
            )}

            {/* GEOPOLITICS: Conflicts + Events */}
            {activeTab === 'geopolitics' && (
              <>
                <SidebarGeoConflicts />
                <SidebarGeoEvents />
              </>
            )}

            {/* DOMESTIC: Econ Indicators + News */}
            {activeTab === 'domestic' && (
              <>
                <div className="p-3 border-b border-white/5">
                  <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">
                    {country.flag} {country.name} — Key Indicators
                  </h3>
                  <div className="flex flex-col gap-1">
                    {econIndicators.map((ind, i) => (
                      <div key={i} className="flex items-center justify-between p-1.5 rounded bg-white/[0.03]">
                        <span className="text-[11px] text-gray-400">{ind.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-mono text-gray-200">{ind.value}</span>
                          {ind.trend === 'up' ? <ArrowUpRight size={10} className="text-emerald-400" /> : ind.trend === 'down' ? <ArrowDownRight size={10} className="text-red-400" /> : <Minus size={10} className="text-gray-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <SidebarDomesticNews countryCode={selectedCountry} />
              </>
            )}
          </aside>
        )}

        {/* Map + Bottom Panels */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 relative">
            <DashboardMap activeTab={activeTab} activeLayers={activeLayers} selectedCountry={selectedCountry} />
            {/* Map overlay info */}
            <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2">
              <span className="text-[10px] font-mono text-gray-400 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/5" suppressHydrationWarning>{currentTime}</span>
              <span className="text-[10px] font-mono text-gray-500 bg-black/40 px-1.5 py-0.5 rounded">
                {activeTab === 'world' && `${activeLayerCount} layers`}
                {activeTab === 'finance' && `${country.exchange}`}
                {activeTab === 'techai' && `${TECH_HUBS.length} hubs`}
                {activeTab === 'geopolitics' && `${CONFLICTS.length} conflicts`}
                {activeTab === 'domestic' && `${domesticNews.length} articles`}
              </span>
            </div>
          </div>

          {/* ─── Bottom Panels (context-aware) ─────────────────── */}
          {panelOpen && (
            <div className={`border-t border-white/5 bg-[#0d1117] flex-shrink-0 flex overflow-hidden panel-transition ${activeTab === 'finance' ? 'h-72' : 'h-52'}`}>
              {activeTab === 'world' && <WorldPanels />}
              {activeTab === 'finance' && <FinancePanels stocks={liveStocks[selectedCountry] || stocks} indices={liveIndices[selectedCountry] || indices} selectedCountry={selectedCountry} sparklineData={sparklineData} sectorData={sectorData} getTickClass={getTickClass} />}
              {activeTab === 'techai' && <TechAIPanels />}
              {activeTab === 'geopolitics' && <GeopoliticsPanels />}
              {activeTab === 'domestic' && <DomesticPanels country={country} news={domesticNews} indicators={econIndicators} />}
            </div>
          )}

          <div className="flex items-center justify-between px-3 py-1 bg-[#080b12] border-t border-white/5 flex-shrink-0">
            <button onClick={() => setPanelOpen(!panelOpen)} className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1">
              {panelOpen ? <ChevronDown size={12} className="rotate-180" /> : <ChevronDown size={12} />}
              {panelOpen ? 'Hide Panels' : 'Show Panels'}
            </button>
            <span className="text-[10px] text-gray-600">WORLD MONITOR · INTELLIGENCE PLATFORM · <span suppressHydrationWarning>{currentTime}</span></span>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── WORLD Sidebar Feed ──────────────────────────────────────────────────────
function SidebarWorldFeed() {
  return (<>
    <div className="p-3 border-b border-white/5">
      <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Statistics (24h)</h3>
      <div className="grid grid-cols-2 gap-1.5">
        <MiniStat icon={<AlertTriangle size={11} className="text-red-400" />} label="Outages" value={STATS.activeOutages} color="text-red-400" />
        <MiniStat icon={<Shield size={11} className="text-amber-400" />} label="Threats" value={STATS.cyberThreats} color="text-amber-400" />
        <MiniStat icon={<Server size={11} className="text-emerald-400" />} label="DCs" value={STATS.dataCenters} color="text-emerald-400" />
        <MiniStat icon={<Cable size={11} className="text-blue-400" />} label="Cables" value={STATS.cablesMonitored} color="text-blue-400" />
      </div>
    </div>
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-3 pt-3 pb-1 flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Live Feed</h3>
        <span className="flex items-center gap-1 text-[10px] text-gray-600"><Radio size={10} className="text-red-500 pulse-live" />{STATS.totalIncidents24h}</span>
      </div>
      <div className="flex-1 overflow-y-auto wm-scrollbar px-2 pb-2">
        {LIVE_INCIDENTS.map((inc: any) => {
          const severityColors: Record<string, string> = { critical: '#ef4444', high: '#f59e0b', medium: '#3b82f6', low: '#6b7280' };
          return (
          <div key={inc.id} className="mb-1.5 p-2 rounded-md bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors cursor-pointer card-glow news-item" style={{ borderLeftWidth: '3px', borderLeftColor: severityColors[inc.severity] || '#6b7280' }}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <Zap size={10} className={inc.severity === 'critical' ? 'text-red-400' : inc.severity === 'high' ? 'text-amber-400' : 'text-blue-400'} />
                <Badge text={inc.severity} variant={inc.severity as any} />
              </div>
              <span className="text-[10px] text-gray-600 flex items-center gap-1"><Clock size={9} />{inc.time}</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-2">{inc.title}</p>
          </div>
          );
        })}
      </div>
    </div>
  </>);
}

// ─── FINANCE Sidebar ─────────────────────────────────────────────────────────
function FinanceSidebar({ subTab, onSubTabChange, selectedCountry, liveStocks, liveIndices, liveCrypto, liveForex, getTickClass }: { subTab: string; onSubTabChange: (t: any) => void; selectedCountry: string; liveStocks: Record<string, Stock[]>; liveIndices: Record<string, MarketIndex[]>; liveCrypto: typeof CRYPTO; liveForex: typeof FOREX; getTickClass: (key: string) => string }) {
  const tabs = [
    { id: 'stocks', label: 'Stocks', icon: <BarChart3 size={12} /> },
    { id: 'forex', label: 'Forex', icon: <Globe size={12} /> },
    { id: 'crypto', label: 'Crypto', icon: <Coins size={12} /> },
    { id: 'commodities', label: 'Commod.', icon: <Activity size={12} /> },
    { id: 'bonds', label: 'Bonds', icon: <Landmark size={12} /> },
  ];
  const stocks = liveStocks[selectedCountry] || STOCKS[selectedCountry] || [];
  const indices = liveIndices[selectedCountry] || INDICES[selectedCountry] || [];
  const country = COUNTRIES.find(c => c.code === selectedCountry);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-0.5 p-2 border-b border-white/5 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => onSubTabChange(t.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] transition-all whitespace-nowrap ${subTab === t.id ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto wm-scrollbar">
        {subTab === 'stocks' && (
          <div className="p-2 space-y-1.5">
            {/* Country indices header */}
            <div className="px-2 py-1">
              <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">{country?.flag} {country?.name} Indices</p>
            </div>
            {indices.map((idx) => (
              <div key={idx.name} className={`flex items-center justify-between p-2 rounded-md bg-white/[0.03] hover:bg-white/[0.06] transition-colors ${getTickClass(`i_${selectedCountry}_${idx.name}`)}`}>
                <div>
                  <p className="text-[11px] text-gray-200 font-medium">{idx.name}</p>
                  <p className="text-[10px] text-gray-500">Index</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-mono text-gray-200">{idx.value.toLocaleString()}</p>
                  <p className={`text-[10px] font-mono ${idx.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {idx.changePercent >= 0 ? '+' : ''}{idx.changePercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
            {/* Stock list */}
            <div className="px-2 py-1 mt-2">
              <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Top Stocks ({stocks.length})</p>
            </div>
            {stocks.map((s) => (
              <div key={s.symbol} className={`flex items-center justify-between p-2 rounded-md bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer ${getTickClass(`s_${selectedCountry}_${s.symbol}`)}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[11px] text-gray-200 font-medium font-mono">{s.symbol}</p>
                    <span className="text-[9px] text-gray-600 truncate max-w-[80px]">{s.name}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{s.sector} · MCap: {s.marketCap}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="text-[11px] font-mono text-gray-200">{s.price.toLocaleString()}</p>
                  <p className={`text-[10px] font-mono ${s.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {s.changePercent >= 0 ? '+' : ''}{s.changePercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {subTab === 'forex' && (
          <div className="p-2 space-y-1">
            {liveForex.map((f) => <ForexRow key={f.pair} {...f} getTickClass={getTickClass} />)}
          </div>
        )}
        {subTab === 'crypto' && (
          <div className="p-2 space-y-1">
            {liveCrypto.map((c) => <CryptoRow key={c.symbol} {...c} getTickClass={getTickClass} />)}
          </div>
        )}
        {subTab === 'commodities' && (
          <div className="p-2 space-y-1">
            {COMMODITIES.map((c) => <CommodityRow key={c.symbol} {...c} />)}
          </div>
        )}
        {subTab === 'bonds' && (
          <div className="p-2 space-y-1">
            {BONDS.map((b) => <BondRow key={b.name} {...b} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function ForexRow({ pair, price, changePercent, name, getTickClass }: any) {
  return (
    <div className={`flex items-center justify-between p-2 rounded-md bg-white/[0.03] hover:bg-white/[0.06] ${getTickClass ? getTickClass(`f_${pair}`) : ''}`}>
      <div><p className="text-[11px] text-gray-200 font-medium font-mono">{pair}</p><p className="text-[10px] text-gray-600">{name}</p></div>
      <div className="text-right">
        <p className="text-[11px] font-mono text-gray-200">{price.toFixed(4)}</p>
        <p className={`text-[10px] font-mono ${changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%</p>
      </div>
    </div>
  );
}

function CryptoRow({ symbol, name, price, changePercent24h, marketCap, dominance, getTickClass }: any) {
  return (
    <div className={`p-2 rounded-md bg-white/[0.03] hover:bg-white/[0.06] ${getTickClass ? getTickClass(`c_${symbol}`) : ''}`}>
      <div className="flex items-center justify-between">
        <div><p className="text-[11px] text-gray-200 font-medium">{symbol} <span className="text-gray-500 font-normal">{name}</span></p></div>
        <p className={`text-[10px] font-mono ${changePercent24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{changePercent24h >= 0 ? '+' : ''}{changePercent24h.toFixed(2)}%</p>
      </div>
      <div className="flex items-center justify-between mt-0.5">
        <span className="text-[10px] text-gray-500 font-mono">${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-gray-600">Dom {dominance}%</span>
          <span className="text-[9px] text-gray-500">MCap {marketCap}</span>
        </div>
      </div>
    </div>
  );
}

function CommodityRow({ name, price, changePercent, unit, category }: any) {
  return (
    <div className="p-2 rounded-md bg-white/[0.03] hover:bg-white/[0.06]">
      <div className="flex items-center justify-between">
        <div><p className="text-[11px] text-gray-200">{name}</p><p className="text-[10px] text-gray-600">{category}</p></div>
        <p className={`text-[10px] font-mono ${changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%</p>
      </div>
      <div className="mt-0.5"><span className="text-[10px] font-mono text-gray-400">{price.toLocaleString()} {unit}</span></div>
    </div>
  );
}

function BondRow({ name, yield: yld, change, country }: any) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md bg-white/[0.03] hover:bg-white/[0.06]">
      <div><p className="text-[11px] text-gray-200">{name}</p><p className="text-[10px] text-gray-500">{country}</p></div>
      <div className="text-right">
        <p className="text-[11px] font-mono text-gray-200">{yld.toFixed(3)}%</p>
        <p className={`text-[10px] font-mono ${change >= 0 ? 'text-red-400' : 'text-emerald-400'}`}>{change >= 0 ? '+' : ''}{change.toFixed(3)}</p>
      </div>
    </div>
  );
}

// ─── TECH/AI Sidebar Feed ────────────────────────────────────────────────────
function SidebarTechFeed() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-3 pt-3 pb-1 flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">AI & Tech Feed</h3>
        <span className="text-[10px] text-gray-600">{AI_NEWS.length} articles</span>
      </div>
      <div className="flex-1 overflow-y-auto wm-scrollbar px-2 pb-2">
        {AI_NEWS.map((n) => (
          <div key={n.id} className="mb-1.5 p-2 rounded-md bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] cursor-pointer card-glow news-item">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <Badge text={n.category} variant={n.impact as any} />
                <Badge text={n.sentiment} variant={n.sentiment === 'positive' ? 'positive' : n.sentiment === 'negative' ? 'negative' : 'neutral'} />
              </div>
              <span className="text-[10px] text-gray-600">{n.time}</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-2">{n.title}</p>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-600">{n.source}</span>
                <span className="text-[10px] text-gray-700">·</span>
                <span className="text-[10px] text-gray-600">{n.tags.slice(0, 2).join(', ')}</span>
              </div>
              <span className="text-[10px] text-blue-400 hover:text-blue-300 cursor-pointer">Read more →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── GEOPOLITICS Sidebar ─────────────────────────────────────────────────────
function SidebarGeoConflicts() {
  const severityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  const sorted = [...CONFLICTS].sort((a, b) => (severityOrder[a.severity] || 4) - (severityOrder[b.severity] || 4));
  return (
    <div className="p-3 border-b border-white/5">
      <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Active Conflicts ({CONFLICTS.length})</h3>
      <div className="flex flex-col gap-1 max-h-56 overflow-y-auto wm-scrollbar">
        {sorted.map((c) => (
          <div key={c.id} className="p-1.5 rounded bg-white/[0.03] hover:bg-white/[0.06] cursor-pointer">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[11px] text-gray-200 font-medium">{c.name}</span>
              <div className="flex items-center gap-1">
                <Badge text={c.status} variant={c.severity as any} />
              </div>
            </div>
            <p className="text-[10px] text-gray-500 line-clamp-1">{c.type} · {c.casualties} casualties · {c.displaced} displaced</p>
            <p className="text-[10px] text-gray-600 line-clamp-1 mt-0.5">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarGeoEvents() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-3 pt-3 pb-1 flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Diplomatic Events</h3>
        <span className="text-[10px] text-gray-600">{DIPLOMATIC_EVENTS.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto wm-scrollbar px-2 pb-2">
        {DIPLOMATIC_EVENTS.map((d) => (
          <div key={d.id} className="mb-1.5 p-2 rounded-md bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] cursor-pointer card-glow news-item">
            <div className="flex items-center justify-between mb-1">
              <Badge text={d.type} variant={d.significance as any} />
              <span className="text-[10px] text-gray-500 flex items-center gap-1"><Clock size={9} className="text-gray-500" />{d.date}</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-2">{d.title}</p>
            <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{d.description}</p>
            <p className="text-[10px] text-gray-600 mt-0.5">{d.countries.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DOMESTIC Sidebar Feed ───────────────────────────────────────────────────
function SidebarDomesticNews({ countryCode }: { countryCode: string }) {
  const news = DOMESTIC_NEWS[countryCode] || [];
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-3 pt-3 pb-1 flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Domestic News</h3>
        <span className="text-[10px] text-gray-600">{news.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto wm-scrollbar px-2 pb-2">
        {news.map((n: any) => {
          const importanceColors: Record<string, string> = { critical: '#ef4444', high: '#f59e0b', medium: '#3b82f6', low: '#6b7280' };
          return (
          <div key={n.id} className="mb-1.5 p-2 rounded-md bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] cursor-pointer card-glow news-item" style={{ borderLeftWidth: '3px', borderLeftColor: importanceColors[n.importance] || '#6b7280' }}>
            <div className="flex items-center justify-between mb-1">
              <Badge text={n.category} variant={n.importance as any} />
              <span className="text-[10px] text-gray-600">{n.time}</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-2">{n.title}</p>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-600">{n.source}</span>
                <span className="text-[10px] text-gray-700">·</span>
                <span className="text-[10px] text-gray-500 line-clamp-1">{n.summary}</span>
              </div>
              <span className="text-[10px] text-blue-400 hover:text-blue-300 cursor-pointer flex-shrink-0 ml-2">Read more →</span>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Bottom Panels: WORLD ────────────────────────────────────────────────────
function WorldPanels() {
  return (<>
    <Panel title="Active Incidents" count={OUTAGES.length} badge="tracked" badgeColor="text-red-400">
      {OUTAGES.slice(0, 6).map((o: any, i: number) => (
        <div key={i} className="flex items-start gap-2 p-1.5 rounded bg-white/[0.02]">
          <span className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: o.status === 'active' ? '#ef4444' : o.status === 'degraded' ? '#f59e0b' : '#3b82f6', boxShadow: `0 0 4px ${o.status === 'active' ? '#ef444460' : o.status === 'degraded' ? '#f59e0b60' : '#3b82f660'}` }} />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-gray-200 font-medium truncate">{o.name}</p>
            <p className="text-[10px] text-gray-500 truncate">{o.impact}</p>
          </div>
          <span className={`text-[9px] font-mono px-1 py-0.5 rounded flex-shrink-0 ${o.status === 'active' ? 'bg-red-500/15 text-red-400' : o.status === 'degraded' ? 'bg-amber-500/15 text-amber-400' : 'bg-blue-500/15 text-blue-400'}`}>{o.status}</span>
        </div>
      ))}
    </Panel>
    <Panel title="Top Cyber Threats" count={CYBER_THREATS.filter((t: any) => t.severity === 'critical').length} badge="critical" badgeColor="text-amber-400">
      {CYBER_THREATS.filter((t: any) => t.severity === 'critical' || t.severity === 'high').slice(0, 6).map((t: any, i: number) => (
        <div key={i} className="flex items-center gap-2 p-1.5 rounded bg-white/[0.02]">
          <Zap size={11} className={t.severity === 'critical' ? 'text-red-400' : 'text-amber-400'} />
          <div className="flex-1 min-w-0"><p className="text-[11px] text-gray-200 truncate">{t.name}</p><p className="text-[10px] text-gray-500">{t.type}</p></div>
          <Badge text={t.severity} variant={t.severity as any} />
        </div>
      ))}
    </Panel>
    <Panel title="Iran Activity" count={IRAN_ATTACKS.length} badge="targets" badgeColor="text-orange-400">
      {IRAN_ATTACKS.slice(0, 6).map((a: any, i: number) => (
        <div key={i} className="flex items-start gap-2 p-1.5 rounded bg-white/[0.02]">
          <Flag size={10} className="text-orange-400 mt-0.5 flex-shrink-0" />
          <div className="min-w-0"><p className="text-[11px] text-gray-200 truncate">{a.name}</p><p className="text-[10px] text-gray-500 truncate">{a.target} · {a.type}</p></div>
        </div>
      ))}
    </Panel>
  </>);
}

// ─── Bottom Panels: FINANCE ──────────────────────────────────────────────────
function FinancePanels({ stocks, indices, selectedCountry, sparklineData, sectorData, getTickClass }: {
  stocks: Stock[]; indices: MarketIndex[]; selectedCountry: string;
  sparklineData: Record<string, number[]>; sectorData: [string, { count: number; avgChange: number }][];
  getTickClass: (key: string) => string;
}) {
  const country = COUNTRIES.find(c => c.code === selectedCountry);
  return (<>
    <Panel title={`${country?.flag} Indices`} count={indices.length} badge="live" badgeColor="text-emerald-400">
      {indices.map((idx, i) => (
        <div key={i} className={`flex items-center justify-between p-1.5 rounded bg-white/[0.02] ${getTickClass(`i_${selectedCountry}_${idx.name}`)}`}>
          <div><p className="text-[11px] text-gray-200 font-medium">{idx.name}</p><p className="text-[10px] text-gray-500">Index</p></div>
          <div className="text-right">
            <p className="text-[11px] font-mono text-gray-200">{idx.value.toLocaleString()}</p>
            <p className={`text-[10px] font-mono ${idx.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{idx.changePercent >= 0 ? '+' : ''}{idx.changePercent.toFixed(2)}%</p>
          </div>
        </div>
      ))}
    </Panel>
    <Panel title="Stocks" count={stocks.length} badge="listed" badgeColor="text-blue-400" className="flex-[2]">
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead><tr className="text-gray-600 text-[9px] uppercase tracking-wider">
            <th className="text-left py-1 px-2">Symbol</th><th className="text-right py-1 px-1">Price</th><th className="text-right py-1 px-1">Chg%</th><th className="text-center py-1 px-1">Trend</th><th className="text-right py-1 px-1">Vol</th><th className="text-right py-1 px-2">MCap</th>
          </tr></thead>
          <tbody>
            {stocks.slice(0, 10).map((s) => (
              <tr key={s.symbol} className={`border-t border-white/5 hover:bg-white/[0.03] cursor-pointer transition-colors ${getTickClass(`s_${selectedCountry}_${s.symbol}`)}`}>
                <td className="py-1.5 px-2">
                  <p className="text-gray-200 font-medium font-mono">{s.symbol}</p>
                  <p className="text-[10px] text-gray-600 truncate max-w-[90px]">{s.name}</p>
                </td>
                <td className="text-right py-1.5 px-1 font-mono text-gray-300">{s.price.toLocaleString()}</td>
                <td className={`text-right py-1.5 px-1 font-mono ${s.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{s.changePercent >= 0 ? '+' : ''}{s.changePercent.toFixed(2)}%</td>
                <td className="py-1.5 px-1 flex justify-center"><Sparkline data={sparklineData[s.symbol] || []} color={s.changePercent >= 0 ? '#10b981' : '#ef4444'} width={60} height={20} /></td>
                <td className="text-right py-1.5 px-1 font-mono text-gray-500 text-[10px]">{s.volume}</td>
                <td className="text-right py-1.5 px-2 font-mono text-gray-400 text-[10px]">{s.marketCap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
    <Panel title="Sectors" count={sectorData.length} badge="groups" badgeColor="text-purple-400">
      {sectorData.map(([name, data]) => {
        const barWidth = Math.min(100, Math.abs(data.avgChange) * 20);
        return (
          <div key={name} className="p-1.5 rounded bg-white/[0.02]">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <Briefcase size={10} className="text-gray-500" />
                <span className="text-[11px] text-gray-300">{name}</span>
                <span className="text-[10px] text-gray-600">({data.count})</span>
              </div>
              <p className={`text-[11px] font-mono ${data.avgChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{data.avgChange >= 0 ? '+' : ''}{data.avgChange.toFixed(2)}%</p>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${data.avgChange >= 0 ? 'bg-emerald-500/60' : 'bg-red-500/60'}`} style={{ width: `${barWidth}%` }} />
            </div>
          </div>
        );
      })}
    </Panel>
  </>);
}

// ─── Bottom Panels: TECH/AI ─────────────────────────────────────────────────
function TechAIPanels() {
  return (<>
    <Panel title="Latest AI News" count={AI_NEWS.length} badge="articles" badgeColor="text-purple-400">
      {AI_NEWS.slice(0, 6).map((n) => (
        <div key={n.id} className="p-1.5 rounded bg-white/[0.02] hover:bg-white/[0.03] cursor-pointer card-glow news-item">
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-1">
              <Badge text={n.category} variant={n.impact as any} />
              <Badge text={n.sentiment} variant={n.sentiment === 'positive' ? 'positive' : n.sentiment === 'negative' ? 'negative' : 'neutral'} />
            </div>
            <span className="text-[10px] text-gray-600">{n.time}</span>
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-1">{n.title}</p>
          <p className="text-[10px] text-gray-600">{n.source} · {n.tags.slice(0, 2).join(', ')}</p>
        </div>
      ))}
    </Panel>
    <Panel title="Top Funding Rounds" count={FUNDING_ROUNDS.length} badge="2026" badgeColor="text-emerald-400">
      {FUNDING_ROUNDS.map((f, i) => (
        <div key={i} className="flex items-center justify-between p-1.5 rounded bg-white/[0.02]">
          <div><p className="text-[11px] text-gray-200 font-medium">{f.company}</p><p className="text-[10px] text-gray-500">{f.sector} · {f.stage} · {f.investors}</p></div>
          <div className="text-right flex-shrink-0 ml-2">
            <p className="text-[11px] font-mono text-emerald-400">{f.amount}</p>
            {f.valuation && <p className="text-[10px] text-gray-500">Val: {f.valuation}</p>}
          </div>
        </div>
      ))}
    </Panel>
    <Panel title="Upcoming Elections" count={ELECTIONS.length} badge="global" badgeColor="text-amber-400">
      {ELECTIONS.map((e, i) => (
        <div key={i} className="p-1.5 rounded bg-white/[0.02]">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] text-gray-200">{e.country}</span>
            <Badge text={e.status} variant="medium" />
          </div>
          <p className="text-[10px] text-gray-500">{e.type} · {e.date} · {e.candidates.join(', ')}</p>
        </div>
      ))}
    </Panel>
  </>);
}

// ─── Bottom Panels: GEOPOLITICS ─────────────────────────────────────────────
function GeopoliticsPanels() {
  return (<>
    <Panel title="Sanctions Tracker" count={SANCTIONS.length} badge="active" badgeColor="text-red-400">
      {SANCTIONS.map((s, i) => (
        <div key={i} className="p-1.5 rounded bg-white/[0.02]">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] text-gray-200 font-medium">{s.target}</span>
            <Badge text={s.type} variant="high" />
          </div>
          <p className="text-[10px] text-gray-500">By {s.imposedBy} · {s.date}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{s.impact}</p>
        </div>
      ))}
    </Panel>
    <Panel title="Critical Conflicts" count={CONFLICTS.filter(c => c.severity === 'critical').length} badge="active" badgeColor="text-red-400" className="flex-[2]">
      {[...CONFLICTS].sort((a, b) => (a.severity === 'critical' ? 0 : 1) - (b.severity === 'critical' ? 0 : 1)).slice(0, 8).map((c) => (
        <div key={c.id} className="p-1.5 rounded bg-white/[0.02]">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] text-gray-200 font-medium">{c.name}</span>
            <Badge text={c.severity} variant={c.severity as any} />
          </div>
          <p className="text-[10px] text-gray-500">{c.type} · {c.region} · {c.casualties} casualties · {c.displaced} displaced</p>
          <p className="text-[10px] text-gray-600 mt-0.5 line-clamp-1">{c.description}</p>
        </div>
      ))}
    </Panel>
    <Panel title="Elections Watch" count={ELECTIONS.length} badge="2026" badgeColor="text-amber-400">
      {ELECTIONS.map((e, i) => (
        <div key={i} className="p-1.5 rounded bg-white/[0.02]">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] text-gray-200">{e.country}</span>
            <Badge text={e.status} variant="medium" />
          </div>
          <p className="text-[10px] text-gray-500">{e.type} · {e.date} · {e.significance}</p>
        </div>
      ))}
    </Panel>
  </>);
}

// ─── Bottom Panels: DOMESTIC ─────────────────────────────────────────────────
function DomesticPanels({ country, news, indicators }: { country: any; news: any[]; indicators: any[] }) {
  return (<>
    <Panel title={`${country.flag} Economic Indicators`} count={indicators.length} badge="live" badgeColor="text-emerald-400">
      {indicators.map((ind: any, i: number) => (
        <div key={i} className="flex items-center justify-between p-1.5 rounded bg-white/[0.02]">
          <span className="text-[11px] text-gray-400">{ind.name}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-gray-200">{ind.value}</span>
            {ind.trend === 'up' ? <TrendingUp size={10} className="text-emerald-400" /> : ind.trend === 'down' ? <TrendingDown size={10} className="text-red-400" /> : <Minus size={10} className="text-gray-500" />}
          </div>
        </div>
      ))}
    </Panel>
    <Panel title="Latest News" count={news.length} badge={country.code} badgeColor="text-blue-400" className="flex-[2]">
      {news.map((n: any) => (
        <div key={n.id} className="p-1.5 rounded bg-white/[0.02] hover:bg-white/[0.03] cursor-pointer card-glow news-item">
          <div className="flex items-center justify-between mb-0.5">
            <Badge text={n.category} variant={n.importance as any} />
            <span className="text-[10px] text-gray-600">{n.time}</span>
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-1">{n.title}</p>
          <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{n.summary}</p>
        </div>
      ))}
    </Panel>
    <Panel title="Global Sanctions Impact" count={0} badge="" badgeColor="">
      {SANCTIONS.filter(s => {
        const countryNames = [country.name, 'US + EU', 'G7 + EU', 'UN Security Council', 'NATO'];
        return countryNames.some(name => s.imposedBy.includes(name) || s.target.includes(country.name) || s.target === country.name);
      }).length > 0
        ? SANCTIONS.filter(s => {
            const countryNames = [country.name, 'US + EU', 'G7 + EU', 'UN Security Council', 'NATO'];
            return countryNames.some(name => s.imposedBy.includes(name) || s.target.includes(country.name) || s.target === country.name);
          }).map((s, i) => (
            <div key={i} className="p-1.5 rounded bg-white/[0.02]">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-[11px] text-gray-200">{s.target}</p>
                <Badge text={s.type} variant="high" />
              </div>
              <p className="text-[10px] text-gray-500">{s.impact}</p>
            </div>
          ))
        : <p className="text-[11px] text-gray-600 p-2">No direct sanctions impact for {country.name}</p>
      }
    </Panel>
  </>);
}

// ─── Shared: Panel Component ─────────────────────────────────────────────────
function Panel({ title, count, badge, badgeColor, className, children }: {
  title: string; count: number; badge: string; badgeColor: string; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={`flex-1 border-r border-white/5 flex flex-col overflow-hidden ${className || ''}`}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 flex-shrink-0">
        <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">{title}</h3>
        {badge && <span className={`text-[10px] font-mono ${badgeColor}`}>{count} {badge}</span>}
      </div>
      <div className="flex-1 overflow-y-auto wm-scrollbar p-2">
        <div className="flex flex-col gap-1">{children}</div>
      </div>
    </div>
  );
}

// ─── Shared: Mini Stat ───────────────────────────────────────────────────────
function MiniStat({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-white/[0.03]">
      {icon}
      <div><p className={`text-sm font-bold font-mono ${color}`}>{value}</p><p className="text-[9px] text-gray-600">{label}</p></div>
    </div>
  );
}