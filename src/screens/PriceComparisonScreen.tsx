import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../App';
import { Button } from '../components/Button';
import { Chip, Pill } from '../components/Chip';
import { EmptyState, NoPackagesArt } from '../components/EmptyState';
import { Header } from '../components/Header';
import {
  ArrowUpIcon,
  CheckIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CloseIcon,
  TileGlyph,
} from '../components/Icon';
import { Photo } from '../components/Photo';
import { Sheet } from '../components/Sheet';
import { Txt } from '../components/Txt';
import { platformLogos } from '../data/images';
import {
  ALL_SITE_PRICES,
  Package,
  PACKAGES,
  PACKAGE_FILTERS,
  PACKAGE_SUMMARY,
  ROOM_AMENITIES,
  ROOM_AMENITY_GROUPS,
  ROOM_FACTS,
  ROOM_PHOTO_LABELS,
  ROOM_PHOTO_URIS,
  ROOM_TABS,
} from '../data/mock';
import { useBooking } from '../state/BookingContext';
import { DESKTOP_CONTENT_WIDTH, useIsDesktop } from '../theme/breakpoints';
import { color, radius, shadow, space, TOUCH_TARGET } from '../theme/tokens';
import { EditStaySheet } from './HotelDetailScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'PriceComparison'>;
type SheetName = 'edit' | 'amenities' | 'prices' | null;

