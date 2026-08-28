import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../components/Button';
import { Chip, Pill } from '../components/Chip';
import { EmptyState, NoFilterMatchArt, NoHotelsArt } from '../components/EmptyState';
import { Header } from '../components/Header';
import {
  FilterIcon,
  GridIcon,
  HeartIcon,
  ListIcon,
  MapIcon,
  SortIcon,
} from '../components/Icon';
import { Anchor, measureAnchor, Popover } from '../components/Popover';
import { Photo } from '../components/Photo';
import { PriceCompareRow } from '../components/PriceCompareRow';
import { Stars } from '../components/Stars';
import { Txt } from '../components/Txt';
import { platformLogos } from '../data/images';
import { Hotel, QUICK_FILTERS, RESULTS_SUMMARY } from '../data/mock';
import { useBooking } from '../state/BookingContext';
import { FilterOptions } from './sheets/FilterSheet';
import { SortOptions } from './sheets/SortSheet';
import { DESKTOP_CONTENT_WIDTH } from '../theme/breakpoints';
import { color, radius, shadow, space } from '../theme/tokens';

type ViewMode = 'grid' | 'list';
type Popper = 'filter' | 'sort' | null;

type Props = {
  onOpenHotel: (hotel: Hotel) => void;
  onBack: () => void;
};

