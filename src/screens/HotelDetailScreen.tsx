import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../App';
import { Button, IconButton } from '../components/Button';
import { Chip, Pill } from '../components/Chip';
import { Header } from '../components/Header';
import { BellIcon, ChevronRight, CloseIcon, DirectionsIcon, ShareIcon, TileGlyph } from '../components/Icon';
import { PriceSpreadCard } from '../components/PriceSpreadCard';
import { PriceTrendGraph } from '../components/PriceTrendGraph';
import { Photo } from '../components/Photo';
import { Sheet } from '../components/Sheet';
import { Stars } from '../components/Stars';
import { Stepper } from '../components/Stepper';
import { Toast } from '../components/Toast';
import { Txt } from '../components/Txt';
import { mapTile, platformLogos } from '../data/images';
import { ABOUT_PARAGRAPHS, AMENITY_GROUPS, GALLERY_SECTIONS, REVIEW_SOURCES, RULE_GROUPS } from '../data/mock';
import {
  DEFAULT_ALERT_AMOUNT,
  DEFAULT_TREND_RANGE,
  inr,
  TREND_ROOMS,
  TrendRange,
} from '../data/trend';
import { formatDay, nightsBetween, useBooking } from '../state/BookingContext';
import { useIsDesktop } from '../theme/breakpoints';
import { HotelDetailDesktop } from './HotelDetailDesktop';
import {
  AboutSection,
  AmenitiesSection,
  DiningSection,
  LocationSection,
  MediaSection,
  OverviewSection,
  ReviewsSection,
  RulesSection,
} from './HotelDetailSections';
import { AlertSheet } from './sheets/AlertSheet';
import { RoomPickerSheet } from './sheets/RoomPickerSheet';
import { color, radius, shadow, space, TOUCH_TARGET } from '../theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'HotelDetail'>;

/** Price block + CTA row, plus the "more prices" strip beneath it. */
const BOTTOM_BAR_HEIGHT = 128;
export type SheetName = 'gallery' | 'about' | 'amenities' | 'booking' | 'rules' | 'alert' | 'roomPicker' | null;

