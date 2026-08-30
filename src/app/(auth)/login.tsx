import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { GradientHeader } from '@/components/GradientHeader';
import { ZpayLogo } from '@/components/ZpayLogo';
import { Button, InlineError, Input, Screen, Text } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';
import { authApi, normalizeError } from '@/lib/api';
import { loginSchema, type LoginFormValues } from '@/lib/validation/auth';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export default function LoginScreen() {
  const colors = useTheme();
  const { signIn } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const brandOpacity = useRef(new Animated.Value(0)).current;
  const brandTranslateY = useRef(new Animated.Value(14)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(22)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(brandOpacity, { toValue: 1, duration: 420, useNativeDriver: true }),
        Animated.timing(brandTranslateY, { toValue: 0, duration: 420, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(cardOpacity, { toValue: 1, duration: 460, useNativeDriver: true }),
        Animated.timing(cardTranslateY, { toValue: 0, duration: 460, useNativeDriver: true }),
      ]),
    ]).start();
  }, [brandOpacity, brandTranslateY, cardOpacity, cardTranslateY]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitting(true);
    setError(null);
    try {
      const session = await authApi.login(values);
      signIn(session);
      router.replace(session.user.pinSet ? '/' : '/pin-setup');
    } catch (e) {
      setError(normalizeError(e).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen title={undefined} scroll={false} contentStyle={styles.screen}>
      <GradientHeader>
        <Animated.View
          style={[
            styles.header,
            { opacity: brandOpacity, transform: [{ translateY: brandTranslateY }] },
          ]}>
          <ZpayLogo size={72} style={styles.headerLogo} />
          <Text style={[styles.brand, { color: colors.white }]}>
            Z<span style={styles.brandAccent}>Pay</span>
          </Text>
          <Text style={[styles.tagline, { color: '#A7F3D0' }]}>Simple. Secure. Nigerian.</Text>
        </Animated.View>
      </GradientHeader>

      <Animated.View
        style={[
          styles.cardWrap,
          { opacity: cardOpacity, transform: [{ translateY: cardTranslateY }] },
        ]}>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text variant="bodyBold" style={styles.cardTitle} color="text">
            Welcome Back
          </Text>
          <Text variant="small" color="textSecondary" style={styles.cardSubtitle}>
            Login to continue to your account.
          </Text>

          <InlineError message={error} />

          <View style={styles.field}>
            <View style={styles.inputIcon}>
              <Ionicons name="person-outline" size={IconSize.sm} color={colors.accent} />
            </View>
            <Controller
              control={control}
              name="identifier"
              render={({ field }) => (
                <Input
                  label=""
                  placeholder="Email or Phone"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.identifier?.message}
                  style={styles.inputWithIcon}
                />
              )}
            />
          </View>

          <View style={styles.field}>
            <View style={styles.inputIcon}>
              <Ionicons name="lock-closed-outline" size={IconSize.sm} color={colors.accent} />
            </View>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  label=""
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.password?.message}
                  style={styles.inputWithIcon}
                  right={
                    <Pressable
                      onPress={() => setShowPassword((v) => !v)}
                      accessibilityRole="button"
                      accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={IconSize.sm}
                        color={colors.textMuted}
                      />
                    </Pressable>
                  }
                />
              )}
            />
          </View>

          <View style={styles.linksRow}>
            <Link href="/forgot-password" asChild>
              <Text variant="small" color="accent">
                Forgot password?
              </Text>
            </Link>
            <Link href="/signup" asChild>
              <Text variant="smallBold" color="accent">
                Create account
              </Text>
            </Link>
          </View>

          <Button
            label="Login"
            loading={submitting}
            disabled={submitting}
            onPress={handleSubmit(onSubmit)}
          />

          <View style={styles.secureNote}>
            <Ionicons name="lock-closed-outline" size={14} color={colors.textMuted} />
            <Text variant="small" color="textMuted">
              Secure login powered by zPay
            </Text>
          </View>
        </View>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
  },
  headerLogo: {
    marginBottom: Spacing.md,
  },
  brand: {
    fontSize: 44,
    fontWeight: '800',
    letterSpacing: 1,
  },
  brandAccent: {
    fontWeight: '800',
    color: '#A7F3D0',
  },
  tagline: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
  cardWrap: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  card: {
    borderRadius: Radii.xl,
    padding: Spacing.xxl,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '800',
  },
  cardSubtitle: {
    marginTop: Spacing.xs,
    fontSize: 16,
  },
  field: {
    position: 'relative',
    marginTop: Spacing.lg,
  },
  inputIcon: {
    position: 'absolute',
    left: Spacing.md,
    top: 14,
    zIndex: 1,
  },
  inputWithIcon: {
    paddingLeft: 40,
    fontSize: 18,
    fontWeight: '500',
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
  secureNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xxs,
    marginTop: Spacing.lg,
  },
});
