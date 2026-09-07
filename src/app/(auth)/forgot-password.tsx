import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Button, InlineError, Input, PinInput, Screen, Text, View } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';
import { authApi, normalizeError } from '@/lib/api';
import { isValidOtp } from '@/lib/validation/auth';
import { Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

const RESEND_SECONDS = 30;

export default function ForgotPasswordScreen() {
  const colors = useTheme();
  const { signIn } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  const requestCode = async () => {
    setRequesting(true);
    setError(null);
    try {
      const res = await authApi.requestOtp(phone.trim());
      setVerificationId(res.verificationId);
      if (res.otp && __DEV__) {
        console.log(`[mock-auth] OTP for password reset: ${res.otp}`);
      }
      setStep(2);
      setSeconds(RESEND_SECONDS);
      const timer = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(timer);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } catch (e) {
      setError(normalizeError(e).message);
    } finally {
      setRequesting(false);
    }
  };

  const resetPassword = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const session = await authApi.resetPassword({ verificationId, code, newPassword });
      signIn(session);
      router.replace(session.user.pinSet ? '/' : '/pin-setup');
    } catch (e) {
      setError(normalizeError(e).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 1) {
    return (
      <Screen title="Reset password" subtitle="Enter your phone number and we'll send a code to your phone and email" back>
        <View style={styles.form}>
          <InlineError message={error} />
          <Input
            label="Phone number"
            placeholder="0801 234 5678"
            keyboardType="phone-pad"
            autoFocus
            value={phone}
            onChangeText={setPhone}
          />
          <Button label="Send code" loading={requesting} disabled={requesting || phone.trim().length < 10} onPress={requestCode} />
        </View>
      </Screen>
    );
  }

  const canSubmit = isValidOtp(code) && newPassword.length >= 8;

  return (
    <Screen title="Choose a new password" subtitle="Enter the code and your new password" back>
      <View style={styles.form}>
        <InlineError message={error} />
        <PinInput length={6} value={code} onChange={setCode} label="Verification code" autoFocus />
        <Input
          label="New password"
          placeholder="At least 8 characters"
          secureTextEntry={!showPassword}
          value={newPassword}
          onChangeText={setNewPassword}
          right={
            <Pressable
              onPress={() => setShowPassword((v) => !v)}
              accessibilityRole="button"
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
              hitSlop={8}
              style={{ padding: 4 }}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textMuted} />
            </Pressable>
          }
        />
        <Button label="Reset password" loading={submitting} disabled={submitting || !canSubmit} onPress={resetPassword} />
      </View>

      <View style={styles.footer}>
        {seconds > 0 ? (
          <Text variant="small" color="textSecondary">
            Resend code in {seconds}s
          </Text>
        ) : (
          <Button label="Resend code" variant="ghost" loading={requesting} onPress={requestCode} />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: Spacing.lg,
    marginTop: Spacing.xxxl,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
});