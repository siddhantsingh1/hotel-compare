/**
 * Price-trend data for Hotel Detail.
 *
 * The series is generated, not fetched — ported from the design file so the
 * chart looks identical to the mock. It is deterministic (seeded per range), so
 * bars stay put across re-renders. Swap `trendData` for the real pricing feed
 * when it exists; everything downstream reads the shape it returns.
 */

import { ROOMS } from './mock';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** The last day the series covers — the check-in date used throughout the mocks. */
const SERIES_END = new Date(2026, 7, 12);

export const TREND_RANGES = ['7D', '1M', '3M', '1Y', 'Max'] as const;
export type TrendRange = (typeof TREND_RANGES)[number];

export const DEFAULT_TREND_RANGE: TrendRange = '1M';

/** The trend picker plots whatever rooms the rest of the app offers. */
export const TREND_ROOMS = ROOMS;

/** Spread across booking sites for the current stay. */
export const PRICE_SPREAD = {
  low: 4150,
  high: 7630,
  current: 4899,
  sites: 8,
};

type RangeConfig = {
  n: number;
  step: number;
  seed: number;
  swing: number;
  every: number;
  window: string;
  delta: string;
};

const RANGE_CONFIG: Record<TrendRange, RangeConfig> = {
  '7D': { n: 7, step: 1, seed: 41, swing: 0.13, every: 2, window: '6–12 Aug 2026', delta: '+4% vs last week' },
  '1M': { n: 30, step: 1, seed: 77, swing: 0.17, every: 7, window: '14 Jul – 12 Aug 2026', delta: '−3% vs last month' },
  '3M': { n: 45, step: 2, seed: 133, swing: 0.19, every: 11, window: '14 May – 12 Aug 2026', delta: '+6% vs last quarter' },
  '1Y': { n: 52, step: 7, seed: 211, swing: 0.23, every: 13, window: 'Aug 2025 – Aug 2026', delta: '+9% vs last year' },
  Max: { n: 60, step: 18, seed: 307, swing: 0.26, every: 15, window: 'Aug 2023 – Aug 2026', delta: 'Lowest ever' },
};

/** Deterministic pseudo-random walk, so the dense scales are stable per range. */
function series(n: number, seed: number, base: number, swing: number) {
  const out: number[] = [];
  let x = seed;
  for (let i = 0; i < n; i += 1) {
    x = (x * 9301 + 49297) % 233280;
    const wave = Math.sin(i / (n / 5)) * 0.55 + (x / 233280 - 0.5) * 0.9;
    out.push(Math.round((base + wave * swing) / 10) * 10);
  }
  return out;
}

export function inr(value: number) {
  return `₹${value.toLocaleString('en-IN')}`;
}

export type TrendData = {
  caption: string;
  roomName: string;
  avg: number;
  delta: string;
  /** Sparse axis labels — empty string where no tick should show. */
  ticks: string[];
  dates: string[];
  values: number[];
};

export function trendData(range: TrendRange, roomIndex: number): TrendData {
  const cfg = RANGE_CONFIG[range];
  const room = TREND_ROOMS[roomIndex] ?? TREND_ROOMS[0];
  const values = series(cfg.n, cfg.seed, room.base, room.base * cfg.swing);
  const long = range === '1Y' || range === 'Max';

  const ticks: string[] = [];
  const dates: string[] = [];
  for (let i = cfg.n - 1; i >= 0; i -= 1) {
    const d = new Date(SERIES_END.getTime() - i * cfg.step * 86400000);
    const short = long
      ? `${MONTHS[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`
      : `${d.getDate()} ${MONTHS[d.getMonth()]}`;
    dates.push(
      long
        ? `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
        : `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
    );
    ticks.push(i % cfg.every === (cfg.every > 3 ? 1 : 0) ? short : '');
  }

  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length / 10) * 10;

  return { caption: cfg.window, roomName: room.name, avg, delta: cfg.delta, ticks, dates, values };
}

export const BAND = {
  cheap: { fill: '#9BD3B8', label: '#00764F' },
  average: { fill: '#FBE49A', label: '#4A5565' },
  costly: { fill: '#F0AEAF', label: '#D6383B' },
} as const;

/** Buckets a value into the cheap / average / costly terciles of the series. */
export function bandFor(value: number, min: number, max: number) {
  const p = (value - min) / (max - min || 1);
  if (p <= 0.34) return BAND.cheap;
  if (p <= 0.67) return BAND.average;
  return BAND.costly;
}

export const TREND_LEGEND = [
  { fill: BAND.cheap.fill, label: 'Cheaper days' },
  { fill: BAND.average.fill, label: 'Average' },
  { fill: BAND.costly.fill, label: 'Costlier days' },
];

export type Insight = { dot: string; lead: string; text: string };

export function insightsFor(data: TrendData): Insight[] {
  const min = Math.min(...data.values);
  const max = Math.max(...data.values);
  const cheapIdx = data.values.indexOf(min);
  const highIdx = data.values.indexOf(max);
  const recent = data.values.slice(-Math.max(2, Math.round(data.values.length / 4)));
  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const rising = recentAvg > data.avg;

  return [
    {
      dot: BAND.cheap.fill,
      lead: `Cheapest ${data.dates[cheapIdx]} at ${inr(min)}.`,
      text: `${Math.round(((data.avg - min) / data.avg) * 100)}% under the period average.`,
    },
    {
      dot: BAND.costly.fill,
      lead: `Peaked ${data.dates[highIdx]} at ${inr(max)}.`,
      text: 'Weekends and holidays drive the spikes.',
    },
    {
      dot: rising ? BAND.costly.fill : BAND.cheap.fill,
      lead: rising ? 'Trending up.' : 'Trending down.',
      text: `Recent prices average ${inr(Math.round(recentAvg / 10) * 10)} against ${inr(data.avg)} for the period.`,
    },
  ];
}

export function verdictFor(data: TrendData) {
  const min = Math.min(...data.values);
  const gap = Math.round(((PRICE_SPREAD.current - min) / min) * 100);
  return gap <= 4
    ? `Today’s ${inr(PRICE_SPREAD.current)} is close to the best price seen — booking now is safe.`
    : `Today’s ${inr(PRICE_SPREAD.current)} sits ${gap}% above the period low — a price alert may pay off.`;
}

/** Preset targets offered in the alert sheet. */
export const ALERT_PRESETS = [4700, 4500, 4300, 4150];
export const DEFAULT_ALERT_AMOUNT = 4500;
