import { StyleSheet } from 'react-native';

import { Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';
import { Text, View } from '@/components/ui';

interface OtpFallbackNoticeProps {
  otp: string;
}

export function OtpFallbackNotice({ otp }: OtpFallbackNoticeProps) {
  const colors = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.accentSoft, borderColor: colors.accent }]}>
      <Text variant="smallBold" color="accent" style={styles.title}>
        Your verification code
      </Text>
      <Text variant="amount" color="accent" style={styles.code}>
        {otp}
      </Text>
      <Text variant="caption" color="textSecondary">
        Email delivery is unavailable right now, so we've shown your code here. It expires in 10 minutes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: Spacing.lg,
    gap: Spacing.xs,
  },
  title: {
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  code: {
    letterSpacing: 6,
    fontSize: 28,
    lineHeight: 34,
  },
});