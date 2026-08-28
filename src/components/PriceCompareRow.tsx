import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { platformLogos } from '../data/images';
import { color, radius, space } from '../theme/tokens';
import { ArrowUpIcon, ChevronRight } from './Icon';
import { Photo } from './Photo';
import { Txt } from './Txt';

type Props = {
  platform: string;
  price: string;
  /** How much dearer than the best price, e.g. "5%". Omit on the best row. */
  higherBy?: string;
  /** Marks this as the cheapest quote. */
  best?: boolean;
  onPress?: () => void;
  showChevron?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * One booking site's quote. Used in the Results card's alternate prices and in
 * the desktop "compare across every site" preview, so the two cannot drift.
 */
export function PriceCompareRow({
  platform,
  price,
  higherBy,
  best = false,
  onPress,
  showChevron = true,
  style,
}: Props) {
  return (
    <Pressable style={[styles.row, style]} onPress={onPress} disabled={!onPress}>
      <Photo uri={platformLogos[platform]} style={styles.logo} />
      <View style={{ flex: 1, minWidth: 0 }}>
        <Txt variant="regular14" color={color.textSecondary} numberOfLines={1}>
          {platform}
        </Txt>
        <View style={styles.priceRow}>
          <Txt variant="semibold16">{price}</Txt>
          {best ? (
            <Txt variant="semibold14" color={color.success} style={styles.note}>
              Best price
            </Txt>
          ) : higherBy ? (
            <View style={styles.delta}>
              <ArrowUpIcon size={10} />
              <Txt variant="regular12" color={color.error}>
                {higherBy} higher
              </Txt>
            </View>
          ) : null}
        </View>
      </View>
      {showChevron ? <ChevronRight size={14} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: space.x12,
    paddingHorizontal: space.x4,
  },
  logo: {
    width: 20,
    height: 20,
    borderRadius: radius.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    marginTop: space.x2,
  },
  delta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x4,
  },
  note: {
    fontSize: 12,
    lineHeight: 16,
  },
});
