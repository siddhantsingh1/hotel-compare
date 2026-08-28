import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ALERT_PRESETS, DEFAULT_ALERT_AMOUNT, inr, PRICE_SPREAD, trendData } from '../data/trend';
import { HOTELS } from '../data/mock';
import { color, radius, shadow, space } from '../theme/tokens';
import { ArrowDownIcon, BellIcon } from './Icon';
import { PriceCompareRow } from './PriceCompareRow';
import { Toggle } from './Toggle';
import { TrendPlot } from './TrendPlot';
import { Txt } from './Txt';

/**
 * Desktop-only proof-by-demonstration cards. Each one runs the real component
 * from the product rather than a picture of it.
 */
export function FeatureCards() {
  return (
    <View style={styles.row}>
      <CompareCard />
      <TrendCard />
      <AlertCard />
    </View>
  );
}

function Shell({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Txt variant="semibold18">{title}</Txt>
      <Txt variant="regular14" color={color.textSecondary} style={styles.cardBody}>
        {body}
      </Txt>
      <View style={styles.demo}>{children}</View>
    </View>
  );
}

function CompareCard() {
  const hotel = HOTELS[0];
  return (
    <Shell
      title="Compare across every site"
      body="One search checks every booking site, so the cheapest quote is always in front of you."
    >
      <PriceCompareRow
        platform={hotel.bestPrice.platform}
        price={hotel.bestPrice.total}
        best
        showChevron={false}
        style={styles.bestRow}
      />
      {hotel.altPrices.map((alt) => (
        <PriceCompareRow
          key={alt.platform}
          platform={alt.platform}
          price={alt.price}
          higherBy={alt.higherBy}
          showChevron={false}
          style={styles.altRow}
        />
      ))}
    </Shell>
  );
}

function TrendCard() {
  const data = useMemo(() => trendData('1M', 0), []);
  // Starts on the cheapest bar so the card reads without interaction.
  const cheapest = useMemo(() => data.values.indexOf(Math.min(...data.values)), [data]);
  const [picked, setPicked] = useState<number | null>(cheapest);

  return (
    <Shell
      title="Track price trends"
      body="See what a room has cost over the past month, so you know whether today is a good day to book."
    >
      <View style={styles.trendHeader}>
        <Txt variant="regular12" color={color.textSecondary}>
          Average
        </Txt>
        <Txt variant="bold16">{inr(data.avg)}</Txt>
        <Txt variant="semibold14" color={color.success} style={styles.small}>
          {data.delta}
        </Txt>
      </View>
      <TrendPlot data={data} picked={picked} onPick={setPicked} compact hoverable />
      <Txt variant="regular12" color={color.textMuted} style={{ marginTop: space.x8 }}>
        Hover a bar for that day's price
      </Txt>
    </Shell>
  );
}

function AlertCard() {
  const hotel = HOTELS[0];
  const [on, setOn] = useState(true);
  const target = DEFAULT_ALERT_AMOUNT;
  const below = PRICE_SPREAD.current - target;

  return (
    <Shell
      title="Get price-drop alerts"
      body="Set the price you want to pay. We keep watching and tell you the moment it drops."
    >
      <View style={styles.alertRow}>
        <View style={styles.bellTile}>
          <BellIcon size={16} />
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Txt variant="semibold14" numberOfLines={1}>
            {hotel.name}
          </Txt>
          <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
            Alert me below {inr(target)}
          </Txt>
        </View>
        <Toggle value={on} onChange={setOn} accessibilityLabel="Demo price alert" />
      </View>

      <View style={[styles.alertStatus, !on && styles.alertStatusOff]}>
        {on ? (
          <>
            <ArrowDownIcon size={10} color={color.success} />
            <Txt variant="semibold14" color={color.success} style={styles.small}>
              Watching · {inr(below)} below today's {inr(PRICE_SPREAD.current)}
            </Txt>
          </>
        ) : (
          <Txt variant="semibold14" color={color.textMuted} style={styles.small}>
            Alerts off — flip the switch to watch this price
          </Txt>
        )}
      </View>

      <View style={styles.presetRow}>
        {ALERT_PRESETS.slice(0, 3).map((preset) => {
          const active = on && preset === target;
          return (
            <View
              key={preset}
              style={[
                styles.preset,
                {
                  backgroundColor: active ? color.primaryTint : color.surface,
                  borderColor: active ? color.primary : color.border,
                },
              ]}
            >
              <Txt
                variant="semibold14"
                color={active ? color.primary : color.textSecondary}
                style={styles.small}
              >
                {inr(preset)}
              </Txt>
            </View>
          );
        })}
      </View>
    </Shell>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: space.x24,
  },
  card: {
    flex: 1,
    minWidth: 0,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.xl,
    padding: space.x24,
    gap: space.x8,
    ...shadow.card,
  },
  cardBody: {
    lineHeight: 20,
  },
  demo: {
    marginTop: space.x8,
    borderTopWidth: 1,
    borderTopColor: color.border,
    paddingTop: space.x16,
  },
  bestRow: {
    backgroundColor: color.successTint,
    borderRadius: radius.md,
    paddingHorizontal: space.x8,
  },
  altRow: {
    paddingHorizontal: space.x8,
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: space.x8,
    marginBottom: space.x12,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  bellTile: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: color.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertStatus: {
    marginTop: space.x12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x4,
    backgroundColor: color.successTint,
    borderRadius: radius.md,
    paddingVertical: space.x8,
    paddingHorizontal: space.x12,
  },
  alertStatusOff: {
    backgroundColor: color.page,
  },
  presetRow: {
    flexDirection: 'row',
    gap: space.x8,
    marginTop: space.x12,
  },
  preset: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: space.x8,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
});
