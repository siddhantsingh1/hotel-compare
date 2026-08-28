import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PLACES } from '../data/mock';
import { color, radius, space } from '../theme/tokens';
import { Txt } from './Txt';

/** Filters the place list the same way on every surface. */
export function useDestinationMatches(query: string) {
  const trimmed = query.trim().toLowerCase();
  const matches = useMemo(
    () => (trimmed ? PLACES.filter((p) => p.name.toLowerCase().includes(trimmed)) : PLACES.slice(0, 5)),
    [trimmed]
  );
  return { trimmed, matches };
}

export function resultsHeading(trimmed: string, count: number) {
  if (!trimmed) return 'POPULAR RIGHT NOW';
  return `${count} ${count === 1 ? 'RESULT' : 'RESULTS'}`;
}

type Props = {
  matches: typeof PLACES;
  onSelect: (name: string) => void;
};

/** The place rows, shared by the mobile search screen and the desktop popover. */
export function DestinationResults({ matches, onSelect }: Props) {
  return (
    <>
      {matches.map((place) => {
        const isHotel = place.meta.startsWith('Hotel');
        return (
          <Pressable key={place.name} style={styles.result} onPress={() => onSelect(place.name)}>
            <View
              style={[styles.initial, { backgroundColor: isHotel ? color.primaryTint : color.infoTint }]}
            >
              <Txt variant="semibold14" color={isHotel ? color.primary : color.info}>
                {place.name.charAt(0)}
              </Txt>
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Txt variant="medium16" numberOfLines={1}>
                {place.name}
              </Txt>
              <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
                {place.meta}
              </Txt>
            </View>
            {place.from ? (
              <Txt variant="medium12" color={color.success}>
                {place.from}
              </Txt>
            ) : null}
          </Pressable>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    borderBottomWidth: 1,
    borderBottomColor: color.page,
  },
  initial: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
