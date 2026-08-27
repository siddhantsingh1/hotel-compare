import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import {
  bandFor,
  inr,
  insightsFor,
  TREND_LEGEND,
  TREND_RANGES,
  TREND_ROOMS,
  TrendRange,
  trendData,
  verdictFor,
} from '../data/trend';
import { color, radius, space } from '../theme/tokens';
import { ChevronDown } from './Icon';
import { Txt } from './Txt';

const BAR_SLOT = 11;
const BAR_GAP = 3;
const PLOT_HEIGHT = 132;

type Props = {
  range: TrendRange;
  onChangeRange: (next: TrendRange) => void;
  roomIndex: number;
  onOpenRoomPicker: () => void;
};

export function PriceTrendGraph({ range, onChangeRange, roomIndex, onOpenRoomPicker }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [tipWidth, setTipWidth] = useState(0);

  const data = useMemo(() => trendData(range, roomIndex), [range, roomIndex]);
  const insights = useMemo(() => insightsFor(data), [data]);
  const verdict = useMemo(() => verdictFor(data), [data]);

  const max = Math.max(...data.values);
  const min = Math.min(...data.values);
  const plotWidth = Math.max(326, data.values.length * 14);
  const risingDelta = data.delta.charAt(0) === '+';

  const axisLabels = data.ticks
    .map((label, i) => ({ label, i }))
    .filter((x) => x.label)
    .map((x) => ({
      label: x.label,
      left: (Math.min(92, Math.max(8, ((x.i + 0.5) / data.ticks.length) * 100)) / 100) * plotWidth,
    }));

  const tipLeft =
    picked === null
      ? 0
      : (Math.min(88, Math.max(12, ((picked + 0.5) / data.values.length) * 100)) / 100) * plotWidth;

  const tip = picked === null ? null : buildTip(data, picked, min, max);

  return (
    <View style={styles.section}>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Txt variant="semibold16">Price trends graph</Txt>
        <Pressable style={styles.roomLine} onPress={onOpenRoomPicker}>
          <Txt variant="regular12" color={color.textSecondary}>
            <Txt variant="semibold14" color={color.primary} style={styles.smallText}>
              {data.roomName}
            </Txt>{' '}
            · {data.caption}
          </Txt>
          <ChevronDown size={12} color={color.primary} />
        </Pressable>
      </View>

      <View style={styles.card}>
        <View style={styles.avgRow}>
          <Txt variant="regular12" color={color.textSecondary}>
            Average
          </Txt>
          <Txt variant="bold16">{inr(data.avg)}</Txt>
          <Txt
            variant="semibold14"
            color={risingDelta ? color.error : color.success}
            style={styles.smallText}
          >
            {data.delta}
          </Txt>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.plotScroll}>
          <View style={{ width: plotWidth }}>
            <View>
              {tip ? (
                <View
                  style={[styles.tip, { left: tipLeft, marginLeft: -tipWidth / 2 }]}
                  onLayout={(e: LayoutChangeEvent) => setTipWidth(e.nativeEvent.layout.width)}
                  pointerEvents="none"
                >
                  <Txt variant="regular12" color={color.textMuted}>
                    {tip.date}
                  </Txt>
                  <Txt variant="bold16" color={color.surface} style={{ marginTop: space.x2 }}>
                    {tip.price}
                  </Txt>
                  <Txt
                    variant="semibold14"
                    color={tip.color}
                    style={[styles.smallText, { marginTop: space.x2 }]}
                  >
                    {tip.label}
                  </Txt>
                </View>
              ) : null}

              <View style={styles.bars}>
                {data.values.map((value, i) => {
                  const band = bandFor(value, min, max);
                  const on = picked === i;
                  return (
                    <Pressable
                      key={i}
                      style={styles.barSlot}
                      onPress={() => setPicked(on ? null : i)}
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
              </View>
            </View>

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

        <View style={styles.rangeRow}>
          {TREND_RANGES.map((label) => {
            const on = range === label;
            return (
              <Pressable
                key={label}
                onPress={() => {
                  setPicked(null);
                  onChangeRange(label);
                }}
                style={[
                  styles.rangeChip,
                  {
                    backgroundColor: on ? color.primaryTint : color.surface,
                    borderColor: on ? color.primary : color.border,
                  },
                ]}
              >
                <Txt
                  variant="semibold14"
                  color={on ? color.primary : color.textSecondary}
                  style={styles.smallText}
                >
                  {label}
                </Txt>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.insightBlock}>
          <Txt variant="semibold14" style={styles.smallText}>
            What this tells you
          </Txt>
          {insights.map((insight) => (
            <View key={insight.lead} style={styles.insightRow}>
              <View style={[styles.insightDot, { backgroundColor: insight.dot }]} />
              <Txt variant="regular12" color={color.textSecondary} style={{ flex: 1 }}>
                <Txt variant="semibold14" style={styles.smallText}>
                  {insight.lead}
                </Txt>{' '}
                {insight.text}
              </Txt>
            </View>
          ))}
          <View style={styles.verdict}>
            <Txt variant="semibold14" color={color.primary} style={styles.smallText}>
              {verdict}
            </Txt>
          </View>
        </View>

        <View style={styles.legend}>
          {TREND_LEGEND.map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View style={[styles.legendSwatch, { backgroundColor: item.fill }]} />
              <Txt variant="regular12" color={color.textSecondary}>
                {item.label}
              </Txt>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function buildTip(
  data: ReturnType<typeof trendData>,
  index: number,
  min: number,
  max: number
) {
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
  section: {
    paddingVertical: space.x20,
    paddingHorizontal: space.x16,
    gap: space.x16,
    backgroundColor: color.surface,
    borderBottomWidth: space.x8,
    borderBottomColor: color.page,
  },
  roomLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: space.x4,
    minHeight: 24,
  },
  card: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    padding: space.x16,
    gap: space.x12,
  },
  avgRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: space.x8,
  },
  smallText: {
    fontSize: 12,
    lineHeight: 16,
  },
  plotScroll: {
    marginHorizontal: -space.x4,
    paddingHorizontal: space.x4,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: BAR_GAP,
    height: PLOT_HEIGHT,
  },
  barSlot: {
    width: BAR_SLOT,
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
  axis: {
    // 8px of padding above a 16px label line — a bare 16 clips the glyphs.
    height: 24,
    borderTopWidth: 1,
    borderTopColor: color.border,
    marginTop: space.x12,
    paddingTop: space.x8,
  },
  axisLabel: {
    position: 'absolute',
    top: space.x8,
    // Labels are anchored by their centre; the offset keeps them over their tick.
    // Wide enough for the longest form ("May '25") without ellipsising.
    transform: [{ translateX: -30 }],
    width: 60,
    textAlign: 'center',
  },
  rangeRow: {
    flexDirection: 'row',
    gap: space.x8,
    marginTop: space.x4,
  },
  rangeChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: space.x4,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  insightBlock: {
    borderTopWidth: 1,
    borderTopColor: color.border,
    paddingTop: space.x12,
    gap: space.x8,
  },
  insightRow: {
    flexDirection: 'row',
    gap: space.x8,
    alignItems: 'flex-start',
  },
  insightDot: {
    width: 6,
    height: 6,
    borderRadius: radius.pill,
    marginTop: 5,
  },
  verdict: {
    backgroundColor: color.primaryTint,
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: space.x12,
  },
  legend: {
    borderTopWidth: 1,
    borderTopColor: color.border,
    paddingTop: space.x12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: space.x8,
    columnGap: space.x16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
  },
  legendSwatch: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
});
