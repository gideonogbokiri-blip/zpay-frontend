import { Link, router } from 'expo-router';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

import { Icon, type IconName } from '@/components/Icon';
import { TransactionRow } from '@/components/TransactionRow';
import { WalletCard } from '@/components/WalletCard';
import { Screen, Text } from '@/components/ui';
import { ACTIVE_SERVICES, SERVICE_META, SERVICE_NAMES } from '@/constants/services';
import { useNotifications, useServices, useTransactions, useWallet } from '@/hooks/queries';
import { useAuth } from '@/hooks/use-auth';
import type { ServiceType } from '@/lib/api';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

const GOLD = '#F5B82E';

const SERVICE_COPY: Record<ServiceType, { title: string; subtitle: string; tint: string }> = {
  ELECTRICITY: { title: 'Electricity', subtitle: 'Buy Electricity', tint: '#F5B82E' },
  AIRTIME: { title: 'Airtime', subtitle: 'Top Up Airtime', tint: '#2563EB' },
  DATA: { title: 'Data', subtitle: 'Buy Data', tint: '#22C55E' },
  TV: { title: 'TV', subtitle: 'Pay TV Subscription', tint: '#A78BFA' },
  WAEC: { title: 'WAEC', subtitle: 'Register for WAEC', tint: '#22C55E' },
  JAMB: { title: 'JAMB', subtitle: 'Register for JAMB', tint: '#EF4444' },
  NECO: { title: 'NECO', subtitle: 'Register for NECO', tint: '#F78FB3' },
};

function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function HeaderIcon({ children, onPress, label }: { children: ReactNode; onPress?: () => void; label: string }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.headerIcon, pressed && styles.headerIconPressed]}>
      {children}
    </Pressable>
  );
}

