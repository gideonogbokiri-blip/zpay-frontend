import { Link, router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon, type IconName } from '@/components/Icon';
import { Screen, Text } from '@/components/ui';
import {
  ACTIVE_SERVICES,
  REGISTRATION_SERVICES,
  SERVICE_META,
  SERVICE_NAMES,
} from '@/constants/services';
import { useNotifications, useServices } from '@/hooks/queries';
import { IconSize, Radii, Spacing } from '@/theme/tokens';
import { useTheme } from '@/theme';
import { ZpayLogo } from '@/components/ZpayLogo';

const POPULAR_CAPTIONS: Record<string, string> = {
  ELECTRICITY: 'Prepaid & postpaid bills',
  AIRTIME: 'All networks',
  DATA: 'MTN, Airtel, Glo, 9mobile',
  TV: 'DStv, GOtv & Showmax',
};

function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ServiceCard({
  type,
  icon,
  label,
  caption,
  color,
  onPress,
}: {
  type: string;
  icon: IconName;
  label: string;
  caption: string;
  color: string;
  onPress: () => void;
}) {
  const colors = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
      <View style={[styles.cardIcon, { backgroundColor: withAlpha(color, 0.16), borderColor: withAlpha(color, 0.26) }]}>
        <Icon name={icon} size={IconSize.lg} color={color} />
      </View>
      <View style={styles.cardText}>
        <Text variant="bodyBold" numberOfLines={1}>
          {label}
        </Text>
        <Text variant="caption" color="textMuted" numberOfLines={1}>
          {caption}
        </Text>
      </View>
      <Icon name="chevron-forward" size={IconSize.sm} color={colors.textMuted} />
    </Pressable>
  );
}

function FeaturedCard({
  icon,
  label,
  caption,
  onPress,
}: {
  icon: IconName;
  label: string;
  caption: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.featuredWrap, pressed && styles.pressed]}>
      <LinearGradient
        colors={['#151A21', '#211A0E', '#3A2A0C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.featured}>
        <View style={styles.featuredGlow} />
        <View style={styles.featuredTop}>
          <View style={styles.featuredIcon}>
            <Icon name={icon} size={IconSize.xl} color="#FFFFFF" />
          </View>
          <View style={styles.mostUsed}>
            <Text variant="caption" style={styles.mostUsedText}>
              Most used
            </Text>
          </View>
        </View>
        <View style={styles.featuredBody}>
          <Text variant="title" style={styles.featuredTitle}>
            {label}
          </Text>
          <Text variant="small" style={styles.featuredCaption}>
            {caption}
          </Text>
        </View>
        <Icon name="arrow-forward" size={22} color="rgba(255,255,255,0.85)" />
      </LinearGradient>
    </Pressable>
  );
}

