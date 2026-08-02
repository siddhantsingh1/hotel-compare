import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color, radius, space, TOUCH_TARGET } from '../theme/tokens';
import { CloseIcon } from './Icon';
import { Txt } from './Txt';

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  /** Divider under the header — the Sort sheet deliberately has none. */
  headerDivider?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Fraction of screen height the sheet may occupy. */
  maxHeight?: `${number}%`;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Sheet({
  visible,
  onClose,
  title,
  subtitle,
  headerDivider = true,
  children,
  footer,
  maxHeight = '82%',
  contentStyle,
}: Props) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 200,
      easing: Easing.bezier(0.2, 0, 0, 1),
      useNativeDriver: true,
    }).start();
  }, [visible, progress]);

  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.root}>
        <Animated.View style={[styles.scrim, { opacity: progress }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            { maxHeight },
            {
              transform: [
                {
                  translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [600, 0] }),
                },
              ],
            },
          ]}
        >
          <View style={styles.handleRow}>
            <View style={styles.handle} />
          </View>

          {title ? (
            <View style={[styles.header, headerDivider && styles.headerDivider]}>
              <View style={styles.headerText}>
                <Txt variant="semibold18">{title}</Txt>
                {subtitle ? (
                  <Txt variant="medium12" color={color.primary} style={{ marginTop: space.x2 }}>
                    {subtitle}
                  </Txt>
                ) : null}
              </View>
              <Pressable onPress={onClose} style={styles.close}>
                <CloseIcon size={16} />
              </Pressable>
            </View>
          ) : null}

          <View style={[styles.body, contentStyle]}>{children}</View>

          {footer ? (
            <View style={[styles.footer, { paddingBottom: Math.max(space.x24, insets.bottom) }]}>
              {footer}
            </View>
          ) : null}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: color.scrim,
  },
  sheet: {
    backgroundColor: color.surface,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    overflow: 'hidden',
  },
  handleRow: {
    paddingTop: space.x12,
    alignItems: 'center',
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: color.border,
  },
  header: {
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  headerDivider: {
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  close: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    borderRadius: radius.pill,
    backgroundColor: color.secondaryFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flexShrink: 1,
  },
  footer: {
    paddingTop: space.x12,
    paddingHorizontal: space.x16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
});
