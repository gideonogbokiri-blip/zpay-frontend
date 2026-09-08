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
  const entranceY = useRef(new Animated.Value(15)).current;
  const shimmer = useRef(new Animated.Value(0)).current;

  const isHidden = hidden ?? localHidden;
  const toggleHidden = onToggleHidden ?? (() => setLocalHidden((v) => !v));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entranceOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(entranceY, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    const shimmerLoop = Animated.loop(
      Animated.sequence([
        Animated.delay(1400),
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    shimmerLoop.start();
    return () => shimmerLoop.stop();
  }, [entranceOpacity, entranceY, shimmer]);

  useEffect(() => {
    if (loading) return;
    const listener = animatedBalance.addListener(({ value }) => setDisplay(Math.round(value)));
    Animated.timing(animatedBalance, {
      toValue: balance,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    return () => {
      animatedBalance.removeListener(listener);
    };
  }, [balance, loading, animatedBalance]);

  const shimmerX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-260, 340],
  });
  const balanceText = isHidden ? '••••••' : formatNaira(display);

  return (
    <Animated.View style={{ opacity: entranceOpacity, transform: [{ translateY: entranceY }] }}>
      <LinearGradient
        colors={['#151A21', '#121820', '#221A0D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { borderColor: colors.border }]}>
        <View pointerEvents="none" style={styles.goldHalo} />
        <Animated.View pointerEvents="none" style={[styles.shimmer, { transform: [{ translateX: shimmerX }, { rotate: '18deg' }] }]} />

        <View style={styles.topRow}>
          <View style={styles.walletTitleRow}>
            <View style={styles.walletIconWrap}>
              <Ionicons name="wallet-outline" size={IconSize.md} color={GOLD} />
            </View>
            <Text variant="bodyBold" style={styles.walletTitle}>
              My Wallet
            </Text>
          </View>
          <Pressable
            onPress={toggleHidden}
            accessibilityRole="button"
            accessibilityLabel={isHidden ? 'Show balance' : 'Hide balance'}
            hitSlop={Spacing.sm}
            style={({ pressed }) => [styles.eyeButton, pressed && styles.pressed]}>
            <Ionicons name={isHidden ? 'eye-off-outline' : 'eye-outline'} size={IconSize.md} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.balanceBlock}>
          <Text variant="caption" color="textMuted" style={styles.label}>
            AVAILABLE BALANCE
          </Text>
          {loading ? (
            <Text style={[styles.amount, { color: colors.textMuted }]}>------</Text>
          ) : (
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.58}
              style={[styles.amount, { color: colors.text }]}>
              {balanceText}
            </Text>
          )}
        </View>

        <View style={styles.bottomRow}>
          <Pressable
            onPress={onFundPress}
            accessibilityRole="button"
            accessibilityLabel="Fund wallet"
            style={({ pressed }) => [styles.fundButton, pressed && styles.fundPressed]}>
            <Ionicons name="add" size={IconSize.md} color="#090C10" />
            <Text variant="smallBold" style={styles.fundText}>
              Fund Wallet
            </Text>
            <Ionicons name="arrow-forward" size={IconSize.sm} color="#090C10" />
          </Pressable>
          <View pointerEvents="none" style={styles.walletGraphic}>
            <Ionicons name="card-outline" size={58} color="rgba(245,184,46,0.20)" />
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 24,
    padding: Spacing.xl,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.32,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 12,
  },
  goldHalo: {
    position: 'absolute',
    right: -86,
    top: -80,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(245,184,46,0.13)',
  },
  shimmer: {
    position: 'absolute',
    top: -70,
    width: 52,
    height: 330,
    backgroundColor: 'rgba(255,255,255,0.065)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  walletIconWrap: {
    width: 42,
    height: 42,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245,184,46,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245,184,46,0.22)',
  },
  walletTitle: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  eyeButton: {
    width: 40,
    height: 40,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  balanceBlock: {
    marginTop: Spacing.xxl,
    gap: Spacing.xs,
  },
  label: {
    letterSpacing: 1,
    fontWeight: '700',
  },
  amount: {
    fontSize: FontSize.amount,
    lineHeight: FontSize.amount + 8,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  fundButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radii.full,
    backgroundColor: GOLD,
    shadowColor: GOLD,
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  fundText: {
    color: '#090C10',
  },
  walletGraphic: {
    opacity: 0.9,
  },
  fundPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },
  pressed: {
    opacity: 0.76,
    transform: [{ scale: 0.95 }],
  },
});
