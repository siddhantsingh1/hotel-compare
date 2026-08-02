import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { Sheet } from '../../components/Sheet';
import { Stepper } from '../../components/Stepper';
import { Txt } from '../../components/Txt';
import { color, space } from '../../theme/tokens';

export type GuestCounts = { rooms: number; adults: number; children: number };

const ROWS: { key: keyof GuestCounts; label: string; hint: string; min: number; max: number }[] = [
  { key: 'rooms', label: 'Rooms', hint: 'Separate rooms in one booking', min: 1, max: 8 },
  { key: 'adults', label: 'Adults', hint: 'Age 13 and above', min: 1, max: 16 },
  { key: 'children', label: 'Children', hint: 'Age 0–12', min: 0, max: 8 },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  counts: GuestCounts;
  onChange: (patch: Partial<GuestCounts>) => void;
};

export function GuestsSheet({ visible, onClose, counts, onChange }: Props) {
  return (
    <Sheet visible={visible} onClose={onClose} title="Rooms & guests" headerDivider={false}>
      <View style={styles.body}>
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
        <Button label="Apply" onPress={onClose} style={{ marginTop: space.x4 }} />
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: space.x16,
    paddingBottom: space.x16,
    gap: space.x16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: space.x12,
    borderBottomWidth: 1,
    borderBottomColor: color.page,
  },
});
