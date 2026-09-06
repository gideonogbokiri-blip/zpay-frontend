import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from './Icon';
import { StatusBadge } from './ui';
import { Text } from './ui';
import { SERVICE_META } from '@/constants/services';
import { formatNaira, formatDateTime } from '@/lib/format';
import type { Transaction } from '@/lib/api';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export interface TransactionRowProps {
  transaction: Transaction;
  onPress?: () => void;
}

export function TransactionRow({ transaction, onPress }: TransactionRowProps) {
  const colors = useTheme();
  const meta = transaction.service === 'WALLET' ? { icon: 'wallet' as const, color: '#F5B82E' } : SERVICE_META[transaction.service];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${transaction.serviceName} ${formatNaira(transaction.total)}`}
      style={({ pressed }) => [styles.row, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }, pressed && styles.pressed]}>
      <View style={[styles.iconWrap, { backgroundColor: withAlpha(meta.color, 0.15) }]}>
        <Icon name={meta.icon} size={IconSize.md} color={meta.color} />
      </View>
      <View style={styles.main}>
        <Text variant="bodyBold" numberOfLines={1}>
          {transaction.serviceName}
        </Text>
        <Text variant="caption" color="textMuted" numberOfLines={1}>
          {formatDateTime(transaction.createdAt)}
        </Text>
      </View>
      <View style={styles.right}>
        <Text variant="bodyBold" numberOfLines={1}>{formatNaira(transaction.total)}</Text>
        <StatusBadge status={
          transaction.status === 'successful' ? 'success'
            : transaction.status === 'failed' ? 'failed'
            : transaction.status === 'cancelled' ? 'cancelled'
            : 'pending'
        } />
      </View>
      <Icon name="chevron-forward" size={IconSize.sm} color={colors.textMuted} />
    </Pressable>
  );
}

function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderRadius: Radii.xl,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    gap: Spacing.xxs,
  },
  right: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
    maxWidth: 118,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
});
