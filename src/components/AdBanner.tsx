// FILE: src/components/AdBanner.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSubscription } from '../iap/SubscriptionProvider';

type Props = { height?: number };

const AdBanner: React.FC<Props> = ({ height = 60 }) => {
  const { isPremium } = useSubscription();
  if (isPremium) return null; // Premium -> ẩn quảng cáo

  // TODO: thay bằng SDK thật (AdMob/AppLovin/ironSource...)
  return (
    <View style={[styles.container, { height }]}>
      <Text style={styles.text}>Ad Banner (placeholder)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    backgroundColor: '#111827',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  text: { color: '#9CA3AF', fontSize: 12 }
});

export { AdBanner };
export default AdBanner;
