import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { Sheet } from '../../components/Sheet';
import { Txt } from '../../components/Txt';
import { formatDay, nightsBetween } from '../../state/BookingContext';
import { color, radius, space } from '../../theme/tokens';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const TODAY = new Date(2026, 7, 2);

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

type Cell = { key: string; label: string; iso: string | null; past: boolean };

function buildMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const total = new Date(year, month + 1, 0).getDate();
  const cells: Cell[] = [];
  for (let i = 0; i < first.getDay(); i += 1) {
    cells.push({ key: `pad-${year}-${month}-${i}`, label: '', iso: null, past: false });
  }
  for (let day = 1; day <= total; day += 1) {
    const key = iso(new Date(year, month, day));
    cells.push({ key, label: String(day), iso: key, past: key < iso(TODAY) });
  }
  return { name: `${MONTH_FULL[month]} ${year}`, cells };
}

type Props = {
  visible: boolean;
  onClose: () => void;
  checkIn: string | null;
  checkOut: string | null;
  onChange: (next: { checkIn: string | null; checkOut: string | null }) => void;
};

export function DateSheet({ visible, onClose, checkIn, checkOut, onChange }: Props) {
  const months = useMemo(() => [buildMonth(2026, 7), buildMonth(2026, 8), buildMonth(2026, 9)], []);
  const nights = nightsBetween(checkIn, checkOut);

  const pick = (key: string) => {
    if (!checkIn || checkOut || key < checkIn) {
      onChange({ checkIn: key, checkOut: null });
    } else if (key === checkIn) {
      onChange({ checkIn, checkOut: null });
    } else {
      onChange({ checkIn, checkOut: key });
    }
  };

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

      <View style={styles.weekdays}>
        {WEEKDAYS.map((label, i) => (
          <Txt key={`${label}-${i}`} variant="regular12" color={color.textMuted} style={styles.weekday}>
            {label}
          </Txt>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.calendar} showsVerticalScrollIndicator={false}>
        {months.map((month) => (
          <View key={month.name} style={{ gap: space.x8 }}>
            <Txt variant="semibold14">{month.name}</Txt>
            <View style={styles.grid}>
              {month.cells.map((cell) => {
                const isIn = cell.iso === checkIn;
                const isOut = cell.iso === checkOut;
                const inRange =
                  !!checkIn && !!checkOut && !!cell.iso && cell.iso > checkIn && cell.iso < checkOut;
                const edge = !!checkOut && (isIn || isOut);
                return (
                  <View
                    key={cell.key}
                    style={[
                      styles.cell,
                      (inRange || edge) && { backgroundColor: color.primaryTint },
                      edge && isIn && styles.rangeStart,
                      edge && isOut && styles.rangeEnd,
                    ]}
                  >
                    {cell.iso ? (
                      <Pressable
                        disabled={cell.past}
                        onPress={() => pick(cell.iso as string)}
                        style={[styles.day, (isIn || isOut) && { backgroundColor: color.primary }]}
                      >
                        <Txt
                          variant={isIn || isOut ? 'semibold14' : 'regular14'}
                          color={
                            isIn || isOut ? color.surface : cell.past ? color.textMuted : color.text
                          }
                        >
                          {cell.label}
                        </Txt>
                      </Pressable>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
        ))}
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
  weekdays: {
    flexDirection: 'row',
    paddingHorizontal: space.x16,
    paddingBottom: space.x8,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
  },
  calendar: {
    paddingHorizontal: space.x16,
    paddingTop: space.x12,
    paddingBottom: space.x8,
    gap: space.x16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: space.x4,
  },
  cell: {
    width: `${100 / 7}%`,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rangeStart: {
    borderTopLeftRadius: radius.pill,
    borderBottomLeftRadius: radius.pill,
  },
  rangeEnd: {
    borderTopRightRadius: radius.pill,
    borderBottomRightRadius: radius.pill,
  },
  day: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
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
