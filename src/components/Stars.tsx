import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { StarIcon } from './Icon';

export function Stars({ count, size = 12, style }: { count: number; size?: number; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ flexDirection: 'row', gap: 1 }, style]}>
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} size={size} />
      ))}
    </View>
  );
}
