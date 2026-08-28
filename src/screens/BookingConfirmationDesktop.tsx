import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, IconButton } from '../components/Button';
import { Pill } from '../components/Chip';
import { CabIcon, CheckIcon, CloseIcon, DirectionsIcon, ExternalLinkIcon, ShareIcon } from '../components/Icon';
import { Photo } from '../components/Photo';
import { Stars } from '../components/Stars';
import { Txt } from '../components/Txt';
import { brandTile, mapTile, platformLogos } from '../data/images';
import { CONFIRMATION, Hotel, RIDE_BANNERS, TRIP_GIFT_CARDS } from '../data/mock';
import { formatDay } from '../state/BookingContext';
import { color, radius, shadow, space } from '../theme/tokens';
import { SuccessArt } from './BookingConfirmationScreen';

type Props = {
  hotel: Hotel | null;
  search: { destination: string; checkIn: string | null; checkOut: string | null };
  roomsLabel: string;
  guestsLabel: string;
  onGoHome: () => void;
};

/** Booking Confirmation, centered in a narrow column so the moment reads like
 * a receipt rather than stretching to the full desktop width. */
export function BookingConfirmationDesktop({ hotel, search, roomsLabel, guestsLabel, onGoHome }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <IconButton onPress={onGoHome}>
            <CloseIcon size={16} />
          </IconButton>
          <IconButton>
            <ShareIcon size={18} />
          </IconButton>
        </View>
      </View>

      <ScrollView>
        <View style={styles.column}>
          <View style={styles.successBlock}>
            <SuccessArt />
            <Txt variant="bold20" style={styles.centered}>
              Congrats! Your booking is confirmed.
            </Txt>
            <Txt variant="regular14" color={color.textSecondary}>
              Booked on {CONFIRMATION.platform} · <Txt variant="medium14">{CONFIRMATION.bookingId}</Txt>
            </Txt>
            <View style={styles.savedPill}>
              <Txt variant="semibold14" color={color.surface}>
                You saved {CONFIRMATION.saved} via hotel compare
              </Txt>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.hotelRow}>
              <Photo uri={hotel?.photos[0]} style={styles.hotelThumb} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Txt variant="semibold16">{hotel?.name ?? 'Ocean Pearl Resort'}</Txt>
                <View style={styles.hotelMeta}>
                  <Stars count={hotel?.starCount ?? 4} />
                  <Txt variant="regular12" color={color.textSecondary}>
                    · {hotel?.locality ?? 'Candolim, North Goa'}
                  </Txt>
                </View>
              </View>
              <IconButton background={color.primaryTint} bordered={false}>
                <DirectionsIcon size={18} />
              </IconButton>
            </View>
            <View style={styles.featureRow}>
              {CONFIRMATION.keyFeatures.map((feature) => (
                <View key={feature} style={styles.featurePill}>
                  <CheckIcon size={12} color={color.success} />
                  <Txt variant="medium12" color={color.success}>
                    {feature}
                  </Txt>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Txt variant="semibold16">Booking details</Txt>

            <View style={styles.datesCard}>
              <View style={[styles.dateHalf, styles.dateDivider]}>
                <Txt variant="regular12" color={color.textMuted}>
                  Check-in
                </Txt>
                <Txt variant="semibold16" style={{ marginTop: space.x4 }}>
                  {formatDay(search.checkIn)}
                </Txt>
                <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x4 }}>
                  After 2:00 PM
                </Txt>
              </View>
              <View style={styles.dateHalf}>
                <Txt variant="regular12" color={color.textMuted}>
                  Check-out
                </Txt>
                <Txt variant="semibold16" style={{ marginTop: space.x4 }}>
                  {formatDay(search.checkOut)}
                </Txt>
                <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x4 }}>
                  Before 11:00 AM
                </Txt>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={[styles.detailCard, styles.detailHalf]}>
                <Txt variant="semibold14" color={color.textSecondary} style={styles.cardLabel}>
                  Room & package
                </Txt>
                <View style={styles.rowCenter}>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Txt variant="semibold14">{CONFIRMATION.roomName}</Txt>
                    <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x4 }}>
                      {CONFIRMATION.packageName}
                    </Txt>
                  </View>
                  <Photo uri={hotel?.photos[1]} style={styles.roomThumb} />
                </View>
              </View>

              <View style={[styles.detailCard, styles.detailHalf]}>
                <Txt variant="semibold14" color={color.textSecondary} style={styles.cardLabel}>
                  Guests
                </Txt>
                <View style={styles.rowCenter}>
                  <View style={styles.avatar}>
                    <Txt variant="semibold14" color={color.primary}>
                      {CONFIRMATION.guestInitials}
                    </Txt>
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <View style={styles.guestNameRow}>
                      <Txt variant="semibold14">{CONFIRMATION.guestName}</Txt>
                      <Pill label="Primary guest" background={color.primaryTint} foreground={color.primary} />
                    </View>
                    <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x4 }}>
                      {roomsLabel} · {guestsLabel}
                    </Txt>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.detailCard, shadow.card]}>
              <View style={styles.rowCenter}>
                <Photo uri={platformLogos[CONFIRMATION.platform]} style={styles.platformLogo} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Txt variant="semibold14">{CONFIRMATION.platform}</Txt>
                  <Txt variant="medium12" color={color.success} style={{ marginTop: space.x4 }}>
                    You saved {CONFIRMATION.saved} via compare
                  </Txt>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <View style={styles.amountRow}>
                    <Txt variant="regular12" color={color.textMuted} style={styles.strikethrough}>
                      {CONFIRMATION.compareAt}
                    </Txt>
                    <Txt variant="bold20">{CONFIRMATION.amountPaid}</Txt>
                  </View>
                  <View style={styles.amountMetaRow}>
                    <Pill label={`${CONFIRMATION.discount} off`} background={color.success} foreground={color.surface} />
                    <Txt variant="regular12" color={color.textSecondary}>
                      Amount paid
                    </Txt>
                  </View>
                </View>
              </View>
              <Button
                label={`View confirmation on ${CONFIRMATION.platform}`}
                size="compact"
                trailing={<ExternalLinkIcon size={14} />}
              />
            </View>
          </View>

          <View style={styles.sectionFlush}>
            <Txt variant="semibold16">Getting around in {search.destination.split(',')[0] || 'Goa'}</Txt>
            <View style={styles.rideGrid}>
              {RIDE_BANNERS.map((banner) => (
                <View key={banner.title} style={styles.rideCard}>
                  <View style={styles.rowCenter}>
                    <View style={styles.rideIcon}>
                      <CabIcon size={22} />
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Txt variant="semibold14">Compare Ride Fares</Txt>
                      <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
                        {banner.title}
                      </Txt>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-start' }}>
                    <Txt variant="regular12" color={color.textSecondary}>
                      starting from
                    </Txt>
                    <Txt variant="bold20" style={styles.rideFrom}>
                      {banner.from}
                    </Txt>
                  </View>
                  <View style={styles.rowCenter}>
                    <Txt variant="regular12" color={color.textSecondary}>
                      Compare on
                    </Txt>
                    <View style={{ flexDirection: 'row' }}>
                      {Array.from({ length: banner.providers }).map((_, index) => (
                        <Photo
                          key={index}
                          uri={brandTile}
                          style={[styles.providerDot, index > 0 && { marginLeft: -space.x8 }]}
                        />
                      ))}
                    </View>
                    <View style={{ flex: 1 }} />
                    <Button label={banner.cta} variant="secondary" size="compact" style={styles.rideCta} />
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.mapSection}>
            <Photo uri={mapTile} style={styles.mapBanner} />
          </View>

          <View style={styles.lastSection}>
            <Txt variant="semibold16">Gift cards for your trip</Txt>
            <View style={styles.giftGrid}>
              {TRIP_GIFT_CARDS.map((card) => (
                <View key={card.brand} style={styles.giftCard}>
                  <Photo uri={brandTile} style={styles.giftPhoto} />
                  <Txt variant="semibold14">{card.brand}</Txt>
                  <View>
                    <Txt variant="regular12" color={color.textSecondary}>
                      {card.offerType}
                    </Txt>
                    <Txt variant="bold20" color={color.success} style={{ marginTop: space.x2 }}>
                      {card.discount}
                    </Txt>
                  </View>
                  <Pressable style={styles.giftCta}>
                    <Txt variant="semibold14" color={color.primary} style={styles.giftCtaText}>
                      Buy now
                    </Txt>
                  </Pressable>
                </View>
              ))}
            </View>
            <Button label="View all gift cards" variant="secondary" size="compact" />
            <View style={{ height: space.x80 }} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.floatingWrap} pointerEvents="box-none">
        <Button label="Back to Home" onPress={onGoHome} style={styles.floatingCta} />
      </View>
    </View>
  );
}

