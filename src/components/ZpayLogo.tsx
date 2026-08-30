import { StyleSheet, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from './ui';
import { IconSize, Radii } from '@/theme/tokens';

export interface ZpayLogoProps {
  size?: number;
  style?: ViewStyle;
}

export function ZpayLogo({ size = 84, style }: ZpayLogoProps) {
  const radius = Math.round((size * 28) / 100);
  const zFontSize = Math.round(size * 0.56);
  const glowSize = Math.round(size * 1.32);

  return (
    <View style={[styles.wrap, { width: size, height: size }, style]}>
      <View
        pointerEvents="none"
        style={[
          styles.glow,
          {
            width: glowSize,
            height: glowSize,
            borderRadius: glowSize / 2,
          },
        ]}
      />
      <LinearGradient
        colors={['#00C54C', '#00A93F', '#059669']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.badge, { borderRadius: radius }]}>
        <Text
          style={[
            styles.z,
            {
              fontSize: zFontSize,
              lineHeight: Math.round(zFontSize * 1.15),
            },
          ]}>
          Z
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 197, 76, 0.22)',
  },
  badge: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    shadowColor: '#00C54C',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  z: {
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: -Math.round(IconSize.xs / 2),
  },
});
