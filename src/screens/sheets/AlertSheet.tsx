import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { ArrowDownIcon } from '../../components/Icon';
import { Photo } from '../../components/Photo';
import { Sheet } from '../../components/Sheet';
import { Stars } from '../../components/Stars';
import { Txt } from '../../components/Txt';
import { Hotel } from '../../data/mock';
import { ALERT_PRESETS, inr, PRICE_SPREAD } from '../../data/trend';
import { color, radius, space } from '../../theme/tokens';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSetAlert: () => void;
  hotel: Hotel;
  amount: number;
  onChangeAmount: (next: number) => void;
  stayLine: string;
  guestLine: string;
  roomLine: string;
};

export function AlertSheet({
  visible,
  onClose,
  onSetAlert,
  hotel,
  amount,
  onChangeAmount,
  stayLine,
  guestLine,
  roomLine,
}: Props) {
  const below = Math.max(0, PRICE_SPREAD.current - amount);

  return (
    <Sheet visible={visible} onClose={onClose} title="Set price alert" headerDivider={false} maxHeight="88%">
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.hotelRow}>
          <Photo uri={hotel.photos[0]} style={styles.hotelThumb} />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Txt variant="semibold16">{hotel.name}</Txt>
            <View style={styles.hotelMeta}>
              <Stars count={hotel.starCount} />
              <Txt variant="regular12" color={color.textSecondary}>
                · {hotel.locality}
              </Txt>
            </View>
          </View>
        </View>

        <View style={styles.summaryCard}>
          {[
            { label: 'Stay', value: stayLine },
            { label: 'Guests', value: guestLine },
            { label: 'Room', value: roomLine },
          ].map((row, index) => (
            <View key={row.label} style={[styles.summaryRow, index < 2 && styles.summaryDivider]}>
              <Txt variant="regular12" color={color.textSecondary} style={{ flex: 1 }}>
                {row.label}
              </Txt>
              <Txt variant="medium14">{row.value}</Txt>
            </View>
          ))}
        </View>

        <View style={{ gap: space.x8 }}>
          <View style={styles.targetHeader}>
            <Txt variant="medium12" color={color.textSecondary} style={{ flex: 1 }}>
              Alert me below
            </Txt>
            <Txt variant="regular12" color={color.textSecondary}>
              Now <Txt variant="semibold14" style={styles.smallText}>{inr(PRICE_SPREAD.current)}</Txt>
            </Txt>
          </View>

          <View style={styles.amountField}>
            <Txt variant="bold20">₹</Txt>
            <Txt variant="bold20" style={{ flex: 1 }}>
              {amount.toLocaleString('en-IN')}
            </Txt>
            <View style={styles.belowPill}>
              <ArrowDownIcon size={10} color={color.success} />
              <Txt variant="semibold14" color={color.success} style={styles.smallText}>
                {inr(below)} below
              </Txt>
            </View>
          </View>

          <View style={styles.presetRow}>
            {ALERT_PRESETS.map((preset) => {
              const on = amount === preset;
              return (
                <Pressable
                  key={preset}
                  onPress={() => onChangeAmount(preset)}
                  style={[
                    styles.preset,
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
                    {inr(preset)}
                  </Txt>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.explainer}>
          <Txt variant="regular12" color={color.textSecondary} style={{ lineHeight: 18 }}>
            We re-check this room on the booking sites and tell you the moment it drops below your
            target. Change or cancel it any time from Alerts.
          </Txt>
        </View>

        <Button label="Set alert" onPress={onSetAlert} />
      </ScrollView>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: space.x16,
    paddingBottom: space.x16,
    gap: space.x16,
  },
  hotelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  hotelThumb: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
  },
  hotelMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: space.x4,
  },
  summaryCard: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
  },
  summaryRow: {
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  summaryDivider: {
    borderBottomWidth: 1,
    borderBottomColor: color.secondaryFill,
  },
  targetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
  },
  smallText: {
    fontSize: 12,
    lineHeight: 16,
  },
  amountField: {
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: radius.lg,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    backgroundColor: color.surface,
  },
  belowPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x4,
    backgroundColor: color.successTint,
    borderRadius: radius.pill,
    paddingVertical: space.x4,
    paddingHorizontal: 10,
  },
  presetRow: {
    flexDirection: 'row',
    gap: space.x8,
  },
  preset: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: space.x4,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  explainer: {
    backgroundColor: color.secondaryFill,
    borderRadius: radius.lg,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
  },
});
