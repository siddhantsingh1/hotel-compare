import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { color, radius, space, TOUCH_TARGET } from '../theme/tokens';
import { ChevronLeft } from './Icon';
import { Txt } from './Txt';

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  /** Circular bordered back button, used where the header floats over media. */
  floatingBack?: boolean;
  style?: StyleProp<ViewStyle>;
  titleOpacity?: number;
};

export function Header({
  title,
  subtitle,
  onBack,
  right,
  floatingBack = false,
  style,
  titleOpacity = 1,
}: Props) {
  return (
    <View style={[styles.header, style]}>
      <Pressable
        onPress={onBack}
        style={[styles.back, floatingBack && styles.backFloating]}
        hitSlop={space.x8}
      >
        <ChevronLeft size={18} />
      </Pressable>
      <View style={[styles.titles, { opacity: titleOpacity }]}>
        <Txt variant="semibold16" numberOfLines={1}>
          {title}
        </Txt>
        {subtitle ? (
          <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
            {subtitle}
          </Txt>
        ) : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
    backgroundColor: color.surface,
  },
  back: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    marginLeft: -space.x12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backFloating: {
    marginLeft: 0,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: color.surface,
  },
  titles: {
    flex: 1,
    minWidth: 0,
  },
});
