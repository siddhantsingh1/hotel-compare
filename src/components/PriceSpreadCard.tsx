import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { inr, PRICE_SPREAD } from '../data/trend';
import { color, radius, space } from '../theme/tokens';
import { ArrowDownIcon } from './Icon';
import { Txt } from './Txt';

/**
 * "Property price trend" — where the price you'd pay sits between the cheapest
 * and dearest quote across booking sites.
 */
export function PriceSpreadCard() {
  const { low, high, current, sites } = PRICE_SPREAD;
  const markerLeft: `${number}%` = `${Math.round(((current - low) / (high - low)) * 100)}%`;

  return (
    <View style={styles.section}>
      <Txt variant="semibold16">Property price trend</Txt>

      <View style={styles.card}>
        <View style={styles.summaryRow}>
          <View style={{ minWidth: 0 }}>
            <Txt variant="regular12" color={color.textSecondary}>
              Cheapest
            </Txt>
            <Txt variant="bold20" color={color.success} style={{ marginTop: space.x4 }}>
              {inr(low)}
            </Txt>
          </View>

          <View style={styles.spreadMiddle}>
            <View style={styles.spreadPill}>
              <ArrowDownIcon size={10} />
              <Txt variant="semibold14" color={color.surface} style={styles.pillText}>
                {inr(high - low)} spread
              </Txt>
            </View>
            <Txt variant="regular12" color={color.textSecondary}>
              {Math.round(((high - low) / low) * 100)}% range
            </Txt>
          </View>

          <View style={{ minWidth: 0, alignItems: 'flex-end' }}>
            <Txt variant="regular12" color={color.textSecondary}>
              Highest
            </Txt>
            <Txt variant="bold20" color={color.error} style={{ marginTop: space.x4 }}>
              {inr(high)}
            </Txt>
          </View>
        </View>

        <View style={{ gap: space.x8 }}>
          <View style={styles.track}>
            <Svg width="100%" height={8}>
              <Defs>
                <LinearGradient id="spread" x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0" stopColor={'#9BD3B8'} />
                  <Stop offset="0.52" stopColor={'#FBE49A'} />
                  <Stop offset="1" stopColor={'#F0AEAF'} />
                </LinearGradient>
              </Defs>
              <Rect x={0} y={0} width="100%" height={8} rx={4} fill="url(#spread)" />
            </Svg>
            <View style={[styles.marker, { left: markerLeft }]} />
          </View>

          <View style={styles.scaleRow}>
            <Txt variant="regular12" color={color.textSecondary}>
              Cheaper
            </Txt>
            <Txt variant="semibold14" color={color.primary} style={styles.pillText}>
              You pay {inr(current)}
            </Txt>
            <Txt variant="regular12" color={color.textSecondary}>
              Costlier
            </Txt>
          </View>
        </View>

        <View style={styles.footer}>
          <Txt variant="regular12" color={color.textSecondary} style={{ flex: 1 }}>
            Available on <Txt variant="semibold14" style={styles.pillText}>{sites} sites</Txt>
          </Txt>
          <Txt variant="regular12" color={color.textMuted}>
            Prices include taxes
          </Txt>
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
  card: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    padding: space.x16,
    gap: space.x16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.x12,
  },
  spreadMiddle: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    gap: space.x4,
    paddingTop: space.x2,
  },
  spreadPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x4,
    backgroundColor: color.success,
    borderRadius: radius.pill,
    paddingVertical: space.x4,
    paddingHorizontal: 10,
  },
  pillText: {
    fontSize: 12,
    lineHeight: 16,
  },
  track: {
    height: 8,
    borderRadius: radius.pill,
    overflow: 'visible',
    justifyContent: 'center',
  },
  marker: {
    position: 'absolute',
    top: -4,
    width: 16,
    height: 16,
    marginLeft: -8,
    borderRadius: radius.pill,
    backgroundColor: color.surface,
    borderWidth: 3,
    borderColor: color.primary,
  },
  scaleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: color.border,
    paddingTop: space.x12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
  },
});
