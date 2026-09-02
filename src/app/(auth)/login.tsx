import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Animated, Easing, Image, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ZpayLogo } from '@/components/ZpayLogo';
import { Button, InlineError, Input, Screen, Text } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';
import { authApi, normalizeError } from '@/lib/api';
import { loginSchema, type LoginFormValues } from '@/lib/validation/auth';
import { IconSize, Radii, Shadow, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

const loginVisual = require('../../../assets/images/login-visual.png');

type RevealItem = {
  opacity: Animated.Value;
  translateY: Animated.Value;
  scale: Animated.Value;
};

function useReveal(count: number, startDelay = 120, staggerMs = 95) {
  const items = useRef<RevealItem[]>([]).current;
  if (items.length === 0) {
    for (let i = 0; i < count; i += 1) {
      items.push({
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(26),
        scale: new Animated.Value(0.96),
      });
    }
  }

  useEffect(() => {
    Animated.parallel(
      items.map((item, index) =>
        Animated.parallel([
          Animated.timing(item.opacity, {
            toValue: 1,
            duration: 460,
            delay: startDelay + index * staggerMs,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.spring(item.translateY, {
            toValue: 0,
            tension: 64,
            friction: 9,
            delay: startDelay + index * staggerMs,
            useNativeDriver: true,
          }),
          Animated.spring(item.scale, {
            toValue: 1,
            tension: 76,
            friction: 9,
            delay: startDelay + index * staggerMs,
            useNativeDriver: true,
          }),
        ]),
      ),
    ).start();
  }, [items, startDelay, staggerMs]);

  return (index: number) => ({
    opacity: items[index].opacity,
    transform: [{ translateY: items[index].translateY }, { scale: items[index].scale }],
  });
}

export default function LoginScreen() {
  const colors = useTheme();
  const { width } = useWindowDimensions();
  const wide = width >= 820;
  const { signIn } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const reveal = useReveal(8);

  const glow = useRef(new Animated.Value(0.45)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0.45, duration: 1700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    ).start();
  }, [glow]);

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
    <Screen title={undefined} scroll contentStyle={styles.screen}>
      <View style={[styles.layout, wide ? styles.layoutWide : styles.layoutMobile]}>
        {wide ? (
          <Animated.View style={[styles.visualPanel, styles.visualPanelWide, reveal(0)]}>
            <Animated.View pointerEvents="none" style={[styles.visualGlow, { opacity: glow }]} />
            <Image source={loginVisual} resizeMode="cover" style={styles.visualImage} />
            <View style={styles.visualCopy}>
              <Text style={styles.visualTitle}>Pay smarter with ZPAY</Text>
              <Text style={styles.visualText}>Bills, airtime, data, exams and wallet funding in one secure Nigerian app.</Text>
            </View>
          </Animated.View>
        ) : null}

        <Animated.View
          style={[
            styles.formPanel,
            wide ? styles.formPanelWide : styles.formPanelMobile,
            { backgroundColor: wide ? colors.surface : 'transparent', borderColor: wide ? colors.border : 'transparent' },
            reveal(1),
          ]}>
          <Animated.View style={[styles.brandRow, !wide && styles.brandRowMobile, reveal(2)]}>
            <ZpayLogo size={wide ? 72 : 108} />
            <View style={[styles.brandTextWrap, !wide && styles.brandTextWrapMobile]}>
              <Text style={[styles.brand, !wide && styles.brandMobile, { color: colors.white }]}>Z<Text style={styles.brandAccent}>Pay</Text></Text>
              <Text style={[styles.tagline, !wide && styles.taglineMobile, { color: colors.textSecondary }]}>Simple. Secure. Nigerian.</Text>
            </View>
          </Animated.View>

          <Animated.View style={reveal(3)}>
            <Text variant="bodyBold" style={[styles.cardTitle, !wide && styles.cardTitleMobile]} color="text">Welcome Back</Text>
            <Text variant="small" color="textSecondary" style={[styles.cardSubtitle, !wide && styles.cardSubtitleMobile]}>Login to continue to your account.</Text>
          </Animated.View>

          <Animated.View style={reveal(4)}>
            <InlineError message={error} />
          </Animated.View>

          <Animated.View style={[styles.field, reveal(4)]}>
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

          <Animated.View style={[styles.field, reveal(5)]}>
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
                      accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                      style={({ pressed }) => [styles.eyeButton, pressed && styles.pressed]}>
                      <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={IconSize.sm} color={colors.textMuted} />
                    </Pressable>
                  }
                />
              )}
            />
          </Animated.View>

          <Animated.View style={[styles.linksRow, reveal(6)]}>
            <Link href="/forgot-password" asChild><Text variant="small" color="accent">Forgot password?</Text></Link>
            <Link href="/signup" asChild><Text variant="smallBold" color="accent">Create account</Text></Link>
          </Animated.View>

          <Animated.View style={reveal(7)}>
            <Button label="Login" loading={submitting} disabled={submitting} onPress={handleSubmit(onSubmit)} />
          </Animated.View>

          <Animated.View style={[styles.secureNote, reveal(7)]}>
            <Ionicons name="lock-closed-outline" size={14} color={colors.textMuted} />
            <Text variant="small" color="textMuted">Secure login powered by zPay</Text>
          </Animated.View>
        </Animated.View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    maxWidth: 1180,
    width: '100%',
  },
  layout: {
    gap: Spacing.xl,
    paddingVertical: Spacing.xxl,
  },
  layoutWide: {
    minHeight: 720,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  layoutMobile: {
    flex: 1,
    justifyContent: 'center',
  },
  visualPanel: {
    overflow: 'hidden',
    borderRadius: Radii.xxl,
    backgroundColor: '#00C54C',
    ...Shadow,
  },
  visualPanelWide: {
    flex: 1.05,
    minHeight: 680,
  },
  formPanel: {
    borderRadius: Radii.xxl,
    borderWidth: 1,
    padding: Spacing.xxl,
    gap: Spacing.lg,
    shadowColor: '#00C54C',
    shadowOpacity: 0.09,
    shadowRadius: 34,
    shadowOffset: { width: 0, height: 18 },
    elevation: 14,
  },
  formPanelWide: {
    flex: 0.95,
  },
  formPanelMobile: {
    width: '100%',
    paddingHorizontal: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  visualGlow: {
    position: 'absolute',
    left: -80,
    top: -80,
    zIndex: 2,
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
  },
  visualImage: {
    width: '100%',
    height: '100%',
  },
  visualCopy: {
    position: 'absolute',
    left: Spacing.xl,
    right: Spacing.xl,
    bottom: Spacing.xl,
    gap: Spacing.sm,
  },
  visualTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
  },
  visualText: {
    color: '#D1FAE5',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  brandRowMobile: {
    gap: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  brandTextWrap: {
    flex: 1,
  },
  brandTextWrapMobile: {
    flex: 1,
  },
  brand: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  brandMobile: {
    fontSize: 44,
    fontWeight: '900',
  },
  brandAccent: {
    color: '#A7F3D0',
    fontWeight: '800',
  },
  tagline: {
    marginTop: Spacing.xxs,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  taglineMobile: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: Spacing.xs,
  },
  cardTitle: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
  },
  cardTitleMobile: {
    fontSize: 34,
    lineHeight: 42,
  },
  cardSubtitle: {
    marginTop: Spacing.xs,
    fontSize: 16,
  },
  cardSubtitleMobile: {
    fontSize: 17,
    marginTop: Spacing.xs,
  },
  field: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: Spacing.md,
    top: 15,
    zIndex: 1,
  },
  inputWithIcon: {
    paddingLeft: 42,
    fontSize: 18,
    fontWeight: '600',
  },
  eyeButton: {
    padding: Spacing.xs,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secureNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xxs,
  },
});
