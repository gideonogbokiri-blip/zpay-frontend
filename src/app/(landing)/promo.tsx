import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Icon, type IconName } from '@/components/Icon';
import { Text } from '@/components/ui';
import { ZpayLogo } from '@/components/ZpayLogo';
import { ACTIVE_SERVICES, REGISTRATION_SERVICES, SERVICE_META, SERVICE_NAMES } from '@/constants/services';
import { IconSize, Radii, Spacing } from '@/theme/tokens';

const SITE_MAX = 1200;
const NAV_HEIGHT = 76;

const C = {
  bg: '#080C14',
  surface: '#111827',
  cardBg: '#161E2E',
  green: '#00C54C', // Vibrant OPay/PalmPay Green
  gold: '#F5B82E', // ZPAY Gold
  text: '#FFFFFF',
  secondary: '#94A3B8',
  muted: '#64748B',
  border: 'rgba(255,255,255,0.08)',
  greenGlow: 'rgba(0, 197, 76, 0.15)',
};

type SectionKey = 'services' | 'features' | 'how' | 'why' | 'support';

const NAV_LINKS: { key: SectionKey; label: string }[] = [
  { key: 'services', label: 'Services' },
  { key: 'features', label: 'Features' },
  { key: 'how', label: 'How it Works' },
  { key: 'why', label: 'Why ZPAY' },
  { key: 'support', label: 'Support' },
];

const SERVICE_DETAILS: Record<string, { desc: string; badges: string[] }> = {
  ELECTRICITY: {
    desc: 'Instant prepaid & postpaid tokens across all 11 DisCos.',
    badges: ['IKEDC', 'EKEDC', 'AEDC', 'PHED', 'IBEDC', 'KEDCO'],
  },
  AIRTIME: {
    desc: 'Instant top-up for all mobile networks with cash-back.',
    badges: ['MTN', 'Airtel', 'Glo', '9mobile'],
  },
  DATA: {
    desc: 'Affordable high-speed internet bundles instantly delivered.',
    badges: ['MTN', 'Airtel', 'Glo', '9mobile'],
  },
  TV: {
    desc: 'DStv, GOtv & StarTimes instant cable TV subscription.',
    badges: ['DStv', 'GOtv', 'StarTimes'],
  },
  WAEC: {
    desc: 'WAEC registration & scratch card PIN delivery.',
    badges: ['Registration', 'Result Checker'],
  },
  JAMB: {
    desc: 'JAMB UTME profile creation & PIN vending.',
    badges: ['UTME', 'Direct Entry'],
  },
  NECO: {
    desc: 'NECO SSCE exam registration pins.',
    badges: ['SSCE', 'NECO'],
  },
};

const STEPS = [
  { step: '01', title: 'Fund Your Wallet', caption: 'Add funds securely via bank transfer or debit card in seconds.' },
  { step: '02', title: 'Select a Service', caption: 'Choose electricity, airtime, data, cable TV, or exam registration.' },
  { step: '03', title: 'Instant Delivery', caption: 'Receive your tokens, pins, or top-up instantly on screen & via SMS.' },
];

const WHY_ITEMS = [
  { icon: 'shield-checkmark', title: 'Bank-Grade Security', desc: 'Encrypted transactions backed by Paystack.' },
  { icon: 'flash', title: 'Instant Delivery', desc: 'Zero wait time for electricity tokens and top-ups.' },
  { icon: 'wallet', title: 'All-in-One Wallet', desc: 'Manage every monthly utility from a single balance.' },
  { icon: 'receipt', title: 'Digital Receipts', desc: 'Instant itemized receipts for effortless tracking.' },
  { icon: 'headset', title: '24/7 Support', desc: 'Dedicated customer success team ready to assist.' },
  { icon: 'globe', title: 'Built for Nigeria', desc: 'Optimized specifically for everyday Nigerian payment workflows.' },
];

