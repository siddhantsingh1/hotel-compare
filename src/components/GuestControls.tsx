import React from 'react';
import { StyleSheet, View } from 'react-native';
import { color, space } from '../theme/tokens';
import { Stepper } from './Stepper';
import { Txt } from './Txt';

export type GuestCounts = { rooms: number; adults: number; children: number };

const ROWS: { key: keyof GuestCounts; label: string; hint: string; min: number; max: number }[] = [
  { key: 'rooms', label: 'Rooms', hint: 'Separate rooms in one booking', min: 1, max: 8 },
  { key: 'adults', label: 'Adults', hint: 'Age 13 and above', min: 1, max: 16 },
  { key: 'children', label: 'Children', hint: 'Age 0–12', min: 0, max: 8 },
];

/** The rooms / adults / children steppers, shared by the sheet and the popover. */
export function GuestControls({
  counts,
  onChange,
}: {
  counts: GuestCounts;
  onChange: (patch: Partial<GuestCounts>) => void;
}) {
  return (
    <>
      {ROWS.map((row) => (
        <View key={row.key} style={styles.row}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Txt variant="medium16">{row.label}</Txt>
            <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
              {row.hint}
            </Txt>
          </View>
          <Stepper
            value={counts[row.key]}
            min={row.min}
            max={row.max}
            onChange={(next) => onChange({ [row.key]: next } as Partial<GuestCounts>)}
          />
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: space.x12,
    borderBottomWidth: 1,
    borderBottomColor: color.page,
  },
});
