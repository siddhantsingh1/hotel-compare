import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, IconButton } from '../components/Button';
import { Pill } from '../components/Chip';
import { Header } from '../components/Header';
import { BellIcon, ChevronDown, ShareIcon } from '../components/Icon';
import { Photo } from '../components/Photo';
import { PriceCompareRow } from '../components/PriceCompareRow';
import { Toast } from '../components/Toast';
import { TrendPlot } from '../components/TrendPlot';
import { Txt } from '../components/Txt';
import { platformLogos } from '../data/images';
import { Hotel, REVIEW_SOURCES } from '../data/mock';
import { inr, TREND_RANGES, TREND_ROOMS, TrendRange, trendData } from '../data/trend';
import { formatDay, nightsBetween } from '../state/BookingContext';
import { DESKTOP_CONTENT_WIDTH } from '../theme/breakpoints';
import { color, radius, shadow, space } from '../theme/tokens';
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
import { AboutSheet, AmenitiesSheet, EditStaySheet, GallerySheet, RulesSheet, SheetName } from './HotelDetailScreen';
import { AlertSheet } from './sheets/AlertSheet';
import { RoomPickerSheet } from './sheets/RoomPickerSheet';

/** Price block + compare list + trend graph + alert entry — the desktop
 * counterpart to the mobile fixed bottom bar. Stops scrolling once it
 * reaches the bottom of the left column, the same way booking.com and
 * MakeMyTrip's own desktop sticky rails behave. */

type Props = {
  hotel: Hotel;
  search: { checkIn: string | null; checkOut: string | null };
  stayLabel: string;
  roomsLabel: string;
  guestsLabel: string;
  sheet: SheetName;
  setSheet: (next: SheetName) => void;
  reviewSource: string;
  setReviewSource: (next: string) => void;
  showsReviews: boolean;
  trendRange: TrendRange;
  setTrendRange: (next: TrendRange) => void;
  trendRoom: number;
  setTrendRoom: (next: number) => void;
  alertAmount: number;
  setAlertAmount: (next: number) => void;
  toast: string | null;
  setToast: (next: string | null) => void;
  onBack: () => void;
  onSelectRoom: () => void;
};

