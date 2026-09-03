import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Spacing } from '@/theme/tokens';

export interface GradientHeaderProps {
  children: ReactNode;
  contentStyle?: object;
}

export function GradientHeader({ children, contentStyle }: GradientHeaderProps) {
  return (
    <LinearGradient
      colors={['#00C54C', '#059669', '#047857']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.header, contentStyle]}>
      <View style={styles.inner}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
  },
  inner: {
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
  },
});
