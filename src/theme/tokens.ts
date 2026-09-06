import { Platform, StyleSheet } from 'react-native';

export const palette = {
  black: '#000000',
  zpayBackground: '#090C10',
  zpaySurface: '#11151B',
  zpaySurfaceElevated: '#151A21',
  zpaySurfaceRaised: '#1B2028',
  zpayAccent: '#F5B82E',
  zpayAccentDark: '#D99A12',
  zpayBrandBlue: '#2563EB',
  zpayBrandLavender: '#94A3B8',
  white: '#FFFFFF',
  gray50: '#F5F6F8',
  gray100: '#EAECEF',
  gray200: '#D6D9DD',
  gray400: '#8A9096',
  gray500: '#5A6066',
  gray600: '#3A3F43',
  gray700: '#2A2E31',
  gray800: '#1F2325',
  gray900: '#141718',
  green: '#22C55E',
  greenDark: '#16A34A',
  red: '#EF4444',
  redDark: '#B91C1C',
  amber: '#FFB020',
  infoBlue: '#4DABF7',
  zpayGold50: '#FFF8E6',
  zpayGold100: '#FDE9A8',
  zpayGold300: '#F8D56A',
  zpayGold400: '#F5C84B',
  zpayGold500: '#F5B82E',
  zpayGold600: '#D99A12',
  zpayGold700: '#A66E08',
  zpayGold800: '#6F4705',
  zpayGold900: '#3E2A0C',
  zpayGray500: '#6B7280',
} as const;

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  giant: 56,
} as const;

export const Radii = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  xxl: 28,
  full: 999,
} as const;

export const IconSize = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  xxl: 44,
} as const;

export const TouchTarget = {
  min: 44,
  standard: 48,
  large: 56,
} as const;

export const BorderWidth = {
  hairline: StyleSheet.hairlineWidth,
  thin: 1,
  medium: 2,
} as const;

export const MaxContentWidth = 800;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;

export const FontSize = {
  caption: 13,
  small: 15,
  body: 17,
  bodyLarge: 19,
  title: 24,
  heading: 28,
  display: 38,
  amount: 44,
} as const;

export const LineHeight = {
  caption: 18,
  small: 22,
  body: 26,
  bodyLarge: 28,
  title: 30,
  heading: 36,
  display: 44,
  amount: 52,
} as const;

export const FontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const FontFamily = Platform.select({
  ios: {
    sans: 'System',
    mono: 'Menlo',
  },
  android: {
    sans: 'sans-serif',
    mono: 'monospace',
  },
  default: {
    sans: 'System',
    mono: 'monospace',
  },
}) as { sans: string; mono: string };

export const Shadow = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  android: {
    elevation: 4,
  },
  default: {
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
});

export type ThemeColor =
  | 'background'
  | 'surface'
  | 'surfaceElevated'
  | 'input'
  | 'accent'
  | 'accentSoft'
  | 'brand'
  | 'text'
  | 'textSecondary'
  | 'textMuted'
  | 'success'
  | 'successSoft'
  | 'danger'
  | 'dangerSoft'
  | 'warning'
  | 'info'
  | 'border'
  | 'tabInactive';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  input: string;
  accent: string;
  accentSoft: string;
  brand: string;
  white: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  success: string;
  successSoft: string;
  danger: string;
  dangerSoft: string;
  warning: string;
  info: string;
  border: string;
  tabInactive: string;
}

export const darkColors: ThemeColors = {
  background: palette.zpayBackground,
  surface: palette.zpaySurface,
  surfaceElevated: palette.zpaySurfaceElevated,
  input: palette.zpaySurfaceElevated,
  accent: palette.zpayAccent,
  accentSoft: 'rgba(245, 184, 46, 0.14)',
  brand: palette.zpayAccent,
  white: palette.white,
  text: palette.white,
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  success: palette.green,
  successSoft: 'rgba(34, 197, 94, 0.14)',
  danger: palette.red,
  dangerSoft: 'rgba(255, 69, 58, 0.14)',
  warning: palette.amber,
  info: palette.zpayBrandBlue,
  border: 'rgba(255, 255, 255, 0.10)',
  tabInactive: '#64748B',
};

export const lightColors: ThemeColors = {
  background: palette.zpayGold50,
  surface: palette.white,
  surfaceElevated: palette.white,
  input: palette.white,
  accent: palette.zpayGold500,
  accentSoft: 'rgba(245, 184, 46, 0.14)',
  brand: palette.zpayGold700,
  white: palette.white,
  text: palette.gray900,
  textSecondary: palette.zpayGray500,
  textMuted: palette.gray400,
  success: palette.greenDark,
  successSoft: 'rgba(22, 163, 74, 0.12)',
  danger: palette.redDark,
  dangerSoft: 'rgba(185, 28, 28, 0.10)',
  warning: palette.amber,
  info: palette.infoBlue,
  border: palette.zpayGold100,
  tabInactive: palette.gray400,
};