export function ResultsListDesktop({ onOpenHotel, onBack }: Props) {
  const {
    search,
    stayLabel,
    hotels,
    destinationHasResults,
    sort,
    appliedFilterCount,
    clearFilters,
  } = useBooking();
  const [view, setView] = useState<ViewMode>('grid');
  const [quickFilters, setQuickFilters] = useState<string[]>([]);
  const [popper, setPopper] = useState<Popper>(null);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const filterRef = useRef<View>(null);
  const sortRef = useRef<View>(null);

  const open = (ref: React.RefObject<View | null>, which: Exclude<Popper, null>) => {
    measureAnchor(ref, (next) => {
      setAnchor(next);
      setPopper(which);
    });
  };
  const close = () => setPopper(null);

  return (
    <View style={styles.root}>
      <View style={styles.headerBand}>
        <Header
          title={search.destination.split(',')[0] || 'Goa'}
          subtitle={stayLabel}
          onBack={onBack}
          style={styles.headerInner}
          right={
            destinationHasResults ? (
              <View style={styles.headerRight}>
                <View style={styles.viewToggle}>
                  <Pressable
                    onPress={() => setView('grid')}
                    style={[styles.viewToggleBtn, view === 'grid' && styles.viewToggleBtnActive]}
                  >
                    <GridIcon size={16} color={view === 'grid' ? color.primary : color.textSecondary} />
                  </Pressable>
                  <Pressable
                    onPress={() => setView('list')}
                    style={[styles.viewToggleBtn, view === 'list' && styles.viewToggleBtnActive]}
                  >
                    <ListIcon size={16} color={view === 'list' ? color.primary : color.textSecondary} />
                  </Pressable>
                </View>
                <Pressable style={styles.mapButton}>
                  <MapIcon size={20} />
                </Pressable>
              </View>
            ) : (
              <Button label="Edit" variant="secondary" size="compact" onPress={onBack} style={styles.editButton} />
            )
          }
        />
      </View>

      {destinationHasResults ? (
        <>
          <View style={styles.filterBand}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.desktopColumn, styles.filterBarContent]}
            >
              <View ref={filterRef}>
                <Chip
                  label={appliedFilterCount > 0 ? `Filter · ${appliedFilterCount}` : 'Filter'}
                  active
                  leading={<FilterIcon size={14} />}
                  onPress={() => open(filterRef, 'filter')}
                />
              </View>
              <View ref={sortRef}>
                <Chip
                  label={`Sort: ${sort}`}
                  active
                  leading={<SortIcon size={14} />}
                  onPress={() => open(sortRef, 'sort')}
                />
              </View>
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
          </View>

          {hotels.length > 0 ? (
            <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
              <View style={styles.desktopColumn}>
                <Txt variant="regular14" color={color.textSecondary} style={styles.summary}>
                  <Txt variant="semibold14">{RESULTS_SUMMARY.resultsCount} hotels</Txt> found from{' '}
                  <Txt variant="semibold14">{RESULTS_SUMMARY.siteCount} sites</Txt>
                </Txt>

                {view === 'grid' ? (
                  <View style={styles.grid}>
                    {hotels.map((hotel) => (
                      <GridCard key={hotel.id} hotel={hotel} onOpen={() => onOpenHotel(hotel)} />
                    ))}
                  </View>
                ) : (
                  <View style={styles.listRows}>
                    {hotels.map((hotel) => (
                      <ListRow key={hotel.id} hotel={hotel} onOpen={() => onOpenHotel(hotel)} />
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.emptyOuter}>
              <View style={styles.emptyInner}>
                <EmptyState
                  art={<NoFilterMatchArt />}
                  title="No hotels match your filters"
                  body="Try removing one or two filters to see more stays."
                  actionLabel="Clear filters"
                  onAction={clearFilters}
                />
              </View>
            </View>
          )}
        </>
      ) : (
        <View style={styles.emptyOuter}>
          <View style={styles.emptyInner}>
            <EmptyState
              art={<NoHotelsArt />}
              title="No hotels found"
              body="We couldn't find stays for this search. Try a different location or change your dates from the search bar above."
            />
          </View>
        </View>
      )}

      <Popover visible={popper === 'filter'} anchor={anchor} onClose={close} width={640}>
        <View style={styles.popHeader}>
          <Txt variant="semibold16">Filters</Txt>
          <Txt variant="medium12" color={color.textSecondary}>
            {appliedFilterCount} applied
          </Txt>
        </View>
        <View style={{ height: 420 }}>
          <FilterOptions />
        </View>
        <View style={styles.popFooter}>
          <Button label="Reset all" variant="secondary" onPress={clearFilters} style={{ flex: 1 }} />
          <Button label="Apply filters" onPress={close} style={{ flex: 1 }} />
        </View>
      </Popover>

      <Popover visible={popper === 'sort'} anchor={anchor} onClose={close} width={280}>
        <View style={styles.popHeader}>
          <Txt variant="semibold16">Sort by</Txt>
        </View>
        <SortOptions />
        <View style={styles.popFooter}>
          <Button label="Apply" onPress={close} style={{ flex: 1 }} />
        </View>
      </Popover>
    </View>
  );
}

function GridCard({ hotel, onOpen }: { hotel: Hotel; onOpen: () => void }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.gridCard}>
      <Pressable onPress={onOpen}>
        <Photo uri={hotel.photos[photoIndex]} style={styles.gridHero}>
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

        <View style={styles.gridInfo}>
          <Txt variant="semibold16" numberOfLines={1}>
            {hotel.name}
          </Txt>
          <View style={styles.metaRow}>
            <Stars count={hotel.starCount} />
            <Txt variant="regular12" color={color.border}>
              ·
            </Txt>
            <View style={styles.ratingBadge}>
              <Txt variant="semibold14" color={color.primary} style={styles.smallText}>
                {hotel.guestRating}
              </Txt>
            </View>
            <Txt variant="regular12" color={color.textSecondary}>
              ({hotel.reviewCount})
            </Txt>
          </View>
          <Txt variant="regular12" color={color.textSecondary}>
            {hotel.location} · {hotel.distance}
          </Txt>
        </View>
      </Pressable>

      <View style={styles.gridPriceBlock}>
        <View style={styles.platformRow}>
          <Photo uri={platformLogos[hotel.bestPrice.platform]} style={styles.platformLogo} />
          <Txt variant="semibold14" color={color.textSecondary} style={styles.smallText} numberOfLines={1}>
            {hotel.bestPrice.platform} ·{' '}
            <Txt variant="semibold14" color={color.success} style={styles.smallText}>
              Best price
            </Txt>
          </Txt>
        </View>
        <View style={styles.priceRow}>
          <Txt variant="bold24">{hotel.bestPrice.total}</Txt>
          <Txt variant="regular12" color={color.textMuted} style={styles.strikethrough}>
            {hotel.bestPrice.compareAt}
          </Txt>
        </View>
        <Txt variant="regular12" color={color.textSecondary}>
          {hotel.bestPrice.taxes}
        </Txt>
        <Button label="View and book" size="compact" onPress={onOpen} style={{ marginTop: space.x8 }} />
        <Pressable onPress={onOpen} style={styles.packagesLink}>
          <Txt variant="medium12" color={color.primary} numberOfLines={1}>
            {hotel.otherPriceCount} more prices · {hotel.otherSiteCount} sites
          </Txt>
        </Pressable>
      </View>
    </View>
  );
}

