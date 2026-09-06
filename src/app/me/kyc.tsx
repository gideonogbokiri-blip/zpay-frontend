import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { StatusBadge } from '@/components/ui';
import { Button, Screen, Text } from '@/components/ui';
import { useKyc } from '@/hooks/queries';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export default function KycScreen() {
  const colors = useTheme();
  const { data: kyc, isLoading } = useKyc();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Screen title="KYC" subtitle="Identity verification" back scroll>
      {isLoading ? (
        <Text variant="small" color="textMuted">
          Loading...
        </Text>
      ) : (
        <>
          <View style={[styles.card, { backgroundColor: colors.surfaceElevated }]}>
            <View style={styles.row}>
              <Text variant="body" color="textSecondary">
                Current tier
              </Text>
              <StatusBadge
                status={kyc?.tier === 'verified' ? 'success' : kyc?.tier === 'basic' ? 'info' : 'pending'}
                label={kyc?.tier === 'verified' ? 'Verified' : kyc?.tier === 'basic' ? 'Basic' : 'Unverified'}
              />
            </View>
            <View style={styles.row}>
              <Text variant="body" color="textSecondary">
                Status
              </Text>
              <Text variant="bodyBold">{kyc?.status === 'completed' ? 'Completed' : 'Not started'}</Text>
            </View>
          </View>
          <Text variant="small" color="textSecondary" style={styles.info}>
            Completing KYC verification raises your account tier and transaction limits. In this demo your account is
            already usable without verification.
          </Text>
          <Button label="Start verification" onPress={() => setShowInfo(true)} />
          <Modal
            visible={showInfo}
            transparent
            animationType="fade"
            onRequestClose={() => setShowInfo(false)}>
            <Pressable style={styles.backdrop} onPress={() => setShowInfo(false)} accessibilityLabel="Close">
              <Pressable style={[styles.sheet, { backgroundColor: colors.surfaceElevated }]} onPress={() => {}}>
                <View style={[styles.iconWrap, { backgroundColor: 'rgba(77,171,247,0.14)' }]}>
                  <Ionicons name="document-text-outline" size={IconSize.xxl} color={colors.info} />
                </View>
                <Text variant="heading" style={styles.title}>
                  KYC verification
                </Text>
                <Text variant="body" color="textSecondary" style={styles.body}>
                  Identity verification is not yet available in this demo. Your account is already usable without it.
                </Text>
                <Button label="Got it" onPress={() => setShowInfo(false)} />
              </Pressable>
            </Pressable>
          </Modal>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    borderRadius: Spacing.md,
    gap: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  sheet: {
    width: '100%',
    maxWidth: 360,
    borderRadius: Radii.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  title: {
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
});