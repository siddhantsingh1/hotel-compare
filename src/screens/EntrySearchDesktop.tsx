import React, { useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../components/Button';
import { Chip, Pill } from '../components/Chip';
import { FeatureCards } from '../components/FeatureCards';
import { ChevronDown, ChevronLeft, ChevronRight, SearchIcon } from '../components/Icon';
import { Photo } from '../components/Photo';
import { Txt } from '../components/Txt';
import { brandTile } from '../data/images';
import {
  CHAIN_DEALS,
  ENTRY_GIFT_CARDS,
  POPULAR_DESTINATIONS,
  RECENT_SEARCHES,
  TRIP_TYPES,
} from '../data/mock';
import { formatDay } from '../state/BookingContext';
import { DESKTOP_CONTENT_WIDTH } from '../theme/breakpoints';
import { color, radius, shadow, space } from '../theme/tokens';

const DEAL_CARD_WIDTH = 280;

type Props = {
  destination: string;
  checkIn: string | null;
  checkOut: string | null;
  roomsLabel: string;
  guestsLabel: string;
  tripType: string | null;
  onPickTripType: (label: string | null) => void;
  onOpenDestination: () => void;
  onOpenDates: () => void;
  onOpenGuests: () => void;
  onSearch: (destination?: string) => void;
};

export function EntrySearchDesktop({
  destination,
  checkIn,
  checkOut,
  roomsLabel,
  guestsLabel,
  tripType,
  onPickTripType,
  onOpenDestination,
  onOpenDates,
  onOpenGuests,
  onSearch,
}: Props) {
  const dealsRef = useRef<ScrollView>(null);
  const dealsOffset = useRef(0);

  const scrollDeals = (direction: 1 | -1) => {
    const page = (DEAL_CARD_WIDTH + space.x16) * 2;
    const next = Math.max(0, dealsOffset.current + direction * page);
    dealsOffset.current = next;
    dealsRef.current?.scrollTo({ x: next, animated: true });
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.column}>
          <Txt variant="regular12" color={color.primaryTint} style={styles.eyebrow}>
            BUYHATKE · HOTEL COMPARE
          </Txt>
          <Txt variant="bold32" color={color.surface} style={styles.headline}>
            Every booking site. One search. The best price.
          </Txt>
          <Txt variant="regular18" color={color.primaryTint} style={styles.subhead}>
            We check MakeMyTrip, Booking.com, Agoda and more in one go, then show you what each
            one charges — and tell you when the price drops.
          </Txt>
        </View>
      </View>

      <View style={styles.searchBandWrap}>
        <View style={styles.column}>
          <View style={styles.searchBand}>
          <View style={styles.searchRow}>
            <Pressable style={[styles.field, styles.fieldDestination]} onPress={onOpenDestination}>
              <SearchIcon size={20} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Txt variant="medium12" color={color.textSecondary}>
                  Destination
                </Txt>
                <Txt
                  variant="medium16"
                  color={destination ? color.text : color.textMuted}
                  numberOfLines={1}
                  style={{ marginTop: space.x2 }}
                >
                  {destination || 'Search hotel, city, or country'}
                </Txt>
              </View>
            </Pressable>

            <Pressable style={styles.field} onPress={onOpenDates}>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Txt variant="medium12" color={color.textSecondary}>
                  Check-in
                </Txt>
                <Txt variant="medium16" style={{ marginTop: space.x2 }}>
                  {formatDay(checkIn)}
                </Txt>
              </View>
            </Pressable>

            <Pressable style={styles.field} onPress={onOpenDates}>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Txt variant="medium12" color={color.textSecondary}>
                  Check-out
                </Txt>
                <Txt variant="medium16" style={{ marginTop: space.x2 }}>
                  {formatDay(checkOut)}
                </Txt>
              </View>
            </Pressable>

            <Pressable style={[styles.field, styles.fieldGuests]} onPress={onOpenGuests}>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Txt variant="medium12" color={color.textSecondary}>
                  Rooms & guests
                </Txt>
                <Txt variant="medium16" numberOfLines={1} style={{ marginTop: space.x2 }}>
                  {roomsLabel} · {guestsLabel}
                </Txt>
              </View>
              <ChevronDown size={16} />
            </Pressable>

            <Button label="Search hotels" onPress={() => onSearch()} style={styles.searchCta} />
          </View>

          <View style={styles.tripRow}>
            <Txt variant="medium12" color={color.textSecondary}>
              Trip type
            </Txt>
            {TRIP_TYPES.map((label) => (
              <Chip
                key={label}
                label={label}
                active={tripType === label}
                onPress={() => onPickTripType(tripType === label ? null : label)}
              />
            ))}
          </View>
          </View>
        </View>
      </View>

      <View style={[styles.column, styles.section]}>
        <FeatureCards />
      </View>

      <View style={[styles.column, styles.section]}>
        <Txt variant="semibold20">Recent searches</Txt>
        <View style={styles.cardRow}>
          {RECENT_SEARCHES.map((recent) => (
            <Pressable
              key={recent.place}
              style={styles.recentCard}
              onPress={() => onSearch(recent.place)}
            >
              <Photo uri={recent.photo} style={styles.recentPhoto} />
              <View style={styles.recentBody}>
                <Txt variant="semibold16" numberOfLines={1}>
                  {recent.place}
                </Txt>
                <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x4 }}>
                  {recent.dates} · {recent.guests}
                </Txt>
                <View style={styles.recentFooter}>
                  <Txt variant="semibold16">From {recent.price}</Txt>
                  <ChevronRight size={14} color={color.primary} />
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.column, styles.section]}>
        <Txt variant="semibold20">Popular destinations</Txt>
        <View style={styles.grid}>
          {POPULAR_DESTINATIONS.map((destinationCard) => (
            <Pressable
              key={destinationCard.city}
              style={styles.gridItem}
              onPress={() => onSearch(destinationCard.city)}
            >
              <Photo uri={destinationCard.photo} style={styles.destinationPhoto} />
              <Txt variant="semibold16" style={{ marginTop: space.x12 }}>
                {destinationCard.city}
              </Txt>
              <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
                {destinationCard.hotels}
              </Txt>
              <Txt variant="semibold16" style={{ marginTop: space.x4 }}>
                From {destinationCard.startingPrice}
              </Txt>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.column, styles.section]}>
        <View style={styles.sectionHeader}>
          <Txt variant="semibold20">Deals on top hotel chains</Txt>
          <View style={styles.carouselControls}>
            <Pressable style={styles.carouselButton} onPress={() => scrollDeals(-1)}>
              <ChevronLeft size={18} color={color.primary} />
            </Pressable>
            <Pressable style={styles.carouselButton} onPress={() => scrollDeals(1)}>
              <View style={{ transform: [{ rotate: '180deg' }] }}>
                <ChevronLeft size={18} color={color.primary} />
              </View>
            </Pressable>
          </View>
        </View>
        <ScrollView
          ref={dealsRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dealsTrack}
        >
          {[...CHAIN_DEALS, ...CHAIN_DEALS].map((deal, index) => (
            <View key={`${deal.chain}-${index}`} style={styles.dealCard}>
              <Photo uri={brandTile} style={styles.dealLogo} />
              <Txt variant="semibold16" style={{ marginTop: space.x12 }}>
                {deal.chain}
              </Txt>
              <View style={styles.dealFooter}>
                <Txt variant="regular12" color={color.textSecondary}>
                  {deal.offer}
                </Txt>
                <Pill label={deal.savings} background={color.success} foreground={color.surface} />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.column, styles.section, styles.lastSection]}>
        <Txt variant="semibold20">Gift cards for select hotel chains</Txt>
        <View style={styles.grid}>
          {ENTRY_GIFT_CARDS.map((card) => (
            <View key={card.chain} style={styles.giftCard}>
              <Photo uri={brandTile} style={styles.giftPhoto} />
              <Txt variant="semibold16" style={{ marginTop: space.x12 }}>
                {card.chain}
              </Txt>
              <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x4 }}>
                <Txt variant="semibold14" color={color.success} style={styles.small}>
                  {card.discount}
                </Txt>{' '}
                off gift cards
              </Txt>
              <Button
                label="Buy now"
                variant="secondary"
                size="compact"
                style={{ marginTop: space.x16 }}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.page,
  },
  content: {
    paddingBottom: space.x64,
  },
  column: {
    width: '100%',
    maxWidth: DESKTOP_CONTENT_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: space.x32,
  },
  hero: {
    backgroundColor: color.primary,
    paddingTop: space.x64,
    paddingBottom: space.x80,
  },
  eyebrow: {
    letterSpacing: 1,
  },
  headline: {
    marginTop: space.x12,
    maxWidth: 760,
  },
  subhead: {
    marginTop: space.x16,
    maxWidth: 640,
    lineHeight: 26,
  },
  searchBandWrap: {
    marginTop: -space.x48,
  },
  searchBand: {
    // Floats over the hero: one white card holding the fields and trip filters.
    backgroundColor: color.surface,
    borderRadius: radius.sheet,
    borderWidth: 1,
    borderColor: color.border,
    padding: space.x12,
    ...shadow.cardActive,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: space.x12,
  },
  field: {
    flex: 1,
    minWidth: 0,
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
  fieldDestination: {
    flex: 2,
  },
  fieldGuests: {
    flex: 1.4,
  },
  searchCta: {
    paddingHorizontal: space.x32,
  },
  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    paddingTop: space.x12,
    paddingHorizontal: space.x4,
  },
  section: {
    paddingTop: space.x48,
    gap: space.x20,
  },
  lastSection: {
    paddingBottom: space.x24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  carouselControls: {
    flexDirection: 'row',
    gap: space.x8,
  },
  carouselButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: color.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    gap: space.x24,
  },
  recentCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadow.card,
  },
  recentPhoto: {
    width: '100%',
    height: 132,
  },
  recentBody: {
    padding: space.x16,
  },
  recentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: space.x12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.x24,
  },
  gridItem: {
    // Four across at 1200, wrapping gracefully on narrower desktops.
    flexGrow: 1,
    flexBasis: 240,
    maxWidth: 300,
  },
  destinationPhoto: {
    width: '100%',
    height: 168,
    borderRadius: radius.lg,
  },
  dealsTrack: {
    gap: space.x16,
    paddingRight: space.x16,
  },
  dealCard: {
    width: DEAL_CARD_WIDTH,
    backgroundColor: color.highlightTint,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.xl,
    padding: space.x20,
  },
  dealLogo: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
  },
  dealFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.x8,
    marginTop: space.x12,
  },
  giftCard: {
    flexGrow: 1,
    flexBasis: 320,
    maxWidth: 400,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.xl,
    padding: space.x20,
    ...shadow.card,
  },
  giftPhoto: {
    width: '100%',
    height: 120,
    borderRadius: radius.lg,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
});
