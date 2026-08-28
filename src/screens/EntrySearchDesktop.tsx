import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Button } from '../components/Button';
import { Calendar, monthOffset, pickDate } from '../components/Calendar';
import { Chip, Pill } from '../components/Chip';
import {
  DestinationResults,
  resultsHeading,
  useDestinationMatches,
} from '../components/DestinationResults';
import { FeatureCards } from '../components/FeatureCards';
import { GuestControls } from '../components/GuestControls';
import { ChevronDown, ChevronLeft, ChevronRight, SearchIcon } from '../components/Icon';
import { Photo } from '../components/Photo';
import { Anchor, measureAnchor, Popover } from '../components/Popover';
import { Txt } from '../components/Txt';
import { brandTile } from '../data/images';
import {
  CHAIN_DEALS,
  ENTRY_GIFT_CARDS,
  POPULAR_DESTINATIONS,
  RECENT_SEARCHES,
  TRIP_TYPES,
} from '../data/mock';
import { formatDay, nightsBetween, useBooking } from '../state/BookingContext';
import { DESKTOP_CONTENT_WIDTH } from '../theme/breakpoints';
import { color, fontFamily, radius, shadow, space, type } from '../theme/tokens';

const DEAL_CARD_WIDTH = 280;
const DESTINATION_POPOVER_WIDTH = 480;
const DATE_POPOVER_WIDTH = 640;
const GUEST_POPOVER_WIDTH = 380;

type Popper = 'destination' | 'dates' | 'guests' | null;

type Props = {
  onSearch: (destination?: string) => void;
};