function ServiceCard({ type, index }: { type: ServiceType; index: number }) {
  const colors = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;
  const copy = SERVICE_COPY[type] ?? { title: SERVICE_NAMES[type], subtitle: 'Pay in seconds', tint: SERVICE_META[type].color };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay: 100 + index * 50,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: 100 + index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateY]);

  return (
    <Animated.View style={[styles.serviceCardAnim, { opacity, transform: [{ translateY }] }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={copy.title}
        onPress={() => router.push(`/services/${type.toLowerCase()}`)}
        style={({ pressed }) => [
          styles.serviceCard,
          { backgroundColor: colors.surfaceElevated, borderColor: colors.border },
          pressed && styles.cardPressed,
        ]}>
        <View style={[styles.serviceIcon, { backgroundColor: withAlpha(copy.tint, 0.16), borderColor: withAlpha(copy.tint, 0.22) }]}>
          <Icon name={SERVICE_META[type].icon as IconName} size={IconSize.md} color={copy.tint} />
        </View>
        <View style={styles.serviceFooter}>
          <View style={styles.serviceText}>
            <Text variant="bodyBold" numberOfLines={1}>
              {copy.title}
            </Text>
            <Text variant="caption" color="textMuted" numberOfLines={1}>
              {copy.subtitle}
            </Text>
          </View>
          <Icon name="arrow-forward" size={IconSize.sm} color={colors.textMuted} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const colors = useTheme();
  const { user } = useAuth();
  const { data: wallet, isLoading: walletLoading, isError: walletError } = useWallet();
  const { data: services } = useServices();
  const { data: transactions } = useTransactions({ service: 'ALL', status: 'ALL' });
  const { data: notifications } = useNotifications();
  const [hidden, setHidden] = useState(false);
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(8)).current;

  const serviceOrder =
    (services?.map((s) => s.type).filter((t) => ACTIVE_SERVICES.includes(t)) as ServiceType[]) ?? [];
  const visibleServices = serviceOrder.length ? serviceOrder : ACTIVE_SERVICES;
  const recent = transactions?.items.slice(0, 5) ?? [];
  const unreadCount = notifications?.filter((n) => !n.readAt).length ?? 0;
  const fullName = user?.fullName?.trim() || 'Demo User';
  const initial = fullName.charAt(0).toUpperCase();

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning,';
    if (hour < 17) return 'Good afternoon,';
    return 'Good evening,';
  })();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerOpacity, headerTranslateY]);

  return (
    <Screen title={undefined} scroll>
      <Animated.View style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerTranslateY }] }]}>
        <Link href="/me" asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Profile"
            style={({ pressed }) => [styles.avatarWrap, pressed && styles.headerIconPressed]}>
            <Text style={styles.avatarInitial}>{initial}</Text>
          </Pressable>
        </Link>
        <View style={styles.headerText}>
          <Text variant="small" color="textMuted" style={styles.greetingLabel}>
            {greeting}
          </Text>
          <Text variant="heading" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.76} style={styles.userName}>
            {fullName}
          </Text>
          <Text variant="caption" color="textSecondary" numberOfLines={1} style={styles.subtitle}>
            Manage your bills and wallet here
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Link href="/notifications" asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              style={({ pressed }) => [styles.headerIcon, pressed && styles.headerIconPressed]}>
              <Icon name="notifications-outline" size={IconSize.md} color={colors.text} />
              {unreadCount > 0 ? <View style={styles.unreadDot} /> : null}
            </Pressable>
          </Link>
          <HeaderIcon label={hidden ? 'Show balance' : 'Hide balance'} onPress={() => setHidden((v) => !v)}>
            <Icon name={hidden ? 'eye-off-outline' : 'eye-outline'} size={IconSize.md} color={colors.text} />
          </HeaderIcon>
        </View>
      </Animated.View>

      <View style={styles.walletWrap}>
        <WalletCard
          balance={wallet?.balance ?? 0}
          loading={walletLoading}
          hidden={hidden}
          onToggleHidden={() => setHidden((v) => !v)}
          onFundPress={() => router.push('/wallet/fund')}
        />
        {walletError && !walletLoading ? (
          <Text variant="caption" color="danger" style={styles.walletError}>
            Couldn't refresh your balance. Check your connection.
          </Text>
        ) : null}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="title" style={styles.sectionTitle}>
            Services
          </Text>
          <Link href="/service" asChild>
            <Pressable accessibilityRole="button" style={({ pressed }) => [styles.viewAll, pressed && styles.cardPressed]}>
              <Text variant="smallBold" style={styles.viewAllText}>
                All Services
              </Text>
              <Icon name="chevron-forward" size={IconSize.sm} color={GOLD} />
            </Pressable>
          </Link>
        </View>
        <View style={styles.serviceGrid}>
          {visibleServices.map((type, index) => (
            <ServiceCard key={type} type={type} index={index} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="title" style={styles.sectionTitle}>
            Recent transactions
          </Text>
          <Link href="/history" asChild>
            <Pressable accessibilityRole="button" style={({ pressed }) => [styles.viewAll, pressed && styles.cardPressed]}>
              <Text variant="smallBold" style={styles.viewAllText}>
                View all
              </Text>
              <Icon name="chevron-forward" size={IconSize.sm} color={GOLD} />
            </Pressable>
          </Link>
        </View>
        {recent.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
            <Icon name="receipt-outline" size={IconSize.xl} color={colors.textMuted} />
            <Text variant="small" color="textMuted" style={styles.emptyText}>
              No transactions yet. Pay a bill to get started.
            </Text>
          </View>
        ) : (
          <View style={styles.transactionList}>
            {recent.map((tx) => (
              <TransactionRow key={tx.id} transaction={tx} onPress={() => router.push(`/tx/${tx.id}`)} />
            ))}
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  avatarWrap: {
    width: 48,
    height: 48,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: GOLD,
    backgroundColor: '#151A21',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '800',
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  greetingLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  userName: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151A21',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  headerIconPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.95 }],
  },
  unreadDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  walletWrap: {
    marginTop: Spacing.xs,
  },
  walletError: {
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  section: {
    marginTop: Spacing.xxxl,
    gap: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '800',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    minHeight: 34,
  },
  viewAllText: {
    color: GOLD,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  serviceCardAnim: {
    width: '48%',
    flexGrow: 1,
  },
  serviceCard: {
    minHeight: 138,
    borderRadius: Radii.xl,
    borderWidth: 1,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  serviceIcon: {
    width: 42,
    height: 42,
    borderRadius: Radii.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  serviceText: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  cardPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.97 }],
  },
  transactionList: {
    gap: Spacing.md,
  },
  emptyCard: {
    alignItems: 'center',
    gap: Spacing.md,
    borderRadius: Radii.xl,
    borderWidth: 1,
    padding: Spacing.xxl,
  },
  emptyText: {
    textAlign: 'center',
  },
});
