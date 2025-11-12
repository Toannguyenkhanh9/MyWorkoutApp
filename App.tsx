// App.tsx
import React from 'react';
import './src/i18n';
import { NavigationContainer } from '@react-navigation/native';
import { SubscriptionProvider } from './src/iap/SubscriptionProvider';
import { AppNavigator } from './src/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SubscriptionProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SubscriptionProvider>
    </SafeAreaProvider>
  );
}
