import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text, View } from './ui';
import { formatNaira } from '@/lib/format';
import { IconSize, Radii, Shadow, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export interface WalletCardProps {
  balance: number;
  loading?: boolean;
  onFundPress?: () => void;
  onPress?: () => void;
}

export function WalletCard({ balance, loading, onFundPress, onPress }: WalletCardProps) {
  const colors = useTheme();
  const [hidden, setHidden] = useState(false);

  const balanceText = hidden ? '₦ ••••••' : formatNaira(balance);

  const content = (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.inner}>
        <View style={styles.topRow}>
          <Text variant="label" color="textSecondary">
            Wallet balance
          </Text>
          <Pressable
            onPress={() => setHidden((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show balance' : 'Hide balance'}
            style={styles.eyeButton}>
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={IconSize.sm}
              color={colors.textMuted}
            />
          </Pressable>
        </View>
        {loading ? (
          <Text variant="amount" color="textMuted">
            ------
          </Text>
        ) : (
          <Text variant="amount" color="text" style={styles.amount}>
            {balanceText}
          </Text>
        )}
        <View style={styles.bottomRow}>
          <Pressable
            onPress={onFundPress}
            accessibilityRole="button"
            accessibilityLabel="Fund wallet"
            style={({ pressed }) => [styles.fundButton, { backgroundColor: colors.accent }, pressed && styles.pressed]}>
            <Text variant="smallBold" style={{ color: colors.white }}>
              + Fund Wallet
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
    borderColor: '#D1FAE5',
    overflow: 'hidden',
    ...Shadow,
  },
  inner: {
    gap: Spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyeButton: {
    padding: Spacing.xxs,
  },
  amount: {
    letterSpacing: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
