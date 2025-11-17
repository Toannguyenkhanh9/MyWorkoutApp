import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import i18n, { LANG_KEY } from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { scheduleDailyReminder } from '../notifications/reminder';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const current = i18n.language.slice(0, 2);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [time, setTime] = useState<{ h: number; m: number }>({ h: 20, m: 0 });

  const screenH = Dimensions.get('window').height;
  // Sheet cao tối đa 85% màn hình, nhưng không vượt 560 và không thấp hơn 360
  const SHEET_HEIGHT = Math.max(360, Math.min(screenH * 0.85, 560));

  const currentLangLabel = useMemo(
    () => LANGS.find((l) => l.code === current)?.label || current,
    [current]
  );

  const changeLanguage = async (code: string) => {
    await AsyncStorage.setItem(LANG_KEY, code);
    await i18n.changeLanguage(code);
    setShowLangPicker(false);
  };

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
    const next = time.h === 20 ? { h: 7, m: 0 } : { h: 20, m: 0 };
    await saveAndSchedule(next.h, next.m);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings.title')}</Text>
      <Text style={styles.caption}>{t('settings.choose')}</Text>

      {/* Select Ngôn ngữ */}
      <TouchableOpacity
        style={[styles.row, styles.rowActive]}
        onPress={() => setShowLangPicker(true)}
      >
        <Text style={styles.lang}>🌐 {t('settings.language') || 'Language'}</Text>
        <Text style={styles.value}>{currentLangLabel}</Text>
        <Text style={styles.chev}>›</Text>
      </TouchableOpacity>

      <View style={{ height: 16 }} />

      {/* Daily reminder */}
      <Text style={styles.title}>{t('settings.title')}</Text>
      <Text style={styles.caption}>Daily reminder</Text>
      <TouchableOpacity style={[styles.row, styles.rowActive]} onPress={toggleDemo}>
        <Text style={styles.lang}>
          ⏰ {String(time.h).padStart(2, '0')}:{String(time.m).padStart(2, '0')} (tap to toggle 20:00/07:00)
        </Text>
      </TouchableOpacity>

      {/* Hồ sơ */}
      <TouchableOpacity
        style={[styles.row, styles.rowActive]}
        onPress={() => navigation.navigate('UserProfile')}
      >
        <Text style={styles.lang}>👤 Hồ sơ người dùng</Text>
        <Text style={styles.chev}>›</Text>
      </TouchableOpacity>

      {/* Modal chọn ngôn ngữ */}
      <Modal
        visible={showLangPicker}
        animationType="fade"
        transparent
        onRequestClose={() => setShowLangPicker(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setShowLangPicker(false)}>
          {/* Sheet: chiều cao cố định để không bị co, danh sách chiếm phần còn lại */}
          <Pressable
            style={[
              styles.sheet,
              { height: SHEET_HEIGHT, paddingBottom: insets.bottom + 8 },
            ]}
            onPress={() => {}}
          >
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{t('settings.language') || 'Language'}</Text>

            {/* Danh sách NGÔN NGỮ luôn có flex:1 để hiển thị */}
            <View style={{ flex: 1, minHeight: 200 }}>
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 8 }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
              >
                {LANGS.map((item) => {
                  const selected = item.code === current;
                  return (
                    <TouchableOpacity
                      key={item.code}
                      style={[styles.item, selected && styles.itemActive]}
                      onPress={() => changeLanguage(item.code)}
                    >
                      <Text
                        style={[styles.itemText, selected && styles.itemTextActive]}
                        numberOfLines={1}
                      >
                        {item.label}
                      </Text>
                      {selected ? <Text style={styles.tick}>✓</Text> : null}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowLangPicker(false)}
            >
              <Text style={styles.cancelTxt}>{t('common.cancel', 'Cancel')}</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

/* ========== Styles ========== */
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
  rowActive: { backgroundColor: '#111827' },
  lang: { color: '#E5E7EB', fontSize: 14, flex: 1, fontWeight: '700' },
  value: { color: '#9CA3AF', fontSize: 14, marginRight: 8 },
  chev: { color: '#94A3B8', fontSize: 22 },

  tick: { color: '#34D399', fontSize: 18, marginLeft: 8 },

  // Modal / Bottom sheet
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#0B1220',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#334155',
    marginBottom: 10,
  },
  sheetTitle: {
    color: '#E5E7EB',
    fontWeight: '800',
    fontSize: 16,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 8,
  },
  itemActive: { borderColor: '#10B981', backgroundColor: '#0B3B2E' },
  itemText: { color: '#E5E7EB', fontSize: 14, flex: 1 },
  itemTextActive: { color: '#D1FAE5', fontWeight: '800' },

  cancelBtn: {
    marginTop: 6,
    backgroundColor: '#111827',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cancelTxt: { color: '#E5E7EB', fontWeight: '700' },
});

export default SettingsScreen;
