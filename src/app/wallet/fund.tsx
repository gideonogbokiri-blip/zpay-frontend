import { router } from 'expo-router';
import { useState } from 'react';
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';

import { PaymentSuccess } from '@/components/payment/PaymentSuccess';
import { PaymentFailure } from '@/components/payment/PaymentFailure';
import { ProcessingState } from '@/components/payment/ProcessingState';
import { PaymentSummary } from '@/components/payment/PaymentSummary';
import { WalletBalanceSummary } from '@/components/payment/WalletBalanceSummary';
import { Button, Input, Screen, Text } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';
import {
  invalidateWallet,
  useDVA,
  useElectricityQuickAmounts,
  useFundWallet,
  useVerifyFund,
  useWallet,
} from '@/hooks/queries';
import { formatNaira } from '@/lib/format';
import { ApiError, normalizeError } from '@/lib/api/errors';
import { copyToClipboard } from '@/lib/clipboard';
import { Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

type Stage = 'form' | 'processing' | 'success' | 'failure';
type Method = 'bank' | 'card';

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

function isDvaUnavailable(error: unknown): boolean {
  return error instanceof ApiError && error.code === 'DVA_NOT_AVAILABLE';
}

export default function FundWalletScreen() {
  const colors = useTheme();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [method, setMethod] = useState<Method>('bank');
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>('form');
  const [failureMessage, setFailureMessage] = useState<string | undefined>();
  const [paystackReference, setPaystackReference] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [balanceChecked, setBalanceChecked] = useState(false);

  const { data: wallet } = useWallet();
  const { data: quickAmounts } = useElectricityQuickAmounts();
  const { data: dva, isLoading: dvaLoading, error: dvaError, refetch: refetchDva } = useDVA();
  const fund = useFundWallet();
  const verify = useVerifyFund();
  const quickAmountsList = quickAmounts ?? [1000, 2000, 5000, 10000];

  const parsedAmount = Number(amount);
  const valid = amount.trim().length > 0 && Number.isFinite(parsedAmount) && parsedAmount > 0;
  const verifying = verify.isPending && stage === 'processing';

  const copyAccountNumber = async () => {
    if (!dva) return;
    await copyToClipboard(dva.accountNumber).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const refreshBalance = async () => {
    await invalidateWallet(queryClient);
    setBalanceChecked(true);
    setTimeout(() => setBalanceChecked(false), 1600);
  };

  const submit = () => {
    if (!valid) {
      setAmountError('Enter an amount greater than zero.');
      return;
    }
    setAmountError(null);
    setStage('processing');
    fund.mutate(
      { amount: parsedAmount, idempotencyKey: makeIdempotencyKey() },
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
              Pay {formatNaira(parsedAmount || 0)} securely in the Paystack checkout that just
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
      <View style={[styles.methodTabs, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <MethodTab
          label="Bank Transfer"
          active={method === 'bank'}
          onPress={() => setMethod('bank')}
        />
        <MethodTab
          label="Card"
          active={method === 'card'}
          onPress={() => setMethod('card')}
        />
      </View>

      {method === 'bank' ? (
        <View style={styles.bankWrap}>
          {dvaLoading ? (
            <ProcessingState
              title="Preparing your account"
              message="Setting up your dedicated bank account number with Paystack..."
            />
          ) : dva ? (
            <>
              <View style={styles.dvaCard}>
                <View style={styles.dvaHeader}>
                  <View style={[styles.dvaLogo, { backgroundColor: colors.accentSoft, borderColor: colors.accent }]}>
                    <Ionicons name="business-outline" size={18} color={colors.accent} />
                  </View>
                  <View style={styles.dvaHeaderText}>
                    <Text variant="smallBold" style={{ color: '#FFFFFF' }}>
                      Deposit to this account
                    </Text>
                    <Text variant="caption" style={styles.dvaBankName}>
                      {dva.bankName}
                    </Text>
                  </View>
                </View>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Copy account number"
                  onPress={copyAccountNumber}
                  style={({ pressed }) => [styles.dvaNumberWrap, pressed && styles.pressed]}>
                  <Text variant="amount" style={styles.dvaNumber} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
                    {dva.accountNumber}
                  </Text>
                  <View style={[styles.copyPill, { backgroundColor: 'rgba(245,184,46,0.16)', borderColor: 'rgba(245,184,46,0.35)' }]}>
                    <Ionicons name={copied ? 'checkmark-circle' : 'copy-outline'} size={14} color={GOLD} />
                    <Text variant="caption" style={styles.copyText}>
                      {copied ? 'Copied!' : 'Copy'}
                    </Text>
                  </View>
                </Pressable>

                <View style={styles.dvaNameRow}>
                  <Text variant="caption" style={styles.dvaAccountLabel}>
                    ACCOUNT NAME
                  </Text>
                  <Text variant="smallBold" style={{ color: '#FFFFFF' }} numberOfLines={1}>
                    {dva.accountName}
                  </Text>
                </View>
              </View>

              <View style={[styles.infoCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
                <Text variant="smallBold" color="text" style={{ marginBottom: 4 }}>
                  How it works
                </Text>
                <Text variant="body" color="textSecondary" style={styles.infoLine}>
                  1. Copy the account number above or save it.
                </Text>
                <Text variant="body" color="textSecondary" style={styles.infoLine}>
                  2. Transfer any amount from your bank app.
                </Text>
                <Text variant="body" color="textSecondary" style={styles.infoLine}>
                  3. Your ZPAY wallet is credited automatically within moments.
                </Text>
              </View>

              <View style={styles.actions}>
                <Button label={balanceChecked ? 'Balance refreshed' : 'I have sent money'} onPress={refreshBalance} />
                <Text variant="caption" color="textMuted" style={styles.refreshHint}>
                  Tap after you transfer to refresh your balance. If it hasn't landed yet, it usually appears within a minute.
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={[styles.unavailableCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
                <View style={[styles.confirmIcon, { backgroundColor: colors.accentSoft }]}>
                  <Ionicons
                    name={isDvaUnavailable(dvaError) ? 'card-outline' : 'alert-circle-outline'}
                    size={20}
                    color={colors.accent}
                  />
                </View>
                <Text variant="heading" style={{ textAlign: 'center' }}>
                  {isDvaUnavailable(dvaError) ? 'Bank transfer is coming soon' : 'Could not load your account'}
                </Text>
                <Text variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
                  {isDvaUnavailable(dvaError)
                    ? "Dedicated bank accounts aren't activated for this business yet. Please fund with card until we enable bank transfer deposits."
                    : normalizeError(dvaError).message}
                </Text>
              </View>
              <View style={styles.actions}>
                {isDvaUnavailable(dvaError) ? (
                  <Button label="Fund with card instead" onPress={() => setMethod('card')} />
                ) : (
                  <Button
                    label="Try again"
                    onPress={() => refetchDva()}
                    loading={dvaLoading}
                  />
                )}
              </View>
            </>
          )}
        </View>
      ) : (
        <>
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
        </>
      )}
    </Screen>
  );
}

function MethodTab({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const colors = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.methodTab,
        active && { backgroundColor: colors.accent, borderColor: colors.accent },
        pressed && styles.pressed,
      ]}>
      <Text variant="smallBold" style={{ color: active ? colors.background : colors.text }}>
        {label}
      </Text>
    </Pressable>
  );
}

const GOLD = '#F5B82E';

const styles = StyleSheet.create({
  methodTabs: {
    flexDirection: 'row',
    gap: 4,
    padding: 4,
    borderRadius: Radii.xl,
    borderWidth: 1,
  },
  methodTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  bankWrap: {
    gap: Spacing.lg,
    marginTop: Spacing.lg,
  },
  dvaCard: {
    borderRadius: Radii.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
    backgroundColor: '#181D26',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  dvaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dvaLogo: {
    width: 38,
    height: 38,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  dvaHeaderText: {
    flex: 1,
    gap: 1,
  },
  dvaBankName: {
    color: 'rgba(255,255,255,0.6)',
  },
  dvaNumberWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  dvaNumber: {
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: 2,
    color: '#FFFFFF',
    flex: 1,
  },
  copyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Radii.full,
    borderWidth: 1,
  },
  copyText: {
    color: GOLD,
    fontWeight: '700',
  },
  dvaNameRow: {
    gap: 2,
  },
  dvaAccountLabel: {
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '700',
    fontSize: 10,
  },
  infoCard: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    padding: Spacing.lg,
    gap: 2,
  },
  infoLine: {
    lineHeight: 20,
  },
  refreshHint: {
    textAlign: 'center',
  },
  unavailableCard: {
    marginTop: Spacing.lg,
    padding: Spacing.xl,
    borderRadius: Radii.xl,
    borderWidth: 1,
    alignItems: 'center',
    gap: Spacing.md,
  },
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
  summary: {
    marginTop: Spacing.xxl,
    gap: Spacing.md,
  },
  actions: {
    marginTop: Spacing.xxl,
    gap: Spacing.sm,
  },
  pressed: {
    opacity: 0.75,
  },
});