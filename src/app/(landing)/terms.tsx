import { StyleSheet, View } from 'react-native';

import { Screen, Text } from '@/components/ui';
import { TERMS_OF_SERVICE, TERMS_TITLE } from '@/constants/legal';
import { Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export default function TermsScreen() {
  const colors = useTheme();
  const paragraphs = TERMS_OF_SERVICE.split('\n\n');

  return (
    <Screen title={TERMS_TITLE} back scroll>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {paragraphs.map((paragraph, index) => {
          const heading =
            /^[0-9]+\.|^[A-Z][A-Z ]+$/.test(paragraph.trim()) && paragraph.length < 90;
          return (
            <Text
              key={index}
              variant={heading ? 'smallBold' : 'body'}
              color={heading ? 'accent' : 'textSecondary'}
              style={styles.paragraph}>
              {paragraph}
            </Text>
          );
        })}
      </View>
      <Text variant="caption" color="textMuted" style={styles.note}>
        For questions about these terms, contact support at support@zpay.app.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  paragraph: {
    lineHeight: 22,
  },
  note: {
    textAlign: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
});