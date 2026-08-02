import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { color, radius, space, TOUCH_TARGET } from '../theme/tokens';
import { Txt } from './Txt';

type Variant = 'primary' | 'secondary' | 'outline' | 'outlinePill';
type Size = 'large' | 'compact';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  /** Rendered to the right of the label, e.g. an external-link arrow. */
  trailing?: React.ReactNode;
};

const fills: Record<Variant, { bg: string; pressedBg: string; fg: string; border?: string }> = {
  primary: { bg: color.primary, pressedBg: color.primaryPressed, fg: color.surface },
  secondary: { bg: color.secondaryFill, pressedBg: color.secondaryFillPressed, fg: color.primary },
  outline: { bg: color.surface, pressedBg: color.primaryTint, fg: color.primary, border: color.primary },
  outlinePill: { bg: color.surface, pressedBg: color.page, fg: color.text, border: color.border },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled,
  style,
  trailing,
}: Props) {
  const fill = fills[variant];
  const large = size === 'large';

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          paddingVertical: large ? space.x16 : space.x12,
          paddingHorizontal: large ? space.x24 : space.x20,
          borderRadius: variant === 'outlinePill' ? radius.pill : radius.xl,
          backgroundColor: disabled ? color.border : pressed ? fill.pressedBg : fill.bg,
          borderWidth: fill.border ? 1 : 0,
          borderColor: fill.border,
        },
        style,
      ]}
    >
      <Txt
        variant={large ? 'semibold16' : 'semibold14'}
        color={disabled ? color.textMuted : fill.fg}
      >
        {label}
      </Txt>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </Pressable>
  );
}

/** Circular 44px icon button used in headers and sheet corners. */
export function IconButton({
  children,
  onPress,
  background = color.surface,
  bordered = true,
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  background?: string;
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconButton,
        {
          backgroundColor: background,
          borderWidth: bordered ? 1 : 0,
          borderColor: pressed ? color.primary : color.border,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: TOUCH_TARGET,
  },
  trailing: {
    marginLeft: space.x8,
  },
  iconButton: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
