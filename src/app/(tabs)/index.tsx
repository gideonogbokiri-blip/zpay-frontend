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
import { ZpayLogo } from '@/components/ZpayLogo';

const GOLD = '#F5B82E';

const SERVICE_COPY: Record<ServiceType, { title: string; subtitle: string; tint: string }> = {
  ELECTRICITY: { title: 'Electricity', subtitle: 'Prepaid & postpaid', tint: '#F5B82E' },
  AIRTIME: { title: 'Airtime', subtitle: 'All networks', tint: '#2563EB' },
  DATA: { title: 'Data', subtitle: 'Instant bundles', tint: '#22C55E' },
  TV: { title: 'TV & Exams', subtitle: 'DStv, GOtv, WAEC, JAMB', tint: '#A78BFA' },
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
  const colors = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.headerIcon,
        { backgroundColor: colors.surfaceElevated, borderColor: colors.border },
        pressed && styles.headerIconPressed,
      ]}>
      {children}
    </Pressable>
  );
}

function ServiceCard({ type, index }: { type: ServiceType; index: number }) {
  const colors = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;
  const copy = SERVICE_COPY[type] ?? { title: SERVICE_NAMES[type], subtitle: 'Pay in seconds', tint: SERVICE_META[type].color };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 320,
        delay: 60 + index * 30,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 320,
        delay: 60 + index * 30,
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
        <View style={[styles.serviceIcon, { backgroundColor: withAlpha(copy.tint, 0.14), borderColor: withAlpha(copy.tint, 0.24) }]}>
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
          <Text style={{ color: GOLD, fontSize: 16, fontWeight: '700' }}>→</Text>
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
  const headerTranslateY = useRef(new Animated.Value(6)).current;

  const serviceOrder =
    (services?.map((s) => s.type).filter((t) => ACTIVE_SERVICES.includes(t)) as ServiceType[]) ?? [];
  const visibleServices = serviceOrder.length ? serviceOrder : ACTIVE_SERVICES;
  const recent = transactions?.items.slice(0, 5) ?? [];
  const unreadCount = notifications?.filter((n) => !n.readAt).length ?? 0;
  
  const firstName = user?.fullName?.trim() ? user.fullName.trim().split(' ')[0] : 'Thankgod';
  const initial = firstName.charAt(0).toUpperCase();

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
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerOpacity, headerTranslateY]);

  return (
    <Screen title={undefined} scroll>
      <View style={styles.topBar}>
        <ZpayLogo size={120} />
      </View>

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
          <Text variant="smallBold" color="text" style={styles.greetingLabel}>
            {greeting} {firstName} 👋
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
          onFundPress={() => router.push('/wallet/fund')}
        />
        {walletError && !walletLoading ? (
          <Text variant="caption" color="danger" style={styles.walletError}>
            Couldn't refresh your balance. Check your connection.
          </Text>
        ) : null}
      </View>

      <View style={styles.quickActionsRow}>
        <Pressable
          onPress={() => router.push('/wallet/fund')}
          style={({ pressed }) => [styles.quickActionCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }, pressed && styles.cardPressed]}>
          <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(245,184,46,0.14)' }]}>
            <Icon name="add-circle" size={IconSize.sm} color={GOLD} />
          </View>
          <Text variant="smallBold" style={styles.quickActionText}>Fund</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/service')}
          style={({ pressed }) => [styles.quickActionCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }, pressed && styles.cardPressed]}>
          <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(37,99,235,0.14)' }]}>
            <Icon name="flash" size={IconSize.sm} color="#2563EB" />
          </View>
          <Text variant="smallBold" style={styles.quickActionText}>Bills</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/services/airtime')}
          style={({ pressed }) => [styles.quickActionCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }, pressed && styles.cardPressed]}>
          <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(34,197,94,0.14)' }]}>
            <Icon name="phone-portrait" size={IconSize.sm} color="#22C55E" />
          </View>
          <Text variant="smallBold" style={styles.quickActionText}>Airtime</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/services/data')}
          style={({ pressed }) => [styles.quickActionCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }, pressed && styles.cardPressed]}>
          <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(167,139,250,0.14)' }]}>
            <Icon name="wifi" size={IconSize.sm} color="#A78BFA" />
          </View>
          <Text variant="smallBold" style={styles.quickActionText}>Data</Text>
        </Pressable>
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
            <Text variant="smallBold" color="text" style={{ textAlign: 'center' }}>
              No transactions yet
            </Text>
            <Text variant="caption" color="textMuted" style={styles.emptyText}>
              Your completed transactions will appear here.
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
  topBar: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  avatarWrap: {
    width: 44,
    height: 44,
    borderRadius: Radii.full,
    backgroundColor: 'rgba(245, 184, 46, 0.16)',
    borderWidth: 1.5,
    borderColor: 'rgba(245, 184, 46, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: GOLD,
    fontSize: 18,
    fontWeight: '800',
  },
  headerText: {
    flex: 1,
    gap: 1,
  },
  greetingLabel: {
    fontSize: 16,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 13,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  headerIconPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  unreadDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  walletWrap: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xs,
  },
  walletError: {
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  quickActionsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  quickActionCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: Radii.lg,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  quickActionIcon: {
    width: 36,
    height: 36,
    borderRadius: Radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    fontSize: 12,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xxl,
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
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
    minHeight: 120,
    borderRadius: Radii.xl,
    borderWidth: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  serviceIcon: {
    width: 38,
    height: 38,
    borderRadius: Radii.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: Spacing.xs,
  },
  serviceText: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  transactionList: {
    gap: Spacing.sm,
  },
  emptyCard: {
    alignItems: 'center',
    gap: Spacing.sm,
    borderRadius: Radii.xl,
    borderWidth: 1,
    padding: Spacing.xl,
  },
  emptyText: {
    textAlign: 'center',
  },
});
