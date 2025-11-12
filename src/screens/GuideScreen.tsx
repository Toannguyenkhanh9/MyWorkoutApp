import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

export const GuideScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('guide.title')}</Text>
      <Text style={styles.text}>{t('guide.content')}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#020817'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 12
  },
  text: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20
  }
});
