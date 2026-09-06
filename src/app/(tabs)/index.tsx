import { Link, router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { GradientHeader } from '@/components/GradientHeader';
import { Icon } from '@/components/Icon';
import { ServiceButton } from '@/components/ServiceButton';
import { TransactionRow } from '@/components/TransactionRow';
import { WalletCard } from '@/components/WalletCard';
import { Screen, Text } from '@/components/ui';
import { ACTIVE_SERVICES, SERVICE_META, SERVICE_NAMES } from '@/constants/services';
import { useAuth } from '@/hooks/use-auth';
import { useNotifications, useServices, useTransactions, useWallet } from '@/hooks/queries';
import type { ServiceType } from '@/lib/api';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export default function HomeScreen() {
  const colors = useTheme();
  const { user } = useAuth();
  const { data: wallet, isLoading: walletLoading, isError: walletError } = useWallet();
  const { data: services } = useServices();
  const { data: transactions } = useTransactions({ service: 'ALL', status: 'ALL' });

  const serviceOrder =
    (services?.map((s) => s.type).filter((t) => ACTIVE_SERVICES.includes(t)) as ServiceType[]) ?? [];
  const visibleServices = serviceOrder.length ? serviceOrder : ACTIVE_SERVICES;
  const recent = transactions?.items.slice(0, 5) ?? [];
  const { data: notifications } = useNotifications();
  const unreadCount = notifications?.filter((n) => !n.readAt).length ?? 0;

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <Screen title={undefined} scroll>
      <View style={styles.gradientWrap}>
        <GradientHeader>
          <View style={styles.header}>
            <View style={styles.brandBlock}>
              <Text variant="title" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.6} style={[styles.greeting, { color: colors.white }]}>
                {greeting}, {user?.fullName ? user.fullName.split(' ')[0] : 'there'} 👋
              </Text>
              <Text variant="small" style={[styles.greetingSub, { color: '#BFD7FF' }]}>
                Manage your bills and wallet here
              </Text>
            </View>
            <View style={styles.headerActions}>
              <Link href="/notifications" asChild>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Notifications"
                  style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
                  <Icon name="notifications-outline" size={IconSize.lg} color={colors.white} />
                  {unreadCount > 0 ? <View style={styles.unreadDot} /> : null}
                </Pressable>
              </Link>
              <Link href="/me" asChild>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Profile"
                  style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}>
                  <Text style={styles.avatarInitial}>
                    {user?.fullName ? user.fullName.trim().charAt(0).toUpperCase() : 'Z'}
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </GradientHeader>
      </View>

      <View style={styles.walletOverlap}>
        <WalletCard
          balance={wallet?.balance ?? 0}
          loading={walletLoading}
          onFundPress={() => router.push('/wallet/fund')}
        />
        {walletError && !walletLoading ? (
          <Text variant="caption" color="danger" style={styles.walletError}>
            Couldn&apos;t refresh your balance. Check your connection.
          </Text>
        ) : null}
      </View>

      <View style={styles.section}>
        <Text variant="title" style={styles.sectionTitle}>
          Services
        </Text>
        <View style={styles.grid}>
          {visibleServices.map((type) => (
            <View key={type} style={styles.gridItem}>
              <ServiceButton
                icon={SERVICE_META[type].icon}
                label={SERVICE_NAMES[type]}
                color={SERVICE_META[type].color}
                layout="home"
                onPress={() => router.push(`/services/${type.toLowerCase()}`)}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="title">Recent transactions</Text>
          <Link href="/history" asChild>
            <Pressable accessibilityRole="button">
              <Text variant="smallBold" color="accent">
                View all
              </Text>
            </Pressable>
          </Link>
        </View>
        {recent.length === 0 ? (
          <Text variant="small" color="textMuted" style={styles.empty}>
            No transactions yet. Pay a bill to get started.
          </Text>
        ) : (
          <View style={styles.list}>
            {recent.map((tx) => (
              <TransactionRow
                key={tx.id}
                transaction={tx}
                onPress={() => router.push(`/tx/${tx.id}`)}
              />
            ))}
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  gradientWrap: {
    marginHorizontal: -Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandBlock: {
    gap: Spacing.xxs,
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  greetingSub: {
    fontSize: 16,
    fontWeight: '600',
    color: '#BFD7FF',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconButton: {
    width: IconSize.xxl,
    height: IconSize.xxl,
    borderRadius: Radii.full,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF453A',
  },
  avatar: {
    width: IconSize.xxl,
    height: IconSize.xxl,
    borderRadius: Radii.full,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: IconSize.lg,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: IconSize.lg + 2,
  },
  walletOverlap: {
    marginTop: -32,
    marginHorizontal: -Spacing.lg,
    shadowColor: '#1E63F7',
    shadowOpacity: 0.22,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  walletError: {
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  section: {
    marginTop: Spacing.xxl,
    gap: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: Spacing.lg,
    columnGap: Spacing.md,
  },
  gridItem: {
    width: '48%',
    alignItems: 'center',
  },
  list: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  empty: {
    paddingVertical: Spacing.md,
  },
});