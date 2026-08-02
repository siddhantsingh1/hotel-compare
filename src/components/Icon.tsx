import React from 'react';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { color } from '../theme/tokens';

type IconProps = {
  size?: number;
  color?: string;
};

export function ChevronLeft({ size = 18, color: c = color.text }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d="M11 4l-5 5 5 5" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronRight({ size = 14, color: c = color.textMuted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M5 3l4 4-4 4" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronDown({ size = 16, color: c = color.textSecondary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path d="M4 6l4 4 4-4" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SearchIcon({ size = 20, color: c = color.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx={9} cy={9} r={6} stroke={c} strokeWidth={1.6} />
      <Line x1={13.5} y1={13.5} x2={17.5} y2={17.5} stroke={c} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export function MapIcon({ size = 20, color: c = color.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M2.5 5.5l5-2 5 2 5-2v11l-5 2-5-2-5 2v-11z" stroke={c} strokeWidth={1.4} strokeLinejoin="round" />
      <Path d="M7.5 3.5v11M12.5 5.5v11" stroke={c} strokeWidth={1.4} />
    </Svg>
  );
}

export function FilterIcon({ size = 14, color: c = color.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M1.5 3h11M3.5 7h7M5.5 11h3" stroke={c} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export function SortIcon({ size = 14, color: c = color.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M1.5 3.5h11M1.5 7h7M1.5 10.5h3.5" stroke={c} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export function HeartIcon({ size = 16, color: c = color.textSecondary, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 13.5S2 10 2 6.2A3.2 3.2 0 018 4.2a3.2 3.2 0 016 2c0 3.8-6 7.3-6 7.3z"
        stroke={c}
        fill={filled ? c : 'none'}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ShareIcon({ size = 18, color: c = color.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d="M6.5 9.8l5 2.6M11.5 5.6l-5 2.6" stroke={c} strokeWidth={1.4} strokeLinecap="round" />
      <Circle cx={13.2} cy={4.6} r={2.1} stroke={c} strokeWidth={1.4} />
      <Circle cx={4.8} cy={9} r={2.1} stroke={c} strokeWidth={1.4} />
      <Circle cx={13.2} cy={13.4} r={2.1} stroke={c} strokeWidth={1.4} />
    </Svg>
  );
}

export function DirectionsIcon({ size = 18, color: c = color.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d="M15 3L3 8l5.2 1.8L10 15l5-12z" stroke={c} strokeWidth={1.4} strokeLinejoin="round" />
    </Svg>
  );
}

export function ExternalLinkIcon({ size = 14, color: c = color.surface }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M4 10l6-6M5.4 4H10v4.6" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CabIcon({ size = 22, color: c = color.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path d="M3.5 14v-3l2-4.5h11L18.5 11v3" stroke={c} strokeWidth={1.6} strokeLinejoin="round" />
      <Path d="M3.5 14h15v2.5h-3V14M6.5 16.5V14" stroke={c} strokeWidth={1.6} strokeLinejoin="round" />
      <Circle cx={7} cy={11.5} r={1} fill={c} />
      <Circle cx={15} cy={11.5} r={1} fill={c} />
    </Svg>
  );
}

export function PlayIcon({ size = 14, color: c = color.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M4.5 2.5l7 4.5-7 4.5v-9z" fill={c} />
    </Svg>
  );
}

export function CloseIcon({ size = 16, color: c = color.textSecondary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path d="M4 4l8 8M12 4l-8 8" stroke={c} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function CheckIcon({ size = 13, color: c = color.surface }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M3 7.4l2.8 2.8L11 4.6" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Marks a price as higher, so the delta isn't carried by colour alone. */
export function ArrowUpIcon({ size = 10, color: c = color.error }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <Path d="M5 8.5V2M2.2 4.6L5 1.6l2.8 3" stroke={c} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function StarIcon({ size = 12, color: c = color.highlightPressed }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path d="M6 1l1.55 3.14 3.45.5-2.5 2.44.59 3.44L6 8.9l-3.09 1.62.59-3.44L1 4.64l3.45-.5L6 1z" fill={c} />
    </Svg>
  );
}

/** Small square-in-circle glyph used for amenity / rule / fact rows. */
export function TileGlyph({
  size = 32,
  bg = color.iconTileBg,
  mark = color.iconTileMark,
}: {
  size?: number;
  bg?: string;
  mark?: string;
}) {
  const inner = Math.round(size * 0.375);
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Circle cx={16} cy={16} r={16} fill={bg} />
      <Rect x={(32 - inner) / 2} y={(32 - inner) / 2} width={inner} height={inner} rx={inner / 4} fill={mark} />
    </Svg>
  );
}
