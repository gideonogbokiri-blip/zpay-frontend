import { Link } from 'expo-router';
import { useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View, type DimensionValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from '@/components/Icon';
import { Text } from '@/components/ui';
import { ZpayLogo } from '@/components/ZpayLogo';
import { ACTIVE_SERVICES, REGISTRATION_SERVICES, SERVICE_META, SERVICE_NAMES } from '@/constants/services';
import { IconSize, Radii, Spacing } from '@/theme/tokens';

const SITE_MAX = 1100;
const NAV_HEIGHT = 60;

const C = {
  bg: '#090C10',
  band: '#0D1117',
  surface: '#11151B',
  elevated: '#151A21',
  scrap: '#1B2028',
  accent: '#F5B82E',
  accentDark: '#D99A12',
  text: '#FFFFFF',
  secondary: '#94A3B8',
  muted: '#64748B',
  border: 'rgba(255,255,255,0.10)',
  heroTop: '#141A21',
  heroBottom: '#201A0F',
};

type SectionKey = 'services' | 'exams' | 'how' | 'contact';

const NAV_LINKS: { key: SectionKey; label: string }[] = [
  { key: 'services', label: 'Services' },
  { key: 'exams', label: 'Exams' },
  { key: 'how', label: 'How it works' },
  { key: 'contact', label: 'Contact' },
];

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
  { icon: 'wallet', title: 'Fund your wallet', caption: 'Top up securely with your bank card via Paystack. Balances credit instantly.' },
  { icon: 'search', title: 'Verify in seconds', caption: 'Meters and smartcards verify automatically, so numbers are always right.' },
  { icon: 'flash', title: 'Pay & get tokens', caption: 'Electricity tokens, data and exam pins are delivered straight to your receipt.' },
];

const PERKS: string[] = [
  'Secure payments backed by Paystack',
  'Electricity tokens delivered in seconds',
  'Airtime & data for all four networks',
  'TV subscriptions for DStv, GOtv & StarTimes',
  'Exam registrations for WAEC & JAMB',
  '24/7 support from the ZPAY assistant',
];

const STATS: { value: string; label: string }[] = [
  { value: '11', label: 'Power DisCos' },
  { value: '4', label: 'Mobile networks' },
  { value: '7', label: 'Everyday services' },
  { value: '1', label: 'Wallet to rule them all' },
];

function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function SiteButton({
  label,
  onPress,
  href,
  variant = 'primary',
  style,
}: {
  label: string;
  onPress?: () => void;
  href?: string;
  variant?: 'primary' | 'ghost';
  style?: object;
}) {
  const inner = (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        variant === 'primary' ? styles.btnPrimary : styles.btnGhost,
        pressed && styles.pressed,
        style,
      ]}>
      <Text variant="bodyBold" style={variant === 'primary' ? styles.btnPrimaryText : styles.btnGhostText}>
        {label}
      </Text>
    </Pressable>
  );
  if (href) {
    return (
      <Link href={href} asChild>
        {inner}
      </Link>
    );
  }
  return inner;
}

function ServiceTile({
  type,
  caption,
  badge,
  width,
}: {
  type: string;
  caption: string;
  badge?: string;
  width: DimensionValue;
}) {
  const meta = SERVICE_META[type as keyof typeof SERVICE_META];
  return (
    <View style={[styles.tile, { width, backgroundColor: C.surface, borderColor: C.border }]}>
      <View
        style={[
          styles.tileIcon,
          { backgroundColor: withAlpha(meta.color, 0.16), borderColor: withAlpha(meta.color, 0.28) },
        ]}>
        <Icon name={meta.icon} size={IconSize.lg} color={meta.color} />
      </View>
      <View style={styles.tileBody}>
        <View style={styles.tileTitleRow}>
          <Text variant="bodyBold" style={{ color: C.text }}>
            {SERVICE_NAMES[type as keyof typeof SERVICE_NAMES]}
          </Text>
          {badge ? (
            <View style={[styles.badge, { backgroundColor: meta.color }]}>
              <Text variant="caption" style={styles.badgeText}>
                {badge}
              </Text>
            </View>
          ) : null}
        </View>
        <Text variant="caption" style={{ color: C.secondary, lineHeight: 18 }}>
          {caption}
        </Text>
      </View>
    </View>
  );
}

