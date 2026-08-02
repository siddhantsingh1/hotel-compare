import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { color, space } from '../theme/tokens';
import { Button } from './Button';
import { Txt } from './Txt';

export function NoHotelsArt() {
  return (
    <Svg width={150} height={120} viewBox="0 0 150 120" fill="none">
      <Circle cx={75} cy={60} r={52} fill={color.primaryTint} />
      <Circle cx={68} cy={54} r={24} stroke={color.primary} strokeWidth={3} />
      <Path d="M85 71l15 15" stroke={color.primary} strokeWidth={3} strokeLinecap="round" />
      <Path d="M58 62v-9l10-7 10 7v9" stroke={color.primary} strokeWidth={2.4} strokeLinejoin="round" />
      <Path d="M62 62v-5h12v5" stroke={color.textMuted} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

export function NoFilterMatchArt() {
  return (
    <Svg width={150} height={120} viewBox="0 0 150 120" fill="none">
      <Circle cx={75} cy={60} r={52} fill={color.primaryTint} />
      <Path
        d="M50 40h50l-19 22v22l-12 7V62L50 40z"
        stroke={color.primary}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <Circle cx={98} cy={84} r={15} fill={color.surface} stroke={color.textMuted} strokeWidth={2.4} />
      <Path d="M93 84h10" stroke={color.textMuted} strokeWidth={2.4} strokeLinecap="round" />
    </Svg>
  );
}

export function NoReviewsArt() {
  return (
    <Svg width={110} height={80} viewBox="0 0 110 80" fill="none">
      <Circle cx={55} cy={40} r={34} fill={color.primaryTint} />
      <Path
        d="M35 27h40v24H57l-10 8v-8H35V27z"
        stroke={color.primary}
        strokeWidth={2.6}
        strokeLinejoin="round"
      />
      <Path d="M45 36h20M45 43h12" stroke={color.textMuted} strokeWidth={2.2} strokeLinecap="round" />
    </Svg>
  );
}

export function NoPackagesArt() {
  return (
    <Svg width={150} height={120} viewBox="0 0 150 120" fill="none">
      <Circle cx={75} cy={60} r={52} fill={color.primaryTint} />
      <Rect x={45} y={42} width={60} height={42} rx={6} stroke={color.primary} strokeWidth={3} />
      <Path d="M45 56h60" stroke={color.primary} strokeWidth={3} />
      <Path d="M75 42v-6a8 8 0 1116 0v6" stroke={color.textMuted} strokeWidth={2.4} strokeLinecap="round" />
      <Path d="M75 42v-6a8 8 0 10-16 0v6" stroke={color.textMuted} strokeWidth={2.4} strokeLinecap="round" />
      <Path d="M70 68h10" stroke={color.textMuted} strokeWidth={2.4} strokeLinecap="round" />
    </Svg>
  );
}

type Props = {
  art: React.ReactNode;
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ art, title, body, actionLabel, onAction }: Props) {
  return (
    <View style={styles.root}>
      {art}
      <Txt variant="bold20" style={styles.centered}>
        {title}
      </Txt>
      <Txt variant="regular14" color={color.textSecondary} style={[styles.centered, styles.body]}>
        {body}
      </Txt>
      {actionLabel ? (
        <Button label={actionLabel} onPress={onAction} style={{ marginTop: space.x4 }} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.x16,
    paddingHorizontal: space.x32,
    paddingTop: space.x32,
    paddingBottom: space.x80,
  },
  centered: {
    textAlign: 'center',
  },
  body: {
    lineHeight: 20,
  },
});
