import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from './ui';
import { formatNaira } from '@/lib/format';
import { Radii, Shadow, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export interface WalletCardProps {
  balance: number;
  loading?: boolean;
  onFundPress?: () => void;
  onPress?: () => void;
}

export function WalletCard({ balance, loading, onFundPress, onPress }: WalletCardProps) {
  const colors = useTheme();

  const content = (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={[styles.glow, { backgroundColor: colors.accentSoft }]} pointerEvents="none" />
      <View style={styles.inner}>
        <View style={styles.topRow}>
          <Text variant="label" color="textSecondary">
            Wallet balance
          </Text>
          <View style={[styles.currencyPill, { backgroundColor: colors.accentSoft }]}>
            <Text variant="caption" color="accent" style={styles.currencyPillText}>
              NGN
            </Text>
          </View>
        </View>
        {loading ? (
          <Text variant="amount" color="textMuted">
            ------
          </Text>
        ) : (
          <Text variant="amount" color="accent" style={styles.amount}>
            {formatNaira(balance)}
          </Text>
        )}
        <View style={styles.bottomRow}>
          <Pressable
            onPress={onFundPress}
            accessibilityRole="button"
            accessibilityLabel="Fund wallet"
            style={({ pressed }) => [
              styles.fundButton,
              { backgroundColor: colors.accent },
              pressed && styles.pressed,
            ]}>
            <Text variant="smallBold" style={{ color: colors.background }}>
              Fund wallet
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Wallet balance">
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    overflow: 'hidden',
    ...Shadow,
  },
  glow: {
    position: 'absolute',
    top: -70,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  inner: {
    gap: Spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currencyPill: {
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
  },
  currencyPillText: {
    fontWeight: '600',
  },
  amount: {
    letterSpacing: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.sm,
  },
  fundButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.full,
  },
  pressed: {
    opacity: 0.85,
  },
});