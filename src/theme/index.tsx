import '@/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';

import { darkColors, lightColors, type ThemeColors } from './tokens';

export type ThemeVariant = 'dark' | 'light';

export const themes: Record<ThemeVariant, ThemeColors> = {
  dark: darkColors,
  light: lightColors,
};

const STORAGE_KEY = 'zpay_theme_variant';

interface ThemeContextValue {
  variant: ThemeVariant;
  colors: ThemeColors;
  toggleVariant: () => void;
  setVariant: (variant: ThemeVariant) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  variant: 'dark',
  colors: darkColors,
  toggleVariant: () => {},
  setVariant: () => {},
});

export interface ThemeProviderProps extends PropsWithChildren {
  variant?: ThemeVariant;
}

export function ThemeProvider({ variant: initialVariant = 'dark', children }: ThemeProviderProps) {
  const [variant, setVariantState] = useState<ThemeVariant>(initialVariant);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (active && (value === 'light' || value === 'dark')) {
          setVariantState(value);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const setVariant = (next: ThemeVariant) => {
    setVariantState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  };

  const toggleVariant = () => setVariant(variant === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ variant, colors: themes[variant], toggleVariant, setVariant }}>
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

export function useThemeSwitch(): Pick<ThemeContextValue, 'toggleVariant' | 'setVariant'> {
  const { toggleVariant, setVariant } = useContext(ThemeContext);
  return { toggleVariant, setVariant };
}