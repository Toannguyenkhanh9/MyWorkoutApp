// FILE: src/screens/WorkoutScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { PROGRAMS, WorkoutProgram } from '../data/programs';
import { ProgramCard } from '../components/ProgramCard';

export const WorkoutScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const openProgram = (p: WorkoutProgram) => {
    // ProgramDetail nằm trong Main stack → navigate lồng sang tab Main
    navigation.navigate('Main', { screen: 'ProgramDetail', params: { programId: p.id } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('workout.title', 'Workout')}</Text>
      <Text style={styles.caption}>{t('workout.pick', 'Chọn một giáo án để bắt đầu')}</Text>

      <FlatList
        data={PROGRAMS}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <ProgramCard program={item} onPress={() => openProgram(item)} />}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7FB', padding: 16 },
  title: { fontSize: 22, fontWeight: '900', color: '#0F172A' },
  caption: { fontSize: 12, color: '#64748B', marginTop: 4 }
});

export default WorkoutScreen;