export function HotelDetailScreen({ navigation }: Props) {
  const { selectedHotel, search, stayLabel, roomsLabel, guestsLabel } = useBooking();
  const [sheet, setSheet] = useState<SheetName>(null);
  const [scrolled, setScrolled] = useState(false);
  const [reviewSource, setReviewSource] = useState(REVIEW_SOURCES[0]);
  const [trendRange, setTrendRange] = useState<TrendRange>(DEFAULT_TREND_RANGE);
  const [trendRoom, setTrendRoom] = useState(0);
  const [alertAmount, setAlertAmount] = useState(DEFAULT_ALERT_AMOUNT);
  const [toast, setToast] = useState<string | null>(null);
  const insets = useSafeAreaInsets();
  const isDesktop = useIsDesktop();

  const hotel = selectedHotel;
  if (!hotel) return null;

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = event.nativeEvent.contentOffset.y > 120;
    if (next !== scrolled) setScrolled(next);
  };

  const showsReviews = hotel.hasReviews && reviewSource === 'Google';

  if (isDesktop) {
    return (
      <HotelDetailDesktop
        hotel={hotel}
        search={search}
        stayLabel={stayLabel}
        roomsLabel={roomsLabel}
        guestsLabel={guestsLabel}
        sheet={sheet}
        setSheet={setSheet}
        reviewSource={reviewSource}
        setReviewSource={setReviewSource}
        showsReviews={showsReviews}
        trendRange={trendRange}
        setTrendRange={setTrendRange}
        trendRoom={trendRoom}
        setTrendRoom={setTrendRoom}
        alertAmount={alertAmount}
        setAlertAmount={setAlertAmount}
        toast={toast}
        setToast={setToast}
        onBack={() => navigation.goBack()}
        onSelectRoom={() => navigation.navigate('PriceComparison')}
      />
    );
  }

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <Header
          title={hotel.name}
          subtitle={stayLabel}
          titleOpacity={scrolled ? 1 : 0}
          onBack={() => navigation.goBack()}
          onTitlePress={() => setSheet('booking')}
          floatingBack
          right={
            <>
              <Pressable
                onPress={() => setSheet('alert')}
                style={[styles.alertPill, scrolled && styles.alertPillCollapsed]}
              >
                <BellIcon size={16} />
                {scrolled ? null : (
                  <Txt variant="semibold14" color={color.primary}>
                    Set Alert
                  </Txt>
                )}
              </Pressable>
              <IconButton>
                <ShareIcon size={18} />
              </IconButton>
            </>
          }
        />
      </SafeAreaView>

      <ScrollView onScroll={onScroll} scrollEventThrottle={16} style={styles.scroll}>
        <View style={styles.heroRow}>
          <Photo uri={hotel.photos[0]} style={styles.heroMain} />
          <View style={styles.heroSide}>
            <Photo uri={hotel.photos[1]} style={styles.heroThumb} />
            <Photo uri={hotel.photos[2]} style={styles.heroThumb} />
            <Pressable style={styles.heroMore} onPress={() => setSheet('gallery')}>
              <Txt variant="semibold14" color={color.surface} style={styles.heroMoreText}>
                +{hotel.photoCount}
              </Txt>
            </Pressable>
          </View>
        </View>

        <OverviewSection
          hotel={hotel}
          search={search}
          roomsLabel={roomsLabel}
          guestsLabel={guestsLabel}
          onEditStay={() => setSheet('booking')}
        />

        <PriceSpreadCard />

        <PriceTrendGraph
          range={trendRange}
          onChangeRange={setTrendRange}
          roomIndex={trendRoom}
          onOpenRoomPicker={() => setSheet('roomPicker')}
        />

        <AboutSection hotel={hotel} onReadMore={() => setSheet('about')} />
        <MediaSection hotel={hotel} />
        <AmenitiesSection hotel={hotel} onViewAll={() => setSheet('amenities')} />
        <ReviewsSection
          hotel={hotel}
          reviewSource={reviewSource}
          onChangeSource={setReviewSource}
          showsReviews={showsReviews}
          reviewSources={REVIEW_SOURCES}
        />
        <LocationSection hotel={hotel} />
        <DiningSection />
        <RulesSection onViewAll={() => setSheet('rules')} />
      </ScrollView>

      <Toast message={toast} onHide={() => setToast(null)} bottomOffset={BOTTOM_BAR_HEIGHT} />

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom }]}>
        <View style={styles.bottomBarMain}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <View style={styles.platformRow}>
              <Photo uri={platformLogos[hotel.bestPrice.platform]} style={styles.platformLogo} />
              <Txt variant="semibold14" color={color.textSecondary} style={styles.smallText}>
                {hotel.bestPrice.platform} ·{' '}
                <Txt variant="semibold14" color={color.success} style={styles.smallText}>
                  Best price
                </Txt>
              </Txt>
            </View>
            <View style={styles.bottomPriceRow}>
              <Txt variant="bold24">{hotel.bestPrice.total}</Txt>
              <Pill
                label={`${hotel.bestPrice.discount} off`}
                background={color.success}
                foreground={color.surface}
              />
            </View>
            <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x4 }}>
              {hotel.bestPrice.taxes}
            </Txt>
          </View>
          <Button
            label="Select room"
            size="compact"
            onPress={() => navigation.navigate('PriceComparison')}
          />
        </View>
        <Pressable style={styles.morePrices} onPress={() => navigation.navigate('PriceComparison')}>
          <Txt variant="medium12" color={color.primary} style={{ flex: 1 }}>
            {hotel.otherPriceCount} more prices available from {hotel.otherSiteCount} sites
          </Txt>
          <ChevronRight size={14} color={color.primary} />
        </Pressable>
      </View>

      <GallerySheet
        visible={sheet === 'gallery'}
        onClose={() => setSheet(null)}
        photos={hotel.photos}
        photoCount={hotel.photoCount}
      />

      <AboutSheet visible={sheet === 'about'} onClose={() => setSheet(null)} />

      <AmenitiesSheet
        visible={sheet === 'amenities'}
        onClose={() => setSheet(null)}
        title={`${hotel.amenityCount} amenities`}
      />

      <EditStaySheet visible={sheet === 'booking'} onClose={() => setSheet(null)} />

      <RoomPickerSheet
        visible={sheet === 'roomPicker'}
        onClose={() => setSheet(null)}
        roomIndex={trendRoom}
        onSelect={(index) => {
          setTrendRoom(index);
          setSheet(null);
        }}
      />

      <AlertSheet
        visible={sheet === 'alert'}
        onClose={() => setSheet(null)}
        onSetAlert={() => {
          setSheet(null);
          setToast(`Price alert set — we'll tell you when it drops below ${inr(alertAmount)}`);
        }}
        hotel={hotel}
        amount={alertAmount}
        onChangeAmount={setAlertAmount}
        stayLine={`${formatDay(search.checkIn)} – ${formatDay(search.checkOut)} · ${nightsBetween(search.checkIn, search.checkOut)} ${
          nightsBetween(search.checkIn, search.checkOut) === 1 ? 'night' : 'nights'
        }`}
        guestLine={`${roomsLabel} · ${guestsLabel}`}
        roomLine={TREND_ROOMS[trendRoom].name}
      />

      <RulesSheet visible={sheet === 'rules'} onClose={() => setSheet(null)} />
    </View>
  );
}

