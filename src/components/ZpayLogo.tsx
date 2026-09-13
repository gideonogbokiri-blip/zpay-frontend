import { Image, StyleSheet, View, type ViewStyle } from 'react-native';

const zpayLogoAsset = require('../../assets/images/zpay-logo.png');

export interface ZpayLogoProps {
  size?: number;
  style?: ViewStyle;
}

export function ZpayLogo({ size = 140, style }: ZpayLogoProps) {
  const width = size;
  const height = Math.round(size * 0.31);

  return (
    <View style={[styles.wrap, style]}>
      <Image
        source={zpayLogoAsset}
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
