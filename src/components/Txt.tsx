import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { color, type } from '../theme/tokens';

type Variant = keyof typeof type;

type Props = TextProps & {
  variant?: Variant;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export function Txt({ variant = 'regular14', color: c = color.text, style, ...rest }: Props) {
  return <Text {...rest} style={[type[variant], { color: c }, style]} />;
}
