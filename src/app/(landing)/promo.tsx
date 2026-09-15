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

const SITE_MAX = 1240;
const NAV_HEIGHT = 76;

const C = {
  bg: '#080C14',
  surface: '#111827',
  card: '#161E2E',
  elevated: '#1F2937',
  green: '#00C54C', // ZPAY Green
  gold: '#F5B82E',  // ZPAY Gold
  text: '#FFFFFF',
  secondary: '#94A3B8',
  muted: '#64748B',
  border: 'rgba(255,255,255,0.08)',
  greenGlow: 'rgba(0, 197, 76, 0.12)',
};

type SectionKey = 'services' | 'features' | 'how' | 'security' | 'support';

const NAV_LINKS: { key: SectionKey; label: string }[] = [
  { key: 'services', label: 'Services' },
  { key: 'features', label: 'Features' },
  { key: 'how', label: 'How It Works' },
  { key: 'security', label: 'Security' },
  { key: 'support', label: 'Support' },
];

const SERVICE_DETAILS: Record<string, { desc: string; badges: string[] }> = {
  ELECTRICITY: {
    desc: 'Instant prepaid & postpaid power tokens across all DisCos.',
    badges: ['IKEDC', 'EKEDC', 'AEDC', 'PHED', 'IBEDC'],
  },
  AIRTIME: {
    desc: 'Instant top-up for all mobile networks with zero delay.',
    badges: ['MTN', 'Airtel', 'Glo', '9mobile'],
  },
  DATA: {
    desc: 'Affordable high-speed internet data bundles.',
    badges: ['MTN', 'Airtel', 'Glo', '9mobile'],
  },
  TV: {
    desc: 'DStv, GOtv & StarTimes instant cable TV subscription.',
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

const STEPS = [
  { step: '01', title: 'Create Your Account', caption: 'Sign up in under 60 seconds with your phone number and email.' },
  { step: '02', title: 'Fund Your Wallet', caption: 'Add funds securely via bank transfer or card payment.' },
  { step: '03', title: 'Pay & Get Confirmation', caption: 'Receive instant tokens, top-ups, and verified digital receipts.' },
];

const SECURITY_ITEMS = [
  { icon: 'shield-checkmark' as IconName, title: 'Secure Payments', caption: 'Transactions are processed securely through trusted payment infrastructure.' },
  { icon: 'lock-closed' as IconName, title: 'Protected Access', caption: 'Your account is safeguarded with strict authentication and PIN verification.' },
  { icon: 'receipt' as IconName, title: 'Transaction Records', caption: 'Every payment is permanently recorded for your financial tracking.' },
  { icon: 'headset' as IconName, title: 'Customer Support', caption: 'Reliable assistance available whenever you need help with a transaction.' },
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

function ZpayVideo({ title = 'ZPAY PRODUCT VIDEO' }: { title?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.videoContainer}>
      <LinearGradient colors={['#161E2E', '#0B0F17']} style={styles.videoBg}>
        <View style={styles.videoOverlay}>
          {!isPlaying ? (
            <Pressable
              onPress={() => setIsPlaying(true)}
              style={({ pressed }) => [styles.playButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Play video">
              <Ionicons name="play" size={32} color="#080C14" />
            </Pressable>
          ) : (
            <View style={styles.playingState}>
              <View style={styles.livePulse} />
              <Text variant="smallBold" style={{ color: C.green }}>Playing ZPAY Demo...</Text>
              <Pressable onPress={() => setIsPlaying(false)} style={styles.stopBtn}>
                <Text variant="caption" style={{ color: C.secondary }}>Stop</Text>
              </Pressable>
            </View>
          )}
          <Text variant="smallBold" style={styles.videoTitle}>{title}</Text>
          <Text variant="caption" style={{ color: C.secondary }}>Seamless bill payments in action</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

function PhoneDashboardMockup() {
  return (
    <View style={styles.phoneFrame}>
      <View style={styles.phoneNotch} />
      <View style={styles.phoneScreen}>
        <View style={styles.phoneHeader}>
          <ZpayLogo size={90} />
          <View style={styles.phoneAvatar}>
            <Text style={{ color: C.green, fontWeight: '800', fontSize: 12 }}>T</Text>
          </View>
        </View>
        <LinearGradient colors={[C.green, '#047857']} style={styles.phoneWalletCard}>
          <Text variant="caption" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 10, fontWeight: '700' }}>AVAILABLE BALANCE</Text>
          <Text variant="heading" style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '900' }}>₦142,500.00</Text>
        </LinearGradient>
        <Text variant="caption" style={{ color: C.muted, textTransform: 'uppercase', fontSize: 10, fontWeight: '700', marginTop: 4 }}>Quick Services</Text>
        <View style={styles.phoneGrid}>
          {ACTIVE_SERVICES.map((t) => {
            const m = SERVICE_META[t];
            return (
              <View key={t} style={[styles.phoneGridItem, { backgroundColor: C.card, borderColor: C.border }]}>
                <Icon name={m.icon} size={16} color={m.color} />
                <Text variant="caption" style={{ color: C.secondary, fontSize: 10 }}>{SERVICE_NAMES[t]}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.phoneNotifCard}>
          <Ionicons name="flash" size={14} color={C.gold} />
          <View style={{ flex: 1 }}>
            <Text variant="caption" style={{ color: C.text, fontSize: 11, fontWeight: '700' }}>IKEDC Prepaid Token</Text>
            <Text variant="caption" style={{ color: C.green, fontSize: 10 }}>Token: 4819-2094-8591</Text>
          </View>
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
      {/* NAVBAR */}
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
                <Pressable onPress={() => scrollTo('services')} style={styles.navLinkItem}><Text variant="smallBold" style={{ color: C.secondary }}>Product</Text></Pressable>
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
              <SiteButton label="Get Started" href="/signup" variant="primary" style={{ width: '100%', alignItems: 'center' }} />
            </View>
          </View>
        ) : null}
      </View>

      <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 3. HERO SECTION */}
        <View style={styles.heroSection}>
          <View style={styles.heroGlowBackdrop} />
          <View style={[styles.container, styles.heroInner]}>
            <View style={[styles.heroText, isWide && styles.heroTextWide]}>
              <View style={styles.topBadge}>
                <Text variant="caption" style={{ color: C.green, fontWeight: '700', fontSize: 12 }}>
                  SMARTER PAYMENTS. SIMPLER LIFE.
                </Text>
              </View>

              <Text variant="display" style={[styles.heroTitle, !isWide && styles.heroTitleNarrow]}>
                Everything You Need to Pay,{' '}
                <Text variant="display" style={[styles.heroTitle, { color: C.green }]}>
                  All in One Place.
                </Text>
              </Text>

              <Text variant="body" style={[styles.heroSub, { color: C.secondary }]}>
                Pay electricity bills, recharge airtime, buy data, subscribe to cable TV and access essential services from one simple ZPAY wallet.
              </Text>

              <View style={[styles.heroCtas, isWide && styles.heroCtasWide]}>
                <SiteButton label="Get Started" href="/signup" variant="primary" />
                <SiteButton label="Explore ZPAY" href="/login" variant="ghost" />
              </View>
            </View>

            <View style={[styles.heroVisual, isWide && styles.heroVisualWide]}>
              <PhoneDashboardMockup />
            </View>
          </View>
        </View>

        {/* 4. TRUST STRIP */}
        <View style={[styles.band, { backgroundColor: C.surface, borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.border }]}>
          <View style={styles.container}>
            <Text variant="smallBold" style={{ color: C.secondary, textAlign: 'center', letterSpacing: 1.5, marginBottom: Sp.lg }}>
              ONE PLATFORM. EVERYDAY PAYMENTS.
            </Text>
            <View style={styles.trustStripRow}>
              {['Electricity', 'Airtime', 'Data', 'Cable TV', 'Exam Services'].map((item) => (
                <View key={item} style={styles.trustItem}>
                  <Ionicons name="checkmark-circle" size={16} color={C.green} />
                  <Text variant="smallBold" style={{ color: C.text }}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 5. INTRODUCTION SECTION ("Meet ZPAY") */}
        <View style={[styles.band, { backgroundColor: C.bg }]}>
          <View style={[styles.container, styles.meetInner, isWide && styles.meetWide]}>
            <View style={styles.meetText}>
              <Text variant="label" style={{ color: C.green }}>Meet ZPAY</Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                A simpler digital experience for your everyday utility bills.
              </Text>
              <Text variant="body" style={{ color: C.secondary, lineHeight: 24 }}>
                ZPAY brings essential everyday payments into one intuitive application. Fund your wallet once and seamlessly manage your household and personal bills in seconds.
              </Text>
            </View>
            <View style={styles.meetMockup}>
              <PhoneDashboardMockup />
            </View>
          </View>
        </View>

        {/* 6. VIDEO SECTION */}
        <View style={[styles.band, { backgroundColor: C.surface }]}>
          <View style={styles.container}>
            <View style={styles.headCenter}>
              <Text variant="label" style={{ color: C.gold }}>Product Experience</Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text, textAlign: 'center' }]}>
                See ZPAY in Action
              </Text>
              <Text variant="body" style={[styles.sectionSub, { color: C.secondary, textAlign: 'center' }]}>
                Experience a simpler way to manage your everyday payments.
              </Text>
            </View>
            <ZpayVideo title="ZPAY PRODUCT VIDEO" />
          </View>
        </View>

        {/* 7. SERVICES SECTION */}
        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('services')}>
          <View style={styles.container}>
            <View style={styles.headCenter}>
              <Text variant="label" style={{ color: C.green }}>Core Services</Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text, textAlign: 'center' }]}>
                Everything You Need, In One Place
              </Text>
              <Text variant="body" style={[styles.sectionSub, { color: C.secondary, textAlign: 'center' }]}>
                From electricity and airtime to data, TV and exam services, ZPAY keeps your everyday payments simple.
              </Text>
            </View>

            <View style={[styles.grid, isWide ? styles.grid3 : styles.grid2]}>
              {[...ACTIVE_SERVICES, ...REGISTRATION_SERVICES].map((type) => {
                const meta = SERVICE_META[type];
                const detail = SERVICE_DETAILS[type] ?? { desc: 'Fast & reliable payment', badges: [] };
                return (
                  <View key={type} style={[styles.serviceCard, { backgroundColor: C.card, borderColor: C.border }]}>
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

        {/* 8. FEATURE STORY SECTIONS (Alternating) */}
        {/* Section A */}
        <View style={[styles.band, { backgroundColor: C.surface }]}>
          <View style={[styles.container, styles.altStoryRow, isWide && styles.altStoryWide]}>
            <View style={styles.altStoryText}>
              <Text variant="label" style={{ color: C.green }}>Utility Payments</Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                Pay Without the Stress
              </Text>
              <Text variant="body" style={{ color: C.secondary, lineHeight: 24 }}>
                Never get disconnected. Instantly verify prepaid and postpaid meters across all 11 distribution companies with automatic number verification and instant token delivery.
              </Text>
            </View>
            <View style={styles.altStoryVisual}>
              <PhoneDashboardMockup />
            </View>
          </View>
        </View>

        {/* Section B */}
        <View style={[styles.band, { backgroundColor: C.bg }]}>
          <View style={[styles.container, styles.altStoryRow, isWide && styles.altStoryWideAlt]}>
            <View style={styles.altStoryVisual}>
              <PhoneDashboardMockup />
            </View>
            <View style={styles.altStoryText}>
              <Text variant="label" style={{ color: C.gold }}>Unified Experience</Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                Your Essential Services, Together
              </Text>
              <Text variant="body" style={{ color: C.secondary, lineHeight: 24 }}>
                Manage airtime top-ups for all four major networks, monthly data bundles, cable TV subscriptions, and WAEC/JAMB exam registrations from one unified platform.
              </Text>
            </View>
          </View>
        </View>

        {/* Section C */}
        <View style={[styles.band, { backgroundColor: C.surface }]}>
          <View style={[styles.container, styles.altStoryRow, isWide && styles.altStoryWide]}>
            <View style={styles.altStoryText}>
              <Text variant="label" style={{ color: C.green }}>Transparency</Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                Every Transaction, Clearly
              </Text>
              <Text variant="body" style={{ color: C.secondary, lineHeight: 24 }}>
                Access itemized digital receipts, searchable transaction history, and instant confirmation codes for every payment you make.
              </Text>
            </View>
            <View style={styles.altStoryVisual}>
              <PhoneDashboardMockup />
            </View>
          </View>
        </View>

        {/* 9. SECURITY SECTION */}
        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('security')}>
          <View style={styles.container}>
            <View style={styles.headCenter}>
              <Text variant="label" style={{ color: C.green }}>Trust &amp; Reliability</Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text, textAlign: 'center' }]}>
                Built With Security in Mind
              </Text>
              <Text variant="body" style={[styles.sectionSub, { color: C.secondary, textAlign: 'center' }]}>
                Your financial safety is our highest priority.
              </Text>
            </View>

            <View style={[styles.grid, isWide ? styles.grid2 : styles.grid1]}>
              {SECURITY_ITEMS.map((sec) => (
                <View key={sec.title} style={[styles.securityCard, { backgroundColor: C.card, borderColor: C.border }]}>
                  <View style={[styles.securityIcon, { backgroundColor: withAlpha(C.green, 0.14) }]}>
                    <Icon name={sec.icon} size={IconSize.lg} color={C.green} />
                  </View>
                  <View style={{ gap: 4 }}>
                    <Text variant="bodyBold" style={{ color: C.text, fontSize: 18 }}>{sec.title}</Text>
                    <Text variant="caption" style={{ color: C.secondary, lineHeight: 20 }}>{sec.caption}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 10. APP SHOWCASE */}
        <View style={[styles.band, { backgroundColor: C.surface }]}>
          <View style={styles.container}>
            <View style={styles.headCenter}>
              <Text variant="label" style={{ color: C.gold }}>Product Preview</Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text, textAlign: 'center' }]}>
                Your ZPAY Experience
              </Text>
              <Text variant="body" style={[styles.sectionSub, { color: C.secondary, textAlign: 'center' }]}>
                Clean interfaces designed for speed and clarity.
              </Text>
            </View>

            <View style={styles.showcasePhonesRow}>
              <View style={styles.showcasePhoneSide}><PhoneDashboardMockup /></View>
              <View style={styles.showcasePhoneCenter}><PhoneDashboardMockup /></View>
              <View style={styles.showcasePhoneSide}><PhoneDashboardMockup /></View>
            </View>
          </View>
        </View>

        {/* 11. HOW IT WORKS */}
        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('how')}>
          <View style={styles.container}>
            <View style={styles.headCenter}>
              <Text variant="label" style={{ color: C.green }}>Process</Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text, textAlign: 'center' }]}>
                How ZPAY Works
              </Text>
            </View>
            <View style={[styles.grid, isWide ? styles.grid3 : styles.grid1]}>
              {STEPS.map((s) => (
                <View key={s.step} style={[styles.stepCard, { backgroundColor: C.card, borderColor: C.border }]}>
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

        {/* 12. SECOND VIDEO / PROMOTIONAL SECTION */}
        <View style={[styles.band, { backgroundColor: C.surface }]}>
          <View style={[styles.container, styles.altStoryRow, isWide && styles.altStoryWideAlt]}>
            <View style={styles.altStoryVisual}>
              <ZpayVideo title="ZPAY STORY &amp; WALKTHROUGH" />
            </View>
            <View style={styles.altStoryText}>
              <Text variant="label" style={{ color: C.green }}>Simplified Payments</Text>
              <Text variant="heading" style={[styles.sectionTitle, { color: C.text }]}>
                Payments Made Simpler
              </Text>
              <Text variant="body" style={{ color: C.secondary, lineHeight: 24, marginBottom: Sp.md }}>
                Watch how thousands of Nigerians eliminate queues and service downtime by managing all household and personal bills in one secure application.
              </Text>
              <SiteButton label="Get Started" href="/signup" variant="primary" />
            </View>
          </View>
        </View>

        {/* 13. FINAL CTA */}
        <LinearGradient colors={[C.green, '#047857']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaBand}>
          <View style={[styles.container, styles.ctaInner]}>
            <Text variant="heading" style={styles.ctaTitle}>
              Ready to Make Payments Simpler?
            </Text>
            <Text variant="body" style={styles.ctaSub}>
              Get started with ZPAY and manage your everyday services from one convenient platform.
            </Text>
            <View style={styles.ctaButtonsRow}>
              <SiteButton label="Get Started" href="/signup" variant="secondary" />
              <SiteButton label="Sign In" href="/login" variant="ghost" />
            </View>
          </View>
        </LinearGradient>

        {/* 14. FOOTER */}
        <View style={[styles.band, { backgroundColor: C.bg }]} {...banner('support')}>
          <View style={styles.container}>
            <View style={[styles.footerGrid, isWide && styles.footerGridWide]}>
              <View style={styles.footerBrand}>
                <ZpayLogo size={130} />
                <Text variant="caption" style={{ color: C.secondary, lineHeight: 20, maxWidth: 300, marginTop: Sp.xs }}>
                  One wallet for all your everyday payments.
                </Text>
              </View>

              <View style={styles.footerCol}>
                <Text variant="smallBold" style={{ color: C.text, marginBottom: Sp.xs }}>PRODUCT</Text>
                <Pressable onPress={() => scrollTo('services')}><Text variant="caption" style={{ color: C.secondary }}>Services</Text></Pressable>
                <Pressable onPress={() => scrollTo('features')}><Text variant="caption" style={{ color: C.secondary }}>Features</Text></Pressable>
                <Pressable onPress={() => scrollTo('how')}><Text variant="caption" style={{ color: C.secondary }}>How It Works</Text></Pressable>
              </View>

              <View style={styles.footerCol}>
                <Text variant="smallBold" style={{ color: C.text, marginBottom: Sp.xs }}>COMPANY</Text>
                <Pressable onPress={() => scrollTo('support')}><Text variant="caption" style={{ color: C.secondary }}>About</Text></Pressable>
                <Link href="/terms" asChild><Pressable><Text variant="caption" style={{ color: C.secondary }}>Terms</Text></Pressable></Link>
                <Link href="/privacy" asChild><Pressable><Text variant="caption" style={{ color: C.secondary }}>Privacy</Text></Pressable></Link>
              </View>

              <View style={styles.footerCol}>
                <Text variant="smallBold" style={{ color: C.text, marginBottom: Sp.xs }}>SUPPORT</Text>
                <Pressable onPress={() => scrollTo('support')}><Text variant="caption" style={{ color: C.secondary }}>Contact</Text></Pressable>
                <Pressable onPress={() => scrollTo('support')}><Text variant="caption" style={{ color: C.secondary }}>Help</Text></Pressable>
                <Text variant="caption" style={{ color: C.secondary }}>support@zpay.app</Text>
              </View>
            </View>

            <View style={[styles.copyrightRow, { borderColor: C.border }]}>
              <Text variant="caption" style={{ color: C.muted }}>
                © 2026 ZPAY. All rights reserved.
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

const Sp = Spacing;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  nav: {
    borderBottomWidth: 1,
    backgroundColor: C.bg,
    zIndex: 100,
    position: 'sticky' as any,
    top: 0,
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
    paddingVertical: 80,
    overflow: 'hidden',
  },
  heroGlowBackdrop: {
    position: 'absolute',
    top: -60,
    left: '20%',
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: C.greenGlow,
    opacity: 0.9,
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
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 197, 76, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 197, 76, 0.25)',
    borderRadius: Radii.full,
    paddingHorizontal: Sp.md,
    paddingVertical: 6,
  },
  heroTitle: {
    color: C.text,
    fontSize: 54,
    lineHeight: 62,
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
  heroVisual: {
    flex: 1,
    alignItems: 'center',
  },
  heroVisualWide: {
    alignItems: 'flex-end',
  },
  phoneFrame: {
    width: 270,
    borderWidth: 8,
    borderRadius: 40,
    borderColor: '#1E293B',
    backgroundColor: C.bg,
    padding: 10,
    gap: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 16,
  },
  phoneNotch: {
    alignSelf: 'center',
    width: 90,
    height: 18,
    borderRadius: 10,
    backgroundColor: '#1E293B',
  },
  phoneScreen: {
    gap: 8,
  },
  phoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phoneAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,197,76,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,197,76,0.3)',
  },
  phoneWalletCard: {
    borderRadius: Radii.md,
    padding: Sp.md,
    gap: 2,
  },
  phoneGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  phoneGridItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
    borderRadius: Radii.sm,
    borderWidth: 1,
  },
  phoneNotifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: C.card,
    padding: 8,
    borderRadius: Radii.sm,
    borderWidth: 1,
    borderColor: C.border,
  },
  band: {
    paddingVertical: 80,
  },
  headCenter: {
    marginBottom: Sp.xxl,
    alignItems: 'center',
    gap: Sp.xs,
  },
  sectionTitle: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '900',
    color: C.text,
  },
  sectionSub: {
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 600,
  },
  trustStripRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: Sp.lg,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sp.xs,
  },
  meetInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Sp.xxxl,
  },
  meetWide: {},
  meetText: {
    flex: 1,
    gap: Sp.sm,
  },
  meetMockup: {
    flex: 1,
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
    height: 480,
    borderRadius: Radii.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.border,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  videoBg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Sp.sm,
    backgroundColor: 'rgba(8, 12, 20, 0.65)',
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: C.green,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.green,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  playingState: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sp.xs,
    backgroundColor: 'rgba(0,197,76,0.15)',
    paddingHorizontal: Sp.md,
    paddingVertical: 6,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: 'rgba(0,197,76,0.3)',
  },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.green,
  },
  stopBtn: {
    marginLeft: Sp.sm,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 1,
    marginTop: Sp.sm,
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
  altStoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Sp.xxxl,
  },
  altStoryWide: {},
  altStoryWideAlt: {
    flexDirection: 'row-reverse',
  },
  altStoryText: {
    flex: 1,
    gap: Sp.sm,
  },
  altStoryVisual: {
    flex: 1,
    alignItems: 'center',
  },
  securityCard: {
    width: '48%',
    flexGrow: 1,
    minWidth: 280,
    borderRadius: Radii.xl,
    borderWidth: 1,
    padding: Sp.xl,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Sp.lg,
  },
  securityIcon: {
    width: 52,
    height: 52,
    borderRadius: Radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showcasePhonesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Sp.xl,
  },
  showcasePhoneSide: {
    transform: [{ scale: 0.88 }],
    opacity: 0.8,
  },
  showcasePhoneCenter: {
    transform: [{ scale: 1.05 }],
    zIndex: 2,
  },
  stepCard: {
    width: '31%',
    flexGrow: 1,
    minWidth: 280,
    borderRadius: Radii.xl,
    borderWidth: 1,
    padding: Sp.xl,
    backgroundColor: C.card,
  },
  ctaBand: {
    paddingVertical: 80,
  },
  ctaInner: {
    alignItems: 'center',
    gap: Sp.md,
  },
  ctaTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '900',
  },
  ctaSub: {
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    fontSize: 18,
  },
  ctaButtonsRow: {
    flexDirection: 'row',
    gap: Sp.md,
    marginTop: Sp.sm,
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
});
