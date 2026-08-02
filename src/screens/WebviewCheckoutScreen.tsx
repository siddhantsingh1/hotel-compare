import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import type { RootStackParamList } from '../../App';
import { ChevronLeft } from '../components/Icon';
import { Txt } from '../components/Txt';
import { CHECKOUT } from '../data/mock';
import { radius, space } from '../theme/tokens';

/**
 * The webview host chrome and form belong to the booking site, not Buyhatke —
 * these greys are deliberately outside the brand palette. Only the Auto Coupons
 * banner and the traveller auto-fill button are Buyhatke surfaces, and both are
 * reproduced exactly as shipped.
 */
const host = {
  heading: '#45556C',
  body: '#6A7282',
  muted: '#99A1AF',
  border: '#D1D5DC',
  divider: '#E5E7EB',
  fill: '#F3F4F6',
  surface: '#FFFFFF',
  cta: '#6A7282',
  navBar: '#1E2939',
};

const BUYHATKE_PURPLE = '#4F46E5';
const COUPON_YELLOW = '#FFD400';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

export function WebviewCheckoutScreen({ navigation }: Props) {
  const [filled, setFilled] = useState(false);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.couponWrap}>
        <AutoCouponsBanner />
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.titleRow}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={space.x12}>
            <ChevronLeft size={18} color={host.body} />
          </Pressable>
          <Txt variant="semibold18" color={host.heading}>
            Who's travelling?
          </Txt>
        </View>

        <View style={styles.blockInset}>
          <View style={styles.notice}>
            <Txt variant="regular12" color={host.body} style={[styles.hostBody, { flex: 1 }]}>
              Checkout faster with saved travellers.
            </Txt>
            <Txt variant="semibold14" color={host.heading} style={styles.hostBody}>
              Log In
            </Txt>
          </View>
        </View>

        <View style={styles.adultsRow}>
          <Txt variant="semibold18" color={host.heading} style={styles.hostHeading}>
            Adults
          </Txt>
          <Txt variant="regular12" color={host.muted} style={styles.hostBody}>
            ({filled ? 1 : 0}/1 added)
          </Txt>
          <Pressable style={styles.hostButton}>
            <Txt variant="semibold14" color={host.heading} style={styles.hostBody}>
              Add adult
            </Txt>
          </Pressable>
        </View>

        {filled ? (
          <View style={styles.travellerRow}>
            <View style={styles.radioSelected} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Txt variant="semibold16" color={host.heading} style={styles.travellerName}>
                {CHECKOUT.name}
              </Txt>
              <Txt variant="regular12" color={host.muted} style={[styles.hostBody, { marginTop: space.x2 }]}>
                {CHECKOUT.gender}
              </Txt>
            </View>
            <View style={styles.checkbox} />
          </View>
        ) : null}

        <View style={styles.contactBlock}>
          <View>
            <Txt variant="semibold18" color={host.heading} style={styles.hostHeading}>
              Contact Information
            </Txt>
            <Txt variant="regular12" color={host.muted} style={[styles.hostBody, { marginTop: space.x4 }]}>
              Booking updates will be shared here
            </Txt>
          </View>

          <View style={styles.inputWithAction}>
            <Txt
              variant="regular14"
              color={filled ? host.heading : host.muted}
              style={{ flex: 1 }}
              numberOfLines={1}
            >
              {filled ? CHECKOUT.email : 'Email Address'}
            </Txt>
            <Pressable style={styles.autofillButton} onPress={() => setFilled((prev) => !prev)}>
              <AutofillGlyph />
            </Pressable>
          </View>

          <View style={styles.input}>
            <Txt variant="medium14" color={host.heading}>
              +91
            </Txt>
            <View style={styles.inputDivider} />
            <Txt variant="regular14" color={filled ? host.heading : host.muted}>
              {filled ? CHECKOUT.phone : 'Mobile number'}
            </Txt>
          </View>
        </View>

        <View style={styles.gstRow}>
          <Txt variant="semibold18" color={host.heading} style={styles.hostHeading}>
            GST number
          </Txt>
          <Pressable style={styles.hostButton}>
            <Txt variant="semibold14" color={host.heading} style={styles.hostBody}>
              Add GST
            </Txt>
          </Pressable>
        </View>

        <View style={styles.gstNote}>
          <View style={styles.notice}>
            <Txt variant="regular12" color={host.body} style={styles.noteText}>
              <Txt variant="semibold14" color={host.heading} style={styles.hostBody}>
                NOTE:
              </Txt>{' '}
              Use GST number to avail GST benefits & additional savings
            </Txt>
          </View>
        </View>
      </ScrollView>

      <View style={styles.payBar}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Txt variant="bold20" color={host.heading}>
            {filled ? CHECKOUT.filledTotal : CHECKOUT.emptyTotal}
          </Txt>
          <Txt variant="medium12" color={host.body} style={styles.breakup}>
            View breakup
          </Txt>
        </View>
        <Pressable style={styles.continueButton} onPress={() => navigation.navigate('Confirmation')}>
          <Txt variant="semibold14" color={host.surface} style={styles.hostBody}>
            Continue
          </Txt>
        </Pressable>
      </View>

      <BrowserNav onBack={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

function AutoCouponsBanner() {
  return (
    <View style={styles.couponOuter}>
      <View style={styles.couponInner}>
        <Txt variant="regular12" style={styles.sparkle}>
          ✨
        </Txt>
        <Txt variant="semibold14" color="#1A1A1A" style={styles.couponTitle}>
          Auto Coupons
        </Txt>
        <Txt variant="regular12" color={host.body} style={styles.couponBy}>
          by
        </Txt>
        <View style={styles.couponLogo} />
        <Txt variant="regular14" color="#1A1A1A" style={styles.couponTitle}>
          buyhatke
        </Txt>
        <Txt variant="semibold14" color={BUYHATKE_PURPLE} style={[styles.couponTitle, { marginLeft: 'auto' }]}>
          Apply Now →
        </Txt>
      </View>
    </View>
  );
}

function AutofillGlyph() {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none">
      <Circle cx={9.5} cy={6} r={4.5} fill="#FFFFFF" />
      <Path d="M2 19.5a7.5 7.5 0 0115 0z" fill="#FFFFFF" />
      <Circle cx={16.5} cy={15.5} r={5} fill={BUYHATKE_PURPLE} />
      <Path
        d="M16.5 12.8v5.4M13.8 15.5h5.4"
        stroke="#FFC107"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function BrowserNav({ onBack }: { onBack: () => void }) {
  const items: { label: string; paths: string[]; active: boolean; onPress?: () => void }[] = [
    { label: 'Back', paths: ['M12 5l-5 5 5 5'], active: true, onPress: onBack },
    { label: 'Forward', paths: ['M8 5l5 5-5 5'], active: false },
    { label: 'Home', paths: ['M3.5 9.5L10 4l6.5 5.5V16h-13V9.5z'], active: true },
    { label: 'Refresh', paths: ['M16 10a6 6 0 11-1.8-4.3', 'M16 3v3.2h-3.2'], active: true },
    {
      label: 'Info',
      paths: ['M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z', 'M10 9v4.2', 'M10 6.6v.1'],
      active: true,
    },
  ];

  return (
    <View style={styles.browserNav}>
      {items.map((item) => {
        const tint = item.active ? '#FFFFFF' : host.body;
        return (
          <Pressable key={item.label} style={styles.navItem} onPress={item.onPress}>
            <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
              {item.paths.map((d) => (
                <Path
                  key={d}
                  d={d}
                  stroke={tint}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </Svg>
            <Txt variant="regular12" color={tint} style={styles.navLabel}>
              {item.label}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: host.surface,
  },
  scroll: {
    flex: 1,
    backgroundColor: host.surface,
  },
  couponWrap: {
    paddingVertical: 10,
    paddingHorizontal: space.x12,
    backgroundColor: host.surface,
  },
  couponOuter: {
    backgroundColor: COUPON_YELLOW,
    borderRadius: 14,
    padding: space.x8,
  },
  couponInner: {
    backgroundColor: '#F7F8FB',
    borderRadius: 9,
    paddingVertical: 10,
    paddingHorizontal: space.x12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x8,
  },
  sparkle: {
    fontSize: 13,
  },
  couponTitle: {
    fontSize: 13,
  },
  couponBy: {
    fontSize: 10,
  },
  couponLogo: {
    width: 16,
    height: 16,
    borderRadius: radius.sm,
    backgroundColor: BUYHATKE_PURPLE,
  },
  titleRow: {
    padding: space.x16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  blockInset: {
    paddingHorizontal: space.x16,
    paddingBottom: 14,
  },
  notice: {
    backgroundColor: host.fill,
    borderRadius: radius.md,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 19,
  },
  hostBody: {
    fontSize: 13,
    lineHeight: 18,
  },
  hostHeading: {
    fontSize: 17,
    lineHeight: 22,
  },
  adultsRow: {
    paddingTop: 6,
    paddingHorizontal: space.x16,
    paddingBottom: space.x12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  hostButton: {
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: host.border,
    borderRadius: radius.md,
    paddingVertical: 11,
    paddingHorizontal: space.x16,
  },
  travellerRow: {
    paddingHorizontal: space.x16,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
    borderWidth: 6,
    borderColor: host.heading,
  },
  travellerName: {
    fontSize: 15,
    lineHeight: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: host.border,
    borderRadius: radius.sm,
  },
  contactBlock: {
    paddingHorizontal: space.x16,
    gap: space.x12,
  },
  input: {
    borderWidth: 1,
    borderColor: host.border,
    borderRadius: radius.md,
    height: 50,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  inputWithAction: {
    borderWidth: 1,
    borderColor: host.border,
    borderRadius: radius.md,
    height: 50,
    paddingLeft: 14,
    paddingRight: space.x8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  inputDivider: {
    width: 1,
    height: 18,
    backgroundColor: host.divider,
  },
  autofillButton: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: BUYHATKE_PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BUYHATKE_PURPLE,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  gstRow: {
    paddingTop: 22,
    paddingHorizontal: space.x16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  gstNote: {
    paddingTop: space.x12,
    paddingHorizontal: space.x16,
    paddingBottom: space.x24,
  },
  payBar: {
    borderTopWidth: 1,
    borderTopColor: host.divider,
    backgroundColor: host.surface,
    paddingVertical: space.x12,
    paddingHorizontal: space.x16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.x12,
  },
  breakup: {
    marginTop: space.x2,
    textDecorationLine: 'underline',
  },
  continueButton: {
    backgroundColor: host.cta,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: 34,
  },
  browserNav: {
    backgroundColor: host.navBar,
    paddingVertical: 9,
    paddingHorizontal: space.x24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navItem: {
    alignItems: 'center',
    gap: space.x4,
  },
  navLabel: {
    fontSize: 10,
    lineHeight: 12,
  },
});
