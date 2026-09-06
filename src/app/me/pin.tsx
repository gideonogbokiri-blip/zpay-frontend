import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button, InlineError, PinInput, Screen, Text } from '@/components/ui';
import { normalizeError } from '@/lib/api';
import { useChangePin } from '@/hooks/queries';
import { Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export default function PinScreen() {
  const colors = useTheme();
  const changePin = useChangePin();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = () => {
    if (current.length !== 4) {
      setError('Enter your current 4-digit PIN.');
      return;
    }
    if (next.length !== 4) {
      setError('Enter a new 4-digit PIN.');
      return;
    }
    if (next !== confirm) {
      setError('New PIN and confirmation do not match.');
      return;
    }
    setError(null);
    setSuccess(false);
    changePin.mutate(
      { currentPin: current, newPin: next },
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
    <Screen title="Transaction PIN" subtitle="Change your transaction PIN" back scroll>
      {success ? (
        <View style={[styles.banner, { backgroundColor: colors.successSoft }]}>
          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          <Text variant="smallBold" color="success">
            PIN updated successfully
          </Text>
        </View>
      ) : null}
      <InlineError message={error} />
      <Text variant="caption" color="textSecondary" style={{ marginBottom: Spacing.md }}>
        Your PIN is required to approve every payment.
      </Text>
      <PinInput length={4} value={current} onChange={setCurrent} label="Current PIN" />
      <PinInput length={4} value={next} onChange={setNext} label="New PIN" />
      <PinInput
        length={4}
        value={confirm}
        onChange={setConfirm}
        label="Confirm new PIN"
        autoFocus={false}
      />
      <Button
        label="Update PIN"
        onPress={submit}
        loading={changePin.isPending}
        disabled={current.length !== 4 || next.length !== 4 || confirm.length !== 4 || changePin.isPending}
        style={{ marginTop: Spacing.lg }}
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
    marginBottom: Spacing.md,
  },
});