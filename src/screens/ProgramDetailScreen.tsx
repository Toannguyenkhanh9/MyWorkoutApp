import React, { useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, SectionList, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { PROGRAMS, generateProgramDays, WorkoutDay } from '../data/programs';
import { DayItem } from '../components/DayItem';
import { AdBanner } from '../components/AdBanner';

type Section = { title: string; data: WorkoutDay[] };

export const ProgramDetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute<any>(); const navigation = useNavigation<any>();
  const { programId } = route.params || {};
  const program = PROGRAMS.find((p) => p.id === programId);
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({});
  const STORAGE_KEY = `program:${programId}:completed`;

  useEffect(() => { if (program) navigation.setOptions({ title: t(program.titleKey) }); }, [navigation, program, t]);
  useEffect(() => { (async () => { try { const json = await AsyncStorage.getItem(STORAGE_KEY); if (json) setCompletedDays(JSON.parse(json)); } catch {} })(); }, [STORAGE_KEY]);

  const saveCompleted = async (map: Record<string, boolean>) => {
    setCompletedDays(map);
    try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(map)); } catch {}
  };

  const days = useMemo(() => (program ? generateProgramDays(program) : []), [program]);
  const sections: Section[] = useMemo(() => {
    const out: Section[] = [];
    for (let i = 0; i < days.length; i += 7) {
      const chunk = days.slice(i, i + 7);
      const weekNo = Math.floor(i / 7) + 1;
      out.push({ title: t('program.weekTitle', { n: weekNo }), data: chunk });
    }
    return out;
  }, [days, t]);

  const onPressDay = (day: WorkoutDay) => {
    const updated = { ...completedDays, [day.id]: true };
    saveCompleted(updated);
    navigation.navigate('WorkoutVideo', { programId, dayId: day.id, videoUrl: day.videoUrl, sessionKey: day.sessionKey });
  };

  if (!program) {
    return <View style={styles.container}><Text style={{ color: '#FCA5A5', padding: 16 }}>Program not found</Text></View>;
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DayItem day={item} completed={!!completedDays[item.id]} onPress={() => onPressDay(item)} />
        )}
        renderSectionHeader={({ section }) => <Text style={styles.section}>{section.title}</Text>}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        stickySectionHeadersEnabled
      />
      <View style={{ paddingHorizontal: 16 }}><AdBanner /></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020817' },
  section: { color: '#E5E7EB', fontWeight: '700', marginTop: 8, marginBottom: 8, fontSize: 16 }
});