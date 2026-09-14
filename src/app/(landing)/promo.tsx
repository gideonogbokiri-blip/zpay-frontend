import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View, type DimensionValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from '@/components/Icon';
import { Text } from '@/components/ui';
import { ZpayLogo } from '@/components/ZpayLogo';
import { ACTIVE_SERVICES, REGISTRATION_SERVICES, SERVICE_META, SERVICE_NAMES } from '@/constants/services';
import { IconSize, Radii, Spacing } from '@/theme/tokens';

const SITE_MAX = 1200;
const NAV_HEIGHT = 70;

const C = {
  bg: '#090C10',
  band: '#0D1117',
  surface: '#131821',
  elevated: '#1A212C',
  accent: '#F5B82E',
  accentDark: '#D99A12',
  text: '#FFFFFF',
  secondary: '#94A3B8',
  muted: '#64748B',
  border: 'rgba(255,255,255,0.08)',
  heroTop: '#131821',
  heroBottom: '#0D1117',
};

type SectionKey = 'services' | 'wallet' | 'how' | 'why' | 'support';

const NAV_LINKS: { key: SectionKey; label: string }[] = [
  { key: 'services', label: 'Services' },
  { key: 'wallet', label: 'Wallet' },
  { key: 'how', label: 'How it works' },
  { key: 'why', label: 'Why ZPAY' },
  { key: 'support', label: 'Support' },
];

const SERVICE_DETAILS: Record<string, { desc: string; badges: string[] }> = {
  ELECTRICITY: {
    desc: 'Prepaid & Postpaid power tokens across all DisCos',
    badges: ['IKEDC', 'EKEDC', 'AEDC', 'PHED', 'IBEDC'],
  },
  AIRTIME: {
    desc: 'Instant top-up with zero service fees',
    badges: ['MTN', 'Airtel', 'Glo', '9mobile'],
  },
  DATA: {
    desc: 'Affordable daily, weekly and monthly data bundles',
    badges: ['MTN', 'Airtel', 'Glo', '9mobile'],
  },
  TV: {
    desc: 'DStv, GOtv & StarTimes instant subscription renewal',
    badges: ['DStv', 'GOtv', 'StarTimes'],
  },
  WAEC: {
    desc: 'WAEC registration & scratch card pins',
    badges: ['Registration', 'Result Checker'],
  },
  JAMB: {
    desc: 'JAMB UTME profile creation & PIN vending',
    badges: ['UTME', 'Direct Entry'],
  },
  NECO: {
    desc: 'NECO exam registration pins',
    badges: ['SSCE', 'NECO'],
  },
};

const STEPS = [
  { step: '01', title: 'Fund your wallet', caption: 'Add money securely to your ZPAY wallet via bank transfer or card.' },
  { step: '02', title: 'Choose a service', caption: 'Select electricity, airtime, data, cable TV or education.' },
  { step: '03', title: 'Pay & get your result', caption: 'Get your token, subscription, top-up or receipt instantly.' },
];

const BENEFITS = [
  { icon: 'shield-checkmark' as IconName, title: 'Secure payments', caption: 'Bank-grade security and encryption on every transaction.' },
  { icon: 'flash' as IconName, title: 'Instant delivery', caption: 'Electricity tokens and airtime arrive in seconds.' },
  { icon: 'phone-portrait' as IconName, title: 'All-in-one platform', caption: 'No need to juggle multiple apps for everyday bills.' },
  { icon: 'receipt' as IconName, title: 'Digital receipts', caption: 'Easily track spending with instant digital receipts.' },
  { icon: 'headset' as IconName, title: 'Dedicated support', caption: 'Friendly 24/7 customer assistance when you need help.' },
  { icon: 'globe' as IconName, title: 'Built for Nigeria', caption: 'Optimized specifically for everyday Nigerian payment needs.' },
];

const STATS = [
  { value: '11+', label: 'Power providers' },
  { value: '4', label: 'Mobile networks' },
  { value: '7+', label: 'Everyday services' },
  { value: '99.9%', label: 'Success rate' },
];

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
  variant?: 'primary' | 'ghost' | 'secondary';
  style?: object;
}) {
  const inner = (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        variant === 'primary' && styles.btnPrimary,
        variant === 'secondary' && styles.btnSecondary,
        variant === 'ghost' && styles.btnGhost,
        pressed && styles.pressed,
        style,
      ]}>
      <Text
        variant="bodyBold"
        style={
          variant === 'primary'
            ? styles.btnPrimaryText
            : variant === 'secondary'
            ? styles.btnSecondaryText
            : styles.btnGhostText
        }>
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

