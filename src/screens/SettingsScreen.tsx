import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import i18n, { LANG_KEY } from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { scheduleDailyReminder } from '../notifications/reminder';
import { useRoute, useNavigation } from '@react-navigation/native';

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
  { code: 'pt', label: 'Português' },
];
const REMIND_KEY = 'app:remind';
export const SettingsScreen: React.FC = () => {
  const route = useRoute<any>(); const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const current = i18n.language.slice(0, 2);

  const change = async (code: string) => {
    await AsyncStorage.setItem(LANG_KEY, code);
    await i18n.changeLanguage(code);
  };
  const [time, setTime] = useState<{ h: number; m: number }>({ h: 20, m: 0 });

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(REMIND_KEY);
        if (json) setTime(JSON.parse(json));
      } catch {}
    })();
  }, []);

  const saveAndSchedule = async (h: number, m: number) => {
    const next = { h, m };
    setTime(next);
    await AsyncStorage.setItem(REMIND_KEY, JSON.stringify(next));
    await scheduleDailyReminder(h, m);
  };

  const toggleDemo = async () => {
    // Demo gọn: đổi giữa 20:00 và 07:00 để test nhanh
    const next = time.h === 20 ? { h: 7, m: 0 } : { h: 20, m: 0 };
    await saveAndSchedule(next.h, next.m);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings.title')}</Text>
      <Text style={styles.caption}>{t('settings.choose')}</Text>

      <FlatList
        data={LANGS}
        keyExtractor={i => i.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.row, item.code === current && styles.rowActive]}
            onPress={() => change(item.code)}
          >
            <Text style={styles.lang}>{item.label}</Text>
            <Text style={styles.tick}>{item.code === current ? '✓' : ''}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
      <View style={{ height: 16 }} />

      <Text style={styles.title}>{t('settings.title')}</Text>
      <Text style={styles.caption}>Daily reminder</Text>

      <TouchableOpacity
        style={[styles.row, styles.rowActive]}
        onPress={toggleDemo}
      >
        <Text style={styles.lang}>
          ⏰ {String(time.h).padStart(2, '0')}:{String(time.m).padStart(2, '0')}{' '}
          (tap to toggle 20:00/07:00)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.row, styles.rowActive]}
        onPress={() => navigation.navigate('UserProfile')}
      >
        <Text style={styles.lang}>👤 Hồ sơ người dùng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020817', padding: 16 },
  title: { fontSize: 22, fontWeight: '800', color: '#F9FAFB' },
  caption: { color: '#9CA3AF', marginTop: 6, marginBottom: 12 },
  row: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#111827',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowActive: { backgroundColor: '#0B3B2E' },
  lang: { color: '#E5E7EB', fontSize: 14, flex: 1 },
  tick: { color: '#34D399', fontSize: 18, marginLeft: 8 },
});
