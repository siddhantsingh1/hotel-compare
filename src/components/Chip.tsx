import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { color, radius, space } from '../theme/tokens';
import { CheckIcon } from './Icon';
import { Txt } from './Txt';

type Props = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  /** Renders a checkbox square inside the chip (Price Comparison filter chips). */
  checkbox?: boolean;
  leading?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Chip({ label, active = false, onPress, checkbox = false, leading, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? color.primaryTint : color.surface,
          borderColor: active ? color.primary : color.border,
        },
        style,
      ]}
    >
      {checkbox ? (
        <View
          style={[
            styles.box,
            {
              backgroundColor: active ? color.primary : color.surface,
              borderColor: active ? color.primary : color.border,
            },
          ]}
        >
          {active ? <CheckIcon size={11} /> : null}
        </View>
      ) : null}
      {leading}
      <Txt variant="medium14" color={active ? color.primary : color.text} numberOfLines={1}>
        {label}
      </Txt>
    </Pressable>
  );
}

/** Solid or tinted status pill — savings, discounts, room highlights. */
export function Pill({
  label,
  background,
  foreground,
  leading,
  style,
}: {
  label: string;
  background: string;
  foreground: string;
  leading?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.pill, { backgroundColor: background }, style]}>
      {leading}
      <Txt variant="medium12" color={foreground}>
        {label}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  box: {
    width: 16,
    height: 16,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x4,
    paddingVertical: space.x4,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
});
