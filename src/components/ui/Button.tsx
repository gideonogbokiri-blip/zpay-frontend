import { ActivityIndicator, Pressable, StyleSheet, type ViewStyle } from 'react-native';

import { Radii, Shadow, Spacing, TouchTarget } from '@/theme/tokens';
import { useTheme } from '@/theme';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
}: ButtonProps) {
  const colors = useTheme();
  const isDisabled = disabled || loading;

  const backgroundColor = variantStyle[variant].backgroundColor(colors);
  const textColor = variantStyle[variant].color(colors);
  const borderColor = variantStyle[variant].border?.(colors);

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        { backgroundColor, borderColor },
        variant === 'primary' && Shadow,
        makePressedTransform(pressed),
        isDisabled && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text variant="bodyBold" style={{ color: textColor }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

function makePressedTransform(
  pressed: boolean,
): { opacity: number } | { opacity: number; transform: { scale: number }[] } {
  return pressed ? { opacity: 0.85, transform: [{ scale: 0.98 }] } : { opacity: 1 };
}

const variantStyle: Record<
  ButtonVariant,
  {
    backgroundColor: (colors: ReturnType<typeof useTheme>) => string;
    color: (colors: ReturnType<typeof useTheme>) => string;
    border?: (colors: ReturnType<typeof useTheme>) => string;
  }
> = {
  primary: {
    backgroundColor: (c) => c.accent,
    color: (c) => c.background,
  },
  secondary: {
    backgroundColor: (c) => c.surfaceElevated,
    color: (c) => c.accent,
    border: (c) => c.border,
  },
  outline: {
    backgroundColor: (c) => 'transparent',
    color: (c) => c.accent,
    border: (c) => c.accent,
  },
  destructive: {
    backgroundColor: (c) => c.danger,
    color: (c) => c.background,
  },
  ghost: {
    backgroundColor: (c) => 'transparent',
    color: (c) => c.textSecondary,
  },
};

const styles = StyleSheet.create({
  base: {
    minHeight: TouchTarget.standard,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.45,
  },
});