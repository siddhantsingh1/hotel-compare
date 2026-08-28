import React, { useState } from 'react';
import { LayoutChangeEvent, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { bandFor, inr, TrendData } from '../data/trend';
import { color, radius, space } from '../theme/tokens';
import { Txt } from './Txt';

const BAR_SLOT = 11;
const BAR_GAP = 3;

type Props = {
  data: TrendData;
  /** Index of the highlighted bar, or null. Controlled by the parent. */
  picked: number | null;
  onPick: (index: number | null) => void;
  /** Compact hides the date axis and shrinks the plot — used in previews. */
  compact?: boolean;
  /** Desktop: highlight on hover as well as on press. */
  hoverable?: boolean;
};

/**
 * The bars, tooltip and date axis of the price trend chart. Shared by the
 * Hotel Detail section and the desktop feature-card preview.
 */
export function TrendPlot({ data, picked, onPick, compact = false, hoverable = false }: Props) {
  const [tipWidth, setTipWidth] = useState(0);
  const [plotBox, setPlotBox] = useState(0);

  const max = Math.max(...data.values);
  const min = Math.min(...data.values);
  const slot = compact ? 8 : BAR_SLOT;
  const gap = compact ? 2 : BAR_GAP;
  const height = compact ? 92 : 132;
  const plotWidth = compact ? undefined : Math.max(326, data.values.length * 14);
  const span = plotWidth ?? data.values.length * (slot + gap);

  const axisLabels = compact
    ? []
    : data.ticks
        .map((label, i) => ({ label, i }))
        .filter((x) => x.label)
        .map((x) => ({
          label: x.label,
          left: (Math.min(92, Math.max(8, ((x.i + 0.5) / data.ticks.length) * 100)) / 100) * span,
        }));

  const tipLeftPct =
    picked === null ? 0 : Math.min(88, Math.max(12, ((picked + 0.5) / data.values.length) * 100));
  const tip = picked === null ? null : buildTip(data, picked, min, max);

  // Centre the tooltip on its bar, then keep it inside the plot's own box.
  const track = compact ? plotBox : span;
  const tipLeft = track
    ? Math.min(Math.max((tipLeftPct / 100) * track - tipWidth / 2, 0), Math.max(track - tipWidth, 0))
    : 0;

  const bars = (
    <View onLayout={(e: LayoutChangeEvent) => setPlotBox(e.nativeEvent.layout.width)}>
      {tip ? (
        <View
          style={[styles.tip, compact && styles.tipCompact, { left: tipLeft }]}
          onLayout={(e: LayoutChangeEvent) => setTipWidth(e.nativeEvent.layout.width)}
          pointerEvents="none"
        >
          <Txt variant="regular12" color={color.textMuted} numberOfLines={1}>
            {tip.date}
          </Txt>
          <Txt
            variant="bold16"
            color={color.surface}
            numberOfLines={1}
            style={{ marginTop: space.x2 }}
          >
            {tip.price}
          </Txt>
          <Txt
            variant="semibold14"
            color={tip.color}
            numberOfLines={1}
            style={[styles.small, { marginTop: space.x2 }]}
          >
            {tip.label}
          </Txt>
        </View>
      ) : null}

      <Pressable
        // Hover-out lives on the row, not each bar: sliding between adjacent
        // bars stays inside it, so the selection never blinks to empty.
        style={[styles.bars, { gap, height }]}
        onHoverOut={hoverable ? () => onPick(null) : undefined}
      >
        {data.values.map((value, i) => {
          const band = bandFor(value, min, max);
          const on = picked === i;
          return (
            <Pressable
              key={i}
              style={[styles.barSlot, compact ? { flex: 1 } : { width: slot }]}
              onPress={() => onPick(on ? null : i)}
              onHoverIn={hoverable ? () => onPick(i) : undefined}
            >
              <View
                style={{
                  width: '100%',
                  height: `${Math.round(22 + ((value - min) / (max - min || 1)) * 74)}%`,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  backgroundColor: on ? color.primary : band.fill,
                }}
              />
            </Pressable>
          );
        })}
      </Pressable>
    </View>
  );

  if (compact) return bars;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      <View style={{ width: plotWidth }}>
        {bars}
        <View style={styles.axis}>
          {axisLabels.map((a) => (
            <Txt
              key={`${a.label}-${a.left}`}
              variant="regular12"
              color={color.textSecondary}
              style={[styles.axisLabel, { left: a.left }]}
              numberOfLines={1}
            >
              {a.label}
            </Txt>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function buildTip(data: TrendData, index: number, min: number, max: number) {
  const value = data.values[index];
  const band = bandFor(value, min, max);
  const pct = Math.round(((value - data.avg) / data.avg) * 100);
  return {
    date: data.dates[index],
    price: inr(value),
    label: pct === 0 ? 'At average' : pct > 0 ? `+${pct}% vs avg` : `${pct}% vs avg`,
    color: band.label,
  };
}

const styles = StyleSheet.create({
  scroll: {
    marginHorizontal: -space.x4,
    paddingHorizontal: space.x4,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  barSlot: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tip: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
    backgroundColor: color.text,
    borderRadius: radius.md,
    paddingVertical: space.x8,
    paddingHorizontal: 10,
  },
  tipCompact: {
    paddingVertical: space.x4,
    paddingHorizontal: space.x8,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
  axis: {
    // 8px of padding above a 16px label line — a bare 16 clips the glyphs.
    height: 24,
    borderTopWidth: 1,
    borderTopColor: color.border,
    marginTop: space.x12,
    paddingTop: space.x8,
  },
  axisLabel: {
    // Labels are anchored by their centre; the offset keeps them over their tick.
    // Wide enough for the longest form ("May '25") without ellipsising.
    transform: [{ translateX: -30 }],
    width: 60,
    textAlign: 'center',
    position: 'absolute',
    top: space.x8,
  },
});
