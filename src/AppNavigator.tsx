// FILE: src/AppNavigator.tsx
import React from 'react';
import { Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainScreen } from './screens/MainScreen';
import { NutritionScreen } from './screens/NutritionScreen';
import { GuideScreen } from './screens/GuideScreen';
import { PremiumScreen } from './screens/PremiumScreen';
import { ProgramDetailScreen } from './screens/ProgramDetailScreen';
import { WorkoutVideoScreen } from './screens/WorkoutVideoScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { WeightChartScreen } from './screens/WeightChartScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} options={{ headerTitle: 'Program' }} />
    <Stack.Screen name="WorkoutVideo" component={WorkoutVideoScreen} options={{ title: 'Workout' }} />
    <Stack.Screen name="WorkoutWeb" component={WorkoutVideoScreen as any} options={{ title: 'Workout' }} />
  </Stack.Navigator>
);

// ✅ More/Settings stack: đưa Guide & Premium vào đây
const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MoreHome" component={SettingsScreen} options={{ headerTitle: 'More' }} />
    <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'Hồ Sơ' }} />
    <Stack.Screen name="Guide" component={GuideScreen} options={{ title: 'Hướng dẫn' }} />
    <Stack.Screen name="Premium" component={PremiumScreen} options={{ title: 'Premium' }} />
    <Stack.Screen name="WeightChart" component={WeightChartScreen} options={{ title: 'Theo dõi cân nặng' }} />
  </Stack.Navigator>
);

export const AppNavigator: React.FC = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const extraBottom = Platform.OS === 'android' ? Math.max(insets.bottom, 16) : insets.bottom;
  const tabHeight = 56 + extraBottom;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: tabHeight,
          paddingBottom: extraBottom,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700', marginBottom: 2 },
        tabBarIconStyle: { marginTop: 2 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainStack}
        options={{ tabBarLabel: t('tabs.main'), tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text> }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{ tabBarLabel: t('tabs.workout', 'Workout'), tabBarIcon: ({ color }) => <Text style={{ color }}>🏋️‍♂️</Text> }}
      />
      <Tab.Screen
        name="Nutrition"
        component={NutritionScreen}
        options={{ tabBarLabel: t('tabs.nutrition'), tabBarIcon: ({ color }) => <Text style={{ color }}>🥗</Text> }}
      />
      {/* ❌ GỠ 2 tab Guide & Premium khỏi bottom bar
          ✅ Thêm tab Settings => More (stack ở trên) */}
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ tabBarLabel: t('tabs.more', 'More'), tabBarIcon: ({ color }) => <Text style={{ color }}>⚙️</Text> }}
      />
    </Tab.Navigator>
  );
};
