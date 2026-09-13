import { Link } from 'expo-router';
import { Image, ImageBackground, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon, type IconName } from '@/components/Icon';
import { Button, Screen, Text } from '@/components/ui';
import { ZpayLogo } from '@/components/ZpayLogo';
import { IconSize, Radii, Shadow, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

const loginVisual = require('../../../assets/images/login-visual.png');

const FEATURES: { icon: IconName; label: string; caption: string }[] = [
  { icon: 'flash', label: 'Electricity', caption: 'Prepaid & postpaid across 11 DisCos' },
  { icon: 'phone-portrait', label: 'Airtime', caption: 'All networks' },
  { icon: 'wifi', label: 'Data', caption: 'Instant bundles for every network' },
  { icon: 'tv', label: 'TV & Exams', caption: 'DStv, GOtv, WAEC, JAMB, NECO' },
];

export default function WelcomeScreen() {
  const colors = useTheme();
  const { width } = useWindowDimensions();
  const wide = width >= 860;

  if (wide) {
    return (
      <Screen title={undefined} scroll contentStyle={styles.contentWide}>
        <View style={styles.layoutWide}>
          <View style={styles.brandPanel}>
            <ZpayLogo size={150} style={styles.logoWrap} />
            <Text variant="heading" style={[styles.title, { color: colors.text }]}>
              Welcome to ZPAY
            </Text>
            <Text variant="body" color="textSecondary" style={styles.tagline}>
              Pay bills, buy airtime, data, TV, and exam registrations in one secure Nigerian app.
            </Text>

            <View style={styles.features}>
              {FEATURES.map((f) => (
                <View key={f.label} style={[styles.feature, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <View style={[styles.featureIcon, { backgroundColor: colors.accentSoft }]}>
                    <Icon name={f.icon} size={IconSize.md} color={colors.accent} />
                  </View>
                  <View style={styles.featureText}>
                    <Text variant="smallBold">{f.label}</Text>
                    <Text variant="caption" color="textMuted">
                      {f.caption}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.actions}>
              <Link href="/login" asChild>
                <Button label="Log in" />
              </Link>
              <Link href="/signup" asChild>
                <Button label="Create account" variant="secondary" />
              </Link>
              <View style={styles.links}>
                <Link href="/promo" asChild>
                  <Pressable accessibilityRole="link" accessibilityLabel="Promo">
                    <Text variant="smallBold" color="accent">Promo</Text>
                  </Pressable>
                </Link>
                <Text variant="caption" color="textMuted">•</Text>
                <Link href="/terms" asChild>
                  <Pressable accessibilityRole="link" accessibilityLabel="Terms">
                    <Text variant="smallBold" color="accent">Terms</Text>
                  </Pressable>
                </Link>
                <Text variant="caption" color="textMuted">•</Text>
                <Link href="/privacy" asChild>
                  <Pressable accessibilityRole="link" accessibilityLabel="Privacy">
                    <Text variant="smallBold" color="accent">Privacy</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>

          <View style={styles.visualPanelWide}>
            <Image source={loginVisual} resizeMode="cover" style={styles.visualImage} />
          </View>
        </View>
      </Screen>
    );
  }

  // Mobile layout: Immersive background image with gradient and glass cards
  return (
    <Screen title={undefined} scroll contentStyle={styles.contentMobile}>
      <ImageBackground source={loginVisual} resizeMode="cover" style={styles.mobileBg}>
        <LinearGradient
          colors={['rgba(9, 12, 16, 0.4)', 'rgba(9, 12, 16, 0.92)', '#090C10']}
          style={styles.mobileGradient}
        >
          <View style={styles.mobileInner}>
            <ZpayLogo size={140} style={styles.mobileLogo} />

            <View style={styles.mobileHeader}>
              <Text variant="heading" style={[styles.titleMobile, { color: '#FFFFFF' }]}>
                Welcome to ZPAY
              </Text>
              <Text variant="body" style={[styles.taglineMobile, { color: 'rgba(255,255,255,0.85)' }]}>
                Pay bills, buy airtime and register for exams in one place.
              </Text>
            </View>

            <View style={styles.features}>
              {FEATURES.map((f) => (
                <View key={f.label} style={[styles.featureMobile, { backgroundColor: 'rgba(17, 21, 27, 0.88)', borderColor: 'rgba(255,255,255,0.12)' }]}>
                  <View style={[styles.featureIcon, { backgroundColor: 'rgba(245, 184, 46, 0.16)' }]}>
                    <Icon name={f.icon} size={IconSize.md} color="#F5B82E" />
                  </View>
                  <View style={styles.featureText}>
                    <Text variant="smallBold" style={{ color: '#FFFFFF' }}>{f.label}</Text>
                    <Text variant="caption" style={{ color: '#94A3B8' }}>
                      {f.caption}
                    </Text>
                  </View>
                  <Icon name="chevron-forward" size={IconSize.sm} color="#94A3B8" />
                </View>
              ))}
            </View>

            <View style={styles.actionsMobile}>
              <Link href="/login" asChild>
                <Button label="Log in →" />
              </Link>
              <Link href="/signup" asChild>
                <Button label="Create account" variant="secondary" />
              </Link>
              <View style={styles.links}>
                <Link href="/promo" asChild>
                  <Pressable accessibilityRole="link" accessibilityLabel="Promo">
                    <Text variant="smallBold" color="accent">Promo</Text>
                  </Pressable>
                </Link>
                <Text variant="caption" color="textMuted">•</Text>
                <Link href="/terms" asChild>
                  <Pressable accessibilityRole="link" accessibilityLabel="Terms">
                    <Text variant="smallBold" color="accent">Terms</Text>
                  </Pressable>
                </Link>
                <Text variant="caption" color="textMuted">•</Text>
                <Link href="/privacy" asChild>
                  <Pressable accessibilityRole="link" accessibilityLabel="Privacy">
                    <Text variant="smallBold" color="accent">Privacy</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentWide: {
    flex: 1,
    maxWidth: 1240,
    width: '100%',
    alignSelf: 'center',
  },
  contentMobile: {
    flex: 1,
  },
  layoutWide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xxl,
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
    minHeight: 760,
  },
  brandPanel: {
    flex: 1,
    gap: Spacing.md,
    maxWidth: 520,
  },
  logoWrap: {
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '900',
  },
  tagline: {
    lineHeight: 24,
    marginBottom: Spacing.sm,
  },
  features: {
    gap: Spacing.sm,
    width: '100%',
    marginVertical: Spacing.xs,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radii.lg,
    borderWidth: 1,
  },
  featureMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radii.lg,
    borderWidth: 1,
  },
  featureIcon: {
    width: IconSize.xxl,
    height: IconSize.xxl,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
    gap: 2,
  },
  actions: {
    gap: Spacing.md,
    width: '100%',
    marginTop: Spacing.md,
  },
  actionsMobile: {
    gap: Spacing.md,
    width: '100%',
    marginTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingTop: Spacing.xs,
  },
  visualPanelWide: {
    flex: 1.1,
    height: 700,
    overflow: 'hidden',
    borderRadius: Radii.xxl,
    backgroundColor: '#151A21',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    ...Shadow,
  },
  visualImage: {
    width: '100%',
    height: '100%',
  },
  mobileBg: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
  },
  mobileGradient: {
    flex: 1,
    width: '100%',
  },
  mobileInner: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    justifyContent: 'center',
    gap: Spacing.md,
  },
  mobileLogo: {
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  mobileHeader: {
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  titleMobile: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
  },
  taglineMobile: {
    fontSize: 15,
    lineHeight: 22,
  },
});
