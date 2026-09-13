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
  onToggleHidden?: () => void;
  onFundPress?: () => void;
}

export function WalletCard({ balance, loading, hidden, onToggleHidden, onFundPress }: WalletCardProps) {
  const colors = useTheme();
  const [localHidden, setLocalHidden] = useState(false);
  const [display, setDisplay] = useState(balance);
  const animatedBalance = useRef(new Animated.Value(balance)).current;
  const entranceOpacity = useRef(new Animated.Value(0)).current;
  const entranceY = useRef(new Animated.Value(12)).current;

  const isHidden = hidden ?? localHidden;
  const toggleHidden = onToggleHidden ?? (() => setLocalHidden((v) => !v));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entranceOpacity, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(entranceY, {
        toValue: 0,
        duration: 400,
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
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    return () => {
      animatedBalance.removeListener(listener);
    };
  }, [balance, loading, animatedBalance]);

  const balanceText = isHidden ? '••••••' : formatNaira(display);
  const isZero = balance === 0 && !loading;

  return (
    <Animated.View style={{ opacity: entranceOpacity, transform: [{ translateY: entranceY }] }}>
      <LinearGradient
        colors={['#151A21', '#11151B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { borderColor: colors.border }]}>
        <View pointerEvents="none" style={styles.goldGlow} />

        <View style={styles.topRow}>
          <View style={styles.walletTitleRow}>
            <View style={styles.walletIconWrap}>
              <Ionicons name="wallet" size={IconSize.sm} color={GOLD} />
            </View>
            <Text variant="smallBold" style={styles.walletTitle}>
              My Wallet
            </Text>
          </View>
          <Pressable
            onPress={toggleHidden}
            accessibilityRole="button"
            accessibilityLabel={isHidden ? 'Show balance' : 'Hide balance'}
            hitSlop={8}
            style={({ pressed }) => [styles.eyeButton, pressed && styles.pressed]}>
            <Ionicons name={isHidden ? 'eye-off-outline' : 'eye-outline'} size={IconSize.sm} color={colors.textSecondary} />
          </Pressable>
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
          {isZero && !isHidden ? (
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
            <Ionicons name="add-circle" size={18} color="#090C10" />
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
    padding: Spacing.lg,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.24,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  goldGlow: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(245,184,46,0.08)',
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
    width: 32,
    height: 32,
    borderRadius: Radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245,184,46,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245,184,46,0.24)',
  },
  walletTitle: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  eyeButton: {
    width: 34,
    height: 34,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  balanceBlock: {
    marginTop: Spacing.md,
    gap: 2,
  },
  label: {
    letterSpacing: 0.8,
    fontSize: 11,
    fontWeight: '700',
  },
  amount: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  zeroHint: {
    marginTop: 2,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: Spacing.md,
  },
  fundButton: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: Radii.full,
    backgroundColor: GOLD,
    shadowColor: GOLD,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  fundText: {
    color: '#090C10',
    fontSize: 14,
  },
  fundPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }],
  },
});