export function PriceComparisonScreen({ navigation }: Props) {
  const { selectedHotel, stayLabel, setSelection } = useBooking();
  const [sheet, setSheet] = useState<SheetName>(null);
  const [filters, setFilters] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isDesktop = useIsDesktop();

  const hotel = selectedHotel;
  if (!hotel) return null;

  const toggleFilter = (label: string) =>
    setFilters((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));

  const goToCheckout = (packageIndex: number) => {
    setSelection({ packageIndex });
    navigation.navigate('Checkout');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={isDesktop && styles.headerBand}>
        <Header
          title={hotel.name}
          subtitle={stayLabel}
          onBack={() => navigation.goBack()}
          style={isDesktop ? styles.headerInner : undefined}
          right={
            <Button
              label="Edit"
              variant="secondary"
              size="compact"
              onPress={() => setSheet('edit')}
              style={styles.editButton}
            />
          }
        />
      </View>

      <ByRoomLayout
        filters={filters}
        onToggleFilter={toggleFilter}
        onOpenAmenities={() => setSheet('amenities')}
        onOpenPrices={() => setSheet('prices')}
        onOpenPhoto={setLightboxIndex}
        onSelect={goToCheckout}
        onClearFilters={() => setFilters([])}
        desktop={isDesktop}
      />

      <EditStaySheet visible={sheet === 'edit'} onClose={() => setSheet(null)} />

      <Sheet visible={sheet === 'amenities'} onClose={() => setSheet(null)} title="Room amenities">
        <ScrollView contentContainerStyle={styles.sheetBody}>
          {ROOM_AMENITY_GROUPS.map((group) => (
            <View key={group.title} style={{ gap: space.x12 }}>
              <Txt variant="semibold14">{group.title}</Txt>
              <View style={styles.amenityGrid}>
                {group.items.map((item) => (
                  <View key={item} style={styles.amenityGridItem}>
                    <TileGlyph size={24} bg={color.primaryTint} mark={color.primary} />
                    <Txt variant="regular14" color={color.textSecondary} style={{ flex: 1 }}>
                      {item}
                    </Txt>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </Sheet>

      <Sheet
        visible={sheet === 'prices'}
        onClose={() => setSheet(null)}
        title="All site prices"
        subtitle={PACKAGES[0].name}
      >
        <ScrollView contentContainerStyle={styles.priceSheetBody}>
          {ALL_SITE_PRICES.map((site, index) => (
            <View key={site.platform} style={styles.priceSheetRow}>
              <Photo uri={platformLogos[site.platform]} style={styles.siteLogo} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Txt variant="medium14">{site.platform}</Txt>
                <View style={styles.priceSheetPrice}>
                  <Txt variant="semibold16">{site.price}</Txt>
                  {index === 0 ? (
                    <Txt variant="medium12" color={color.success}>
                      {site.note}
                    </Txt>
                  ) : (
                    <View style={styles.deltaRow}>
                      <ArrowUpIcon size={10} />
                      <Txt variant="medium12" color={color.error}>
                        {site.note}
                      </Txt>
                    </View>
                  )}
                </View>
                <Txt variant="regular12" color={color.textMuted} style={{ marginTop: space.x2 }}>
                  {site.taxes}
                </Txt>
              </View>
              <Button
                label="Select"
                variant={index === 0 ? 'primary' : 'outlinePill'}
                size="compact"
                onPress={() => {
                  setSheet(null);
                  goToCheckout(0);
                }}
              />
            </View>
          ))}
        </ScrollView>
      </Sheet>

      <Lightbox
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </SafeAreaView>
  );
}

function ByRoomLayout({
  filters,
  onToggleFilter,
  onOpenAmenities,
  onOpenPrices,
  onOpenPhoto,
  onSelect,
  onClearFilters,
  desktop = false,
}: {
  filters: string[];
  onToggleFilter: (label: string) => void;
  onOpenAmenities: () => void;
  onOpenPrices: () => void;
  onOpenPhoto: (index: number) => void;
  onSelect: (packageIndex: number) => void;
  onClearFilters: () => void;
  desktop?: boolean;
}) {
  const { selection, setSelection } = useBooking();
  const [expanded, setExpanded] = useState(0);

  const visiblePackages = PACKAGES.map((pkg, index) => ({ pkg, index })).filter(({ pkg }) =>
    filters.every((filter) => pkg.tags.includes(filter))
  );

  return (
    <ScrollView style={styles.scroll}>
      <View style={desktop ? styles.desktopColumn : undefined}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabStrip}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {ROOM_TABS.map((tab, index) => {
            const active = selection.roomIndex === index;
            return (
              <Pressable
                key={tab.name}
                style={[styles.roomTab, active ? styles.roomTabActive : styles.roomTabIdle]}
                onPress={() => setSelection({ roomIndex: index })}
              >
                <Txt variant="semibold14" color={active ? color.primary : color.textSecondary}>
                  {tab.name}
                </Txt>
                <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x4 }}>
                  from <Txt variant="semibold14" style={styles.smallText}>{tab.from}</Txt>
                </Txt>
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photoStrip}>
          {ROOM_PHOTO_URIS.map((uri, index) => (
            <Pressable key={ROOM_PHOTO_LABELS[index]} onPress={() => onOpenPhoto(index)}>
              <Photo uri={uri} style={styles.roomPhoto} />
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.factRow}>
          {ROOM_FACTS.map((fact) => (
            <View key={fact} style={styles.fact}>
              <TileGlyph size={20} />
              <Txt variant="regular12" color={color.textSecondary}>
                {fact}
              </Txt>
            </View>
          ))}
        </View>

        <View style={styles.amenitySection}>
          <View style={styles.rowBetween}>
            <Txt variant="semibold16">Room amenities</Txt>
            <Pressable onPress={onOpenAmenities} style={styles.textLink}>
              <Txt variant="semibold14" color={color.primary}>
                View all
              </Txt>
            </Pressable>
          </View>
          <View style={styles.amenityWrap}>
            {ROOM_AMENITIES.map((amenity) => (
              <View key={amenity} style={styles.fact}>
                <TileGlyph size={20} />
                <Txt variant="regular12" color={color.textSecondary}>
                  {amenity}
                </Txt>
              </View>
            ))}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipStrip}
          contentContainerStyle={styles.chipStripContent}
        >
          {PACKAGE_FILTERS.map((label) => (
            <Chip
              key={label}
              label={label}
              checkbox
              active={filters.includes(label)}
              onPress={() => onToggleFilter(label)}
            />
          ))}
        </ScrollView>

        {visiblePackages.length > 0 ? (
          <View style={styles.packageList}>
            <Txt variant="regular14" color={color.textSecondary}>
              <Txt variant="semibold14">{PACKAGE_SUMMARY.packageCount} packages</Txt> from{' '}
              <Txt variant="semibold14">{PACKAGE_SUMMARY.siteCount} sites</Txt>
            </Txt>
            <View style={desktop ? styles.packageGrid : undefined}>
              {visiblePackages.map(({ pkg, index }) => (
                <PackageCard
                  key={pkg.name}
                  pkg={pkg}
                  expanded={expanded === index}
                  onToggle={() => setExpanded((prev) => (prev === index ? -1 : index))}
                  onViewAll={onOpenPrices}
                  onSelect={() => onSelect(index)}
                  style={desktop ? styles.packageGridItem : undefined}
                />
              ))}
            </View>
          </View>
        ) : (
          <View style={[styles.emptyWrap, desktop && styles.emptyWrapDesktop]}>
            <View style={desktop ? styles.emptyInnerDesktop : undefined}>
              <EmptyState
                art={<NoPackagesArt />}
                title="No packages match your filters"
                body="Try removing a filter to see more packages for this room."
                actionLabel="Clear filters"
                onAction={onClearFilters}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export function PackageCard({
  pkg,
  expanded,
  onToggle,
  onViewAll,
  onSelect,
  style,
}: {
  pkg: Package;
  expanded: boolean;
  onToggle: () => void;
  onViewAll: () => void;
  onSelect: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onToggle}
      style={[
        styles.packageCard,
        {
          borderColor: expanded ? color.primary : color.border,
        },
        expanded ? shadow.cardActive : shadow.card,
        style,
      ]}
    >
      <View style={styles.packageHeader}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Txt variant="semibold16">{pkg.name}</Txt>
          <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x4 }}>
            {pkg.collapsedSummary}
          </Txt>
        </View>
        <View style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}>
          <ChevronDown size={16} />
        </View>
      </View>

      {expanded ? (
        <View style={{ gap: space.x12 }}>
          <View style={{ gap: space.x8 }}>
            {pkg.inclusions.map((inclusion) => (
              <View key={inclusion} style={styles.inclusionRow}>
                <CheckIcon size={12} color={color.success} />
                <Txt variant="regular12" color={color.textSecondary} style={styles.inclusionText}>
                  {inclusion}
                </Txt>
              </View>
            ))}
            <Pressable onPress={onViewAll} style={styles.textLink}>
              <Txt variant="semibold14" color={color.primary} style={styles.smallText}>
                View all inclusions
              </Txt>
            </Pressable>
          </View>

          <View style={styles.bestPriceRow}>
            <View style={{ flex: 1, minWidth: 0 }}>
              <View style={styles.platformRow}>
                <Photo uri={platformLogos[pkg.best.platform]} style={styles.siteLogoSmall} />
                <Txt variant="semibold14" color={color.textSecondary} style={styles.smallText}>
                  {pkg.best.platform} ·{' '}
                  <Txt variant="semibold14" color={color.success} style={styles.smallText}>
                    Best price
                  </Txt>
                </Txt>
              </View>
              <View style={styles.priceRow}>
                <Txt variant="bold24">{pkg.best.total}</Txt>
                <Txt variant="regular12" color={color.textMuted} style={styles.strikethrough}>
                  {pkg.best.compareAt}
                </Txt>
                <Pill
                  label={`${pkg.best.discount} off`}
                  background={color.success}
                  foreground={color.surface}
                />
              </View>
              <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x4 }}>
                {pkg.best.taxes}
              </Txt>
            </View>
            <Button label="Select" size="compact" onPress={onSelect} />
          </View>

          <View>
            {pkg.others.map((other) => (
              <View key={other.platform} style={styles.otherRow}>
                <Photo uri={platformLogos[other.platform]} style={styles.siteLogoSmall} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Txt variant="regular14" color={color.textSecondary}>
                    {other.platform}
                  </Txt>
                  <View style={styles.otherPriceRow}>
                    <Txt variant="semibold16">{other.price}</Txt>
                    <View style={styles.deltaRow}>
                      <ArrowUpIcon size={10} />
                      <Txt variant="regular12" color={color.error}>
                        {other.higherBy} higher
                      </Txt>
                    </View>
                  </View>
                </View>
                <ChevronRight size={14} />
              </View>
            ))}
            <Pressable onPress={onViewAll} style={styles.viewAllRow}>
              <Txt variant="semibold14" color={color.primary}>
                View prices from {pkg.remaining} more sites
              </Txt>
            </Pressable>
          </View>
        </View>
      ) : null}
    </Pressable>
  );
}

function Lightbox({
  index,
  onClose,
  onChange,
}: {
  index: number | null;
  onClose: () => void;
  onChange: (next: number) => void;
}) {
  if (index === null) return null;
  const total = ROOM_PHOTO_URIS.length;

  return (
    <Modal visible animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <SafeAreaView style={styles.lightbox} edges={['top', 'bottom']}>
        <View style={styles.lightboxHeader}>
          <Pressable onPress={onClose} style={styles.lightboxButton}>
            <CloseIcon size={16} color={color.surface} />
          </Pressable>
          <Txt variant="medium14" color={color.surface} style={{ flex: 1 }}>
            {ROOM_PHOTO_LABELS[index]}
          </Txt>
          <Txt variant="regular12" color={color.textMuted}>
            {index + 1} of {total}
          </Txt>
        </View>
        <View style={styles.lightboxBody}>
          <Pressable style={styles.lightboxButton} onPress={() => onChange((index + total - 1) % total)}>
            <ChevronLeft size={16} color={color.surface} />
          </Pressable>
          <Photo uri={ROOM_PHOTO_URIS[index]} style={styles.lightboxPhoto} />
          <Pressable style={styles.lightboxButton} onPress={() => onChange((index + 1) % total)}>
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <ChevronLeft size={16} color={color.surface} />
            </View>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbStrip}>
          {ROOM_PHOTO_URIS.map((uri, thumbIndex) => (
            <Pressable key={uri} onPress={() => onChange(thumbIndex)}>
              <Photo
                uri={uri}
                style={[
                  styles.thumb,
                  { borderColor: thumbIndex === index ? color.surface : 'transparent' },
                ]}
              />
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.surface,
  },
  scroll: {
    flex: 1,
    backgroundColor: color.surface,
  },
  editButton: {
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
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
  tabStrip: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  roomTab: {
    minWidth: 130,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  roomTabActive: {
    borderBottomColor: color.primary,
    backgroundColor: color.surface,
  },
  roomTabIdle: {
    borderBottomColor: 'transparent',
    backgroundColor: color.page,
  },
  photoStrip: {
    padding: space.x16,
    gap: space.x12,
  },
  roomPhoto: {
    width: 312,
    height: 200,
    borderRadius: radius.lg,
  },
  factRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: space.x8,
    columnGap: space.x16,
    paddingHorizontal: space.x16,
    paddingBottom: space.x16,
  },
  fact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
  },
  amenitySection: {
    paddingHorizontal: space.x16,
    paddingBottom: space.x16,
    gap: space.x12,
    borderBottomWidth: space.x8,
    borderBottomColor: color.page,
  },
  amenityWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: space.x8,
    columnGap: space.x16,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textLink: {
    minHeight: 24,
    justifyContent: 'center',
  },
  chipStrip: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  chipStripContent: {
    padding: space.x16,
    gap: space.x8,
  },
  packageList: {
    padding: space.x16,
    gap: space.x12,
  },
  desktopColumn: {
    width: '100%',
    maxWidth: DESKTOP_CONTENT_WIDTH,
    alignSelf: 'center',
  },
  packageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.x16,
    alignItems: 'flex-start',
  },
  packageGridItem: {
    flexGrow: 1,
    flexBasis: 420,
    maxWidth: 560,
  },
  emptyWrapDesktop: {
    height: 480,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyInnerDesktop: {
    width: '100%',
    maxWidth: 480,
  },
  packageCard: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    padding: space.x16,
    gap: space.x12,
    backgroundColor: color.surface,
  },
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.x12,
  },
  inclusionRow: {
    flexDirection: 'row',
    gap: space.x8,
    alignItems: 'center',
  },
  inclusionText: {
    lineHeight: 18,
    flex: 1,
  },
  bestPriceRow: {
    borderTopWidth: 1,
    borderTopColor: color.border,
    paddingTop: space.x12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  platformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
  },
  siteLogo: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
  },
  siteLogoSmall: {
    width: 20,
    height: 20,
    borderRadius: radius.sm,
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
  smallText: {
    fontSize: 12,
    lineHeight: 16,
  },
  otherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: color.border,
  },
  otherPriceRow: {
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
  viewAllRow: {
    borderTopWidth: 1,
    borderTopColor: color.border,
    paddingTop: space.x12,
    minHeight: TOUCH_TARGET,
    justifyContent: 'center',
  },
  emptyWrap: {
    height: 420,
  },
  sheetBody: {
    padding: space.x16,
    gap: 18,
  },
  amenityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: space.x12,
  },
  amenityGridItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    paddingRight: space.x8,
  },
  priceSheetBody: {
    paddingTop: space.x8,
    paddingHorizontal: space.x16,
    paddingBottom: space.x16,
  },
  priceSheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: space.x12,
    borderBottomWidth: 1,
    borderBottomColor: color.page,
  },
  priceSheetPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    marginTop: space.x2,
  },
  lightbox: {
    flex: 1,
    backgroundColor: color.text,
  },
  lightboxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
  },
  lightboxButton: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightboxBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    paddingHorizontal: space.x12,
    paddingBottom: space.x16,
  },
  lightboxPhoto: {
    flex: 1,
    aspectRatio: 4 / 3,
    borderRadius: radius.lg,
  },
  thumbStrip: {
    paddingHorizontal: space.x16,
    paddingBottom: space.x20,
    gap: space.x8,
  },
  thumb: {
    width: 64,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 2,
  },
});
