import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color, radius, shadow, space } from '../theme/tokens';
import { CheckIcon } from './Icon';
import { Txt } from './Txt';

const VISIBLE_MS = 3200;

type Props = {
  message: string | null;
  onHide: () => void;
  /** Lifts the toast clear of a sticky bottom bar. */
  bottomOffset?: number;
};

/** Transient confirmation, anchored above the bottom bar. */
export function Toast({ message, onHide, bottomOffset = 0 }: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!message) return undefined;

    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(progress, {
        toValue: 0,
        duration: 160,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) onHide();
      });
    }, VISIBLE_MS);

    return () => clearTimeout(timer);
  }, [message, progress, onHide]);

  if (!message) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.toast,
        {
          bottom: bottomOffset + insets.bottom + space.x16,
          opacity: progress,
          transform: [
            { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) },
          ],
        },
      ]}
    >
      <CheckIcon size={14} color={color.successTint} />
      <Txt variant="medium14" color={color.surface} style={{ flex: 1 }}>
        {message}
      </Txt>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: space.x16,
    right: space.x16,
    zIndex: 30,
    backgroundColor: color.text,
    borderRadius: radius.lg,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    ...shadow.bottomBar,
  },
});
