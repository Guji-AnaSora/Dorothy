// NASA FIRMS — Fire Information for Resource Management System
// Detects active fires/thermal anomalies globally within 3 hours of satellite pass.
// Detects military strikes, explosions, wildfires, industrial fires.

import '../utils/env.mjs';
import { t } from '../../lib/i18n.mjs';

const FIRMS_BASE = 'https://firms.modaps.eosdis.nasa.gov/api/area/csv';

// Parse FIRMS CSV response into structured data
function parseCSV(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];
  const lines = rawText.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const vals = line.split(',');
    const obj = {};
    headers.forEach((h, i) => { obj[h.trim()] = vals[i]?.trim(); });
    return obj;
  });
}

// Fetch fires in a bounding box
async function fetchFires(opts = {}) {
  const {
    west = -180, south = -90, east = 180, north = 90,
    days = 1,
    source = 'VIIRS_SNPP_NRT',
  } = opts;

  const key = process.env.FIRMS_MAP_KEY;
  if (!key) return { error: t('firms.no_key') };

  const url = `${FIRMS_BASE}/${key}/${source}/${west},${south},${east},${north}/${days}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Crucix/1.0' },
    });
    clearTimeout(timer);
    if (!res.ok) return { error: t('firms.http_error', { status: res.status }) };
    const text = await res.text();
    return parseCSV(text);
  } catch (e) {
    clearTimeout(timer);
    return { error: e.message };
  }
}

// Key conflict/hotspot zones
const HOTSPOTS = {
  middleEast: { west: 30, south: 12, east: 65, north: 42, labelKey: 'regions.middleEast' },
  ukraine: { west: 22, south: 44, east: 41, north: 53, labelKey: 'regions.ukraine' },
  iran: { west: 44, south: 25, east: 63, north: 40, labelKey: 'regions.iran' },
  sudanHorn: { west: 21, south: 2, east: 52, north: 23, labelKey: 'regions.sudanHorn' },
  myanmar: { west: 92, south: 9, east: 102, north: 29, labelKey: 'regions.myanmar' },
  southAsia: { west: 60, south: 5, east: 98, north: 37, labelKey: 'regions.southAsia' },
};

// Analyze fire detections for potential military/strike activity
function analyzeFires(fires, regionLabel) {
  if (!Array.isArray(fires) || fires.length === 0) {
    return { region: regionLabel, totalDetections: 0, highConfidence: 0, highIntensity: [], summary: t('firms.no_detections') };
  }

  const highConf = fires.filter(f => f.confidence === 'h' || f.confidence === 'high');
  const nomConf = fires.filter(f => f.confidence === 'n' || f.confidence === 'nominal');

  // High intensity fires (FRP > 10 MW) — potential strikes, industrial fires, large explosions
  const highIntensity = fires
    .filter(f => parseFloat(f.frp) > 10)
    .map(f => ({
      lat: parseFloat(f.latitude),
      lon: parseFloat(f.longitude),
      brightness: parseFloat(f.bright_ti4),
      frp: parseFloat(f.frp),
      date: f.acq_date,
      time: f.acq_time,
      confidence: f.confidence,
      daynight: f.daynight,
    }))
    .sort((a, b) => b.frp - a.frp)
    .slice(0, 15);

  // Night detections are more significant (less likely agricultural burning)
  const nightFires = fires.filter(f => f.daynight === 'N');

  return {
    region: regionLabel,
    totalDetections: fires.length,
    highConfidence: highConf.length,
    nominalConfidence: nomConf.length,
    nightDetections: nightFires.length,
    highIntensity,
    avgFRP: fires.reduce((sum, f) => sum + (parseFloat(f.frp) || 0), 0) / fires.length,
  };
}

// Briefing
export async function briefing() {
  const key = process.env.FIRMS_MAP_KEY;
  if (!key) {
    return {
      source: t('firms.source'),
      timestamp: new Date().toISOString(),
      status: 'no_key',
      message: t('firms.set_key_hint'),
    };
  }

  // Fetch all hotspots in parallel
  const entries = Object.entries(HOTSPOTS);
  const rawResults = await Promise.all(
    entries.map(async ([key, box]) => {
      const fires = await fetchFires({ ...box, days: 2 });
      return { key, label: t(box.labelKey), fires };
    })
  );

  const hotspots = rawResults.map(r => {
    if (r.fires?.error) return { region: r.label, error: r.fires.error };
    return analyzeFires(r.fires, r.label);
  });

  // Generate signals
  const signals = [];
  for (const h of hotspots) {
    if (h.highIntensity?.length > 5) {
      signals.push(t('firms.high_intensity_fires', { region: h.region, count: h.highIntensity.length }));
    }
    if (h.nightDetections > 20) {
      signals.push(t('firms.elevated_night_activity', { region: h.region, count: h.nightDetections }));
    }
  }

  return {
    source: t('firms.source'),
    timestamp: new Date().toISOString(),
    status: 'active',
    hotspots,
    signals,
  };
}

if (process.argv[1]?.endsWith('firms.mjs')) {
  const data = await briefing();
  console.log(JSON.stringify(data, null, 2));
}
