import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Button, Screen, Text, View } from '@/components/ui';
import { IconSize, Spacing } from '@/theme/tokens';

export default function WelcomeScreen() {
  return (
    <Screen title={undefined} scroll={false} contentStyle={styles.content}>
      <View style={styles.brand}>
        <View style={styles.logoWrap}>
          <View style={styles.logoGlow} pointerEvents="none" />
          <View style={styles.logo}>
            <Text variant="heading" style={styles.logoLetter}>
              Z
            </Text>
          </View>
        </View>
        <Text variant="display" style={styles.logoText}>
          ZPAY
        </Text>
        <Text variant="body" color="textSecondary" style={styles.tagline}>
          Pay bills, buy airtime and register for exams in one place.
        </Text>
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
    paddingHorizontal: Spacing.xxl,
  },
  logoWrap: {
    width: IconSize.xxl * 2,
    height: IconSize.xxl * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGlow: {
    position: 'absolute',
    width: IconSize.xxl * 2.6,
    height: IconSize.xxl * 2.6,
    borderRadius: IconSize.xxl * 1.3,
    backgroundColor: 'rgba(16, 185, 129, 0.20)',
  },
  logo: {
    width: IconSize.xxl * 1.5,
    height: IconSize.xxl * 1.5,
    borderRadius: Spacing.xxl,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    color: '#10B981',
    fontWeight: '700',
  },
  logoText: {
    letterSpacing: 4,
  },
  tagline: {
    textAlign: 'center',
  },
  actions: {
    gap: Spacing.md,
    paddingBottom: Spacing.xxxl,
  },
});