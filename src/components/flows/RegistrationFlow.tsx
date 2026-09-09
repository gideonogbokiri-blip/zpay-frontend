import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { PaymentResultScreen, type PaymentResult } from './PaymentResultScreen';
import { PaymentSummary } from '../payment/PaymentSummary';
import { WalletBalanceSummary } from '../payment/WalletBalanceSummary';
import { Icon } from '../Icon';
import { Button, Input, PinInput, Screen, Text } from '../ui';
import { isInsufficientFunds, type ServiceApplication, type Transaction } from '@/lib/api';
import { EXAM_PROVIDER_LOGOS } from '@/constants/provider-logos';
import { NIGERIAN_STATES, SUBJECTS } from '@/constants/services';
import { useAuth } from '@/hooks/use-auth';
import { useRegisterService, useRegistrationFee, useWallet } from '@/hooks/queries';
import { formatNaira } from '@/lib/format';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export interface RegistrationFlowProps {
  service: 'WAEC' | 'JAMB' | 'NECO';
  serviceName: string;
}

type Step = 'details' | 'review' | 'pin' | 'result';

function makeIdempotencyKey(): string {
  return `reg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function ComingSoon({ serviceName }: { serviceName: string }) {
  const colors = useTheme();
  return (
    <Screen title={serviceName} back>
      <View style={styles.comingSoon}>
        <View style={[styles.comingSoonBadge, { backgroundColor: colors.accentSoft }]}>
          <Icon name="time-outline" size={IconSize.xxl} color={colors.accent} />
        </View>
        <Text variant="heading" style={styles.comingSoonTitle}>
          Coming soon
        </Text>
        <Text variant="body" color="textSecondary" style={styles.comingSoonText}>
          {serviceName} registration is not available yet. Check back soon — we're working on it.
        </Text>
      </View>
    </Screen>
  );
}

export function RegistrationFlow({ service, serviceName }: RegistrationFlowProps) {
  const colors = useTheme();
  const { user } = useAuth();
  const { data: feeData } = useRegistrationFee(service);
  const { data: wallet } = useWallet();
  const register = useRegisterService();

  const fee = feeData?.fee ?? 0;

  const [step, setStep] = useState<Step>('details');
  const [fullName, setFullName] = useState(user?.fullName ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [state, setState] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [profileId, setProfileId] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [result, setResult] = useState<PaymentResult>({ kind: 'idle' });

  const toggleSubject = (subject: string) => {
    setSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Enter the candidate’s full name.';
    if (!/^\d{11}$/.test(phone)) errors.phone = 'Enter a valid 11-digit phone number.';
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email address.';
    if (!state) errors.state = 'Select the candidate’s state.';
    if (subjects.length < 3) errors.subjects = 'Select at least 3 subjects.';
    if (service === 'JAMB' && !profileId.trim()) errors.profileId = 'Enter the candidate’s JAMB profile ID.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = () => {
    if (pin.length !== 4) {
      setPinError('Enter your 4-digit transaction PIN.');
      return;
    }
    setPinError(null);
    setResult({ kind: 'processing' });
    setStep('result');
    register.mutate(
      {
        service,
        pin,
        idempotencyKey: makeIdempotencyKey(),
        amount: fee,
        payload: {
          fullName: fullName.trim(),
          phone,
          email: email.trim(),
          state,
          subjects,
          exam: serviceName,
          ...(service === 'JAMB' ? { profileId: profileId.trim() } : {}),
        },
        metadata: { provider: 'ZPAY Exams' },
      },
      {
        onSuccess: ({ transaction, application }: { transaction: Transaction; application: ServiceApplication }) => {
          if (transaction.status === 'pending') {
            setResult({
              kind: 'pending',
              message: 'Your registration payment is being confirmed by the exam provider. It usually completes within a minute.',
            });
            return;
          }
          setResult({
            kind: 'success',
            transaction,
            registrationStatus:
              application.registrationStatus === 'registered' ? 'Registered' : application.registrationStatus,
          });
        },
        onError: (error) => {
          if (isInsufficientFunds(error)) {
            setResult({
              kind: 'insufficient',
              data: error.data as { balance: number; required: number; needed: number },
              message: error.message,
            });
          } else {
            setResult({ kind: 'failure', message: error.message });
          }
        },
      }
    );
  };

  if (service === 'NECO') {
    return <ComingSoon serviceName={serviceName} />;
  }

  if (step === 'result') {
    return (
      <Screen title={serviceName} back>
        <PaymentResultScreen
          result={result}
          onViewReceipt={(tx) => router.replace(`/tx/${tx.id}/receipt`)}
          onDone={() => router.replace('/')}
          onRetry={() => {
            setPin('');
            setStep('pin');
          }}
          onBackToService={() => {
            setPin('');
            setStep('details');
          }}
          onHome={() => router.replace('/')}
          onFundWallet={() => router.push('/wallet/fund')}
          onViewTransactions={() => router.replace('/history')}
          onCancel={() => {
            setPin('');
            setStep('review');
          }}
        />
      </Screen>
    );
  }

  return (
    <Screen title={serviceName} back scroll>
      {step === 'details' ? (
        <View style={styles.step}>
          <View style={[styles.feeCard, { backgroundColor: colors.accentSoft }]}>
            {EXAM_PROVIDER_LOGOS[service] ? (
              <View style={styles.examBadge}>
                <Image source={EXAM_PROVIDER_LOGOS[service]} style={styles.examLogo} contentFit="contain" />
              </View>
            ) : null}
            <Text variant="label" color="textSecondary">
              Registration fee
            </Text>
            <Text variant="heading" color="accent">
              {formatNaira(fee)}
            </Text>
          </View>

          <Input
            label="Full name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="e.g. Adewale Okafor"
            autoCapitalize="words"
            error={formErrors.fullName ?? null}
          />
          {service === 'JAMB' ? (
            <Input
              label="JAMB profile ID"
              value={profileId}
              onChangeText={(text) => setProfileId(text.replace(/[^0-9]/g, ''))}
              placeholder="e.g. 0123456789"
              keyboardType="number-pad"
              error={formErrors.profileId ?? null}
            />
          ) : null}
          <Input
            label="Phone number"
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, '').slice(0, 11))}
            placeholder="e.g. 08031234567"
            keyboardType="number-pad"
            error={formErrors.phone ?? null}
          />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="e.g. candidate@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={formErrors.email ?? null}
          />
          <View style={styles.field}>
            <Text variant="label" color="textSecondary" style={styles.fieldLabel}>
              State
            </Text>
            <View style={styles.stateGrid}>
              {NIGERIAN_STATES.map((s) => {
                const selected = s === state;
                return (
                  <Pressable
                    key={s}
                    onPress={() => setState(s)}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`State ${s}`}
                    style={({ pressed }) => [
                      styles.stateChip,
                      {
                        backgroundColor: selected ? colors.accentSoft : colors.surfaceElevated,
                        borderColor: selected ? colors.accent : colors.border,
                      },
                      pressed && styles.pressed,
                    ]}>
                    <Text variant="small" style={{ color: selected ? colors.accent : colors.text }}>
                      {s}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {formErrors.state ? <Text variant="caption" color="danger">{formErrors.state}</Text> : null}
          </View>

          <View style={styles.field}>
            <Text variant="label" color="textSecondary" style={styles.fieldLabel}>
              Subjects (select at least 3)
            </Text>
            <View style={styles.subjectGrid}>
              {SUBJECTS[service].map((subject) => {
                const selected = subjects.includes(subject);
                return (
                  <Pressable
                    key={subject}
                    onPress={() => toggleSubject(subject)}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`Subject ${subject}`}
                    style={({ pressed }) => [
                      styles.subjectChip,
                      {
                        backgroundColor: selected ? colors.accentSoft : colors.surfaceElevated,
                        borderColor: selected ? colors.accent : colors.border,
                      },
                      pressed && styles.pressed,
                    ]}>
                    <Text variant="small" style={{ color: selected ? colors.accent : colors.text }}>
                      {subject}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {formErrors.subjects ? <Text variant="caption" color="danger">{formErrors.subjects}</Text> : null}
          </View>

          <View style={styles.stepActions}>
            <Button label="Continue" onPress={() => validate() && setStep('review')} />
          </View>
        </View>
      ) : null}

      {step === 'review' ? (
        <View style={styles.step}>
          <Text variant="title" style={styles.stepTitle}>
            Review & confirm
          </Text>
          <PaymentSummary
            rows={[
              { label: 'Service', value: serviceName },
              { label: 'Candidate', value: fullName.trim() },
              { label: 'Phone', value: phone },
              { label: 'Email', value: email.trim() },
              { label: 'State', value: state },
              { label: 'Subjects', value: `${subjects.length} selected` },
              { label: 'Registration fee', value: formatNaira(fee) },
              { label: 'Total', value: formatNaira(fee), strong: true },
            ]}
          />
          <WalletBalanceSummary currentBalance={wallet?.balance ?? 0} total={fee} remainingBalance={(wallet?.balance ?? 0) - fee} />
          <View style={styles.stepActions}>
            <Button label="Pay" onPress={() => setStep('pin')} />
            <Button label="Back" variant="ghost" onPress={() => setStep('details')} />
          </View>
        </View>
      ) : null}

      {step === 'pin' ? (
        <View style={styles.step}>
          <Text variant="title" style={styles.stepTitle}>
            Enter transaction PIN
          </Text>
          <PinInput
            length={4}
            value={pin}
            onChange={(v) => {
              setPin(v);
              setPinError(null);
            }}
            error={pinError}
            label="Transaction PIN"
          />
          <View style={[styles.pinSummary, { backgroundColor: colors.surfaceElevated }]}>
            <Text variant="small" color="textSecondary">
              Total
            </Text>
            <Text variant="bodyBold">{formatNaira(fee)}</Text>
          </View>
          <View style={styles.stepActions}>
            <Button label="Confirm payment" disabled={pin.length !== 4} onPress={submit} />
            <Button label="Back" variant="ghost" onPress={() => setStep('review')} />
          </View>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  step: {
    gap: Spacing.lg,
    paddingTop: Spacing.md,
  },
  comingSoon: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Spacing.xxxl,
    gap: Spacing.sm,
  },
  comingSoonBadge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  comingSoonTitle: {
    textAlign: 'center',
  },
  comingSoonText: {
    textAlign: 'center',
    paddingHorizontal: Spacing.xxxl,
  },
  stepTitle: {
    marginBottom: Spacing.xs,
  },
  feeCard: {
    padding: Spacing.lg,
    borderRadius: Radii.md,
    gap: Spacing.xs,
    alignItems: 'center',
  },
  examBadge: {
    width: 56,
    height: 56,
    borderRadius: Radii.full,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
    overflow: 'hidden',
  },
  examLogo: {
    width: 44,
    height: 44,
  },
  field: {
    gap: Spacing.xs,
  },
  fieldLabel: {
    marginBottom: Spacing.xs,
  },
  stateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  stateChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.full,
    borderWidth: 1,
  },
  subjectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  subjectChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.full,
    borderWidth: 1,
  },
  stepActions: {
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  pinSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderRadius: Radii.md,
  },
  pressed: {
    opacity: 0.75,
  },
});