export function AboutSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <Sheet visible={visible} onClose={onClose} title="About the property" maxHeight="78%">
      <ScrollView contentContainerStyle={styles.sheetBody}>
        {ABOUT_PARAGRAPHS.map((paragraph, index) => (
          <Txt key={index} variant="regular14" color={color.textSecondary} style={styles.paragraph}>
            {paragraph}
          </Txt>
        ))}
      </ScrollView>
    </Sheet>
  );
}

export function RulesSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <Sheet visible={visible} onClose={onClose} title="Property rules" maxHeight="78%">
      <ScrollView contentContainerStyle={[styles.sheetBody, { gap: 18 }]}>
        {RULE_GROUPS.map((group) => (
          <View key={group.title} style={{ gap: space.x8 }}>
            <View style={styles.ruleGroupHeader}>
              <TileGlyph size={24} bg={color.primaryTint} mark={color.primary} />
              <Txt variant="semibold16">{group.title}</Txt>
            </View>
            {group.items.map((item) => (
              <View key={item} style={styles.bulletRow}>
                <View style={styles.bullet} />
                <Txt variant="regular14" color={color.textSecondary} style={{ flex: 1 }}>
                  {item}
                </Txt>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </Sheet>
  );
}

export function GallerySheet({
  visible,
  onClose,
  photos,
  photoCount,
}: {
  visible: boolean;
  onClose: () => void;
  photos: string[];
  photoCount: string;
}) {
  const [filter, setFilter] = useState('All');
  const sections = GALLERY_SECTIONS.filter((section) => filter === 'All' || section.title === filter);

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <SafeAreaView style={styles.galleryRoot} edges={['top', 'bottom']}>
        <View style={styles.galleryHeader}>
          <IconButton onPress={onClose}>
            <CloseIcon size={16} />
          </IconButton>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Txt variant="semibold16">All photos</Txt>
            <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
              {photoCount}
            </Txt>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.galleryChips}
          contentContainerStyle={styles.hScrollTight}
        >
          {['All', ...GALLERY_SECTIONS.map((section) => section.title)].map((label) => (
            <Chip key={label} label={label} active={filter === label} onPress={() => setFilter(label)} />
          ))}
        </ScrollView>
        <ScrollView contentContainerStyle={styles.galleryBody}>
          {sections.map((section) => (
            <View key={section.title} style={{ gap: space.x8 }}>
              <Txt variant="semibold14">
                {section.title}{' '}
                <Txt variant="regular14" color={color.textSecondary}>
                  · {section.count}
                </Txt>
              </Txt>
              <View style={{ gap: space.x12 }}>
                {Array.from({ length: section.photos }).map((_, index) => (
                  <Photo
                    key={index}
                    uri={photos[index % photos.length]}
                    style={styles.galleryPhoto}
                  />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export function AmenitiesSheet({
  visible,
  onClose,
  title,
}: {
  visible: boolean;
  onClose: () => void;
  title: string;
}) {
  const [filter, setFilter] = useState('All');
  const groups = AMENITY_GROUPS.filter((group) => filter === 'All' || group.title === filter);

  return (
    <Sheet visible={visible} onClose={onClose} title={title}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sheetChips}
        contentContainerStyle={styles.hScrollTight}
      >
        {['All', ...AMENITY_GROUPS.map((group) => group.title)].map((label) => (
          <Chip key={label} label={label} active={filter === label} onPress={() => setFilter(label)} />
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={[styles.sheetBody, { gap: 18 }]}>
        {groups.map((group) => (
          <View key={group.title} style={{ gap: space.x12 }}>
            <Txt variant="semibold14">{group.title}</Txt>
            <View style={styles.amenityGrid}>
              {group.items.map((item) => (
                <View key={item} style={styles.amenityGridItem}>
                  <TileGlyph size={24} />
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
  );
}

export function EditStaySheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { search, setSearch, selectedHotel } = useBooking();

  const rows = [
    { key: 'rooms' as const, label: 'Rooms', hint: 'Up to 4 rooms', min: 1, max: 4 },
    { key: 'adults' as const, label: 'Adults', hint: 'Age 13+', min: 1, max: 16 },
    { key: 'children' as const, label: 'Children', hint: 'Age 0–12', min: 0, max: 8 },
  ];

  return (
    <Sheet visible={visible} onClose={onClose} title="Edit your stay">
      <ScrollView contentContainerStyle={[styles.sheetBody, { gap: space.x12 }]}>
        <View style={{ gap: space.x8 }}>
          <Txt variant="medium12" color={color.textSecondary}>
            Destination
          </Txt>
          <View style={styles.sheetField}>
            <Txt variant="regular16" style={{ flex: 1 }} numberOfLines={1}>
              {selectedHotel ? `${selectedHotel.name}, ${selectedHotel.location}` : search.destination}
            </Txt>
          </View>
        </View>

        <View style={{ gap: space.x8 }}>
          <Txt variant="medium12" color={color.textSecondary}>
            Dates
          </Txt>
          <View style={styles.splitField}>
            <View style={[styles.splitHalf, styles.splitDivider]}>
              <Txt variant="regular12" color={color.textMuted}>
                Check-in
              </Txt>
              <Txt variant="medium16" style={{ marginTop: space.x2 }}>
                {formatDay(search.checkIn)}
              </Txt>
            </View>
            <View style={styles.splitHalf}>
              <Txt variant="regular12" color={color.textMuted}>
                Check-out
              </Txt>
              <Txt variant="medium16" style={{ marginTop: space.x2 }}>
                {formatDay(search.checkOut)}
              </Txt>
            </View>
          </View>
        </View>

        <View style={{ gap: space.x8 }}>
          <Txt variant="medium12" color={color.textSecondary}>
            Rooms & guests
          </Txt>
          <View style={styles.stepperCard}>
            {rows.map((row) => (
              <View key={row.key} style={styles.stepperRow}>
                <View style={{ flex: 1 }}>
                  <Txt variant="medium16">{row.label}</Txt>
                  <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
                    {row.hint}
                  </Txt>
                </View>
                <Stepper
                  value={search[row.key]}
                  min={row.min}
                  max={row.max}
                  onChange={(next) => setSearch({ [row.key]: next })}
                />
              </View>
            ))}
          </View>
        </View>

        <Button label="Update search" onPress={onClose} style={{ marginTop: space.x4 }} />
      </ScrollView>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.surface,
  },
  headerSafeArea: {
    backgroundColor: color.surface,
    zIndex: 5,
  },
  alertPill: {
    height: TOUCH_TARGET,
    borderRadius: radius.pill,
    backgroundColor: color.primaryTint,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 14,
  },
  alertPillCollapsed: {
    width: TOUCH_TARGET,
    paddingHorizontal: 0,
  },
  scroll: {
    flex: 1,
    backgroundColor: color.page,
  },
  heroRow: {
    flexDirection: 'row',
    gap: space.x4,
    height: 260,
  },
  heroMain: {
    flex: 0.78,
  },
  heroSide: {
    flex: 0.22,
    gap: space.x4,
  },
  heroThumb: {
    flex: 1,
  },
  heroMore: {
    flex: 1,
    backgroundColor: color.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroMoreText: {
    fontSize: 12,
    lineHeight: 16,
  },
  section: {
    padding: space.x16,
    gap: space.x16,
    backgroundColor: color.surface,
    borderBottomWidth: space.x8,
    borderBottomColor: color.page,
  },
  sectionTight: {
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
  lastSection: {
    borderBottomWidth: 0,
    paddingBottom: space.x24,
  },
  inset: {
    paddingHorizontal: space.x16,
    marginHorizontal: 0,
  },
  hScroll: {
    paddingHorizontal: space.x16,
    gap: space.x12,
  },
  hScrollTight: {
    paddingHorizontal: space.x16,
    gap: space.x8,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    marginTop: 6,
  },
  outlinedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
  },
  ratingTile: {
    backgroundColor: color.primaryTint,
    borderRadius: radius.md,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  locationThumb: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
  },
  stayCard: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
  },
  stayHalf: {
    flex: 1,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
  },
  stayDivider: {
    borderRightWidth: 1,
    borderRightColor: color.border,
  },
  stayGuests: {
    borderTopWidth: 1,
    borderTopColor: color.border,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    justifyContent: 'space-between',
  },
  editButton: {
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  paragraph: {
    lineHeight: 20,
  },
  textLink: {
    minHeight: 24,
    justifyContent: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  mediaThumb: {
    width: 130,
    height: 88,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBadge: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenityTile: {
    width: 84,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    paddingVertical: space.x12,
    paddingHorizontal: space.x8,
    alignItems: 'center',
    gap: space.x8,
  },
  centered: {
    textAlign: 'center',
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: color.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    lineHeight: 16,
  },
  kicker: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  fallbackCard: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    padding: space.x16,
    gap: space.x12,
  },
  fallbackDivider: {
    borderTopWidth: 1,
    borderTopColor: color.border,
    paddingTop: space.x12,
  },
  emptySourceCard: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    paddingVertical: space.x20,
    paddingHorizontal: 14,
    alignItems: 'center',
    gap: space.x12,
  },
  mapView: {
    height: 140,
    borderRadius: radius.lg,
  },
  landmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.page,
  },
  landmarkDot: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
    backgroundColor: color.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  landmarkDotInner: {
    width: 6,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: color.primary,
  },
  diningIcon: {
    width: 36,
    height: 36,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: space.x12,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: color.textMuted,
    marginTop: 7,
  },
  bottomBar: {
    backgroundColor: color.surface,
    borderTopWidth: 1,
    borderTopColor: color.border,
    ...shadow.bottomBar,
  },
  bottomBarMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingTop: space.x12,
    paddingBottom: space.x16,
    paddingHorizontal: space.x16,
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
  bottomPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: space.x8,
    marginTop: space.x4,
    flexWrap: 'wrap',
  },
  morePrices: {
    backgroundColor: color.primaryTint,
    borderTopWidth: 1,
    borderTopColor: color.border,
    paddingVertical: 10,
    paddingHorizontal: space.x16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
  },
  galleryRoot: {
    flex: 1,
    backgroundColor: color.surface,
  },
  galleryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  galleryChips: {
    flexGrow: 0,
    paddingVertical: space.x12,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  galleryBody: {
    padding: space.x16,
    gap: space.x16,
  },
  galleryPhoto: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: radius.lg,
  },
  sheetChips: {
    flexGrow: 0,
    paddingVertical: space.x12,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  sheetBody: {
    padding: space.x16,
    gap: space.x16,
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
  sheetField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    minHeight: TOUCH_TARGET,
  },
  splitField: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    overflow: 'hidden',
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
  stepperCard: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    borderBottomWidth: 1,
    borderBottomColor: color.page,
  },
  ruleGroupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
  },
});
