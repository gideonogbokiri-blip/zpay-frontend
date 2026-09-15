import { Image, StyleSheet, View, type ViewStyle } from 'react-native';

import { useThemeVariant } from '@/theme';

const zpayLogoAsset = require('../../assets/images/zpay-logo.png');
const zpayLogoLightAsset = require('../../assets/images/zpay-logo-light.png');

export interface ZpayLogoProps {
  size?: number;
  style?: ViewStyle;
}

export function ZpayLogo({ size = 140, style }: ZpayLogoProps) {
  const variant = useThemeVariant();
  const width = size;
  const height = Math.round(size * 0.31);
  const asset = variant === 'light' ? zpayLogoLightAsset : zpayLogoAsset;

  return (
    <View style={[styles.wrap, style]}>
      <Image
        source={asset}
        resizeMode="contain"
        style={{ width, height }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
