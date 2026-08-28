import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, Pressable, ScrollView, StyleSheet } from 'react-native';

import { Button, InlineError, Input, Screen, Text, View } from '@/components/ui';
import { authApi, normalizeError } from '@/lib/api';
import {
  PRIVACY_POLICY,
  PRIVACY_TITLE,
  TERMS_OF_SERVICE,
  TERMS_TITLE,
} from '@/constants/legal';
import { signupSchema, type SignupFormValues } from '@/lib/validation/auth';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

type PolicyType = 'terms' | 'privacy';

export default function SignupScreen() {
  const colors = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [policy, setPolicy] = useState<PolicyType | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const agreeToTerms = watch('agreeToTerms');

  const onSubmit = async (values: SignupFormValues) => {
    setSubmitting(true);
    setError(null);
    try {
      const { verificationId, otp } = await authApi.signup({
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        password: values.password,
      });
      router.push({ pathname: '/otp', params: { verificationId, otp } });
    } catch (e) {
      setError(normalizeError(e).message);
    } finally {
      setSubmitting(false);
    }
  };

  const policyTitle = policy === 'privacy' ? PRIVACY_TITLE : TERMS_TITLE;
  const policyBody = policy === 'privacy' ? PRIVACY_POLICY : TERMS_OF_SERVICE;

  return (
    <Screen title="Create account" subtitle="Start paying bills in minutes" back>
      <View style={styles.form}>
        <InlineError message={error} />
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <Input
              label="Full name"
              placeholder="Ada Obi"
              autoCapitalize="words"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={errors.fullName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <Input
              label="Phone number"
              placeholder="0801 234 5678"
              keyboardType="phone-pad"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={errors.phone?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              label="Email address"
              placeholder="you@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              label="Password"
              placeholder="At least 6 characters"
              secureTextEntry
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              label="Confirm password"
              placeholder="Repeat your password"
              secureTextEntry
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <View style={styles.consentBlock}>
          <Controller
            control={control}
            name="agreeToTerms"
            render={({ field }) => (
              <Pressable
                onPress={() => field.onChange(!field.value)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: field.value }}
                accessibilityLabel="I agree to the Terms of Service and Privacy Policy"
                style={({ pressed }) => [styles.consentRow, pressed && styles.pressed]}>
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: field.value ? colors.accent : colors.border,
                      backgroundColor: field.value ? colors.accent : colors.input,
                    },
                  ]}>
                  {field.value ? <Text style={styles.checkmark}>✓</Text> : null}
                </View>
                <Text variant="small" color="textSecondary" style={styles.consentText}>
                  I agree to the{' '}
                  <Text
                    variant="smallBold"
                    color="accent"
                    onPress={() => setPolicy('terms')}>
                    Terms of Service
                  </Text>{' '}
                  and{' '}
                  <Text
                    variant="smallBold"
                    color="accent"
                    onPress={() => setPolicy('privacy')}>
                    Privacy Policy
                  </Text>
                </Text>
              </Pressable>
            )}
          />
          {errors.agreeToTerms ? (
            <Text variant="caption" color="danger" style={styles.consentError}>
              {errors.agreeToTerms.message}
            </Text>
          ) : null}
        </View>

        <Button
          label="Create account"
          loading={submitting}
          disabled={submitting || !agreeToTerms}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <View style={styles.footer}>
        <Text variant="small" color="textSecondary">
          Already have an account?{' '}
          <Link href="/login">
            <Text variant="smallBold" color="accent">
              Log in
            </Text>
          </Link>
        </Text>
      </View>

      <Modal
        visible={policy !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setPolicy(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setPolicy(null)}>
          <Pressable style={[styles.modalSheet, { backgroundColor: colors.surfaceElevated }]}>
            <Text variant="title" style={styles.modalTitle}>
              {policyTitle}
            </Text>
            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator>
              <Text variant="small" style={styles.modalBody}>
                {policyBody}
              </Text>
            </ScrollView>
            <Button label="I understand" onPress={() => setPolicy(null)} />
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: Spacing.lg,
    marginTop: Spacing.xxxl,
  },
  consentBlock: {
    gap: Spacing.xs,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  consentText: {
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: Radii.sm,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  consentError: {
    marginLeft: 32,
  },
  pressed: {
    opacity: 0.7,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  modalSheet: {
    maxHeight: '80%',
    borderRadius: Radii.xl,
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  modalTitle: {
    textAlign: 'center',
  },
  modalScroll: {
    flexGrow: 0,
  },
  modalBody: {
    lineHeight: 22,
  },
});
