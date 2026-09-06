import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button, InlineError, Input, Screen, Text } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';
import { normalizeError } from '@/lib/api';
import { useChangePassword } from '@/hooks/queries';
import { Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export default function SecurityScreen() {
  const colors = useTheme();
  const { user } = useAuth();
  const changePassword = useChangePassword();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = () => {
    if (next.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }
    if (next !== confirm) {
      setError('New password and confirmation do not match.');
      return;
    }
    setError(null);
    setSuccess(false);
    changePassword.mutate(
      { currentPassword: current, newPassword: next },
      {
        onSuccess: () => {
          setSuccess(true);
          setCurrent('');
          setNext('');
          setConfirm('');
        },
        onError: (e) => {
          setError(normalizeError(e).message);
        },
      }
    );
  };

  return (
    <Screen title="Security" subtitle="Change your password" back scroll>
      {success ? (
        <View style={[styles.banner, { backgroundColor: colors.successSoft }]}>
          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          <Text variant="smallBold" color="success">
            Password updated successfully
          </Text>
        </View>
      ) : null}
      <InlineError message={error} />
      <Input
        label="Current password"
        value={current}
        onChangeText={setCurrent}
        secureTextEntry
        placeholder="Enter current password"
      />
      <Input
        label="New password"
        value={next}
        onChangeText={setNext}
        secureTextEntry={!showNext}
        placeholder="At least 8 characters"
        right={
          <Pressable
            onPress={() => setShowNext((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel={showNext ? 'Hide new password' : 'Show new password'}
            hitSlop={8}
            style={{ padding: 4 }}>
            <Ionicons name={showNext ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textMuted} />
          </Pressable>
        }
      />
      <Input
        label="Confirm new password"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry={!showConfirm}
        placeholder="Repeat new password"
        right={
          <Pressable
            onPress={() => setShowConfirm((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel={showConfirm ? 'Hide confirmation' : 'Show confirmation'}
            hitSlop={8}
            style={{ padding: 4 }}>
            <Ionicons name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textMuted} />
          </Pressable>
        }
      />
      <Text variant="caption" color="textMuted">
        Signed in as {user?.email}
      </Text>
      <Button
        label="Update password"
        onPress={submit}
        loading={changePassword.isPending}
        disabled={!current || !next || !confirm || changePassword.isPending}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Spacing.md,
  },
});