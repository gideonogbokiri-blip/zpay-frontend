import { StyleSheet, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from './ui';
import { IconSize } from '@/theme/tokens';

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
        <View pointerEvents="none" style={styles.shine} />
        <View pointerEvents="none" style={styles.cutTop} />
        <View pointerEvents="none" style={styles.cutBottom} />
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
  shine: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: '44%',
    height: '26%',
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
    transform: [{ rotate: '-18deg' }],
  },
  cutTop: {
    position: 'absolute',
    right: -18,
    top: 12,
    width: '52%',
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    transform: [{ rotate: '-28deg' }],
  },
  cutBottom: {
    position: 'absolute',
    left: -20,
    bottom: 14,
    width: '56%',
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(2, 6, 23, 0.14)',
    transform: [{ rotate: '-28deg' }],
  },
  z: {
    color: '#FFFFFF',
    fontWeight: '900',
    letterSpacing: -Math.round(IconSize.xs / 2),
  },
});
