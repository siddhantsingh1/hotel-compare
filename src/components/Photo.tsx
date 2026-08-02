import React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { color } from '../theme/tokens';

type Props = {
  uri?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

/**
 * Image tile that keeps the neutral placeholder fill visible while the remote
 * photo loads, so layouts never flash empty.
 */
export function Photo({ uri, style, children }: Props) {
  return (
    <View style={[styles.base, style]}>
      {uri ? <Image source={{ uri }} style={StyleSheet.absoluteFill} resizeMode="cover" /> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: color.border,
    overflow: 'hidden',
  },
});
