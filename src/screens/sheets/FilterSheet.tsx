import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { CheckIcon } from '../../components/Icon';
import { Sheet } from '../../components/Sheet';
import { Txt } from '../../components/Txt';
import { FILTER_CATEGORIES } from '../../data/mock';
import { useBooking } from '../../state/BookingContext';
import { color, radius, space } from '../../theme/tokens';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function FilterSheet({ visible, onClose }: Props) {
  const { filters, toggleFilter, clearFilters, appliedFilterCount } = useBooking();
  const [categoryIndex, setCategoryIndex] = useState(0);

  const activeCategory = FILTER_CATEGORIES[categoryIndex];
  const activeChecked = filters[activeCategory.label] ?? [];

  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      title="Apply Filters"
      subtitle={`${appliedFilterCount} applied`}
      maxHeight="92%"
      contentStyle={styles.content}
      footer={
        <>
          <Button label="Reset all" variant="secondary" onPress={clearFilters} style={{ flex: 1 }} />
          <Button label="Apply filters" onPress={onClose} style={{ flex: 1 }} />
        </>
      }
    >
      <View style={styles.columns}>
        <ScrollView style={styles.rail} contentContainerStyle={{ paddingBottom: space.x16 }}>
          {FILTER_CATEGORIES.map((category, index) => {
            const active = index === categoryIndex;
            const count = (filters[category.label] ?? []).length;
            return (
              <Pressable
                key={category.label}
                onPress={() => setCategoryIndex(index)}
                style={[
                  styles.railItem,
                  {
                    borderLeftColor: active ? color.primary : 'transparent',
                    backgroundColor: active ? color.surface : 'transparent',
                  },
                ]}
              >
                <Txt
                  variant={active ? 'semibold14' : 'regular14'}
                  color={active ? color.primary : color.textSecondary}
                  style={{ flex: 1 }}
                >
                  {category.label}
                </Txt>
                {count > 0 ? (
                  <View style={styles.countBadge}>
                    <Txt variant="semibold14" color={color.countBadgeText} style={styles.countText}>
                      {count}
                    </Txt>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView style={styles.options} contentContainerStyle={styles.optionsContent}>
          {activeCategory.options.map((option) => {
            const checked = activeChecked.includes(option.label);
            return (
              <Pressable
                key={option.label}
                style={styles.option}
                onPress={() => toggleFilter(activeCategory.label, option.label)}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: checked ? color.primary : color.surface,
                      borderColor: checked ? color.primary : color.checkboxBorder,
                    },
                  ]}
                >
                  {checked ? <CheckIcon size={13} /> : null}
                </View>
                <Txt variant="regular14" style={{ flex: 1 }}>
                  {option.label}
                </Txt>
                <Txt variant="regular12" color={color.textMuted}>
                  {option.count}
                </Txt>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  columns: {
    flex: 1,
    flexDirection: 'row',
  },
  rail: {
    width: 132,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 132,
    backgroundColor: color.page,
    borderRightWidth: 1,
    borderRightColor: color.border,
  },
  railItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    paddingVertical: 14,
    paddingHorizontal: space.x12,
    borderLeftWidth: 3,
  },
  countBadge: {
    minWidth: 18,
    borderRadius: radius.pill,
    paddingVertical: space.x2,
    paddingHorizontal: 6,
    backgroundColor: color.countBadgeBg,
  },
  countText: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  options: {
    flex: 1,
  },
  optionsContent: {
    paddingTop: space.x4,
    paddingHorizontal: space.x16,
    paddingBottom: space.x16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: space.x12,
    borderBottomWidth: 1,
    borderBottomColor: color.page,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