function PhoneMockup() {
  return (
    <View style={styles.phone}>
      <View style={styles.notch} />
      <View style={styles.mockApp}>
        <LinearGradient colors={[C.accent, C.accentDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.mockWallet}>
          <Text variant="caption" style={styles.mockWalletLabel}>
            Available balance
          </Text>
          <Text variant="heading" style={styles.mockWalletAmount}>
            ₦124,500.00
          </Text>
        </LinearGradient>
        <Text variant="caption" style={[styles.mockSection, { color: C.muted }]}>
          Quick Actions
        </Text>
        <View style={styles.mockActions}>
          {ACTIVE_SERVICES.map((type) => {
            const meta = SERVICE_META[type];
            return (
              <View key={type} style={[styles.mockAction, { backgroundColor: C.surface, borderColor: C.border }]}>
                <Icon name={meta.icon} size={IconSize.sm} color={meta.color} />
                <Text variant="caption" style={{ color: C.secondary, fontSize: 11 }}>
                  {SERVICE_NAMES[type]}
                </Text>
              </View>
            );
          })}
        </View>
        <Text variant="caption" style={[styles.mockSection, { color: C.muted }]}>
          Recent Activity
        </Text>
        {[
          { icon: 'flash' as IconName, title: 'IKEDC Prepaid', caption: 'Token: 8492-3920', amount: '-₦5,000', color: '#FFB020' },
          { icon: 'phone-portrait' as IconName, title: 'MTN Airtime', caption: '0803 123 4567', amount: '-₦2,000', color: '#4DABF7' },
        ].map((row) => (
          <View key={row.title} style={[styles.mockRow, { backgroundColor: C.surface, borderColor: C.border }]}>
            <View style={[styles.mockRowIcon, { backgroundColor: withAlpha(row.color, 0.16) }]}>
              <Icon name={row.icon} size={IconSize.sm} color={row.color} />
            </View>
            <View style={styles.mockRowText}>
              <Text variant="smallBold" style={{ color: C.text }}>
                {row.title}
              </Text>
              <Text variant="caption" style={{ color: C.muted, fontSize: 10 }}>
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

function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function PromoLanding() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isWide = width >= 900;
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const sectionY = useRef<Partial<Record<SectionKey, number>>>({});

  const scrollTo = (key: SectionKey) => {
    setMenuOpen(false);
    const y = (sectionY.current[key] ?? 0) - (insets.top + NAV_HEIGHT) - 12;
    scrollRef.current?.scrollTo({ y: Math.max(0, y), animated: true });
  };

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
                  <ZpayLogo size={120} />
                </View>
              </Pressable>
            </Link>

            {isWide ? (
              <View style={styles.navLinks}>
                {NAV_LINKS.map((link) => (
                  <Pressable key={link.key} onPress={() => scrollTo(link.key)} accessibilityRole="link" style={styles.navLinkItem}>
                    <Text variant="smallBold" style={{ color: C.secondary }}>
                      {link.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}

            <View style={styles.navRight}>
              {isWide ? (
                <>
                  <SiteButton label="Sign In" href="/login" variant="ghost" style={styles.navSignIn} />
                  <SiteButton label="Get Started" href="/signup" variant="primary" style={styles.navGetStarted} />
                </>
              ) : (
                <Pressable
                  onPress={() => setMenuOpen((v) => !v)}
                  accessibilityRole="button"
                  accessibilityLabel="Toggle menu"
                  style={styles.hamburger}>
                  <Icon name={menuOpen ? 'close' : 'menu'} size={24} color={C.text} />
                </Pressable>
              )}
            </View>
          </View>
        </View>

        {!isWide && menuOpen ? (
          <View style={[styles.mobileMenu, { backgroundColor: C.surface, borderColor: C.border }]}>
            {NAV_LINKS.map((link) => (
              <Pressable key={link.key} onPress={() => scrollTo(link.key)} style={styles.mobileMenuItem}>
                <Text variant="bodyBold" style={{ color: C.text }}>{link.label}</Text>
              </Pressable>
            ))}
            <View style={styles.mobileMenuActions}>
              <SiteButton label="Sign In" href="/login" variant="ghost" style={{ width: '100%', alignItems: 'center' }} />
              <SiteButton label="Get Started — It's Free" href="/signup" variant="primary" style={{ width: '100%', alignItems: 'center' }} />
            </View>
          </View>
        ) : null}
      </View>

      <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HERO SECTION */}
        <LinearGradient colors={[C.heroTop, C.heroBottom]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroBand}>
          <View style={[styles.container, styles.heroInner]}>
            <View style={[styles.heroText, isWide && styles.heroTextWide]}>
              <View style={styles.heroBadge}>
                <Text variant="caption" style={{ color: C.accent, fontWeight: '700' }}>
                  ⚡ Nigeria's Smartest Utility Wallet
                </Text>
              </View>
              <Text variant="display" style={[styles.heroTitle, !isWide && styles.heroTitleNarrow]}>
                Everyday payments,{' '}
                <Text variant="display" style={[styles.heroTitle, { color: C.accent }]}>
                  made simple.
                </Text>
              </Text>
              <Text variant="body" style={[styles.heroSub, { color: C.secondary }]}>
                Pay electricity bills, buy airtime &amp; data, subscribe to TV, and handle exam services — all from one secure ZPAY wallet.
              </Text>
              <View style={[styles.heroCtas, isWide && styles.heroCtasWide]}>
                <SiteButton label="Get Started — It's Free" href="/signup" variant="primary" />
                <SiteButton label="Sign In" href="/login" variant="ghost" />
              </View>
            </View>
            <View style={[styles.heroMock, isWide && styles.heroMockWide]}>
              <PhoneMockup />
            </View>
          </View>
        </LinearGradient>

        {/* TRUST / STATS */}
        <View style={[styles.band, { backgroundColor: C.band, borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.border }]}>
          <View style={styles.container}>
            <View style={[styles.statsGrid, isWide ? styles.statsGridWide : styles.statsGridMobile]}>
              {STATS.map((stat, i) => (
                <View key={stat.label} style={styles.statBox}>
                  <Text variant="display" style={{ color: C.accent, fontSize: isWide ? 42 : 34 }}>
                    {stat.value}
                  </Text>
                  <Text variant="smallBold" style={{ color: C.secondary, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* SERVICES SECTION */}
        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('services')}>
          <View style={styles.container}>
            <View style={styles.headRow}>
              <Text variant="label" style={{ color: C.accent }}>
                Our Services
              </Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                Everything you need, in one place
              </Text>
              <Text variant="body" style={[styles.sectionSub, { color: C.secondary }]}>
                Pay bills, top up and manage everyday services from your ZPAY wallet with instant confirmation.
              </Text>
            </View>

            <View style={[styles.grid, isWide ? styles.grid3 : styles.grid2]}>
              {[...ACTIVE_SERVICES, ...REGISTRATION_SERVICES].map((type) => {
                const meta = SERVICE_META[type];
                const detail = SERVICE_DETAILS[type] ?? { desc: 'Fast & reliable payment', badges: [] };
                return (
                  <View key={type} style={[styles.serviceCard, { backgroundColor: C.surface, borderColor: C.border }]}>
                    <View style={[styles.serviceCardHeader]}>
                      <View style={[styles.serviceIconWrap, { backgroundColor: withAlpha(meta.color, 0.16), borderColor: withAlpha(meta.color, 0.3) }]}>
                        <Icon name={meta.icon} size={IconSize.lg} color={meta.color} />
                      </View>
                      <Text style={{ color: C.accent, fontSize: 18, fontWeight: '700' }}>→</Text>
                    </View>
                    <View style={styles.serviceCardBody}>
                      <Text variant="bodyBold" style={{ color: C.text, fontSize: 18 }}>
                        {SERVICE_NAMES[type]}
                      </Text>
                      <Text variant="caption" style={{ color: C.secondary, lineHeight: 18, marginTop: 4 }}>
                        {detail.desc}
                      </Text>
                    </View>
                    {detail.badges.length > 0 ? (
                      <View style={styles.badgeRow}>
                        {detail.badges.map((b) => (
                          <View key={b} style={[styles.providerBadge, { backgroundColor: C.elevated, borderColor: C.border }]}>
                            <Text variant="caption" style={{ color: C.secondary, fontSize: 10, fontWeight: '700' }}>
                              {b}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* WALLET SHOWCASE */}
        <View style={[styles.band, { backgroundColor: C.band }]} {...banner('wallet')}>
          <View style={[styles.container, styles.showcaseInner, isWide && styles.showcaseWide]}>
            <View style={styles.showcaseText}>
              <Text variant="label" style={{ color: C.accent }}>
                Secure Wallet
              </Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                One wallet. Everything you need.
              </Text>
              <Text variant="body" style={[styles.sectionSub, { color: C.secondary, marginBottom: Sp.md }]} format>
                Fund your ZPAY wallet instantly with bank transfer or debit cards via Paystack. Enjoy lightning-fast bill payments and complete spending visibility.
              </Text>
              {[
                'Fund your wallet securely in seconds',
                'Pay electricity, airtime, data and TV instantly',
                'Keep track of every transaction history',
                'Get instant digital receipts for all payments',
                'Dedicated 24/7 customer assistance',
              ].map((check) => (
                <View key={check} style={styles.checkRow}>
                  <View style={[styles.checkIcon, { backgroundColor: withAlpha(C.accent, 0.15) }]}>
                    <Icon name="checkmark" size={IconSize.xs} color={C.accent} />
                  </View>
                  <Text variant="body" style={{ color: C.text }}>
                    {check}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.showcaseMock}>
              <PhoneMockup />
            </View>
          </View>
        </View>

        {/* HOW IT WORKS */}
        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('how')}>
          <View style={styles.container}>
            <View style={styles.headRow}>
              <Text variant="label" style={{ color: C.accent }}>
                Simple Process
              </Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                How ZPAY works
              </Text>
            </View>
            <View style={[styles.grid, isWide ? styles.grid3 : styles.grid1]}>
              {STEPS.map((s) => (
                <View key={s.step} style={[styles.stepCard, { backgroundColor: C.surface, borderColor: C.border }]}>
                  <Text variant="display" style={{ color: C.accent, opacity: 0.25, fontSize: 44 }}>
                    {s.step}
                  </Text>
                  <Text variant="smallBold" style={{ color: C.text, fontSize: 18, marginTop: Sp.xs }}>
                    {s.title}
                  </Text>
                  <Text variant="caption" style={{ color: C.secondary, lineHeight: 20, marginTop: Sp.xs }}>
                    {s.caption}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* WHY CHOOSE ZPAY */}
        <View style={[styles.band, { backgroundColor: C.band }]} {...banner('why')}>
          <View style={styles.container}>
            <View style={styles.headRow}>
              <Text variant="label" style={{ color: C.accent }}>
                Benefits
              </Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                Why choose ZPAY?
              </Text>
            </View>
            <View style={[styles.grid, isWide ? styles.grid3 : styles.grid2]}>
              {BENEFITS.map((b) => (
                <View key={b.title} style={[styles.benefitCard, { backgroundColor: C.surface, borderColor: C.border }]}>
                  <View style={[styles.benefitIcon, { backgroundColor: withAlpha(C.accent, 0.14) }]}>
                    <Icon name={b.icon} size={IconSize.md} color={C.accent} />
                  </View>
                  <Text variant="smallBold" style={{ color: C.text, fontSize: 16 }}>
                    {b.title}
                  </Text>
                  <Text variant="caption" style={{ color: C.secondary, lineHeight: 20 }}>
                    {b.caption}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* CTA BAND */}
        <LinearGradient colors={[C.accent, C.accentDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaBand}>
          <View style={[styles.container, styles.ctaInner]}>
            <Text variant="heading" style={styles.ctaTitle}>
              Ready to make everyday payments easier?
            </Text>
            <Text variant="body" style={styles.ctaSub}>
              Create your free ZPAY account and get started in less than 2 minutes.
            </Text>
            <SiteButton label="Get Started — It's Free" href="/signup" variant="primary" style={styles.ctaBtn} />
          </View>
        </LinearGradient>

        {/* FOOTER */}
        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('support')}>
          <View style={styles.container}>
            <View style={[styles.footerGrid, isWide && styles.footerGridWide]}>
              <View style={styles.footerBrand}>
                <ZpayLogo size={130} />
                <Text variant="caption" style={{ color: C.secondary, lineHeight: 20, maxWidth: 300, marginTop: Sp.xs }}>
                  One secure wallet for all your everyday payments — bills, top-ups and exam registrations.
                </Text>
              </View>

              <View style={styles.footerCol}>
                <Text variant="smallBold" style={{ color: C.text, marginBottom: Sp.xs }}>Services</Text>
                <Pressable onPress={() => scrollTo('services')}><Text variant="caption" style={{ color: C.secondary }}>Electricity</Text></Pressable>
                <Pressable onPress={() => scrollTo('services')}><Text variant="caption" style={{ color: C.secondary }}>Airtime &amp; Data</Text></Pressable>
                <Pressable onPress={() => scrollTo('services')}><Text variant="caption" style={{ color: C.secondary }}>Cable TV</Text></Pressable>
                <Pressable onPress={() => scrollTo('services')}><Text variant="caption" style={{ color: C.secondary }}>WAEC &amp; JAMB</Text></Pressable>
              </View>

              <View style={styles.footerCol}>
                <Text variant="smallBold" style={{ color: C.text, marginBottom: Sp.xs }}>Company</Text>
                <Link href="/terms" asChild><Pressable><Text variant="caption" style={{ color: C.secondary }}>Terms of Service</Text></Pressable></Link>
                <Link href="/privacy" asChild><Pressable><Text variant="caption" style={{ color: C.secondary }}>Privacy Policy</Text></Pressable></Link>
                <Link href="/login" asChild><Pressable><Text variant="caption" style={{ color: C.secondary }}>Sign In</Text></Pressable></Link>
              </View>

              <View style={styles.footerCol}>
                <Text variant="smallBold" style={{ color: C.text, marginBottom: Sp.xs }}>Support</Text>
                <Text variant="caption" style={{ color: C.secondary }}>support@zpay.app</Text>
                <Text variant="caption" style={{ color: C.secondary }}>Lagos, Nigeria</Text>
                <Text variant="caption" style={{ color: C.secondary }}>Mon – Sat, 8am – 8pm WAT</Text>
              </View>
            </View>

            <View style={[styles.copyrightRow, { borderColor: C.border }]}>
              <Text variant="caption" style={{ color: C.muted }}>
                © 2026 ZPAY Inc. All rights reserved.
              </Text>
              <Text variant="caption" style={{ color: C.muted }}>
                Made with ❤️ in Nigeria
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Sp = Spacing;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  nav: {
    borderBottomWidth: 1,
    backgroundColor: C.bg,
    zIndex: 100,
  },
  container: {
    width: '100%',
    maxWidth: SITE_MAX,
    alignSelf: 'center',
    paddingHorizontal: Sp.xl,
  },
  navInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Sp.sm,
  },
  navBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sp.xxl,
  },
  navLinkItem: {
    paddingVertical: Sp.xs,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sp.md,
  },
  navSignIn: {
    paddingHorizontal: Sp.lg,
    paddingVertical: 8,
  },
  navGetStarted: {
    paddingHorizontal: Sp.xl,
    paddingVertical: 8,
  },
  hamburger: {
    padding: Sp.xs,
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    padding: Sp.xl,
    gap: Sp.lg,
    zIndex: 200,
  },
  mobileMenuItem: {
    paddingVertical: Sp.xs,
  },
  mobileMenuActions: {
    gap: Sp.md,
    marginTop: Sp.sm,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Sp.xxxl,
  },
  heroBand: {
    paddingVertical: 64,
  },
  heroInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Sp.xxl,
  },
  heroText: {
    flex: 1,
    gap: Sp.md,
  },
  heroTextWide: {
    paddingRight: Sp.xl,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: withAlpha(C.accent, 0.12),
    borderWidth: 1,
    borderColor: withAlpha(C.accent, 0.3),
    borderRadius: Radii.full,
    paddingHorizontal: Sp.md,
    paddingVertical: 6,
  },
  heroTitle: {
    color: C.text,
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '900',
  },
  heroTitleNarrow: {
    fontSize: 36,
    lineHeight: 44,
  },
  heroSub: {
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 520,
  },
  heroCtas: {
    gap: Sp.md,
    marginTop: Sp.sm,
  },
  heroCtasWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroMock: {
    alignItems: 'center',
    marginTop: Sp.xxl,
  },
  heroMockWide: {
    marginTop: 0,
  },
  band: {
    paddingVertical: 64,
  },
  headRow: {
    marginBottom: Sp.xxl,
    alignItems: 'flex-start',
    gap: Sp.xs,
  },
  sectionTitle: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    color: C.text,
  },
  sectionSub: {
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 600,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Sp.lg,
  },
  grid3: {
    // handled via width in item
  },
  grid2: {},
  grid1: {},
  serviceCard: {
    width: '31%',
    flexGrow: 1,
    minWidth: 280,
    borderRadius: Radii.xl,
    borderWidth: 1,
    padding: Sp.xl,
    gap: Sp.md,
    justifyContent: 'space-between',
  },
  serviceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceIconWrap: {
    width: 52,
    height: 52,
    borderRadius: Radii.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceCardBody: {
    gap: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: Sp.xs,
  },
  providerBadge: {
    borderRadius: Radii.sm,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  showcaseInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Sp.xxxl,
  },
  showcaseWide: {},
  showcaseText: {
    flex: 1,
    gap: Sp.sm,
  },
  showcaseMock: {
    flex: 1,
    alignItems: 'center',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sp.md,
    marginTop: 4,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCard: {
    width: '31%',
    flexGrow: 1,
    minWidth: 280,
    borderRadius: Radii.xl,
    borderWidth: 1,
    padding: Sp.xl,
    backgroundColor: C.surface,
  },
  benefitCard: {
    width: '31%',
    flexGrow: 1,
    minWidth: 280,
    borderRadius: Radii.xl,
    borderWidth: 1,
    padding: Sp.xl,
    gap: Sp.sm,
  },
  benefitIcon: {
    width: 44,
    height: 44,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Sp.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: Sp.xl,
  },
  statsGridWide: {
    justifyContent: 'space-between',
  },
  statsGridMobile: {
    justifyContent: 'center',
  },
  statBox: {
    alignItems: 'center',
    gap: 4,
    minWidth: 140,
  },
  ctaBand: {
    paddingVertical: 64,
  },
  ctaInner: {
    alignItems: 'center',
    gap: Sp.md,
  },
  ctaTitle: {
    color: '#090C10',
    textAlign: 'center',
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '900',
  },
  ctaSub: {
    color: 'rgba(9,12,16,0.8)',
    textAlign: 'center',
    fontSize: 16,
  },
  ctaBtn: {
    marginTop: Sp.sm,
    backgroundColor: '#090C10',
  },
  footerGrid: {
    flexDirection: 'column',
    gap: Sp.xxl,
  },
  footerGridWide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerBrand: {
    flex: 1,
    gap: Sp.md,
  },
  footerCol: {
    gap: Sp.sm,
  },
  copyrightRow: {
    borderTopWidth: 1,
    marginTop: Sp.xxl,
    paddingTop: Sp.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Sp.md,
  },
  btn: {
    borderRadius: Radii.full,
    paddingHorizontal: Sp.xl,
    paddingVertical: 14,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  btnPrimary: {
    backgroundColor: C.accent,
  },
  btnPrimaryText: {
    color: '#090C10',
    fontWeight: '800',
  },
  btnSecondary: {
    backgroundColor: C.elevated,
    borderWidth: 1,
    borderColor: C.border,
  },
  btnSecondaryText: {
    color: C.text,
    fontWeight: '800',
  },
  btnGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  btnGhostText: {
    color: C.text,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
  phone: {
    width: 240,
    borderWidth: 6,
    borderRadius: 36,
    borderColor: '#2A3140',
    backgroundColor: '#10141B',
    padding: 10,
    gap: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 16,
  },
  notch: {
    alignSelf: 'center',
    width: 80,
    height: 18,
    borderRadius: 10,
    backgroundColor: '#2A3140',
  },
  mockApp: {
    gap: 8,
  },
  mockWallet: {
    borderRadius: Radii.md,
    padding: Sp.md,
    gap: 2,
  },
  mockWalletLabel: {
    color: 'rgba(9,12,16,0.7)',
    fontWeight: '700',
  },
  mockWalletAmount: {
    color: '#090C10',
    fontSize: 20,
    fontWeight: '900',
  },
  mockSection: {
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
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
    paddingVertical: 8,
    borderWidth: 1,
  },
  mockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sp.sm,
    borderRadius: Radii.md,
    padding: 8,
    borderWidth: 1,
  },
  mockRowIcon: {
    width: 32,
    height: 32,
    borderRadius: Radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockRowText: {
    flex: 1,
    gap: 1,
  },
});
