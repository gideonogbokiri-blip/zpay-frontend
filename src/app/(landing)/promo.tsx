import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon, type IconName } from '@/components/Icon';
import { Button, Screen, Text } from '@/components/ui';
import { ZpayLogo } from '@/components/ZpayLogo';
import { ACTIVE_SERVICES, REGISTRATION_SERVICES, SERVICE_META, SERVICE_NAMES } from '@/constants/services';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

const SHOWCASE_CAPTION: Record<string, string> = {
  ELECTRICITY: 'Prepaid & postpaid tokens across all 11 DisCos',
  AIRTIME: 'MTN, Airtel, Glo & 9mobile — instant top-ups',
  DATA: 'Daily and monthly bundles for every network',
  TV: 'DStv, GOtv & StarTimes at your fingertips',
  WAEC: 'Register for WAEC right inside the app',
  JAMB: 'JAMB UTME registration with your profile ID',
  NECO: 'Coming soon',
};

const STEPS: { icon: IconName; title: string; caption: string }[] = [
  { icon: 'wallet', title: 'Fund your wallet', caption: 'Top up securely with your bank card via Paystack.' },
  { icon: 'search', title: 'Verify in seconds', caption: 'Meters and smartcards verify instantly.' },
  { icon: 'flash', title: 'Pay & get tokens', caption: 'Electricity tokens, data and exam pins, delivered.' },
];

const TRUST: { icon: IconName; title: string; caption: string }[] = [
  { icon: 'shield-checkmark', title: 'Secure', caption: 'Paystack-backed card payments' },
  { icon: 'speedometer', title: 'Fast', caption: 'Most services deliver instantly' },
  { icon: 'headset', title: '24/7 support', caption: 'Chat with the ZPAY assistant anytime' },
];

function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function SectionLabel({ children }: { children: string }) {
  const colors = useTheme();
  return (
    <Text variant="caption" color="textMuted" style={[styles.sectionLabel, { color: colors.textMuted }]}>
      {children}
    </Text>
  );
}

