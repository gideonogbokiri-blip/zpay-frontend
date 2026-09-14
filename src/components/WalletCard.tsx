import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { Text } from './ui';
import { formatNaira } from '@/lib/format';
import { FontSize, IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

const GOLD = '#F5B82E';

export interface WalletCardProps {
  balance: number;
  loading?: boolean;
  hidden?: boolean;
  onFundPress?: () => void;
}

export function WalletCard({ balance, loading, hidden, onFundPress }: WalletCardProps) {
  const colors = useTheme();
  const [display, setDisplay] = useState(balance);
  const animatedBalance = useRef(new Animated.Value(balance)).current;
  const entranceOpacity = useRef(new Animated.Value(0)).current;
  const entranceY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entranceOpacity, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(entranceY, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [entranceOpacity, entranceY]);

  useEffect(() => {
    if (loading) return;
    const listener = animatedBalance.addListener(({ value }) => setDisplay(Math.round(value)));
    Animated.timing(animatedBalance, {
      toValue: balance,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    return () => {
      animatedBalance.removeListener(listener);
    };
  }, [balance, loading, animatedBalance]);

  const balanceText = hidden ? '••••••' : formatNaira(display);
  const isZero = balance === 0 && !loading;

  return (
    <Animated.View style={{ opacity: entranceOpacity, transform: [{ translateY: entranceY }] }}>
      <LinearGradient
        colors={['#181D26', '#11151B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { borderColor: colors.border }]}>
        <View style={styles.topRow}>
          <View style={styles.walletTitleRow}>
            <View style={styles.walletIconWrap}>
              <Ionicons name="wallet-outline" size={18} color={GOLD} />
            </View>
            <Text variant="smallBold" style={styles.walletTitle}>
              My Wallet
            </Text>
          </View>
        </View>

        <View style={styles.balanceBlock}>
          <Text variant="caption" color="textMuted" style={styles.label}>
            AVAILABLE BALANCE
          </Text>
          {loading ? (
            <Text style={[styles.amount, { color: colors.textMuted }]}>₦------</Text>
          ) : (
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.6}
              style={[styles.amount, { color: colors.text }]}>
              {balanceText}
            </Text>
          )}
          {isZero && !hidden ? (
            <Text variant="caption" color="accent" style={styles.zeroHint}>
              Fund your wallet to get started
            </Text>
          ) : null}
        </View>

        <View style={styles.bottomRow}>
          <Pressable
            onPress={onFundPress}
            accessibilityRole="button"
            accessibilityLabel="Fund wallet"
            style={({ pressed }) => [styles.fundButton, pressed && styles.fundPressed]}>
            <Ionicons name="add-circle" size={16} color="#090C10" />
            <Text variant="smallBold" style={styles.fundText}>
              Fund Wallet
            </Text>
            <Ionicons name="arrow-forward" size={14} color="#090C10" />
          </Pressable>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: Radii.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  walletIconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245,184,46,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(245,184,46,0.28)',
  },
  walletTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  balanceBlock: {
    marginTop: Spacing.lg,
    gap: 4,
  },
  label: {
    letterSpacing: 1,
    fontSize: 11,
    fontWeight: '700',
  },
  amount: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
    letterSpacing: -0.6,
  },
  zeroHint: {
    marginTop: 2,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: Spacing.lg,
  },
  fundButton: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radii.full,
    backgroundColor: GOLD,
    shadowColor: GOLD,
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  fundText: {
    color: '#090C10',
    fontSize: 14,
    fontWeight: '700',
  },
  fundPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
});
