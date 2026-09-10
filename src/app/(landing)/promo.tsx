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

const PERKS: string[] = [
  'Secure payments backed by Paystack',
  'Electricity tokens delivered in seconds',
  'Airtime & data for all four networks',
  'TV subscriptions for DStv, GOtv & StarTimes',
  'Exam registrations for WAEC, JAMB & more',
  '24/7 support from the ZPAY assistant',
];

function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
          <View style={[styles.badge, { backgroundColor: meta.color }]}>
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

function PhoneMockup() {
  const colors = useTheme();
  return (
    <View style={styles.phone}>
      <View style={styles.notch} />
      <View style={styles.mockApp}>
        <LinearGradient colors={['#F5B82E', '#E29A1A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.mockWallet}>
          <Text variant="caption" style={styles.mockWalletLabel}>
            Wallet balance
          </Text>
          <Text variant="heading" style={styles.mockWalletAmount}>
            ₦75,000.00
          </Text>
        </LinearGradient>
        <Text variant="caption" style={[styles.mockSection, { color: colors.textMuted }]}>
          Quick actions
        </Text>
        <View style={styles.mockActions}>
          {ACTIVE_SERVICES.map((type) => {
            const meta = SERVICE_META[type];
            return (
              <View key={type} style={[styles.mockAction, { backgroundColor: colors.surface }]}>
                <Icon name={meta.icon} size={IconSize.sm} color={meta.color} />
                <Text variant="caption" style={{ color: colors.textSecondary }}>
                  {SERVICE_NAMES[type].slice(0, 10)}
                </Text>
              </View>
            );
          })}
        </View>
        <Text variant="caption" style={[styles.mockSection, { color: colors.textMuted }]}>
          Recent transactions
        </Text>
        {[
          { icon: 'flash' as IconName, title: 'IKEDC Prepaid', caption: 'Token delivered', amount: '₦5,000', color: '#FFB020' },
          { icon: 'tv' as IconName, title: 'DStv Premium', caption: 'Subscription active', amount: '₦18,500', color: '#B8B0F2' },
        ].map((row) => (
          <View key={row.title} style={[styles.mockRow, { backgroundColor: colors.surface }]}>
            <View style={[styles.mockRowIcon, { backgroundColor: withAlpha(row.color, 0.18) }]}>
              <Icon name={row.icon} size={IconSize.sm} color={row.color} />
            </View>
            <View style={styles.mockRowText}>
              <Text variant="smallBold" style={styles.mockRowTitle}>
                {row.title}
              </Text>
              <Text variant="caption" style={{ color: colors.textMuted }}>
                {row.caption}
              </Text>
            </View>
            <Text variant="smallBold" style={styles.mockRowAmount}>
              {row.amount}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function PromoLanding() {
  const colors = useTheme();

  return (
    <Screen title={undefined} scroll>
      <View style={styles.topBar}>
        <Link href="/(landing)/promo" asChild>
          <Pressable accessibilityRole="link" accessibilityLabel="ZPAY home">
            <Text variant="title" style={styles.brand}>
              ZPAY
            </Text>
          </Pressable>
        </Link>
        <Link href="/login" asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sign in"
            style={({ pressed }) => [styles.signIn, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
            <Text variant="smallBold" color="accent">
              Sign in
            </Text>
          </Pressable>
        </Link>
      </View>

      <LinearGradient colors={['#151A21', '#201A0F', '#3A2A0C']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.heroGlow} />
        <Text variant="caption" style={styles.heroEyebrow}>
          Everyday payments, one app
        </Text>
        <Text variant="display" style={styles.heroTitle}>
          The app for your{' '}
          <Text variant="display" style={styles.heroTitleAccent}>
            everyday lifestyle
          </Text>
        </Text>
        <Text variant="body" style={styles.heroSub}>
          Pay electricity bills, subscribe to Cable TV, buy airtime &amp; data, and register for WAEC and JAMB — all
          from one wallet.
        </Text>
        <View style={styles.heroActions}>
          <Link href="/signup" asChild>
            <Button label="Get started — it's free" />
          </Link>
          <Link href="/login" asChild>
            <Button label="Log in" variant="outline" />
          </Link>
        </View>
      </LinearGradient>

      <View style={styles.mockup}>
        <PhoneMockup />
      </View>

      <View style={styles.section}>
        <Text variant="heading" style={styles.sectionTitle}>
          Never get disconnected
        </Text>
        <Text variant="body" color="textSecondary" style={styles.sectionSub}>
          Enjoy fast and reliable bill payments. Pay electricity across all 11 DisCos, subscribe to DStv, GOtv &amp;
          StarTimes, and buy airtime &amp; data from MTN, Airtel, Glo and 9mobile.
        </Text>
        <View style={styles.tiles}>
          {ACTIVE_SERVICES.map((type) => (
            <ServiceTile key={type} type={type} caption={SHOWCASE_CAPTION[type]} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="heading" style={styles.sectionTitle}>
          Exams &amp; registration
        </Text>
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
        <Text variant="heading" style={styles.sectionTitle}>
          How it works
        </Text>
        <View style={styles.steps}>
          {STEPS.map((step) => (
            <StepCard key={step.title} step={step} />
          ))}
        </View>
      </View>

      <View style={[styles.perksCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text variant="smallBold" color="accent" style={styles.perksTitle}>
          Why ZPAY
        </Text>
        {PERKS.map((perk) => (
          <View key={perk} style={styles.perkRow}>
            <View style={[styles.perkCheck, { backgroundColor: colors.accentSoft }]}>
              <Icon name="checkmark" size={IconSize.xs} color={colors.accent} />
            </View>
            <Text variant="body" color="textSecondary" style={styles.perkText}>
              {perk}
            </Text>
          </View>
        ))}
      </View>

      <LinearGradient colors={['#F5B82E', '#E29A1A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cta}>
        <Text variant="heading" style={styles.ctaTitle}>
          Start paying bills the easy way
        </Text>
        <Text variant="body" style={styles.ctaSub}>
          Create your free ZPAY account and fund your wallet in minutes.
        </Text>
        <Link href="/signup" asChild>
          <Pressable accessibilityRole="button" accessibilityLabel="Create account" style={({ pressed }) => [styles.ctaButton, pressed && styles.pressed]}>
            <Text variant="bodyBold" style={styles.ctaButtonText}>
              Get started — it's free
            </Text>
          </Pressable>
        </Link>
      </LinearGradient>

      <View style={styles.footer}>
        <View style={styles.footerColumns}>
          <View style={styles.footerCol}>
            <Text variant="smallBold" style={styles.footerTitle}>
              Company
            </Text>
            <Link href="/services" asChild>
              <Pressable accessibilityRole="link">
                <Text variant="caption" color="textSecondary">
                  Services
                </Text>
              </Pressable>
            </Link>
            <Link href="/terms" asChild>
              <Pressable accessibilityRole="link">
                <Text variant="caption" color="textSecondary">
                  Terms of Service
                </Text>
              </Pressable>
            </Link>
            <Link href="/privacy" asChild>
              <Pressable accessibilityRole="link">
                <Text variant="caption" color="textSecondary">
                  Privacy Policy
                </Text>
              </Pressable>
            </Link>
          </View>
          <View style={styles.footerCol}>
            <Text variant="smallBold" style={styles.footerTitle}>
              Contact
            </Text>
            <Text variant="caption" color="textSecondary">
              support@zpay.app
            </Text>
            <Text variant="caption" color="textSecondary">
              Lagos, Nigeria
            </Text>
          </View>
        </View>
        <View style={styles.socials}>
          <Link href="mailto:support@zpay.app" asChild>
            <Pressable accessibilityRole="link" accessibilityLabel="Email ZPAY" style={({ pressed }) => [styles.social, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
              <Icon name="mail" size={IconSize.sm} color={colors.textSecondary} />
            </Pressable>
          </Link>
          <Link href="https://instagram.com" asChild>
            <Pressable accessibilityRole="link" accessibilityLabel="ZPAY on Instagram" style={({ pressed }) => [styles.social, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
              <Icon name="logo-instagram" size={IconSize.sm} color={colors.textSecondary} />
            </Pressable>
          </Link>
          <Link href="https://twitter.com" asChild>
            <Pressable accessibilityRole="link" accessibilityLabel="ZPAY on X" style={({ pressed }) => [styles.social, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
              <Icon name="logo-twitter" size={IconSize.sm} color={colors.textSecondary} />
            </Pressable>
          </Link>
        </View>
        <Text variant="caption" color="textMuted" style={styles.copyright}>
          © 2026 ZPAY Inc. All rights reserved.
        </Text>
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
  signIn: {
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
    shadowOpacity: 0.35,
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
  heroEyebrow: {
    color: '#F5B82E',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  heroTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  heroTitleAccent: {
    color: '#F5B82E',
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
  mockup: {
    alignItems: 'center',
    marginTop: -Spacing.lg,
    position: 'relative',
    zIndex: 2,
  },
  phone: {
    width: 218,
    borderWidth: 6,
    borderRadius: 34,
    borderColor: '#2A3140',
    backgroundColor: '#10141B',
    padding: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 14,
    gap: 8,
  },
  notch: {
    alignSelf: 'center',
    width: 72,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#2A3140',
  },
  mockApp: {
    gap: 8,
  },
  mockWallet: {
    borderRadius: Radii.md,
    padding: Spacing.md,
    gap: 2,
  },
  mockWalletLabel: {
    color: 'rgba(20,20,20,0.7)',
  },
  mockWalletAmount: {
    color: '#141414',
  },
  mockSection: {
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: Spacing.xs,
  },
  mockActions: {
    flexDirection: 'row',
    gap: 6,
  },
  mockAction: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    borderRadius: Radii.sm,
    paddingVertical: Spacing.sm,
  },
  mockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderRadius: Radii.md,
    padding: Spacing.sm,
  },
  mockRowIcon: {
    width: IconSize.xxl,
    height: IconSize.xxl,
    borderRadius: Radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockRowText: {
    flex: 1,
    gap: 1,
  },
  mockRowTitle: {},
  mockRowAmount: {
    color: '#F5B82E',
  },
  section: {
    marginTop: Spacing.xxl,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
  },
  sectionSub: {
    marginBottom: Spacing.lg,
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
  perksCard: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    gap: Spacing.md,
    marginTop: Spacing.xxl,
  },
  perksTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  perkCheck: {
    width: IconSize.lg,
    height: IconSize.lg,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  perkText: {
    flex: 1,
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
    gap: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  footerColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.xl,
  },
  footerCol: {
    gap: Spacing.sm,
  },
  footerTitle: {
    marginBottom: Spacing.xs,
  },
  socials: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  social: {
    width: IconSize.xxl,
    height: IconSize.xxl,
    borderRadius: Radii.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyright: {
    textAlign: 'center',
  },
});