function ServiceTile({
  type,
  caption,
  badge,
}: {
  type: string;
  caption: string;
  badge?: string;
}) {
  const colors = useTheme();
  const meta = SERVICE_META[type as keyof typeof SERVICE_META];
  return (
    <View style={[styles.tile, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.tileHeader, { backgroundColor: withAlpha(meta.color, 0.16), borderColor: withAlpha(meta.color, 0.26) }]}>
        <Icon name={meta.icon} size={IconSize.lg} color={meta.color} />
        {badge ? (
          <View style={[styles.badge, { backgroundColor: withAlpha(meta.color, 0.9) }]}>
            <Text variant="caption" style={styles.badgeText}>
              {badge}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.tileBody}>
        <Text variant="bodyBold">{SERVICE_NAMES[type as keyof typeof SERVICE_NAMES]}</Text>
        <Text variant="caption" color="textMuted">
          {caption}
        </Text>
      </View>
    </View>
  );
}

function StepCard({ step }: { step: (typeof STEPS)[number] }) {
  const colors = useTheme();
  return (
    <View style={[styles.step, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.stepIcon, { backgroundColor: colors.accentSoft }]}>
        <Icon name={step.icon} size={IconSize.md} color={colors.accent} />
      </View>
      <Text variant="smallBold" style={styles.stepTitle}>
        {step.title}
      </Text>
      <Text variant="caption" color="textMuted" style={styles.stepCaption}>
        {step.caption}
      </Text>
    </View>
  );
}

export default function PromoLanding() {
  const colors = useTheme();

  return (
    <Screen title={undefined} scroll>
      <View style={styles.topBar}>
        <Text variant="title" style={styles.brand}>
          ZPAY
        </Text>
        <Link href="/login" asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Log in"
            style={({ pressed }) => [styles.loginLink, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
            <Text variant="smallBold" color="accent">
              Log in
            </Text>
          </Pressable>
        </Link>
      </View>

      <LinearGradient colors={['#151A21', '#211A0E', '#3A2A0C']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.heroGlow} />
        <ZpayLogo size={96} />
        <Text variant="display" style={styles.heroTitle}>
          All your bills.
        </Text>
        <Text variant="display" style={styles.heroTitle}>
          One app.
        </Text>
        <Text variant="body" style={styles.heroSub}>
          Electricity tokens, airtime, data, TV and exam registrations — pay in seconds with your ZPAY wallet.
        </Text>
        <View style={styles.heroActions}>
          <Link href="/signup" asChild>
            <Button label="Create free account" />
          </Link>
          <Link href="/services" asChild>
            <Button label="Explore services" variant="outline" />
          </Link>
        </View>
      </LinearGradient>

      <View style={styles.section}>
        <SectionLabel>Everything ZPAY pays</SectionLabel>
        <View style={styles.tiles}>
          {ACTIVE_SERVICES.map((type) => (
            <ServiceTile key={type} type={type} caption={SHOWCASE_CAPTION[type]} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionLabel>Exams &amp; registration</SectionLabel>
        <View style={styles.tiles}>
          {REGISTRATION_SERVICES.map((type) => (
            <ServiceTile
              key={type}
              type={type}
              caption={SHOWCASE_CAPTION[type]}
              badge={type === 'NECO' ? 'Soon' : undefined}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionLabel>How it works</SectionLabel>
        <View style={styles.steps}>
          {STEPS.map((step) => (
            <StepCard key={step.title} step={step} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionLabel>Why ZPAY</SectionLabel>
        <View style={styles.steps}>
          {TRUST.map((item) => (
            <StepCard key={item.title} step={item} />
          ))}
        </View>
      </View>

      <LinearGradient colors={['#F5B82E', '#E29A1A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cta}>
        <Text variant="heading" style={styles.ctaTitle}>
          Start paying bills the easy way
        </Text>
        <Text variant="body" style={styles.ctaSub}>
          Create your free ZPAY account and fund your wallet in minutes.
        </Text>
        <Link href="/signup" asChild>
          <Pressable accessibilityRole="button" accessibilityLabel="Get started" style={({ pressed }) => [styles.ctaButton, pressed && styles.pressed]}>
            <Text variant="bodyBold" style={styles.ctaButtonText}>
              Get started — it's free
            </Text>
          </Pressable>
        </Link>
      </LinearGradient>

      <View style={styles.footer}>
        <Text variant="caption" color="textMuted">
          © 2026 ZPAY Inc. All rights reserved.
        </Text>
        <View style={styles.footerLinks}>
          <Link href="/terms" asChild>
            <Pressable accessibilityRole="link" accessibilityLabel="Terms of Service">
              <Text variant="caption" color="accent">
                Terms
              </Text>
            </Pressable>
          </Link>
          <Text variant="caption" color="textMuted">
            ·
          </Text>
          <Link href="/privacy" asChild>
            <Pressable accessibilityRole="link" accessibilityLabel="Privacy Policy">
              <Text variant="caption" color="accent">
                Privacy
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  brand: {
    letterSpacing: 3,
  },
  loginLink: {
    borderWidth: 1,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  pressed: {
    opacity: 0.8,
  },
  hero: {
    borderRadius: Radii.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    marginTop: Spacing.sm,
  },
  heroGlow: {
    position: 'absolute',
    right: -70,
    top: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  heroTitle: {
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  heroActions: {
    alignSelf: 'stretch',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  section: {
    marginTop: Spacing.xxl,
  },
  sectionLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing.md,
  },
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  tile: {
    width: '48%',
    flexGrow: 1,
    borderRadius: Radii.lg,
    borderWidth: 1,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  tileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radii.md,
    borderWidth: 1,
    padding: Spacing.sm,
  },
  badge: {
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 10,
  },
  tileBody: {
    gap: 2,
  },
  steps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  step: {
    width: '48%',
    flexGrow: 1,
    borderRadius: Radii.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  stepIcon: {
    width: IconSize.xxl,
    height: IconSize.xxl,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTitle: {
    marginTop: Spacing.xs,
  },
  stepCaption: {
    lineHeight: 17,
  },
  cta: {
    borderRadius: Radii.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.xxl,
  },
  ctaTitle: {
    color: '#141414',
    textAlign: 'center',
  },
  ctaSub: {
    color: 'rgba(20,20,20,0.8)',
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#141414',
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    marginTop: Spacing.sm,
  },
  ctaButtonText: {
    color: '#F5B82E',
  },
  footer: {
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.xl,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
});