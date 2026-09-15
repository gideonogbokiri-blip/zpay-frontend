import '@/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';

import { darkColors, lightColors, type ThemeColors } from './tokens';

export type ThemePreference = 'dark' | 'light' | 'system';
export type ThemeVariant = 'dark' | 'light';

export const themes: Record<ThemeVariant, ThemeColors> = {
  dark: darkColors,
  light: lightColors,
};

const STORAGE_KEY = 'zpay_theme_variant';
const PREFERENCE_ORDER: ThemePreference[] = ['system', 'light', 'dark'];

function isPreference(value: string | null): value is ThemePreference {
  return value === 'dark' || value === 'light' || value === 'system';
}

function resolveVariant(preference: ThemePreference, systemScheme: string | null): ThemeVariant {
  if (preference === 'system') return systemScheme === 'light' ? 'light' : 'dark';
  return preference;
}

interface ThemeContextValue {
  preference: ThemePreference;
  variant: ThemeVariant;
  colors: ThemeColors;
  setPreference: (preference: ThemePreference) => void;
  cyclePreference: () => void;
  toggleVariant: () => void;
  setVariant: (variant: ThemeVariant) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  preference: 'dark',
  variant: 'dark',
  colors: darkColors,
  setPreference: () => {},
  cyclePreference: () => {},
  toggleVariant: () => {},
  setVariant: () => {},
});

export interface ThemeProviderProps extends PropsWithChildren {
  preference?: ThemePreference;
  variant?: ThemePreference;
}

export function ThemeProvider({ preference: initialPreference, variant: legacyVariant, children }: ThemeProviderProps) {
  const initial = initialPreference ?? legacyVariant ?? 'system';
  const systemScheme = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>(initial);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (active && isPreference(value)) {
          setPreferenceState(value);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const setPreference = (next: ThemePreference) => {
    setPreferenceState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  };

  const cyclePreference = () => {
    const index = PREFERENCE_ORDER.indexOf(preference);
    const next = PREFERENCE_ORDER[(index + 1 + PREFERENCE_ORDER.length) % PREFERENCE_ORDER.length];
    setPreference(next);
  };

  const variant = resolveVariant(preference, systemScheme);

  const setVariant = (next: ThemeVariant) => setPreference(next);
  const toggleVariant = () => setPreference(variant === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider
      value={{ preference, variant, colors: themes[variant], setPreference, cyclePreference, toggleVariant, setVariant }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeColors {
  return useContext(ThemeContext).colors;
}

export function useThemeVariant(): ThemeVariant {
  return useContext(ThemeContext).variant;
}

export function useThemePreference(): ThemePreference {
  return useContext(ThemeContext).preference;
}

export function useThemeSwitch(): Pick<
  ThemeContextValue,
  'preference' | 'setPreference' | 'cyclePreference' | 'toggleVariant' | 'setVariant'
> {
  const { preference, setPreference, cyclePreference, toggleVariant, setVariant } = useContext(ThemeContext);
  return { preference, setPreference, cyclePreference, toggleVariant, setVariant };
}