export function EntrySearchDesktop({ onSearch }: Props) {
  const { search, setSearch, roomsLabel, guestsLabel } = useBooking();
  const { destination, checkIn, checkOut, tripType } = search;

  const dealsRef = useRef<ScrollView>(null);
  const dealsOffset = useRef(0);

  const destinationRef = useRef<View>(null);
  const checkInRef = useRef<View>(null);
  const checkOutRef = useRef<View>(null);
  const guestsRef = useRef<View>(null);
  const inputRef = useRef<TextInput>(null);

  const [popper, setPopper] = useState<Popper>(null);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  // Which field opened the calendar, so it can start on the relevant month.
  const [dateOffset, setDateOffset] = useState(0);
  const [query, setQuery] = useState('');
  const { trimmed, matches } = useDestinationMatches(query);
  const searching = popper === 'destination';

  const open = (ref: React.RefObject<View | null>, which: Exclude<Popper, null>, offset = 0) => {
    measureAnchor(ref, (next) => {
      setAnchor(next);
      setDateOffset(offset);
      setPopper(which);
    });
  };

  const close = () => {
    setPopper(null);
    inputRef.current?.blur();
  };

  const nights = nightsBetween(checkIn, checkOut);

  const scrollDeals = (direction: 1 | -1) => {
    const page = (DEAL_CARD_WIDTH + space.x16) * 2;
    const next = Math.max(0, dealsOffset.current + direction * page);
    dealsOffset.current = next;
    dealsRef.current?.scrollTo({ x: next, animated: true });
  };

  return (
    <View style={styles.root}>
    {/* The popovers sit outside the ScrollView: their backdrop then covers the
        page and holds the scroll still, so a panel can never drift off its
        trigger while it is open. */}
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
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
            <View ref={destinationRef} style={[styles.fieldWrap, styles.fieldDestination]}>
              <Pressable style={styles.field} onPress={() => inputRef.current?.focus()}>
                <SearchIcon size={20} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Txt variant="medium12" color={color.textSecondary}>
                    Destination
                  </Txt>
                  {/* Typing happens in the field itself — the popover only lists
                      results, so the desktop flow never hands off to a screen. */}
                  <TextInput
                    ref={inputRef}
                    value={searching ? query : destination}
                    onChangeText={setQuery}
                    onFocus={() => {
                      setQuery('');
                      open(destinationRef, 'destination');
                    }}
                    placeholder="Search hotel, city, or country"
                    placeholderTextColor={color.textMuted}
                    style={styles.fieldInput}
                  />
                </View>
              </Pressable>
            </View>

            <View ref={checkInRef} style={styles.fieldWrap}>
              <Pressable
                style={styles.field}
                onPress={() => open(checkInRef, 'dates', monthOffset(checkIn))}
              >
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Txt variant="medium12" color={color.textSecondary}>
                    Check-in
                  </Txt>
                  <Txt variant="medium16" style={{ marginTop: space.x2 }}>
                    {formatDay(checkIn)}
                  </Txt>
                </View>
              </Pressable>
            </View>

            <View ref={checkOutRef} style={styles.fieldWrap}>
              {/* Opens on the check-in's month: the pair of months on show then
                  covers the existing range and the nights just past it. */}
              <Pressable
                style={styles.field}
                onPress={() => open(checkOutRef, 'dates', monthOffset(checkIn))}
              >
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Txt variant="medium12" color={color.textSecondary}>
                    Check-out
                  </Txt>
                  <Txt variant="medium16" style={{ marginTop: space.x2 }}>
                    {formatDay(checkOut)}
                  </Txt>
                </View>
              </Pressable>
            </View>

            <View ref={guestsRef} style={[styles.fieldWrap, styles.fieldGuests]}>
              <Pressable style={styles.field} onPress={() => open(guestsRef, 'guests')}>
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
            </View>

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
                onPress={() => setSearch({ tripType: tripType === label ? null : label })}
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

      <Popover visible={popper === 'destination'} anchor={anchor} onClose={close} width={DESTINATION_POPOVER_WIDTH}>
        <Txt variant="medium12" color={color.textSecondary} style={styles.popHeading}>
          {resultsHeading(trimmed, matches.length)}
        </Txt>
        <ScrollView>
          <DestinationResults
            matches={matches}
            onSelect={(name) => {
              setSearch({ destination: name });
              setQuery('');
              close();
            }}
          />
          {trimmed.length > 0 && matches.length === 0 ? (
            <Txt variant="regular14" color={color.textSecondary} style={styles.popEmpty}>
              No matches. Try a city or hotel name.
            </Txt>
          ) : null}
        </ScrollView>
      </Popover>

      <Popover visible={popper === 'dates'} anchor={anchor} onClose={close} width={DATE_POPOVER_WIDTH}>
        <View style={styles.popBody}>
          <Calendar
            checkIn={checkIn}
            checkOut={checkOut}
            onPick={(key) => setSearch(pickDate(checkIn, checkOut, key))}
            count={2}
            offset={dateOffset}
            side
          />
        </View>
        <View style={styles.popFooter}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Txt variant="semibold14">
              {nights > 0
                ? `${nights} ${nights > 1 ? 'nights' : 'night'} selected`
                : 'Pick your check-in date'}
            </Txt>
            <Pressable onPress={() => setSearch({ checkIn: null, checkOut: null })}>
              <Txt variant="medium12" color={color.primary} style={{ marginTop: space.x2 }}>
                Reset
              </Txt>
            </Pressable>
          </View>
          <Button label="Apply" onPress={close} disabled={nights === 0} />
        </View>
      </Popover>

      <Popover
        visible={popper === 'guests'}
        anchor={anchor}
        onClose={close}
        width={GUEST_POPOVER_WIDTH}
        align="right"
      >
        <View style={styles.popBody}>
          <GuestControls
            counts={{ rooms: search.rooms, adults: search.adults, children: search.children }}
            onChange={(patch) => setSearch(patch)}
          />
          <Button label="Apply" onPress={close} style={{ marginTop: space.x16 }} />
        </View>
      </Popover>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
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
  fieldWrap: {
    flex: 1,
    minWidth: 0,
  },
  fieldInput: {
    marginTop: space.x2,
    padding: 0,
    color: color.text,
    fontFamily: fontFamily.medium,
    fontSize: type.medium16.fontSize,
    lineHeight: type.medium16.lineHeight,
    letterSpacing: type.medium16.letterSpacing,
    ...({ outlineStyle: 'none' } as object),
  },
  popHeading: {
    paddingTop: space.x16,
    paddingBottom: space.x8,
    paddingHorizontal: space.x16,
  },
  popEmpty: {
    padding: space.x24,
    textAlign: 'center',
  },
  popBody: {
    padding: space.x20,
  },
  popFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingHorizontal: space.x20,
    paddingVertical: space.x16,
    borderTopWidth: 1,
    borderTopColor: color.border,
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