const STATS = [
  { value: '11+', label: 'Power DisCos' },
  { value: '4', label: 'Mobile Networks' },
  { value: '7+', label: 'Everyday Services' },
  { value: '99.9%', label: 'Uptime SLA' },
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
  const [tab, setTab] = useState<'ELECTRICITY' | 'AIRTIME'>('ELECTRICITY');

  return (
    <View style={styles.phone}>
      <View style={styles.notch} />
      <View style={styles.mockApp}>
        <LinearGradient colors={[C.green, '#047857']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.mockWallet}>
          <Text variant="caption" style={styles.mockWalletLabel}>
            Available Balance
          </Text>
          <Text variant="heading" style={styles.mockWalletAmount}>
            ₦184,500.00
          </Text>
        </LinearGradient>

        <View style={styles.mockTabs}>
          <Pressable onPress={() => setTab('ELECTRICITY')} style={[styles.mockTabBtn, tab === 'ELECTRICITY' && styles.mockTabActive]}>
            <Text variant="caption" style={{ color: tab === 'ELECTRICITY' ? '#FFFFFF' : C.secondary, fontWeight: '700', fontSize: 11 }}>Power</Text>
          </Pressable>
          <Pressable onPress={() => setTab('AIRTIME')} style={[styles.mockTabBtn, tab === 'AIRTIME' && styles.mockTabActive]}>
            <Text variant="caption" style={{ color: tab === 'AIRTIME' ? '#FFFFFF' : C.secondary, fontWeight: '700', fontSize: 11 }}>Airtime</Text>
          </Pressable>
        </View>

        {tab === 'ELECTRICITY' ? (
          <View style={styles.mockCardResult}>
            <Text variant="caption" style={{ color: C.green, fontWeight: '700' }}>✓ IKEDC Token Generated</Text>
            <Text variant="smallBold" style={{ color: C.text, letterSpacing: 1 }}>4819-2094-8591</Text>
          </View>
        ) : (
          <View style={styles.mockCardResult}>
            <Text variant="caption" style={{ color: C.green, fontWeight: '700' }}>✓ MTN Top-up Successful</Text>
            <Text variant="smallBold" style={{ color: C.text }}>₦5,000 sent to 08031234567</Text>
          </View>
        )}

        <Text variant="caption" style={[styles.mockSection, { color: C.muted }]}>
          Quick Services
        </Text>
        <View style={styles.mockActions}>
          {ACTIVE_SERVICES.map((type) => {
            const meta = SERVICE_META[type];
            return (
              <View key={type} style={[styles.mockAction, { backgroundColor: C.cardBg, borderColor: C.border }]}>
                <Icon name={meta.icon} size={IconSize.sm} color={meta.color} />
                <Text variant="caption" style={{ color: C.secondary, fontSize: 10 }}>
                  {SERVICE_NAMES[type]}
                </Text>
              </View>
            );
          })}
        </View>
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
  const isWide = width >= 960;
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
                  <ZpayLogo size={130} />
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
                  <Ionicons name={menuOpen ? 'close' : 'menu'} size={24} color={C.text} />
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
        <View style={styles.heroSection}>
          <View style={styles.heroGlowBackdrop} />
          <View style={[styles.container, styles.heroInner]}>
            <View style={[styles.heroText, isWide && styles.heroTextWide]}>
              <View style={styles.topBadge}>
                <View style={styles.pulseDot} />
                <Text variant="caption" style={{ color: C.green, fontWeight: '700', fontSize: 12 }}>
                  ⚡ Nigeria's #1 Utility &amp; Bills App · 0% Fee
                </Text>
              </View>

              <Text variant="display" style={[styles.heroTitle, !isWide && styles.heroTitleNarrow]}>
                Pay Bills &amp; Top Up in Seconds with{' '}
                <Text variant="display" style={[styles.heroTitle, { color: C.green }]}>
                  ZPAY
                </Text>
              </Text>

              <Text variant="body" style={[styles.heroSub, { color: C.secondary }]}>
                Experience lightning-fast electricity tokens, airtime, data, cable TV, and exam registrations with bank-grade security.
              </Text>

              <View style={[styles.heroCtas, isWide && styles.heroCtasWide]}>
                <SiteButton label="Get Started — It's Free" href="/signup" variant="primary" />
                <SiteButton label="Sign In" href="/login" variant="ghost" />
              </View>

              <View style={styles.socialProofRow}>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Ionicons key={s} name="star" size={14} color={C.gold} />
                  ))}
                </View>
                <Text variant="caption" style={{ color: C.secondary, fontSize: 13 }}>
                  Loved by <Text style={{ color: C.text, fontWeight: '700' }}>50,000+ active users</Text> across Nigeria
                </Text>
              </View>
            </View>

            <View style={[styles.heroVisual, isWide && styles.heroVisualWide]}>
              <PhoneMockup />
            </View>
          </View>
        </View>

        {/* TRUST / STATS */}
        <View style={[styles.band, { backgroundColor: C.surface, borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.border }]}>
          <View style={styles.container}>
            <View style={[styles.statsGrid, isWide ? styles.statsGridWide : styles.statsGridMobile]}>
              {STATS.map((stat) => (
                <View key={stat.label} style={styles.statBox}>
                  <Text variant="display" style={{ color: C.green, fontSize: isWide ? 40 : 32, fontWeight: '900' }}>
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
              <Text variant="label" style={{ color: C.green }}>
                Services
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
                  <View key={type} style={[styles.serviceCard, { backgroundColor: C.cardBg, borderColor: C.border }]}>
                    <View style={styles.serviceCardHeader}>
                      <View style={[styles.serviceIconWrap, { backgroundColor: withAlpha(meta.color, 0.16), borderColor: withAlpha(meta.color, 0.3) }]}>
                        <Icon name={meta.icon} size={IconSize.lg} color={meta.color} />
                      </View>
                      <Text style={{ color: C.green, fontSize: 18, fontWeight: '700' }}>→</Text>
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
                          <View key={b} style={[styles.providerBadge, { backgroundColor: C.surface, borderColor: C.border }]}>
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

        {/* FEATURES SECTION */}
        <View style={[styles.band, { backgroundColor: C.surface }]} {...banner('features')}>
          <View style={styles.container}>
            <View style={styles.headRow}>
              <Text variant="label" style={{ color: C.gold }}>
                Why ZPAY
              </Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                Designed for everyday Nigerian payments
              </Text>
              <Text variant="body" style={[styles.sectionSub, { color: C.secondary }]}>
                Fast, secure, and reliable utility payments built on modern fintech infrastructure.
              </Text>
            </View>
            <View style={[styles.grid, isWide ? styles.grid3 : styles.grid2]}>
              {WHY_ITEMS.map((w) => (
                <View key={w.title} style={[styles.benefitCard, { backgroundColor: C.cardBg, borderColor: C.border }]}>
                  <View style={[styles.benefitIcon, { backgroundColor: withAlpha(C.green, 0.14) }]}>
                    <Icon name={w.icon} size={IconSize.md} color={C.green} />
                  </View>
                  <Text variant="smallBold" style={{ color: C.text, fontSize: 16 }}>
                    {w.title}
                  </Text>
                  <Text variant="caption" style={{ color: C.secondary, lineHeight: 20 }}>
                    {w.desc}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* HOW IT WORKS */}
        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('how')}>
          <View style={styles.container}>
            <View style={styles.headRow}>
              <Text variant="label" style={{ color: C.green }}>
                Process
              </Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                How ZPAY works in 3 steps
              </Text>
            </View>
            <View style={[styles.grid, isWide ? styles.grid3 : styles.grid1]}>
              {STEPS.map((s) => (
                <View key={s.step} style={[styles.stepCard, { backgroundColor: C.cardBg, borderColor: C.border }]}>
                  <Text variant="display" style={{ color: C.green, opacity: 0.3, fontSize: 44 }}>
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

        {/* CTA BAND */}
        <LinearGradient colors={[C.green, '#047857']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaBand}>
          <View style={[styles.container, styles.ctaInner]}>
            <Text variant="heading" style={styles.ctaTitle}>
              Ready to simplify your monthly bills?
            </Text>
            <Text variant="body" style={styles.ctaSub}>
              Create your free ZPAY account and experience lightning-fast utility payments today.
            </Text>
            <SiteButton label="Get Started — It's Free" href="/signup" variant="secondary" style={styles.ctaBtn} />
          </View>
        </LinearGradient>

        {/* FOOTER */}
        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('support')}>
          <View style={styles.container}>
            <View style={[styles.footerGrid, isWide && styles.footerGridWide]}>
              <View style={styles.footerBrand}>
                <ZpayLogo size={130} />
                <Text variant="caption" style={{ color: C.secondary, lineHeight: 20, maxWidth: 320, marginTop: Sp.xs }}>
                  ZPAY is Nigeria's premier utility wallet app. Pay power, airtime, data and exam registrations securely with zero transaction fees.
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
    paddingVertical: Sp.md,
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
  heroSection: {
    position: 'relative',
    paddingVertical: 72,
    overflow: 'hidden',
  },
  heroGlowBackdrop: {
    position: 'absolute',
    top: -80,
    left: '25%',
    width: 450,
    height: 450,
    borderRadius: 225,
    backgroundColor: C.greenGlow,
    opacity: 0.8,
  },
  heroInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Sp.xxl,
  },
  heroText: {
    flex: 1,
    gap: Sp.lg,
  },
  heroTextWide: {
    paddingRight: Sp.xl,
  },
  topBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sp.xs,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 197, 76, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 197, 76, 0.25)',
    borderRadius: Radii.full,
    paddingHorizontal: Sp.md,
    paddingVertical: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.green,
  },
  heroTitle: {
    color: C.text,
    fontSize: 52,
    lineHeight: 60,
    fontWeight: '900',
    letterSpacing: -1,
  },
  heroTitleNarrow: {
    fontSize: 36,
    lineHeight: 44,
  },
  heroSub: {
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 540,
  },
  heroCtas: {
    gap: Sp.md,
    marginTop: Sp.xs,
  },
  heroCtasWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialProofRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sp.sm,
    marginTop: Sp.sm,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
  },
  heroVisual: {
    flex: 1,
    alignItems: 'center',
  },
  heroVisualWide: {
    alignItems: 'flex-end',
  },
  band: {
    paddingVertical: 72,
  },
  headRow: {
    marginBottom: Sp.xxl,
    alignItems: 'flex-start',
    gap: Sp.xs,
  },
  sectionTitle: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '900',
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
  grid3: {},
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
  stepCard: {
    width: '31%',
    flexGrow: 1,
    minWidth: 280,
    borderRadius: Radii.xl,
    borderWidth: 1,
    padding: Sp.xl,
    backgroundColor: C.cardBg,
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
    paddingVertical: 72,
  },
  ctaInner: {
    alignItems: 'center',
    gap: Sp.md,
  },
  ctaTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 38,
    lineHeight: 46,
    fontWeight: '900',
  },
  ctaSub: {
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    fontSize: 16,
  },
  ctaBtn: {
    marginTop: Sp.sm,
    backgroundColor: '#080C14',
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
    backgroundColor: C.green,
    shadowColor: C.green,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  btnPrimaryText: {
    color: '#080C14',
    fontWeight: '800',
  },
  btnSecondary: {
    backgroundColor: '#FFFFFF',
  },
  btnSecondaryText: {
    color: '#080C14',
    fontWeight: '800',
  },
  btnGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  btnGhostText: {
    color: C.text,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  phone: {
    width: 250,
    borderWidth: 6,
    borderRadius: 36,
    borderColor: '#1E293B',
    backgroundColor: '#111827',
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
    backgroundColor: '#1E293B',
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
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '700',
  },
  mockWalletAmount: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  mockTabs: {
    flexDirection: 'row',
    backgroundColor: '#080C14',
    borderRadius: Radii.sm,
    padding: 2,
    borderWidth: 1,
    borderColor: C.border,
  },
  mockTabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: Radii.sm,
  },
  mockTabActive: {
    backgroundColor: C.green,
  },
  mockCardResult: {
    backgroundColor: '#080C14',
    padding: Sp.sm,
    borderRadius: Radii.sm,
    borderWidth: 1,
    borderColor: C.border,
    gap: 2,
  },
  mockSection: {
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  mockActions: {
    flexDirection: 'row',
    gap: 4,
  },
  mockAction: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    borderRadius: Radii.sm,
    paddingVertical: 6,
    borderWidth: 1,
  },
});
