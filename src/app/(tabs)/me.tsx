import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { Icon, type IconName } from '@/components/Icon';
import { Screen, Text } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';
import { useKyc, useNotifications } from '@/hooks/queries';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';

export default function MeScreen() {
  const colors = useTheme();
  const { user, signOut } = useAuth();
  const { data: kyc } = useKyc();
  const { data: notifications } = useNotifications();
  const unread = notifications?.filter((n) => !n.readAt).length ?? 0;
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(false);
    // Clear all auth data (token + user) and wipe the persisted AsyncStorage entry.
    signOut();
    // Reset the navigation stack so the user lands on Welcome and cannot go back.
    router.dismissAll();
    router.replace('/welcome');
  };

  return (
    <Screen title="Me" subtitle="Account and settings">
      <View style={styles.profile}>
        <View style={styles.avatarGlow} pointerEvents="none" />
        <View style={[styles.avatar, { backgroundColor: colors.accentSoft, borderColor: 'rgba(0,244,254,0.35)' }]}>
          <Icon name="person" size={IconSize.xxl} color={colors.accent} />
        </View>
        <Text variant="heading">{user?.fullName}</Text>
        <Text variant="small" color="textSecondary">
          {user?.phone}
        </Text>
        <View style={[styles.tier, { backgroundColor: colors.accentSoft }]}>
          <Text variant="caption" style={{ color: colors.accent }}>
            {kyc?.tier === 'verified' ? 'Verified' : kyc?.tier === 'basic' ? 'Basic tier' : 'Unverified'}
          </Text>
        </View>
      </View>

      <View style={styles.menu}>
        <MenuItem icon="person-outline" label="Profile" onPress={() => router.push('/me/profile')} />
        <MenuItem icon="shield-checkmark-outline" label="KYC" onPress={() => router.push('/me/kyc')} />
        <MenuItem icon="lock-closed-outline" label="Security" onPress={() => router.push('/me/security')} />
        <MenuItem icon="keypad-outline" label="PIN" onPress={() => router.push('/me/pin')} />
        <MenuItem
          icon="notifications-outline"
          label="Notifications"
          badge={unread > 0 ? String(unread) : undefined}
          onPress={() => router.push('/notifications')}
        />
        <MenuItem icon="settings-outline" label="Settings" onPress={() => router.push('/me/settings')} />
      </View>

      <Pressable
        onPress={() => setShowLogout(true)}
        accessibilityRole="button"
        accessibilityLabel="Log out"
        style={({ pressed }) => [styles.logout, { backgroundColor: colors.dangerSoft }, pressed && styles.pressed]}>
        <Icon name="log-out-outline" size={IconSize.md} color={colors.danger} />
        <Text variant="bodyBold" style={{ color: colors.danger }}>
          Log out
        </Text>
      </Pressable>

      <Modal
        visible={showLogout}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogout(false)}>
        <Pressable style={styles.backdrop} onPress={() => setShowLogout(false)} accessibilityLabel="Close">
          <Pressable style={[styles.dialogSurface, { backgroundColor: colors.surfaceElevated }]} onPress={() => {}}>
            <View style={[styles.dialogIcon, { backgroundColor: colors.dangerSoft }]}>
              <Icon name="log-out-outline" size={IconSize.xxl} color={colors.danger} />
            </View>
            <Text variant="heading" style={styles.dialogTitle}>
              Log out?
            </Text>
            <Text variant="body" color="textSecondary" style={styles.dialogBody}>
              You will need to log in again to use ZPAY.
            </Text>
            <Pressable
              onPress={handleLogout}
              accessibilityRole="button"
              accessibilityLabel="Confirm log out"
              style={({ pressed }) => [styles.dialogDangerBtn, { backgroundColor: colors.danger }, pressed && styles.pressed]}>
              <Text variant="bodyBold" style={{ color: '#FFFFFF' }}>
                Log out
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setShowLogout(false)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.dialogCancelBtn, pressed && styles.pressed]}>
              <Text variant="body" color="textSecondary">
                Cancel
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}

interface MenuItemProps {
  icon: IconName;
  label: string;
  badge?: string;
  onPress: () => void;
}

function MenuItem({ icon, label, badge, onPress }: MenuItemProps) {
  const colors = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.menuItem, { borderBottomColor: colors.border }, pressed && styles.pressed]}>
      <View style={styles.menuLeft}>
        <View style={[styles.menuIcon, { backgroundColor: 'rgba(0,244,254,0.10)' }]}>
          <Icon name={icon} size={IconSize.md} color={colors.accent} />
        </View>
        <Text variant="body">{label}</Text>
      </View>
      <View style={styles.menuRight}>
        {badge ? (
          <View style={[styles.badge, { backgroundColor: colors.danger }]}>
            <Text variant="caption" style={{ color: '#FFFFFF' }}>
              {badge}
            </Text>
          </View>
        ) : null}
        <Icon name="chevron-forward" size={IconSize.sm} color={colors.textMuted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.xl,
  },
  avatarGlow: {
    position: 'absolute',
    top: Spacing.xs,
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: 'rgba(0,244,254,0.08)',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  tier: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.full,
    marginTop: Spacing.xs,
  },
  menu: {
    marginTop: Spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  menuIcon: {
    width: IconSize.xxl,
    height: IconSize.xxl,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
    borderRadius: Radii.md,
    marginTop: Spacing.xxxl,
    marginBottom: Spacing.xxl,
    zIndex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  dialogSurface: {
    width: '100%',
    maxWidth: 360,
    borderRadius: Radii.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  dialogIcon: {
    width: 64,
    height: 64,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogBody: {
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  dialogDangerBtn: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderRadius: Radii.md,
    marginTop: Spacing.sm,
  },
  dialogCancelBtn: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
});