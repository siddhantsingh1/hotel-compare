import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Chip, Pill } from '../components/Chip';
import { NoReviewsArt } from '../components/EmptyState';
import { Button, IconButton } from '../components/Button';
import { ChevronRight, DirectionsIcon, PlayIcon, TileGlyph } from '../components/Icon';
import { Photo } from '../components/Photo';
import { Stars } from '../components/Stars';
import { Txt } from '../components/Txt';
import { mapTile } from '../data/images';
import {
  DINING,
  Hotel,
  LANDMARKS,
  LOCATION_FILTERS,
  MEDIA_ITEMS,
  REVIEWS,
  RULES,
  TOP_AMENITIES,
} from '../data/mock';
import { formatDay } from '../state/BookingContext';
import { color, radius, space } from '../theme/tokens';

type StaySearch = { checkIn: string | null; checkOut: string | null };

/** Name, rating, locality and stay-dates block at the top of Hotel Detail. */
export function OverviewSection({
  hotel,
  search,
  roomsLabel,
  guestsLabel,
  onEditStay,
}: {
  hotel: Hotel;
  search: StaySearch;
  roomsLabel: string;
  guestsLabel: string;
  onEditStay: () => void;
}) {
  return (
    <View style={styles.section}>
      <View>
        <Txt variant="bold20">{hotel.name}</Txt>
        <View style={styles.starRow}>
          <Stars count={hotel.starCount} />
          <Txt variant="regular12" color={color.textSecondary}>
            · {hotel.type}
          </Txt>
        </View>
      </View>

      <View style={styles.outlinedRow}>
        <View style={styles.ratingTile}>
          <Txt variant="bold16" color={color.primary}>
            {hotel.guestRating}
          </Txt>
        </View>
        <View style={{ flex: 1 }}>
          <Txt variant="semibold14">{hotel.ratingLabel}</Txt>
          <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
            {hotel.reviewCount} Google reviews
          </Txt>
        </View>
        <ChevronRight size={14} />
      </View>

      <View style={styles.outlinedRow}>
        <Photo uri={mapTile} style={styles.locationThumb} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Txt variant="medium14">{hotel.locality}</Txt>
          <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
            {hotel.detailDistance}
          </Txt>
        </View>
        <IconButton background={color.primaryTint} bordered={false}>
          <DirectionsIcon size={18} />
        </IconButton>
      </View>

      <View style={styles.stayCard}>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.stayHalf, styles.stayDivider]}>
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
          <View style={styles.stayHalf}>
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
        <View style={styles.stayGuests}>
          <View>
            <Txt variant="regular12" color={color.textMuted}>
              Rooms & guests
            </Txt>
            <Txt variant="semibold16" style={{ marginTop: space.x4 }}>
              {roomsLabel} · {guestsLabel}
            </Txt>
          </View>
          <Button
            label="Edit"
            variant="secondary"
            size="compact"
            onPress={onEditStay}
            style={styles.editButton}
          />
        </View>
      </View>
    </View>
  );
}

/**
 * The Hotel Detail content sections (about / media / amenities / reviews /
 * location / dining / rules). Shared by the mobile scroll and the desktop
 * two-column layout so the copy and structure can't drift between them.
 */

export function AboutSection({ hotel, onReadMore }: { hotel: Hotel; onReadMore: () => void }) {
  return (
    <View style={styles.sectionTight}>
      <Txt variant="semibold16">About the property</Txt>
      <Txt variant="regular14" color={color.textSecondary} style={styles.paragraph}>
        {hotel.about}
      </Txt>
      <Pressable onPress={onReadMore} style={styles.textLink}>
        <Txt variant="semibold14" color={color.primary}>
          Read more
        </Txt>
      </Pressable>
    </View>
  );
}

