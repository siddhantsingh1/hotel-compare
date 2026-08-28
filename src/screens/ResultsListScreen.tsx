import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../App';
import { Button } from '../components/Button';
import { Chip, Pill } from '../components/Chip';
import {
  EmptyState,
  NoFilterMatchArt,
  NoHotelsArt,
} from '../components/EmptyState';
import { ArrowUpIcon, ChevronRight, FilterIcon, HeartIcon, MapIcon, SortIcon } from '../components/Icon';
import { Header } from '../components/Header';
import { Photo } from '../components/Photo';
import { Stars } from '../components/Stars';
import { Txt } from '../components/Txt';
import { platformLogos } from '../data/images';
import { Hotel, QUICK_FILTERS, RESULTS_SUMMARY } from '../data/mock';
import { useBooking } from '../state/BookingContext';
import { color, radius, shadow, space } from '../theme/tokens';
import { FilterSheet } from './sheets/FilterSheet';
import { SortSheet } from './sheets/SortSheet';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

export function ResultsListScreen({ navigation }: Props) {
  const {
    search,
    stayLabel,
    hotels,
    destinationHasResults,
    sort,
    appliedFilterCount,
    clearFilters,
    setSelection,
  } = useBooking();
  const [sheet, setSheet] = useState<'filter' | 'sort' | null>(null);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);

  const openHotel = (hotel: Hotel) => {
    setSelection({ hotelId: hotel.id, roomIndex: 0, packageIndex: 0 });
    navigation.navigate('HotelDetail');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <Header
        title={search.destination.split(',')[0] || 'Goa'}
        subtitle={stayLabel}
        onBack={() => navigation.goBack()}
        right={
          destinationHasResults ? (
            <Pressable style={styles.mapButton}>
              <MapIcon size={20} />
            </Pressable>
          ) : (
            <Button
              label="Edit"
              variant="secondary"
              size="compact"
              onPress={() => navigation.goBack()}
              style={styles.editButton}
            />
          )
        }
      />

      {destinationHasResults ? (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterBar}
            contentContainerStyle={styles.filterBarContent}
          >
            <Chip
              label={appliedFilterCount > 0 ? `Filter · ${appliedFilterCount}` : 'Filter'}
              active
              leading={<FilterIcon size={14} />}
              onPress={() => setSheet('filter')}
            />
            <Chip
              label={`Sort: ${sort}`}
              active
              leading={<SortIcon size={14} />}
              onPress={() => setSheet('sort')}
            />
            {QUICK_FILTERS.map((label) => (
              <Chip
                key={label}
                label={label}
                active={quickFilters.includes(label)}
                onPress={() =>
                  setQuickFilters((prev) =>
                    prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
                  )
                }
              />
            ))}
          </ScrollView>

          {hotels.length > 0 ? (
            <ScrollView style={styles.list}>
              <View style={styles.summary}>
                <Txt variant="regular14" color={color.textSecondary}>
                  <Txt variant="semibold14">{RESULTS_SUMMARY.resultsCount} hotels</Txt> found from{' '}
                  <Txt variant="semibold14">{RESULTS_SUMMARY.siteCount} sites</Txt>
                </Txt>
              </View>

              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} onOpen={() => openHotel(hotel)} />
              ))}
            </ScrollView>
          ) : (
            <EmptyState
              art={<NoFilterMatchArt />}
              title="No hotels match your filters"
              body="Try removing one or two filters to see more stays."
              actionLabel="Clear filters"
              onAction={clearFilters}
            />
          )}
        </>
      ) : (
        <EmptyState
          art={<NoHotelsArt />}
          title="No hotels found"
          body="We couldn't find stays for this search. Try a different location or change your dates from the search bar above."
        />
      )}

      <FilterSheet visible={sheet === 'filter'} onClose={() => setSheet(null)} />
      <SortSheet visible={sheet === 'sort'} onClose={() => setSheet(null)} />
    </SafeAreaView>
  );
}

