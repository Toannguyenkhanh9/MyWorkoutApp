import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import i18n, { LANG_KEY } from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'ru', label: 'Русский' },
  { code: 'ar', label: 'العربية' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'th', label: 'ไทย' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'fil', label: 'Filipino' },
  { code: 'pt', label: 'Português' }
];

export const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const current = i18n.language.slice(0, 2);

  const change = async (code: string) => {
    await AsyncStorage.setItem(LANG_KEY, code);
    await i18n.changeLanguage(code);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings.title')}</Text>
      <Text style={styles.caption}>{t('settings.choose')}</Text>

      <FlatList
        data={LANGS}
        keyExtractor={(i) => i.code}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.row, item.code === current && styles.rowActive]} onPress={() => change(item.code)}>
            <Text style={styles.lang}>{item.label}</Text>
            <Text style={styles.tick}>{item.code === current ? '✓' : ''}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020817', padding: 16 },
  title: { fontSize: 22, fontWeight: '800', color: '#F9FAFB' },
  caption: { color: '#9CA3AF', marginTop: 6, marginBottom: 12 },
  row: { padding: 14, borderRadius: 12, backgroundColor: '#111827', flexDirection: 'row', alignItems: 'center' },
  rowActive: { backgroundColor: '#0B3B2E' },
  lang: { color: '#E5E7EB', fontSize: 14, flex: 1 },
  tick: { color: '#34D399', fontSize: 18, marginLeft: 8 }
});
