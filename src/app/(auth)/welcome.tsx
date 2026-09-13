import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon, type IconName } from '@/components/Icon';
import { Button, Screen, Text } from '@/components/ui';
import { ZpayLogo } from '@/components/ZpayLogo';
import { IconSize, Radii, Shadow, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

const loginVisual = require('../../../assets/images/login-visual.png');

const FEATURES: { icon: IconName; label: string; caption: string }[] = [
  { icon: 'flash', label: 'Electricity', caption: 'Prepaid & postpaid across 11 DisCos' },
  { icon: 'phone-portrait', label: 'Airtime', caption: 'MTN, Airtel, Glo & 9mobile' },
  { icon: 'wifi', label: 'Data', caption: 'Instant bundles for every network' },
  { icon: 'tv', label: 'TV & Exams', caption: 'DStv, GOtv, WAEC, JAMB' },
];

export default function WelcomeScreen() {
  const colors = useTheme();
  const { width } = useWindowDimensions();
  const wide = width >= 860;

  return (
    <Screen title={undefined} scroll contentStyle={styles.content}>
      <View style={[styles.layout, wide ? styles.layoutWide : styles.layoutMobile]}>
        <View style={styles.brandPanel}>
          <View style={styles.brandRow}>
            <ZpayLogo size={64} />
            <Text variant="display" style={[styles.logoText, { color: colors.accent }]}>
              ZPAY
            </Text>
          </View>
          <Text variant="heading" style={[styles.title, { color: colors.text }]}>
            Pay smarter, live better
          </Text>
          <Text variant="body" color="textSecondary" style={styles.tagline}>
            Bills, airtime, data, TV, and exam registrations in one secure Nigerian app.
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
              <Button label="Log in to account" />
            </Link>
            <Link href="/signup" asChild>
              <Button label="Create free account" variant="secondary" />
            </Link>
            <View style={styles.links}>
              <Link href="/promo" asChild>
                <Pressable accessibilityRole="link" accessibilityLabel="Promo landing page">
                  <Text variant="smallBold" color="accent">
                    Promo Website
                  </Text>
                </Pressable>
              </Link>
              <Text variant="caption" color="textMuted">·</Text>
              <Link href="/terms" asChild>
                <Pressable accessibilityRole="link" accessibilityLabel="Terms of Service">
                  <Text variant="smallBold" color="accent">
                    Terms
                  </Text>
                </Pressable>
              </Link>
              <Text variant="caption" color="textMuted">·</Text>
              <Link href="/privacy" asChild>
                <Pressable accessibilityRole="link" accessibilityLabel="Privacy Policy">
                  <Text variant="smallBold" color="accent">
                    Privacy
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>

        <View style={[styles.visualPanel, wide ? styles.visualPanelWide : styles.visualPanelMobile]}>
          <Image source={loginVisual} resizeMode="cover" style={styles.visualImage} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
  },
  layout: {
    gap: Spacing.xl,
    paddingVertical: Spacing.xxl,
  },
  layoutWide: {
    minHeight: 720,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  layoutMobile: {
    flex: 1,
    justifyContent: 'center',
  },
  brandPanel: {
    flex: 1,
    gap: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  logoText: {
    letterSpacing: 4,
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
  },
  tagline: {
    maxWidth: 420,
    lineHeight: 24,
  },
  features: {
    gap: Spacing.sm,
    width: '100%',
    maxWidth: 460,
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
  featureIcon: {
    width: IconSize.xxl,
    height: IconSize.xxl,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    gap: 2,
  },
  actions: {
    gap: Spacing.md,
    maxWidth: 460,
    width: '100%',
    marginTop: Spacing.xs,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingTop: Spacing.sm,
  },
  visualPanel: {
    overflow: 'hidden',
    borderRadius: Radii.xxl,
    backgroundColor: '#151A21',
    ...Shadow,
  },
  visualPanelWide: {
    flex: 1.05,
    minHeight: 680,
  },
  visualPanelMobile: {
    width: '100%',
    height: 360,
    marginHorizontal: Spacing.xl,
  },
  visualImage: {
    width: '100%',
    height: '100%',
  },
});
