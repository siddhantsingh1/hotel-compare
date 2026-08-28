import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar, pickDate, WeekdayHeader } from '../../components/Calendar';
import { Sheet } from '../../components/Sheet';
import { Txt } from '../../components/Txt';
import { formatDay, nightsBetween } from '../../state/BookingContext';
import { color, radius, space } from '../../theme/tokens';

type Props = {
  visible: boolean;
  onClose: () => void;
  checkIn: string | null;
  checkOut: string | null;
  onChange: (next: { checkIn: string | null; checkOut: string | null }) => void;
};

export function DateSheet({ visible, onClose, checkIn, checkOut, onChange }: Props) {
  const nights = nightsBetween(checkIn, checkOut);
  const awaitingCheckIn = !checkIn || !!checkOut;

  return (
    <Sheet visible={visible} onClose={onClose} title="Select dates" headerDivider={false} maxHeight="88%">
      <View style={styles.summaryRow}>
        <View
          style={[
            styles.summaryField,
            {
              borderColor: awaitingCheckIn ? color.primary : color.border,
              backgroundColor: awaitingCheckIn ? color.primaryTint : color.surface,
            },
          ]}
        >
          <Txt variant="regular12" color={color.textSecondary}>
            Check-in
          </Txt>
          <Txt variant="semibold16" style={{ marginTop: space.x2 }}>
            {formatDay(checkIn)}
          </Txt>
        </View>
        <View
          style={[
            styles.summaryField,
            {
              borderColor: !awaitingCheckIn ? color.primary : color.border,
              backgroundColor: !awaitingCheckIn ? color.primaryTint : color.surface,
            },
          ]}
        >
          <Txt variant="regular12" color={color.textSecondary}>
            Check-out
          </Txt>
          <Txt variant="semibold16" style={{ marginTop: space.x2 }}>
            {formatDay(checkOut)}
          </Txt>
        </View>
      </View>

      <WeekdayHeader />

      <ScrollView contentContainerStyle={styles.calendar} showsVerticalScrollIndicator={false}>
        <Calendar
          checkIn={checkIn}
          checkOut={checkOut}
          onPick={(key) => onChange(pickDate(checkIn, checkOut, key))}
        />
      </ScrollView>

      <View style={styles.footer}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Txt variant="semibold14">
            {nights > 0 ? `${nights} ${nights > 1 ? 'nights' : 'night'} selected` : 'Pick your check-in date'}
          </Txt>
          <Pressable onPress={() => onChange({ checkIn: null, checkOut: null })}>
            <Txt variant="medium12" color={color.primary} style={{ marginTop: space.x2 }}>
              Reset
            </Txt>
          </Pressable>
        </View>
        <Button label="Apply" onPress={onClose} disabled={nights === 0} />
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    gap: space.x8,
    paddingHorizontal: space.x16,
    paddingBottom: space.x12,
  },
  summaryField: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingVertical: 10,
    paddingHorizontal: space.x12,
  },
  calendar: {
    paddingHorizontal: space.x16,
    paddingTop: space.x12,
    paddingBottom: space.x8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingHorizontal: space.x16,
    paddingTop: space.x12,
    paddingBottom: space.x16,
    borderTopWidth: 1,
    borderTopColor: color.border,
  },
});
