// App.tsx
import React from 'react';
import './src/i18n';
import { NavigationContainer } from '@react-navigation/native';
import { SubscriptionProvider } from './src/iap/SubscriptionProvider';
import { AppNavigator } from './src/AppNavigator';

export default function App() {
  return (
    <SubscriptionProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SubscriptionProvider>
  );
}