function HotelCard({ hotel, onOpen }: { hotel: Hotel; onOpen: () => void }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.card}>
      <Pressable onPress={onOpen}>
        <Photo uri={hotel.photos[photoIndex]} style={styles.hero}>
          <View style={styles.heroBadge}>
            <Pill label={hotel.badge} background={color.success} foreground={color.surface} />
          </View>
          <Pressable style={styles.heart} onPress={() => setSaved((prev) => !prev)}>
            <HeartIcon size={16} filled={saved} color={saved ? color.error : color.textSecondary} />
          </Pressable>
          <View style={styles.dots}>
            {hotel.photos.map((photo, index) => (
              <Pressable
                key={photo}
                onPress={() => setPhotoIndex(index)}
                hitSlop={space.x8}
                style={[
                  styles.dot,
                  { backgroundColor: index === photoIndex ? color.surface : 'rgba(255,255,255,0.5)' },
                ]}
              />
            ))}
          </View>
        </Photo>

        <View style={{ marginTop: space.x12 }}>
          <Txt variant="semibold18">{hotel.name}</Txt>
          <View style={styles.metaRow}>
            <Stars count={hotel.starCount} />
            <Txt variant="regular12" color={color.border}>
              ·
            </Txt>
            <View style={styles.ratingBadge}>
              <Txt variant="semibold14" color={color.primary} style={styles.ratingText}>
                {hotel.guestRating}
              </Txt>
            </View>
            <Txt variant="regular12" color={color.textSecondary}>
              ({hotel.reviewCount} reviews)
            </Txt>
          </View>
          <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x8 }}>
            {hotel.location} · {hotel.distance}
          </Txt>
        </View>
      </Pressable>

      <View style={styles.priceCard}>
        <View style={styles.platformRow}>
          <Photo uri={platformLogos[hotel.bestPrice.platform]} style={styles.platformLogo} />
          <Txt variant="semibold14" color={color.textSecondary} style={styles.platformText}>
            {hotel.bestPrice.platform} · <Txt variant="semibold14" color={color.success} style={styles.platformText}>Best price</Txt>
          </Txt>
        </View>

        <View style={styles.priceRow}>
          <Txt variant="bold24">{hotel.bestPrice.total}</Txt>
          <Txt variant="regular12" color={color.textMuted} style={styles.strikethrough}>
            {hotel.bestPrice.compareAt}
          </Txt>
          <Pill
            label={`${hotel.bestPrice.discount} off`}
            background={color.success}
            foreground={color.surface}
          />
        </View>
        <Txt variant="regular12" color={color.textSecondary}>
          {hotel.bestPrice.taxes}
        </Txt>

        <Txt variant="medium14" style={{ marginTop: space.x4 }}>
          {hotel.bestPrice.roomName}
        </Txt>
        <View style={styles.highlights}>
          {hotel.bestPrice.highlights.map((highlight) => (
            <Pill
              key={highlight}
              label={highlight}
              background={color.successTint}
              foreground={color.success}
            />
          ))}
        </View>

        <Button
          label="View and book"
          size="compact"
          onPress={onOpen}
          style={{ marginTop: space.x8 }}
        />
        <Pressable onPress={onOpen} style={styles.packagesLink}>
          <Txt variant="medium12" color={color.primary}>
            View prices from other website · {hotel.otherPriceCount} available
          </Txt>
        </Pressable>
      </View>

      <View>
        {hotel.altPrices.map((alt) => (
          <Pressable key={alt.platform} style={styles.altRow} onPress={onOpen}>
            <Photo uri={platformLogos[alt.platform]} style={styles.platformLogo} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Txt variant="regular14" color={color.textSecondary}>
                {alt.platform}
              </Txt>
              <View style={styles.altPriceRow}>
                <Txt variant="semibold16">{alt.price}</Txt>
                <View style={styles.deltaRow}>
                  <ArrowUpIcon size={10} />
                  <Txt variant="regular12" color={color.error}>
                    {alt.higherBy} higher
                  </Txt>
                </View>
              </View>
            </View>
            <ChevronRight size={14} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.surface,
  },
  editButton: {
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  mapButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    backgroundColor: color.page,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBar: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
    backgroundColor: color.surface,
  },
  filterBarContent: {
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    gap: space.x8,
  },
  list: {
    flex: 1,
    backgroundColor: color.page,
  },
  summary: {
    padding: space.x16,
    backgroundColor: color.surface,
  },
  card: {
    backgroundColor: color.surface,
    borderBottomWidth: space.x8,
    borderBottomColor: color.page,
    padding: space.x16,
    gap: space.x12,
  },
  hero: {
    width: '100%',
    height: 180,
    borderRadius: radius.lg,
  },
  heroBadge: {
    position: 'absolute',
    top: space.x12,
    left: space.x12,
  },
  heart: {
    position: 'absolute',
    top: space.x12,
    right: space.x12,
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: space.x4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: radius.pill,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: space.x8,
    marginTop: space.x8,
  },
  ratingBadge: {
    backgroundColor: color.primaryTint,
    borderRadius: radius.sm,
    paddingVertical: space.x4,
    paddingHorizontal: space.x8,
  },
  ratingText: {
    fontSize: 12,
    lineHeight: 16,
  },
  priceCard: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    padding: space.x16,
    gap: space.x8,
    backgroundColor: color.surface,
    ...shadow.card,
  },
  platformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
  },
  platformLogo: {
    width: 20,
    height: 20,
    borderRadius: radius.sm,
  },
  platformText: {
    fontSize: 12,
    lineHeight: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: space.x8,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  highlights: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.x8,
  },
  packagesLink: {
    alignItems: 'center',
    paddingTop: space.x4,
    minHeight: 24,
  },
  altRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: space.x12,
    paddingHorizontal: space.x4,
    borderTopWidth: 1,
    borderTopColor: color.border,
  },
  altPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    marginTop: space.x2,
  },
  deltaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x4,
  },
});
