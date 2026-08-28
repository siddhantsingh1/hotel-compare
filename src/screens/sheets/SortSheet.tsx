import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { Sheet } from '../../components/Sheet';
import { Txt } from '../../components/Txt';
import { SORT_OPTIONS } from '../../data/mock';
import { useBooking } from '../../state/BookingContext';
import { color, radius, space, TOUCH_TARGET } from '../../theme/tokens';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function SortSheet({ visible, onClose }: Props) {
  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      title="Sort by"
      headerDivider={false}
      footer={<Button label="Apply" onPress={onClose} style={{ flex: 1 }} />}
    >
      <SortOptions />
    </Sheet>
  );
}

/** The radio list. Shared by the mobile bottom sheet and the desktop Popover. */
export function SortOptions() {
  const { sort, setSort } = useBooking();

  return (
    <View style={styles.list}>
      {SORT_OPTIONS.map((option) => {
        const selected = option === sort;
        return (
          <Pressable key={option} style={styles.row} onPress={() => setSort(option)}>
            <View
              style={[
                styles.radio,
                selected
                  ? { borderWidth: 7, borderColor: color.primary }
                  : { borderWidth: 1.5, borderColor: color.radioBorder },
              ]}
            />
            <Txt
              variant={selected ? 'semibold16' : 'regular16'}
              color={selected ? color.primary : color.text}
              style={{ flex: 1 }}
            >
              {option}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: space.x8,
    gap: space.x2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x16,
    padding: space.x12,
    borderRadius: radius.lg,
    minHeight: TOUCH_TARGET,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
  },
});