function StepCard({ step, width }: { step: (typeof STEPS)[number]; width: DimensionValue }) {
  return (
    <View style={[styles.step, { width, backgroundColor: C.surface, borderColor: C.border }]}>
      <View style={[styles.stepIcon, { backgroundColor: withAlpha(C.accent, 0.14) }]}>
        <Icon name={step.icon} size={IconSize.md} color={C.accent} />
      </View>
      <Text variant="smallBold" style={[styles.stepTitle, { color: C.text }]}>
        {step.title}
      </Text>
      <Text variant="caption" style={{ color: C.secondary, lineHeight: 18 }}>
        {step.caption}
      </Text>
    </View>
  );
}

function PhoneMockup() {
  return (
    <View style={styles.phone}>
      <View style={styles.notch} />
      <View style={styles.mockApp}>
        <LinearGradient colors={[C.accent, C.accentDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.mockWallet}>
          <Text variant="caption" style={styles.mockWalletLabel}>
            Wallet balance
          </Text>
          <Text variant="heading" style={styles.mockWalletAmount}>
            ₦75,000.00
          </Text>
        </LinearGradient>
        <Text variant="caption" style={[styles.mockSection, { color: C.muted }]}>
          Quick actions
        </Text>
        <View style={styles.mockActions}>
          {ACTIVE_SERVICES.map((type) => {
            const meta = SERVICE_META[type];
            return (
              <View key={type} style={[styles.mockAction, { backgroundColor: C.surface }]}>
                <Icon name={meta.icon} size={IconSize.sm} color={meta.color} />
                <Text variant="caption" style={{ color: C.secondary }}>
                  {SERVICE_NAMES[type].slice(0, 10)}
                </Text>
              </View>
            );
          })}
        </View>
        <Text variant="caption" style={[styles.mockSection, { color: C.muted }]}>
          Recent transactions
        </Text>
        {[
          { icon: 'flash' as IconName, title: 'IKEDC Prepaid', caption: 'Token delivered', amount: '₦5,000', color: '#FFB020' },
          { icon: 'tv' as IconName, title: 'DStv Premium', caption: 'Subscription active', amount: '₦18,500', color: '#B8B0F2' },
        ].map((row) => (
          <View key={row.title} style={[styles.mockRow, { backgroundColor: C.surface }]}>
            <View style={[styles.mockRowIcon, { backgroundColor: withAlpha(row.color, 0.18) }]}>
              <Icon name={row.icon} size={IconSize.sm} color={row.color} />
            </View>
            <View style={styles.mockRowText}>
              <Text variant="smallBold" style={{ color: C.text }}>
                {row.title}
              </Text>
              <Text variant="caption" style={{ color: C.muted }}>
                {row.caption}
              </Text>
            </View>
            <Text variant="smallBold" style={{ color: C.accent }}>
              {row.amount}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function PromoLanding() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isWide = width >= 860;

  const scrollRef = useRef<ScrollView>(null);
  const sectionY = useRef<Partial<Record<SectionKey, number>>>({});

  const scrollTo = (key: SectionKey) => {
    const y = (sectionY.current[key] ?? 0) - (insets.top + NAV_HEIGHT) - 8;
    scrollRef.current?.scrollTo({ y: Math.max(0, y), animated: true });
  };

  const navTop = insets.top + NAV_HEIGHT;

  const banner = (key: SectionKey) => ({
    onLayout: (e: { nativeEvent: { layout: { y: number } } }) => {
      sectionY.current[key] = e.nativeEvent.layout.y;
    },
  });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: C.bg }]}>
      <View style={[styles.nav, { paddingTop: insets.top, borderColor: C.border }]}>
        <View style={styles.container}>
          <View style={styles.navInner}>
            <Link href="/(landing)/promo" asChild>
              <Pressable accessibilityRole="link" accessibilityLabel="ZPAY home">
                <View style={styles.navBrand}>
                  <ZpayLogo size={30} />
                  <Text variant="title" style={{ color: C.text, letterSpacing: 3 }}>
                    ZPAY
                  </Text>
                </View>
              </Pressable>
            </Link>
            {isWide ? (
              <View style={styles.navLinks}>
                {NAV_LINKS.map((link) => (
                  <Pressable key={link.key} onPress={() => scrollTo(link.key)} accessibilityRole="link">
                    <Text variant="smallBold" style={{ color: C.secondary }}>
                      {link.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
            <SiteButton label={isWide ? 'Sign in' : 'Sign in'} href="/login" variant="ghost" style={styles.navSignIn} />
          </View>
        </View>
      </View>

      <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[C.heroTop, C.heroBottom]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroBand}>
          <View style={[styles.container, styles.heroInner]}>
            <View style={[styles.heroText, isWide && styles.heroTextWide]}>
              <Text variant="label" style={{ color: C.accent }}>
                Everyday payments, one app
              </Text>
              <Text variant="display" style={[styles.heroTitle, !isWide && styles.heroTitleNarrow]}>
                The app for your{' '}
                <Text variant="display" style={[styles.heroTitle, { color: C.accent }]}>
                  everyday lifestyle
                </Text>
              </Text>
              <Text variant="body" style={[styles.heroSub, { color: 'rgba(255,255,255,0.85)' }]}>
                Pay electricity bills, subscribe to Cable TV, buy airtime &amp; data, and register for WAEC and JAMB —
                all from a single wallet.
              </Text>
              <View style={[styles.heroCtas, isWide && styles.heroCtasWide]}>
                <SiteButton label="Get started — it's free" href="/signup" />
                <SiteButton label="Log in" href="/login" variant="ghost" />
              </View>
            </View>
            <View style={[styles.heroMock, isWide && styles.heroMockWide]}>
              <PhoneMockup />
            </View>
          </View>
        </LinearGradient>

        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('services')}>
          <View style={styles.container}>
            <View style={styles.headRow}>
              <View style={styles.headText}>
                <Text variant="label" style={{ color: C.accent }}>
                  Bill payments
                </Text>
                <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                  Never get disconnected
                </Text>
                <Text variant="body" style={[styles.sectionSub, { color: C.secondary }]}>
                  Enjoy fast and reliable bill payments — electricity across all 11 DisCos, Cable TV for DStv, GOtv
                  &amp; StarTimes, and airtime &amp; data for every network.
                </Text>
              </View>
            </View>
            <View style={[styles.grid, isWide ? styles.grid4 : styles.grid2]}>
              {ACTIVE_SERVICES.map((type) => (
                <ServiceTile key={type} type={type} caption={SHOWCASE_CAPTION[type]} width={isWide ? '23%' : '47%'} />
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.band, { backgroundColor: C.band }]} {...banner('exams')}>
          <View style={styles.container}>
            <View style={styles.headRow}>
              <View style={styles.headText}>
                <Text variant="label" style={{ color: C.accent }}>
                  Education
                </Text>
                <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                  Exams &amp; registrations
                </Text>
                <Text variant="body" style={[styles.sectionSub, { color: C.secondary }]}>
                  Register for WAEC and JAMB without leaving the app — pins and profiles delivered directly to your
                  receipt.
                </Text>
              </View>
            </View>
            <View style={[styles.grid, isWide ? styles.grid3 : styles.grid2]}>
              {REGISTRATION_SERVICES.map((type) => (
                <ServiceTile
                  key={type}
                  type={type}
                  caption={SHOWCASE_CAPTION[type]}
                  badge={type === 'NECO' ? 'Soon' : undefined}
                  width={isWide ? '30%' : '47%'}
                />
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('how')}>
          <View style={styles.container}>
            <View style={styles.headRow}>
              <View style={styles.headText}>
                <Text variant="label" style={{ color: C.accent }}>
                  Simple &amp; fast
                </Text>
                <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                  How it works
                </Text>
              </View>
            </View>
            <View style={[styles.grid, isWide ? styles.grid3 : styles.grid1]}>
              {STEPS.map((step) => (
                <StepCard key={step.title} step={step} width={isWide ? '30%' : '100%'} />
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.band, { backgroundColor: C.band }]}>
          <View style={[styles.container, isWide && styles.whyWide]}>
            <View style={styles.whyText}>
              <Text variant="label" style={{ color: C.accent }}>
                Why ZPAY
              </Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                Built for your everyday bills
              </Text>
              {PERKS.map((perk) => (
                <View key={perk} style={styles.perkRow}>
                  <View style={[styles.perkCheck, { backgroundColor: withAlpha(C.accent, 0.14) }]}>
                    <Icon name="checkmark" size={IconSize.xs} color={C.accent} />
                  </View>
                  <Text variant="body" style={{ color: C.secondary }}>
                    {perk}
                  </Text>
                </View>
              ))}
            </View>
            <View style={[styles.statsCard, { backgroundColor: C.elevated, borderColor: C.border }]}>
              {STATS.map((stat, i) => (
                <View key={stat.label}>
                  {i > 0 ? <View style={[styles.statDivider, { backgroundColor: C.border }]} /> : null}
                  <View style={styles.statItem}>
                    <Text variant={isWide ? 'display' : 'heading'} style={{ color: C.accent }}>
                      {stat.value}
                    </Text>
                    <Text variant="caption" style={{ color: C.secondary }}>
                      {stat.label}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <LinearGradient colors={[C.accent, C.accentDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaBand}>
          <View style={[styles.container, styles.ctaInner]}>
            <Text variant="heading" style={styles.ctaTitle}>
              Start paying bills the easy way
            </Text>
            <Text variant="body" style={styles.ctaSub}>
              Create your free ZPAY account and fund your wallet in minutes.
            </Text>
            <SiteButton label="Get started — it's free" href="/signup" style={styles.ctaButton} />
          </View>
        </LinearGradient>

        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('contact')}>
          <View style={styles.container}>
            <View style={[styles.footerGrid, isWide && styles.footerGridWide]}>
              <View style={styles.footerBrand}>
                <View style={styles.navBrand}>
                  <ZpayLogo size={32} />
                  <Text variant="title" style={{ color: C.text, letterSpacing: 3 }}>
                    ZPAY
                  </Text>
                </View>
                <Text variant="caption" style={{ color: C.secondary, lineHeight: 18, paddingRight: Spacing.lg }}>
                  One wallet for all your everyday payments — bills, top-ups and exam registrations.
                </Text>
                <View style={styles.socials}>
                  <Link href="mailto:support@zpay.app" asChild>
                    <Pressable accessibilityRole="link" accessibilityLabel="Email ZPAY" style={[styles.social, { borderColor: C.border }]}>
                      <Icon name="mail" size={IconSize.sm} color={C.secondary} />
                    </Pressable>
                  </Link>
                  <Link href="https://instagram.com" asChild>
                    <Pressable accessibilityRole="link" accessibilityLabel="ZPAY on Instagram" style={[styles.social, { borderColor: C.border }]}>
                      <Icon name="logo-instagram" size={IconSize.sm} color={C.secondary} />
                    </Pressable>
                  </Link>
                  <Link href="https://twitter.com" asChild>
                    <Pressable accessibilityRole="link" accessibilityLabel="ZPAY on X" style={[styles.social, { borderColor: C.border }]}>
                      <Icon name="logo-twitter" size={IconSize.sm} color={C.secondary} />
                    </Pressable>
                  </Link>
                </View>
              </View>
              <View style={styles.footerCol}>
                <Text variant="smallBold" style={[styles.footerTitle, { color: C.text }]}>
                  Company
                </Text>
                <Pressable onPress={scrollTo.bind(null, 'services')} accessibilityRole="link">
                  <Text variant="caption" style={{ color: C.secondary }}>
                    Services
                  </Text>
                </Pressable>
                <Link href="/terms" asChild>
                  <Pressable accessibilityRole="link">
                    <Text variant="caption" style={{ color: C.secondary }}>
                      Terms of Service
                    </Text>
                  </Pressable>
                </Link>
                <Link href="/privacy" asChild>
                  <Pressable accessibilityRole="link">
                    <Text variant="caption" style={{ color: C.secondary }}>
                      Privacy Policy
                    </Text>
                  </Pressable>
                </Link>
                <Link href="/signup" asChild>
                  <Pressable accessibilityRole="link">
                    <Text variant="caption" style={{ color: C.secondary }}>
                      Create account
                    </Text>
                  </Pressable>
                </Link>
              </View>
              <View style={styles.footerCol}>
                <Text variant="smallBold" style={[styles.footerTitle, { color: C.text }]}>
                  Contact
                </Text>
                <Pressable onPress={scrollTo.bind(null, 'contact')} accessibilityRole="link">
                  <Text variant="caption" style={{ color: C.secondary }}>
                    support@zpay.app
                  </Text>
                </Pressable>
                <Text variant="caption" style={{ color: C.secondary }}>
                  Lagos, Nigeria
                </Text>
                <Text variant="caption" style={{ color: C.secondary }}>
                  Mon – Sat, 8am – 8pm WAT
                </Text>
              </View>
            </View>
            <View style={[styles.copyrightRow, { borderColor: C.border }]}>
              <Text variant="caption" style={{ color: C.muted }}>
                © 2026 ZPAY Inc. All rights reserved.
              </Text>
              <Text variant="caption" style={{ color: C.muted }}>
                Made in Nigeria
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  nav: {
    borderBottomWidth: 1,
  },
  navInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  navBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxl,
  },
  navSignIn: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 6,
  },
  container: {
    width: '100%',
    maxWidth: SITE_MAX,
    alignSelf: 'center',
    paddingHorizontal: Spacing.xl,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
  heroBand: {
    paddingVertical: Spacing.huge,
  },
  heroInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.xxl,
    paddingVertical: Spacing.lg,
  },
  heroText: {
    flex: 1,
    gap: Spacing.lg,
  },
  heroTextWide: {
    paddingRight: Spacing.xxl,
  },
  heroTitle: {
    color: C.text,
  },
  heroTitleNarrow: {
    fontSize: 34,
    lineHeight: 40,
  },
  heroSub: {
    maxWidth: 480,
    lineHeight: 26,
  },
  heroCtas: {
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  heroCtasWide: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  heroMock: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  heroMockWide: {
    marginTop: 0,
  },
  band: {
    paddingVertical: Spacing.giant,
  },
  headRow: {
    marginBottom: Spacing.xxl,
  },
  headText: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    marginBottom: Spacing.xs,
  },
  sectionSub: {
    maxWidth: 620,
    lineHeight: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: Spacing.lg,
  },
  grid4: {
    columnGap: Spacing.lg,
  },
  grid3: {
    columnGap: Spacing.lg,
  },
  grid2: {
    columnGap: Spacing.md,
  },
  grid1: {
    rowGap: Spacing.md,
  },
  tile: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    gap: Spacing.md,
    flexShrink: 0,
    flexGrow: 1,
  },
  tileIcon: {
    width: IconSize.xxl,
    height: IconSize.xxl,
    borderRadius: Radii.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileBody: {
    gap: Spacing.xs,
  },
  tileTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
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
  step: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    padding: Spacing.xl,
    gap: Spacing.sm,
    flexGrow: 1,
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
  whyWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xxxl,
  },
  whyText: {
    flex: 1,
    gap: Spacing.md,
  },
  statsCard: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    minWidth: 320,
    overflow: 'hidden',
  },
  statItem: {
    padding: Spacing.xl,
    gap: Spacing.xs,
  },
  statDivider: {
    height: 1,
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
  ctaBand: {
    paddingVertical: Spacing.huge,
  },
  ctaInner: {
    alignItems: 'center',
    gap: Spacing.md,
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
    marginTop: Spacing.sm,
  },
  footerGrid: {
    flexDirection: 'column',
    gap: Spacing.xxl,
  },
  footerGridWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerBrand: {
    flex: 1,
    gap: Spacing.md,
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
  copyrightRow: {
    borderTopWidth: 1,
    marginTop: Spacing.xxl,
    paddingTop: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  btn: {
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  btnPrimary: {
    backgroundColor: C.accent,
  },
  btnPrimaryText: {
    color: '#141414',
  },
  btnGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  btnGhostText: {
    color: C.text,
  },
  pressed: {
    opacity: 0.8,
  },
  phone: {
    width: 218,
    borderWidth: 6,
    borderRadius: 34,
    borderColor: '#2A3140',
    backgroundColor: '#10141B',
    padding: 8,
    gap: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 16,
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
});