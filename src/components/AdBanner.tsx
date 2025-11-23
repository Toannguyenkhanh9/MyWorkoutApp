import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';
import { ADMOB } from '../ads/adConfig';
import { canShowBanner } from '../ads/adGate';
import { useSubscription } from '../iap/SubscriptionProvider';

const unitId = Platform.OS === 'android' ? ADMOB.android.banner : ADMOB.ios.banner;

export const AdBanner: React.FC = () => {
  const { isPremium } = useSubscription?.() || { isPremium: false };
  const [show, setShow] = useState(false);

  useEffect(() => {
    (async () => {
      //setShow(await canShowBanner(isPremium));
      setShow(true);
    })();
  }, [isPremium]);

  if (!show) return null;
  return (
    <View style={{ alignItems: 'center' }}>
      <BannerAd unitId={unitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
    </View>
  );
};