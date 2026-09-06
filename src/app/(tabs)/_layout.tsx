import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, StyleSheet, View, type ColorValue } from 'react-native';

import { Chatbot } from '@/components/Chatbot';
import { Icon, type IconName } from '@/components/Icon';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/theme';

interface TabIconProps {
  name: IconName;
  focused: boolean;
  color: ColorValue;
}

function TabIcon({ name, focused, color }: TabIconProps) {
  return (
    <View style={[styles.tabIconWrap, focused && styles.tabIconWrapActive]}>
      <Icon name={focused ? name : (`${name}-outline` as IconName)} size={21} color={String(color)} />
      {focused ? <View style={styles.activeIndicator} /> : null}
    </View>
  );
}

export default function TabsLayout() {
  const { status } = useAuth();
  const colors = useTheme();

  if (status === 'loading') {
    return (
      <View style={[styles.loading, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (status === 'signedOut') {
    return <Redirect href="/welcome" />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 74,
            paddingTop: 8,
            paddingBottom: 10,
            marginHorizontal: 12,
            marginBottom: 10,
            borderRadius: 24,
            backgroundColor: 'rgba(17, 21, 27, 0.96)',
            borderTopColor: 'rgba(255,255,255,0.08)',
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderLeftColor: colors.border,
            borderRightColor: colors.border,
            position: 'absolute',
            shadowColor: '#000000',
            shadowOpacity: 0.32,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 10 },
            elevation: 16,
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.tabInactive,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '700', marginTop: 2 },
          tabBarItemStyle: { paddingVertical: 2 },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused, color }) => <TabIcon name="home" focused={focused} color={color} />,
          }}
        />
        <Tabs.Screen
          name="service"
          options={{
            title: 'Service',
            tabBarIcon: ({ focused, color }) => <TabIcon name="grid" focused={focused} color={color} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ focused, color }) => <TabIcon name="time" focused={focused} color={color} />,
          }}
        />
        <Tabs.Screen
          name="me"
          options={{
            title: 'Me',
            tabBarIcon: ({ focused, color }) => <TabIcon name="person" focused={focused} color={color} />,
          }}
        />
      </Tabs>
      <Chatbot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 28,
  },
  tabIconWrapActive: {
    transform: [{ translateY: -1 }],
  },
  activeIndicator: {
    width: 18,
    height: 3,
    borderRadius: 999,
    marginTop: 4,
    backgroundColor: '#F5B82E',
  },
});
