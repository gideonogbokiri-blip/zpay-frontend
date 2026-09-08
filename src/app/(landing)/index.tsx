import { zayLogo } from '@/components/ZpayLogo';
import { useTheme } from '@/theme';
import { Button, Screen, Text, View } from '@/components/ui';

export default function Landing() {
  const colors = useTheme();

  return (
    <Screen title="ZPAY" subtitle="Financial Freedom, Anywhere">
      <View style={{ padding: 40, textAlign: 'center' }}>
        <zayLogo size={128} />
        <Text variant="display" style={{ color: colors.accent, marginTop: 20 }}>
          ZPAY
        </Text>
        <Text variant="body" color="textSecondary" style={{ marginTop: 10 }}>
          Secure payments, money transfers, and bill payments
        </Text>
        <View style={{ marginTop: 30, gap: 16 }}>
          <Button label="Get Started" onPress={() => {}} variant="primary" />
          <Button label="Mood Switch" onPress={() => {}} variant="outline" style={{ marginTop: 8 }} />
        </View>
        <Text variant="caption" color="textMuted" style={{ marginTop: 20 }}>
          2024 ZPAY Inc. All rights reserved.
        </Text>
      </View>
    </Screen>
  );
}