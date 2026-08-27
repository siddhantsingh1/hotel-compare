import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { color, radius, space, TOUCH_TARGET } from '../theme/tokens';
import { ChevronLeft, PencilIcon } from './Icon';
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
  /** Makes the title block tappable and marks it with a pencil. */
  onTitlePress?: () => void;
};

export function Header({
  title,
  subtitle,
  onBack,
  right,
  floatingBack = false,
  style,
  titleOpacity = 1,
  onTitlePress,
}: Props) {
  // The title fades in on scroll; don't leave an invisible tap target behind it.
  const titleTappable = !!onTitlePress && titleOpacity > 0;
  return (
    <View style={[styles.header, style]}>
      <Pressable
        onPress={onBack}
        style={[styles.back, floatingBack && styles.backFloating]}
        hitSlop={space.x8}
      >
        <ChevronLeft size={18} />
      </Pressable>
      <Pressable
        style={[styles.titles, { opacity: titleOpacity }]}
        onPress={titleTappable ? onTitlePress : undefined}
        disabled={!titleTappable}
      >
        <View style={styles.titleRow}>
          <Txt variant="semibold16" numberOfLines={1} style={styles.titleText}>
            {title}
          </Txt>
          {onTitlePress ? <PencilIcon size={14} /> : null}
        </View>
        {subtitle ? (
          <Txt variant="regular12" color={color.textSecondary} numberOfLines={1} style={{ marginTop: space.x2 }}>
            {subtitle}
          </Txt>
        ) : null}
      </Pressable>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  titleText: {
    flexShrink: 1,
  },
});