export default function ServiceScreen() {
  const colors = useTheme();
  const { data: services } = useServices();
  const { data: notifications } = useNotifications();
  const unreadCount = notifications?.filter((n) => !n.readAt).length ?? 0;
  const serviceOrder = services?.map((s) => s.type) ?? [];
  const visibleServices = serviceOrder.filter((t) => ACTIVE_SERVICES.includes(t));
  const displayServices = visibleServices.length ? visibleServices : ACTIVE_SERVICES;

  const featured = displayServices[0] ?? 'ELECTRICITY';
  const compactPopular = displayServices.slice(1);

  return (
    <Screen variant="dark" title={undefined} scroll>
      <View style={styles.header}>
        <ZpayLogo size={130} />
        <Link href="/notifications" asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
            <Icon name="notifications-outline" size={IconSize.lg} color={colors.text} />
            {unreadCount > 0 ? <View style={styles.unreadDot} /> : null}
          </Pressable>
        </Link>
      </View>

      <Text variant="heading" style={styles.title}>
        Services
      </Text>
      <Text variant="small" color="textSecondary" style={styles.subtitle}>
        Pay bills, top up and register in seconds
      </Text>

      <FeaturedCard
        icon={SERVICE_META[featured].icon}
        label={SERVICE_NAMES[featured]}
        caption={POPULAR_CAPTIONS[featured] ?? 'Fast, secure and reliable'}
        onPress={() => router.push(`/services/${featured.toLowerCase()}`)}
      />

      <Text variant="caption" color="textMuted" style={styles.sectionLabel}>
        Popular
      </Text>

      <View style={styles.cards}>
        {compactPopular.map((type) => (
          <ServiceCard
            key={type}
            type={type}
            icon={SERVICE_META[type].icon}
            label={SERVICE_NAMES[type]}
            caption={POPULAR_CAPTIONS[type] ?? 'Pay in seconds'}
            color={SERVICE_META[type].color}
            onPress={() => router.push(`/services/${type.toLowerCase()}`)}
          />
        ))}
      </View>

      <Text variant="caption" color="textMuted" style={styles.sectionLabel}>
        Exams &amp; registration
      </Text>
      <View style={styles.pills}>
        {REGISTRATION_SERVICES.map((type) => (
          <Pressable
            key={type}
            accessibilityRole="button"
            accessibilityLabel={SERVICE_NAMES[type]}
            onPress={() => router.push(`/services/${type.toLowerCase()}`)}
            style={({ pressed }) => [
              styles.pill,
              { backgroundColor: colors.surface, borderColor: colors.border },
              pressed && styles.pressed,
            ]}>
            <View style={[styles.pillIcon, { backgroundColor: withAlpha(SERVICE_META[type].color, 0.16) }]}>
              <Icon name={SERVICE_META[type].icon} size={IconSize.sm} color={SERVICE_META[type].color} />
            </View>
            <Text variant="smallBold">{SERVICE_NAMES[type]}</Text>
          </Pressable>
        ))}
      </View>

      <View style={[styles.assistCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={[styles.assistIcon, { backgroundColor: withAlpha('#F5B82E', 0.14) }]}>
          <Icon name="headset" size={IconSize.lg} color="#F5B82E" />
        </View>
        <View style={styles.assistText}>
          <Text variant="smallBold">Need help?</Text>
          <Text variant="caption" color="textMuted">
            Talk to the ZPAY assistant anytime
          </Text>
        </View>
        <Icon name="chatbubble-ellipses-outline" size={IconSize.md} color="#F5B82E" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  brand: {
    letterSpacing: 2,
  },
  iconButton: {
    width: IconSize.xxl,
    height: IconSize.xxl,
    borderRadius: Radii.full,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF453A',
  },
  pressed: {
    opacity: 0.8,
  },
  title: {
    marginTop: Spacing.lg,
  },
  subtitle: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  featuredWrap: {
    marginBottom: Spacing.xxl,
  },
  featured: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radii.xl,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  featuredGlow: {
    position: 'absolute',
    right: -60,
    top: -70,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  featuredTop: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'center',
  },
  featuredIcon: {
    width: IconSize.xl + 16,
    height: IconSize.xl + 16,
    borderRadius: Radii.lg,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mostUsed: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  mostUsedText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
  featuredBody: {
    flex: 1,
    marginLeft: Spacing.lg,
  },
  featuredTitle: {
    color: '#FFFFFF',
  },
  featuredCaption: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  sectionLabel: {
    marginBottom: Spacing.md,
    marginTop: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: Spacing.md,
    columnGap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderRadius: Radii.lg,
    borderWidth: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    width: '48%',
  },
  cardIcon: {
    width: IconSize.lg + 14,
    height: IconSize.lg + 14,
    borderRadius: Radii.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
    gap: 2,
  },
  pills: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderRadius: Radii.lg,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  pillIcon: {
    width: IconSize.sm + 10,
    height: IconSize.sm + 10,
    borderRadius: Radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderRadius: Radii.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  assistIcon: {
    width: IconSize.lg + 14,
    height: IconSize.lg + 14,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assistText: {
    flex: 1,
    gap: 2,
  },
});
