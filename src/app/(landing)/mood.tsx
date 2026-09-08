import { StyleSheet, View } from 'react-native';

import { Button, Screen, Text } from '@/components/ui';
import { ZpayLogo } from '@/components/ZpayLogo';
import { Spacing } from '@/theme/tokens';
import { useTheme, useThemeSwitch, useThemeVariant } from '@/theme';

export default function MoodLanding() {
  const colors = useTheme();
  const variant = useThemeVariant();
  const { toggleVariant, setVariant } = useThemeSwitch();

  return (
    <Screen title="ZPAY" subtitle="Financial Freedom, Anywhere">
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ZpayLogo size={128} />
        <Text variant="display" style={[styles.title, { color: colors.accent }]}>
          ZPAY
        </Text>
        <Text variant="body" color="textSecondary" style={styles.tagline}>
          Secure payments, money transfers, and bill payments
        </Text>

        <View style={styles.moodCard}>
          <Text variant="title" style={{ color: colors.text }}>
            Mood Switch
          </Text>
          <Text variant="body" color="textSecondary" style={styles.moodDesc}>
            Pick a mood that suits your vibe. Light for bright, sunny days; dark for late-night ease. Your choice is
            saved automatically.
          </Text>
          <Text variant="label" color="accent" style={styles.currentMode}>
            Current mode: {variant === 'dark' ? 'Dark' : 'Light'}
          </Text>
        </View>

        <View style={styles.actions}>
          <Button label="Toggle Mood" onPress={toggleVariant} />
          <View style={{ flexDirection: 'row', gap: Spacing.md }}>
            <Button label="Light" variant={variant === 'light' ? 'primary' : 'outline'} onPress={() => setVariant('light')} />
            <Button label="Dark" variant={variant === 'dark' ? 'primary' : 'outline'} onPress={() => setVariant('dark')} />
          </View>
        </View>

        <Text variant="caption" color="textMuted" style={styles.footer}>
          © 2026 ZPAY Inc. All rights reserved.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.xl,
    paddingTop: Spacing.xxl,
    gap: Spacing.xl,
  },
  title: {
    letterSpacing: 6,
    fontWeight: '900',
  },
  tagline: {
    textAlign: 'center',
  },
  moodCard: {
    width: '100%',
    padding: Spacing.xl,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(245, 184, 46, 0.3)',
    backgroundColor: 'rgba(245, 184, 46, 0.08)',
    gap: Spacing.sm,
  },
  moodDesc: {
    lineHeight: 22,
  },
  currentMode: {
    marginTop: Spacing.xs,
  },
  actions: {
    width: '100%',
    gap: Spacing.lg,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: Spacing.lg,
  },
});