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
import { formatNaira } from '@/lib/format';
import type { ServiceType } from '@/lib/api';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export default function HomeScreen() {
  const colors = useTheme();
  const { user } = useAuth();
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { data: services } = useServices();
  const { data: transactions } = useTransactions({ service: 'ALL', status: 'ALL' });

  const serviceOrder =
    (services?.map((s) => s.type).filter((t) => ACTIVE_SERVICES.includes(t)) as ServiceType[]) ?? [];
  const visibleServices = serviceOrder.length ? serviceOrder : ACTIVE_SERVICES;
  const recent = transactions?.items.slice(0, 5) ?? [];
  const { data: notifications } = useNotifications();
  const unreadCount = notifications?.filter((n) => !n.readAt).length ?? 0;

  return (
    <Screen title={undefined} scroll>
      <View style={styles.gradientWrap}>
        <GradientHeader>
          <View style={styles.header}>
            <View style={styles.brandBlock}>
              <Text variant="title" style={[styles.greeting, { color: colors.white }]}>
                Hello, {user?.fullName ? user.fullName.split(' ')[0] : 'there'} 👋
              </Text>
              <Text variant="small" style={[styles.greetingSub, { color: '#A7F3D0' }]}>
                Good to have you back
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
                  <Icon name="person" size={IconSize.md} color={colors.white} />
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
          onPress={() => router.push('/wallet/fund')}
        />
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

      <View style={styles.placeholderNote}>
        <Text variant="caption" color="textMuted">
          {wallet ? `Available balance ${formatNaira(wallet.balance)}` : ' '}
        </Text>
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
    color: '#A7F3D0',
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
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletOverlap: {
    marginTop: -70,
    marginHorizontal: -Spacing.lg,
    shadowColor: '#00C54C',
    shadowOpacity: 0.28,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 18,
  },
  pressed: {
    opacity: 0.7,
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
  placeholderNote: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
});