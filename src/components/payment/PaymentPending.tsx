import { StyleSheet, View } from 'react-native';

import { Icon } from '../Icon';
import { Button, Text } from '../ui';
import { IconSize, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export interface PaymentPendingProps {
  message?: string;
  onDone?: () => void;
  onViewTransactions?: () => void;
}

export function PaymentPending({
  message = 'Your payment is being confirmed by the provider. It usually completes within a minute.',
  onDone,
  onViewTransactions,
}: PaymentPendingProps) {
  const colors = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor: colors.accentSoft }]}>
        <Icon name="time-outline" size={IconSize.xxl} color={colors.accent} />
      </View>
      <Text variant="heading" style={styles.title}>
        Payment in progress
      </Text>
      <Text variant="body" color="textSecondary" style={styles.message}>
        {message}
      </Text>

      <View style={[styles.info, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Icon name="information-circle-outline" size={IconSize.md} color={colors.textSecondary} />
        <Text variant="small" color="textSecondary" style={styles.infoText}>
          Your wallet is not charged until the provider confirms your payment. Check your transaction history in a
          moment.
        </Text>
      </View>

      <View style={styles.actions}>
        {onViewTransactions ? (
          <Button label="View Transactions" variant="secondary" onPress={onViewTransactions} />
        ) : null}
        {onDone ? <Button label="Done" onPress={onDone} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Spacing.xxxl,
    gap: Spacing.sm,
  },
  badge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    paddingHorizontal: Spacing.xxxl,
  },
  info: {
    alignSelf: 'stretch',
    marginTop: Spacing.xl,
    borderRadius: Spacing.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
  },
  actions: {
    alignSelf: 'stretch',
    gap: Spacing.md,
    marginTop: Spacing.xxxl,
  },
});