// FILE: src/screens/MainScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { PROGRAMS, WorkoutProgram } from '../data/programs';
import { getActiveIds } from '../store/activePrograms';
import { AdBanner } from '../components/AdBanner';

const BG = require('../../assets/images/bg_main.jpg');

export const MainScreen: React.FC<any> = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [active, setActive] = useState<WorkoutProgram[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  const computeProgress = useCallback(async (ids: string[]) => {
    const obj: Record<string, number> = {};
    for (const id of ids) {
      const key = `program:${id}:completed`;
      try {
        const json = await AsyncStorage.getItem(key);
        const map = json ? (JSON.parse(json) as Record<string, boolean>) : {};
        obj[id] = Object.values(map).filter(Boolean).length;
      } catch { obj[id] = 0; }
    }
    setProgress(obj);
  }, []);

  useFocusEffect(useCallback(() => {
    (async () => {
      const ids = await getActiveIds();
      const list = PROGRAMS.filter(p => ids.includes(p.id));
      setActive(list);
      await computeProgress(ids);
    })();
  }, [computeProgress]));

  const openProgram = (p: WorkoutProgram) => {
    navigation.navigate('ProgramDetail', { programId: p.id });
  };

  return (
    <ImageBackground source={BG} style={styles.bg}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top','left','right']} style={styles.safe}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headingWrap}>
            <Text style={styles.appName}>{t('appName')}</Text>
            <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
          </View>

          {/* ==== KHOẢNG CÁCH ĐẨY PHẦN DƯỚI XUỐNG CUỐI ====
              Dùng marginTop:'auto' cho whole bottom-area */}
          <View style={styles.bottomArea}>
            <Text style={styles.sectionTitle}>
              {t('home.activeTitle', 'Đang tập luyện')}
            </Text>

            {active.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>
                  {t('home.noActive', 'Chưa có chương trình đang tập')}
                </Text>
                <Text style={styles.emptyDesc}>
                  {t('home.goWorkout', 'Vào tab Workout để chọn chương trình')}
                </Text>
              </View>
            ) : (
              active.map(p => {
                const done = progress[p.id] ?? 0;
                const total = p.durationDays;
                return (
                  <TouchableOpacity
                    key={p.id}
                    style={styles.activeCard}
                    onPress={() => openProgram(p)}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.activeTitle}>{t(p.titleKey)}</Text>
                    <Text style={styles.activeSub}>
                      {done}/{total} {t('home.daysSuffix',{count: total})}
                    </Text>
                  </TouchableOpacity>
                );
              })
            )}

            <View style={{ paddingHorizontal: 0, marginTop: 10 }}>
              <AdBanner />
            </View>

            <Text style={styles.footer}>{t('footer.devBy', { name: 'Kevin' })}</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16, paddingBottom: 12 },

  headingWrap: { alignItems: 'center', marginTop: 8 },
  appName: {
    fontSize: 30, fontWeight: '900', color: '#faf8f8', letterSpacing: 1.2, textAlign: 'center',
    textShadowColor: 'rgba(12, 12, 12, 0.45)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14, color: '#0a0a0a', opacity: 0.95, marginTop: 6, textAlign: 'center',
    textShadowColor: 'rgba(250, 248, 248, 0.35)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3,
  },

  // --- BOTTOM pinned ---
  bottomArea: { marginTop: 'auto', paddingTop: 8, paddingBottom: 6 },
  sectionTitle: {
    color: '#141414',
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 8,
    textShadowColor: 'rgba(252, 251, 251, 0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  emptyBox: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyTitle: { color: '#0B1220', fontWeight: '900' },
  emptyDesc: { color: '#334155', marginTop: 6 },

  activeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E6EEF6',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  activeTitle: { color: '#0B1220', fontWeight: '900', fontSize: 16 },
  activeSub: { color: '#0F766E', marginTop: 4, fontWeight: '700' }, // xanh ngọc nổi bật

  footer: {
    textAlign: 'center',
    color: '#030303',
    marginTop: 12,
    fontSize: 12,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default MainScreen;
