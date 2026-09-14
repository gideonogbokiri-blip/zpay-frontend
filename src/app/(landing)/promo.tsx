import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View, type DimensionValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Icon, type IconName } from '@/components/Icon';
import { Text } from '@/components/ui';
import { ZpayLogo } from '@/components/ZpayLogo';
import { ACTIVE_SERVICES, REGISTRATION_SERVICES, SERVICE_META, SERVICE_NAMES } from '@/constants/services';
import { IconSize, Radii, Spacing } from '@/theme/tokens';

const SITE_MAX = 1240;
const NAV_HEIGHT = 76;

const C = {
  bg: '#0B0F17',
  surface: '#111827',
  surfaceCard: '#1E293B',
  elevated: '#1F2937',
  accent: '#3B82F6', // Electric Blue
  accentCyan: '#10B981', // Vibrant Emerald/Cyan
  gold: '#F5B82E', // ZPAY Gold
  text: '#FFFFFF',
  secondary: '#94A3B8',
  muted: '#64748B',
  border: 'rgba(255,255,255,0.08)',
  glow: 'rgba(59, 130, 246, 0.15)',
};

type SectionKey = 'services' | 'bento' | 'how' | 'why' | 'support';

const NAV_LINKS: { key: SectionKey; label: string }[] = [
  { key: 'services', label: 'Services' },
  { key: 'bento', label: 'Features' },
  { key: 'how', label: 'How it Works' },
  { key: 'why', label: 'Why ZPAY' },
  { key: 'support', label: 'Support' },
];

