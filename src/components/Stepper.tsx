import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { color, radius, TOUCH_TARGET } from '../theme/tokens';
import { Txt } from './Txt';

type Props = {
  value: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
};

export function Stepper({ value, min, max, onChange }: Props) {
  const canDec = value > min;
  const canInc = value < max;

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        disabled={!canDec}
        onPress={() => onChange(Math.max(min, value - 1))}
      >
        <Txt variant="regular20" color={canDec ? color.primary : color.textMuted}>
          −
        </Txt>
      </Pressable>
      <Txt variant="semibold16" style={styles.value}>
        {value}
      </Txt>
      <Pressable
        style={styles.button}
        disabled={!canInc}
        onPress={() => onChange(Math.min(max, value + 1))}
      >
        <Txt variant="regular20" color={canInc ? color.primary : color.textMuted}>
          +
        </Txt>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 14,
    overflow: 'hidden',
  },
  button: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    minWidth: 24,
    textAlign: 'center',
  },
});
