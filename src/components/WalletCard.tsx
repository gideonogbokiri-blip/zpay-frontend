import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { Text, View } from './ui';
import { formatNaira } from '@/lib/format';
import { FontSize, IconSize, Radii, Spacing } from '@/theme/tokens';
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
  const [display, setDisplay] = useState(balance);
  const animated = useRef(new Animated.Value(balance)).current;

  useEffect(() => {
    if (loading) return;
    const listener = animated.addListener(({ value }) => setDisplay(Math.round(value)));
    Animated.timing(animated, {
      toValue: balance,
      duration: 700,
      useNativeDriver: false,
    }).start();
    return () => {
      animated.removeListener(listener);
    };
  }, [balance, loading, animated]);

  const balanceText = hidden ? '••••••' : formatNaira(display);

  const content = (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.accentSoft }]}>
      <View pointerEvents="none" style={styles.glow} />

      <View style={styles.inner}>
        <View style={styles.topRow}>
          <View style={styles.topLeft}>
            <View style={styles.walletIconWrap}>
              <Ionicons name="wallet-outline" size={IconSize.sm} color={colors.accent} />
            </View>
            <Text variant="smallBold" color="textSecondary">
              My wallet
            </Text>
          </View>
          <Pressable
            onPress={() => setHidden((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show balance' : 'Hide balance'}
            hitSlop={Spacing.sm}
            style={({ pressed }) => [styles.eyeButton, { backgroundColor: colors.accentSoft }, pressed && styles.pressed]}>
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={IconSize.sm}
              color={colors.accent}
            />
          </Pressable>
        </View>

        <Text variant="caption" color="textMuted" style={styles.label}>
          Available balance
        </Text>

        {loading ? (
          <Text style={[styles.amount, { color: colors.textMuted }]}>
            ------
          </Text>
        ) : (
          <View style={styles.amountRow}>
            <Text style={[styles.currency, { color: colors.textMuted }]}>₦</Text>
            <Text style={[styles.amount, { color: colors.text }]}>{balanceText}</Text>
          </View>
        )}

        <View style={styles.bottomRow}>
          <Pressable
            onPress={onFundPress}
            accessibilityRole="button"
            accessibilityLabel="Fund wallet"
            style={({ pressed }) => [styles.fundPress, pressed && styles.fundPressed]}>
            <LinearGradient
              colors={['#00C54C', '#00A93F', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.fundButton}>
              <Ionicons name="add" size={IconSize.md} color="#FFFFFF" />
              <Text variant="smallBold" style={{ color: '#FFFFFF' }}>
                Fund Wallet
              </Text>
            </LinearGradient>
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
    padding: Spacing.xl,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#00C54C',
    shadowOpacity: 0.18,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 16,
  },
  glow: {
    position: 'absolute',
    top: -70,
    right: -50,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(0, 197, 76, 0.10)',
  },
  inner: {
    gap: Spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  walletIconWrap: {
    width: IconSize.lg + 4,
    height: IconSize.lg + 4,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 197, 76, 0.14)',
  },
  eyeButton: {
    width: IconSize.xl,
    height: IconSize.xl,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontSize: FontSize.heading + 6,
    fontWeight: '800',
    marginRight: Spacing.xs,
  },
  amount: {
    fontSize: 52,
    lineHeight: 60,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: Spacing.md,
  },
  fundPress: {
    shadowColor: '#00C54C',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  fundButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radii.full,
  },
  fundPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
  pressed: {
    opacity: 0.7,
  },
});
