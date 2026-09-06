import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Icon, type IconName } from '@/components/Icon';
import { Button, Screen, Text, View } from '@/components/ui';
import { ZpayLogo } from '@/components/ZpayLogo';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

const FEATURES: { icon: IconName; label: string; caption: string }[] = [
  { icon: 'flash', label: 'Electricity', caption: 'Prepaid & postpaid' },
  { icon: 'phone-portrait', label: 'Airtime', caption: 'All networks' },
  { icon: 'wifi', label: 'Data', caption: 'MTN, Airtel, Glo, 9mobile' },
  { icon: 'tv', label: 'TV & Exams', caption: 'DStv, GOtv, WAEC, JAMB' },
];

export default function WelcomeScreen() {
  const colors = useTheme();

  return (
    <Screen title={undefined} scroll contentStyle={styles.content}>
      <View style={styles.brand}>
        <ZpayLogo size={108} />
        <Text variant="display" style={styles.logoText}>
          ZPAY
        </Text>
        <Text variant="body" color="textSecondary" style={styles.tagline}>
          Pay bills, buy airtime and register for exams in one place.
        </Text>
        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f.label} style={[styles.feature, { backgroundColor: colors.surface }]}>
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
      </View>

      <View style={styles.actions}>
        <Link href="/login" asChild>
          <Button label="Log in" />
        </Link>
        <Link href="/signup" asChild>
          <Button label="Create account" variant="secondary" />
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  brand: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
  },
  logoText: {
    letterSpacing: 4,
  },
  tagline: {
    textAlign: 'center',
    maxWidth: 320,
  },
  features: {
    marginTop: Spacing.xl,
    gap: Spacing.sm,
    width: '100%',
    maxWidth: 420,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.08)',
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
    paddingBottom: Spacing.xxxl,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
  },
});