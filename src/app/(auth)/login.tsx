import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { GradientHeader } from '@/components/GradientHeader';
import { ZpayLogo } from '@/components/ZpayLogo';
import { Button, InlineError, Input, Screen, Text } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';
import { authApi, normalizeError } from '@/lib/api';
import { loginSchema, type LoginFormValues } from '@/lib/validation/auth';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

function useStaggeredReveal(count: number, staggerMs = 80, startDelay = 200) {
  const items = Array.from({ length: count }, (_, i) => ({
    opacity: useRef(new Animated.Value(0)).current,
    translateY: useRef(new Animated.Value(24)).current,
    scale: useRef(new Animated.Value(0.92)).current,
  }));

  useEffect(() => {
    const animations = items.map((item, i) =>
      Animated.parallel([
        Animated.spring(item.opacity, {
          toValue: 1,
          tension: 65,
          friction: 9,
          delay: startDelay + i * staggerMs,
          useNativeDriver: true,
        }),
        Animated.spring(item.translateY, {
          toValue: 0,
          tension: 65,
          friction: 9,
          delay: startDelay + i * staggerMs,
          useNativeDriver: true,
        }),
        Animated.spring(item.scale, {
          toValue: 1,
          tension: 80,
          friction: 8,
          delay: startDelay + i * staggerMs,
          useNativeDriver: true,
        }),
      ]),
    );
    Animated.parallel(animations).start();
  }, []);

  return items;
}

export default function LoginScreen() {
  const colors = useTheme();
  const { signIn } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [logoGlow] = useState(() => new Animated.Value(0.3));
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const brandOpacity = useRef(new Animated.Value(0)).current;
  const brandTranslateY = useRef(new Animated.Value(30)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateY = useRef(new Animated.Value(20)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(40)).current;
  const cardScale = useRef(new Animated.Value(0.95)).current;

  const stagger = useStaggeredReveal(6, 100, 600);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoGlow, {
          toValue: 0.6,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(logoGlow, {
          toValue: 0.3,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(logoOpacity, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(brandOpacity, {
          toValue: 1,
          tension: 55,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(brandTranslateY, {
          toValue: 0,
          tension: 55,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(taglineOpacity, {
          toValue: 1,
          tension: 55,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(taglineTranslateY, {
          toValue: 0,
          tension: 55,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(cardOpacity, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(cardTranslateY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(cardScale, {
          toValue: 1,
          tension: 55,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [logoGlow, logoScale, logoOpacity, brandOpacity, brandTranslateY, taglineOpacity, taglineTranslateY, cardOpacity, cardTranslateY, cardScale]);

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

  const staggerStyle = (index: number) => ({
    opacity: stagger[index].opacity,
    transform: [
      { translateY: stagger[index].translateY },
      { scale: stagger[index].scale },
    ],
  });

  return (
    <Screen title={undefined} scroll={false} contentStyle={styles.screen}>
      <GradientHeader>
        <View style={styles.header}>
          <Animated.View
            style={{
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            }}>
            <ZpayLogo size={80} style={styles.headerLogo} />
          </Animated.View>

          <Animated.View
            style={{
              opacity: brandOpacity,
              transform: [{ translateY: brandTranslateY }],
              alignItems: 'center',
            }}>
            <Text style={[styles.brand, { color: colors.white }]}>
              Z<span style={styles.brandAccent}>Pay</span>
            </Text>
          </Animated.View>

          <Animated.View
            style={{
              opacity: taglineOpacity,
              transform: [{ translateY: taglineTranslateY }],
              alignItems: 'center',
            }}>
            <Text style={[styles.tagline, { color: '#A7F3D0' }]}>
              Simple. Secure. Nigerian.
            </Text>
          </Animated.View>
        </View>
      </GradientHeader>

      <Animated.View
        style={[
          styles.cardWrap,
          {
            opacity: cardOpacity,
            transform: [{ translateY: cardTranslateY }, { scale: cardScale }],
          },
        ]}>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Animated.View style={staggerStyle(0)}>
            <Text variant="bodyBold" style={styles.cardTitle} color="text">
              Welcome Back
            </Text>
          </Animated.View>

          <Animated.View style={staggerStyle(1)}>
            <Text variant="small" color="textSecondary" style={styles.cardSubtitle}>
              Login to continue to your account.
            </Text>
          </Animated.View>

          <Animated.View style={staggerStyle(1)}>
            <InlineError message={error} />
          </Animated.View>

          <Animated.View style={[styles.field, staggerStyle(2)]}>
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
          </Animated.View>

          <Animated.View style={[styles.field, staggerStyle(3)]}>
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
          </Animated.View>

          <Animated.View style={[styles.linksRow, staggerStyle(4)]}>
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
          </Animated.View>

          <Animated.View style={staggerStyle(5)}>
            <Button
              label="Login"
              loading={submitting}
              disabled={submitting}
              onPress={handleSubmit(onSubmit)}
            />
          </Animated.View>

          <Animated.View style={[styles.secureNote, staggerStyle(5)]}>
            <Ionicons name="lock-closed-outline" size={14} color={colors.textMuted} />
            <Text variant="small" color="textMuted">
              Secure login powered by zPay
            </Text>
          </Animated.View>
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
    gap: Spacing.xs,
  },
  headerLogo: {
    marginBottom: Spacing.sm,
  },
  brand: {
    fontSize: 46,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  brandAccent: {
    fontWeight: '800',
    color: '#A7F3D0',
  },
  tagline: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: Spacing.xs,
    letterSpacing: 0.5,
  },
  cardWrap: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  card: {
    borderRadius: Radii.xl,
    padding: Spacing.xxl,
    borderWidth: 1,
    shadowColor: '#00C54C',
    shadowOpacity: 0.08,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
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
