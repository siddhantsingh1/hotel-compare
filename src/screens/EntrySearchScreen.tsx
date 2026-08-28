import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../App';
import { Button } from '../components/Button';
import { Chip, Pill } from '../components/Chip';
import { ChevronDown, ChevronRight, SearchIcon } from '../components/Icon';
import { Photo } from '../components/Photo';
import { Txt } from '../components/Txt';
import {
  CHAIN_DEALS,
  ENTRY_GIFT_CARDS,
  POPULAR_DESTINATIONS,
  RECENT_SEARCHES,
  TRIP_TYPES,
} from '../data/mock';
import { brandTile } from '../data/images';
import { formatDay, useBooking } from '../state/BookingContext';
import { useIsDesktop } from '../theme/breakpoints';
import { color, radius, space } from '../theme/tokens';
import { DestinationSearchScreen } from './DestinationSearchScreen';
import { EntrySearchDesktop } from './EntrySearchDesktop';
import { DateSheet } from './sheets/DateSheet';
import { GuestsSheet } from './sheets/GuestsSheet';

type Props = NativeStackScreenProps<RootStackParamList, 'EntrySearch'>;

export function EntrySearchScreen({ navigation }: Props) {
  const { search, setSearch, commitSearch, roomsLabel, guestsLabel } = useBooking();
  const [overlay, setOverlay] = useState<'search' | 'dates' | 'guests' | null>(null);
  const isDesktop = useIsDesktop();

  const startSearch = (destination?: string) => {
    commitSearch(destination);
    navigation.navigate('Results');
  };

  return (
    <View style={styles.root}>
      {isDesktop ? (
        <EntrySearchDesktop onSearch={startSearch} />
      ) : (
        <>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea} />

      <ScrollView style={styles.scroll}>
        <View style={styles.hero}>
          <Txt variant="regular12" color={color.primaryTint} style={styles.eyebrow}>
            BUYHATKE · HOTEL COMPARE
          </Txt>
          <Txt variant="bold20" color={color.surface}>
            Compare & Book Hotels at Best Price
          </Txt>
        </View>

        <View style={styles.searchCard}>
          <View style={styles.fieldGroup}>
            <Txt variant="medium12" color={color.textSecondary}>
              Destination
            </Txt>
            <Pressable style={styles.field} onPress={() => setOverlay('search')}>
              <SearchIcon size={20} />
              <Txt
                variant="regular16"
                color={search.destination ? color.text : color.textMuted}
                style={{ flex: 1 }}
                numberOfLines={1}
              >
                {search.destination || 'Search hotel, city, or country'}
              </Txt>
            </Pressable>
          </View>

          <View style={styles.fieldGroup}>
            <Txt variant="medium12" color={color.textSecondary}>
              Dates
            </Txt>
            <View style={styles.splitField}>
              <Pressable style={[styles.splitHalf, styles.splitDivider]} onPress={() => setOverlay('dates')}>
                <Txt variant="regular12" color={color.textMuted}>
                  Check-in
                </Txt>
                <Txt variant="medium16" style={{ marginTop: space.x2 }}>
                  {formatDay(search.checkIn)}
                </Txt>
              </Pressable>
              <Pressable style={styles.splitHalf} onPress={() => setOverlay('dates')}>
                <Txt variant="regular12" color={color.textMuted}>
                  Check-out
                </Txt>
                <Txt variant="medium16" style={{ marginTop: space.x2 }}>
                  {formatDay(search.checkOut)}
                </Txt>
              </Pressable>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Txt variant="medium12" color={color.textSecondary}>
              Rooms & guests
            </Txt>
            <Pressable style={[styles.field, styles.rowBetween]} onPress={() => setOverlay('guests')}>
              <View>
                <Txt variant="medium16">{roomsLabel}</Txt>
                <Txt variant="regular14" color={color.textSecondary} style={{ marginTop: space.x2 }}>
                  {guestsLabel}
                </Txt>
              </View>
              <ChevronDown size={16} />
            </Pressable>
          </View>

          <View style={styles.fieldGroup}>
            <Txt variant="medium12" color={color.textSecondary}>
              Trip type <Txt variant="regular12" color={color.textMuted}>(optional)</Txt>
            </Txt>
            <View style={styles.chipRow}>
              {TRIP_TYPES.map((label) => (
                <Chip
                  key={label}
                  label={label}
                  active={search.tripType === label}
                  onPress={() =>
                    setSearch({ tripType: search.tripType === label ? null : label })
                  }
                />
              ))}
            </View>
          </View>

          <Button label="Search hotels" onPress={() => startSearch()} style={{ marginTop: space.x4 }} />
        </View>

        <View style={styles.section}>
          <Txt variant="semibold16">Recent searches</Txt>
          <View style={{ gap: space.x12 }}>
            {RECENT_SEARCHES.map((recent) => (
              <Pressable
                key={recent.place}
                style={styles.recentRow}
                onPress={() => startSearch(recent.place)}
              >
                <Photo uri={recent.photo} style={styles.recentPhoto} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Txt variant="medium14">{recent.place}</Txt>
                  <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
                    {recent.dates} · {recent.guests}
                  </Txt>
                  <Txt variant="semibold14" style={{ marginTop: space.x4 }}>
                    From {recent.price}
                  </Txt>
                </View>
                <View style={styles.recentChevron}>
                  <ChevronRight size={14} color={color.primary} />
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.sectionFlush}>
          <Txt variant="semibold16" style={styles.sectionTitleInset}>
            Popular destinations
          </Txt>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hScroll}
          >
            {POPULAR_DESTINATIONS.map((destination) => (
              <Pressable
                key={destination.city}
                style={styles.destinationCard}
                onPress={() => startSearch(destination.city)}
              >
                <Photo uri={destination.photo} style={styles.destinationPhoto} />
                <Txt variant="semibold14" style={{ marginTop: space.x8 }}>
                  {destination.city}
                </Txt>
                <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
                  {destination.hotels}
                </Txt>
                <Txt variant="semibold14" style={{ marginTop: space.x4 }}>
                  From {destination.startingPrice}
                </Txt>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionFlush}>
          <Txt variant="semibold16" style={styles.sectionTitleInset}>
            Deals on top hotel chains
          </Txt>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hScroll}
          >
            {CHAIN_DEALS.map((deal) => (
              <View key={deal.chain} style={styles.dealCard}>
                <Txt variant="semibold16">{deal.chain}</Txt>
                <View style={styles.rowBetween}>
                  <Txt variant="regular12" color={color.textSecondary}>
                    {deal.offer}
                  </Txt>
                  <Pill label={deal.savings} background={color.success} foreground={color.surface} />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <Txt variant="semibold16">Gift cards for select hotel chains</Txt>
          <View style={{ gap: space.x12 }}>
            {ENTRY_GIFT_CARDS.map((card) => (
              <View key={card.chain} style={styles.giftRow}>
                <Photo uri={brandTile} style={styles.giftLogo} />
                <View style={{ flex: 1 }}>
                  <Txt variant="medium14">{card.chain}</Txt>
                  <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
                    <Txt variant="medium12" color={color.success}>
                      {card.discount}
                    </Txt>{' '}
                    off gift cards
                  </Txt>
                </View>
                <Button label="Buy Now" variant="secondary" size="compact" />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
        </>
      )}

      {isDesktop ? null : (
        <>
      <DestinationSearchScreen
        visible={overlay === 'search'}
        onClose={() => setOverlay(null)}
        onSelect={(place) => {
          setSearch({ destination: place });
          setOverlay(null);
        }}
      />
      <DateSheet
        visible={overlay === 'dates'}
        onClose={() => setOverlay(null)}
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        onChange={(next) => setSearch(next)}
      />
      <GuestsSheet
        visible={overlay === 'guests'}
        onClose={() => setOverlay(null)}
        counts={{ rooms: search.rooms, adults: search.adults, children: search.children }}
        onChange={(patch) => setSearch(patch)}
      />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.page,
  },
  headerSafeArea: {
    backgroundColor: color.primary,
  },
  hero: {
    paddingTop: space.x20,
    paddingBottom: space.x24,
    paddingHorizontal: space.x16,
    backgroundColor: color.primary,
  },
  eyebrow: {
    marginBottom: 6,
  },
  scroll: {
    flex: 1,
    backgroundColor: color.page,
  },
  searchCard: {
    marginTop: -space.x12,
    padding: space.x16,
    gap: space.x12,
    backgroundColor: color.surface,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    borderBottomWidth: space.x8,
    borderBottomColor: color.page,
  },
  fieldGroup: {
    gap: space.x8,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    backgroundColor: color.surface,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  splitField: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: color.surface,
  },
  splitHalf: {
    flex: 1,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
  },
  splitDivider: {
    borderRightWidth: 1,
    borderRightColor: color.border,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.x8,
  },
  section: {
    paddingVertical: space.x20,
    paddingHorizontal: space.x16,
    gap: space.x12,
    backgroundColor: color.surface,
    borderBottomWidth: space.x8,
    borderBottomColor: color.page,
  },
  sectionFlush: {
    paddingVertical: space.x20,
    gap: space.x12,
    backgroundColor: color.surface,
    borderBottomWidth: space.x8,
    borderBottomColor: color.page,
  },
  sectionTitleInset: {
    paddingHorizontal: space.x16,
  },
  lastSection: {
    borderBottomWidth: 0,
    paddingBottom: space.x32,
  },
  hScroll: {
    paddingHorizontal: space.x16,
    gap: space.x12,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    padding: space.x12,
    backgroundColor: color.surface,
  },
  recentPhoto: {
    width: 79,
    height: 63,
    borderRadius: radius.md,
  },
  recentChevron: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: color.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  destinationCard: {
    width: 132,
  },
  destinationPhoto: {
    width: 132,
    height: 96,
    borderRadius: radius.lg,
  },
  dealCard: {
    width: 232,
    height: 104,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: color.highlightTint,
    padding: space.x16,
    justifyContent: 'space-between',
  },
  giftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    padding: space.x12,
    backgroundColor: color.surface,
  },
  giftLogo: {
    width: 67,
    height: 51,
    borderRadius: radius.md,
  },
});
