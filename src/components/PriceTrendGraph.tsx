import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
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
import { TrendPlot } from './TrendPlot';
import { Txt } from './Txt';


type Props = {
  range: TrendRange;
  onChangeRange: (next: TrendRange) => void;
  roomIndex: number;
  onOpenRoomPicker: () => void;
};

export function PriceTrendGraph({ range, onChangeRange, roomIndex, onOpenRoomPicker }: Props) {
  const [picked, setPicked] = useState<number | null>(null);

  const data = useMemo(() => trendData(range, roomIndex), [range, roomIndex]);
  const insights = useMemo(() => insightsFor(data), [data]);
  const verdict = useMemo(() => verdictFor(data), [data]);

  const risingDelta = data.delta.charAt(0) === '+';




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

        <TrendPlot data={data} picked={picked} onPick={setPicked} />

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