export function HotelDetailDesktop({
  hotel,
  search,
  stayLabel,
  roomsLabel,
  guestsLabel,
  sheet,
  setSheet,
  reviewSource,
  setReviewSource,
  showsReviews,
  trendRange,
  setTrendRange,
  trendRoom,
  setTrendRoom,
  alertAmount,
  setAlertAmount,
  toast,
  setToast,
  onBack,
  onSelectRoom,
}: Props) {
  const [picked, setPicked] = useState<number | null>(null);

  const data = useMemo(() => trendData(trendRange, trendRoom), [trendRange, trendRoom]);
  const risingDelta = data.delta.charAt(0) === '+';

  return (
    <View style={styles.root}>
      <View style={styles.headerBand}>
        <Header
          title={hotel.name}
          subtitle={stayLabel}
          onBack={onBack}
          style={styles.headerInner}
          right={
            <IconButton>
              <ShareIcon size={18} />
            </IconButton>
          }
        />
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.columns}>
          <View style={styles.leftCol}>
            <View style={styles.heroRow}>
              <Photo uri={hotel.photos[0]} style={styles.heroMain} />
              <View style={styles.heroSide}>
                <Photo uri={hotel.photos[1]} style={styles.heroThumb} />
                <Photo uri={hotel.photos[2]} style={styles.heroThumb} />
                <Pressable style={styles.heroMore} onPress={() => setSheet('gallery')}>
                  <Txt variant="semibold14" color={color.surface} style={styles.smallText}>
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
          </View>

          <View style={styles.rightCol}>
            <View style={[styles.stickyOuter, stickyStyle]}>
              <View style={styles.stickyCard}>
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
                  <Pill label={`${hotel.bestPrice.discount} off`} background={color.success} foreground={color.surface} />
                </View>
                <Txt variant="regular12" color={color.textSecondary}>
                  {hotel.bestPrice.taxes}
                </Txt>
                <Button label="Select room" onPress={onSelectRoom} style={{ marginTop: space.x12 }} />

                <View style={styles.divider} />
                <Txt variant="semibold14">Compare across sites</Txt>
                <View>
                  <PriceCompareRow
                    platform={hotel.bestPrice.platform}
                    price={hotel.bestPrice.total}
                    best
                    showChevron={false}
                    onPress={onSelectRoom}
                  />
                  {hotel.altPrices.map((alt) => (
                    <PriceCompareRow
                      key={alt.platform}
                      platform={alt.platform}
                      price={alt.price}
                      higherBy={alt.higherBy}
                      showChevron={false}
                      onPress={onSelectRoom}
                    />
                  ))}
                </View>
                <Pressable onPress={onSelectRoom} style={styles.morePricesLink}>
                  <Txt variant="medium12" color={color.primary}>
                    {hotel.otherPriceCount} more prices from {hotel.otherSiteCount} sites
                  </Txt>
                </Pressable>

                <View style={styles.divider} />
                <View style={styles.rowBetween}>
                  <Txt variant="semibold14">Price trend</Txt>
                  <Pressable onPress={() => setSheet('roomPicker')} style={styles.roomPickerLink}>
                    <Txt variant="regular12" color={color.textSecondary} numberOfLines={1}>
                      <Txt variant="semibold14" color={color.primary} style={styles.smallText}>
                        {data.roomName}
                      </Txt>
                    </Txt>
                    <ChevronDown size={12} color={color.primary} />
                  </Pressable>
                </View>
                <View style={styles.avgRow}>
                  <Txt variant="regular12" color={color.textSecondary}>
                    Average
                  </Txt>
                  <Txt variant="bold16">{inr(data.avg)}</Txt>
                  <Txt
                    variant="semibold14"
                    color={risingDelta ? color.error : color.success}
                    style={styles.smallText}
                  >
                    {data.delta}
                  </Txt>
                </View>
                <TrendPlot data={data} picked={picked} onPick={setPicked} hoverable />
                <View style={styles.rangeRow}>
                  {TREND_RANGES.map((label) => {
                    const on = trendRange === label;
                    return (
                      <Pressable
                        key={label}
                        onPress={() => {
                          setPicked(null);
                          setTrendRange(label);
                        }}
                        style={[
                          styles.rangeChip,
                          {
                            backgroundColor: on ? color.primaryTint : color.surface,
                            borderColor: on ? color.primary : color.border,
                          },
                        ]}
                      >
                        <Txt
                          variant="semibold14"
                          color={on ? color.primary : color.textSecondary}
                          style={styles.smallText}
                        >
                          {label}
                        </Txt>
                      </Pressable>
                    );
                  })}
                </View>

                <Pressable onPress={() => setSheet('alert')} style={styles.alertRow}>
                  <BellIcon size={16} />
                  <Txt variant="semibold14" color={color.primary}>
                    Set price alert
                  </Txt>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Toast message={toast} onHide={() => setToast(null)} />

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

/** `position: sticky` isn't part of RN's ViewStyle typings — it's a web-only
 * escape hatch, same treatment as the `outlineStyle` casts elsewhere. */
const stickyStyle = { position: 'sticky', top: space.x24 } as unknown as { position: 'relative'; top: number };

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.page,
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
  scroll: {
    flex: 1,
  },
  columns: {
    width: '100%',
    maxWidth: DESKTOP_CONTENT_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: space.x32,
    paddingVertical: space.x24,
    flexDirection: 'row',
    gap: space.x24,
  },
  leftCol: {
    flex: 1,
    minWidth: 0,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  rightCol: {
    width: 380,
  },
  heroRow: {
    flexDirection: 'row',
    gap: space.x4,
    height: 320,
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
  smallText: {
    fontSize: 12,
    lineHeight: 16,
  },
  stickyOuter: {
    // Clamped sticky: this column stretches to match the left column's
    // height (default flex alignItems:'stretch'), so the sticky card can
    // never scroll past the bottom of the page content beneath it.
  },
  stickyCard: {
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.xl,
    padding: space.x20,
    gap: space.x8,
    ...shadow.cardActive,
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
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: space.x8,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: color.border,
    marginVertical: space.x8,
  },
  morePricesLink: {
    minHeight: 24,
    justifyContent: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.x8,
  },
  roomPickerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 0,
    flexShrink: 1,
  },
  avgRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: space.x8,
  },
  rangeRow: {
    flexDirection: 'row',
    gap: space.x8,
  },
  rangeChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: space.x4,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.x8,
    marginTop: space.x8,
    paddingVertical: space.x12,
    borderRadius: radius.lg,
    backgroundColor: color.primaryTint,
  },
});
