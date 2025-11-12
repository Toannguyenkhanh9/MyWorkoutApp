import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSubscription } from '../iap/SubscriptionProvider';

type Props = { height?: number };
export const AdBanner: React.FC<Props> = ({ height = 64 }) => {
  const { isPremium } = useSubscription();
  if (isPremium) return null;

  return (
    <View style={[styles.container, { height }]}>
      <Text style={styles.text}>Ad Banner (placeholder)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  text: { color: '#6B7280', fontSize: 12, fontWeight: '600' }
});