const CONFIRMATION_WIDTH = 840;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.page,
  },
  header: {
    backgroundColor: color.surface,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  headerInner: {
    width: '100%',
    maxWidth: CONFIRMATION_WIDTH,
    alignSelf: 'center',
    paddingVertical: space.x12,
    paddingHorizontal: space.x32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    width: '100%',
    maxWidth: CONFIRMATION_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: space.x32,
  },
  successBlock: {
    paddingTop: space.x32,
    paddingBottom: space.x24,
    alignItems: 'center',
    gap: space.x12,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  centered: {
    textAlign: 'center',
  },
  savedPill: {
    backgroundColor: color.success,
    borderRadius: radius.pill,
    paddingVertical: space.x8,
    paddingHorizontal: space.x16,
    marginTop: space.x4,
  },
  section: {
    paddingVertical: space.x24,
    gap: space.x16,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  sectionFlush: {
    paddingVertical: space.x24,
    gap: space.x16,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  hotelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  hotelThumb: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
  },
  hotelMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: space.x4,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.x8,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    backgroundColor: color.successTint,
    borderRadius: radius.pill,
    paddingVertical: space.x8,
    paddingHorizontal: 14,
  },
  datesCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
  },
  dateHalf: {
    flex: 1,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
  },
  dateDivider: {
    borderRightWidth: 1,
    borderRightColor: color.border,
  },
  detailRow: {
    flexDirection: 'row',
    gap: space.x16,
  },
  detailHalf: {
    flex: 1,
    minWidth: 0,
  },
  detailCard: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    padding: space.x16,
    gap: space.x12,
    backgroundColor: color.surface,
  },
  cardLabel: {
    fontSize: 12,
    lineHeight: 16,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  roomThumb: {
    width: 72,
    height: 56,
    borderRadius: radius.md,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: color.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: space.x8,
  },
  platformLogo: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: space.x8,
  },
  amountMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    marginTop: space.x4,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  rideGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.x16,
  },
  rideCard: {
    flexGrow: 1,
    flexBasis: 220,
    maxWidth: 280,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    backgroundColor: color.surface,
    padding: space.x16,
    gap: space.x12,
  },
  rideIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: color.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rideFrom: {
    fontSize: 18,
    lineHeight: 22,
    marginTop: space.x2,
  },
  providerDot: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: color.surface,
  },
  rideCta: {
    borderRadius: radius.pill,
    paddingVertical: space.x8,
    paddingHorizontal: 14,
    minHeight: 0,
  },
  mapSection: {
    paddingVertical: space.x24,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  mapBanner: {
    width: '100%',
    height: 160,
    borderRadius: radius.lg,
  },
  lastSection: {
    paddingTop: space.x24,
    gap: space.x16,
  },
  giftGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.x16,
  },
  giftCard: {
    flexGrow: 1,
    flexBasis: 220,
    maxWidth: 280,
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: radius.lg,
    padding: space.x12,
    gap: space.x12,
  },
  giftPhoto: {
    width: '100%',
    height: 100,
    borderRadius: radius.md,
  },
  giftCta: {
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: radius.lg,
    paddingVertical: 10,
    alignItems: 'center',
  },
  giftCtaText: {
    fontSize: 12,
    lineHeight: 16,
  },
  floatingWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: space.x20,
    alignItems: 'center',
  },
  floatingCta: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    ...shadow.floating,
  },
});
