import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { MainScreen } from './screens/MainScreen';
import { NutritionScreen } from './screens/NutritionScreen';
import { GuideScreen } from './screens/GuideScreen';
import { PremiumScreen } from './screens/PremiumScreen';
import { ProgramDetailScreen } from './screens/ProgramDetailScreen';
import { WorkoutVideoScreen } from './screens/WorkoutVideoScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} options={{ headerTitle: '' }} />
    <Stack.Screen name="WorkoutVideo" component={WorkoutVideoScreen} options={{ title: 'Workout' }} />
  </Stack.Navigator>
);

export const AppNavigator: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#020817', borderTopColor: '#111827' },
        tabBarActiveTintColor: '#22C55E',
        tabBarInactiveTintColor: '#9CA3AF'
      }}
    >
      <Tab.Screen name="Main" component={MainStack} options={{ tabBarLabel: t('tabs.main'), tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text> }} />
      <Tab.Screen name="Nutrition" component={NutritionScreen} options={{ tabBarLabel: t('tabs.nutrition'), tabBarIcon: ({ color }) => <Text style={{ color }}>🥗</Text> }} />
      <Tab.Screen name="Guide" component={GuideScreen} options={{ tabBarLabel: t('tabs.guide'), tabBarIcon: ({ color }) => <Text style={{ color }}>📖</Text> }} />
      <Tab.Screen name="Premium" component={PremiumScreen} options={{ tabBarLabel: t('tabs.premium'), tabBarIcon: ({ color }) => <Text style={{ color }}>⭐️</Text> }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: t('tabs.settings'), tabBarIcon: ({ color }) => <Text style={{ color }}>⚙️</Text> }} />
    </Tab.Navigator>
  );
};