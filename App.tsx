import React, { useEffect, useState } from 'react';
import './src/i18n';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SubscriptionProvider } from './src/iap/SubscriptionProvider';
import { AppNavigator } from './src/AppNavigator';
import OnboardingProfileScreen from './src/screens/OnboardingProfileScreen';
import mobileAds from 'react-native-google-mobile-ads';
import { preloadRewarded } from './src/ads/rewarded';
import { ToastProvider } from './src/ui/Toast';
const ONBOARD_DONE = 'onboarding:done';

export default function App() {
  const [ready, setReady] = useState(false);
  const [needsOnboard, setNeedsOnboard] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await mobileAds().initialize();
        preloadRewarded();
        const ok = await AsyncStorage.getItem(ONBOARD_DONE);
        setNeedsOnboard(!ok);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <SubscriptionProvider>
          {needsOnboard ? (
            <OnboardingProfileScreen onDone={() => setNeedsOnboard(false)} />
          ) : (
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          )}
        </SubscriptionProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