function ListRow({ hotel, onOpen }: { hotel: Hotel; onOpen: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <Pressable style={styles.listRow} onPress={onOpen}>
      <Photo uri={hotel.photos[0]} style={styles.listPhoto}>
        <View style={styles.heroBadge}>
          <Pill label={hotel.badge} background={color.success} foreground={color.surface} />
        </View>
        <Pressable style={styles.heart} onPress={() => setSaved((prev) => !prev)}>
          <HeartIcon size={16} filled={saved} color={saved ? color.error : color.textSecondary} />
        </Pressable>
      </Photo>

      <View style={styles.listBody}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Txt variant="semibold18">{hotel.name}</Txt>
          <View style={styles.metaRow}>
            <Stars count={hotel.starCount} />
            <Txt variant="regular12" color={color.border}>
              ·
            </Txt>
            <View style={styles.ratingBadge}>
              <Txt variant="semibold14" color={color.primary} style={styles.smallText}>
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

          <View style={styles.listAltPrices}>
            <PriceCompareRow
              platform={hotel.bestPrice.platform}
              price={hotel.bestPrice.total}
              best
              showChevron={false}
              onPress={onOpen}
            />
            {hotel.altPrices.map((alt) => (
              <PriceCompareRow
                key={alt.platform}
                platform={alt.platform}
                price={alt.price}
                higherBy={alt.higherBy}
                showChevron={false}
                onPress={onOpen}
              />
            ))}
          </View>
        </View>

        <View style={styles.listPriceBlock}>
          <View style={styles.platformRow}>
            <Photo uri={platformLogos[hotel.bestPrice.platform]} style={styles.platformLogo} />
            <Txt variant="semibold14" color={color.textSecondary} style={styles.smallText}>
              {hotel.bestPrice.platform} ·{' '}
              <Txt variant="semibold14" color={color.success} style={styles.smallText}>
                Best price
              </Txt>
            </Txt>
          </View>
          <View style={[styles.priceRow, { justifyContent: 'flex-end' }]}>
            <Txt variant="regular12" color={color.textMuted} style={styles.strikethrough}>
              {hotel.bestPrice.compareAt}
            </Txt>
            <Txt variant="bold24">{hotel.bestPrice.total}</Txt>
          </View>
          <Pill
            label={`${hotel.bestPrice.discount} off`}
            background={color.success}
            foreground={color.surface}
            style={{ marginTop: space.x4 }}
          />
          <Button label="View and book" size="compact" onPress={onOpen} style={{ marginTop: space.x12 }} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.page,
  },
  desktopColumn: {
    width: '100%',
    maxWidth: DESKTOP_CONTENT_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: space.x32,
  },
  headerBand: {
    backgroundColor: color.surface,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  headerInner: {
    width: '100%',
    maxWidth: DESKTOP_CONTENT_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: space.x32,
    borderBottomWidth: 0,
  },
  editButton: {
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
  },
  viewToggle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    padding: 3,
    gap: 2,
  },
  viewToggleBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewToggleBtnActive: {
    backgroundColor: color.primaryTint,
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
  filterBand: {
    backgroundColor: color.surface,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  filterBarContent: {
    paddingVertical: space.x12,
    gap: space.x8,
    flexDirection: 'row',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: space.x24,
  },
  summary: {
    marginBottom: space.x16,
  },
  emptyOuter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyInner: {
    width: '100%',
    maxWidth: 480,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.x24,
    alignItems: 'flex-start',
  },
  gridCard: {
    flexGrow: 1,
    flexBasis: 350,
    maxWidth: 480,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadow.card,
  },
  gridHero: {
    width: '100%',
    height: 200,
  },
  gridInfo: {
    padding: space.x16,
    gap: space.x8,
  },
  gridPriceBlock: {
    borderTopWidth: 1,
    borderTopColor: color.border,
    padding: space.x16,
    gap: space.x4,
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
  },
  ratingBadge: {
    backgroundColor: color.primaryTint,
    borderRadius: radius.sm,
    paddingVertical: space.x4,
    paddingHorizontal: space.x8,
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
  smallText: {
    fontSize: 12,
    lineHeight: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: space.x8,
    marginTop: space.x4,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  packagesLink: {
    alignItems: 'center',
    paddingTop: space.x4,
    minHeight: 24,
  },
  listRows: {
    gap: space.x16,
  },
  listRow: {
    flexDirection: 'row',
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadow.card,
  },
  listPhoto: {
    width: 260,
  },
  listBody: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: space.x16,
    gap: space.x20,
  },
  listPriceBlock: {
    width: 240,
    alignItems: 'flex-end',
  },
  listAltPrices: {
    marginTop: space.x12,
    borderTopWidth: 1,
    borderTopColor: color.border,
    paddingTop: space.x4,
  },
  popHeader: {
    paddingTop: space.x16,
    paddingHorizontal: space.x20,
    paddingBottom: space.x4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.x8,
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
});