const SERVICE_DETAILS: Record<string, { desc: string; badges: string[] }> = {
  ELECTRICITY: {
    desc: 'Instant prepaid & postpaid tokens across all 11 DisCos with zero downtime.',
    badges: ['IKEDC', 'EKEDC', 'AEDC', 'PHED', 'IBEDC', 'KEDCO'],
  },
  AIRTIME: {
    desc: 'Instant top-up for all networks with cashback rewards.',
    badges: ['MTN', 'Airtel', 'Glo', '9mobile'],
  },
  DATA: {
    desc: 'Affordable daily, weekly and monthly high-speed data bundles.',
    badges: ['MTN', 'Airtel', 'Glo', '9mobile'],
  },
  TV: {
    desc: 'DStv, GOtv & StarTimes instant subscription activation.',
    badges: ['DStv', 'GOtv', 'StarTimes'],
  },
  WAEC: {
    desc: 'WAEC registration & scratch card PIN delivery.',
    badges: ['Registration', 'Result Pins'],
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

const BENTO_CARDS = [
  {
    title: 'Instant Prepaid Electricity Delivery',
    subtitle: 'Tokens delivered in under 3 seconds directly to your phone and receipt.',
    tag: '⚡ Lightning Fast',
    span: 'large',
  },
  {
    title: 'Bank-Grade Security',
    subtitle: 'Secured with Paystack integration and 256-bit SSL encryption.',
    tag: '🔒 100% Secure',
    span: 'medium',
  },
  {
    title: 'All-in-One Utility Wallet',
    subtitle: 'Fund once, pay power, airtime, data and exams with zero hidden fees.',
    tag: '💎 Zero Hidden Fees',
    span: 'medium',
  },
  {
    title: '99.9% Success Rate',
    subtitle: 'Backed by redundant carrier APIs and 24/7 automated reconciliation.',
    tag: '🚀 Ultra Reliable',
    span: 'small',
  },
];

const STEPS = [
  { step: '01', title: 'Fund Your Wallet', caption: 'Add funds securely via bank transfer or debit card in seconds.' },
  { step: '02', title: 'Select a Service', caption: 'Choose electricity, airtime, data, cable TV, or exam registration.' },
  { step: '03', title: 'Instant Delivery', caption: 'Receive your tokens, pins, or top-up instantly on screen & via SMS.' },
];

const WHY_ITEMS = [
  { icon: 'shield-checkmark', title: 'Secure & Encrypted', desc: 'Protected by enterprise-grade security standards.' },
  { icon: 'flash', title: 'Instant Delivery', desc: 'Zero wait time for electricity tokens and top-ups.' },
  { icon: 'layers', title: 'All-in-One App', desc: 'Manage every monthly utility from a single wallet.' },
  { icon: 'receipt', title: 'Digital Receipts', desc: 'Instant itemized receipts for effortless tracking.' },
  { icon: 'headset', title: '24/7 Support', desc: 'Dedicated customer success team ready to assist.' },
  { icon: 'globe', title: 'Built for Nigeria', desc: 'Tailored specifically for Nigerian payment workflows.' },
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

function InteractiveHeroWidget() {
  const [activeTab, setActiveTab] = useState<'ELECTRICITY' | 'AIRTIME' | 'DATA' | 'TV'>('ELECTRICITY');

  return (
    <View style={styles.heroWidgetCard}>
      <View style={styles.widgetHeader}>
        <View style={styles.widgetDotRow}>
          <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
          <View style={[styles.dot, { backgroundColor: '#F5B82E' }]} />
          <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
        </View>
        <Text variant="caption" style={{ color: C.secondary, fontSize: 11 }}>zpay.app/secure-portal</Text>
        <View style={styles.secureBadge}>
          <Ionicons name="lock-closed" size={10} color="#10B981" />
          <Text variant="caption" style={{ color: '#10B981', fontSize: 10, fontWeight: '700' }}>SECURE</Text>
        </View>
      </View>

      <View style={styles.widgetBalanceBox}>
        <Text variant="caption" style={{ color: C.secondary, fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>WALLET BALANCE</Text>
        <View style={styles.widgetBalanceRow}>
          <Text variant="display" style={{ color: C.text, fontSize: 28, fontWeight: '900' }}>₦245,800.00</Text>
          <View style={styles.liveBadge}>
            <View style={styles.livePulse} />
            <Text variant="caption" style={{ color: '#10B981', fontSize: 10, fontWeight: '800' }}>LIVE</Text>
          </View>
        </View>
      </View>

      <View style={styles.widgetTabs}>
        {(['ELECTRICITY', 'AIRTIME', 'DATA', 'TV'] as const).map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.widgetTab, activeTab === tab && styles.widgetTabActive]}
          >
            <Text variant="caption" style={{ color: activeTab === tab ? '#0B0F17' : C.secondary, fontWeight: '700', fontSize: 11 }}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.widgetContent}>
        {activeTab === 'ELECTRICITY' && (
          <View style={styles.widgetForm}>
            <Text variant="smallBold" style={{ color: C.text }}>IKEDC Prepaid · Meter #450918239</Text>
            <View style={styles.widgetResultBox}>
              <Text variant="caption" style={{ color: '#10B981', fontWeight: '700' }}>✓ Token Generated Successfully</Text>
              <Text variant="bodyBold" style={{ color: C.text, letterSpacing: 1.5, fontSize: 15 }}>4819-2094-8591-2094</Text>
            </View>
          </View>
        )}
        {activeTab === 'AIRTIME' && (
          <View style={styles.widgetForm}>
            <Text variant="smallBold" style={{ color: C.text }}>MTN Instant Top-Up · 0803 123 4567</Text>
            <View style={styles.widgetResultBox}>
              <Text variant="caption" style={{ color: '#10B981', fontWeight: '700' }}>✓ ₦5,000 Airtime Credited</Text>
              <Text variant="caption" style={{ color: C.secondary }}>Transaction Ref: ZP-984201984</Text>
            </View>
          </View>
        )}
        {activeTab === 'DATA' && (
          <View style={styles.widgetForm}>
            <Text variant="smallBold" style={{ color: C.text }}>Airtel 10GB Monthly Bundle</Text>
            <View style={styles.widgetResultBox}>
              <Text variant="caption" style={{ color: '#10B981', fontWeight: '700' }}>✓ Data Bundle Delivered</Text>
              <Text variant="caption" style={{ color: C.secondary }}>Active until Oct 14, 2026</Text>
            </View>
          </View>
        )}
        {activeTab === 'TV' && (
          <View style={styles.widgetForm}>
            <Text variant="smallBold" style={{ color: C.text }}>DStv Compact Plus · IUC: 7019283746</Text>
            <View style={styles.widgetResultBox}>
              <Text variant="caption" style={{ color: '#10B981', fontWeight: '700' }}>✓ Subscription Renewed</Text>
              <Text variant="caption" style={{ color: C.secondary }}>Valid for 30 Days</Text>
            </View>
          </View>
        )}
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
                <Text variant="caption" style={{ color: '#3B82F6', fontWeight: '700', fontSize: 12 }}>
                  ✨ Introducing ZPAY — 0% Transaction Fees on Bills
                </Text>
              </View>

              <Text variant="display" style={[styles.heroTitle, !isWide && styles.heroTitleNarrow]}>
                The Smarter Way to{' '}
                <Text variant="display" style={[styles.heroTitle, styles.gradientText]}>
                  Pay Bills &amp; Top Up
                </Text>{' '}
                in Nigeria
              </Text>

              <Text variant="body" style={[styles.heroSub, { color: C.secondary }]}>
                Experience lightning-fast electricity tokens, airtime, data, cable TV, and exam registrations backed by bank-grade security.
              </Text>

              <View style={[styles.heroCtas, isWide && styles.heroCtasWide]}>
                <SiteButton label="Get Started — It's Free" href="/signup" variant="primary" />
                <SiteButton label="Watch Demo" href="/login" variant="ghost" />
              </View>

              <View style={styles.socialProofRow}>
                <View style={styles.avatarStack}>
                  <View style={[styles.avatarCircle, { backgroundColor: '#3B82F6' }]}><Text style={styles.avatarTxt}>A</Text></View>
                  <View style={[styles.avatarCircle, { backgroundColor: '#10B981', marginLeft: -10 }]}><Text style={styles.avatarTxt}>K</Text></View>
                  <View style={[styles.avatarCircle, { backgroundColor: '#F5B82E', marginLeft: -10 }]}><Text style={styles.avatarTxt}>T</Text></View>
                  <View style={[styles.avatarCircle, { backgroundColor: '#8B5CF6', marginLeft: -10 }]}><Text style={styles.avatarTxt}>O</Text></View>
                </View>
                <View style={styles.socialTextCol}>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Ionicons key={s} name="star" size={13} color="#F5B82E" />
                    ))}
                  </View>
                  <Text variant="caption" style={{ color: C.secondary, fontSize: 12 }}>
                    Trusted by <Text style={{ color: C.text, fontWeight: '700' }}>50,000+</Text> Nigerians
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.heroVisual, isWide && styles.heroVisualWide]}>
              <InteractiveHeroWidget />
            </View>
          </View>
        </View>

        {/* SUPPORTED SERVICES SECTION */}
        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('services')}>
          <View style={styles.container}>
            <View style={styles.headRow}>
              <Text variant="label" style={{ color: C.accent }}>
                Supported Utilities
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
                    <View style={styles.serviceCardHeader}>
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

        {/* BENTO GRID FEATURES SECTION */}
        <View style={[styles.band, { backgroundColor: C.surface }]} {...banner('bento')}>
          <View style={styles.container}>
            <View style={styles.headRow}>
              <Text variant="label" style={{ color: C.accentCyan }}>
                Powerful Features
              </Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                Built for speed and absolute reliability
              </Text>
              <Text variant="body" style={[styles.sectionSub, { color: C.secondary }]}>
                Engineered with modern fintech architecture to ensure your transactions never fail.
              </Text>
            </View>

            <View style={styles.bentoGrid}>
              <View style={[styles.bentoCardLarge, { backgroundColor: C.surfaceCard, borderColor: C.border }]}>
                <View style={styles.bentoBadge}><Text style={styles.bentoBadgeTxt}>{BENTO_CARDS[0].tag}</Text></View>
                <Text variant="heading" style={{ color: C.text, fontSize: 24, marginTop: Sp.sm }}>{BENTO_CARDS[0].title}</Text>
                <Text variant="body" style={{ color: C.secondary, marginTop: Sp.xs, maxWidth: 440 }}>{BENTO_CARDS[0].subtitle}</Text>
                <View style={styles.bentoReceiptPreview}>
                  <View style={styles.bentoReceiptRow}>
                    <Text variant="caption" style={{ color: C.secondary }}>IKEDC Prepaid Token</Text>
                    <Text variant="caption" style={{ color: '#10B981', fontWeight: '700' }}>SUCCESS</Text>
                  </View>
                  <Text variant="bodyBold" style={{ color: C.text, letterSpacing: 1, marginTop: 4 }}>4819-2094-8591-2094</Text>
                </View>
              </View>

              <View style={styles.bentoCol}>
                <View style={[styles.bentoCardMedium, { backgroundColor: C.surfaceCard, borderColor: C.border }]}>
                  <View style={styles.bentoBadge}><Text style={styles.bentoBadgeTxt}>{BENTO_CARDS[1].tag}</Text></View>
                  <Text variant="bodyBold" style={{ color: C.text, fontSize: 18, marginTop: Sp.sm }}>{BENTO_CARDS[1].title}</Text>
                  <Text variant="caption" style={{ color: C.secondary, marginTop: 4 }}>{BENTO_CARDS[1].subtitle}</Text>
                </View>
                <View style={[styles.bentoCardMedium, { backgroundColor: C.surfaceCard, borderColor: C.border }]}>
                  <View style={styles.bentoBadge}><Text style={styles.bentoBadgeTxt}>{BENTO_CARDS[2].tag}</Text></View>
                  <Text variant="bodyBold" style={{ color: C.text, fontSize: 18, marginTop: Sp.sm }}>{BENTO_CARDS[2].title}</Text>
                  <Text variant="caption" style={{ color: C.secondary, marginTop: 4 }}>{BENTO_CARDS[2].subtitle}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* HOW IT WORKS */}
        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('how')}>
          <View style={styles.container}>
            <View style={styles.headRow}>
              <Text variant="label" style={{ color: C.accent }}>
                Simple Workflow
              </Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                How ZPAY works in 3 steps
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
        <View style={[styles.band, { backgroundColor: C.surface }]} {...banner('why')}>
          <View style={styles.container}>
            <View style={styles.headRow}>
              <Text variant="label" style={{ color: C.accentCyan }}>
                Why ZPAY
              </Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                Designed for everyday Nigerian payments
              </Text>
            </View>
            <View style={[styles.grid, isWide ? styles.grid3 : styles.grid2]}>
              {WHY_ITEMS.map((w) => (
                <View key={w.title} style={[styles.benefitCard, { backgroundColor: C.surfaceCard, borderColor: C.border }]}>
                  <View style={[styles.benefitIcon, { backgroundColor: withAlpha(C.accent, 0.14) }]}>
                    <Icon name={w.icon} size={IconSize.md} color={C.accent} />
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

        {/* TRUST STATS */}
        <View style={[styles.band, { backgroundColor: C.bg, borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.border }]}>
          <View style={styles.container}>
            <View style={[styles.statsGrid, isWide ? styles.statsGridWide : styles.statsGridMobile]}>
              {STATS.map((stat) => (
                <View key={stat.label} style={styles.statBox}>
                  <Text variant="display" style={{ color: C.accent, fontSize: isWide ? 44 : 36, fontWeight: '900' }}>
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

        {/* CTA BANNER */}
        <LinearGradient colors={['#3B82F6', '#1D4ED8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaBand}>
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
    top: -100,
    left: '25%',
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: C.glow,
    opacity: 0.7,
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
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.25)',
    borderRadius: Radii.full,
    paddingHorizontal: Sp.md,
    paddingVertical: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
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
  gradientText: {
    color: '#3B82F6',
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
    gap: Sp.md,
    marginTop: Sp.sm,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: C.bg,
  },
  avatarTxt: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  socialTextCol: {
    gap: 2,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  heroVisual: {
    flex: 1,
    alignItems: 'center',
  },
  heroVisualWide: {
    alignItems: 'flex-end',
  },
  heroWidgetCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: C.surfaceCard,
    borderRadius: Radii.xxl,
    borderWidth: 1,
    borderColor: C.border,
    padding: Sp.lg,
    gap: Sp.md,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 20,
  },
  widgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  widgetDotRow: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  widgetBalanceBox: {
    backgroundColor: C.surface,
    padding: Sp.md,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: C.border,
    gap: 4,
  },
  widgetBalanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.full,
  },
  livePulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  widgetTabs: {
    flexDirection: 'row',
    backgroundColor: C.surface,
    borderRadius: Radii.md,
    padding: 3,
    borderWidth: 1,
    borderColor: C.border,
  },
  widgetTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: Radii.sm,
  },
  widgetTabActive: {
    backgroundColor: '#3B82F6',
  },
  widgetContent: {
    backgroundColor: C.surface,
    padding: Sp.md,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: C.border,
    minHeight: 90,
    justifyContent: 'center',
  },
  widgetForm: {
    gap: Sp.xs,
  },
  widgetResultBox: {
    backgroundColor: C.surfaceCard,
    padding: Sp.sm,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: C.border,
    gap: 2,
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
  bentoGrid: {
    gap: Sp.lg,
  },
  bentoCardLarge: {
    borderRadius: Radii.xxl,
    borderWidth: 1,
    padding: Sp.xxl,
    overflow: 'hidden',
  },
  bentoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.25)',
  },
  bentoBadgeTxt: {
    color: '#3B82F6',
    fontSize: 11,
    fontWeight: '700',
  },
  bentoReceiptPreview: {
    marginTop: Sp.lg,
    backgroundColor: C.surface,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: C.border,
    padding: Sp.lg,
    maxWidth: 380,
  },
  bentoReceiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bentoCol: {
    flexDirection: 'row',
    gap: Sp.lg,
    flexWrap: 'wrap',
  },
  bentoCardMedium: {
    flex: 1,
    minWidth: 280,
    borderRadius: Radii.xl,
    borderWidth: 1,
    padding: Sp.xl,
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
    backgroundColor: '#0B0F17',
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
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  btnSecondary: {
    backgroundColor: '#FFFFFF',
  },
  btnSecondaryText: {
    color: '#0B0F17',
    fontWeight: '800',
  },
  btnGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  btnGhostText: {
    ContentColor: C.text,
    color: C.text,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
