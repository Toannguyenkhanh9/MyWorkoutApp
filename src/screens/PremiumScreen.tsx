import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

export const PremiumScreen: React.FC = () => {
  const { t } = useTranslation();

  const onUpgrade = () => {
    // TODO: tích hợp IAP
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('premium.title')}</Text>
      <Text style={styles.text}>• {t('premium.removeAds')}</Text>
      <Text style={styles.text}>• {t('premium.allPrograms')}</Text>

      <TouchableOpacity style={styles.button} onPress={onUpgrade}>
        <Text style={styles.buttonText}>{t('premium.cta')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#020817'
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 16
  },
  text: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 4
  },
  button: {
    marginTop: 24,
    backgroundColor: '#22C55E',
    paddingVertical: 12,
    borderRadius: 999
  },
  buttonText: {
    textAlign: 'center',
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 16
  }
});
