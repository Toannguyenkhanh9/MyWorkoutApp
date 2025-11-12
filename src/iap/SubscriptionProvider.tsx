// FILE: src/iap/SubscriptionProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SubscriptionState = {
  isPremium: boolean;
  loading: boolean;
  buyPremium: () => Promise<void>;
  restore: () => Promise<void>;
};

const STORAGE_KEY = 'app:isPremium';

const Ctx = createContext<SubscriptionState>({
  isPremium: false,
  loading: false,
  buyPremium: async () => {},
  restore: async () => {}
});

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load state đã lưu
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        setIsPremium(saved === '1');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Mua Premium (stub – sau gắn IAP thật)
  const buyPremium = async () => {
    setIsPremium(true);
    await AsyncStorage.setItem(STORAGE_KEY, '1');
  };

  // Khôi phục mua hàng
  const restore = async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    setIsPremium(saved === '1');
  };

  return (
    <Ctx.Provider value={{ isPremium, loading, buyPremium, restore }}>
      {children}
    </Ctx.Provider>
  );
};

export const useSubscription = () => useContext(Ctx);
