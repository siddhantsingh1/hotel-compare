import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { color, radius, space } from '../theme/tokens';
import { Txt } from './Txt';

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

/** Anchor date for the mocks — anything earlier reads as past. */
const TODAY = new Date(2026, 7, 2);
const FIRST_MONTH = { year: 2026, month: 7 };

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

/** Applies the next tap to the range, matching the prototype's rules. */
export function pickDate(
  checkIn: string | null,
  checkOut: string | null,
  key: string
): { checkIn: string | null; checkOut: string | null } {
  if (!checkIn || checkOut || key < checkIn) return { checkIn: key, checkOut: null };
  if (key === checkIn) return { checkIn, checkOut: null };
  return { checkIn, checkOut: key };
}

/** Months between the first rendered month and `key`, floored at zero. */
export function monthOffset(key: string | null) {
  if (!key) return 0;
  const [year, month] = key.split('-').map(Number);
  const diff = (year - FIRST_MONTH.year) * 12 + (month - 1 - FIRST_MONTH.month);
  return Math.max(0, diff);
}

export function WeekdayHeader({ style }: { style?: object }) {
  return (
    <View style={[styles.weekdays, style]}>
      {WEEKDAYS.map((label, i) => (
        <Txt key={`${label}-${i}`} variant="regular12" color={color.textMuted} style={styles.weekday}>
          {label}
        </Txt>
      ))}
    </View>
  );
}

type Props = {
  checkIn: string | null;
  checkOut: string | null;
  onPick: (iso: string) => void;
  /** Months rendered, starting at `offset` months from August 2026. */
  count?: number;
  offset?: number;
  /** Side-by-side months for the desktop popover; stacked on mobile. */
  side?: boolean;
};

/**
 * The month grids of the date picker. Shared by the mobile bottom sheet and
 * the desktop popover so the range logic exists once.
 */
export function Calendar({ checkIn, checkOut, onPick, count = 3, offset = 0, side = false }: Props) {
  const months = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const m = FIRST_MONTH.month + offset + i;
        return buildMonth(FIRST_MONTH.year + Math.floor(m / 12), m % 12);
      }),
    [count, offset]
  );

  return (
    <View style={side ? styles.side : styles.stacked}>
      {months.map((month) => (
        <View key={month.name} style={[{ gap: space.x8 }, side && styles.sideMonth]}>
          <Txt variant="semibold14" style={side ? styles.sideTitle : undefined}>
            {month.name}
          </Txt>
          {side ? <WeekdayHeader style={styles.sideWeekdays} /> : null}
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
                      onPress={() => onPick(cell.iso as string)}
                      style={[styles.day, (isIn || isOut) && { backgroundColor: color.primary }]}
                    >
                      <Txt
                        variant={isIn || isOut ? 'semibold14' : 'regular14'}
                        color={isIn || isOut ? color.surface : cell.past ? color.textMuted : color.text}
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
    </View>
  );
}

const styles = StyleSheet.create({
  stacked: {
    gap: space.x16,
  },
  side: {
    flexDirection: 'row',
    gap: space.x24,
  },
  sideMonth: {
    flex: 1,
    minWidth: 0,
  },
  sideTitle: {
    textAlign: 'center',
  },
  sideWeekdays: {
    paddingHorizontal: 0,
    paddingBottom: space.x4,
    borderBottomWidth: 0,
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
});