export function MediaSection({ hotel }: { hotel: Hotel }) {
  return (
    <View style={styles.sectionFlush}>
      <Txt variant="semibold16" style={styles.inset}>
        Property media
      </Txt>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
        {MEDIA_ITEMS.map((item, index) => (
          <View key={item} style={{ width: 130 }}>
            <Photo uri={hotel.photos[index % hotel.photos.length]} style={styles.mediaThumb}>
              <View style={styles.playBadge}>
                <PlayIcon size={14} />
              </View>
            </Photo>
            <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x8 }}>
              {item}
            </Txt>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export function AmenitiesSection({ hotel, onViewAll }: { hotel: Hotel; onViewAll: () => void }) {
  return (
    <View style={styles.sectionFlush}>
      <View style={[styles.rowBetween, styles.inset]}>
        <Txt variant="semibold16">{hotel.amenityCount} amenities</Txt>
        <Button
          label="View all"
          variant="secondary"
          size="compact"
          onPress={onViewAll}
          style={styles.editButton}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScrollTight}>
        {TOP_AMENITIES.map((amenity) => (
          <View key={amenity} style={styles.amenityTile}>
            <TileGlyph size={32} />
            <Txt variant="regular12" color={color.textSecondary} style={styles.centered}>
              {amenity}
            </Txt>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export function ReviewsSection({
  hotel,
  reviewSource,
  onChangeSource,
  showsReviews,
  reviewSources,
}: {
  hotel: Hotel;
  reviewSource: string;
  onChangeSource: (source: string) => void;
  showsReviews: boolean;
  reviewSources: readonly string[];
}) {
  return (
    <View style={styles.sectionFlush}>
      <Txt variant="semibold16" style={styles.inset}>
        Ratings & reviews
      </Txt>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScrollTight}>
        {reviewSources.map((source) => (
          <Chip key={source} label={source} active={reviewSource === source} onPress={() => onChangeSource(source)} />
        ))}
      </ScrollView>

      {showsReviews ? (
        <>
          <View style={[styles.outlinedRow, styles.inset]}>
            <Txt variant="bold24">{hotel.guestRating}</Txt>
            <View style={{ flex: 1 }}>
              <Txt variant="semibold14">{hotel.ratingLabel}</Txt>
              <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
                Based on {hotel.reviewCount} Google reviews
              </Txt>
            </View>
          </View>
          <View style={[styles.inset, { gap: space.x12 }]}>
            {REVIEWS.map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.avatar}>
                    <Txt variant="semibold14" color={color.primary} style={styles.avatarText}>
                      {review.initial}
                    </Txt>
                  </View>
                  <Txt variant="medium14">{review.name}</Txt>
                  <Txt variant="regular12" color={color.textMuted} style={{ marginLeft: 'auto' }}>
                    {review.date}
                  </Txt>
                </View>
                <Txt variant="regular14" color={color.textSecondary} style={{ marginTop: space.x8 }}>
                  {review.text}
                </Txt>
              </View>
            ))}
          </View>
          <Pressable style={[styles.inset, styles.textLink]}>
            <Txt variant="semibold14" color={color.primary}>
              See all reviews
            </Txt>
          </Pressable>
        </>
      ) : (
        <NoReviewsFallbacks hotel={hotel} source={reviewSource} />
      )}
    </View>
  );
}

export function LocationSection({ hotel }: { hotel: Hotel }) {
  return (
    <View style={styles.sectionFlush}>
      <Txt variant="semibold16" style={styles.inset}>
        Location
      </Txt>
      <Txt variant="regular14" color={color.textSecondary} style={styles.inset}>
        {hotel.address}
      </Txt>
      <Photo uri={mapTile} style={[styles.mapView, styles.inset]} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScrollTight}>
        {LOCATION_FILTERS.map((filter, index) => (
          <Chip key={filter} label={filter} active={index === 0} />
        ))}
      </ScrollView>
      <View style={styles.inset}>
        {LANDMARKS.map((landmark) => (
          <View key={landmark.name} style={styles.landmarkRow}>
            <View style={styles.landmarkDot}>
              <View style={styles.landmarkDotInner} />
            </View>
            <Txt variant="regular14" style={{ flex: 1 }}>
              {landmark.name}
            </Txt>
            <Txt variant="regular12" color={color.textSecondary}>
              {landmark.distance}
            </Txt>
          </View>
        ))}
      </View>
    </View>
  );
}

export function DiningSection() {
  return (
    <View style={styles.sectionTight}>
      <Txt variant="semibold16">Food & dining</Txt>
      {DINING.map((item) => (
        <View key={item.name} style={styles.outlinedRow}>
          <View style={styles.diningIcon}>
            <TileGlyph size={36} bg={color.highlightTint} mark={color.highlightPressed} />
          </View>
          <View style={{ flex: 1 }}>
            <Txt variant="medium14">{item.name}</Txt>
            <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
              {item.detail}
            </Txt>
          </View>
        </View>
      ))}
    </View>
  );
}

export function RulesSection({ onViewAll, last = true }: { onViewAll: () => void; last?: boolean }) {
  return (
    <View style={[styles.sectionTight, last && styles.lastSection]}>
      <Txt variant="semibold16">Property rules</Txt>
      {RULES.map((rule) => (
        <View key={rule} style={styles.bulletRow}>
          <View style={styles.bullet} />
          <Txt variant="regular14" color={color.textSecondary} style={{ flex: 1 }}>
            {rule}
          </Txt>
        </View>
      ))}
      <Pressable onPress={onViewAll} style={styles.textLink}>
        <Txt variant="semibold14" color={color.primary}>
          View all rules
        </Txt>
      </Pressable>
    </View>
  );
}

export function NoReviewsFallbacks({
  hotel,
  source,
}: {
  hotel: { starCount: number; hasReviews: boolean };
  source: string;
}) {
  return (
    <View style={[styles.inset, { gap: space.x20 }]}>
      <View style={{ gap: space.x8 }}>
        <Txt variant="semibold14" color={color.textMuted} style={styles.kicker}>
          PRIMARY FALLBACK · STAR RATING SHOWN
        </Txt>
        <View style={styles.fallbackCard}>
          <View style={styles.rowCenter}>
            <Stars count={hotel.starCount} size={20} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Txt variant="semibold14">{hotel.starCount}-star property</Txt>
              <Txt variant="regular12" color={color.textSecondary} style={{ marginTop: space.x2 }}>
                No {source} reviews yet
              </Txt>
            </View>
          </View>
          <View style={styles.fallbackDivider}>
            <Txt variant="regular12" color={color.textSecondary}>
              Reviews available on{' '}
              <Txt variant="semibold14" color={color.primary} style={styles.smallText}>
                MakeMyTrip
              </Txt>{' '}
              &{' '}
              <Txt variant="semibold14" color={color.primary} style={styles.smallText}>
                Booking.com
              </Txt>
            </Txt>
          </View>
        </View>
      </View>

      <View style={{ gap: space.x8 }}>
        <Txt variant="semibold14" color={color.textMuted} style={styles.kicker}>
          SECONDARY FALLBACK · NO RATING EITHER
        </Txt>
        <View style={styles.fallbackCard}>
          <View style={styles.rowCenter}>
            <Pill label="Newly listed" background={color.infoTint} foreground={color.info} />
            <Txt variant="regular12" color={color.textSecondary} style={{ flex: 1, minWidth: 0 }}>
              Not rated yet · no reviews on any site
            </Txt>
          </View>
          <View style={styles.fallbackDivider}>
            <Txt variant="regular12" color={color.textSecondary} style={{ lineHeight: 18 }}>
              Ratings will appear here once guests review this property.
            </Txt>
          </View>
        </View>
      </View>

      <View style={{ gap: space.x8 }}>
        <Txt variant="semibold14" color={color.textMuted} style={styles.kicker}>
          ALTERNATE PATH · EMPTY SOURCE TAB
        </Txt>
        <View style={styles.emptySourceCard}>
          <NoReviewsArt />
          <Txt variant="semibold16" style={styles.centered}>
            No {source} reviews yet
          </Txt>
          <Txt variant="regular12" color={color.textSecondary} style={[styles.centered, { lineHeight: 18 }]}>
            Reviews available on MakeMyTrip (320) and Booking.com (118) — switch source above.
          </Txt>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: space.x16,
    gap: space.x16,
    backgroundColor: color.surface,
    borderBottomWidth: space.x8,
    borderBottomColor: color.page,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
    marginTop: 6,
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
  smallText: {
    fontSize: 12,
    lineHeight: 16,
  },
});
