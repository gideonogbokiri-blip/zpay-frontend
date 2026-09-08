import { router } from 'expo-router';
import { useState } from 'react';
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PaymentSuccess } from '@/components/payment/PaymentSuccess';
import { PaymentFailure } from '@/components/payment/PaymentFailure';
import { ProcessingState } from '@/components/payment/ProcessingState';
import { PaymentSummary } from '@/components/payment/PaymentSummary';
import { WalletBalanceSummary } from '@/components/payment/WalletBalanceSummary';
import { Button, Input, Screen, Text } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';
import { useElectricityQuickAmounts, useFundWallet, useVerifyFund, useWallet } from '@/hooks/queries';
import { formatNaira } from '@/lib/format';
import { normalizeError } from '@/lib/api/errors';
import { Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

const METHODS = ['Card', 'Bank Transfer'];

type Stage = 'form' | 'processing' | 'success' | 'failure';

function makeIdempotencyKey(): string {
  return `fund_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function openPaystack(url: string): void {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    return;
  }
  Linking.openURL(url).catch(() => {});
}

export default function FundWalletScreen() {
  const colors = useTheme();
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState(METHODS[0]);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>('form');
  const [failureMessage, setFailureMessage] = useState<string | undefined>();
  const [paystackReference, setPaystackReference] = useState<string | null>(null);

  const { data: wallet } = useWallet();
  const { data: quickAmounts } = useElectricityQuickAmounts();
  const fund = useFundWallet();
  const verify = useVerifyFund();
  const quickAmountsList = quickAmounts ?? [1000, 2000, 5000, 10000];

  const parsedAmount = Number(amount);
  const valid = amount.trim().length > 0 && Number.isFinite(parsedAmount) && parsedAmount > 0;
  const verifying = verify.isPending && stage === 'processing';

  const submit = () => {
    if (!valid) {
      setAmountError('Enter an amount greater than zero.');
      return;
    }
    setAmountError(null);
    setStage('processing');
    fund.mutate(
      { amount: parsedAmount, method, idempotencyKey: makeIdempotencyKey() },
      {
        onSuccess: (data) => {
          setPaystackReference(data.reference);
          openPaystack(data.authorizationUrl);
        },
        onError: (error) => {
          const err = normalizeError(error);
          setFailureMessage(err.message);
          setStage('failure');
        },
      }
    );
  };

  const confirmPayment = () => {
    if (!paystackReference) return;
    verify.mutate(paystackReference, {
      onSuccess: () => setStage('success'),
      onError: (error) => {
        const err = normalizeError(error);
        if (err.code === 'PAYMENT_PENDING' && err.retryable) {
          // Payment has not completed yet; allow the user to confirm again.
          return;
        }
        setFailureMessage(error.message);
        setStage('failure');
      },
    });
  };

  if (stage === 'processing') {
    if (fund.isPending) {
      return (
        <Screen title="Funding wallet" back>
          <ProcessingState
            title="Starting secure payment"
            message="Please wait while we set up your payment with Paystack. Do not close the app."
            stages={[
              'Validating amount',
              'Opening secure Paystack checkout',
            ]}
          />
        </Screen>
      );
    }
    return (
      <Screen title="Complete payment" back={!verifying}>
        <View style={styles.confirmWrap}>
          <View style={[styles.confirmCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
            <View style={[styles.confirmIcon, { backgroundColor: colors.accentSoft }]}>
              <Ionicons name="lock-closed" size={20} color={colors.accent} />
            </View>
            <Text variant="heading" style={styles.confirmTitle}>
              Complete payment in the window that opened
            </Text>
            <Text variant="body" color="textSecondary" style={styles.confirmMsg}>
              Pay {formatNaira(parsedAmount || 0)} by {method.toLowerCase()} in the Paystack checkout that just
              opened. When you are done, tap the button below to confirm and credit your wallet.
            </Text>
            <View style={[styles.pendingHint, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text variant="caption" color="textMuted">
                If the window did not open, check pop-up blockers and try again.
              </Text>
            </View>
            {verifying ? (
              <ProcessingState
                title="Confirming payment"
                message="Checking with Paystack and crediting your wallet..."
              />
            ) : null}
          </View>
          <View style={styles.confirmActions}>
            <Button label="I have completed payment" onPress={confirmPayment} loading={verifying} />
            <Button
              label="Cancel funding"
              variant="secondary"
              onPress={() => {
                setStage('form');
                setPaystackReference(null);
              }}
            />
          </View>
        </View>
      </Screen>
    );
  }

  if (stage === 'success' && verify.data) {
    const transaction = verify.data.transaction;
    return (
      <Screen title={undefined} back>
        {transaction ? (
          <PaymentSuccess
            transaction={transaction}
            onViewReceipt={() => router.replace(`/tx/${transaction.id}/receipt`)}
            onDone={() => router.replace('/')}
          />
        ) : (
          <View style={styles.confirmWrap}>
            <View style={[styles.confirmCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
              <Text variant="heading" style={{ textAlign: 'center' }}>
                Payment successful
              </Text>
              <Text variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
                Your wallet was funded with {formatNaira(parsedAmount || 0)}.
              </Text>
            </View>
            <Button label="Done" onPress={() => router.replace('/')} />
          </View>
        )}
      </Screen>
    );
  }

  if (stage === 'failure') {
    return (
      <Screen title="Funding failed" back>
        <PaymentFailure
          message={failureMessage}
          onRetry={() => {
            setStage('form');
          }}
          onBackToService={() => router.back()}
          onHome={() => router.replace('/')}
        />
      </Screen>
    );
  }

  return (
    <Screen title="Fund wallet" subtitle="Add money to your ZPAY wallet" back scroll>
      <Input
        label="Amount (NGN)"
        value={amount}
        onChangeText={(text) => {
          setAmount(text.replace(/[^0-9]/g, ''));
          setAmountError(null);
        }}
        keyboardType="number-pad"
        placeholder="0"
        error={amountError}
        hint="Minimum amount is NGN 1."
      />
      <View style={[styles.accountCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
        <View style={styles.accountHeader}>
          <View style={[styles.accountIcon, { backgroundColor: colors.accentSoft, borderColor: colors.accent }]}>
            <Ionicons name="card-outline" size={18} color={colors.accent} />
          </View>
          <View style={styles.accountTitleWrap}>
            <Text variant="smallBold" color="accent">Transfer to your ZPAY account</Text>
            <Text variant="caption" color="textMuted">Use your phone number as the account number</Text>
          </View>
        </View>
        <View style={styles.accountNumberRow}>
          <Text variant="amount" style={{ color: colors.text }} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
            {user?.phone ?? 'Add a phone number'}
          </Text>
          <View style={[styles.accountBrand, { backgroundColor: colors.accent }]}>
            <Text variant="smallBold" style={{ color: colors.background }}>ZPAY</Text>
          </View>
        </View>
        {user?.fullName ? (
          <Text variant="body" color="textSecondary">{user.fullName}</Text>
        ) : null}
        <Text variant="caption" color="textMuted">
          Send money to this account from any Nigerian bank or app. It lands in your ZPAY wallet instantly.
        </Text>
      </View>

      <View style={styles.quickRow}>
        {quickAmountsList.map((value) => (
          <Pressable
            key={value}
            onPress={() => {
              setAmount(String(value));
              setAmountError(null);
            }}
            accessibilityRole="button"
            accessibilityLabel={`Quick amount ${value}`}
            style={({ pressed }) => [
              styles.quickChip,
              {
                backgroundColor: parsedAmount === value ? colors.accentSoft : colors.surfaceElevated,
                borderColor: parsedAmount === value ? colors.accent : colors.border,
              },
              pressed && styles.pressed,
            ]}>
            <Text variant="smallBold" style={{ color: parsedAmount === value ? colors.accent : colors.text }}>
              {formatNaira(value, 0)}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.methods}>
        <Text variant="label" color="textSecondary">
          Payment method
        </Text>
        {METHODS.map((m) => {
          const selected = m === method;
          return (
            <Pressable
              key={m}
              onPress={() => setMethod(m)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={m}
              style={({ pressed }) => [
                styles.methodRow,
                {
                  backgroundColor: selected ? colors.accentSoft : colors.surfaceElevated,
                  borderColor: selected ? colors.accent : colors.border,
                },
                pressed && styles.pressed,
              ]}>
              <Text variant="body" style={{ color: selected ? colors.accent : colors.text }}>
                {m}
              </Text>
              <View
                style={[
                  styles.radio,
                  { borderColor: selected ? colors.accent : colors.textMuted },
                ]}>
                {selected ? <View style={[styles.radioDot, { backgroundColor: colors.accent }]} /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.summary}>
        <PaymentSummary
          rows={[
            { label: 'Amount', value: formatNaira(parsedAmount || 0) },
            { label: 'Fee', value: formatNaira(0) },
            { label: 'Total', value: formatNaira(parsedAmount || 0), strong: true },
          ]}
        />
        <WalletBalanceSummary
          currentBalance={wallet?.balance ?? 0}
          total={parsedAmount || 0}
          remainingBalance={(wallet?.balance ?? 0) - (parsedAmount || 0)}
        />
      </View>

      <View style={styles.actions}>
        <Button
          label={`Fund ${valid ? formatNaira(parsedAmount) : 'wallet'}`}
          onPress={submit}
          disabled={!valid}
          loading={fund.isPending}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  confirmWrap: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.xxl,
  },
  confirmCard: {
    padding: Spacing.lg,
    borderRadius: Radii.xl,
    borderWidth: 1,
    alignItems: 'center',
    gap: Spacing.md,
  },
  confirmIcon: {
    width: 44,
    height: 44,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmTitle: {
    textAlign: 'center',
  },
  confirmMsg: {
    textAlign: 'center',
  },
  pendingHint: {
    alignSelf: 'stretch',
    borderRadius: Radii.md,
    borderWidth: 1,
    padding: Spacing.md,
  },
  confirmActions: {
    gap: Spacing.md,
  },
  accountCard: {
    marginTop: Spacing.xxl,
    padding: Spacing.lg,
    borderRadius: Radii.xl,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  accountIcon: {
    width: 36,
    height: 36,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  accountTitleWrap: {
    flex: 1,
    gap: 1,
  },
  accountNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  accountBrand: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.md,
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  quickChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.full,
    borderWidth: 1,
  },
  methods: {
    marginTop: Spacing.xxl,
    gap: Spacing.sm,
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderRadius: Radii.md,
    borderWidth: 1,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  summary: {
    marginTop: Spacing.xxl,
    gap: Spacing.md,
  },
  actions: {
    marginTop: Spacing.xxl,
  },
  pressed: {
    opacity: 0.75,
  },
});